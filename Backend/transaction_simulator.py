import random
import time
import json
from urllib.request import Request, urlopen

API_URL = "http://127.0.0.1:5000/api/transactions/analyze"


def generate_transaction():
    return {
        "amount": random.choice([
            2500,
            5000,
            12000,
            35000,
            60000,
            120000,
            250000
        ]),
        "velocity": random.randint(0, 15),
        "account_age": random.randint(5, 1000),
        "recipients": random.randint(1, 12)
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