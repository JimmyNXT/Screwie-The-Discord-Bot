module.exports = {
    name: 'say',
    description: 'A text tospeach',
    args: true,
    execute(client, message, args){
        let text  = '';
        
        args.forEach(arg => {
            text = text + arg + ' ';
        });

        text.trim();

        message.channel.send(text,{tts:true});
    },
    usage: 'say [The text you want skrewie to speak]',
};