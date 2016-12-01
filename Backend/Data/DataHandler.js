"use strict";
const Ingredient = require('../Components/Ingredient');
const IngredientList = require('../Lists and collections/IngredientList');
const Effect = require('../Components/Effect');
const fs = require('fs');
class DataHandler {
    constructor() {
        this.defaultFileName = 'test.txt';
        this.relativePath = './Backend/Data/';
        this.defaultFilePath = `${this.relativePath}${this.defaultFileName}`;
        this.user = null;
        this.GetUserListOrDefault = (user, callback) => {
            this.user = user;
            fs.access(this.filePath, (err) => {
                if (err) {
                    console.log('WARNING: File not found; reading default file');
                    this.GetIngredientList(this.defaultFilePath, callback);
                }
                else {
                    this.GetIngredientList(this.filePath, callback);
                }
            });
        };
        this.GetIngredientList = (filePath, callback) => {
            var fileReadStream = fs.createReadStream(filePath);
            var data = '';
            fileReadStream.on('error', () => {
                callback(`An error occured while attempting to read from ${filePath}`, null);
            });
            fileReadStream.on('data', (chunk) => {
                data += chunk;
            });
            fileReadStream.on('end', () => {
                console.log(`SUCCESS: Data read from file ${filePath}`);
                //NOTE: The line splitting creates a final, empty line
                var lines = data.split('\n');
                var listObject = new IngredientList();
                for (var i = 0; i < lines.length - 1; i++) {
                    listObject.ingredients.push(this.ParseIngredientString(lines[i]));
                }
                callback(null, listObject);
            });
        };
        this.WriteIngredientList = (list, callback) => {
            console.log(`Current user: ${this.user}`);
            console.log(`Writing to file: ${this.filePath}`);
            var fileWriteSteam = fs.createWriteStream(this.filePath);
            fileWriteSteam.write(list.ToStorageString());
            fileWriteSteam.close();
            callback('200:OK');
        };
        this.ParseIngredientString = (ingredientString) => {
            var ingredientString_Split = ingredientString.replace(/[^a-zA-Z0-9',: ]/g, '').split(',');
            var ingredientId = +ingredientString_Split[0];
            var ingredientName = ingredientString_Split[1];
            var effects = [];
            for (var i = 2; i < ingredientString_Split.length; i++) {
                var effectSplit = ingredientString_Split[i].split(':');
                var effectName = effectSplit[0];
                var effectIsDiscovered = effectSplit[1] === 'true';
                effects.push(new Effect(effectName, effectIsDiscovered));
            }
            return new Ingredient(ingredientId, ingredientName, effects);
        };
    }
    get filePath() {
        return this.relativePath + this.fileName;
    }
    get fileName() {
        return (this.user) ? `${this.user}.txt` : this.defaultFileName;
    }
}
module.exports = DataHandler;
//# sourceMappingURL=DataHandler.js.map