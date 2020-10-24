const fs = require('fs');
const Discord = require('discord.js');
const playFx = require('../functions/play.js');

module.exports = {
    name: 'play',
    description: 'Playes a soung byte',
    args: true,
    execute(client, message, args)
    {
        const commandFiles = fs.readdirSync('./sounds').filter(file => file.endsWith('.mp3'));
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
            playFx.execute(client,message,`./sounds/${args[0]}.mp3`,false);
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
    },
    usage: 'play [help/sound name]',
};