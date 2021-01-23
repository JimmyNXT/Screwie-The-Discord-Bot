const fs = require('fs');

const play = require('./play');
const mespeak = require('./generate mespeak');
const azureTTS = require('./generate azure');

const {tts_agent} = require('../config.json');


module.exports = {
    async execute(text, channel)
    {
        const filename = './genSounds/text.mp3';
        if(tts_agent==='mespeak')
        {
            mespeak.execute(text, filename);
            await play.execute(channel,filename);//.then(fs.unlinkSync(filename));
            fs.unlinkSync(filename);
        }
        else if(tts_agent==='azure')
        {
            azureTTS.execute(text, filename);
            play.execute(channel,filename).then(fs.unlinkSync(filename));
            //fs.unlinkSync(filename);
        }
    },
};