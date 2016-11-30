"use strict";
const Mixture = require('../Lists and collections/Mixture');
class DataHelper {
    constructor() {
        this.CheckMatchesInList = (list, ingredientName, callback) => {
            var err = null;
            var ingredientsInMixture = [];
            ingredientName.forEach((ingredient) => {
                ingredientsInMixture.push(list.ingredientList.find(ing => ing.name.toLowerCase() === ingredient.toLowerCase()));
            });
            if (ingredientsInMixture.some((ing) => ing.name === undefined)) {
                err = `ERROR: Ingredient name '${ingredientName}' is invalid`;
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
                list.ingredientList[list.ingredientList.findIndex((ing) => ing.name === ingredient.name)] = ingredient;
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