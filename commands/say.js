const sayfx = require('../functions/say');

module.exports = {
    name: 'say',
    description: 'Say stiff',
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
    },
    usage: 'test',
};