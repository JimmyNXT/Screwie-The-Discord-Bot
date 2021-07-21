const request = require('request');

const yodafyURL = "https://api.funtranslations.com/translate/yoda.json?text="

//TODO: handle errors

module.exports = {
    async execute(text) {
        try {
            request((yodafyURL + text), function (error, response, body) 
            {
                const obj = JSON.parse(body);
                if (obj.hasOwnProperty('contents')) 
                {
                    return obj.contents.translated;
                } 
                else 
                {
                    console.log(obj.error.message);
                }
            });
        } 
        catch (error) {
            console.log(error);
        }
    },
};