var assert = require('assert');
var Dice = require('../dice');
var operations = require('../operations');

describe('Operations', function() {
  describe('Remove', function() {
    describe('R01 - Remove higher', function() {
      var op = operations.remove[0];
      it('should cost 2', function() {
        assert.equal(2, op.cost);
      });
      it('should remove higher face 1', function() {
        assert.deepEqual([new Dice(1)], op.fn(new Dice(3, 1)));
      });
      it('should remove higher face 2', function() {
        assert.deepEqual([new Dice(1)], op.fn(new Dice(1, 3)));
      });
      it('should not operate on single die', function() {
        assert.deepEqual([], op.fn(new Dice(1)));
      });
    });
    describe('R02 - Remove lower', function() {
      var op = operations.remove[1];
      it('should cost 2', function() {
        assert.equal(2, op.cost);
      });
      it('should remove lower face 1', function() {
        assert.deepEqual([new Dice(3)], op.fn(new Dice(1, 3)));
      });
      it('should remove lower face 2', function() {
        assert.deepEqual([new Dice(3)], op.fn(new Dice(3, 1)));
      });
      it('should not operate on single die', function() {
        assert.deepEqual([], op.fn(new Dice(1)));
      });
    });
    describe('R03 - Remove 1 or 3 or 5', function() {
      var op = operations.remove[2];
      it('should cost 3', function() {
        assert.equal(3, op.cost);
      });
      it('should remove face 1 showing 1', function() {
        assert.deepEqual([new Dice(4)], op.fn(new Dice(1, 4)));
      });
      it('should remove face 1 showing 3', function() {
        assert.deepEqual([new Dice(4)], op.fn(new Dice(3, 4)));
      });
      it('should remove face 1 showing 5', function() {
        assert.deepEqual([new Dice(4)], op.fn(new Dice(5, 4)));
      });
      it('should remove face 2 showing 1', function() {
        assert.deepEqual([new Dice(4)], op.fn(new Dice(4, 1)));
      });
      it('should remove face 2 showing 3', function() {
        assert.deepEqual([new Dice(4)], op.fn(new Dice(4, 3)));
      });
      it('should remove face 2 showing 5', function() {
        assert.deepEqual([new Dice(4)], op.fn(new Dice(4, 5)));
      });
      it('should create variants if both faces odd', function() {
        assert.deepEqual([new Dice(5), new Dice(3)], op.fn(new Dice(3, 5)));
      });
      it('should not create variants if both faces odd but equal', function() {
        assert.deepEqual([new Dice(3)], op.fn(new Dice(3, 3)));
      });
      it('should not operate on even faces', function() {
        assert.deepEqual([], op.fn(new Dice(2, 4)));
      });
      it('should not operate on single die', function() {
        assert.deepEqual([], op.fn(new Dice(1)));
      });
    });
    describe('R04 - Remove 2 or 4 or 6', function() {
      var op = operations.remove[3];
      it('should cost 3', function() {
        assert.equal(3, op.cost);
      });
      it('should remove face 1 showing 2', function() {
        assert.deepEqual([new Dice(3)], op.fn(new Dice(2, 3)));
      });
      it('should remove face 1 showing 4', function() {
        assert.deepEqual([new Dice(3)], op.fn(new Dice(4, 3)));
      });
      it('should remove face 1 showing 6', function() {
        assert.deepEqual([new Dice(3)], op.fn(new Dice(6, 3)));
      });
      it('should remove face 2 showing 2', function() {
        assert.deepEqual([new Dice(3)], op.fn(new Dice(3, 2)));
      });
      it('should remove face 2 showing 4', function() {
        assert.deepEqual([new Dice(3)], op.fn(new Dice(3, 4)));
      });
      it('should remove face 2 showing 6', function() {
        assert.deepEqual([new Dice(3)], op.fn(new Dice(3, 6)));
      });
      it('should create variants if both faces even', function() {
        assert.deepEqual([new Dice(6), new Dice(4)], op.fn(new Dice(4, 6)));
      });
      it('should not create variants if both faces even but equal', function() {
        assert.deepEqual([new Dice(4)], op.fn(new Dice(4, 4)));
      });
      it('should not operate on odd faces', function() {
        assert.deepEqual([], op.fn(new Dice(1, 3)));
      });
      it('should not operate on single die', function() {
        assert.deepEqual([], op.fn(new Dice(1)));
      });
    });
    describe('R05 - Remove 1 or 2 or 3', function() {
      var op = operations.remove[4];
      it('should cost 3', function() {
        assert.equal(3, op.cost);
      });
      it('should remove face 1 showing 1', function() {
        assert.deepEqual([new Dice(4)], op.fn(new Dice(1, 4)));
      });
      it('should remove face 1 showing 2', function() {
        assert.deepEqual([new Dice(4)], op.fn(new Dice(2, 4)));
      });
      it('should remove face 1 showing 3', function() {
        assert.deepEqual([new Dice(4)], op.fn(new Dice(3, 4)));
      });
      it('should remove face 2 showing 1', function() {
        assert.deepEqual([new Dice(4)], op.fn(new Dice(4, 1)));
      });
      it('should remove face 2 showing 2', function() {
        assert.deepEqual([new Dice(4)], op.fn(new Dice(4, 2)));
      });
      it('should remove face 2 showing 3', function() {
        assert.deepEqual([new Dice(4)], op.fn(new Dice(4, 3)));
      });
      it('should create variants if both faces in 1..3', function() {
        assert.deepEqual([new Dice(3), new Dice(1)], op.fn(new Dice(1, 3)));
      });
      it('should not create variants if both faces in 1..3 but equal', function() {
        assert.deepEqual([new Dice(2)], op.fn(new Dice(2, 2)));
      });
      it('should not operate on faces between 4..6', function() {
        assert.deepEqual([], op.fn(new Dice(4, 5)));
      });
      it('should not operate on single die', function() {
        assert.deepEqual([], op.fn(new Dice(1)));
      });
    });
    describe('R06 - Remove 4 or 5 or 6', function() {
      var op = operations.remove[5];
      it('should cost 3', function() {
        assert.equal(3, op.cost);
      });
      it('should remove face 1 showing 4', function() {
        assert.deepEqual([new Dice(1)], op.fn(new Dice(4, 1)));
      });
      it('should remove face 1 showing 5', function() {
        assert.deepEqual([new Dice(1)], op.fn(new Dice(5, 1)));
      });
      it('should remove face 1 showing 6', function() {
        assert.deepEqual([new Dice(1)], op.fn(new Dice(6, 1)));
      });
      it('should remove face 2 showing 4', function() {
        assert.deepEqual([new Dice(1)], op.fn(new Dice(1, 4)));
      });
      it('should remove face 2 showing 5', function() {
        assert.deepEqual([new Dice(1)], op.fn(new Dice(1, 5)));
      });
      it('should remove face 2 showing 6', function() {
        assert.deepEqual([new Dice(1)], op.fn(new Dice(1, 6)));
      });
      it('should create variants if both faces in 4..6', function() {
        assert.deepEqual([new Dice(6), new Dice(4)], op.fn(new Dice(4, 6)));
      });
      it('should not create variants if both faces in 4..6 but equal', function() {
        assert.deepEqual([new Dice(5)], op.fn(new Dice(5, 5)));
      });
      it('should not operate on faces between 1..3', function() {
        assert.deepEqual([], op.fn(new Dice(2, 3)));
      });
      it('should not operate on single die', function() {
        assert.deepEqual([], op.fn(new Dice(1)));
      });
    });
    describe('R07 - Remove face equal to op position', function() {
      var seq = [[operations.change[1]]];
      var op = operations.remove[6];
      it('should cost 0', function() {
        assert.equal(0, op.cost);
      });
      it('should remove face 1 showing pos', function() {
        assert.deepEqual([new Dice(1)], op.fn(new Dice(2, 1), seq));
      });
      it('should remove face 2 showing pos', function() {
        assert.deepEqual([new Dice(1)], op.fn(new Dice(1, 2), seq));
      });
      it('should not create variants if both faces showing pos', function() {
        assert.deepEqual([new Dice(2)], op.fn(new Dice(2, 2), seq));
      });
      it('should not operate on faces not showing pos', function() {
        assert.deepEqual([], op.fn(new Dice(1, 3), seq));
      });
      it('should not operate on single die', function() {
        assert.deepEqual([], op.fn(new Dice(1), seq));
      });
    });
    describe('R08 - Remove any', function() {
      var op = operations.remove[7];
      it('should cost 10', function() {
        assert.equal(10, op.cost);
      });
      it('should create variants', function() {
        assert.deepEqual([new Dice(1), new Dice(2)], op.fn(new Dice(1, 2)));
      });
      it('should not create variants if faces equal', function() {
        assert.deepEqual([new Dice(2)], op.fn(new Dice(2, 2)));
      });
      it('should not operate on single die', function() {
        assert.deepEqual([], op.fn(new Dice(1)));
      });
    });
    describe('R09 - Remove any if sum >= 7', function() {
      var op = operations.remove[8];
      it('should cost 1', function() {
        assert.equal(1, op.cost);
      });
      it('should create variants if sum == 7', function() {
        assert.deepEqual([new Dice(3), new Dice(4)], op.fn(new Dice(3, 4)));
      });
      it('should create variants if sum > 7', function() {
        assert.deepEqual([new Dice(3), new Dice(5)], op.fn(new Dice(3, 5)));
      });
      it('should not create variants if faces equal', function() {
        assert.deepEqual([new Dice(4)], op.fn(new Dice(4, 4)));
      });
      it('should not operate if sum < 7', function() {
        assert.deepEqual([], op.fn(new Dice(1, 5)));
      });
      it('should not operate on single die', function() {
        assert.deepEqual([], op.fn(new Dice(1)));
      });
    });
    describe('R10 - Remove any if sum == 7', function() {
      var op = operations.remove[9];
      it('should cost 1', function() {
        assert.equal(1, op.cost);
      });
      it('should create variants if sum == 7', function() {
        assert.deepEqual([new Dice(3), new Dice(4)], op.fn(new Dice(3, 4)));
      });
      it('should not operate if sum < 7', function() {
        assert.deepEqual([], op.fn(new Dice(1, 5)));
      });
      it('should not operate if sum > 7', function() {
        assert.deepEqual([], op.fn(new Dice(3, 5)));
      });
      it('should not operate on single die', function() {
        assert.deepEqual([], op.fn(new Dice(1)));
      });
    });
    describe('R11 - Remove any if sum <= 7', function() {
      var op = operations.remove[10];
      it('should cost 2', function() {
        assert.equal(2, op.cost);
      });
      it('should create variants if sum == 7', function() {
        assert.deepEqual([new Dice(3), new Dice(4)], op.fn(new Dice(3, 4)));
      });
      it('should create variants if sum < 7', function() {
        assert.deepEqual([new Dice(3), new Dice(2)], op.fn(new Dice(3, 2)));
      });
      it('should not create variants if faces equal', function() {
        assert.deepEqual([new Dice(3)], op.fn(new Dice(3, 3)));
      });
      it('should not operate if sum > 7', function() {
        assert.deepEqual([], op.fn(new Dice(3, 5)));
      });
      it('should not operate on single die', function() {
        assert.deepEqual([], op.fn(new Dice(1)));
      });
    });
    describe('R12 - Remove any if diff <= 2', function() {
      var op = operations.remove[11];
      it('should cost 1', function() {
        assert.equal(1, op.cost);
      });
      it('should create variants if diff == 2', function() {
        assert.deepEqual([new Dice(4), new Dice(6)], op.fn(new Dice(4, 6)));
      });
      it('should create variants if diff < 2', function() {
        assert.deepEqual([new Dice(3), new Dice(2)], op.fn(new Dice(3, 2)));
      });
      it('should not create variants if faces equal', function() {
        assert.deepEqual([new Dice(3)], op.fn(new Dice(3, 3)));
      });
      it('should not operate if diff > 2', function() {
        assert.deepEqual([], op.fn(new Dice(2, 5)));
      });
      it('should not operate on single die', function() {
        assert.deepEqual([], op.fn(new Dice(1)));
      });
    });
    describe('R13 - Remove any if faces equal', function() {
      var op = operations.remove[12];
      it('should cost 1', function() {
        assert.equal(1, op.cost);
      });
      it('should remove one if faces equal', function() {
        assert.deepEqual([new Dice(3)], op.fn(new Dice(3, 3)));
      });
      it('should not operate if faces not equal', function() {
        assert.deepEqual([], op.fn(new Dice(2, 5)));
      });
      it('should not operate on single die', function() {
        assert.deepEqual([], op.fn(new Dice(1)));
      });
    });
    describe('R14 - Remove any if sum is even', function() {
      var op = operations.remove[13];
      it('should cost 5', function() {
        assert.equal(5, op.cost);
      });
      it('should create variants if sum is even', function() {
        assert.deepEqual([new Dice(2), new Dice(4)], op.fn(new Dice(2, 4)));
      });
      it('should not create variants if faces equal', function() {
        assert.deepEqual([new Dice(3)], op.fn(new Dice(3, 3)));
      });
      it('should not operate if sum is odd', function() {
        assert.deepEqual([], op.fn(new Dice(3, 4)));
      });
      it('should not operate on single die', function() {
        assert.deepEqual([], op.fn(new Dice(1)));
      });
    });
    describe('R15 - Remove any if sum is odd', function() {
      var op = operations.remove[14];
      it('should cost 5', function() {
        assert.equal(5, op.cost);
      });
      it('should create variants if sum is odd', function() {
        assert.deepEqual([new Dice(3), new Dice(4)], op.fn(new Dice(3, 4)));
      });
      it('should not operate if sum is even', function() {
        assert.deepEqual([], op.fn(new Dice(3, 3)));
      });
      it('should not operate on single die', function() {
        assert.deepEqual([], op.fn(new Dice(1)));
      });
    });
  });
  describe('Get', function() {
    describe('G01 - Get same', function() {
      var op = operations.get[0];
      it('should cost 1', function() {
        assert.equal(1, op.cost);
      });
      it('should get same', function() {
        assert.deepEqual([new Dice(3, 3)], op.fn(new Dice(3)));
      });
      it('should not operate on two dice', function() {
        assert.deepEqual([], op.fn(new Dice(1, 2)));
      });
    });
    describe('G02 - Get turned upside down', function() {
      var op = operations.get[1];
      it('should cost 1', function() {
        assert.equal(1, op.cost);
      });
      it('should get turned upside down 1', function() {
        assert.deepEqual([new Dice(1, 6)], op.fn(new Dice(1)));
      });
      it('should get turned upside down 2', function() {
        assert.deepEqual([new Dice(2, 5)], op.fn(new Dice(2)));
      });
      it('should get turned upside down 3', function() {
        assert.deepEqual([new Dice(3, 4)], op.fn(new Dice(3)));
      });
      it('should get turned upside down 4', function() {
        assert.deepEqual([new Dice(4, 3)], op.fn(new Dice(4)));
      });
      it('should get turned upside down 5', function() {
        assert.deepEqual([new Dice(5, 2)], op.fn(new Dice(5)));
      });
      it('should get turned upside down 6', function() {
        assert.deepEqual([new Dice(6, 1)], op.fn(new Dice(6)));
      });
      it('should not operate on two dice', function() {
        assert.deepEqual([], op.fn(new Dice(1, 2)));
      });
    });
    describe('G03 - Get +1', function() {
      var op = operations.get[2];
      it('should cost 3', function() {
        assert.equal(3, op.cost);
      });
      it('should get 1 + 1', function() {
        assert.deepEqual([new Dice(1, 2)], op.fn(new Dice(1)));
      });
      it('should get 2 + 1', function() {
        assert.deepEqual([new Dice(2, 3)], op.fn(new Dice(2)));
      });
      it('should get 3 + 1', function() {
        assert.deepEqual([new Dice(3, 4)], op.fn(new Dice(3)));
      });
      it('should get 4 + 1', function() {
        assert.deepEqual([new Dice(4, 5)], op.fn(new Dice(4)));
      });
      it('should get 5 + 1', function() {
        assert.deepEqual([new Dice(5, 6)], op.fn(new Dice(5)));
      });
      it('should get 6 + 1', function() {
        assert.deepEqual([new Dice(6, 1)], op.fn(new Dice(6)));
      });
      it('should not operate on two dice', function() {
        assert.deepEqual([], op.fn(new Dice(1, 2)));
      });
    });
    describe('G04 - Get +2', function() {
      var op = operations.get[3];
      it('should cost 3', function() {
        assert.equal(3, op.cost);
      });
      it('should get 1 + 2', function() {
        assert.deepEqual([new Dice(1, 3)], op.fn(new Dice(1)));
      });
      it('should get 2 + 2', function() {
        assert.deepEqual([new Dice(2, 4)], op.fn(new Dice(2)));
      });
      it('should get 3 + 2', function() {
        assert.deepEqual([new Dice(3, 5)], op.fn(new Dice(3)));
      });
      it('should get 4 + 2', function() {
        assert.deepEqual([new Dice(4, 6)], op.fn(new Dice(4)));
      });
      it('should get 5 + 2', function() {
        assert.deepEqual([new Dice(5, 1)], op.fn(new Dice(5)));
      });
      it('should get 6 + 2', function() {
        assert.deepEqual([new Dice(6, 2)], op.fn(new Dice(6)));
      });
      it('should not operate on two dice', function() {
        assert.deepEqual([], op.fn(new Dice(1, 2)));
      });
    });
    describe('G05 - Get +3', function() {
      var op = operations.get[4];
      it('should cost 2', function() {
        assert.equal(2, op.cost);
      });
      it('should get 1 + 3', function() {
        assert.deepEqual([new Dice(1, 4)], op.fn(new Dice(1)));
      });
      it('should get 2 + 3', function() {
        assert.deepEqual([new Dice(2, 5)], op.fn(new Dice(2)));
      });
      it('should get 3 + 3', function() {
        assert.deepEqual([new Dice(3, 6)], op.fn(new Dice(3)));
      });
      it('should get 4 + 3', function() {
        assert.deepEqual([new Dice(4, 1)], op.fn(new Dice(4)));
      });
      it('should get 5 + 3', function() {
        assert.deepEqual([new Dice(5, 2)], op.fn(new Dice(5)));
      });
      it('should get 6 + 3', function() {
        assert.deepEqual([new Dice(6, 3)], op.fn(new Dice(6)));
      });
      it('should not operate on two dice', function() {
        assert.deepEqual([], op.fn(new Dice(1, 2)));
      });
    });
    describe('G06 - Get x2', function() {
      var op = operations.get[5];
      it('should cost 2', function() {
        assert.equal(2, op.cost);
      });
      it('should get 1 x 2', function() {
        assert.deepEqual([new Dice(1, 2)], op.fn(new Dice(1)));
      });
      it('should get 2 x 2', function() {
        assert.deepEqual([new Dice(2, 4)], op.fn(new Dice(2)));
      });
      it('should get 3 x 2', function() {
        assert.deepEqual([new Dice(3, 6)], op.fn(new Dice(3)));
      });
      it('should get 4 x 2', function() {
        assert.deepEqual([new Dice(4, 2)], op.fn(new Dice(4)));
      });
      it('should get 5 x 2', function() {
        assert.deepEqual([new Dice(5, 4)], op.fn(new Dice(5)));
      });
      it('should get 6 x 2', function() {
        assert.deepEqual([new Dice(6, 6)], op.fn(new Dice(6)));
      });
      it('should not operate on two dice', function() {
        assert.deepEqual([], op.fn(new Dice(1, 2)));
      });
    });
    describe('G07 - Get +1/-1', function() {
      var op = operations.get[6];
      it('should cost 5', function() {
        assert.equal(5, op.cost);
      });
      it('should get 1 +1/-1', function() {
        assert.deepEqual([new Dice(1, 2), new Dice(1, 6)], op.fn(new Dice(1)));
      });
      it('should get 2 +1/-1', function() {
        assert.deepEqual([new Dice(2, 3), new Dice(2, 1)], op.fn(new Dice(2)));
      });
      it('should get 3 +1/-1', function() {
        assert.deepEqual([new Dice(3, 4), new Dice(3, 2)], op.fn(new Dice(3)));
      });
      it('should get 4 +1/-1', function() {
        assert.deepEqual([new Dice(4, 5), new Dice(4, 3)], op.fn(new Dice(4)));
      });
      it('should get 5 +1/-1', function() {
        assert.deepEqual([new Dice(5, 6), new Dice(5, 4)], op.fn(new Dice(5)));
      });
      it('should get 6 +1/-1', function() {
        assert.deepEqual([new Dice(6, 1), new Dice(6, 5)], op.fn(new Dice(6)));
      });
      it('should not operate on two dice', function() {
        assert.deepEqual([], op.fn(new Dice(1, 2)));
      });
    });
    describe('G08 - Get +2/-2', function() {
      var op = operations.get[7];
      it('should cost 5', function() {
        assert.equal(5, op.cost);
      });
      it('should get 1 +2/-2', function() {
        assert.deepEqual([new Dice(1, 3), new Dice(1, 5)], op.fn(new Dice(1)));
      });
      it('should get 2 +2/-2', function() {
        assert.deepEqual([new Dice(2, 4), new Dice(2, 6)], op.fn(new Dice(2)));
      });
      it('should get 3 +2/-2', function() {
        assert.deepEqual([new Dice(3, 5), new Dice(3, 1)], op.fn(new Dice(3)));
      });
      it('should get 4 +2/-2', function() {
        assert.deepEqual([new Dice(4, 6), new Dice(4, 2)], op.fn(new Dice(4)));
      });
      it('should get 5 +2/-2', function() {
        assert.deepEqual([new Dice(5, 1), new Dice(5, 3)], op.fn(new Dice(5)));
      });
      it('should get 6 +2/-2', function() {
        assert.deepEqual([new Dice(6, 2), new Dice(6, 4)], op.fn(new Dice(6)));
      });
      it('should not operate on two dice', function() {
        assert.deepEqual([], op.fn(new Dice(1, 2)));
      });
    });
    describe('G09 - Get 4 if odd; 3 if even', function() {
      var op = operations.get[8];
      it('should cost 3', function() {
        assert.equal(3, op.cost);
      });
      it('should get 1, 4', function() {
        assert.deepEqual([new Dice(1, 4)], op.fn(new Dice(1)));
      });
      it('should get 2, 3', function() {
        assert.deepEqual([new Dice(2, 3)], op.fn(new Dice(2)));
      });
      it('should get 3, 4', function() {
        assert.deepEqual([new Dice(3, 4)], op.fn(new Dice(3)));
      });
      it('should get 4, 3', function() {
        assert.deepEqual([new Dice(4, 3)], op.fn(new Dice(4)));
      });
      it('should get 5, 4', function() {
        assert.deepEqual([new Dice(5, 4)], op.fn(new Dice(5)));
      });
      it('should get 6, 3', function() {
        assert.deepEqual([new Dice(6, 3)], op.fn(new Dice(6)));
      });
      it('should not operate on two dice', function() {
        assert.deepEqual([], op.fn(new Dice(1, 2)));
      });
    });
    describe('G10 - Get pos', function() {
      var seq = [[operations.remove[0]], [operations.change[1]]];
      var op = operations.get[9];
      it('should cost 0', function() {
        assert.equal(0, op.cost);
      });
      it('should get pos', function() {
        assert.deepEqual([new Dice(6, 3)], op.fn(new Dice(6), seq));
      });
      it('should not operate on two dice', function() {
        assert.deepEqual([], op.fn(new Dice(1, 2), seq));
      });
    });
    describe('G11 - Get 1', function() {
      var op = operations.get[10];
      it('should cost 5', function() {
        assert.equal(5, op.cost);
      });
      it('should get 1', function() {
        assert.deepEqual([new Dice(4, 1)], op.fn(new Dice(4)));
      });
      it('should not operate on two dice', function() {
        assert.deepEqual([], op.fn(new Dice(1, 2)));
      });
    });
    describe('G12 - Get 3', function() {
      var op = operations.get[11];
      it('should cost 5', function() {
        assert.equal(5, op.cost);
      });
      it('should get 3', function() {
        assert.deepEqual([new Dice(4, 3)], op.fn(new Dice(4)));
      });
      it('should not operate on two dice', function() {
        assert.deepEqual([], op.fn(new Dice(1, 2)));
      });
    });
    describe('G13 - Get 5', function() {
      var op = operations.get[12];
      it('should cost 5', function() {
        assert.equal(5, op.cost);
      });
      it('should get 5', function() {
        assert.deepEqual([new Dice(4, 5)], op.fn(new Dice(4)));
      });
      it('should not operate on two dice', function() {
        assert.deepEqual([], op.fn(new Dice(1, 2)));
      });
    });
    describe('G14 - Get 2 or 4 or 6', function() {
      var op = operations.get[13];
      it('should cost 10', function() {
        assert.equal(10, op.cost);
      });
      it('should get 2 or 4 or 6', function() {
        assert.deepEqual([new Dice(3, 2), new Dice(3, 4), new Dice(3, 6)],
                         op.fn(new Dice(3)));
      });
      it('should not operate on two dice', function() {
        assert.deepEqual([], op.fn(new Dice(1, 2)));
      });
    });
    describe('G15 - Get any', function() {
      var op = operations.get[14];
      it('should cost 20', function() {
        assert.equal(20, op.cost);
      });
      it('should get any', function() {
        assert.deepEqual([new Dice(3, 1), new Dice(3, 2), new Dice(3, 3),
                          new Dice(3, 4), new Dice(3, 5), new Dice(3, 6)],
                         op.fn(new Dice(3)));
      });
      it('should not operate on two dice', function() {
        assert.deepEqual([], op.fn(new Dice(1, 2)));
      });
    });
  });
  describe('Change', function() {
    describe('C01 - A die +2', function() {
      var op = operations.change[0];
      it('should cost 3', function() {
        assert.equal(3, op.cost);
      });
      it('should change single face +2', function() {
        assert.deepEqual([new Dice(5)], op.fn(new Dice(3)));
      });
      it('should create variants', function() {
        assert.deepEqual([new Dice(5, 2), new Dice(3, 4)], op.fn(new Dice(3, 2)));
      });
      it('should not create variants if faces equal', function() {
        assert.deepEqual([new Dice(5, 3)], op.fn(new Dice(3, 3)));
      });
    });
    describe('C02 - A die -1', function() {
      var op = operations.change[1];
      it('should cost 3', function() {
        assert.equal(3, op.cost);
      });
      it('should change single face -1', function() {
        assert.deepEqual([new Dice(2)], op.fn(new Dice(3)));
      });
      it('should create variants', function() {
        assert.deepEqual([new Dice(2, 2), new Dice(3, 1)], op.fn(new Dice(3, 2)));
      });
      it('should not create variants if faces equal', function() {
        assert.deepEqual([new Dice(2, 3)], op.fn(new Dice(3, 3)));
      });
    });
    describe('C03 - All dice +2', function() {
      var op = operations.change[2];
      it('should cost 2', function() {
        assert.equal(2, op.cost);
      });
      it('should change single face +2', function() {
        assert.deepEqual([new Dice(5)], op.fn(new Dice(3)));
      });
      it('should change all faces +2', function() {
        assert.deepEqual([new Dice(5, 4)], op.fn(new Dice(3, 2)));
      });
    });
    describe('C04 - All dice -1', function() {
      var op = operations.change[3];
      it('should cost 2', function() {
        assert.equal(2, op.cost);
      });
      it('should change single face -1', function() {
        assert.deepEqual([new Dice(2)], op.fn(new Dice(3)));
      });
      it('should change all faces -1', function() {
        assert.deepEqual([new Dice(2, 1)], op.fn(new Dice(3, 2)));
      });
    });
    describe('C05 - A die turned upside down', function() {
      var op = operations.change[4];
      it('should cost 1', function() {
        assert.equal(1, op.cost);
      });
      it('should change single face upside down', function() {
        assert.deepEqual([new Dice(4)], op.fn(new Dice(3)));
      });
      it('should create variants', function() {
        assert.deepEqual([new Dice(4, 2), new Dice(3, 5)], op.fn(new Dice(3, 2)));
      });
      it('should not create variants if faces equal', function() {
        assert.deepEqual([new Dice(4, 3)], op.fn(new Dice(3, 3)));
      });
    });
    describe('C06 - All dice turned upside down', function() {
      var op = operations.change[5];
      it('should cost 2', function() {
        assert.equal(2, op.cost);
      });
      it('should change single face upside down', function() {
        assert.deepEqual([new Dice(4)], op.fn(new Dice(3)));
      });
      it('should change all faces upside down', function() {
        assert.deepEqual([new Dice(4, 5)], op.fn(new Dice(3, 2)));
      });
    });
    describe('C07 - A die to 1', function() {
      var op = operations.change[6];
      it('should cost 10', function() {
        assert.equal(10, op.cost);
      });
      it('should change single face to 1', function() {
        assert.deepEqual([new Dice(1)], op.fn(new Dice(3)));
      });
      it('should create variants', function() {
        assert.deepEqual([new Dice(1, 2), new Dice(3, 1)], op.fn(new Dice(3, 2)));
      });
      it('should not create variants if faces equal', function() {
        assert.deepEqual([new Dice(1, 3)], op.fn(new Dice(3, 3)));
      });
    });
    describe('C08 - A die to 3', function() {
      var op = operations.change[7];
      it('should cost 10', function() {
        assert.equal(10, op.cost);
      });
      it('should change single face to 3', function() {
        assert.deepEqual([new Dice(3)], op.fn(new Dice(2)));
      });
      it('should create variants', function() {
        assert.deepEqual([new Dice(3, 2), new Dice(1, 3)], op.fn(new Dice(1, 2)));
      });
      it('should not create variants if faces equal', function() {
        assert.deepEqual([new Dice(3, 2)], op.fn(new Dice(2, 2)));
      });
    });
    describe('C09 - A die to 5', function() {
      var op = operations.change[8];
      it('should cost 10', function() {
        assert.equal(10, op.cost);
      });
      it('should change single face to 5', function() {
        assert.deepEqual([new Dice(5)], op.fn(new Dice(2)));
      });
      it('should create variants', function() {
        assert.deepEqual([new Dice(5, 2), new Dice(1, 5)], op.fn(new Dice(1, 2)));
      });
      it('should not create variants if faces equal', function() {
        assert.deepEqual([new Dice(5, 2)], op.fn(new Dice(2, 2)));
      });
    });
    describe('C10 - All dice to 2', function() {
      var op = operations.change[9];
      it('should cost 5', function() {
        assert.equal(5, op.cost);
      });
      it('should change single face to 2', function() {
        assert.deepEqual([new Dice(2)], op.fn(new Dice(3)));
      });
      it('should change all faces to 2', function() {
        assert.deepEqual([new Dice(2, 2)], op.fn(new Dice(3, 5)));
      });
    });
    describe('C11 - All dice to 4', function() {
      var op = operations.change[10];
      it('should cost 5', function() {
        assert.equal(5, op.cost);
      });
      it('should change single face to 4', function() {
        assert.deepEqual([new Dice(4)], op.fn(new Dice(3)));
      });
      it('should change all faces to 4', function() {
        assert.deepEqual([new Dice(4, 4)], op.fn(new Dice(3, 5)));
      });
    });
    describe('C12 - All dice to 6', function() {
      var op = operations.change[11];
      it('should cost 5', function() {
        assert.equal(5, op.cost);
      });
      it('should change single face to 6', function() {
        assert.deepEqual([new Dice(6)], op.fn(new Dice(3)));
      });
      it('should change all faces to 6', function() {
        assert.deepEqual([new Dice(6, 6)], op.fn(new Dice(3, 5)));
      });
    });
    describe('C13 - Repeat previous change', function() {
      var op = operations.change[12];
      it('should cost 0', function() {
        assert.equal(0, op.cost);
      });
      it('should repeat previous change', function() {
        assert.deepEqual([new Dice(6)], op.fn(new Dice(3), [[operations.change[11]]]));
      });
      it('should not repeat previous op if not change', function() {
        assert.deepEqual([], op.fn(new Dice(3), [[operations.get[11]]]));
      });
      it('should not repeat previous op if no previous op', function() {
        assert.deepEqual([], op.fn(new Dice(3), []));
      });
    });
    describe('C14 - Allocate +1/+1/+1', function() {
      var op = operations.change[13];
      it('should cost 5', function() {
        assert.equal(5, op.cost);
      });
      it('should change single face +3', function() {
        assert.deepEqual([new Dice(6)], op.fn(new Dice(3)));
      });
      it('should create variants', function() {
        assert.deepEqual([new Dice(6, 5), new Dice(5, 6),
                          new Dice(4, 1), new Dice(3, 2)],
                         op.fn(new Dice(3, 5)));
      });
      it('should note create variants if faces equal', function() {
        assert.deepEqual([new Dice(6, 3), new Dice(5, 4)], op.fn(new Dice(3, 3)));
      });
    });
    describe('C15 - Allocate -1/-1/-1', function() {
      var op = operations.change[14];
      it('should cost 5', function() {
        assert.equal(5, op.cost);
      });
      it('should change single face -3', function() {
        assert.deepEqual([new Dice(1)], op.fn(new Dice(4)));
      });
      it('should create variants', function() {
        assert.deepEqual([new Dice(6, 5), new Dice(1, 4),
                          new Dice(2, 3), new Dice(3, 2)],
                         op.fn(new Dice(3, 5)));
      });
      it('should note create variants if faces equal', function() {
        assert.deepEqual([new Dice(6, 3), new Dice(1, 2)], op.fn(new Dice(3, 3)));
      });
    });
  });
});

