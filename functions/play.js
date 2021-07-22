const fs = require('fs');

module.exports = {
    async execute(channel, filename) 
    {
        if (fs.existsSync(filename)) 
        {
            const connection = await channel.join();
            const dispatcher = connection.play(filename);

            dispatcher.on('finish', () => {
                channel.leave();
            });

        } else {
            return;
        }

    },
};