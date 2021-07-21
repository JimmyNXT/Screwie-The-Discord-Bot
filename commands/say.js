const sayfx = require('../functions/say');

module.exports = {
    name: 'say',
    description: 'This command will make Skrewie say whatever message you give him in you current voice channel or using tts in a text channel if you are nor in a voice channel',
    args: true,
    async execute(client, message, args){
        let text = "";

        args.forEach(arg => {
            text = text + ' ' + arg;
        });

        if(message.member.voice.channel)
        {
            sayfx.execute(text, message.member.voice.channel);
        }
        else
        {
            //TODO: Add tts
        }
    },
    usage: 'say [message]',
};