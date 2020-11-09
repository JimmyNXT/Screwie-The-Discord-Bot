module.exports = {
    name: 'socket',
    description: 'Broadcast on the socket',
    args: true,
    execute(client, message, args){
        let text = '';

        args.forEach(arg => {
            text = text + arg + ' ';
        });

        text.trim();

        client.socket.emit('Broadcast','text',text);
    },
    usage: 'socket message',
};