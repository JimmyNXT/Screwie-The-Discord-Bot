const { fontcolor } = require("ffmpeg-static");

module.exports = {
    name: 'test',
    description: 'A command to test what ever I want to',
    args: false,
    async execute(client, message, args){

       console.log('done');
    },
    usage: 'test',
};