module.exports = {
    async execute(callback)
    {
        const jsonString = JSON.stringify(
            {
                "success": 
                {
                    "total": 1
                },
                "contents": 
                {
                    "translated": "Some text,  this is",
                    "text": "this is some text",
                    "translation": "yoda"
                }
            });
        
        const jsonObject = JSON.parse(jsonString);

        callback(jsonObject.contents.translated);
    },
};