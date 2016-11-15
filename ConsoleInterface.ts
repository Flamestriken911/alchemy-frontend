import ReadLine = require('readline');
import DataHelper = require('./Data/DataHelper');
import Ingredient = require('./Components/Ingredient');
import IngredientList = require('./Lists and collections/IngredientList');
import Mixture = require('./Lists and collections/Mixture');

class ConsoleInterface{
    dataHelper: DataHelper;
    filePath = './Data/';
    fileName = 'ingredient info.csv';
    readline : ReadLine.ReadLine;

    constructor(){
        this.readline = ReadLine.createInterface({
            input: process.stdin,
            output: process.stdout
        })
        this.dataHelper = new DataHelper();
    }
    

    FirstQuestion = () => this.readline.question('Pick your first ingredient: ', (answer) => {
        this.dataHelper.GetMatches(this.filePath, this.fileName, answer, null, this.SecondQuestion);
    })

    SecondQuestion = (err: any, list: IngredientList, mixture: Mixture) => {
        if(err){
            this.readline.close();
            return err;
        } else{
            this.PrintMatches(list);
            this.readline.question('\nPick your second ingredient: ', (answer) => {
                this.dataHelper.CheckMatchesInList(list, answer, mixture, this.FinalQuestion);
            }
    )}
}

    FinalQuestion = (err: any, list: IngredientList, mixture: Mixture) => {
        if(err){
            console.log(`err in ThirdQuestion: ${err}`);
            this.readline.close();
            return err;
        } else{
            this.PrintMatches(list);
            this.readline.question('\nPick your third and final ingredient: ', (answer) => {
                this.dataHelper.CheckMatchesInList(list, answer, mixture, (err, list) => console.log('Success!'));
                this.readline.close();
            }
        )}
    }

    private PrintMatches = (list: IngredientList) => {
        console.log(`\n`);
        list.ingredientList.forEach((ingredient) => {
            if(ingredient.addedEffects > 0 && !ingredient.isInMixture){
                console.log(`${ingredient.name}: ${ingredient.addedEffects} matches`);
            }
        })
    }
}
export = ConsoleInterface;