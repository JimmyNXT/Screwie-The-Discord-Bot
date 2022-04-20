const https = require('https');
const fs = require('fs');

let yodafyData = require('../data/yodafy.json');

module.exports = {
    execute(inText, callback) {
        inText = inText.charAt(0).toUpperCase() + inText.substring(1);
        //console.log("New string : " + inText);
        if(yodafyData[inText])
        {
            callback(yodafyData[inText]);
        }
        else
        {
            //Ready the text for translation
            const jsonData = JSON.stringify({text: inText});

            //Set the options for the http/api request
            const options = 
            {
                hostname: 'api.funtranslations.com',
                port: 443,
                path: '/translate/yoda.json',
                method: 'POST',
                headers: 
                {
                    'Content-Type': 'application/json',
                    'Content-Length': jsonData.length
                }
            };

            const request = https.request(options, response => 
            {
                //console.log(`statusCode: ${response.statusCode}`);

                let dataBuffer = []
                response.on('data', (data) => 
                {
                    dataBuffer.push(data);
                });

                response.on('end', () => 
                {
                    if(response.statusCode == 200)
                    {
                        //Concatenate and convert data buffer to JSON object 
                        let output = Buffer.concat(dataBuffer);
                        const jsonObject = JSON.parse(output);

                        //Save new entry to file
                        yodafyData[inText] = jsonObject.contents.translated;

                        fs.writeFile('./data/yodafy.json', JSON.stringify(yodafyData), function (err) 
                        {
                            if (err) throw err;
                        }); 

                        //use callback to return data
                        callback(jsonObject.contents.translated);
                    }
                    else
                    {
                        callback("Tired now, Yoda is");
                    }
                });
            });
            
            request.on('error', error => 
            {
                console.error("Error : " + error);
            });

            request.write(jsonData)
            
            request.end();
        }
    },
};