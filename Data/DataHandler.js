"use strict";
const Ingredient = require('../Components/Ingredient');
const IngredientList = require('../Lists and collections/IngredientList');
const Effect = require('../Components/Effect');
const fs = require('fs');
class DataHandler {
    constructor(relativePath = './Data/', fileName = 'ingredient info.csv') {
        this.GetDefaultIngredientList = (callback) => {
            var fileReadStream = fs.createReadStream(this.filePath);
            var data = '';
            fileReadStream.on('data', (chunk) => {
                data += chunk;
            });
            fileReadStream.on('error', () => {
                callback(`An error occured while attempting to read from ${this.filePath}`, null);
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
        this.filePath = relativePath + fileName;
    }
}
module.exports = DataHandler;
//# sourceMappingURL=DataHandler.js.map