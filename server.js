const express = require('express');
const path = require('path');
const { allowedNodeEnvironmentFlags } = require('process');

const app = express();

app.get('/', (req,res) => {
    res.sendFile(path.join(__dirname, '/public/index.html'))
});

// This is used for Heroku 
const port = process.env.PORT || 4545;

app.listen(port, () => {
    console.log(`They are taking the Hobbits to ${port}`)
});