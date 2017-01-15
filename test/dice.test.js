var assert = require('assert');
var Dice = require('../lib/dice');

describe('Dice', function() {
  describe('constructor', function() {
    it('should error if face 1 missing', function() {
      assert.throws(function() { new Dice() }, Error);
    });
    it('should wrap face 1 from 10 to 4', function() {
      assert.deepEqual(new Dice(10, 1), new Dice(4, 1));
    });
    it('should wrap face 2 from 7 to 1', function() {
      assert.deepEqual(new Dice(4, 7), new Dice(4, 1));
    });
    it('should wrap face 1 from 0 to 6', function() {
      assert.deepEqual(new Dice(0, 1), new Dice(6, 1));
    });
    it('should wrap face 1 from -1 to 5', function() {
      assert.deepEqual(new Dice(-1, 1), new Dice(5, 1));
    });
    it('should wrap face 1 from 12 to 6', function() {
      assert.deepEqual(new Dice(12, 1), new Dice(6, 1));
    });
  });
  describe('#count()', function() {
    it('should report count of 1', function() {
      assert.equal(new Dice(1).count(), 1);
    });
    it('should report count of 2', function() {
      assert.equal(new Dice(1, 3).count(), 2);
    });
  });
  describe('#sum()', function() {
    it('should sum faces', function() {
      assert.equal(new Dice(2, 6).sum(), 8);
    });
    it('should sum single face', function() {
      assert.equal(new Dice(2).sum(), 2);
    });
  });
  describe('#sum()', function() {
    it('should diff faces when face 1 greater', function() {
      assert.equal(new Dice(6, 2).diff(), 4);
    });
    it('should diff faces when face 2 greater', function() {
      assert.equal(new Dice(2, 6).diff(), 4);
    });
    it('should diff faces when faces equal', function() {
      assert.equal(new Dice(3, 3).diff(), 0);
    });
    it('should diff single face', function() {
      assert.equal(new Dice(2).sum(), 2);
    });
  });
  describe('#areTwo()', function() {
    it('should report true if count is 2', function() {
      assert.equal(new Dice(1, 3).areTwo(), true);
    });
    it('should report false if count is 1', function() {
      assert.equal(new Dice(1).areTwo(), false);
    });
  });
  describe('#isOne()', function() {
    it('should report true if count is 1', function() {
      assert.equal(new Dice(1).isOne(), true);
    });
    it('should report false if count is 2', function() {
      assert.equal(new Dice(1, 3).isOne(), false);
    });
  });
  describe('#higher()', function() {
    it('should report higher face 1', function() {
      assert.equal(new Dice(3, 1).higher(), 3);
    });
    it('should report higher face 2', function() {
      assert.equal(new Dice(1, 3).higher(), 3);
    });
    it('should report higher face 1 if no face 2', function() {
      assert.equal(new Dice(3).higher(), 3);
    });
  });
  describe('#lower()', function() {
    it('should report lower face 1', function() {
      assert.equal(new Dice(1, 3).lower(), 1);
    });
    it('should report lower face 2', function() {
      assert.equal(new Dice(3, 1).lower(), 1);
    });
    it('should report lower face 1 if no face 2', function() {
      assert.equal(new Dice(1).lower(), 1);
    });
  });
  describe('#facesEqual()', function() {
    it('should report true if faces equal', function() {
      assert.equal(new Dice(3, 3).facesEqual(), true);
    });
    it('should report false if faces not equal', function() {
      assert.equal(new Dice(1, 3).facesEqual(), false);
    });
    it('should report false if no face 2', function() {
      assert.equal(new Dice(1).facesEqual(), false);
    });
  });
  describe('#face1Shows()', function() {
    it('should report true if face 1 shows any', function() {
      assert.equal(new Dice(1, 3).face1Shows([1, 2]), true);
    });
    it('should report false if face 1 shows none', function() {
      assert.equal(new Dice(1, 3).face1Shows([3, 4]), false);
    });
  });
  describe('#face2Shows()', function() {
    it('should report true if face 2 shows any', function() {
      assert.equal(new Dice(1, 3).face2Shows([3, 4]), true);
    });
    it('should report false if face 2 shows none', function() {
      assert.equal(new Dice(1, 3).face2Shows([1, 2]), false);
    });
  });
  describe('#equals()', function() {
    it('should report true if equal', function() {
      assert.equal(new Dice(1, 3).equals(new Dice(1, 3)), true);
    });
    it('should report true if equal with switched faces', function() {
      assert.equal(new Dice(1, 3).equals(new Dice(3, 1)), true);
    });
    it('should report false if not equal', function() {
      assert.equal(new Dice(1, 3).equals(new Dice(2, 3)), false);
    });
  });
});
