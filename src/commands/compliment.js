const request = require('request');
const compliment = require('../functions/compliment.js');

module.exports = {
    name: 'compliment',
    description: 'Gives out compliments',
    args: false,
    execute(client, message, args)
    {
        let complimentText = compliment.execute();
        message.channel.send(complimentText);
    },
    usage: 'compliment',
};