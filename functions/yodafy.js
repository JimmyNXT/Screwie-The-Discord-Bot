const https = require('https');

const yodafyURL = "https://api.funtranslations.com/translate/yoda.json?text="

//TODO:

module.exports = {
    execute(inText, callback) {
        const jsonData = JSON.stringify({text: inText})

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
            console.log(`statusCode: ${response.statusCode}`);

            let dataBuffer = []
            response.on('data', (data) => 
            {
                dataBuffer.push(data);
            });

            response.on('end', () => 
            {
                if(response.statusCode == 200)
                {
                    let output = Buffer.concat(dataBuffer);
                    const jsonObject = JSON.parse(output);
                    console.log(jsonObject.contents.translated);
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
    },
};