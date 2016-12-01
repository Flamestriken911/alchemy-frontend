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
            console.log(JSON.stringify(list));
            dataHelper.CheckMatchesInList(list, req.query.id, (err, list) => {
                if (err) {
                    res.sendStatus(500);
                }
                else {
                    res.json(list);
                }
            });
        }
    });
}).get('/ingredients/:id/:effect_name/:value', function (req, res) {
    dataHandler.GetUserListOrDefault(null, (err, list) => {
        if (err) {
            res.sendStatus(500);
        }
        else {
            console.log(JSON.stringify(list));
            dataHelper.UpdateWithDiscovery(+req.params.id, req.params.effect_name, req.params.value === "true", list);
            //TODO: remove lines below
            console.log(JSON.stringify(list));
            dataHandler.user = 'updatetest';
            dataHandler.WriteIngredientList(list, (str) => console.log(str));
            res.sendStatus(200);
        }
    });
});
app.listen(3001, function () {
    console.log('Listening on port 3001...');
});
//# sourceMappingURL=main.js.map