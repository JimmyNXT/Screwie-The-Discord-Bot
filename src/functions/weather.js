const https = require('http');
require('dotenv').config();

module.exports = {
    execute(location, callback) 
    {
        //Set the options for the http/api request
        const options = 
        {
            hostname: 'api.weatherapi.com',
            port: 80,
            path: '/v1/forecast.json?key='+ process.env.WEATHER_API_KEY + '&q=' + location + '&days=1' ,
            method: 'POST',
            json: true
        };

        const request = https.request(options, response => 
        {
            let dataBuffer = []
            response.on('data', (data) => 
            {
                dataBuffer.push(data);
            });

            response.on('end', () => 
            {
                //console.log("Status code : " + response.statusCode);
                if(response.statusCode == 200)
                {
                    //Concatenate and convert data buffer to JSON object 
                    let output = Buffer.concat(dataBuffer);
                    const jsonObject = JSON.parse(output);

                    //use callback to return data
                    callback(jsonObject);
                }
                else
                {
                    callback("There was an error checking the weather");
                }
            });
        });
        
        request.on('error', error => 
        {
            console.error("Error : " + error);
        });

        //request.write(jsonData);
        
        request.end();
        
    },
};