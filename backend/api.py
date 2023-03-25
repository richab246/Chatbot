import numpy as np
from flask import Flask, request, jsonify
import io
from matplotlib import pyplot as plt
import base64
from Chatting import chat

app = Flask(__name__)



@app.route('/', methods=['GET'])
def process_audio():
    print("heelp")
    prompt = request.args.get('prompt')
    resp = chat(prompt)
    return jsonify({ "response": resp })

if __name__ == "__main__":
    app.run(debug=True)

# http://127.0.0.1:5000/?prompt=I%20am%20in%20stress