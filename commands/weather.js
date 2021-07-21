const request = require('request');
require('dotenv').config();

//TODO: Incorrect use if no args

const weather = require('../functions/weather');

module.exports = {
    name: 'weather',
    description: 'This command outputs the weather for the location you give Skrewie',
    args: true,
    execute(client, message, args)
    {
        if (args == null) return;
        if ( args.length > 1) return; 

        var replyCallbackFunction = function(reply)
        {
            let jsonWeather = reply;
            message.reply(`It is currently ${jsonWeather.current.condition.text} in ${jsonWeather.location.name} with a tempreture of ${jsonWeather.current.temp_c}. The min and max tempreture for today are ${jsonWeather.forecast.forecastday[0].day.mintemp_c} and ${jsonWeather.forecast.forecastday[0].day.maxtemp_c}`);
        };

        weather.execute(args[0], replyCallbackFunction);
    },
    usage: 'weather [town name]',
};



