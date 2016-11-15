import Ingredient = require('../Components/Ingredient');
import Effect = require('../Components/Effect');
import DataHelper = require('../Data/DataHelper');

class IngredientList{
    ingredientList: Ingredient[];

    constructor(){
        this.ingredientList = [];
    }

    //TODO: error handling for undefined results
    GetIsDiscovered(ingredientName: string, effectName: string){
        return this.ingredientList.find(ingredient => ingredient.name === ingredientName)
            .effects.find(effect => effect.name === effectName).discovered;
    }

    //Updates the list with any effect matches given a new ingredient added to the mixture
    UpdateWithMatches(ingredientAddedToMixture: Ingredient){
        ingredientAddedToMixture.isInMixture = true;
        var effectsToMatch = ingredientAddedToMixture.effects;
        this.PrintCurrentMixture();
        for(var index=0; index< this.ingredientList.length; index++){
            //If the ingredient name matches, it's being added to the mixture
            this.ingredientList[index].isInMixture = this.ingredientList[index].isInMixture || (this.ingredientList[index].name === ingredientAddedToMixture.name);
            //If it's not already in the mixture, check for effects that would be added if it were (don't record these results here)
            if(!this.ingredientList[index].isInMixture){
                this.ingredientList[index].UpdateWithMatchedEffects(ingredientAddedToMixture.effects, false);
            }
        }
    }

    UpdateWithDiscoveries(ingredientAddedToMixture: Ingredient){
        ingredientAddedToMixture.isInMixture = true;
        var effectsToMatch = ingredientAddedToMixture.effects;
        for(var index=0; index< this.ingredientList.length; index++){
            //If the ingredient name matches, it's being added to the mixture
            this.ingredientList[index].isInMixture = this.ingredientList[index].isInMixture || (this.ingredientList[index].name === ingredientAddedToMixture.name);
            //If it's not already in the mixture, check for effects that would be added if it were (don't record these results here)
            if(!this.ingredientList[index].isInMixture){
                this.ingredientList[index].UpdateWithDiscoveredEffects(effectsToMatch, false);
            }
        }
    }

    PrintCurrentMixture = () =>{
        var ingredientsInMixture: string[];
        var uniqueEffectsInMixture: string[];
        ingredientsInMixture = [];
        uniqueEffectsInMixture = [];

        for(var index=0; index<this.ingredientList.length; index++){
            if(this.ingredientList[index].isInMixture){ 
                ingredientsInMixture.push(this.ingredientList[index].name);
                for(var i=0; i<this.ingredientList[index].effects.length; i++){
                    //WARNING: Currently adds ALL effects of each ingredient (not just what will be in mixture)
                    if((uniqueEffectsInMixture.find(x => x === this.ingredientList[index].effects[i].name)===undefined)){
                        uniqueEffectsInMixture.push(this.ingredientList[index].effects[i].name);
                    }
                }
            }
        }
//        console.log(`The mixture currently includes the following ingredients: ${ingredientsInMixture.join(', ')}`);
//        console.log(`The mixture currently has the following effects: ${uniqueEffectsInMixture.join(', ')}`);
    }
}

export = IngredientList;