const sythSpeech = require('../functions/synthesizePhrase.js');

module.exports = {
    name: 'test',
    description: 'A command to test what ever I want to',
    args: false,
    execute(client, message, args){
        process.env.KEEP_GENERATED_SOUNDS = false;
    },
    usage: 'test',
};