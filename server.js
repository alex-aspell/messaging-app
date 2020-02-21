const express = require('express');
const bodyParser = require('body-parser');
const mustache = require('mustache');

const app = express();
const port = process.env.PORT || 5000;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

const companies = require('./json/Companies.json');
const guests = require('./json/Guests.json');
const messages = require('./json/Messages.json');

const dataFromJSON = {
    messages: messages,
    companies: companies,
    guests: guests
}

app.get('/get/messages', (req, res) => {
    res.send( dataFromJSON );
});

app.post('/post', (req, res) => {
    console.log(req.body);
    res.send('received');
});

const selectedOptions = {};

function createWelcome() {
    var today = new Date()
    var curHr = today.getHours()

    if (curHr < 12) {
        let welcome =  {welcome: "Good morning"};
    } else if (curHr < 18) {
        let welcome =  {welcome: "Good afternoon"};
    } else {
        let welcome =  {welcome: "Good evening"};
    }
}

function selectOption(dataFromJSON, body) {
    let selected = body.find(item => item.id == id);
    setTemplate({...template, ...selected});
  }

createWelcome();

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