const request = require('request');
require('dotenv').config();

module.exports = {
    name: 'weather',
    description: 'Checkes the current weather',
    args: true,
    execute(client, message, args)
    {
        let url = `http://api.weatherapi.com/v1/forecast.json?key=${process.env.WEATHER_API_KEY}&q=${args[0]}&days=1`;
        
        let options = {json: true};

        request(url, options, (error, res, body) => {
            //console.log(url);
            //console.log(res.statusCode);
            
            if (error) 
            {
                return  console.log(error);
            }
            else
            {
                if (res.statusCode == 200) 
                {
                    message.channel.send(`It is currently ${body.current.condition.text} in ${body.location.name} with a tempreture of ${body.current.temp_c}. The min and max tempreture for today are ${body.forecast.forecastday[0].day.mintemp_c} and ${body.forecast.forecastday[0].day.maxtemp_c}`,{tts:true});
                }else
                {
                    if(res.statusCode == 400)
                    {
                        message.channel.send(`${body.error.message}`,{tts:true});
                    }
                }
            }
        
            
        });
    },
    usage: 'weather [town name]',
};



