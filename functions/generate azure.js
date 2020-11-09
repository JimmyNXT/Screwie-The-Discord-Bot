var sdk = require("microsoft-cognitiveservices-speech-sdk");
const EventEmitter = require('events');
const fs = require('fs');

module.exports = {
    async execute(text, filename) {
        const emitter = new EventEmitter();

        var speechConfig = sdk.SpeechConfig.fromSubscription(process.env.AZURE_KEY_1, 'eastus');
        var audioConfig = sdk.AudioConfig.fromAudioFileOutput(filename);

        speechConfig.speechSynthesisLanguage = 'en-US';
        speechConfig.speechSynthesisVoiceName = "en-US-BenjaminRUS"; //"en-US-AriaRUS";
        speechConfig.speechSynthesisOutputFormat = sdk.SpeechSynthesisOutputFormat.Audio16Khz32KBitRateMonoMp3; //'audio-16khz-32kbitrate-mono-mp3';

        var synthesizer = new sdk.SpeechSynthesizer(speechConfig, audioConfig);

        synthesizer.wordBoundary = function (s, e) {
            console.log("(WordBoundary), Text: " + e.text + ", Audio offset: " + e.audioOffset / 10000 + "ms.");
        };

        synthesizer.synthesisCompleted = function (s, e) {
            setImmediate(() => emitter.emit('done'));
            return true;
        };

        synthesizer.speakTextAsync(
            phrase,
            function (result) {
                synthesizer.close();
                synthesizer = undefined;
            },
            function (error) {
                console.trace('ERROR: ' + error);
                synthesizer.close();
                synthesizer = undefined;
            });
            
        await waitFor.waitFor('done', emitter);
    },
}