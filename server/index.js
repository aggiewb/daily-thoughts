const express = require('express');
const app = express();
const port = 3000;

app.listen(port, () => {
    console.log(`server listening at port ${port}`);
});

// https://github.com/vitaly-t/pg-promise
const pgPromise = require('pg-promise')();
require('dotenv').config();
const connectionObj = {
    host: process.env.DB_HOST,
    port: 5432,
    database: 'DailyThoughts',
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

app.use((request, response) => {
    response.type('text/html');
    response.status(404);
    response.send('<h1>404 error</h1><p>Sorry! That page couldn\'t be found.</p>');
});