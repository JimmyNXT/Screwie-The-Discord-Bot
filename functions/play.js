const fs = require('fs');
const waitForEvent = require('wait-for-event');
const events = require('events').EventEmitter;

module.exports = {
    async execute(channel, filename) {
        const emitter = new events();

        if (fs.existsSync(filename)) {
            const connection = await channel.join();
            const dispatcher = connection.play(filename);

            dispatcher.on('finish', () => {
                channel.leave();
                emitter.emit('done');
                return true;
            });

            await waitForEvent.waitFor('done', emitter);

        } else {
            return false;
        }

    },
};