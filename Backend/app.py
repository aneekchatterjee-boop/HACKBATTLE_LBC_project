import json
from flask import Flask, jsonify,request
from flask_cors import CORS
from services.risk_engine import calculate_risk
from graph.network_detector import build_transaction_graph, detect_suspicious_nodes
from database import initialize_database , get_connection

app = Flask(__name__)
initialize_database()
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

    connection = get_connection()

    connection.execute("""
    INSERT INTO transactions
    (
        sender_bank,
        sender_account,
        receiver_bank,
        receiver_account,
        amount,
        velocity,
        account_age,
        recipients,
        risk_score,
        decision,
        signals
    )
    VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
""", (
    transaction.get("sender_bank", "Unknown Bank"),
    transaction.get("sender_account", "Unknown Account"),
    transaction.get("receiver_bank", "Unknown Bank"),
    transaction.get("receiver_account", "Unknown Account"),
    transaction.get("amount", 0),
    transaction.get("velocity", 0),
    transaction.get("account_age", 365),
    transaction.get("recipients", 1),
    result["risk_score"],
    result["decision"],
    json.dumps(result["signals"])
))

    connection.commit()
    connection.close()

    return jsonify(result)
@app.get("/api/transactions")
def get_transactions():
    connection = get_connection()

    rows = connection.execute("""
        SELECT
    id,
    sender_bank,
    sender_account,
    receiver_bank,
    receiver_account,
    amount,
    velocity,
    account_age,
    recipients,
    risk_score,
    decision,
    signals,
    created_at
FROM transactions
        ORDER BY id DESC
    """).fetchall()

    connection.close()

    transactions = []

    for row in rows:
        transactions.append({
    "id": row["id"],

    "sender_bank": row["sender_bank"],
    "sender_account": row["sender_account"],

    "receiver_bank": row["receiver_bank"],
    "receiver_account": row["receiver_account"],

    "amount": row["amount"],
    "velocity": row["velocity"],
    "account_age": row["account_age"],
    "recipients": row["recipients"],

    "risk_score": row["risk_score"],
    "decision": row["decision"],
    "signals": json.loads(row["signals"]),
    "created_at": row["created_at"]
})

    return jsonify(transactions)
@app.get("/api/graph")
def analyze_graph():
    connection = get_connection()

    rows = connection.execute("""
        SELECT
            sender_bank,
            sender_account,
            receiver_bank,
            receiver_account,
            amount
        FROM transactions
    """).fetchall()

    connection.close()

    transactions = [dict(row) for row in rows]

    graph = build_transaction_graph(transactions)
    suspicious_nodes = detect_suspicious_nodes(graph)

    return jsonify({
        "nodes": len(graph),
        "suspicious_nodes": suspicious_nodes
    })
if __name__ == "__main__":
    app.run(host="127.0.0.1", port=5000, debug=True)