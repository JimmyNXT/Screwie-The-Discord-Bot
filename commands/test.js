const test = require('../functions/test');

module.exports = {
    name: 'test',
    description: 'A command to test what ever I want to',
    args: false,
    execute(client, message, args){

        var myReplyCallback = function(replyMessage)
        {
            message.reply(replyMessage);
        };
        
        test.execute(myReplyCallback);
    },
    usage: 'test',
};