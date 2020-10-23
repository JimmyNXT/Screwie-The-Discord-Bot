require('dotenv').config();
const fs = require('fs'); 
const sdk = require("microsoft-cognitiveservices-speech-sdk");

module.exports = {
    name: 'tts',
    description: 'text to speach',
    args: false,
    execute(client, message, args)
    {
        if (message.member.voice.channel) 
        {
            const speechConfig = sdk.SpeechConfig.fromSubscription(process.env.AZURE_KEY_1, 'eastus');
            const synthesizer = new sdk.SpeechSynthesizer(speechConfig);
            synthesizer.speakTextAsync(
                "Getting the response as an in-memory stream.",
                async result => {
                    // Interact with the audio ArrayBuffer data
                    const audioData = result.audioData;
                    console.log(`Audio data byte size: ${audioData.byteLength}.`)

                    /*const connection = await message.member.voice.channel.join();
                    const dispatcher = connection.play(result.audioData);

                    dispatcher.on('finish', () => 
                    {
                        message.member.voice.channel.leave();
                    });*/

                    console.log(`Audio data byte size: ${audioData.byteLength}.`)

                    synthesizer.close();
                },
                error => {
                    console.log(error);
                    synthesizer.close();
                });
            } else 
            {
                message.reply('You need to join a voice channel first!');
            }

    },
    usage: 'tts [sentance]',
};


/*function synthesizeSpeech() {
    const speechConfig = sdk.SpeechConfig.fromSubscription("YourSubscriptionKey", "YourServiceRegion");
    const audioConfig = AudioConfig.fromDefaultSpeakerOutput();

    const synthesizer = new SpeechSynthesizer(speechConfig, audioConfig);
    synthesizer.speakTextAsync(
        "Synthesizing directly to speaker output.",
        result => {
            if (result) {
                console.log(JSON.stringify(result));
            }
            synthesizer.close();
        },
        error => {
            console.log(error);
            synthesizer.close();
        });
}*/