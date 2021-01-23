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

        // if(fs.existsSync(filename))
        // {
        //     console.log(filename + " deleted");
        //     fs.unlinkSync(filename);
        // }
        
        fs.writeFileSync(filename,Buffer.from(data),{flag: 'w'});
    },
}