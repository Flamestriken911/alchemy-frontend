import Ingredient = require('../Components/Ingredient');
import IngredientList = require('../Lists and collections/IngredientList');
import Effect = require('../Components/Effect');
import Mixture = require('../Lists and collections/Mixture');
import DataHandler = require('./DataHandler');

class DataHelper {
    constructor(){}

    CheckMatchesInList = (list: IngredientList, ingredientName: string[], 
    callback: (err: any, list: IngredientList, mixture: Mixture)=>void): void => {
        var err = null;
        var ingredientsInMixture: Ingredient[] = [];
        ingredientName.forEach((ingredient) => {
            ingredientsInMixture.push(
                list.ingredientList.find(ing => ing.name.toLowerCase() === ingredient.toLowerCase())
            )
        });

        if(ingredientsInMixture.some((ing) => ing.name === undefined)){
            err = `ERROR: Ingredient name '${ingredientName}' is invalid`;
            callback(err, null, null);
        } else{
            var mixture = this.CreateMixture(ingredientsInMixture);
            list.UpdateWithMatches(mixture);
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

    private CreateMixture = (ingredients: Ingredient[]): Mixture => {
        //If the mixture is null or undefined, create a new one with the chosen ingredient to start
        return new Mixture(ingredients);
    }
}


export = DataHelper;