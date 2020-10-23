require('dotenv').config();
var fs = require('fs');
const { OutputFormat } = require('microsoft-cognitiveservices-speech-sdk');
var sdk = require("microsoft-cognitiveservices-speech-sdk");
var outfilename = ["output"];

module.exports = {
    name: 'tts',
    description: 'text to speach',
    args: true,
    async execute(client, message, args) {
        if (message.member.voice.channel) {

            var text = " ";
            if (args == null) return;
            args.forEach(element => {
                text += element + " ";
            });
            text.trim();
            console.log(text);

            var speechConfig = sdk.SpeechConfig.fromSubscription(process.env.AZURE_KEY_1, 'eastus');
            var audioConfig = sdk.AudioConfig.fromAudioFileOutput(`./sounds/${outfilename}.mp3`);
            speechConfig.speechSynthesisLanguage = 'en-US';
            speechConfig.speechSynthesisVoiceName = "en-US-AriaRUS";
            speechConfig.speechSynthesisOutputFormat = sdk.SpeechSynthesisOutputFormat.Audio16Khz32KBitRateMonoMp3; //'audio-16khz-32kbitrate-mono-mp3';

            var synthesizer = new sdk.SpeechSynthesizer(speechConfig, audioConfig);

            synthesizer.synthesizing = function(s, e) {
                var str = "(synthesizing) Reason: " + sdk.ResultReason[e.result.reason] + " Audio chunk length: " + e.result.audioData.byteLength;
                console.log(str);
            }

            synthesizer.synthesisCompleted = function(s, e) {
                console.log("(synthesized)  Reason: " + sdk.ResultReason[e.result.reason] + " Audio length: " + e.result.audioData.byteLength);
            };

            synthesizer.synthesisStarted = function(s, e) {
                console.log("(synthesis started)");
            };

            synthesizer.SynthesisCanceled = function(s, e) {
                var cancellationDetails = sdk.CancellationDetails.fromResult(e.result);
                var str = "(cancel) Reason: " + sdk.CancellationReason[cancellationDetails.reason];
                if (cancellationDetails.reason === sdk.CancellationReason.Error) {
                    str += ": " + e.result.errorDetails;
                }
                console.log(str);
            };

            synthesizer.wordBoundary = function(s, e) {
                console.log("(WordBoundary), Text: " + e.text + ", Audio offset: " + e.audioOffset / 10000 + "ms.");
            };

            async function dothething(moo) {
                console.log('im doin the thing');
                synthesizer.speakTextAsync(
                    text,
                    function(result) {
                        synthesizer.close();
                        synthesizer = undefined;
                    },
                    function(error) {
                        console.trace('ERROR: ' + error);
                        synthesizer.close();
                        synthesizer = undefined;
                    })
            }
            await dothething(text);

            console.log('gonna play now');
            setTimeout(function() {
                client.commands.get("play").execute(client, message, outfilename);
                //fs.unlinkSync(`./sounds/${outfilename}.mp3`); //REEEEEEEEEEE
            }, 3000);
        } else {
            message.reply('You need to join a voice channel first!');
        }
    },
    usage: `tts [sentance]`,
};