from collections import defaultdict


def build_transaction_graph(transactions):
    """
    Build a directed money-flow graph.

    Each account is a node.
    Each transaction creates an edge:
        sender_account -> receiver_account
    """

    graph = defaultdict(list)

    for transaction in transactions:
        sender = transaction["sender_account"]
        receiver = transaction["receiver_account"]

        graph[sender].append({
            "receiver": receiver,
            "amount": transaction["amount"],
            "sender_bank": transaction["sender_bank"],
            "receiver_bank": transaction["receiver_bank"]
        })

    return graph


def detect_suspicious_nodes(graph):
    """
    Identify accounts that send money to many different accounts.
    """

    suspicious_nodes = []

    for account, transfers in graph.items():

        unique_receivers = set(
            transfer["receiver"]
            for transfer in transfers
        )

        # Simple network signal:
        # an account sending to 3+ different accounts
        if len(unique_receivers) >= 3:
            suspicious_nodes.append({
                "account": account,
                "receiver_count": len(unique_receivers),
                "reason": "HIGH NETWORK FAN-OUT"
            })

    return suspicious_nodes