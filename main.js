"use strict";
const express = require('express');
const DataHandler = require('./Backend/Data/DataHandler');
const DataHelper = require('./Backend/Data/DataHelper');
var dataHandler = new DataHandler();
var dataHelper = new DataHelper();
var app = express();
app.get('/', function (req, res) {
    res.send('hello');
}).get('/ingredients', function (req, res) {
    dataHandler.GetUserListOrDefault(null, (err, list) => {
        if (err) {
            res.sendStatus(500);
        }
        else {
            res.json(list);
        }
    });
}).get('/ingredients/get-matches', function (req, res) {
    dataHandler.GetUserListOrDefault(null, (err, list) => {
        if (err) {
            res.sendStatus(500);
        }
        else {
            dataHelper.CheckMatchesInList(list, req.query.id, null, (err, list) => {
                res.json(list);
            });
        }
    });
});
app.listen(3001, function () {
    console.log('Listening on port 3001...');
});
//# sourceMappingURL=main.js.map