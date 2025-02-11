const { app } = require('@azure/functions');

app.setup({
    enableHttpStream: true,
    cors: {
        origin: '*'
    }
});
