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
                    callback(err, null, null);
                }
                else {
                    this.CheckMatchesInList(list, ingredientName, mixture, callback);
                }
            });
        };
        this.GetDiscoveries = (relativePath, fileName, ingredientName, mixture, callback) => {
            this.ReadIngredients(relativePath, fileName, (err, list) => {
                if (err) {
                    callback(err, null, null);
                }
                else {
                    this.CheckDiscoveriesInList(list, ingredientName, mixture, callback);
                }
            });
        };
        this.CheckMatchesInList = (list, ingredientName, mixture, callback) => {
            var err = null;
            var ingredient = list.ingredientList.find(ing => ing.name.toLowerCase() === ingredientName.toLowerCase());
            if (ingredient === undefined) {
                err = `ERROR: Ingredient name '${ingredientName}' is invalid`;
                callback(err, null, null);
            }
            else {
                mixture = this.CreateOrAddToMixture(mixture, ingredient);
                list.UpdateWithMatches(mixture);
                callback(null, list, mixture);
            }
        };
        this.CheckDiscoveriesInList = (list, ingredientName, mixture, callback) => {
            var err = null;
            var ingredient = list.ingredientList.find(ing => ing.name.toLowerCase() === ingredientName.toLowerCase());
            if (ingredient === undefined) {
                err = `ERROR: Ingredient name '${ingredientName}' is invalid`;
                callback(err, null, null);
            }
            else {
                mixture = this.CreateOrAddToMixture(mixture, ingredient);
                list.UpdateWithDiscoveries(mixture);
                callback(null, list, mixture);
            }
        };
        this.CreateOrAddToMixture = (mixture, ingredient) => {
            //If the mixture is null or undefined, create a new one with the chosen ingredient to start
            if (mixture == null || mixture === undefined) {
                return new Mixture(ingredient);
            }
            else {
                return mixture.AddIngredient(ingredient);
            }
        };
        this.ReadIngredients = (relativePath, fileName, callback) => {
            var fileReadStream = fs.createReadStream(relativePath + fileName);
            var data = '';
            fileReadStream.on('data', (chunk) => {
                data += chunk;
            });
            fileReadStream.on('error', () => {
                callback(`An error occured while attempting to read from ${relativePath + fileName}`, null);
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
        this.ParseIngredientString = (ingredientString) => {
            var ingredientString_Split = ingredientString.split(',');
            return new Ingredient(ingredientString_Split[0].replace(/[^a-zA-Z' ]/g, ''), [
                new Effect(ingredientString_Split[1].replace(/[^a-zA-Z' ]/g, ''), false),
                new Effect(ingredientString_Split[2].replace(/[^a-zA-Z' ]/g, ''), false),
                new Effect(ingredientString_Split[3].replace(/[^a-zA-Z' ]/g, ''), false),
                new Effect(ingredientString_Split[4].replace(/[^a-zA-Z' ]/g, ''), false)
            ]);
        };
    }
}
module.exports = DataHelper;
//# sourceMappingURL=DataHelper.js.map