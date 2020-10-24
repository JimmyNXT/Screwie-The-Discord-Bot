const fs = require('fs');

module.exports = {
    async execute(client, message, filename, should_delete)
    {
        if (message.member.voice.channel) 
        {
            if(fs.existsSync(filename))
            {
                const connection = await message.member.voice.channel.join();
                const dispatcher = connection.play(filename);

                dispatcher.on('finish', () => 
                {
                    message.member.voice.channel.leave();

                    if(should_delete)
                    {
                        fs.unlinkSync(filename)
                    }
                    return true;
                });
            }
            else
            {
                return false;
            }

        } else 
        {
            message.reply('You need to join a voice channel first!');
        }
    },
};