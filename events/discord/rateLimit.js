module.exports = {
    execute(client)
    {
        client.on('rateLimit', (rateLimitInfo) => 
        {
            console.log(`You have reached a rate limit\n${rateLimitInfo}`);
        });
    }
};