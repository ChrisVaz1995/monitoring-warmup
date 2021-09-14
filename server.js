const express = require('express');
const path = require('path');
// const { allowedNodeEnvironmentFlags } = require('process');
const Rollbar = require('rollbar');

let rollbar = new Rollbar({
    accessToken: 'd11d195e8b6347a9b0c38343c89626af',
    captureUncaught: true, 
    captureUnhandledRejections: true
})

const students = [];
const app = express();

app.get('api/spongebob', (req, res) => {
    try {
        students();
    } catch (error) {
        rollbar.error('error');
    }
})

app.use(express.json());
app.use('/style', express.static('./public/styles.css'));


app.get('/', (req,res) => {
    res.sendFile(path.join(__dirname, '/public/index.html'));
    rollbar.info('HTML file served sucessfully');
})

app.post('/api/student', (req, res)=>{
    let {name} = req.body
    name = name.trim()

    const index = students.findIndex(studentName=> studentName === name)

    if(index === -1 && name !== ''){
        students.push(name)
        rollbar.log('Student added successfully', {author: 'Chris', type: 'manual entry'})
        res.status(200).send(students)
    } else if (name === ''){
        rollbar.error('No name given')
        res.status(400).send('must provide a name.')
    } else {
        rollbar.error('student already exists')
        res.status(400).send('that student already exists')
    }

})

// This is used for Heroku 
const port = process.env.PORT || 4545;

app.use(rollbar.errorHandler());

app.listen(port, () => {
    console.log(`They are taking the Hobbits to ${port}`)
});