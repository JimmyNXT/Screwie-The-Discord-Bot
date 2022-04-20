/*
 *TODO:
  - Private message response
  - Check all special characters
  - Incorrect command usage
 */


//const {prefix} = require('../config.json');
const {prefix} = require('../../config.json');
const Discord = require('discord.js');


module.exports = {
    execute(client)
    {
        client.on('message', message => 
        {
            //Ignore messages from other bots
            if(message.author.bot)return;

            //Reply to private messages
            if(!message.guild)
            {
                message.reply('Stranger danger, stranger danger',{tts:true});
                return;
            }

            //Start of command handling

            //Ignore messages that do not start with the correct prefix
            if(!message.content.startsWith(prefix))return;
        
            //Do not allow commands containing special characters
            let noNoChars = ['/','\\']
            noNoChars.forEach(c => 
            {
                if(message.content.includes(c))
                {
                    message.reply('Why are you like this?');
                    return;
                }
            });
            

            //Get command name
            //Trim off command character, remove spaces at the end and split command into individual arguments
            const args = message.content.slice(prefix.length).trim().split(/ +/);
            //Shift out command name
            const commandName = args.shift().toLowerCase();

            //Reconstruct args into single string for output to console and output command to console
            let msgArgText = '';
        
            for (let i = 0; i < args.length; i++) {
                msgArgText = msgArgText + args[i] + ' ';
            }

            console.log(`${message.author.username} => ${commandName} : ${msgArgText}`);

            //Handle commands that do not exist or are not registered
            if(!client.commands.has(commandName))
            {
                //Command does not exist
                return;
            }

            //Retrieve the command from registered commands
            const command = client.commands.get(commandName);
        
            try
            {
                //FIXME: Incorrect command usage
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
                message.reply('There was an issues executing that command');
            }
        });
    }
};