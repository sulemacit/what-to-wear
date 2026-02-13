// WEATHER
function getWeather() {
  const city = document.getElementById("cityInput").value;

  fetch("/weather", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ city })
  })
  .then(res => res.json())
  .then(data => {
    if (data.error) {
      document.getElementById("weatherText").innerText = data.error;
      return;
    }

    //  TEMPERATURE + DESCRIPTION TOGETHER
    document.getElementById("weatherText").innerText =
      `${data.city} | ${data.temp}°C — ${data.desc}`;

    updateFabricResponse(data);
  });
}

// FABRIC RESPONSE
function updateFabricResponse(weather) {
  const temp = weather.temp;
  const desc = weather.desc.toLowerCase();

  let atmosphere = "A calm, balanced atmosphere.";
  if (desc.includes("rain")) atmosphere = "Moist air with diffused light.";
  if (desc.includes("cloud")) atmosphere = "Muted sky with soft shadows.";
  if (desc.includes("clear")) atmosphere = "Clear light and defined contrast.";

  document.getElementById("atmosphereText").innerText = atmosphere;

  let cotton, wool, silk, linen, styling;

  if (temp <= 5) {
    cotton = "Feels better closer to the skin, layered and soft.";
    wool = "Comforting and protective in the cold air.";
    silk = "Works best underneath, adding quiet warmth.";
    linen = "Too light for this kind of weather.";
    styling = "Layer up. Let comfort shape the silhouette.";
  } 
  else if (temp <= 15) {
    cotton = "Easy to layer, light but dependable.";
    wool = "Just enough structure without feeling heavy.";
    silk = "Moves gently with you.";
    linen = "Adds a subtle texture.";
    styling = "Soft layers, nothing too rigid.";
  } 
  else if (temp <= 25) {
    cotton = "Light, breathable, effortless.";
    wool = "Only in small touches.";
    silk = "Fluid and expressive.";
    linen = "Feels natural and relaxed.";
    styling = "Let the clothes move freely.";
  } 
  else {
    cotton = "Loose and airy against the skin.";
    wool = "Better left aside today.";
    silk = "Almost weightless in the heat.";
    linen = "Perfect for staying cool.";
    styling = "Keep it simple. Let the air in.";
  }

  document.getElementById("cottonText").innerText = cotton;
  document.getElementById("woolText").innerText = wool;
  document.getElementById("silkText").innerText = silk;
  document.getElementById("linenText").innerText = linen;
  document.getElementById("stylingText").innerText = styling;
}

// MUSIC
const songs = [
  "/static/sounds/bg.mp3",
  "/static/sounds/song2.mp3",
  "/static/sounds/song3.mp3"
];

const player = document.getElementById("player");

function playSong(index) {
  player.src = songs[index];
  player.play();
}
