import Effect = require('./Effect');

class Ingredient {
    name: string;
    effects: Effect[];
    
    constructor(_name: string, _effects: Effect[]){
        this.name = _name;
        this.effects = _effects;
    }

}

export = Ingredient;