module.exports = {
    name: 'spam',
    description: 'It just screems',
    args: false,
    async execute(client, message, args){
        if(!message.guild)return;
        if (message.member.voice.channel) 
        {
            const connection = await message.member.voice.channel.join();
            const dispatcher = connection.play('./sounds/screem.mp3');

            dispatcher.on('finish', () => 
            {
                message.member.voice.channel.leave();
            });
        } else 
        {
            message.reply('You need to join a voice channel first!');
        }
    },
    usage: 'spam',
};