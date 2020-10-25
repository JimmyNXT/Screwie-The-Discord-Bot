const sythSpeech = require('../functions/synthesizePhrase.js');

module.exports = {
    name: 'test',
    description: 'A command to test what ever I want to',
    args: false,
    execute(client, message, args){
        let text  = '';

        args.args(arg => {
            text = text + arg + ' ';
        });

        text.trim();

        message.channel.send(`/tts ${text}`);
    },
    usage: 'test',
};