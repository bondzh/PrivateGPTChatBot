from flask import Flask, request, render_template, jsonify
import os
from werkzeug.utils import secure_filename
from chatBot import get_answer  # Import the get_answer function from chatBot.py

app = Flask(__name__)
document_uploaded = False  # Flag to indicate whether a document has been uploaded

@app.route('/')
def index():
    return render_template('ChatBot.html')

@app.route('/get_answer', methods=['POST'])
def get_answer_route():
    query = request.form['user_input']
    print('User Input:', query)
    # Call your Python script with the user input
    result = get_answer(query, document_uploaded)
    
    print('system output:', result)
    return result

# Set the upload folder
UPLOAD_FOLDER = 'data'
app.config['UPLOAD_FOLDER'] = UPLOAD_FOLDER


ALLOWED_EXTENSIONS = {'txt', 'pdf', 'doc', 'docx', 'xls', 'xlsx', 'ppt', 'pptx'}

def allowed_file(filename):
    return '.' in filename and filename.rsplit('.', 1)[1].lower() in ALLOWED_EXTENSIONS

@app.route('/upload_file', methods=['POST'])
def upload_file():
    global document_uploaded  # Access the global flag

    if 'file' not in request.files:
        return jsonify({'error': 'No file part'})

    file = request.files['file']

    if file.filename == '':
        return jsonify({'error': 'No selected file'})
    
    print('filename',file.filename)    
    if file and allowed_file(file.filename):
        # Ensure a secure filename and save to the upload folder
        filename = secure_filename(file.filename)
        filepath = os.path.join(app.config['UPLOAD_FOLDER'], filename)
        file.save(filepath)
        # Set the flag to True when a new document is uploaded
        document_uploaded = True
        return jsonify({'message': 'File uploaded successfully', 'filename': filename})
    else:
        return jsonify({'error': 'Invalid file type'})
    
if __name__ == '__main__':
    app.run(debug=False)
