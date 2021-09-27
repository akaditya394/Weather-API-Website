const express = require("express");
const bodyParser = require("body-parser");
const https = require("https");

require('dotenv').config();






const app = express();



app.set('view engine', 'ejs');

app.use(bodyParser.urlencoded({
  extended: true
}));
app.use(express.static("public"));

app.get("/", function(req, res) {

  res.render("home")

});
app.post("/report", function(req, res) {
  const city = req.body.cityName;
  const url = "https://api.openweathermap.org/data/2.5/weather?q="+city+process.env.API_KEY;
  https.get(url, function(response) {

    response.on("data", function(data) {
      const weatherData = JSON.parse(data);
      const temp = weatherData.main.temp;
      const weatherDescription = weatherData.weather[0].description;
      console.log(temp, weatherDescription);
      res.write("<h1>The temperature is "+ temp+" ° Celcius with "+weatherDescription+".<h1>");


    })
  });


  // res.render("report", {
  //   city,
  //   temp
  // });
});





app.listen(3001, function(req, res) {
  console.log("Server is up and running at 3001");
});
