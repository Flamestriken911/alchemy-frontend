var Effect = require('../Backend/Components/Effect');
var Ingredient = require('../Backend/Components/Ingredient');
var RandomStringGenerator = require('./Helpful/RandomStringGenerator');
var RandomComponentGenerator = require('./Helpful/RandomComponentGenerator');
var assert = require('assert');

describe('Ingredient', function() {
  var randomStringGenerator = new RandomStringGenerator();
  var randomComponentGenerator = new RandomComponentGenerator();

  describe('constructor(_name: string, _effects: [Effect])', function() {
    var tests = [
      {args: [randomStringGenerator.GenerateRandomName(25,1), randomComponentGenerator.GenerateRandomEffectArray(1, false)], 
       expected: [randomStringGenerator.lastString, randomComponentGenerator.lastEffectArray, 0, 0]},
      {args: [randomStringGenerator.GenerateRandomName(25,1), randomComponentGenerator.GenerateRandomEffectArray (2, false)], 
       expected: [randomStringGenerator.lastString, randomComponentGenerator.lastEffectArray, 0, 0]},
      {args: [randomStringGenerator.GenerateRandomName(25,1), randomComponentGenerator.GenerateRandomEffectArray (3, false)], 
       expected: [randomStringGenerator.lastString, randomComponentGenerator.lastEffectArray, 0, 0]},
      {args: [randomStringGenerator.GenerateRandomName(25,1), randomComponentGenerator.GenerateRandomEffectArray (4, false)], 
       expected: [randomStringGenerator.lastString, randomComponentGenerator.lastEffectArray, 0, 0]},
    ];

    tests.forEach(function(test) {
      it(`correctly creates an ingredient, '${test.args[0]}', with ${test.args[1].length} undiscovered effects: '${
      test.args[1].map((eff)=>eff.name).join("','")
      }'`, function() {

        var ingredient = new Ingredient(test.args[0], test.args[1]);
        assert.equal(ingredient.name, test.expected[0]);
        ingredient.effects.forEach((eff, i)=>assert.equal(eff.name, test.expected[1][i].name));
        assert.equal(ingredient.addedEffects,test.expected[2]);
        assert.equal(ingredient.discoveries,test.expected[3]);
      });
    });
  });
  describe('(discoveries): UpdateIngredientWithMatches(effectsToLookFor: Effect[], matchCounterFunction)', function() {
    var tests = [
      { args: [
          new Ingredient(randomStringGenerator.GenerateRandomName(25,1),randomComponentGenerator.GenerateRandomEffectArray(1,false)),
          randomComponentGenerator.lastEffectArray
        ], 
        expected: [1, 1, 2]},
      { args: [
          new Ingredient(randomStringGenerator.GenerateRandomName(25,1),randomComponentGenerator.GenerateRandomEffectArray(1,true)),
          [new Effect(randomComponentGenerator.lastEffectArray[0].name, false)]
        ], 
        expected: [0, 1, 1]},
      { args: [
          new Ingredient(randomStringGenerator.GenerateRandomName(25,1),randomComponentGenerator.GenerateRandomEffectArray(1,false)),
          [new Effect(randomComponentGenerator.lastEffectArray[0].name, true)]
        ], 
        expected: [1, 0, 1]},
      { args: [
          new Ingredient(randomStringGenerator.GenerateRandomName(25,1),randomComponentGenerator.GenerateRandomEffectArray(1,true)),
          [new Effect(randomComponentGenerator.lastEffectArray[0].name, true)]
        ], 
        expected: [0, 0, 0]},
    ];

    tests.forEach(function(test) {
      it(`correctly updates an ingredient with one ${
          test.args[0].effects[0].discovered ? '' : 'un'
        }discovered effect with discoveries from one ${
          test.args[0].effects[0].discovered ? '' : 'un'
        }discovered effect of the same name`, function() {

        test.args[0].UpdateIngredientWithMatches(test.args[1], test.args[0].DetermineDiscoveries);
        assert.equal(test.expected[0], test.args[0].effects[0].currentDiscoveryValue);
        assert.equal(test.expected[1], test.args[1][0].currentDiscoveryValue);
        assert.equal(test.expected[2], test.args[0].discoveries);
      });
    });
  });

  describe('(added effects): UpdateIngredientWithMatches(effectsToLookFor: Effect[], matchCounterFunction)', function() {
    var tests = [
      { args: [
          new Ingredient(randomStringGenerator.GenerateRandomName(25,1),randomComponentGenerator.GenerateRandomEffectArray(1)),
          false, false
        ], 
        expected: [1, 1, 1]},
      { args: [
          new Ingredient(randomStringGenerator.GenerateRandomName(25,1),randomComponentGenerator.GenerateRandomEffectArray(1)),
          true, false
        ], 
        expected: [0, 0, 0]},
      { args: [
          new Ingredient(randomStringGenerator.GenerateRandomName(25,1),randomComponentGenerator.GenerateRandomEffectArray(1)),
          false, true
        ], 
        expected: [0, 0, 0]},
      { args: [
          new Ingredient(randomStringGenerator.GenerateRandomName(25,1),randomComponentGenerator.GenerateRandomEffectArray(1)),
          true, true
        ], 
        expected: [0, 0, 0]},
    ];

    tests.forEach(function(test) {
      it(`correctly updates an ingredient with one ${
          test.args[0].effects[0].willHaveEffect ? '' : 'not yet '
        }added effect with discoveries from one ${
          test.args[0].effects[0].willHaveEffect ? '' : 'not yet '
        }added effect of the same name`, function() {
        
        var effect = new Effect(test.args[0].effects[0].name, false);
        test.args[0].effects[0].willHaveEffect = test.args[1];
        effect.willHaveEffect = test.args[2];

        test.args[0].UpdateIngredientWithMatches([effect], test.args[0].DetermineAddedEffects);
        assert.equal(test.expected[0], test.args[0].effects[0].currentAddedEffectsValue);
        assert.equal(test.expected[1], effect.currentAddedEffectsValue);
        assert.equal(test.expected[2], test.args[0].addedEffects);
      });
    });
  });
});