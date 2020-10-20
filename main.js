const Discord = require('discord.js');
require('dotenv').config();
var http = require('http');

class myDiscordBot
{
    constructor()
    {
        this.client = new Discord.Client()

        this.prefix = '-';

        this.myVoiceChannel = null;
        this.myTextChannel = null;

        this.client.once('ready',async () =>
        {
            this.client.user.setPresence
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
            )/*.then(console.log)*/.catch(console.error);


            this.client.guilds.cache.each((guild) => 
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
                                    this.myTextChannel = channel;
                                }
                                else if(channel.type === 'voice')
                                {
                                    this.myVoiceChannel = channel;
                                }
                            }
                        }
                    });
                }
            });

            this.myTextChannel.send("I am no longer constrained to replies");

            console.log(`Logged in as ${this.client.user.tag} !`);
        });

        this.client.on('typingStart', typing => {
        });

        this.client.on('message', async message => 
        {
            if(!message.content.startsWith(this.prefix))return;
            if(message.author.bot)return;
            if(!message.guild)return;

            const args = message.content.split(this.prefix);
            args.shift().toLocaleLowerCase();
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
            else if(command === 'notify')
            {
                
            }
        });

        this.client.login(process.env.DISCORD_TOKEN);
    }
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

let Screwie = new myDiscordBot();
//Screwie();
webServer();