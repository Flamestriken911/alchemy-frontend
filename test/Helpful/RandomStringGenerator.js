"use strict";
class RandomStringGenerator {
    constructor() {
        this.NameCharacters = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ' ";
        this.generatedStrings = [];
        this.GenerateRandomName = (maxNameLength, minNameLength) => {
            var characterArray = [];
            var randlen = Math.floor(Math.random() * (maxNameLength - minNameLength)) + minNameLength;
            for (var i = 0; i < randlen; i++) {
                characterArray[i] = this.NameCharacters[Math.floor(Math.random() * this.NameCharacters.length)];
            }
            this.generatedStrings.push(characterArray.join(''));
            return this.generatedStrings[this.generatedStrings.length - 1];
        };
    }
    get lastString() {
        return this.generatedStrings[this.generatedStrings.length - 1];
    }
}
module.exports = RandomStringGenerator;
//# sourceMappingURL=RandomStringGenerator.js.map