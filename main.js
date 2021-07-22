/*
    TODO:
    - Check if config.json exists and is correct
    - Check if data folder and content exist
        - Audio folder
        - Yodafy.json file
    - Check if ENV variables exist
    - Make Skrewie the new Socket server
*/

const Discord = require('discord.js');
const fs = require('fs');
const io = require("socket.io-client");

//Load ENV variables from .ENV file if .ENV file exists
require('dotenv').config();

//const sockSpam = require('./functions/socket spam.js');

let socketURL = "ws://the-hive-hub.herokuapp.com";

const client = new Discord.Client();
client.commands = new Discord.Collection;

client.socket = io(socketURL,{
    query:{
      auth:'Skrewie'
    }
});

//make folder for generated audio to be stored in. Audio will probably be deleted after it's played
let dir = './Sounds';
if (!fs.existsSync(dir)){
    fs.mkdirSync(dir);
}

//Register all discord events. They are each handled in their own file.
const discordEventFiles = fs.readdirSync('./events/discord').filter(file => file.endsWith('.js'));
for(const file of discordEventFiles)
{
    const e = require(`./events/discord/${file}`)
    e.execute(client);
    //console.log(file);
}

//Register all discord Commands. They are each handled in their own file.
const commandFiles = fs.readdirSync('./commands').filter(file => file.endsWith('.js'));
for(const file of commandFiles)
{
    const command = require(`./commands/${file}`);
    client.commands.set(command.name, command);
}

//Ensure that all guilds that are connected are setup correctly.
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

    console.log(`Logged in as ${client.user.tag}`);
});

//Login to discord
client.login(process.env.DISCORD_TOKEN);

/*
//Create cocket to communicate with other services/devices/nodes
client.socket.on('Broadcast', (type, message) => {
    myTextChannel.send(message);
    if(message === 'spam')
    {
        //sockSpam.execute(client,'test');
    }
});

//Connect to socket
client.socket.on("connect", () => 
{
    client.socket.emit("source", "server");
});

//Emit heartbeat periodically for UP status display.
// setInterval(()=>{
//     console.log('Heartbeat');
//     client.socket.emit('Heartbeat','text', 'Skrewie');
// },60000);

*/