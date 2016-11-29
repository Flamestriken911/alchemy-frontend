import express = require('express');
import DataHandler = require('./Backend/Data/DataHandler');
// import ConsoleInterface = require('./ConsoleInterface');

// var consoleInterface = new ConsoleInterface();
var dataHandler = new DataHandler();
var app = express();

// consoleInterface.UserQuestion();
app.get('/', function(req, res) {
    res.send('hello');
}).get('/ingredients', function(req, res) {
    dataHandler.GetUserListOrDefault(null, (err, list) => {
        if(err){
            //TODO: real error handling
            console.log('There was an error retrieving data');
            res.sendStatus(500);
        } else {
            res.json(list);
        }
    })
})

app.listen(3001, function() {
    console.log('Listening on port 3001...');
})