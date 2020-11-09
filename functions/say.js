const play = require('./play');
const mespeak = require('./generate mespeak');
const azureTTS = require('./generate azure');

const {tts_agent} = require('./config.json');

module.exports = {
    async execute(text, channel)
    {
        const filename = '../gensounds/text.mp3';
        if(tts_agent==='mespeak')
        {
            mespeak.execute(text, filename);
            play.execute(channel,filename);
            fs.unlinkSync(filename);
        }
        else if(tts_agent==='azure')
        {
            azureTTS.execute(text, filename);
            play.execute(channel,filename);
            fs.unlinkSync(filename);
        }
    },
};