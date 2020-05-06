var w = require('./weather.js');
var express = require('express'); //npm install express.js

var app = express(); // create an express application => app.get...API reference http://expressjs.com/en/4x/api.html


var bodyParser = require("body-parser");

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
    extended: true
}));

var arr = [];

app.post('/city', function (request, response) {
    console.log(request.body.city);  // to see which city has been asked for weather's data
    var cityname = ((request.body.city).toString());

    callAsyncFunction(cityname, response);
 
});


async function callAsyncFunction(cityname, response) {

    try {
        const temparr = await waitThePromiseToBeHandled(cityname); // Waiting for the promise to be handled
        //console.log("temparr = " + temparr);
        arr.push(temparr);
        //console.log("before redirect");
        response.redirect('/city');

    } catch (error) {
        failureCallback(error);
    }

}

function failureCallback(error) {
    console.log("error =" + error);
}

function waitThePromiseToBeHandled(cityname) {
    return new Promise((resolve, reject) => {
        //console.log("cityname =" +cityname);
        w.getWeather(cityname, (errorMessage, weatherResults) => {
            if (errorMessage) {
               reject("The reject message from the promise = "+ errorMessage);
            } else {
                //console.log("API answered without error");
                var TempCel = weatherResults.Temp;
                var citytemperature = TempCel.toFixed(0);
              
                var PressureCel = weatherResults.Pressure;
                var citypressure = PressureCel.toFixed(0);

                //console.log("citytemperature = " + citytemperature + " citypressure = " + citypressure);
                var output = [cityname, citytemperature, citypressure];
                // return response.status(200).send(output);
                resolve(output);
            }
        });
    });
}

app.get('/city', function (req, res) {
    //var arr = ['Basel', 'Freiburg'];
    res.render('displayweather.ejs', { cities: arr }); //npm install ejs; the file '.ejs' must be in the folder 'views'
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log("Our app is running on port ${PORT}");
});
