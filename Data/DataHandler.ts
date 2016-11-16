import Ingredient = require('../Components/Ingredient');
import IngredientList = require('../Lists and collections/IngredientList');
import Effect = require('../Components/Effect');
import fs = require('fs');
import Mixture = require('../Lists and collections/Mixture');

class DataHandler {
    filePath: string;

    constructor(relativePath: string = './Data/', fileName: string = 'ingredient info.csv') {
        this.filePath = relativePath + fileName;
    }

    GetDefaultIngredientList = (callback: (err: any, list: IngredientList)=>void) => {
        var fileReadStream = fs.createReadStream(this.filePath);
        var data = '';
        fileReadStream.on('data', (chunk) =>{
            data += chunk;
        });
        fileReadStream.on('error', () => {
            callback(`An error occured while attempting to read from ${this.filePath}`, null);
        })
        fileReadStream.on('end', () => {
            console.log('SUCCESS: Data read from file');
            //NOTE: The line splitting creates a final, empty line
            var lines = data.split('\n');
            var listObject = new IngredientList();
            for(var i=0; i<lines.length-1; i++){
                listObject.ingredientList.push(this.ParseIngredientString(lines[i]));
            }
            console.log('SUCCESS: Data written to object')
            callback(null, listObject);
        })
    }
    
    ParseIngredientString = (ingredientString: string) => {
        var ingredientString_Split = ingredientString.split(',');
        return new Ingredient(
            ingredientString_Split[0].replace(/[^a-zA-Z' ]/g, ''), 
            [
                new Effect(ingredientString_Split[1].replace(/[^a-zA-Z' ]/g, ''),false),
                new Effect(ingredientString_Split[2].replace(/[^a-zA-Z' ]/g, ''),false),
                new Effect(ingredientString_Split[3].replace(/[^a-zA-Z' ]/g, ''),false),
                new Effect(ingredientString_Split[4].replace(/[^a-zA-Z' ]/g, ''),false)
            ]);
    };
}

export = DataHandler;