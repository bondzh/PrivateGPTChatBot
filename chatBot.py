import os
import sys
from langchain.document_loaders import DirectoryLoader
from langchain.embeddings import SentenceTransformerEmbeddings
from langchain.indexes import VectorstoreIndexCreator
from langchain.vectorstores import Chroma
from langchain.text_splitter import RecursiveCharacterTextSplitter
from langchain.chains import ConversationalRetrievalChain
from langchain.chat_models import ChatOpenAI

import constants

os.environ["OPENAI_API_KEY"] = constants.APIKEY

# directory path
directory = "data/"

# split the docs into chunks using recursive character splitter
def split_docs(documents, chunk_size=1000, chunk_overlap=20):
    text_splitter = RecursiveCharacterTextSplitter(chunk_size=chunk_size, chunk_overlap=chunk_overlap)
    docs = text_splitter.split_documents(documents)
    return docs

def load_docs(directory):
    loader = DirectoryLoader(directory)
    documents = loader.load()
    return documents

# store the split documents in the docs variable
documents = load_docs(directory)
docs = split_docs(documents)

# Enable to save to disk & reuse the model (for repeated queries on the same data)
PERSIST = False

if PERSIST and os.path.exists("persist"):
    print("Reusing index...\n")
    
    embeddings = SentenceTransformerEmbeddings(model_name="all-MiniLM-L6-v2")
    db = Chroma.from_documents(docs, embeddings)
    index = VectorStoreIndexCreator(vectorstore=db).from_loaders([loader])
else:
    loader = DirectoryLoader(directory)
    if PERSIST:
        index = VectorstoreIndexCreator(vectorstore_kwargs={"persist_directory": "persist"}).from_loaders([loader])
    else:
        index = VectorstoreIndexCreator().from_loaders([loader])


chain = ConversationalRetrievalChain.from_llm(
    llm=ChatOpenAI(model="gpt-3.5-turbo"),
    retriever=index.vectorstore.as_retriever(search_kwargs={"k": 1}),
)

chat_history = []

def get_answer(query, document_uploaded=False):
    global chat_history, chain, loader, index
    try:
        # Reload documents if a new document has been uploaded
        if document_uploaded:
            loader = DirectoryLoader("data/")
            index = VectorstoreIndexCreator().from_loaders([loader])
        result = chain({"question": query, "chat_history": chat_history})
        answer = result['answer']
        chat_history.append((query, answer))
        return answer
    except:
        error_message = "Please take a break, you have reached your Rate Limit in GPT 3.5. Please try again in 20s."
        return error_message
