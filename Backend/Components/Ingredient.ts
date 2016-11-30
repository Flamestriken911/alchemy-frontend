import Effect = require('./Effect');

class Ingredient {
    name: string;
    id: number;
    effects: Effect[];
    addedEffects: number; //Number of effect matches added by this ingredient to the current mixture
    discoveries: number; //Number of effect discoveries added by this ingredient to the current mixture
    
    constructor(_id: number, _name: string, _effects: Effect[]){
        this.id = _id;
        this.name = _name;
        this.effects = _effects;
        this.addedEffects = 0;
        this.discoveries = 0;
    }

    //Helper method that uses checker method to compare effects in an ingredient to effects in a list of effects in the mixture
    UpdateIngredientWithMatches = (effectsToLookFor: Effect[], matchCounterFunction) => {
        this.effects.forEach((effect) => {
            effectsToLookFor.forEach((mixtureEffect) => {
                matchCounterFunction(effect, mixtureEffect);
            })
        })
    }

    DetermineDiscoveries = (effect1: Effect, effect2: Effect) => {
        if(effect1.name === effect2.name){
            //If there's a match, update the discovery value of each effect if appropriate
            if(!effect1.discovered) {
                effect1.willBeDiscovered = true;
                effect1.currentDiscoveryValue = (effect2.discovered || effect2.willBeDiscovered) ? 1 : 2;
            } else {
                effect1.willBeDiscovered = false;
                effect1.currentDiscoveryValue = 0;
            }
            this.discoveries += effect1.currentDiscoveryValue;
        }
    }

    DetermineAddedEffects = (effect1: Effect, effect2: Effect) => {
        if(effect1.name === effect2.name){
            //If there's a match, increase the effect value if neither ingredient is already adding to the mixture
            if(!effect2.willHaveEffect) {
                effect1.willHaveEffect = true;
                effect1.currentAddedEffectsValue = 1;
            } else {
                effect1.willHaveEffect = false;
                effect1.currentAddedEffectsValue = 0;
            }
            this.addedEffects += effect1.currentAddedEffectsValue;
        }
    }

    ToStorageString = () => {
        var storageString = `${this.id},${this.name}`;
        this.effects.forEach((effect) => {
            storageString += ',' + effect.ToStorageString();
        })
        return storageString;
    }

}

export = Ingredient;