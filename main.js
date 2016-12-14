"use strict";
const express = require('express');
const DataHandler = require('./Backend/Data/DataHandler');
const DataHelper = require('./Backend/Data/DataHelper');
var dataHandler = new DataHandler();
var dataHelper = new DataHelper();
var app = express();
//Allow cross-domain requests
//TODO: Add some auth to limit who can request
app.use(function (req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
});
app.get('/', function (req, res) {
    res.send('hello');
}).get('/:user/ingredients', function (req, res) {
    //Get ingredients for the user
    console.log('received GET');
    dataHandler.GetUserListOrDefault(req.params.user, (err, list) => {
        if (err) {
            res.sendStatus(500);
        }
        else {
            res.json(list.ingredients.map((ingredient) => {
                return {
                    id: ingredient.id,
                    name: ingredient.name,
                    effects: ingredient.effects.map((effect) => {
                        return {
                            name: effect.name,
                            discovered: effect.discovered,
                            willBeDiscovered: effect.willBeDiscovered,
                            willHaveEffect: effect.willHaveEffect
                        };
                    })
                };
            }));
        }
    });
}).get('/:user/ingredients/get-matches', function (req, res) {
    //Get matches for a list of ingredients provided in the query string
    dataHandler.GetUserListOrDefault(req.params.user, (err, list) => {
        if (err) {
            res.sendStatus(500);
        }
        else {
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
}).get('/:user/ingredients/:id/:effect_name/:value', function (req, res) {
    //Change value of 'discovered' boolean variable for an effect on an ingredient
    //TODO: This should be a 'patch', not a 'get'
    dataHandler.GetUserListOrDefault(req.params.user, (err, list) => {
        if (err) {
            res.sendStatus(500);
        }
        else {
            dataHelper.UpdateWithDiscovery(+req.params.id, req.params.effect_name, req.params.value === "true", list);
            dataHandler.WriteIngredientList(list, () => res.sendStatus(200));
            ;
        }
    });
}).post('/:user/ingredients/create-mixture', function (req, res) {
    //Update user's saved ingredients list with the results of a mixture
    dataHandler.GetUserListOrDefault(req.params.user, (err, list) => {
        if (err) {
            res.sendStatus(500);
        }
        else {
            console.log(req.body);
            dataHelper.MakeMixture(list, req.body);
            dataHandler.WriteIngredientList(list, () => res.sendStatus(200));
            ;
        }
    });
});
app.listen(3001, function () {
    console.log('Listening on port 3001...');
});
//# sourceMappingURL=main.js.map