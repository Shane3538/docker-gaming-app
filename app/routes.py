from flask import Blueprint, flash, jsonify, redirect, render_template, request, session, url_for
from werkzeug.security import check_password_hash

from .models import create_user, get_top_scores, get_user_best_score, get_user_by_id, get_user_by_username, save_score, validate_login

bp = Blueprint("main", __name__)


def login_required(view):
    def wrapper(*args, **kwargs):
        if "user_id" not in session:
            return redirect(url_for("main.login"))
        return view(*args, **kwargs)

    wrapper.__name__ = view.__name__
    return wrapper


@bp.route("/")
def index():
    if "user_id" in session:
        return redirect(url_for("main.dashboard"))
    return redirect(url_for("main.login"))


@bp.route("/login", methods=["GET", "POST"])
def login():
    if request.method == "POST":
        username = request.form["username"].strip()
        password = request.form["password"]

        if not username or not password:
            flash("Please enter both username and password.", "error")
            return render_template("login.html")

        if validate_login(username, password):
            user = get_user_by_username(username)
            session["user_id"] = user["id"]
            session["username"] = user["username"]
            flash("Welcome back!", "success")
            return redirect(url_for("main.dashboard"))

        flash("Invalid username or password.", "error")

    return render_template("login.html")


@bp.route("/register", methods=["GET", "POST"])
def register():
    if request.method == "POST":
        username = request.form["username"].strip()
        password = request.form["password"]
        confirm_password = request.form["confirm_password"]

        if not username or not password or not confirm_password:
            flash("All fields are required.", "error")
            return render_template("register.html")

        if len(username) < 3:
            flash("Username must be at least 3 characters long.", "error")
            return render_template("register.html")

        if password != confirm_password:
            flash("Passwords do not match.", "error")
            return render_template("register.html")

        if len(password) < 6:
            flash("Password must be at least 6 characters long.", "error")
            return render_template("register.html")

        if get_user_by_username(username):
            flash("That username already exists.", "error")
            return render_template("register.html")

        create_user(username, password)
        flash("Registration successful. Please login.", "success")
        return redirect(url_for("main.login"))

    return render_template("register.html")


@bp.route("/logout")
def logout():
    session.clear()
    flash("You have been logged out.", "success")
    return redirect(url_for("main.login"))


@bp.route("/dashboard")
@login_required
def dashboard():
    user = get_user_by_id(session["user_id"])
    best_score = get_user_best_score(user["id"])
    leaderboard = get_top_scores(limit=5)

    return render_template(
        "dashboard.html",
        username=user["username"],
        best_score=best_score,
        leaderboard=leaderboard,
    )


@bp.route("/save_score", methods=["POST"])
@login_required
def save_score():
    try:
        score = int(request.form.get("score", 0))
    except ValueError:
        return jsonify({"status": "error", "message": "Invalid score"}), 400

    if score < 0:
        score = 0

    from .models import save_score as save

    save(session["user_id"], score)
    return jsonify({"status": "success", "message": "Score saved"})
