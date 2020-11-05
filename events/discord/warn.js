module.exports = {
    execute(client)
    {
        client.on('warn', (info)=> 
        {
            console.log(`This is a warning event\n${info}`);
        });
    }
};