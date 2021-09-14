const express = require('express');
const path = require('path');
// const { allowedNodeEnvironmentFlags } = require('process');
const Rollbar = require('rollbar');

let rollbar = new Rollbar({
    accessToken: 'd11d195e8b6347a9b0c38343c89626af',
    captureUncaught: true, 
    captureUnhandledRejections: true
})

const app = express();

app.get('/', (req,res) => {
    res.sendFile(path.join(__dirname, '/public/index.html'));
    rollbar.info('HTML file served sucessfully');
})

// This is used for Heroku 
const port = process.env.PORT || 4545;

app.listen(port, () => {
    console.log(`They are taking the Hobbits to ${port}`)
});