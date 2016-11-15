"use strict";
const Ingredient = require('../Components/Ingredient');
const IngredientList = require('../Lists and collections/IngredientList');
const Effect = require('../Components/Effect');
const fs = require('fs');
const Mixture = require('../Lists and collections/Mixture');
class DataHelper {
    constructor() {
        this.GetMatches = (relativePath, fileName, ingredientName, mixture, callback) => {
            this.ReadIngredients(relativePath, fileName, (err, list) => {
                if (err) {
                    console.log('err in GetMatches');
                    callback(err, null, null);
                }
                else {
                    this.CheckMatchesInList(list, ingredientName, mixture, callback);
                }
            });
        };
        this.CheckMatchesInList = (list, ingredientName, mixture, callback) => {
            var err = null;
            var chosenIngredient = list.ingredientList.find(x => x.name.toLowerCase() === ingredientName.toLowerCase());
            //If the mixture is null or undefined, create a new one with the chosen ingredient to start
            if (mixture == null || mixture === undefined) {
                console.log(`Created new mixture; provided mixture was ${mixture}`);
                this.mixture = new Mixture(chosenIngredient);
            }
            else {
                console.log(`Provided mixture not undefined or null. Adding new ingredient.`);
                this.mixture.AddIngredient(chosenIngredient);
            }
            if (chosenIngredient === undefined) {
                console.log('err in CheckMatchesInList');
                err = `ERROR: Ingredient name '${ingredientName}' is invalid`;
                callback(err, null, null);
            }
            else {
                list.UpdateWithMatches(chosenIngredient);
                callback(null, list, this.mixture);
            }
        };
        this.ReadIngredients = (relativePath, fileName, callback) => {
            var fileReadStream = fs.createReadStream(relativePath + fileName);
            var data = '';
            fileReadStream.on('data', (chunk) => {
                data += chunk;
            });
            fileReadStream.on('end', () => {
                console.log('SUCCESS: Data read from file');
                //NOTE: The line splitting creates a final, empty line
                var lines = data.split('\n');
                var listObject = new IngredientList();
                for (var i = 0; i < lines.length - 1; i++) {
                    listObject.ingredientList.push(this.ParseIngredientString(lines[i]));
                }
                console.log('SUCCESS: Data written to object');
                callback(null, listObject);
            });
        };
        this.ParseIngredientString = function (ingredientString) {
            var ingredientString_Split = ingredientString.split(',');
            return new Ingredient(ingredientString_Split[0].replace(/[^a-zA-Z' ]/g, ''), [
                new Effect(ingredientString_Split[1].replace(/[^a-zA-Z' ]/g, ''), false),
                new Effect(ingredientString_Split[2].replace(/[^a-zA-Z' ]/g, ''), false),
                new Effect(ingredientString_Split[3].replace(/[^a-zA-Z' ]/g, ''), false),
                new Effect(ingredientString_Split[4].replace(/[^a-zA-Z' ]/g, ''), false)
            ]);
        };
    }
    GetDiscoveries(relativePath, fileName, ingredientName1, callback) {
        this.ReadIngredients(relativePath, fileName, function (list) {
            console.log(`Finding discoveries for: ${list.ingredientList.find(x => x.name === ingredientName1).name}`);
            list.UpdateWithDiscoveries(list.ingredientList.find(x => x.name === ingredientName1));
            for (var i = 0; i < list.ingredientList.length; i++) {
                if (list.ingredientList[i].discoveries > 0) {
                    console.log(`${list.ingredientList[i].name}: ${list.ingredientList[i].discoveries} effect discoveries`);
                }
            }
        });
    }
}
module.exports = DataHelper;
//# sourceMappingURL=DataHelper.js.map