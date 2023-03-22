
import sys, pickle, os, cohere
from langchain.document_loaders import OnlinePDFLoader, PyPDFLoader
from langchain.text_splitter import RecursiveCharacterTextSplitter
from langchain.embeddings.openai import OpenAIEmbeddings
from langchain.vectorstores import Chroma, Pinecone
from langchain import VectorDBQA
from langchain.llms import Cohere, OpenAI
from langchain.embeddings import CohereEmbeddings
from langchain.chains.question_answering import load_qa_chain
from langchain.vectorstores import Qdrant
from qdrant_client import QdrantClient
from qdrant_client.http.models import Batch
from qdrant_client.http import models 


COHERE_API_KEY = os.environ['COHERE_API_KEY']
HOST_URL_QDRANT = os.environ['HOST_URL_QDRANT']
API_KEY_QDRANT = os.environ['API_KEY_QDRANT']
EMBEDDING_TYPE = 'cohere'


def load_data(data_path: str, loader_type: str = 'local') -> list:

    if loader_type == 'online':
        loader = OnlinePDFLoader(data_path)
        data = loader.load()
        #splits data on a character level
        splitter = RecursiveCharacterTextSplitter(chunk_size=1000, chunk_overlap=200)
        texts = splitter.split_documents(data)

    if loader_type == 'local':
        loader = PyPDFLoader(data_path)
        #splits the data by page
        texts = loader.load_and_split()

    return texts




def create_collection_qdrant(collection_name:str, client_q: QdrantClient):
    client_q.recreate_collection(
        collection_name=f"{collection_name}",
        vectors_config=models.VectorParams(size=4096,
                                           distance=models.Distance.COSINE),
    )
    print('done creating collection ---')

def get_collection_qdrant(collection_name:str, client_q: QdrantClient):
    details = client_q.get_collection(collection_name=collection_name)
    return details

def delete_collection_qdrant(collection_name: str, client_q: QdrantClient):
    client_q.delete_collection(collection_name=f"{collection_name}")
    print('done--')


def query_vecstor_qdrant(collection_name:str, questions:list, client_q: QdrantClient, cohere_client: cohere.Client):

    embedded_vectors = cohere_client.embed(model="large",
                                           texts=questions).embeddings
    # Conversion to float is required for Qdrant
    vectors = [list(map(float, vector)) for vector in embedded_vectors]
    k_max = 5

    response = client_q.search(collection_name=f"{collection_name}",
                               query_vector=vectors[0],
                               limit=k_max,
                               with_payload=True)
    print('------\n', response[0].payload['page_content'], '\n------')
    return response
    

def create_vec_store_from_text(host:str,local_path_pdf:str, collection_name:str,embeddings,use_documents:bool=False):

    loader = PyPDFLoader(local_path_pdf)
    pages = loader.load_and_split()
    if use_documents is False:
        pages = [t.document for t in pages]
    
    vec_store = Qdrant.from_texts(pages,
                                  embeddings,
                                  collection_name= collection_name,
                                  url=host,
                                  api_key=API_KEY_QDRANT)
    return vec_store




if __name__ == '__main__':
    client_q = QdrantClient(url=HOST_URL_QDRANT,
                            api_key=API_KEY_QDRANT)

    cohere_client = cohere.Client(api_key=COHERE_API_KEY)

