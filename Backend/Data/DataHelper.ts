import Ingredient = require('../Components/Ingredient');
import IngredientList = require('../Lists and collections/IngredientList');
import Effect = require('../Components/Effect');
import Mixture = require('../Lists and collections/Mixture');
import DataHandler = require('./DataHandler');

class DataHelper {
    constructor(){}

    CheckMatchesInList = (list: IngredientList, ingredientIds: string[], 
    callback: (err: any, list: IngredientList, mixture: Mixture)=>void): void => {
        var err = null;
        var ingredientsInMixture: Ingredient[] = [];
        ingredientIds.forEach((id) => {
            ingredientsInMixture.push(
                list.ingredients.find(ing => ing.id === +id)
            )
        });

        if(ingredientsInMixture.some((ing) => ing === undefined)){
            err = `ERROR: Ingredient name '${ingredientIds}' is invalid`;
            callback(err, null, null);
        } else{
            var mixture = this.CreateMixture(ingredientsInMixture);
            list.UpdateWithMatches(mixture);
            callback(null, list, mixture);
        }
    }

    //Update an ingredient with an effect discovery
    UpdateWithDiscovery(id: number, effectName: string, value:boolean, list: IngredientList){
        list.ingredients.find((ing) => ing.id === id)
            .effects.find((effect) => effect.name === effectName)
            .discovered = value;
    }

    MakeMixture = (list: IngredientList, ingredientIds: number[]) => {
        var mixture = this.CreateMixture(list.ingredients.filter((ingredient) => ingredientIds.some((id) => id === ingredient.id)));
        mixture.MakeMixture();
        //Replace each ingredient in the list with its counterpart in the mixture
        mixture.ingredients.forEach((ingredient) => {
            list.ingredients[list.ingredients.findIndex((ing) => ing.name === ingredient.name)] = ingredient;
        })
    }

    private CreateMixture = (ingredients: Ingredient[]): Mixture => {
        //If the mixture is null or undefined, create a new one with the chosen ingredient to start
        return new Mixture(ingredients);
    }
}


export = DataHelper;