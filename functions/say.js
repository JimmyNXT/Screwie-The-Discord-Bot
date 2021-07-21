const fs = require('fs');

const play = require('./play');
const meSpeak = require('./meSpeak');

module.exports = {
    async execute(text, channel)
    {
        const filename = './genSounds/text.mp3';
        meSpeak.execute(text, filename);
        await play.execute(channel,filename);//.then(fs.unlinkSync(filename));
        fs.unlinkSync(filename);  
    },
};