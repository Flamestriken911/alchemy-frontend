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
            // this.dataHelper.GetMatches(this.filePath, this.fileName, answer, null, this.SecondQuestion);
            this.dataHandler.GetUserListOrDefault(user, (err, list) => {
                if (err) {
                    this.readline.close();
                    console.log(err);
                }
                else {
                    this.dataHelper.CheckDiscoveriesInList(list, answer, null, this.SecondQuestion);
                }
            });
        });
        this.SecondQuestion = (err, list, mixture) => {
            if (err) {
                this.readline.close();
                console.log(err);
            }
            else {
                this.PrintDiscoveries(list, mixture);
                // this.PrintMatches(list, mixture);
                list.Reset();
                this.readline.question('\nPick your second ingredient: ', (answer) => {
                    // this.dataHelper.CheckMatchesInList(list, answer, mixture, this.FinalQuestion);
                    this.dataHelper.CheckDiscoveriesInList(list, answer, mixture, this.FinalQuestion);
                });
            }
        };
        this.FinalQuestion = (err, list, mixture) => {
            if (err) {
                this.readline.close();
                console.log(err);
            }
            else {
                this.PrintDiscoveries(list, mixture);
                // this.PrintMatches(list, mixture);
                list.Reset();
                this.readline.question('\nPick your third and final ingredient: ', (answer) => {
                    // this.dataHelper.CheckMatchesInList(list, answer, mixture, (err, list) => console.log('Success!'));
                    this.dataHelper.CheckDiscoveriesInList(list, answer, mixture, (err, list) => {
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
                if (ingredient.addedEffects > 0 && !mixture.ingredients.some((i) => i.name === ingredient.name)) {
                    console.log(`${ingredient.name}: ${ingredient.addedEffects} potential matches`);
                }
            });
        };
        this.PrintDiscoveries = (list, mixture) => {
            console.log(`\n`);
            list.ingredientList.forEach((ingredient) => {
                if (ingredient.discoveries > 0 && !mixture.ingredients.some((i) => i.name === ingredient.name)) {
                    console.log(`${ingredient.name}: ${ingredient.discoveries} potential discoveries`);
                }
            });
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