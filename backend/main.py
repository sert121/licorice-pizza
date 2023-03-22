from fastapi import FastAPI,Request,UploadFile,File
from fastapi.middleware.cors import CORSMiddleware
from model import Item, Track
import os
import requests
from langchain.document_loaders import PyPDFLoader
from models import QueryVectorStore, CollectionName
from helpers import load_data, create_collection_qdrant, get_collection_qdrant, delete_collection_qdrant, query_vector_store_qdrant

app = FastAPI()
headers = {
    'user-agent': "Lawerspace",
    'Content-Type': "application/json",
    'Accept': "application/json",
}
#CORS

origins = [
    "http://localhost:3000",
    "http://localhost:8000"]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.get("/")
def read_root():
    return {"Hello": "World"}
    

@app.post("/api/query_vec_store")
async def query_vec_store(body: QueryVectorStore):
    collection_name = body.collection_name
    query = body.query
    response = query_vector_store_qdrant(collection_name=collection_name, questions=[query], client_q=client_q, cohere_client=cohere_client)
    

@app.post("/file")
async def upload_file(uploaded_file: UploadFile = File(...)):
    file_location = f"./files/{uploaded_file.filename}"
    with open(file_location, "wb+") as file_object:
        file_object.write(uploaded_file.file.read())
    
    
    return {"filename": uploaded_file.filename}

