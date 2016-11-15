"use strict";
const ReadLine = require('readline');
const DataHelper = require('./Data/DataHelper');
class ConsoleInterface {
    constructor() {
        this.filePath = './Data/';
        this.fileName = 'ingredient info.csv';
        this.FirstQuestion = () => this.readline.question('Pick your first ingredient: ', (answer) => {
            // this.dataHelper.GetMatches(this.filePath, this.fileName, answer, null, this.SecondQuestion);
            this.dataHelper.GetDiscoveries(this.filePath, this.fileName, answer, null, this.SecondQuestion);
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
                console.log(`err in ThirdQuestion: ${err}`);
                this.readline.close();
                console.log(err);
            }
            else {
                this.PrintDiscoveries(list, mixture);
                // this.PrintMatches(list, mixture);
                list.Reset();
                this.readline.question('\nPick your third and final ingredient: ', (answer) => {
                    // this.dataHelper.CheckMatchesInList(list, answer, mixture, (err, list) => console.log('Success!'));
                    this.dataHelper.CheckDiscoveriesInList(list, answer, mixture, (err, list) => console.log('Success!'));
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
    }
}
module.exports = ConsoleInterface;
//# sourceMappingURL=ConsoleInterface.js.map