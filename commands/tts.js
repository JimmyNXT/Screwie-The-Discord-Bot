require('dotenv').config();
var fs = require('fs');
const waitFor = require('wait-for-event');
const { OutputFormat } = require('microsoft-cognitiveservices-speech-sdk');
var sdk = require("microsoft-cognitiveservices-speech-sdk");
const EventEmitter = require('events');

const playFx = require('../functions/play.js');
const sythSpeech = require('../functions/synthesizePhrase.js');


module.exports = {
    name: 'tts',
    description: 'text to speach',
    args: true,
    async execute(client, message, args) 
    {
        let delete_generated_files = true;
        let single_words = false;

        if (message.member.voice.channel) 
        {            
            if (args == null) return;
            const emitter = new EventEmitter(); 

            if(process.env.SINGLE_WORDS)
            {
                

                for (let i = 0; i < args.length; i++) 
                {
                    const word = args[i];
                    await sythSpeech.execute(word);
                }

                const connection = await message.member.voice.channel.join();

                for (let i = 0; i < args.length; i++) 
                {
                    const word = args[i];
                    const dispatcher = connection.play(`./genSounds/${word}.mp3`);

                    dispatcher.on('finish', () => 
                    {
                        //console.log(word);
                        setImmediate(() => emitter.emit('done'));
                    });

                    await waitFor.waitFor('done', emitter);
                }

                //args.forEach(async (word) => {});
                message.member.voice.channel.leave();

                if(!process.env.KEEP_GENERATED_SOUNDS)
                {
                    args.forEach(word => {
                        fs.unlinkSync(`./genSounds/${word}.mp3`);
                    });
                }
            }
            else
            {
                var text = " ";
                args.forEach(element => {
                    text += element.toLowerCase() + " ";
                });

                text.trim();

                await sythSpeech.execute(text);

                const connection = await message.member.voice.channel.join();

                const dispatcher = connection.play(`./genSounds/${text}.mp3`);

                dispatcher.on('finish', () => 
                {
                    message.member.voice.channel.leave();
                    setImmediate(() => emitter.emit('done'));
                });

                await waitFor.waitFor('done', emitter);

                if(!process.env.KEEP_GENERATED_SOUNDS)
                {
                    fs.unlinkSync(`./genSounds/${text}.mp3`);
                }
            }
        } else {
            message.reply('You need to join a voice channel first!');
        }
    },
    usage: `tts [sentance]`,
};