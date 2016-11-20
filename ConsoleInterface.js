"use strict";
const ReadLine = require('readline');
const DataHelper = require('./Backend/Data/DataHelper');
const DataHandler = require('./Backend/Data/DataHandler');
class ConsoleInterface {
    constructor() {
        this.filePath = './Data/';
        this.fileName = 'ingredient info.csv';
        this.user = 'test';
        this.UserQuestion = () => this.readline.question('Enter a username, or press ENTER to be a guest: ', (answer) => {
            if (answer) {
                this.user = answer;
            }
            else {
                this.user = 'guest';
            }
            console.log(`Welcome, ${this.user}!`);
            this.FirstQuestion(this.user);
        });
        this.FirstQuestion = (user) => this.readline.question('Pick your first ingredient: ', (answer) => {
            this.dataHandler.GetUserListOrDefault(user, (err, list) => {
                if (err) {
                    this.readline.close();
                    console.log(err);
                }
                else {
                    this.dataHelper.CheckMatchesInList(list, answer, null, this.SecondQuestion);
                }
            });
        });
        this.SecondQuestion = (err, list, mixture) => {
            if (err) {
                this.readline.close();
                console.log(err);
            }
            else {
                this.PrintMatches(list, mixture);
                list.Reset();
                this.readline.question('\nPick your second ingredient: ', (answer) => {
                    this.dataHelper.CheckMatchesInList(list, answer, mixture, this.FinalQuestion);
                });
            }
        };
        this.FinalQuestion = (err, list, mixture) => {
            if (err) {
                this.readline.close();
                console.log(err);
            }
            else {
                // this.PrintDiscoveries(list, mixture);
                this.PrintMatches(list, mixture);
                list.Reset();
                this.readline.question('\nPick your third and final ingredient: ', (answer) => {
                    this.dataHelper.CheckMatchesInList(list, answer, mixture, (err, list) => {
                        if (!err) {
                            this.dataHelper.MakeMixture(list, mixture);
                            this.dataHandler.WriteIngredientList(list, (message) => console.log(`SUCCESS: ${message}`));
                        }
                    });
                    this.readline.close();
                });
            }
        };
        this.PrintMatches = (list, mixture) => {
            console.log(`\n`);
            list.ingredientList.forEach((ingredient) => {
                if (!mixture.ingredients.some((i) => i.name === ingredient.name)) {
                    var ingredientString = this.GetIngredientMatchesString(ingredient);
                    if (ingredientString) {
                        console.log(ingredientString);
                    }
                }
            });
        };
        this.GetIngredientMatchesString = (ingredient) => {
            var matchesString = `${ingredient.name}:`;
            if (ingredient.addedEffects + ingredient.discoveries > 0) {
                ingredient.effects.forEach((effect, index) => {
                    var currentEffectString = this.GetEffectMatchString(effect);
                    if (currentEffectString) {
                        matchesString += `${(matchesString.length === (ingredient.name + ':').length) ? '\t' : ', '} ${currentEffectString}`;
                    }
                });
            }
            else
                return null;
            return matchesString;
        };
        this.GetEffectMatchString = (effect) => {
            var matchesString = effect.name;
            if (effect.currentAddedEffectsValue > 0) {
                if (effect.currentDiscoveryValue > 0) {
                    matchesString += '(effect & discovery)';
                }
                else {
                    matchesString += '(effect only)';
                }
            }
            else if (effect.currentDiscoveryValue > 0) {
                matchesString += '(discovery only)';
            }
            else
                matchesString = null;
            return matchesString;
        };
        this.readline = ReadLine.createInterface({
            input: process.stdin,
            output: process.stdout
        });
        this.dataHelper = new DataHelper();
        this.dataHandler = new DataHandler();
    }
}
module.exports = ConsoleInterface;
//# sourceMappingURL=ConsoleInterface.js.map