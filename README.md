# Private GPT Chat Bot 
This project is based on techleadhd's [chatgpt-retrieval](https://github.com/techleadhd/chatgpt-retrieval) and enhanced on top of it. 

## Introduction of LangChain
LangChain is an Open source project, and since its launch, the project has garnered over 54K+ Github stars, which shows the popularity and acceptability of the project. The project readme file describes the framework in something like this (Source: [project repo](https://github.com/langchain-ai/langchain)):

Large language models (LLMs) are emerging as a transformative technology, enabling developers to build applications that they previously could not. However, using these LLMs in isolation is often insufficient for creating a truly powerful app — the real power comes when you can combine them with other sources of computation or knowledge.

Clearly, It defines the purpose of the framework with its aims to assist in developing such applications where user knowledge is leveraged.
LangChain has six main components to build LLM applications: model I/O, Data connections, Chains, Memory, Agents, and Callbacks. The framework also allows integration with many tools to develop full-stack applications, such as OpenAI, Huggingface Transformers, and Vectors stores like Pinecone and chromadb, among others. Let’s now look at some of the use cases for LangChain.
![img](https://github.com/bondzh/PrivateGPTChatBot/blob/main/Screenshots/langchain.png)

## Installation
Install [Langchain](https://github.com/hwchase17/langchain) and other required packages.
This project uses Langchain, OpenAI gpt-3.5-turbo model, and Chromadb. Feel free to change to any other model, like LLama 2 or GPT4, or Faiss db.
```
pip install langchain openai chromadb tiktoken unstructured
pip install PyPDF2
```
Note: please don't use the latest version of Python. Most likely, langchain chromadb or unstructured couldn't support the latest version of Python.


## Configuration
### constants.py
Modify `constants.py` to use your own [OpenAI API key](https://platform.openai.com/account/api-keys).

### chatBot.py
By default, you can place your own data into `data/` folder.
You can also change the data folder in chatBot.py
```
loader = DirectoryLoader("data/")
```
Currently, it uses gpt-3.5-turbo, you can change it to GPT4 etc.
```
llm=ChatOpenAI(model="gpt-3.5-turbo"),
```
### server.py
You can setup the document types you allow users to upload:
```
ALLOWED_EXTENSIONS = {'txt', 'pdf', 'doc', 'docx', 'xls', 'xlsx', 'ppt', 'pptx'}
```
### templates/ChatBot.html
This is the User Input GUID web page, linking to static/script.js and style.css



## To run
Go to the project folder location. 
```
python server.py
```
Click on [http://127.0.0.1:5000](http://127.0.0.1:5000)



## How it looks
Once you open it up via browser, you will see the screen as below
![img](https://github.com/bondzh/PrivateGPTChatBot/blob/main/Screenshots/MainScreen.png)

There are two preloaded questions, which can be customized under templates/ChatBot.html
![img](https://github.com/bondzh/PrivateGPTChatBot/blob/main/Screenshots/OpenAIResult.png)

You can also Drag and Drop files to the user input text box, which will upload to data/ folder. Only allowed extensions are as below, which can be amended in server.py
```
ALLOWED_EXTENSIONS = {'txt', 'pdf', 'doc', 'docx', 'xls', 'xlsx', 'ppt', 'pptx'}
```
Once it is uploaded successfully, it will auto load the file data, and you can query it straight away. 
![img](https://github.com/bondzh/PrivateGPTChatBot/blob/main/Screenshots/UploadFile.png)

Other function: You can change color if you want. The color change is under static/style.css
![img](https://github.com/bondzh/PrivateGPTChatBot/blob/main/Screenshots/SwitchColor.png)
