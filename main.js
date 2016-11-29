"use strict";
const express = require('express');
const DataHandler = require('./Backend/Data/DataHandler');
// import ConsoleInterface = require('./ConsoleInterface');
// var consoleInterface = new ConsoleInterface();
var dataHandler = new DataHandler();
var app = express();
// consoleInterface.UserQuestion();
app.get('/ingredients', function (req, res) {
    dataHandler.GetUserListOrDefault(null, (err, list) => {
        if (err) {
            //TODO: real error handling
            console.log('There was an error retrieving data');
            res.send(null);
        }
        else {
            res.send(JSON.stringify(list));
        }
    });
});
app.get('/', function (req, res) {
    res.send('hello');
});
app.listen(3000, function () {
    console.log('Listening on port 3000...');
});
//# sourceMappingURL=main.js.map