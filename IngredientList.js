"use strict";
const DataHelper = require('./DataHelper');
class IngredientList {
    GetDefaultIngredientList() {
        var listFromData = (new DataHelper()).ReadIngredients('./Data', 'ingredient info.csv');
        this.ingredientList = [];
        if (listFromData == null) {
        }
    }
    //TODO: error handling for undefined results
    GetIsDiscovered(ingredientName, effectName) {
        return this.ingredientList.find(ingredient => ingredient.name === ingredientName)
            .effects.find(effect => effect.effectName === effectName).discovered;
    }
}
module.exports = 'IngredientList';
//# sourceMappingURL=IngredientList.js.map