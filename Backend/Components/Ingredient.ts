import Effect = require('./Effect');

class Ingredient {
    name: string;
    effects: Effect[];
    addedEffects: number; //Number of effect matches added by this ingredient to the current mixture
    discoveries: number; //Number of effect discoveries added by this ingredient to the current mixture
    
    constructor(_name: string, _effects: Effect[]){
        this.name = _name;
        this.effects = _effects;
        this.addedEffects = this.discoveries = 0;
    }

    //Gets number of newly-discovered effects (up to 2 per effect since the effect could be new on both ingredients)
    UpdateWithDiscoveredEffects(effectsToLookFor: Effect[]){
        this.UpdateIngredientWithMatches(effectsToLookFor, this.DetermineDiscoveries)
    }

    UpdateWithMatchedEffects(effectsToLookFor: Effect[]){
        this.UpdateIngredientWithMatches(effectsToLookFor, this.DetermineAddedEffects)
    }

    //Helper method that uses checker method to compare effects in an ingredient to effects in some a list of effects
    private UpdateIngredientWithMatches = (effectsToLookFor: Effect[], matchCounterFunction) => {
        for(var i=0; i<this.effects.length; i++){
            for(var j=0; j<effectsToLookFor.length; j++){
                matchCounterFunction(this.effects[i], effectsToLookFor[j]);
            }
        }
    }

    private DetermineDiscoveries = (effect1: Effect, effect2: Effect) => {
        if(effect1.name === effect2.name){
            //If there's a match, update the discovery value of each effect if appropriate
            effect1.currentDiscoveryValue = (effect1.discovered || effect1.willBeDiscovered) ? 0 : 1;
            effect2.currentDiscoveryValue = (effect2.discovered || effect2.willBeDiscovered) ? 0 : 1;
            this.discoveries += effect1.currentDiscoveryValue + effect2.currentDiscoveryValue;
        }
    }

    private DetermineAddedEffects = (effect1: Effect, effect2: Effect) => {
        if(effect1.name === effect2.name){
            //If there's a match, increase the effect value if neither ingredient is already adding to the mixture
            effect1.currentAddedEffectsValue = (effect1.willHaveEffect || effect2.willHaveEffect) ? 0 : 1;
            this.addedEffects += effect1.currentAddedEffectsValue;
        }
    }

    ToStorageString = () => {
        var storageString = this.name;
        this.effects.forEach((effect) => {
            storageString += ',' + effect.ToStorageString();
        })
        return storageString;
    }

}

export = Ingredient;