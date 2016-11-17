import ReadLine = require('readline');
import DataHelper = require('./Backend/Data/DataHelper');
import DataHandler = require('./Backend/Data/DataHandler');
import Ingredient = require('./Backend/Components/Ingredient');
import IngredientList = require('./Backend/Lists and collections/IngredientList');
import Mixture = require('./Backend/Lists and collections/Mixture');

class ConsoleInterface{
    dataHelper: DataHelper;
    dataHandler: DataHandler;
    filePath = './Data/';
    fileName = 'ingredient info.csv';
    user = 'test';
    readline : ReadLine.ReadLine;

    constructor(){
        this.readline = ReadLine.createInterface({
            input: process.stdin,
            output: process.stdout
        })
        this.dataHelper = new DataHelper();
        this.dataHandler = new DataHandler();
    }
    
    UserQuestion = () => this.readline.question('Enter a username, or press ENTER to be a guest: ', (answer) => {
        if(answer){
            this.user = answer;
        } else{
            this.user = 'guest';
        }
        console.log(`Welcome, ${this.user}!`);
        this.FirstQuestion(this.user);
    })

    FirstQuestion = (user?: string) => this.readline.question('Pick your first ingredient: ', (answer) => {
        // this.dataHelper.GetMatches(this.filePath, this.fileName, answer, null, this.SecondQuestion);
        this.dataHandler.GetUserListOrDefault(user, (err, list) => {
            if(err){
                this.readline.close();
                console.log(err);
            } else{
                this.dataHelper.CheckMatchesInList(list, answer, null, this.SecondQuestion);
                // this.dataHelper.CheckDiscoveriesInList(list,answer, null, this.SecondQuestion);
            }
        });
    })

    SecondQuestion = (err: any, list: IngredientList, mixture: Mixture) => {
        if(err){
            this.readline.close();
            console.log(err);
        } else{
            // this.PrintDiscoveries(list, mixture);
            this.PrintMatches(list, mixture);
            list.Reset();
            this.readline.question('\nPick your second ingredient: ', (answer) => {
                this.dataHelper.CheckMatchesInList(list, answer, mixture, this.FinalQuestion);
                // this.dataHelper.CheckDiscoveriesInList(list, answer, mixture, this.FinalQuestion);
            }
    )}
}

    FinalQuestion = (err: any, list: IngredientList, mixture: Mixture) => {
        if(err){
            this.readline.close();
            console.log(err);
        } else{
            // this.PrintDiscoveries(list, mixture);
            this.PrintMatches(list, mixture);
            list.Reset();
            this.readline.question('\nPick your third and final ingredient: ', (answer) => {
                // this.dataHelper.CheckMatchesInList(list, answer, mixture, (err, list) => console.log('Success!'));
                this.dataHelper.CheckMatchesInList(list, answer, mixture, (err, list) => {
                // this.dataHelper.CheckDiscoveriesInList(list, answer, mixture, (err, list) => {
                    if(!err){
                        this.dataHelper.MakeMixture(list, mixture);
                        this.dataHandler.WriteIngredientList(list, (message) => console.log(`SUCCESS: ${message}`));
                    }
                });                
                this.readline.close();
            }
        )}

    }

    private PrintMatches = (list: IngredientList, mixture: Mixture) => {
        console.log(`\n`);
        list.ingredientList.forEach((ingredient) => {
            if(ingredient.addedEffects > 0 && !mixture.ingredients.some((i) => i.name === ingredient.name)){
                console.log(`${ingredient.name}:${(ingredient.name.length<15) ? (ingredient.name.length<7 ? '\t\t\t' : '\t\t') : '\t'}${ingredient.addedEffects} effects:\t${
                    ingredient.effects.filter((eff)=>eff.currentAddedEffectsValue>0).map((eff)=>eff.name).join(',\t')
                }`);
            }
        })
    }
    private PrintDiscoveries = (list: IngredientList, mixture: Mixture) => {
        console.log(`\n`);
        list.ingredientList.forEach((ingredient) => {
            if(ingredient.discoveries > 0 && !mixture.ingredients.some((i) => i.name === ingredient.name)){
                console.log(`${ingredient.name}:${(ingredient.name.length<15) ? (ingredient.name.length<7 ? '\t\t\t' : '\t\t') : '\t'}${ingredient.discoveries} discoveries:\t${
                    ingredient.effects.filter((eff)=>eff.currentDiscoveryValue>0).map((eff)=>eff.name).join(',\t')
                }`);
            }
        })
    }
}
export = ConsoleInterface;