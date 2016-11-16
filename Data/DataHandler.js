"use strict";
const Ingredient = require('../Components/Ingredient');
const IngredientList = require('../Lists and collections/IngredientList');
const Effect = require('../Components/Effect');
const fs = require('fs');
class DataHandler {
    // constructor(public relativePath: string = './Data/', public fileName: string = 'ingredient info.csv') {
    constructor(relativePath = './Data/', fileName = 'ingredient info.txt') {
        this.relativePath = relativePath;
        this.fileName = fileName;
        this.GetDefaultIngredientList = (callback) => {
            var fileReadStream = fs.createReadStream(this.filePath);
            var data = '';
            fileReadStream.on('error', () => {
                callback(`An error occured while attempting to read from ${this.filePath}`, null);
            });
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
                callback(null, listObject);
            });
        };
        this.WriteIngredientList = (list, callback) => {
            var fileWriteSteam = fs.createWriteStream(this.filePath);
            fileWriteSteam.write(list.ToStorageString());
            fileWriteSteam.close();
            callback('wrote to file');
        };
        this.ParseIngredientString = (ingredientString) => {
            var ingredientString_Split = ingredientString.replace(/[^a-zA-Z',: ]/g, '').split(',');
            return new Ingredient(ingredientString_Split[0], [
                new Effect(ingredientString_Split[1].split(':')[0], ingredientString_Split[1].split(':')[1] === 'true'),
                new Effect(ingredientString_Split[3].split(':')[0], ingredientString_Split[1].split(':')[1] === 'true'),
                new Effect(ingredientString_Split[4].split(':')[0], ingredientString_Split[1].split(':')[1] === 'true'),
                new Effect(ingredientString_Split[2].split(':')[0], ingredientString_Split[1].split(':')[1] === 'true')
            ]);
        };
    }
    get filePath() {
        return this.relativePath + this.fileName;
    }
}
module.exports = DataHandler;
//# sourceMappingURL=DataHandler.js.map