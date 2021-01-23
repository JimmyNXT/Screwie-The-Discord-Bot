//const {prefix} = require('../config.json');
const {prefix} = require('../../config.json');
const Discord = require('discord.js');


module.exports = {
    execute(client)
    {
        client.on('message', message => 
        {
            if(message.author.bot)return;
            if(!message.guild)
            {
                message.reply('Stranger danger, stranger danger',{tts:true});
                return;
            }
            if(!message.content.startsWith(prefix))return;
        
            let nonoChars = ['/','\\']
        
            nonoChars.forEach(c => 
                {
                    if(message.content.includes(c))
                    {
                        message.reply('Why are you like this?');
                        return;
                    }
                });
            
        
            const args = message.content.slice(prefix.length).trim().split(/ +/);
            const commandName = args.shift().toLowerCase();
        
            let msgArgText = '';
        
            for (let i = 0; i < args.length; i++) {
                msgArgText = msgArgText + args[i] + ' ';
                
            }
        
        
            console.log(`${message.author.username} => ${commandName} : ${msgArgText}`);
        
            if(!client.commands.has(commandName))return;
            const command = client.commands.get(commandName);
        
            try
            {
                if(command.args)
                {
                    const embed = new Discord.MessageEmbed().setColor('#03c2fc').setTitle('Usage').setDescription(command.usage);
                    if(!args.length)
                    {
                        /*const embed = new Discord.MessageEmbed()
                        .setColor('#03c2fc')
                        .setTitle('Usage')
                        .setDescription('You have not provided enough arguments')
                        .addField('Usage', command.usage, true)
                        .setFooter("Skrewie's error log");
                        message.reply(embed);*/
                        return;
                    }
                }
        
                command.execute(client, message,args);
            }
            catch(ex)
            {
                console.error(ex);
                message.reply('There wan an issues executing that command');
            }
        });
    }
};