"use strict";
class IngredientList {
    constructor() {
        this.ingredientList = [];
        //Used to reset added effects/discoveries after ingredient selection
        this.Reset = () => {
            this.ingredientList.forEach((ingredient) => {
                ingredient.addedEffects = 0;
                ingredient.discoveries = 0;
                ingredient.effects.forEach((effect) => {
                    effect.currentAddedEffectsValue = 0;
                    effect.currentDiscoveryValue = 0;
                });
            });
        };
        //Updates the list with any effect matches given a new ingredient added to the mixture
        this.UpdateWithMatches = (mixture) => {
            this.ingredientList.forEach((ingredient) => {
                //If it's not already in the mixture, check for effects that would be added if it were
                if (!mixture.ingredients.some((i) => ingredient.name === i.name)) {
                    ingredient.UpdateIngredientWithMatches(mixture.potentialEffects, ingredient.DetermineAddedEffects);
                    ingredient.UpdateIngredientWithMatches([...mixture.potentialEffects, ...mixture.actualEffects], ingredient.DetermineDiscoveries);
                }
            });
        };
        this.ToStorageString = () => {
            var csv = '';
            this.ingredientList.forEach((ingredient, index) => {
                csv += ingredient.ToStorageString() + '\n';
            });
            return csv;
        };
    }
}
module.exports = IngredientList;
//# sourceMappingURL=IngredientList.js.map