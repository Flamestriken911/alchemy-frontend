"use strict";
//Represents the current mixture's ingredients and effects
class Mixture {
    constructor(ingredients) {
        this.ingredients = [];
        this.potentialEffects = []; //Effects only in a single ingredient in the mixture
        this.actualEffects = []; //Effects in at least two ingredients in the mixture
        this.AddIngredient = (ingredient) => {
            var indexInPotentialEffects;
            var indexInActualEffects;
            ingredient.effects.forEach((effect) => {
                effect.willHaveEffect = false;
                effect.willBeDiscovered = false;
                indexInPotentialEffects = this.potentialEffects.findIndex(e => e.name === effect.name);
                if (indexInPotentialEffects >= 0) {
                    // be sure to update the effect as 'will be discovered'
                    effect.willBeDiscovered = true;
                    effect.willHaveEffect = true;
                    this.potentialEffects[indexInPotentialEffects].willBeDiscovered = true;
                    this.potentialEffects[indexInPotentialEffects].willHaveEffect = true;
                    //Move the effect from potential to actual effects arrays
                    this.actualEffects.push(...this.potentialEffects.splice(indexInPotentialEffects, 1));
                }
                else {
                    indexInActualEffects = this.actualEffects.findIndex(e => e.name === effect.name);
                    if (indexInActualEffects < 0) {
                        this.potentialEffects.push(effect);
                    }
                    else {
                        // be sure to update the effect as 'will be discovered'
                        effect.willHaveEffect = true;
                        effect.willBeDiscovered = true;
                    }
                }
            });
            this.ingredients.push(ingredient);
            return this;
        };
        //Currently just finalizes all effect discoveries
        this.MakeMixture = () => {
            this.ingredients.forEach((ingredient) => {
                ingredient.effects.forEach((effect) => {
                    effect.discovered = effect.willBeDiscovered;
                });
            });
        };
        ingredients.forEach((ingredient) => {
            this.AddIngredient(ingredient);
        });
    }
}
module.exports = Mixture;
//# sourceMappingURL=Mixture.js.map