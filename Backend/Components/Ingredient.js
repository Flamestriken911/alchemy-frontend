"use strict";
class Ingredient {
    constructor(_name, _effects) {
        //Helper method that uses checker method to compare effects in an ingredient to effects in a list of effects in the mixture
        this.UpdateIngredientWithMatches = (effectsToLookFor, matchCounterFunction) => {
            this.effects.forEach((effect) => {
                effectsToLookFor.forEach((mixtureEffect) => {
                    matchCounterFunction(effect, mixtureEffect);
                });
            });
        };
        this.DetermineDiscoveries = (effect1, effect2) => {
            if (effect1.name === effect2.name) {
                //If there's a match, update the discovery value of each effect if appropriate
                if (!effect1.discovered) {
                    effect1.willBeDiscovered = true;
                    effect1.currentDiscoveryValue = (effect2.discovered || effect2.willBeDiscovered) ? 1 : 2;
                }
                else {
                    effect1.willBeDiscovered = false;
                    effect1.currentDiscoveryValue = 0;
                }
                this.discoveries += effect1.currentDiscoveryValue;
            }
        };
        this.DetermineAddedEffects = (effect1, effect2) => {
            if (effect1.name === effect2.name) {
                //If there's a match, increase the effect value if neither ingredient is already adding to the mixture
                if (!effect2.willHaveEffect) {
                    effect1.willHaveEffect = true;
                    effect1.currentAddedEffectsValue = 1;
                }
                else {
                    effect1.willHaveEffect = false;
                    effect1.currentAddedEffectsValue = 0;
                }
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