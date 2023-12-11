# Private GPT Chat Bot
This project is based on techleadhd's [chatgpt-retrieval](https://github.com/techleadhd/chatgpt-retrieval) and enhanced on top of it. 

## Installation
Install [Langchain](https://github.com/hwchase17/langchain) and other required packages.
This project uses Langchain, OpenAI gpt-3.5-turbo model, and Chromadb. Feel free to change to any other model, like LLama 2 or GPT4, or Faiss db.
```
pip install langchain openai chromadb tiktoken unstructured
```
Modify `constants.py` to use your own [OpenAI API key](https://platform.openai.com/account/api-keys).

Place your own data into `data/` folder.

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
