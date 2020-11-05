module.exports = {
    execute(client)
    {
        client.on('error', (error) => 
        {
            console.log(`Not Gonna lie. You fucked up:\n\t${error}\n\n`);
        });
    }
};