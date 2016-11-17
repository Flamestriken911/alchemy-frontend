import Ingredient = require('../Components/Ingredient');
import Effect = require('../Components/Effect');
import DataHelper = require('../Data/DataHelper');
import Mixture = require('./Mixture');

class IngredientList{
    ingredientList: Ingredient[] = [];

    //Used to reset added effects/discoveries after ingredient selection
    Reset = () => {
        this.ingredientList.forEach((ingredient) => {
            ingredient.addedEffects = 0;
            ingredient.discoveries = 0;
            ingredient.effects.forEach((effect) => {
                effect.currentAddedEffectsValue = 0;
                effect.currentDiscoveryValue = 0;
            })
        })
    }

    //Updates the list with any effect matches given a new ingredient added to the mixture
    UpdateWithMatches = (mixture: Mixture) => {
        this.ingredientList.forEach((ingredient) => {
            //If it's not already in the mixture, check for effects that would be added if it were
            if(!mixture.ingredients.some((i) => ingredient.name === i.name)){
                ingredient.UpdateIngredientWithMatches(mixture.potentialEffects, ingredient.DetermineAddedEffects);
                ingredient.UpdateIngredientWithMatches([...mixture.potentialEffects, ...mixture.actualEffects], ingredient.DetermineDiscoveries);
            }
        })
    }

    ToStorageString = () => {
        var csv = '';
        this.ingredientList.forEach((ingredient, index) => {
            csv += ingredient.ToStorageString() + '\n';
        })
        return csv;
    }
}

export = IngredientList;