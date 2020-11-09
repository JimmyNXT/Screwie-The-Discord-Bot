const greetThePoeple = require('../functions/greet the poeple.js');
const gr = require('../functions/greet the poeple.js');

module.exports = {
    name: 'test',
    description: 'A command to test what ever I want to',
    args: false,
    async execute(client, message, args){

       gr.execute(client);
    },
    usage: 'test',
};