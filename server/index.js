const express = require('express');
const app = express();
const port = 3000;

app.listen(port, () => {
    console.log(`server listening at port ${port}`);
});

app.use((request, response) => {
    response.type('text/html');
    response.status(404);
    response.send('<h1>404 error</h1><p>Sorry! That page couldn\'t be found.</p>');
});