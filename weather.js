var https = require('https');
const request =require('request');

function printMessage(parsedData) {
 //console.log(parsedData);
 console.log("This is a node.js application");
 console.log("The temperature in "+ parsedData.name + " is now " + parsedData.main.temp + "°C");
}


var getWeather = (town,callback) => {
    p1 = 'https://api.openweathermap.org/data/2.5/weather?q=';
    p3 = '&units=metric&appid=a15539bece1d4d14d330c6e6cc4f7bad';

    request ({
        url: p1+town+p3,
        json: true
    },(error,response,body)=>
    {
        if(!error && response.statusCode === 200)
        {
          // console.log("no error, the temperature is = " + body.main.temp);
           callback(undefined,{
            Temp: body.main.temp,
            Pressure : body.main.pressure
           });
        }
        else {
            //console.log('unable to fetch weather');
            callback('unable to fetch weather');
        }
    
    });
};

module.exports.getWeather = getWeather;
