import ReadLine = require('readline');
import DataHelper = require('./Backend/Data/DataHelper');
import DataHandler = require('./Backend/Data/DataHandler');
import Ingredient = require('./Backend/Components/Ingredient');
import Effect = require('./Backend/Components/Effect');
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
        this.dataHandler.GetUserListOrDefault(user, (err, list) => {
            if(err){
                this.readline.close();
                console.log(err);
            } else{
                this.dataHelper.CheckMatchesInList(list, answer, null, this.SecondQuestion);
            }
        });
    })

    SecondQuestion = (err: any, list: IngredientList, mixture: Mixture) => {
        if(err){
            this.readline.close();
            console.log(err);
        } else{
            this.PrintMatches(list, mixture);
            list.Reset();
            this.readline.question('\nPick your second ingredient: ', (answer) => {
                this.dataHelper.CheckMatchesInList(list, answer, mixture, this.FinalQuestion);
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
            if(!mixture.ingredients.some((i) => i.name === ingredient.name)){
                var ingredientString = this.GetIngredientMatchesString(ingredient);
                if(ingredientString){
                    console.log(ingredientString);
                }
            }
        })
    }
    
    private GetIngredientMatchesString = (ingredient: Ingredient): string => {
        var matchesString = `${ingredient.name}:`;
        if(ingredient.addedEffects + ingredient.discoveries > 0){
            ingredient.effects.forEach((effect, index) => {
                var currentEffectString = this.GetEffectMatchString(effect);
                if(currentEffectString){
                // console.log(`${ingredient.name}:${(ingredient.name.length<15) ? (ingredient.name.length<7 ? '\t\t\t' : '\t\t') : '\t'}${ingredient.addedEffects} effects:\t${
                    matchesString += `${(matchesString.length === (ingredient.name+':').length) ? '\t' : ', '} ${currentEffectString}`;
                }
            })
        } else return null;
        return matchesString;
    }

    private GetEffectMatchString = (effect: Effect): string => {
        var matchesString = effect.name;
        if(effect.currentAddedEffectsValue > 0){
            if(effect.currentDiscoveryValue > 0){
                matchesString += '(effect & discovery)';
            } else{
                matchesString += '(effect only)';
            }
        } else if(effect.currentDiscoveryValue > 0){
            matchesString += '(discovery only)';
        } else matchesString = null;
        return matchesString;
    }
}
export = ConsoleInterface;