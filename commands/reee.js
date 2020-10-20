module.exports = {
    name: 'reee',
    description: 'REEEEEEEEEE!',
    args: false,
    async execute(message, args){
        if(!message.guild)return;
        if (message.member.voice.channel) 
            {
                const connection = await message.member.voice.channel.join();
                const dispatcher = connection.play('./reee.mp3');

                dispatcher.on('finish', () => 
                {
                    message.member.voice.channel.leave();
                });
            } else 
            {
                message.reply('You need to join a voice channel first!');
            }
    },
    usage: 'reee',
};