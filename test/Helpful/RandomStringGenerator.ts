class RandomStringGenerator{
    NameCharacters = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ' ";
    generatedStrings: string[] = [];
    get lastString(): string {
        return this.generatedStrings[this.generatedStrings.length-1];
    }

    GenerateRandomName = (maxNameLength: number, minNameLength?: number): string => {
        var characterArray = [];

        var randlen = Math.floor(Math.random() * (maxNameLength - minNameLength)) + minNameLength;
        for(var i=0; i< randlen; i++){
            characterArray[i] = this.NameCharacters[Math.floor(Math.random() * this.NameCharacters.length)];
        }
        this.generatedStrings.push(characterArray.join(''));
        return this.generatedStrings[this.generatedStrings.length-1];
    }
}
export = RandomStringGenerator;