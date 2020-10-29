const Discord = require('discord.js');

module.exports = {
    name: 'help',
    description: 'Privides Help with commands',
    args: false,
    execute(client, message, args)
    {
        if( (!args) || args.length == 0)
        {
            let text = '';
            
            client.commands.every(com => {
                text = text + com.name + '\n';
            });

            const embed = new Discord.MessageEmbed()
                .setColor('#03c2fc')
                .setDescription('A list of all avaliable commands')
                .addField('Avalable commands', text, true);

            message.reply(embed);
        }
    },
    usage: 'Help [command you need help with]',
};