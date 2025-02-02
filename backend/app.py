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
                  as well as scanning meticolousy for grammar errors. 
                 you will add a footer section explaining in detail the fundamental concepts demonstrated in the code, 
                 taking the role of a teacher you will provide a short synopsis of each topic each titled for better readability.
                here is the code: \n```{code}```"""}
            ]  
        )
        
        analysis = response.choices[0].message.content
        return jsonify({"analysis": analysis})
    except Exception as e:
        return jsonify({"error": str(e)}), 500

    prompt = (
        "You are an expert code debugger. Analyze the following code, "
        "identify any errors or issues, and for each problem, provide:\n"
        "  - A brief error message with the line number (if applicable).\n"
        "  - A detailed explanation of why it is a problem.\n"
        "  - Suggestions on how to fix it.\n"
        "  - Provide Explaination on the topic that they seem to be struggling with in a structured way\n\n"
        f"Code:\n{code}\n"
    )

    try:
        response = openai.ChatCompletion.create(
            model="gpt-3.5-turbo",
            messages=[
                {"role": "system", "content": "You are an expert code debugger."},
                {"role": "user", "content": prompt}
            ],
        )
        analysis = response.choices[0].message.content
        return jsonify({"analysis": analysis})
    except Exception as e:
        return jsonify({"error": str(e)}), 500

if __name__ == "__main__":
    app.run(debug=True)
