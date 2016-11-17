"use strict";
const Mixture = require('../Lists and collections/Mixture');
class DataHelper {
    constructor() {
        this.CheckMatchesInList = (list, ingredientName, mixture, callback) => {
            var err = null;
            var ingredient = list.ingredientList.find(ing => ing.name.toLowerCase() === ingredientName.toLowerCase());
            if (ingredient === undefined) {
                err = `ERROR: Ingredient name '${ingredientName}' is invalid`;
                callback(err, null, null);
            }
            else {
                mixture = this.CreateOrAddToMixture(mixture, ingredient);
                list.UpdateWithMatches(mixture);
                callback(null, list, mixture);
            }
        };
        this.CheckDiscoveriesInList = (list, ingredientName, mixture, callback) => {
            var err = null;
            var ingredient = list.ingredientList.find(ing => ing.name.toLowerCase() === ingredientName.toLowerCase());
            if (ingredient === undefined) {
                err = `ERROR: Ingredient name '${ingredientName}' is invalid`;
                callback(err, null, null);
            }
            else {
                mixture = this.CreateOrAddToMixture(mixture, ingredient);
                list.UpdateWithDiscoveries(mixture);
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
        this.CreateOrAddToMixture = (mixture, ingredient) => {
            //If the mixture is null or undefined, create a new one with the chosen ingredient to start
            if (mixture == null || mixture === undefined) {
                return new Mixture(ingredient);
            }
            else {
                return mixture.AddIngredient(ingredient);
            }
        };
    }
}
module.exports = DataHelper;
//# sourceMappingURL=DataHelper.js.map