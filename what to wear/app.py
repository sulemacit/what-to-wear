from flask import Flask, render_template, request, jsonify
import requests

app = Flask(__name__)

API_KEY = "a4e5c1bf770991f74fabfbce792ea270"

def clothing_advice(temp):
    if temp <= 5:
        return "❄️ Winter: Wear a coat, sweater, and boots."
    elif 6 <= temp <= 15:
        return "🍂 Spring/Fall: A jacket is enough."
    elif 16 <= temp <= 25:
        return "🌤️ Mild weather: T-shirt and light pants."
    else:
        return "☀️ Summer: Shorts and a T-shirt."

@app.route("/")
def index():
    return render_template("index.html")

@app.route("/weather", methods=["POST"])
def weather():
    data = request.get_json()   
    city = data.get("city") if data else None

    if not city:
        return jsonify({"error": "City is required"}), 400

    url = (
        "https://api.openweathermap.org/data/2.5/weather"
        f"?q={city}&appid={API_KEY}&units=metric&lang=en"
    )

    response = requests.get(url)

    if response.status_code != 200:
        return jsonify({"error": "City not found"}), 404

    weather_data = response.json()

    temp = round(weather_data["main"]["temp"])
    desc = weather_data["weather"][0]["description"]

    return jsonify({
        "city": city,
        "temp": temp,
        "desc": desc,
        "advice": clothing_advice(temp)
    })

if __name__ == "__main__":
    app.run(debug=True)
