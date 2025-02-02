from flask import Flask, request, jsonify

app = Flask(__name__)

@app.route('/')
def home():
    return "Welcome to the Flask server!"

@app.route('/api/data', methods=['GET'])
def get_data():
    data = {"message": "This is a GET request"}
    return jsonify(data)

@app.route('/api/data', methods=['POST'])
def post_data():
    data = request.get_json()
    response = {"message": "This is a POST request", "data_received": data}
    return jsonify(response)

if __name__ == '__main__':
    app.run(debug=True)