import express = require('express');
import DataHandler = require('./Backend/Data/DataHandler');
import DataHelper = require('./Backend/Data/DataHelper');

var dataHandler = new DataHandler();
var dataHelper = new DataHelper();
var app = express();

app.get('/', function(req, res) {
    res.send('hello');
}).get('/:user/ingredients', function(req, res) {
    dataHandler.GetUserListOrDefault(req.params.user, (err, list) => {
        if(err){
            res.sendStatus(500);
        } else {
            res.json(list);
        }
    })
}).get('/:user/ingredients/get-matches', function(req, res) {
    dataHandler.GetUserListOrDefault(req.params.user, (err, list) => {
        if(err){
            res.sendStatus(500);
        } else {
            dataHelper.CheckMatchesInList(list,req.query.id,(err, list) => {
                if(err){
                    res.sendStatus(500);
                } else {
                    res.json(list);
                }
            })
        }
    })
}).get('/:user/ingredients/:id/:effect_name/:value', function(req, res) {
    dataHandler.GetUserListOrDefault(req.params.user, (err, list) => {
        if(err){
            res.sendStatus(500);
        } else {
            dataHelper.UpdateWithDiscovery(+req.params.id, req.params.effect_name, req.params.value==="true", list);
            dataHandler.WriteIngredientList(list,()=>res.sendStatus(200));
            ;
        }
    })
})

app.listen(3001, function() {
    console.log('Listening on port 3001...');
})