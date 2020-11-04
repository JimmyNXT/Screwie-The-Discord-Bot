const Discord = require('discord.js');

module.exports = {
    execute(client, args)
    {
        let maxcount = 0
        client.guilds.cache.each((guild) => 
        {
            //console.log(guild);
            if(guild.name === 'Team C')
            {
                guild.channels.cache.each((channel) =>
                {
                    if(channel.type === 'voice')
                    {
                        let temp = channel.members.array().length;

                        if(temp > maxcount)
                        {
                            maxcount = temp
                        }
                    }
                });

                guild.channels.cache.each((channel) =>
                {
                    if(channel.type === 'voice')
                    {
                        if(channel.members.array().length == maxcount)
                        {
                            const connection = await channel.join();
                            const dispatcher = connection.play('./sounds/screem.mp3');
                
                            dispatcher.on('finish', () => 
                            {
                                channel.leave();
                            });                           
                        }
                    }
                });
            }
        });
    }
}