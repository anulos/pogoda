const express = require("express");
const bodyParser = require("body-parser");
const app = express();
app.use(bodyParser.urlencoded({ extended: true }));
const https = require("https");



//II
app.set("view engine", "ejs");

//IV
app.use(express.static("public"));

// III Render
app.listen(process.env.PORT || 3000, function () {
    console.log("sever started on port 3000");
});
//---------------------------------


function getURLWeather(miasto) {
    return `https://api.openweathermap.org/data/2.5/weather?q=${miasto}&appid=6e2da3e5d9b9d3af615805a867be3808&units=metric`;
}

function getURLIcon(icon) {
    return `http://openweathermap.org/img/wn/${icon}@2x.png`;
}

app.get('/', function (req, res) {
    res.sendFile(`${__dirname}/index.html`);
});

app.post('/', function (req, res) {
    pokazPogode(req, res);
});


function pokazPogode(req, res) {
    var miasto = req.body.kraj;
    var urlPogoda = getURLWeather(miasto);

    https.get(urlPogoda, function (response) {

        response.on("data", function (data) {
            const danePogody = JSON.parse(data);
            // console.log(danePogody);
            const temperatura = danePogody.main.temp;
            const opis = danePogody.weather[0].description;
            const iconId = danePogody.weather[0].icon;
            const urlIcon = getURLIcon(iconId);

            var dane = {
                city: miasto,
                desc: opis,
                temp: temperatura,
                iconaUrl:urlIcon
            }
            res.render("response",dane);


        });
    });

};