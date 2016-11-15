import Ingredient = require('../Components/Ingredient');
import IngredientList = require('../Lists and collections/IngredientList');
import Effect = require('../Components/Effect');
import fs = require('fs');
import Mixture = require('../Lists and collections/Mixture');

class DataHelper {
    constructor(){}

    GetMatches = (relativePath: string, fileName: string, ingredientName: string, mixture: Mixture, 
    callback: (err: any, list: IngredientList, mixture: Mixture)=>void) => {
        this.ReadIngredients(relativePath, fileName, (err, list:IngredientList) => {
            if(err){
                callback(err, null, null);
            } else{
                this.CheckMatchesInList(list, ingredientName, mixture, callback);
            }
        })
    }

    GetDiscoveries = (relativePath: string, fileName: string, ingredientName: string, mixture: Mixture,
    callback: (err: any, list: IngredientList, mixture: Mixture)=>void) => {
        this.ReadIngredients(relativePath, fileName, (err, list:IngredientList) =>{
            if(err){
                callback(err, null, null);
            } else{
                this.CheckDiscoveriesInList(list, ingredientName, mixture, callback);
            }
        })
    }

    CheckMatchesInList = (list: IngredientList, ingredientName: string, mixture: Mixture, 
    callback: (err: any, list: IngredientList, mixture: Mixture)=>void): void => {
        var err = null;
        var ingredient = list.ingredientList.find(ing => ing.name.toLowerCase() === ingredientName.toLowerCase());

        if(ingredient === undefined){
            err = `ERROR: Ingredient name '${ingredientName}' is invalid`;
            callback(err, null, null);
        } else{
            mixture = this.CreateOrAddToMixture(mixture, ingredient);
            list.UpdateWithMatches(mixture);
            callback(null, list, mixture);
        }
    }

    CheckDiscoveriesInList = (list: IngredientList, ingredientName: string, mixture: Mixture, 
    callback: (err: any, list: IngredientList, mixture: Mixture)=>void): void => {
        var err = null;
        var ingredient = list.ingredientList.find(ing => ing.name.toLowerCase() === ingredientName.toLowerCase());
        
        if(ingredient === undefined){
            err = `ERROR: Ingredient name '${ingredientName}' is invalid`;
            callback(err, null, null);
        } else{
            mixture = this.CreateOrAddToMixture(mixture, ingredient);
            list.UpdateWithDiscoveries(mixture);
            callback(null, list, mixture);
        }
    }

    private CreateOrAddToMixture = (mixture: Mixture, ingredient: Ingredient): Mixture => {
        //If the mixture is null or undefined, create a new one with the chosen ingredient to start
        if(mixture == null || mixture === undefined){
                return new Mixture(ingredient);
        } else{
            return mixture.AddIngredient(ingredient);
        }
    }

    ReadIngredients = (relativePath: string, fileName: string, callback: (err: any, list: IngredientList)=>void) => {
        var fileReadStream = fs.createReadStream(relativePath + fileName);
        var data = '';
        fileReadStream.on('data', (chunk) =>{
            data += chunk;
        });
        fileReadStream.on('error', () => {
            callback(`An error occured while attempting to read from ${relativePath + fileName}`, null);
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


export = DataHelper;