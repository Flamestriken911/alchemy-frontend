import Ingredient = require('../Components/Ingredient');
import Effect = require('../Components/Effect');

//Represents the current mixture's ingredients and effects
class Mixture{
    ingredients: Ingredient[] = [];
    potentialEffects: Effect[] = []; //Effects only in a single ingredient in the mixture
    actualEffects: Effect[] = []; //Effects in at least two ingredients in the mixture
    constructor(ingredient: Ingredient){
        this.ingredients[0] = ingredient;
        this.potentialEffects = [...ingredient.effects];
        console.log(`The mixture currently includes the following ingredients: ${this.ingredients.map((ingredient)=>ingredient.name).join(', ')}`);
        console.log(`The mixture currently has the following potential effects: ${this.potentialEffects.map((effect)=>effect.name).join(', ')}`);

    }

    AddIngredient = (ingredient: Ingredient) =>{
        this.ingredients.push(ingredient);
        console.log(`Ingredient added: ${ingredient.name}`);
        console.log(`Current ingredients: ${this.ingredients.map((i)=>i.name).join(', ')}`);
        var indexInPotentialEffects: number;
        var indexInActualEffects: number;
        ingredient.effects.forEach((effect) =>{
            indexInPotentialEffects = this.potentialEffects.findIndex(e => e.name === effect.name);
            if(indexInPotentialEffects !== undefined && indexInPotentialEffects >= 0){
                //Move the effect from potential to actual effects arrays
                this.actualEffects.push(...this.potentialEffects.splice(indexInPotentialEffects, 1));
                console.log(`Effect added to final mixture: ${effect.name}`);
                console.log(`Current actual effects: ${this.actualEffects.map((e)=>e.name).join(', ')}`);
            } else {
            indexInActualEffects = this.actualEffects.findIndex(e => e.name === effect.name);
                if(indexInActualEffects !== undefined && indexInActualEffects >= 0){
                    console.log(`Effect ${effect.name} has already been added to final mixture`);
                } else{
                    this.potentialEffects.push(effect);
                    console.log(`Effect ${effect.name} added as a potential effect`);
                    console.log(`Current potential effects: ${this.potentialEffects.map((e)=>e.name).join(', ')}`);
                }
            }
        })
    }
}
export = Mixture;