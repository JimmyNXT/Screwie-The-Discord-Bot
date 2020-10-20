const fs = require('fs');
const Discord = require('discord.js');

module.exports = {
    name: 'play',
    description: 'Playes a soung byte',
    args: true,
    async execute(message, args)
    {
        const commandFiles = fs.readdirSync('./sounds').filter(file => file.endsWith('.mp3'));

        if(!message.guild)
        {
            return message.reply('For some reason I can\'t do this');
        }

        if (message.member.voice.channel) 
        {
            let filenameExisits = false;

            for(const file of commandFiles)
            {
                filename = file.split('.')[0];

                if(args[0] === filename)
                {
                    filenameExisits = true;
                    break;
                }
            }

            if(filenameExisits)
            {
                const connection = await message.member.voice.channel.join();
                const dispatcher = connection.play(`./sounds/${args[0]}.mp3`);

                dispatcher.on('finish', () => 
                {
                    message.member.voice.channel.leave();
                });
            }
            else
            {
                message.reply('I dont seem to have that sound byte...');
                message.reply('Are you sure you spelt ir right?');

                let avaliableFiles = '';

                for(const file of commandFiles)
                {
                    avaliableFiles = avaliableFiles + file.split('.')[0] + '\n';
                }

                const embed = new Discord.MessageEmbed()
                .setColor('#000000')
                //.setTitle('The sounds i have are:')
                .addField('Avalable Files', avaliableFiles, true);
                message.reply(embed);
                message.channel.send('If its not one of these the idiot making me is probably just too lazy to add it.');
            }

        } else 
        {
            message.reply('You need to join a voice channel first!');
        }
    },
    usage: 'play [help/sound name]',
};