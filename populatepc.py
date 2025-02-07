import os
import openai
from pinecone import Pinecone
from dotenv import load_dotenv

# Load API key from .env file
load_dotenv()

# Initialize Pinecone client
pc = Pinecone(api_key=os.getenv("PINECONE_API_KEY"))

# Get index name
index_name = os.getenv("PINECONE_INDEX_NAME")
index = pc.Index(index_name)

# Set OpenAI API key
openai.api_key = os.getenv("OPENAI_API_KEY")

# Reference answers
reference_answers = [
    "Photosynthesis is the process where plants convert sunlight into energy.",
    "Newton's third law states that for every action, there is an equal and opposite reaction.",
    "The capital of France is Paris."
]

# Generate embeddings using OpenAI
def get_openai_embedding(text):
    response = openai.embeddings.create(
        input=text,
        model="text-embedding-ada-002"
    )
    return response.data[0].embedding

# Convert answers to embeddings
embeddings = [get_openai_embedding(answer) for answer in reference_answers]

# Upload embeddings to Pinecone
to_upsert = [(f"answer_{i}", emb, {"text": reference_answers[i]}) for i, emb in enumerate(embeddings)]
index.upsert(vectors=to_upsert)

print(f"Successfully added {len(reference_answers)} reference answers to Pinecone!")