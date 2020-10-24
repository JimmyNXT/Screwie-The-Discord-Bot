const sythSpeech = require('../functions/synthesizePhrase.js');

module.exports = {
    name: 'test',
    description: 'A command to test what ever I want to',
    args: false,
    execute(client, message, args){
        sythSpeech.execute('testing 1,2,3, testing');
    },
    usage: 'test',
};