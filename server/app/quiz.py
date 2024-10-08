import json

from flask import (
    Blueprint,
    make_response
)

from .db import get_db

bp = Blueprint("quiz", __name__)

@bp.route("/categories")
def getAllCategories():
    db = get_db()
    cur = db.cursor()
    cur.execute('SELECT category FROM quiz GROUP BY category')
    categories = cur.fetchall()
    categories = [tpl[0] for tpl in categories]
    cur.close()
    resp = make_response(json.dumps(categories))
    resp.headers["Access-Control-Allow-Origin"] = "*"
    return resp

@bp.route("/<category>")
def getOneCategoryData(category):
    db = get_db()
    cur = db.cursor()
    dataArr = []
    cur.execute(
        'SELECT id, difficulty, question, correct_answer FROM quiz WHERE category = %s',
        (category,)
    )
    for record in cur:
        dataArr.append({
            "id": record[0],
            "difficulty": record[1],
            "question": record[2],
            "correct_answer": record[3]
        })
    cur.close()
    resp = make_response(json.dumps(dataArr))
    resp.headers["Access-Control-Allow-Origin"] = "*"
    return resp
