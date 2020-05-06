var w = require('./weather.js');
var express = require('express'); //npm install express.js

var app = express(); // create an express application => app.get...API reference http://expressjs.com/en/4x/api.html


var bodyParser = require("body-parser");

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
    extended: true
}));

var arr = [];

var vtot1= ["Colmar1", 1, 1111];
var vtot2= ["Colmar2", 2, 2222];
app.post('/city', function (request, response) {
    console.log(request.body.city);  // to see if this app gets the entered value
    arr.push(vtot1);
    arr.push(vtot2);
    response.redirect('/city');
});

app.get('/city', function (req, res) {
    //var arr = ['Basel', 'Freiburg'];
    res.render('displayweather.ejs', { cities: arr }); //npm install ejs; the file '.ejs' must be in the folder 'views'
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log("Our app is running on port ${PORT}");
});
