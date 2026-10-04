import os
import sqlite3
from flask import current_app, g
from werkzeug.security import check_password_hash, generate_password_hash


def get_db():
    if "db" not in g:
        g.db = sqlite3.connect(current_app.config["DATABASE"])
        g.db.row_factory = sqlite3.Row
    return g.db


def close_db(e=None):
    db = g.pop("db", None)
    if db is not None:
        db.close()


def init_db():
    db = sqlite3.connect(current_app.config["DATABASE"])
    db.execute(
        """
        CREATE TABLE IF NOT EXISTS users (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            username TEXT UNIQUE NOT NULL,
            password TEXT NOT NULL,
            created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
        )
        """
    )
    db.execute(
        """
        CREATE TABLE IF NOT EXISTS scores (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            user_id INTEGER NOT NULL,
            score INTEGER NOT NULL,
            created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
            FOREIGN KEY (user_id) REFERENCES users(id)
        )
        """
    )
    db.commit()
    db.close()


def create_user(username, password):
    db = get_db()
    db.execute(
        "INSERT INTO users (username, password) VALUES (?, ?)",
        (username, generate_password_hash(password)),
    )
    db.commit()


def get_user_by_username(username):
    db = get_db()
    return db.execute(
        "SELECT * FROM users WHERE username = ?", (username,)
    ).fetchone()


def get_user_by_id(user_id):
    db = get_db()
    return db.execute(
        "SELECT * FROM users WHERE id = ?", (user_id,)
    ).fetchone()


def save_score(user_id, score):
    db = get_db()
    db.execute(
        "INSERT INTO scores (user_id, score) VALUES (?, ?)",
        (user_id, score),
    )
    db.commit()


def get_user_best_score(user_id):
    db = get_db()
    row = db.execute(
        "SELECT MAX(score) AS best_score FROM scores WHERE user_id = ?",
        (user_id,),
    ).fetchone()
    return row["best_score"] if row and row["best_score"] is not None else 0


def get_top_scores(limit=5):
    db = get_db()
    rows = db.execute(
        """
        SELECT u.username, MAX(s.score) AS best_score
        FROM scores s
        JOIN users u ON u.id = s.user_id
        GROUP BY u.id, u.username
        ORDER BY best_score DESC
        LIMIT ?
        """,
        (limit,),
    ).fetchall()
    return rows


def validate_login(username, password):
    user = get_user_by_username(username)
    if user is None:
        return False
    return check_password_hash(user["password"], password)
