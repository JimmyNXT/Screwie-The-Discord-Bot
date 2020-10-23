const request = require('request');
const Discord = require('discord.js');

module.exports = {
    name: 'yodafy',
    description: 'like yoda, I will speak',
    args: true,
    async execute(client, message, args) {
        if (args == null) return;
        /*if (args.isArray()) {
            if (args.length > 1) {
                message.reply(`I can't seem to find a command that takes ${args.length} arguments`);
            }
            if (args[0] == null) return;
        }*/

        const url = "https://api.funtranslations.com/translate/yoda.json?text=";
        let text = url;

        args.forEach(e => 
        {
            text = text + e + " ";
        });

        text.trim();

        console.log(text);

        try {
            request(text, function(error, response, body) {
                const obj = JSON.parse(body);
                if (obj.hasOwnProperty('contents')) {
                    message.reply(obj.contents.translated);
                } else {
                    message.reply(obj.error.message);
                }

            });
        } catch (x) {
            message.reply("I think I just died reading that...");
            console.log(x);
        }

    },
    usage: 'yodafy/message',
};