from typing import Annotated
from logging_conf import LogConfig
import logging
from logging.config import dictConfig
from fastapi import FastAPI, Request, UploadFile, File
from fastapi.middleware.cors import CORSMiddleware
import os
import requests
from langchain.document_loaders import PyPDFLoader
from models import QueryVectorStore, CollectionName
from helpers import load_data, create_collection_qdrant, get_collection_qdrant, delete_collection_qdrant, query_vector_store_qdrant, create_vec_store_from_text
from helpers import init_cohere_client, init_qdrant_client, init_cohere_embeddings
from fastapi import Form

app = FastAPI()
headers = {
    'user-agent': "IndexAI/0.0.1",
    'Content-Type': "application/json",
    'Accept': "application/json",
}


# Logging
dictConfig(LogConfig().dict())
logger = logging.getLogger("indexai")

# CORS
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


@app.get("/api")
def read_root():
    return {"Hello": "World"}


@app.post("/api/initalize_store")
async def initialize_vec_store(collection_name: Annotated[str,Form()], uploaded_file: UploadFile = File(...)):
    client_q = init_qdrant_client()
    cohere_client = init_cohere_client()

    # parse the files
    file_location = f"./files/{uploaded_file.filename}"
    with open(file_location, "wb+") as file_object:
        file_object.write(uploaded_file.file.read())
    logger.info(f'successfully saved file {uploaded_file.filename}')

    try:
        # create collection
        create_collection_qdrant(
            collection_name=collection_name, client_q=client_q)
        logger.info(f'created collection {collection_name}')
        embeddings = init_cohere_embeddings()
        # create vector store from text
        create_vec_store_from_text(local_path_pdf=file_location, collection_name=collection_name,
                                   embeddings=embeddings)
        logger.info(f'created vector store {collection_name}')
        return {"info": f"Vec store {collection_name} created"}
    except Exception as e:
        return {"info": f"Collection already exists"}


@app.post("/api/query_vec_store")
async def query_vec_store(body: QueryVectorStore):
    collection_name = body.collection_name
    query = body.query
    client_q = init_qdrant_client()
    cohere_client = init_cohere_client()
    try:
        # query vector store
        response = query_vector_store_qdrant(collection_name=collection_name, questions=[
                                             query], client_q=client_q, cohere_client=cohere_client)
        if response is None:
            return {"info": "Collection is incorrect/does not exist"}
        return response
    except Exception as e:
        logger.error(e)
        return {"error": e}

    # response = query_vector_store_qdrant(collection_name=collection_name, questions=[query], client_q=client_q, cohere_client=cohere_client)


@app.post("/api/upload_file")
async def upload_file(uploaded_file: UploadFile = File(...)):
    file_location = f"./files/{uploaded_file.filename}"
    with open(file_location, "wb+") as file_object:
        file_object.write(uploaded_file.file.read())
    return {"filename": uploaded_file.filename}
