from flask import Flask, jsonify,request
from flask_cors import CORS
from services.risk_engine import calculate_risk

app = Flask(__name__)
CORS(app)


@app.get("/api/health")
def health():
    return jsonify({
        "status": "ok",
        "service": "MuleShield"
    })
@app.post("/api/transactions/analyze")
def analyze_transaction():
    transaction = request.get_json()

    result = calculate_risk(transaction)

    return jsonify(result)

if __name__ == "__main__":
    app.run(host="127.0.0.1", port=5000, debug=True)