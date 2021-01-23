const Discord = require('discord.js');
const fs = require('fs');
const io = require("socket.io-client");


require('dotenv').config();
const {prefix} = require('./config.json');

//const sockSpam = require('./functions/socket spam.js');

let socketURL = "ws://the-hive-hub.herokuapp.com";

const client = new Discord.Client();
client.commands = new Discord.Collection;

client.socket = io(socketURL,{
    query:{
      auth:'Skrewie'
    }
});

let dir = './genSounds';

if (!fs.existsSync(dir)){
    fs.mkdirSync(dir);
}

const commandFiles = fs.readdirSync('./commands').filter(file => file.endsWith('.js'));
const discordEventFiles = fs.readdirSync('./events/discord').filter(file => file.endsWith('.js'));

for(const file of discordEventFiles)
{
    const e = require(`./events/discord/${file}`)
    e.execute(client);
    //console.log(file);
}

for(const file of commandFiles)
{
    const command = require(`./commands/${file}`);
    client.commands.set(command.name, command);
}


let myVoiceChannel = null;
let myTextChannel = null;

client.once('ready',async () =>
{
    client.guilds.cache.each((guild) => 
    {
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

    console.log(`Logged in as ${client.user.tag} !`);
});

client.login(process.env.DISCORD_TOKEN);

client.socket.on('Broadcast', (type, message) => {
    myTextChannel.send(message);
    if(message === 'spam')
    {
        //sockSpam.execute(client,'test');
    }
});

client.socket.on("connect", () => {
    client.socket.emit("source", "server");
  });

// setInterval(()=>{
//     console.log('Heartbeat');
//     client.socket.emit('Heartbeat','text', 'Skrewie');
// },60000);