const Discord = require('discord.js');

const yodafy = require('../functions/yodafy');

//TODO: Incorrect use if no args

module.exports = {
    name: 'yodafy',
    description: 'This command will convert the massage you Skrewie to the diction of Master Yoda',
    args: true,
    execute(client, message, args) {
        if (args == null) return;

        let text = "";

        args.forEach(e => {
            text = text + e + " ";
        });

        text = text.trim();

        var replyCallbackFunction = function(replyMessage)
        {
            message.reply(replyMessage);
        };

        yodafy.execute(text, replyCallbackFunction);
    },
    usage: 'yodafy [message]',
};