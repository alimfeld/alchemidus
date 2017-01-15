var Dice = require('../lib/dice');
var Operation = require('../lib/operation');
var Transition  = require('../lib/transition');
var Sequence = require('../lib/sequence');
var assert = require('assert');

describe('Operation', function() {
  describe('#transitions()', function() {
    it('should return all transitions', function() {
      var start = new Dice(1, 2);
      var end1 = new Dice(2, 3);
      var end2 = new Dice(3, 4);
      var op = new Operation('T01', 'T', 3, () => [end1, end2]);
      assert.deepEqual(op.transitions(new Sequence(start)),
                       [ new Transition(op, end1), new Transition(op, end2) ]);
    });
  });
});
