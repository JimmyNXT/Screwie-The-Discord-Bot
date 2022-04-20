module.exports = {
    name: 'ping',
    description: 'Ping command',
    args: false,
    execute(client, message, args){
        message.channel.send('PONG!');
    },
    usage: 'ping',
};