const fs = require('fs');

module.exports = {
    name: 'play',
    description: 'Playes a soung byte',
    args: true,
    async execute(message, args)
    {
        const commandFiles = fs.readdirSync('./sounds').filter(file => file.endsWith('.mp3'));

        for(const file of commandFiles)
        {
            file.replace('.mp3','');
            console.log(file);
        }
        /*if(!message.guild)
        {
            return message.reply('oops');;
        }

        if (message.member.voice.channel && false) 
        {
            const connection = await message.member.voice.channel.join();
            const dispatcher = connection.play(`./sounds/${args[0]}`);

            dispatcher.on('finish', () => 
            {
                message.member.voice.channel.leave();
            });
        } else 
        {
            message.reply('You need to join a voice channel first!');
        }*/
    },
    usage: 'play [help/sound name]',
};