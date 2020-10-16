const { Console } = require('console');
const Discord = require('discord.js');
require('dotenv').config();
var http = require('http');

let Screwie = function()
{
    const client = new Discord.Client()

    const prefix = '-';

    client.once('ready',async () =>{
        console.log(`Logged in as ${client.user.tag} !`);

        try
        {
            await client.user.setStatus('Honestly IDK', 'I probably need help');
        }
        catch(e)
        {
            console.log(e);
        }
    });

    client.on('typingStart', typing => {
    });

    client.on('message', async message => 
    {
        if(!message.content.startsWith(prefix))return;
        if(message.author.bot)return;
        if(!message.guild)return;

        const args = message.content.split(prefix);
        //console.log(args);
        args.shift().toLocaleLowerCase();
        //console.log(args[0]);
        const command = args[0];

        console.log(command);

        if(command === 'ping')
        {
            message.channel.send('pong');
        }
        else if(command === 'spam')
        {
            if (message.member.voice.channel) 
            {
                const connection = await message.member.voice.channel.join();
                const dispatcher = connection.play('./screem.mp3');

                dispatcher.on('finish', () => 
                {
                    message.member.voice.channel.leave();
                });
            } else 
            {
                message.reply('You need to join a voice channel first!');
            }
        }
        else if(command === 'reee')
        {
            if (message.member.voice.channel) 
            {
                const connection = await message.member.voice.channel.join();
                const dispatcher = connection.play('./reee.mp3');

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

    client.login(process.env.DISCORD_TOKEN);
}

let webServer = function()
{
    console.log(`Port: ${process.env.YOUR_PORT || process.env.PORT || 'Not found'}`);
    http.createServer(function (req, res) 
    {
        //Screwie();
        res.writeHead(200, {'Content-Type': 'text/plain'});
        res.end("Hey I'm Skrewie thge Discord Bot");
    }).listen(process.env.YOUR_PORT||process.env.PORT, '0.0.0.0'); 
}

Screwie();
webServer();