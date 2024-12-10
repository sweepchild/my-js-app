const express = require('express')
const morgan = require('morgan')
const fs = require('fs')

const app = express();
const port = 3000;
// custom header
const headers = {
    "my-header": "my-header-value"
};

// app.use(morgan('combined');



app.use(morgan('combined', {stream: fs.createWriteStream('./foo.log', {flags: 'a'})}))
app.use(morgan('combined'))


// app.use('/static', 
//    express.static(path.resolve(__dirname, './static')));
//app.use(express.static('public'));

app.get('/', (req, res) => {
    res.set('hede', "hodoooooooooooooooo")
    //.set('foo', "barrrrrrrrr")
    .set(headers)
    //.status(200)
    .send("hiiiiiiiiiiiiiiiiiiiiiiiii!")
});


// POST 
app.post('/foo', (req, res) => {
    res.send('POSTED!');
});

app.listen(port, () => {
    console.log(`running my app.....`)
});




