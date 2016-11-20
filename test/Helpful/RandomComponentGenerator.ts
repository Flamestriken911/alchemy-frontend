import Effect = require('./../../Backend/Components/Effect');
import Ingredient = require('./../../Backend/Components/Ingredient');
import RandomStringGenerator = require('./RandomStringGenerator');

//Class to create random versions of different components
class RandomComponentGenerator{
    private get randomBool(): boolean {
        return Math.random() < 0.5;
    }
    lastEffectArray: Effect[] = null

    GenerateRandomEffect = (discovered?: boolean): Effect => {
        if(discovered === undefined) {
            discovered = this.randomBool;
        }
        return new Effect(new RandomStringGenerator().GenerateRandomName(25,1), discovered);
    }
    GenerateRandomEffectArray = (length: number, discovered?: boolean): Effect[] => {
        var effectArray = [];
        for(var i=0; i<length; i++){
            effectArray.push(this.GenerateRandomEffect((discovered === undefined) ? this.randomBool : discovered));
        }
        this.lastEffectArray = effectArray;
        return effectArray;
    }
}
export = RandomComponentGenerator;