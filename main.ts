import express = require('express');
import DataHandler = require('./Backend/Data/DataHandler');
import DataHelper = require('./Backend/Data/DataHelper');

var dataHandler = new DataHandler();
var dataHelper = new DataHelper();
var app = express();

app.get('/', function(req, res) {
    res.send('hello');
}).get('/ingredients', function(req, res) {
    dataHandler.GetUserListOrDefault(null, (err, list) => {
        if(err){
            res.sendStatus(500);
        } else {
            res.json(list);
        }
    })
}).get('/ingredients/get-matches', function(req, res) {
    dataHandler.GetUserListOrDefault(null, (err, list) => {
        if(err){
            res.sendStatus(500);
        } else {
            console.log(req.query.id);
            dataHelper.CheckMatchesInList(list,req.query.id,(err, list) => {
                if(err){
                    res.sendStatus(500);
                } else {
                    res.json(list);
                }
            })
        }
    })
})

app.listen(3001, function() {
    console.log('Listening on port 3001...');
})