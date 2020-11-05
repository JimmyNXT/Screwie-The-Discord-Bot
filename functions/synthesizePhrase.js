const fs = require('fs');
const waitFor = require('wait-for-event');
var sdk = require("microsoft-cognitiveservices-speech-sdk");
const EventEmitter = require('events');

module.exports = {
    async execute(phrase)
    {
        if(!fs.existsSync(`./genSounds/${phrase}.mp3`))
        {
            const emitter = new EventEmitter(); 

            var speechConfig = sdk.SpeechConfig.fromSubscription(process.env.AZURE_KEY_1, 'eastus');
            var audioConfig = sdk.AudioConfig.fromAudioFileOutput(`./genSounds/${phrase}.mp3`);
            speechConfig.speechSynthesisLanguage = 'en-US';
            speechConfig.speechSynthesisVoiceName = "en-US-BenjaminRUS"; //"en-US-AriaRUS";
            speechConfig.speechSynthesisOutputFormat = sdk.SpeechSynthesisOutputFormat.Audio16Khz32KBitRateMonoMp3; //'audio-16khz-32kbitrate-mono-mp3';

            var synthesizer = new sdk.SpeechSynthesizer(speechConfig, audioConfig);

            synthesizer.wordBoundary = function(s, e) 
            {
                console.log("(WordBoundary), Text: " + e.text + ", Audio offset: " + e.audioOffset / 10000 + "ms.");
            };

            synthesizer.synthesisCompleted = function(s, e) {
                //console.log("(synthesized)  Reason: " + sdk.ResultReason[e.result.reason] + " Audio length: " + e.result.audioData.byteLength);
                //client.commands.get("play").execute(client, message, outfilename);
                //playFx.execute(client,message, outfilename, delete_generated_files);
                setImmediate(() => emitter.emit('done'));
                return true;
            };

            synthesizer.speakTextAsync(
                phrase,
                function(result) {
                    synthesizer.close();
                    synthesizer = undefined;
                },
                function(error) {
                    console.trace('ERROR: ' + error);
                    synthesizer.close();
                    synthesizer = undefined;
                });

            await waitFor.waitFor('done', emitter);
        }
    },
};