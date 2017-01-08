var assert = require('assert');
var Dice = require('../dice');

describe('Dice', function() {
  describe('constructor', function() {
    it('should error if face 1 missing', function() {
      assert.throws(function() { new Dice() }, Error);
    });
    it('should wrap face 1 between 7..11', function() {
      assert.deepEqual(new Dice(4, 1), new Dice(10, 1));
    });
    it('should wrap face 2 between 7..1', function() {
      assert.deepEqual(new Dice(4, 1), new Dice(4, 7));
    });
    it('should wrap face 1 0', function() {
      assert.deepEqual(new Dice(6, 1), new Dice(0, 1));
    });
    it('should wrap face 1 -1', function() {
      assert.deepEqual(new Dice(5, 1), new Dice(-1, 1));
    });
    it('should wrap face 1 between 12..17', function() {
      assert.deepEqual(new Dice(6, 1), new Dice(12, 1));
    });
  });
  describe('#count()', function() {
    it('should report count of 1', function() {
      assert.equal(1, new Dice(1).count());
    });
    it('should report count of 2', function() {
      assert.equal(2, new Dice(1, 3).count());
    });
  });
  describe('#sum()', function() {
    it('should sum faces', function() {
      assert.equal(8, new Dice(2, 6).sum());
    });
    it('should sum single face', function() {
      assert.equal(2, new Dice(2).sum());
    });
  });
  describe('#sum()', function() {
    it('should diff faces when face 1 greater', function() {
      assert.equal(4, new Dice(6, 2).diff());
    });
    it('should diff faces when face 2 greater', function() {
      assert.equal(4, new Dice(2, 6).diff());
    });
    it('should diff faces when faces equal', function() {
      assert.equal(0, new Dice(3, 3).diff());
    });
    it('should diff single face', function() {
      assert.equal(2, new Dice(2).sum());
    });
  });
  describe('#areTwo()', function() {
    it('should report true if count is 2', function() {
      assert.equal(true, new Dice(1, 3).areTwo());
    });
    it('should report false if count is 1', function() {
      assert.equal(false, new Dice(1).areTwo());
    });
  });
  describe('#isOne()', function() {
    it('should report true if count is 1', function() {
      assert.equal(true, new Dice(1).isOne());
    });
    it('should report false if count is 2', function() {
      assert.equal(false, new Dice(1, 3).isOne());
    });
  });
  describe('#higher()', function() {
    it('should report higher face 1', function() {
      assert.equal(3, new Dice(3, 1).higher());
    });
    it('should report higher face 2', function() {
      assert.equal(3, new Dice(1, 3).higher());
    });
    it('should report higher face 1 if no face 2', function() {
      assert.equal(3, new Dice(3).higher());
    });
  });
  describe('#lower()', function() {
    it('should report lower face 1', function() {
      assert.equal(1, new Dice(1, 3).lower());
    });
    it('should report lower face 2', function() {
      assert.equal(1, new Dice(3, 1).lower());
    });
    it('should report lower face 1 if no face 2', function() {
      assert.equal(1, new Dice(1).lower());
    });
  });
  describe('#facesEqual()', function() {
    it('should report true if faces equal', function() {
      assert.equal(true, new Dice(3, 3).facesEqual());
    });
    it('should report false if faces not equal', function() {
      assert.equal(false, new Dice(1, 3).facesEqual());
    });
    it('should report false if no face 2', function() {
      assert.equal(false, new Dice(1).facesEqual());
    });
  });
  describe('#face1Shows()', function() {
    it('should report true if face 1 shows any', function() {
      assert.equal(true, new Dice(1, 3).face1Shows([1, 2]));
    });
    it('should report false if face 1 shows none', function() {
      assert.equal(false, new Dice(1, 3).face1Shows([3, 4]));
    });
  });
  describe('#face2Shows()', function() {
    it('should report true if face 2 shows any', function() {
      assert.equal(true, new Dice(1, 3).face2Shows([3, 4]));
    });
    it('should report false if face 2 shows none', function() {
      assert.equal(false, new Dice(1, 3).face2Shows([1, 2]));
    });
  });
  describe('#equals()', function() {
    it('should report true if equal', function() {
      assert.equal(true, new Dice(1, 3).equals(new Dice(1, 3)));
    });
    it('should report true if equal with switched faces', function() {
      assert.equal(true, new Dice(1, 3).equals(new Dice(3, 1)));
    });
    it('should report false if not equal', function() {
      assert.equal(false, new Dice(1, 3).equals(new Dice(2, 3)));
    });
  });
});
