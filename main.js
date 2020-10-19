//const { Console } = require('console');
const Discord = require('discord.js');
require('dotenv').config();
var http = require('http');

let Screwie = function()
{
    const client = new Discord.Client()

    const prefix = '-';

    let myVoiceChannel = null;
    let myTextChannel = null;

    client.once('ready',async () =>
    {
        client.user.setPresence
        (
            { 
                activity: 
                {
                    type:'LISTENING',
                    //type:'PLAYING',
                    //type:'STREAMING',
                    //type:'WATCHING',
                    //
                    //name: 'with feelings and breaking hearts'
                    //name: 'poeple waist their lives'
                    name: 'poeple talking shit'
                }, 
                status: 'Online'
            }
        ).then(console.log).catch(console.error);


        client.guilds.cache.each((guild) => 
        {
            //console.log(guild);
            if(guild.name === 'Team C')
            {
                guild.channels.cache.each( (channel) =>
                {
                    if(channel.parent != null){
                        if(channel.parent.name === 'Bot')
                        {
                            if(channel.type === 'text')
                            {
                                myTextChannel = channel;
                            }
                            else if(channel.type === 'voice')
                            {
                                myVoiceChannel = channel;
                            }
                        }
                    }
                });
            }
        });

        //myTextChannel.send("Test");

        console.log(`Logged in as ${client.user.tag} !`);
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
        else if(command === 'play')
        {
            
        }
        else if(command === 'show')
        {
            message.guild.channels.cache.each( (channel) => 
            {
                /*console.log(channel.name);
                console.log('\t'+channel.type);
                console.log('\t'+channel.id+'\n');*/
                if(channel.type === 'category')
                {
                    console.log(channel);
                }
            });
        }
    });

    client.login(process.env.DISCORD_TOKEN);
}

let webServer = function()
{
    console.log(`Web server started on port : ${process.env.YOUR_PORT || process.env.PORT || 'Port Not found'}`);
    http.createServer(function (req, res) 
    {
        console.log('Website opened');
        res.writeHead(200, {'Content-Type': 'text/plain'});
        res.end("Hey I'm Skrewie thge Discord Bot");
    }).listen(process.env.YOUR_PORT||process.env.PORT, '0.0.0.0'); 
}

Screwie();
webServer();