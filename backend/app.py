from flask import Flask, request, jsonify
from flask_cors import CORS
import openai
from dotenv import load_dotenv
import os

load_dotenv()
openai.api_key = os.environ.get("OPENAI_KEY")

app = Flask(__name__)
CORS(app)

@app.route('/debug', methods=['POST'])
def debug_code():
    data = request.get_json()
    code = data.get("code", "")
    try:
        response = openai.ChatCompletion.create(
            model="gpt-4",
            messages=[
                {"role": "system", "content": "You are an expert code debugger."},
                {"role": "user", "content": f"""First You must analyze the following code, providing constructive feedback on efficiency, redundancy, simplicity and function,
                  as well as scanning meticulously for grammar errors. 
                 You will add a footer section explaining in detail the fundamental concepts demonstrated in the code, 
                 taking the role of a teacher, you will provide a short synopsis of each topic, each titled for better readability.
                Here is the code: \n```{code}```"""}
            ]  
        )
        
        analysis = response.choices[0].message.content
        return jsonify({"analysis": analysis})
    except Exception as e:
        return jsonify({"error": str(e)}), 500

if __name__ == "__main__":
    app.run(debug=True)
