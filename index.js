const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const mysql = require('mysql');
const helmet = require('helmet');


const app = express();
app.use(cors());
app.use(helmet());
app.use(bodyParser.json());

const db = mysql.createConnection({
    host: "www.db4free.net",
    user: "chupalo234",
    password: "cereza23",
    database: 'jasailivefr33'
});

db.connect((err) => {
    if (err) throw err;
    console.log('Connected to database');
});

app.get('/', (req, res) => {
    res.send('Hello World');
});

const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`Server running on port ${port}`));


app.post('/user', (req, res) => {
    let sql = 'INSERT INTO usuarios SET ? ';
    let query = db.query(sql, req.body, (err, result) => {
        if (err) {
            console.error('Error al insertar usuario:', err);
            return res.status(500).send('Error al crear usuario');
        }
        console.log('status: 200');
        res.send('Usuario creado');
    });
});


app.get('/usuarios', (req, res) => {
    let sql = 'SELECT * FROM usuarios';
    let query = db.query(sql, (err, results) => {
        if (err) throw err;
        console.log('status: 200');
        res.send(results);
    })
});