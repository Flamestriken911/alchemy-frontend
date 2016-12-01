import Ingredient = require('../Components/Ingredient');
import IngredientList = require('../Lists and collections/IngredientList');
import Effect = require('../Components/Effect');
import fs = require('fs');
import Mixture = require('../Lists and collections/Mixture');

class DataHandler {
    get filePath(): string {
        return this.relativePath + this.fileName;
    }
    private defaultFileName = 'test.txt';
    public relativePath: string = './Backend/Data/'
    private defaultFilePath: string = `${this.relativePath}${this.defaultFileName}`
    get fileName(): string {
        return (this.user) ? `${this.user}.txt` : this.defaultFileName;
    }
    public user: string = null;

    constructor(){
    }

    GetUserListOrDefault = (user: string, callback: (err: any, list: IngredientList)=>void) => {
        this.user = user;
        fs.access(this.filePath, (err: NodeJS.ErrnoException) => {
            if(err){
                console.log('WARNING: File not found; reading default file');
                this.GetIngredientList(this.defaultFilePath, callback);
            } else{
                this.GetIngredientList(this.filePath, callback);
            }
        })
    }

    GetIngredientList = (filePath: string, callback: (err: any, list: IngredientList)=>void) => {
        var fileReadStream = fs.createReadStream(filePath);
        var data = '';
        fileReadStream.on('error', () => {
            callback(`An error occured while attempting to read from ${filePath}`, null);
        })
        fileReadStream.on('data', (chunk) =>{
            data += chunk;
        });
        fileReadStream.on('end', () => {
            console.log(`SUCCESS: Data read from file ${filePath}`);
            //NOTE: The line splitting creates a final, empty line
            var lines = data.split('\n');
            var listObject = new IngredientList();
            for(var i=0; i<lines.length-1; i++){
                listObject.ingredients.push(this.ParseIngredientString(lines[i]));
            }
            callback(null, listObject);
        })
    }

    WriteIngredientList = (list: IngredientList, callback: ()=>void) => {
        console.log(`Current user: ${this.user}`);
        console.log(`Writing to file: ${this.filePath}`);
        var fileWriteSteam = fs.createWriteStream(this.filePath);
        fileWriteSteam.write(list.ToStorageString());
        fileWriteSteam.close();
        callback();
    }

    ParseIngredientString = (ingredientString: string): Ingredient => {
        var ingredientString_Split = ingredientString.replace(/[^a-zA-Z0-9',: ]/g, '').split(',');
        var ingredientId = +ingredientString_Split[0];
        var ingredientName = ingredientString_Split[1];
        var effects = [];
        for(var i=2; i<ingredientString_Split.length; i++){
            var effectSplit = ingredientString_Split[i].split(':');
            var effectName = effectSplit[0];
            var effectIsDiscovered = effectSplit[1] === 'true';
            effects.push(new Effect(effectName, effectIsDiscovered));
        }
        return new Ingredient(ingredientId, ingredientName, effects);
    };
}

export = DataHandler;