import sqlite3

DATABASE = "muleshield.db"


def get_connection():
    connection = sqlite3.connect(DATABASE)
    connection.row_factory = sqlite3.Row
    return connection


def initialize_database():
    connection = get_connection()

    connection.execute("""
        CREATE TABLE IF NOT EXISTS transactions (
            id INTEGER PRIMARY KEY AUTOINCREMENT,

            sender_bank TEXT NOT NULL,
            sender_account TEXT NOT NULL,

            receiver_bank TEXT NOT NULL,
            receiver_account TEXT NOT NULL,

            amount REAL NOT NULL,
            velocity INTEGER DEFAULT 0,
            account_age INTEGER DEFAULT 365,
            recipients INTEGER DEFAULT 1,

            risk_score INTEGER NOT NULL,
            decision TEXT NOT NULL,
            signals TEXT NOT NULL,

            created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
        )
    """)

    connection.commit()
    connection.close()