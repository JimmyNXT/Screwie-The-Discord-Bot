const meSpeak = require('mespeak');
const fs = require('fs');

//TODO: Check weather file needs to be deleted

meSpeak.loadConfig(require('../node_modules/mespeak/src/mespeak_config.json'));
meSpeak.loadVoice(require('../node_modules/mespeak/voices/en/en-us.json'));
module.exports = {
    execute(text, filename)
    {
        var data = meSpeak.speak(text, {
            rawdata: true,
            speed:100
        });

        fs.writeFileSync(filename,Buffer.from(data),{flag: 'w'});
    },
}