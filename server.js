const express = require('express');
const bodyParser = require('body-parser');
const mustache = require('mustache');

const app = express();
const port = process.env.PORT || 5000;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

const router = require('./routes/router');

app.use('/', router);

app.listen(port, () => console.log(`Listening on port ${port}`));