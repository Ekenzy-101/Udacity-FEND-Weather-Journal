// Express to run server and routes
const express = require("express");

// Start up an instance of app
const app = express();

let projectData = [];

// Dependencies
const bodyParser = require("body-parser");
//Configuring our express to use body parser
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// Cors for cross origin
const cors = require("cors");
app.use(cors());

// Initialize the main project folder
app.use(express.static("website"));

const port = 4000;
// Spin up the server

// Callback to debug
const listening = () => {
  console.log("server running");
  console.log(`running on localhost: ${port}`);
};

const server = app.listen(port, listening);

const sendData = (request, response) => {
  // Return the appData object
  response.send(projectData);
};

app.get("/all", sendData);

const addData = (request, response) => {
  const newWeatherJournal = {
    temperature: request.body.temperature,
    date: request.body.date,
    userResponse: request.body.userResponse,
  };
  projectData.push(newWeatherJournal);
  response.send(projectData);
};

app.post("/all", addData);
