var Dice = require('../lib/dice');
var Operation  = require('../lib/operation');
var Transition  = require('../lib/transition');
var Sequence = require('../lib/sequence');
var assert = require('assert');

function d(face1, face2) {
  return new Dice(face1 || 3, face2);
}

function op(cost, next) {
  return new Operation('ID', 'Type', cost, () => [next]);
}

function tr(operation, end) {
  return new Transition(operation, end);
}

describe('Transition', function() {
  describe('constructor', function() {
    it('should set cost to cost of operation', function() {
      assert.equal(tr(op(4)).cost, 4);
    });
  });
  describe('#endsIn()', function() {
    it('should report matching end', function() {
      assert.equal(tr(op(), d(2)).endsIn(d(2)), true);
    });
    it('should report mismatching end', function() {
      assert.equal(tr(op(), d(2)).endsIn(d(1)), false);
    });
  });
});
