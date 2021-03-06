const request = require('request');
const compliment = require('../functions/compliment.js');

module.exports = {
    name: 'compliment',
    description: 'Gives out compliments',
    args: false,
    execute(client, message, args)
    {
        /*let url = `https://complimentr.com/api`;
        
        let options = {json: true};
        
        request(url, options, (error, res, body) => {   
            if (error) 
            {
                return  console.log(error);
            }
            else
            {
                if (res.statusCode == 200) 
                {
                    message.channel.send(body.compliment,{tts:true});
                    
                }else
                {
                    if(res.statusCode == 400)
                    {
                        console.log(body.compliment);
                    }
                }
            }
        });*/

        message.channel.send(compliment.execute(),{tts:true});
    },
    usage: 'compliment',
};