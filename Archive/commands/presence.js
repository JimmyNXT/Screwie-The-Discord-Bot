

let presenceOptions = [
    { 
        activity: 
        {
            type:'LISTENING',
            name: 'people talking shit'
        }, 
        status: 'online'
    },{ 
        activity: 
        {
            type:'PLAYING',
            name: 'with feelings and breaking hearts'
        }, 
        status: 'online'
    },{ 
        activity: 
        {
            type:'WATCHING',
            name: 'people talk shit'
        }, 
        status: 'online'
    },{ 
        activity: 
        {
            type:'WATCHING',
            name: 'my depression slowly ruin my life'
        }, 
        status: 'online'
    }];


module.exports = {
    name: 'presence',
    description: 'Changes the rich presence og the bot',
    args: true,
    execute(client, message, args)
    {
        if(!isNaN(args[0]))
        {
            if(args[0] < presenceOptions.length)
            {
                client.user.setPresence(presenceOptions[0]).then(presence  => console.log(presence));
            }
        }
        else if(args[0] === 'random')
        {
            client.user.setPresence(presenceOptions[Math.floor((Math.random() * (presenceOptions.length-1)))]).then(presence  => console.log(presence));
        }
    },
    usage: 'presence [(number)/random]',
};