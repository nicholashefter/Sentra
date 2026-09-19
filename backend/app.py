from flask import Flask, request, jsonify
from analyzer import analyze_message

app = Flask(__name__)


@app.route("/")
def home():
    return jsonify({
        "message": "Sentra backend is running"
    })


@app.route("/analyze", methods=["POST"])
def analyze():
    data = request.get_json()

    if not data or "message" not in data:
        return jsonify({
            "error": "Message is required"
        }), 400

    message = data["message"]

    result = analyze_message(message)

    return jsonify(result)


if __name__ == "__main__":
    app.run(debug=True)