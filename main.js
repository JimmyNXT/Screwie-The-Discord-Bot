const priv = require('./private');

const Discord = require('discord.js');

const client = new Discord.Client()

const prefix = '-';

client.once('ready',() =>{
    console.log(`Logged in as ${client.user.tag}!`);
});

client.on('typingStart', typing => {
});

client.on('message', async message => {
    if(!message.content.startsWith(prefix))return;
    if(message.author.bot)return;

    const args = message.content.split(prefix);
    //console.log(args);
    args.shift();
    //console.log(args[0]);
    const command = args[0].toLowerCase();

    console.log(command);

    if(command === 'ping')
    {
        message.channel.send('pong');
    }else if(command === 'spam')
    {
        //const members = message.author;
        const spamVoiceCannelID = '764024255994003508';

        if (message.member.voice.channel) 
        {
            const connection = await message.member.voice.channel.join();
            const dispatcher = connection.play('./screem.mp3');
            console.log('Screeming');

            dispatcher.on('finish', () => 
            {
                message.member.voice.channel.leave();
            });
        } else 
        {
            message.reply('You need to join a voice channel first!');
        }
    }
});

client.login(priv.token);