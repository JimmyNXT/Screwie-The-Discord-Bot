const fs = require('fs');

const test = require('../functions/test');

const meSpeak = require('../functions/meSpeak');

module.exports = {
    name: 'test',
    description: 'A command to test what ever I want to',
    args: false,
    execute(client, message, args){

        const filename = './sounds/text.mp3';
        meSpeak.execute("Kablamo", filename);
    },
    usage: 'If you\'re using this you should know what you\'re doing',
};