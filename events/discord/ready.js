module.exports = {
    execute(client)
    {
        console.log("test");
        client.once('ready',async () =>
        {
            client.guilds.cache.each((guild) => 
            {
                if(guild.name === 'Team C')
                {
                    guild.channels.cache.each( (channel) =>
                    {
                        if(channel.parent != null){
                            if(channel.parent.name === 'Bot')
                            {
                                if(channel.type === 'text')
                                {
                                    myTextChannel = channel;
                                }
                                else if(channel.type === 'voice')
                                {
                                    myVoiceChannel = channel;
                                }
                            }
                        }
                    });
                }
            });
        });
    }
};