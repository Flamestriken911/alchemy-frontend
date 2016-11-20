"use strict";
class Ingredient {
    constructor(_name, _effects) {
        //Helper method that uses checker method to compare effects in an ingredient to effects in some a list of effects
        this.UpdateIngredientWithMatches = (effectsToLookFor, matchCounterFunction) => {
            this.effects.forEach((effect) => {
                effectsToLookFor.forEach((effectToLookFor) => {
                    matchCounterFunction(effect, effectToLookFor);
                });
            });
        };
        this.DetermineDiscoveries = (effect1, effect2) => {
            if (effect1.name === effect2.name) {
                //If there's a match, update the discovery value of each effect if appropriate
                effect1.currentDiscoveryValue = (effect1.discovered || effect1.willBeDiscovered) ? 0 : 1;
                effect2.currentDiscoveryValue = (effect2.discovered || effect2.willBeDiscovered) ? 0 : 1;
                this.discoveries += effect1.currentDiscoveryValue + effect2.currentDiscoveryValue;
            }
        };
        this.DetermineAddedEffects = (effect1, effect2) => {
            if (effect1.name === effect2.name) {
                //If there's a match, increase the effect value if neither ingredient is already adding to the mixture
                effect1.currentAddedEffectsValue = (effect1.willHaveEffect || effect2.willHaveEffect) ? 0 : 1;
                effect2.currentAddedEffectsValue = (effect1.willHaveEffect || effect2.willHaveEffect) ? 0 : 1;
                this.addedEffects += effect1.currentAddedEffectsValue;
            }
        };
        this.ToStorageString = () => {
            var storageString = this.name;
            this.effects.forEach((effect) => {
                storageString += ',' + effect.ToStorageString();
            });
            return storageString;
        };
        this.name = _name;
        this.effects = _effects;
        this.addedEffects = 0;
        this.discoveries = 0;
    }
}
module.exports = Ingredient;
//# sourceMappingURL=Ingredient.js.map