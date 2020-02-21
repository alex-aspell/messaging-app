const express = require('express');
const bodyParser = require('body-parser');

const app = express();
const port = process.env.PORT || 5000;

const companies = require('./json/Companies.json');
const guests = require('./json/Guests.json');
const messages = require('./json/Messages.json');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.get('/get/messages', (req, res) => {
    const package = {
        messages: messages,
        companies: companies,
        guests: guests
    }
  res.send( package );
});

var mustache = require('mustache');

var view = {
  title: "Joe",
  calc: function() {
    return 2 + 4;
  }
};

var template = "{{title}} spends {{calc}}";

var html = mustache.render(template, view);

console.log('html', html);


app.listen(port, () => console.log(`Listening on port ${port}`));