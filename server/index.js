const express = require('express');
const app = express();
const port = 3000;

const bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());


app.listen(port, () => {
    console.log(`server listening at port ${port}`);
});

// https://github.com/vitaly-t/pg-promise
const pgPromise = require('pg-promise')();
require('dotenv').config();
const connectionObj = {
    host: process.env.DB_HOST,
    port: 5432,
    database: 'daily_thoughts',
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    max: 20
};
const db = pgPromise(connectionObj);
db.connect()
    .then(obj => {
        const databaseVersion = obj.client.serverVersion;
        console.log(`SUCCESS, Database version: ${databaseVersion}`);
        obj.done(); // success, release the connection
    })
    .catch(error => {
        console.log('ERROR:', error.message || error);
});

app.post('/new-post', (request, response) => {
    const requestBody = request.body;
    //add pg promise db.none() call with insert
    response.status(200).send('success');
});

//TODO: GET request

app.use((request, response) => {
    response.type('text/html');
    response.status(404);
    response.send('<h1>404 error</h1><p>Sorry! That page couldn\'t be found.</p>');
});