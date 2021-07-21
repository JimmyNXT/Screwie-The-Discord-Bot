const fs = require('fs');

const test = require('../functions/test');

const weather = require('../functions/weather');

module.exports = {
    name: 'test',
    description: 'A command to test what ever I want to',
    args: false,
    execute(client, message, args){
        let yodafyData = require('../data/yodafy.json');

        if (args == null) return;

        var replyCallbackFunction = function(replyMessage)
        {
            message.reply(replyMessage);
        };

        weather.execute("Bloemfontein", replyCallbackFunction);
    },
    usage: 'If you\'re using this you should know what you\'re doing',
};