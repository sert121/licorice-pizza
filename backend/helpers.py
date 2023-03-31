
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
import json 
import openai


from dotenv import load_dotenv
load_dotenv()


from logging.config import dictConfig
import logging
from logging_conf import LogConfig

# Logging
dictConfig(LogConfig().dict())
logger = logging.getLogger("indexai")


COHERE_API_KEY = os.getenv('COHERE_API_KEY')
HOST_URL_QDRANT = os.getenv('HOST_URL_QDRANT')
API_KEY_QDRANT = os.getenv('API_KEY_QDRANT')
OPENAI_API_KEY = os.getenv('OPENAI_API_KEY')
openai.api_key = OPENAI_API_KEY

EMBEDDING_TYPE = 'cohere'

def init_qdrant_client():
    client_q = QdrantClient(url=HOST_URL_QDRANT,api_key=API_KEY_QDRANT)
    return client_q 

def init_cohere_client():
    cohere_client = cohere.Client(api_key=COHERE_API_KEY)
    return cohere_client

def openai_client():
    openai_client = OpenAI()
    return openai_client

def init_cohere_embeddings():
    cohere_embeddings = CohereEmbeddings(cohere_api_key=COHERE_API_KEY)
    return cohere_embeddings


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
    logger.info('done creating collection ---')

def get_collection_qdrant(collection_name:str, client_q: QdrantClient):
    details = client_q.get_collection(collection_name=collection_name)
    return details

def delete_collection_qdrant(collection_name: str, client_q: QdrantClient):
    client_q.delete_collection(collection_name=f"{collection_name}")
    logger.info(f'done deleting {collection_name}--')


def query_vector_store_qdrant(collection_name:str, questions:list, client_q: QdrantClient, cohere_client: cohere.Client):

    # double check if collection exists
    try:
        details = get_collection_qdrant(collection_name=collection_name,client_q=client_q)
    except:
        logger.error('collection does not exist, try creating collection by querying the initialize endpoint')
        return None


    embedded_vectors = cohere_client.embed(model="large",
                                           texts=questions).embeddings
    # Conversion to float is required for Qdrant
    vectors = [list(map(float, vector)) for vector in embedded_vectors]
    k_max = 5

    response = client_q.search(collection_name=f"{collection_name}",
                               query_vector=vectors[0],
                               limit=k_max,
                               with_payload=True)
    summarized_responses = {'result':[{'summary':'', 'page_content':""} for i in range(5)]}
    for i in range(len(response)):
        logger.info(f"#{i} {response[i].payload['page_content'][:10]}")
        page_content = response[i].payload['page_content']
        try:
            # summary = cohere_client.summarize(text=page_content)
            messages = [
            {"role": "system", "content": "You are a helpful assistant who is excellent at summarizing content of different types. Make sure you retain the most relevant details while summarizing."},
            {"role": "user", "content": f"Summarize this text for me. Text: {page_content[:700]}"}
            ]
            prompt = '''Generate a summary for the following text.
            TEXT: {page_content}
            SUMMARY:
            '''

            response_openai = openai.ChatCompletion.create(
			model="gpt-3.5-turbo", messages=messages, max_tokens=800)

            reply = response_openai['choices'][0]['message']['content']

            logger.info(f"summary: {reply}")

            summarized_responses['result'][i]['summary'] = reply
            summarized_responses['result'][i]['page_content'] = page_content
            # logger.info(f"summary: {reply}")
            # logger.info(f"summary: {summary}")
        except Exception as exception:
            logger.error(exception)
            logger.info("the exception is:...")
            logger.info(exception)
            # summary = None
    
    return summarized_responses
    
    # for result_item  in response[:1]:
    #     metadata = result_item['payload']['metadata']
    #     page_content = result_item['payload']['page_content']
    #     # take the page_content and summarize it using cohere
    #     summary = cohere_client.summarize(model="large",text=page_content)
    #     summarized_responses["response"].append(summary)
    
    # return summarized_responses
    
    # print('------\n', response[0].payload['page_content'], '\n------')
    return response
    

def create_vec_store_from_text(local_path_pdf:str, collection_name:str,embeddings,use_documents:bool=False, host:str=HOST_URL_QDRANT):
    logger.info('-- pypdf processing started')
    loader = PyPDFLoader(local_path_pdf)
    pages = loader.load_and_split()
    if use_documents is False:
        pages = [t.page_content for t in pages]
    
    logger.info('-- pages loaded')
    vec_store = Qdrant.from_texts(pages,
                                  embeddings,
                                  collection_name= collection_name,
                                  url=host,
                                  api_key=API_KEY_QDRANT)
    return vec_store

def load_vec_store_langchain(client_q:QdrantClient,host=HOST_URL_QDRANT):

  store = Qdrant(client=client_q,
                 embedding_function=embeddings.embed_query,
                 collection_name=collection_name)
  
  logger.info("store--", store)
  r = store.similarity_search_with_score(query='When was vannevar born')
  logger.info("Results ----\n", r)

def add_texts_vector_store(client_q,collection_name,local_path_pdf,host=HOST_URL_QDRANT):
  embeddings = init_cohere_embeddings()
  logger.info('-- pypdf processing started')
  loader = PyPDFLoader(local_path_pdf)
  pages = loader.load_and_split()
  pages = [t.page_content for t in pages]

  store = Qdrant(client=client_q,
                 embedding_function=embeddings.embed_query,
                 collection_name=collection_name)
  r = store.add_texts(texts = pages)
  return r
  

if __name__ == '__main__':
    pass

    
    


