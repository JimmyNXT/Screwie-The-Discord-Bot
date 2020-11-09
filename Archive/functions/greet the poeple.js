const Discord = require('discord.js');

module.exports = {
    execute(client)
    {
        client.guilds.cache.each((guild) => 
        {
            if(guild.name === 'Team C')
            {               
                guild.channels.cache.each((channel) =>
                {
                    if(channel.type === 'voice')
                    {
                        if(channel.members.array().length > 0)
                        {
                            let theText = '';
                            channel.members.array().forEach(member => {
                                theText = theText + ', '+ member.user.username;
                            });
                            console.log("Hello " + theText.slice(2));
                            //client.commands.get('tts').execute(client,temp, theText);
                        }
                    }
                });
            }
        });
    }
}