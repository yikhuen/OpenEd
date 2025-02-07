import os
from pinecone import Pinecone
from dotenv import load_dotenv

# Load API key from .env file
load_dotenv()

# Initialize Pinecone client
pc = Pinecone(api_key=os.getenv("PINECONE_API_KEY"))

# Get the index name
index_name = os.getenv("PINECONE_INDEX_NAME")
index = pc.Index(index_name)

# Get index stats
stats = index.describe_index_stats()
print("Pinecone Index Stats:", stats)
