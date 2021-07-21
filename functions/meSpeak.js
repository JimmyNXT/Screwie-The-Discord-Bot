const mesSeak = require('mespeak');
const fs = require('fs');

module.exports = {//TODO: Check weather file needs to be deleted
    execute(text, filename)
    {
        mesSeak.loadConfig(require('../node_modules/mespeak/src/mespeak_config.json'));
        mesSeak.loadVoice(require('../node_modules/mespeak/voices/en/en-us.json'));

        var data = mesSeak.speak(text, {
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