def calculate_risk(transaction):
    """
    Calculate a transparent risk score for a transaction.
    Returns a score from 0 to 100 and the signals that caused the score.
    """

    score = 0
    signals = []

    amount = transaction.get("amount", 0)
    velocity = transaction.get("velocity", 0)
    account_age = transaction.get("account_age", 365)
    recipients = transaction.get("recipients", 1)

    # 1. Transaction amount
    if amount >= 100000:
        score += 25
        signals.append("HIGH TRANSACTION VALUE")
    elif amount >= 50000:
        score += 15
        signals.append("ELEVATED TRANSACTION VALUE")

    # 2. Transaction velocity
    if velocity >= 10:
        score += 30
        signals.append("HIGH VELOCITY")
    elif velocity >= 5:
        score += 15
        signals.append("ELEVATED VELOCITY")

    # 3. Account age
    if account_age < 30:
        score += 20
        signals.append("NEW ACCOUNT")

    # 4. Number of recipients
    if recipients >= 8:
        score += 25
        signals.append("MANY RECIPIENTS")
    elif recipients >= 5:
        score += 15
        signals.append("MULTIPLE RECIPIENTS")

    # Keep score within 0–100
    score = min(score, 100)

    # Decide what MuleShield should do
    if score >= 70:
        decision = "BLOCK"
    elif score >= 40:
        decision = "HOLD"
    else:
        decision = "ALLOW"

    return {
        "risk_score": score,
        "decision": decision,
        "signals": signals
    }