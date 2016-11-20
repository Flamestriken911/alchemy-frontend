var Effect = require('../Backend/Components/Effect');
var RandomStringGenerator = require('./Helpful/RandomStringGenerator');
var assert = require('assert');

describe('Effect', function() {
  describe('constructor(_effectName: string, _discovered: bool)', function() {
    var rsg = new RandomStringGenerator();
    var tests = [
      {args: [rsg.GenerateRandomName(25,1),true], expected: [rsg.lastString, true, false, false, 0, 0]},
      {args: [rsg.GenerateRandomName(25,1),false], expected: [rsg.lastString, false, false, false, 0, 0]}
    ];

    tests.forEach(function(test) {
      it(`correctly creates an effect, '${test.args[0]}', that is${!test.args[1] ? ' not' : ''} discovered`, function() {
        var effect = new Effect(test.args[0], test.args[1]);
        assert.equal(effect.name, test.expected[0]);
        assert.equal(effect.discovered, test.expected[1]);
        assert.equal(effect.willBeDiscovered, test.expected[2]);
        assert.equal(effect.willHaveEffect, test.expected[3]);
        assert.equal(effect.currentDiscoveryValue, test.expected[4]);
        assert.equal(effect.currentAddedEffectsValue, test.expected[5]);
      });
    })
  });
});