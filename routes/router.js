const express = require('express');
const bodyParser = require('body-parser');
const router = express.Router();
const mustache = require('mustache');

const companies = require('../json/Companies.json');
const guests = require('../json/Guests.json');
const messages = require('../json/Messages.json');

const dataFromJSON = {
    messages: messages,
    companies: companies,
    guests: guests
}

router.get('/get/messages', (req, res) => {
    res.send( dataFromJSON );
});

router.post('/post', (req, res) => {
    const selectedOptions = {};
    let templateObject = createTemplateObject(dataFromJSON, req.body.payload, selectedOptions);
    
    let finalizedTemplate = mustache.render(templateObject.template, templateObject);
    
    res.send(finalizedTemplate);
});

function createWelcome() {
    var today = new Date()
    var curHr = today.getHours()

    if (curHr < 12) {
        let welcome =  {welcome: "Good morning"};
        return welcome;
    } else if (curHr < 18) {
        let welcome =  {welcome: "Good afternoon"};
        return welcome;
    } else {
        let welcome =  {welcome: "Good evening"};
        return welcome;
    }
}

function createTemplateObject(data, body, selectedOptions) {
    // Removes custom template information which causes for in loop to error out. Template info added to object later
    let customTemplate = {template: body.template};
    delete body.template;

    for (let i in body) {
        if (body[i] !== ''){
        let selected = data[i].find(item => item.id == body[i]);
        selectedOptions = {...selectedOptions, ...selected};
        }
    }
    
    let welcome = createWelcome();
    selectedOptions = {...selectedOptions, ...welcome};

    if (customTemplate.template !== '') {
        selectedOptions = {...selectedOptions, ...customTemplate};
    }
    return selectedOptions;
}

module.exports = router;