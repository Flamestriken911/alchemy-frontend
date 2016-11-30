"use strict";
const Mixture = require('../Lists and collections/Mixture');
class DataHelper {
    constructor() {
        this.CheckMatchesInList = (list, ingredientIds, callback) => {
            var err = null;
            var ingredientsInMixture = [];
            ingredientIds.forEach((id) => {
                ingredientsInMixture.push(list.ingredients.find(ing => ing.id === +id));
            });
            if (ingredientsInMixture.some((ing) => ing === undefined)) {
                err = `ERROR: Ingredient name '${ingredientIds}' is invalid`;
                callback(err, null, null);
            }
            else {
                var mixture = this.CreateMixture(ingredientsInMixture);
                list.UpdateWithMatches(mixture);
                callback(null, list, mixture);
            }
        };
        this.MakeMixture = (list, mixture) => {
            mixture.MakeMixture();
            //Replace each ingredient in the list with its counterpart in the mixture
            mixture.ingredients.forEach((ingredient) => {
                list.ingredients[list.ingredients.findIndex((ing) => ing.name === ingredient.name)] = ingredient;
            });
        };
        this.CreateMixture = (ingredients) => {
            //If the mixture is null or undefined, create a new one with the chosen ingredient to start
            return new Mixture(ingredients);
        };
    }
}
module.exports = DataHelper;
//# sourceMappingURL=DataHelper.js.map