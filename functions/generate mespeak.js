const mespeak = require('mespeak');
const fs = require('fs');

module.exports = {
    execute(text, filename)
    {
        mespeak.loadConfig(require('../node_modules/mespeak/src/mespeak_config.json'));
        mespeak.loadVoice(require('../node_modules/mespeak/voices/en/en-us.json'));

        var data = mespeak.speak(text, {
            rawdata: true,
            speed:100
        });

        if(fs.existsSync(filename))
        {
            fs.unlinkSync(filename);
        }
        
        fs.appendFileSync(filename,Buffer.from(data));
    },
}