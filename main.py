import io
import asyncio
import logging

from fastapi import FastAPI, UploadFile, File, Form, HTTPException
from pydantic_settings import BaseSettings
from pydantic import ConfigDict

import pytesseract
from PIL import Image, UnidentifiedImageError
import openai
from pinecone import Pinecone

# Configure logging
logging.basicConfig(level=logging.INFO)
logger = logging.getLogger(__name__)

class Settings(BaseSettings):
    """
    Manages environment variables for your application.
    Additional environment variables will be ignored.
    """
    pinecone_api_key: str
    pinecone_index_name: str
    openai_api_key: str

    model_config = ConfigDict(
        extra='ignore',      # Ignore any extra env vars (e.g., pinecone_env)
        env_file='.env'      # Path to .env
    )

# Initialize settings
settings = Settings()

# Initialize Pinecone client
pc = Pinecone(api_key=settings.pinecone_api_key)
index = pc.Index(settings.pinecone_index_name)

# Initialize OpenAI
openai.api_key = settings.openai_api_key

# Create the FastAPI app
app = FastAPI(title="OpenEd Backend")

@app.get("/")
async def read_root():
    """
    Simple health check endpoint.
    """
    return {"message": "API is working!"}

async def run_ocr(image_bytes: bytes) -> str:
    """
    Asynchronously extract text from image bytes using pytesseract
    by offloading to a separate thread.
    """
    def ocr_task():
        try:
            image = Image.open(io.BytesIO(image_bytes))
            return pytesseract.image_to_string(image)
        except UnidentifiedImageError:
            raise ValueError("Uploaded file is not a valid image.")
    
    try:
        extracted_text = await asyncio.to_thread(ocr_task)
        return extracted_text
    except Exception as e:
        logger.error("Error during OCR: %s", e)
        raise HTTPException(status_code=400, detail=str(e))

@app.post("/process_ocr")
async def process_ocr(file: UploadFile = File(...)):
    """
    Endpoint to handle OCR for uploaded image files.
    """
    try:
        image_bytes = await file.read()
        if not image_bytes:
            raise HTTPException(status_code=400, detail="Empty file uploaded.")
        extracted_text = await run_ocr(image_bytes)
        return {"extracted_text": extracted_text}
    except HTTPException as he:
        raise he
    except Exception as e:
        logger.error("Unexpected error in process_ocr: %s", e)
        raise HTTPException(status_code=500, detail="Internal Server Error")

async def get_student_answer(file: UploadFile = None, text_answer: str = None) -> str:
    """
    Helper to retrieve the student's answer from either an uploaded file (OCR) or form data.
    """
    if file is not None:
        ocr_result = await process_ocr(file)
        student_answer = ocr_result.get("extracted_text", "").strip()
        if not student_answer:
            raise HTTPException(
                status_code=400, 
                detail="OCR did not extract any text from the file."
            )
    elif text_answer is not None:
        student_answer = text_answer.strip()
        if not student_answer:
            raise HTTPException(status_code=400, detail="Empty text answer provided.")
    else:
        raise HTTPException(status_code=400, detail="No answer provided.")
    return student_answer

async def grade_student_answer(student_answer: str) -> str:
    """
    Use OpenAI to grade a student's answer. 
    Queries Pinecone to retrieve reference solutions and generates
    color-coded feedback.
    """
    try:
        # Step 1: Convert the student's answer to an embedding
        embedding_response = await asyncio.to_thread(
            lambda: openai.Embedding.create(
                model="text-embedding-ada-002", 
                input=student_answer
            )
        )
        embedding = embedding_response["data"][0]["embedding"]

        # Step 2: Query Pinecone for reference solutions
        query_result = await asyncio.to_thread(
            lambda: index.query(
                vector=embedding, 
                top_k=3, 
                include_metadata=True
            )
        )
        reference_solutions = [
            match["metadata"].get("solution", "") 
            for match in query_result.get("matches", [])
        ]

        # Step 3: Construct the grading prompt for ChatGPT
        prompt = (
            f"Student Answer: {student_answer}\n"
            f"Reference Solutions: {reference_solutions}\n"
            "Compare and grade the student's response based on accuracy and completeness.\n"
            "Provide color-coded feedback (correct parts in green, incorrect in red) and a score out of 10."
        )

        # Step 4: Generate grading feedback using ChatCompletion
        chat_response = await asyncio.to_thread(
            lambda: openai.ChatCompletion.create(
                model="gpt-4-turbo",
                messages=[{"role": "system", "content": prompt}],
                max_tokens=300,
            )
        )
        grading_result = chat_response["choices"][0]["message"]["content"].strip()
        return grading_result
    except Exception as e:
        logger.error("Error during grading: %s", e)
        raise HTTPException(status_code=500, detail="Error during grading process")

@app.post("/grade_answer")
async def grade_answer(student_answer: str = Form(...)):
    """
    Grade a student's answer provided directly as form data.
    """
    graded_result = await grade_student_answer(student_answer)
    return {"grading_result": graded_result}

@app.post("/submit_answer")
async def submit_answer(file: UploadFile = File(None), text_answer: str = Form(None)):
    """
    Submit a student's answer either via an uploaded file (OCR) or direct text.
    Returns the graded result.
    """
    student_answer = await get_student_answer(file, text_answer)
    grading_result = await grade_student_answer(student_answer)
    return {"grading_result": grading_result}



