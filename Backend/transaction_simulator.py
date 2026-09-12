import random
import time
import json
from urllib.request import Request, urlopen

API_URL = "http://127.0.0.1:5000/api/transactions/analyze"

mule_sequence = [
    ("Bank A", "MULE-A1", "Bank B", "MULE-B1"),
    ("Bank A", "MULE-A1", "Bank C", "MULE-C1"),
    ("Bank A", "MULE-A1", "Bank D", "MULE-D1"),

    ("Bank B", "MULE-B1", "Bank C", "MULE-C1"),
    ("Bank B", "MULE-B1", "Bank D", "MULE-D1"),
    ("Bank B", "MULE-B1", "Bank A", "MULE-A1"),
]

mule_index = 0
def generate_transaction():
    banks = ["Bank A", "Bank B", "Bank C", "Bank D"]

    # 70% normal transactions
    if random.random() < 0.7:
        sender_bank = random.choice(banks)
        receiver_bank = random.choice(
            [bank for bank in banks if bank != sender_bank]
        )

        return {
            "sender_bank": sender_bank,
            "sender_account": f"{sender_bank.replace(' ', '')}-{random.randint(1000, 9999)}",
            "receiver_bank": receiver_bank,
            "receiver_account": f"{receiver_bank.replace(' ', '')}-{random.randint(1000, 9999)}",
            "amount": random.choice([
                2500, 5000, 12000, 35000, 60000
            ]),
            "velocity": random.randint(0, 5),
            "account_age": random.randint(100, 1000),
            "recipients": random.randint(1, 4)
        }

        # 30% suspicious mule-network transactions
    global mule_index

    sender_bank, sender_account, receiver_bank, receiver_account = (
        mule_sequence[mule_index]
    )

    mule_index = (mule_index + 1) % len(mule_sequence)

    return {
        "sender_bank": sender_bank,
        "sender_account": sender_account,
        "receiver_bank": receiver_bank,
        "receiver_account": receiver_account,
        "amount": random.choice([
            60000, 80000, 120000, 150000
        ]),
        "velocity": random.randint(8, 15),
        "account_age": random.randint(5, 40),
        "recipients": random.randint(6, 12)
    }

def send_transaction(transaction):
    data = json.dumps(transaction).encode("utf-8")

    request = Request(
        API_URL,
        data=data,
        headers={"Content-Type": "application/json"},
        method="POST"
    )

    try:
        with urlopen(request) as response:
            result = json.loads(response.read().decode("utf-8"))

        print("\nTransaction:", transaction)
        print("Risk Score:", result["risk_score"])
        print("Decision:", result["decision"])
        print("Signals:", result["signals"])

    except Exception as error:
        print("Could not connect to backend:", error)


while True:
    transaction = generate_transaction()
    send_transaction(transaction)

    time.sleep(2)