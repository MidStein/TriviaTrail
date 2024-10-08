import os
import psycopg
from flask import g


def get_db():
    if "db" not in g:
        g.db = psycopg.connect(
            f"user={os.getenv("POSTGRES_USER")} "
            + (
                f"password={os.getenv('POSTGRES_PASSWORD')} "
                if os.getenv("POSTGRES_PASSWORD")
                else ""
            )
            + f"host={os.getenv("POSTGRES_HOST")} "
            + f"dbname={os.getenv("POSTGRES_DB")}"
        )
    return g.db


def close_db(e=None):
    db = g.pop("db", None)
    if db is not None:
        db.close()


def init_app(app):
    app.teardown_appcontext(close_db)
