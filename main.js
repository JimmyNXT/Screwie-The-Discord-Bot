const Discord = require('discord.js');
require('dotenv').config();
const fs = require('fs');
const {prefix} = require('./config.json');
var http = require('http');
const { Console } = require('console');
const io = require("socket.io-client");

let socketURL = "ws://the-hive-hub.herokuapp.com";

const client = new Discord.Client();
client.commands = new Discord.Collection;

dir = './genSounds';

if (!fs.existsSync(dir)){
    fs.mkdirSync(dir);
}

const commandFiles = fs.readdirSync('./commands').filter(file => file.endsWith('.js'));

for(const file of commandFiles)
{
    const command = require(`./commands/${file}`);
    client.commands.set(command.name, command);
}


client.commands.every(com => {});


let myVoiceChannel = null;
let myTextChannel = null;








//client.on('channelCreate', (channel) => {});
//client.on('channelDelete', (channel) => {});
//client.on('channelPinsUpdate', (channel,date) => {});
//client.on('channelUpdate', (oldChannel, newChannel) => {});
//client.on('debug', (info) => {console.log(`This is a debug event\n${info}`);});
//client.on('emojiCreate', (emoji) => {});
//client.on('emojiDelete', (emoji) => {});
//client.on('emojiUpdate', (oldEmoji, newEmoji) => {});
client.on('error', (error) => {console.log(`Not Gonna lie. You fucked up\n${error}`);});
//client.on('guildBanAdd', (guild, user) => {});
//client.on('guildBanRemove', (guild, user) => {});
//client.on('guildCreate', (guild) => {});
//client.on('guildDelete', (guild) => {});
//client.on('guildIntegrationsUpdate', (guild) => {});
//client.on('guildMemberAdd', (member) => {});
//client.on('guildMemberAvailable', (member) => {});
//client.on('guildMemberRemove', (member) => {});
//client.on('guildMemberSpeaking', (member) => {});
//client.on('guildMemberUpdate', (oldMember, newMember) => {});
//client.on('guildMembersChunk', (members, guild, chunck) => {});
//client.on('guildUnavailable', (guild) => {});
//client.on('guildUpdate', (guild) => {});
//client.on('invalidated', () => {});
//client.on('inviteCreate', (invite) => {});
//client.on('inviteDelete', (invite) => {});

client.on('message', message => 
{
    if(message.author.bot)return;
    if(!message.guild)
    {
        message.reply('Stranger danger');
        return;
    }
    if(!message.content.startsWith(prefix))return;

    let nonoChars = ['/','\\']

    nonoChars.forEach(c => {
        if(message.content.includes(c))
        {
            message.reply('Why are you line this?');
            return;
        }
    });
    

    const args = message.content.slice(prefix.length).trim().split(/ +/);
    const commandName = args.shift().toLowerCase();

    console.log(commandName);

    if(!client.commands.has(commandName))return;
    const command = client.commands.get(commandName);

    try
    {
        if(command.args)
        {
            const embed = new Discord.MessageEmbed().setColor('#03c2fc').setTitle('Usage').setDescription(command.usage);
            if(!args.length)
            {
                /*const embed = new Discord.MessageEmbed()
                .setColor('#03c2fc')
                .setTitle('Usage')
                .setDescription('You have not provided enough arguments')
                .addField('Usage', command.usage, true)
                .setFooter("Skrewie's error log");
                message.reply(embed);*/
                return;
            }
        }

        command.execute(client, message,args);
    }
    catch(ex)
    {
        console.error(ex);
        message.reply('There wan an issues executing that command');
    }
});

//client.on('messageDelete', (message) => {});
//client.on('messageDeleteBulk', (messages) => {});
//client.on('messageReactionAdd', (messageReaction, user) => {});
//client.on('messageReactionRemove', (messageReaction, user) => {});
//client.on('messageReactionRemoveAll', (message) => {});
//client.on('messageReactionRemoveEmoji', (messageReaction) => {});
//client.on('messageUpdate', (oldMessage, newMessage) => {});
//client.on('presenceUpdate', (oldPresence, newPresence) => {});
client.on('rateLimit', (rateLimitInfo) => {console.log(`You have reached a rate limit\n${rateLimitInfo}`);});

client.once('ready',async () =>
{
    //client.user.setPresence(presenceOptions[0])/*.then(console.log)*/.catch(console.error);


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

    //myTextChannel.send("I am no longer constrained to replies");

    console.log(`Logged in as ${client.user.tag} !`);
});

//client.on('roleCreate', (role) => {});
//client.on('roleDelete', (role) => {});
//client.on('roleUpdate', (oldRole, newRole) => {});
//client.on('shardDisconnect', (event, id) => {});
//client.on('shardError', (event, shardID) => {});
//client.on('shardReady', (event, unavailableGuilds) => {});
//client.on('shardReconnecting', (id) => {});
//client.on('shardResume', (id,replayedEvents) => {});
//client.on('typingStart', (channel, user) => {});
//client.on('userUpdate', (oldUser, newUser) => {});
//client.on('voiceStateUpdate', (oldVoiceState, newVoiceState) => {});
client.on('warn', (info)=> {console.log(`This is a warning event\n${info}`);});
//client.on('webhookUpdate', (channel)=> {});

client.login(process.env.DISCORD_TOKEN);

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

client.socket = io(socketURL,{
    query:{
      auth:'Skrewie'
    }
});
client.socket.on('Broadcast', (type, message) => {
    myTextChannel.send(message);
});

//webServer();








