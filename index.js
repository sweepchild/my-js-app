import express from 'express';
import morgan from 'morgan';
// import { createWriteStream } from 'fs';

import { DatabaseSync } from 'node:sqlite';
const db = new DatabaseSync(':memory:')

const app = express();
const port = 3000;

// custom header
const headers = {
    "my-header": "my-header-value"
};

app.use(morgan('combined'));

// app.use(morgan('combined', {stream: createWriteStream('./foo.log', {flags: 'a'})}))
// app.use(morgan('combined'))


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

app.set('view engine', 'pug');
app.set('views', './views');

/*
app.set('view engine', 'pug');

app.get('/mypage', (req, res) => {
    res.render('index')
})
*/

db.exec(`CREATE TABLE users (
    key INTEGER PRIMARY KEY,
    userid INTEGER,
    value Text
) STRICT 
 `);

const insert = db.prepare('INSERT INTO users (key, userid, value) VALUES (?, ?, ?)');
insert.run(1, 1001, 'kemo');
insert.run(2, 1002, 'foo');

app.get('/users', (req, res) => {

    const query = db.prepare('SELECT * FROM users ORDER BY key');
    const users = query.all()
    const values = users.map(user => user.value)
    res.send(values)    
})

function findByUserId(userid) {
    const stmt = db.prepare('select * from users where userid  = ?')
    return stmt.get(userid)
}

app.get('/users/:userid', (req, res, next) => {
    const user = findByUserId(Number(req.params.userid));
    if (!user) {
        res.status(404).send('User not found');
        return;
    }
    res.render('user', { user });
});


/////////////////////////////////
app.listen(port, () => {
    console.log(`running my app.....`)
});
