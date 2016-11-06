"use strict";
const Ingredient = require('./Ingredient');
const Effect = require('./Effect');
const fs = require('fs');
class DataHelper {
    constructor() {
        this.ReadIngredients = function (relativePath, fileName) {
            var ingredientList;
            var fileReadStream = fs.createReadStream(relativePath + fileName);
            var data = '';
            fileReadStream.on('data', (chunk) => {
                data += chunk;
            });
            fileReadStream.on('end', () => {
                console.log('Finished reading data from file');
                var lines = data.split('\n');
                var variables;
                ingredientList = [];
                for (var i = 0; i < lines.length; i++) {
                    variables = lines[i].split(',');
                    console.log(`name: ${variables[0]}, effect1: ${variables[1]}, effect2: ${variables[2]}, effect3: ${variables[3]}, effect4: ${variables[4]}`);
                    ingredientList.push(new Ingredient(variables[0], [
                        new Effect(variables[1], false), new Effect(variables[2], false),
                        new Effect(variables[3], false), new Effect(variables[4], false)
                    ]));
                }
            });
        };
    }
}
module.exports = DataHelper;
//# sourceMappingURL=DataHelper.js.map