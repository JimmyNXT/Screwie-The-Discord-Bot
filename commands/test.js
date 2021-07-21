const fs = require('fs');

const test = require('../functions/test');

module.exports = {
    name: 'test',
    description: 'A command to test what ever I want to',
    args: false,
    execute(client, message, args){
        let yodafyData = require('../data/yodafy.json');

        if(!yodafyData["I have a question"])
        {
            yodafyData["I have a question"] = "A question, I have";
            console.log(yodafyData["I have a question"]);

            fs.writeFile('./data/yodafy.json', JSON.stringify(yodafyData), function (err) 
            {
                if (err) throw err;
            }); 
        }
        else{
            console.log("It worked");
        }
    },
    usage: 'test',
};