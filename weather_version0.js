var https = require('https');

function printMessage(parsedData) {
 //console.log(parsedData);
 console.log("This is a node.js application");
 console.log("The temperature in "+ parsedData.name + " is now " + parsedData.main.temp + "°C");
}

function getWeather(town) {
    
    // notice &units=metric allows to have the temperature in °C and not °K !!!!
    https.get('https://api.openweathermap.org/data/2.5/weather?q='+town+'&units=metric&APPID=a15539bece1d4d14d330c6e6cc4f7bad', (res) => {
    const { statusCode } = res;
    const contentType = res.headers['content-type'];

    //console.log('status code : ' + res.statusCode);

    let error;
    if (statusCode !== 200) {
        error = new Error('Request Failed.\n' +
                        `Status Code: ${statusCode}`);
    } else if (!/^application\/json/.test(contentType)) {
        error = new Error('Invalid content-type.\n' +
                        `Expected application/json but received ${contentType}`);
    }
    if (error) {
        console.error(error.message);
        // Consume response data to free up memory
        res.resume();
        return ;
    }

    //No error has occured yet
    res.setEncoding('utf8');
    let rawData = '';
    res.on('data', (chunk) => { rawData += chunk; }); // read data by portion. Notice the type of the data is a string
    res.on('end', () => { // when all data are read
        try {
        var Temp =  res.main.temp;
        console.log("Temp = "+ Temp);
        var parsedData = JSON.parse(rawData); // convert string to json
        //Console.log("coucou" +parsedData.name); // display json result
        printMessage(parsedData);
        } catch (e) {
        console.error(e.message);
        }
    });
    }).on('error', (e) => {
    console.error(`Got error: ${e.message}`);
    });
}

module.exports.getWeather = getWeather;
