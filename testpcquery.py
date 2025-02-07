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

# Function to generate OpenAI embeddings (1536D)
def get_openai_embedding(text):
    response = openai.Embedding.create(
        input=text,
        model="text-embedding-ada-002"
    )
    return response.data[0].embedding

# Student's answer (query)
query_text = "Plants use sunlight to create food."

# Convert query to embedding
query_embedding = get_openai_embedding(query_text)

# Search for the closest match in Pinecone
result = index.query(vector=[query_embedding], top_k=1, include_metadata=True)

# Print result
print("Query Result:", result)