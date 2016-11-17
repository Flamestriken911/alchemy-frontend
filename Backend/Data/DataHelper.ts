import Ingredient = require('../Components/Ingredient');
import IngredientList = require('../Lists and collections/IngredientList');
import Effect = require('../Components/Effect');
import Mixture = require('../Lists and collections/Mixture');
import DataHandler = require('./DataHandler');

class DataHelper {
    constructor(){}

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

    MakeMixture = (list: IngredientList, mixture: Mixture) => {
        mixture.MakeMixture();
        //Replace each ingredient in the list with its counterpart in the mixture
        mixture.ingredients.forEach((ingredient) => {
            list.ingredientList[list.ingredientList.findIndex((ing) => ing.name === ingredient.name)] = ingredient;
        })
    }

    private CreateOrAddToMixture = (mixture: Mixture, ingredient: Ingredient): Mixture => {
        //If the mixture is null or undefined, create a new one with the chosen ingredient to start
        if(mixture == null || mixture === undefined){
                return new Mixture(ingredient);
        } else{
            return mixture.AddIngredient(ingredient);
        }
    }
}


export = DataHelper;