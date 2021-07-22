const fs = require('fs');

const play = require('./play');
const meSpeak = require('./meSpeak');

module.exports = {
    async execute(text, voiceChannel)
    {
        const filename = './sounds/text.mp3';
        meSpeak.execute(text, filename);
        play.execute(voiceChannel, filename);
    },
};