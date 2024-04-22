const express = require("express");
const bodyParser = require("body-parser");
const uuid4 = require("uuid4");

const app = express();
const PORT = 3010;

// Dummy user data
const users = {
  admin: {
    password: "admin",
  },
};

// Dummy city data
let cities = [
  { id: "1", name: "Berlin" },
  { id: "2", name: "Paris" },
];

const tokens = [];

// Middleware
app.use(bodyParser.json());

app.get("/", (req, res) => {
  res.send("Hello World!");
});

// Login endpoint
app.post("/auth/login", (req, res) => {
  const { username, password } = req.body;
  if (users[username] && users[username].password === password) {
    const newToken = uuid4();
    tokens.push(newToken);
    res.status(200).json({ token: newToken });
  } else {
    res.status(401).send("Username or password incorrect");
  }
});

// Change password endpoint
app.post("/auth/change-password", (req, res) => {
  const token = req.query.token;
  if (tokens.indexOf(token) === -1) {
    return res.status(401).send("Token is incorrect or missing");
  }
  const { currentPassword, newPassword } = req.body;
  if (currentPassword === users["admin"].password) {
    users["admin"].password = newPassword;
    res.sendStatus(204);
  } else {
    res.status(401).send("Current password is incorrect");
  }
});

// List cities endpoint
app.get("/cities", (req, res) => {
  const token = req.query.token;
  if (tokens.indexOf(token) === -1) {
    return res.status(401).send("Token is incorrect or missing");
  }
  res.status(200).json(cities);
});

// Add city endpoint
app.post("/cities", (req, res) => {
  const token = req.query.token;
  if (tokens.indexOf(token) === -1) {
    return res.status(401).send("Token is incorrect or missing");
  }
  const { name } = req.body;
  const id = (cities.length + 1).toString();
  cities.push({ id, name });
  res.status(201).send("City added successfully");
});

// Weather endpoint
app.get("/cities/:cityid/weather", async (req, res) => {
  const token = req.query.token;
  if (tokens.indexOf(token) === -1) {
    return res.status(401).send("Token is incorrect or missing");
  }
  const cityId = req.params.cityid;
  // Check if city exists
  const city = cities.find((city) => city.id === cityId);
  if (!city) {
    return res.status(404).send("City not found");
  }
  try {
    const weatherData = generateRandomWeatherData();
    res.status(200).json(weatherData);
  } catch (error) {
    res.status(500).send("Error fetching weather data");
  }
});

// Function to generate random weather data
function generateRandomWeatherData() {
  const startDate = new Date();
  const weatherData = [];
  for (let i = 0; i < 5; i++) {
    const date = new Date(startDate.getTime() + i * 86400000); // Increment date by 1 day
    const temperature = getRandomInt(15, 35); // Random temperature between 15°C and 35°C
    const humidity = getRandomInt(40, 80); // Random humidity between 40% and 80%
    const wind = getRandomInt(5, 20); // Random wind speed between 5 km/h and 20 km/h
    const uvindex = getRandomInt(1, 10); // Random UV index between 1 and 10
    weatherData.push({ date, temperature, humidity, wind, uvindex });
  }
  return weatherData;
}

// Function to generate random integer between min (inclusive) and max (inclusive)
function getRandomInt(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

// Start server
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
