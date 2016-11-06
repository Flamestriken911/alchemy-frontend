import Ingredient = require('./Ingredient');
import DataHelper = require('./DataHelper');

class IngredientList{
    ingredientList: Ingredient[];

    GetDefaultIngredientList(){
        var listFromData =  (new DataHelper()).ReadIngredients('./Data', 'ingredient info.csv');
        this.ingredientList = [];
        if(listFromData == null){
//            this.ingredientList = listFromData;
        }
    }
    //TODO: error handling for undefined results
    GetIsDiscovered(ingredientName: string, effectName: string){
        return this.ingredientList.find(ingredient => ingredient.name === ingredientName)
            .effects.find(effect => effect.effectName === effectName).discovered;
    }
}

export = 'IngredientList'