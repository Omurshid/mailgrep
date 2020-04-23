import time
from flask import Flask, request, jsonify, send_from_directory

app = Flask(__name__)

@app.route('/api/time')
def get_current_time():
    return {'time': time.time()}

@app.route('/api/get_count', methods = ['POST'])
def result():
    json = request.json
    print(json)
    if json:
       return {'count': calculate(json['first'],json['last'])}
    return "No player information is given"

def calculate(first,last):
    return len(first)+len(last)

