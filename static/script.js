function sendMessage() {
    var userInput = document.getElementById('user-input').value;
    //console.log('User Input:', userInput);
    
    hideDefaultQuestions();
    if (userInput.trim() !== '') {                
        // Append user message
        appendUserMessage(userInput);
        // Send the user input to the server
        fetch('/get_answer', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded',
            },
            body: 'user_input=' + encodeURIComponent(userInput),
        })
        .then(response => response.text())
        .then(data => {
            // Wait for a short time (e.g., 500ms) before appending the system message
            setTimeout(function() {
                appendSystemMessage(data);
            }, 500);
        });

        document.getElementById('user-input').value = '';
    }
}

function appendUserMessage(message) {
    var chatContainer = document.getElementById('chat-container');
    var messageDiv = document.createElement('div');
    messageDiv.className = 'message-bubble user-bubble';
    messageDiv.innerHTML = message;
    chatContainer.appendChild(messageDiv);
    chatContainer.scrollTop = chatContainer.scrollHeight; // Scroll to the bottom
}

function appendSystemMessage(message) {
    var chatContainer = document.getElementById('chat-container');
    var messageDiv = document.createElement('div');
    messageDiv.className = 'message-bubble system-bubble';
    messageDiv.innerHTML = message;
    chatContainer.appendChild(messageDiv);
    chatContainer.scrollTop = chatContainer.scrollHeight; // Scroll to the bottom
}

function toggleStyle() {
    var body = document.body;
    var chatContainer = document.getElementById('chat-container');
    var inputContainer = document.getElementById('input-container');
    var userInput = document.getElementById('user-input');

    if (body.style.backgroundColor === 'rgb(255, 255, 255)') {
        // Switch to dark style
        body.style.backgroundColor = '#1E1E1E';
        body.style.color = '#FFF';
        chatContainer.style.backgroundColor = '#1E1E1E';
        inputContainer.style.backgroundColor = '#2D2D2D';
        userInput.style.backgroundColor = '#333';
        userInput.style.color = '#FFF';
    } else {
        // Switch to light style
        body.style.backgroundColor = '#FFF';
        body.style.color = '#333';
        chatContainer.style.backgroundColor = '#FFF';
        inputContainer.style.backgroundColor = '#EEE';
        userInput.style.backgroundColor = '#FFF';
        userInput.style.color = '#333';
    }
}

function handleKeyDown() {
    var userInput = document.getElementById('user-input');
    if (event.key === 'Enter' && !event.shiftKey) {
        event.preventDefault();
        if (userInput.value.trim() !== '') {
            sendMessage();
        }
    }
}

function handleDragOver(event) {
    event.preventDefault();
    document.getElementById('user-input-container').style.border = 'none';
}

function handleDragLeave(event) {
    event.preventDefault();
    document.getElementById('user-input-container').style.border = 'none';
}

function handleFileChange(event) {
    var files = event.target.files;
    handleFiles(files);
}
function selectDefaultQuestion(question) {
    // Set the selected default question as the user input
    var userInput = document.getElementById('user-input');
    userInput.value = question;
    sendMessage();
    hideDefaultQuestions();
}
// Function to hide default questions
function hideDefaultQuestions() {
    var defaultQuestions = document.getElementsByClassName('default-question');
    for (var i = 0; i < defaultQuestions.length; i++) {
        defaultQuestions[i].style.display = 'none';
    }
}
function appendUserMessage(message) {
    var chatContainer = document.getElementById('chat-container');
    var messageDiv = document.createElement('div');
    messageDiv.className = 'message-bubble user-bubble';
    messageDiv.innerText = message; // Use innerText to escape HTML codes
    chatContainer.appendChild(messageDiv);
    chatContainer.scrollTop = chatContainer.scrollHeight; // Scroll to the bottom
}
function handleFiles(files) {
    for (var i = 0; i < files.length; i++) {
        var file = files[i];
        //appendSystemMessage('Uploading file: ' + file.name);
        var formData = new FormData();
        formData.append('file', file);

        fetch('/upload_file', {
            method: 'POST',
            body: formData
        })
        .then(response => response.json())
        .then(data => {
            if ('error' in data) {
                if (data.error.includes('Unexpected token')) {
                    // Display a custom error message for invalid file type
                    appendSystemMessage('Invalid file type. Please upload a valid document.' + data.error);
                } else {
                    // Display the default error message
                    appendSystemMessage('Error uploading file: ' + data.error);
                }
            } else {
                // Display a success message or handle the uploaded file
                appendSystemMessage('File uploaded successfully: ' + data.filename);
            }
            
        })
        .catch(error => {            
            if (error.message === 'Server error') {
                appendSystemMessage('Please take a break, you have reached your Rate Limit in GPT 3.5. Please try again in 20s.' + error.message);
            }else{
                appendSystemMessage('Error uploading file: ' + error.message);
            }
        });
    }
}

// Allow drag and drop
var uploadContainer = document.getElementById('user-input-container');
uploadContainer.addEventListener('dragover', handleDragOver);
uploadContainer.addEventListener('dragleave', handleDragLeave);
uploadContainer.addEventListener('drop', function(event) {
    event.preventDefault();
    document.getElementById('user-input-container').style.border = 'none';
    var files = event.dataTransfer.files;
    handleFiles(files);
});
var userInput = document.getElementById('user-input-container');

function autoExpand() {
    userInput.style.height = 'auto';
    userInput.style.height = (userInput.scrollHeight) + 'px';
}

// Get the top bar element
var topBar = document.getElementById('top-bar');

// Get the chat container element
var chatContainer = document.getElementById('chat-container');

// Add a function to check and update the visibility of the top bar
function updateTopBarVisibility() {
    var totalChatHeight = chatContainer.scrollHeight;
    var screenHeight = window.innerHeight;
    var scrolledToTop = chatContainer.scrollTop === 0;
    if (totalChatHeight > screenHeight && !scrolledToTop) {
        topBar.style.display = 'none';
        chatContainer.style.marginTop='0px';
    } else {
        topBar.style.display = 'block';
        chatContainer.style.marginTop='50px';
    }
}

// Add an event listener for the chat container scroll event
chatContainer.addEventListener('scroll', updateTopBarVisibility);