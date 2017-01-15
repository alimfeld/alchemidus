var Dice = require('../lib/dice');
var Operation  = require('../lib/operation');
var Transition  = require('../lib/transition');
var Sequence = require('../lib/sequence');
var assert = require('assert');

function d(face1, face2) {
  return new Dice(face1 || 3, face2);
}

function op(cost) {
  return new Operation('ID', 'Type', cost);
}

function tr(operation, end) {
  return new Transition(operation, end);
}

function seq(start, transitions) {
  return new Sequence(start, transitions);
}

describe('Sequence', function() {
  describe('constructor', function() {
    it('should set cost to 0 given no transitions', function() {
      assert.equal(seq().cost, 0);
    });
    it('should sum cost of all transitions', function() {
      assert.equal(seq(d(), [tr(op(2), d()), tr(op(3), d())]).cost, 5);
    });
    it('should set end to start given no transitions', function() {
      var start = d(1, 2);
      assert.equal(new Sequence(start).end, start);
    });
    it('should set end to end of last transition', function() {
      var end = d(1, 2);
      assert.equal(seq(d(), [tr(op(), d()), tr(op(), end)]).end, end);
    });
  });
  describe('#lastOperation()', function() {
    it('should return last operation', function() {
      var lastOperation = op();
      assert.equal(seq(d(), [tr(op(), d()), tr(lastOperation, d())]).lastOperation(),
                   lastOperation);
    });
  });
});
