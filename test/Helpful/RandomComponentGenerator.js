"use strict";
const Effect = require('./../../Backend/Components/Effect');
const RandomStringGenerator = require('./RandomStringGenerator');
//Class to create random versions of different components
class RandomComponentGenerator {
    constructor() {
        this.lastEffectArray = null;
        this.GenerateRandomEffect = (discovered) => {
            if (discovered === undefined) {
                discovered = this.randomBool;
            }
            return new Effect(new RandomStringGenerator().GenerateRandomName(25, 1), discovered);
        };
        this.GenerateRandomEffectArray = (length, discovered) => {
            var effectArray = [];
            for (var i = 0; i < length; i++) {
                effectArray.push(this.GenerateRandomEffect((discovered === undefined) ? this.randomBool : discovered));
            }
            this.lastEffectArray = effectArray;
            return effectArray;
        };
    }
    get randomBool() {
        return Math.random() < 0.5;
    }
}
module.exports = RandomComponentGenerator;
//# sourceMappingURL=RandomComponentGenerator.js.map