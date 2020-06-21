const baseURL = "https://api.openweathermap.org/data/2.5/weather?";
const OpenWeatherApiKey = "76dc067665cf1fe8f05002443426d036";
const apiKey = `&appid=${OpenWeatherApiKey}`;
// const zipCode = `zip=35801,us`;

const getWeatherJournal = async (baseURL, zipCode, apiKey) => {
  const request = await fetch(`${baseURL}${zipCode}${apiKey}`);
  try {
    const weatherJournalData = await request.json();
    return weatherJournalData;
  } catch (error) {
    alert(error);
  }
};

const postWeatherJournal = async (url = "", data = {}) => {
  console.log(`postData:`, data);
  let response = await fetch(url, {
    method: "POST",
    mode: "cors",
    credentials: "same-origin",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });
  try {
    const newData = await response.json();
    return newData;
  } catch (error) {
    alert(error);
  }
};

const updateUI = async () => {
  const request = await fetch("http://localhost:4000/all");
  try {
    const allData = await request.json();
    console.log(allData);
    const last = allData.length - 1;
    document.getElementById("date").innerHTML = allData[last]["date"];
    document.getElementById(
      "temp"
    ).innerHTML = ` ${allData[last]["temperature"]} &#8457;`;
    document.getElementById(
      "content"
    ).innerHTML = ` Today's  feeling ${allData[last].userResponse} for me`;
  } catch (error) {
    alert(error);
  }
};

const kelvinToFahrenheit = (k) => {
  const f = (k - 273.15) * 1.8 + 32;
  return f.toFixed(2);
};

const performAction = async (e) => {
  e.preventDefault();
  // get zip code that user entered
  let zipEntered = parseInt(document.querySelector("#zip").value);
  let newZipCode = `zip=${zipEntered},us`;
  // Create a new date instance dynamically with JS
  let d = new Date();
  let newDate = d.getMonth() + "." + d.getDate() + "." + d.getFullYear();
  // get user response of "How are you feeling today?"
  const userResponse = document.getElementById("feelings").value;

  // chain the promises
  getWeatherJournal(baseURL, newZipCode, apiKey)
    .then(function (weatherJournalData) {
      postWeatherJournal("http://localhost:4000/all", {
        temperature: kelvinToFahrenheit(weatherJournalData.main["temp"]),
        date: newDate,
        userResponse: userResponse,
      });
    })
    .then(updateUI);
};

document.getElementById("generate").addEventListener("click", performAction);
