var assert = require('assert');
var Dice = require('../lib/dice');
var Transition = require('../lib/transition');
var Sequence = require('../lib/sequence');
var operations = require('../lib/cards');

function d(face1, face2) {
  return new Dice(face1 || 3, face2);
}

function tr(operation, end) {
  return new Transition(operation, end);
}

function seq(start, transitions) {
  return new Sequence(start, transitions);
}

function assertTransitions(op, start, nexts, transitions) {
  assert.deepEqual(op.transitions(seq(start, transitions)),
                   nexts.map(next => tr(op, next)));
}

describe('Operations', function() {
  describe('Remove', function() {
    describe('R01 - Remove higher', function() {
      var op = operations.remove[0];
      it('should cost 2', function() {
        assert.equal(op.cost, 2);
      });
      it('should remove higher face 1', function() {
        assertTransitions(op, d(2, 1), [d(1)]);
      });
      it('should remove higher face 2', function() {
        assertTransitions(op, d(1, 3), [d(1)]);
      });
      it('should not operate on single die', function() {
        assertTransitions(op, d(1), []);
      });
    });
    describe('R02 - Remove lower', function() {
      var op = operations.remove[1];
      it('should cost 2', function() {
        assert.equal(op.cost, 2);
      });
      it('should remove lower face 1', function() {
        assertTransitions(op, d(1, 3), [d(3)]);
      });
      it('should remove lower face 2', function() {
        assertTransitions(op, d(3, 1), [d(3)]);
      });
      it('should not operate on single die', function() {
        assertTransitions(op, d(1), []);
      });
    });
    describe('R03 - Remove 1 or 3 or 5', function() {
      var op = operations.remove[2];
      it('should cost 3', function() {
        assert.equal(op.cost, 3);
      });
      it('should remove face 1 showing 1', function() {
        assertTransitions(op, d(1, 4), [d(4)]);
      });
      it('should remove face 1 showing 3', function() {
        assertTransitions(op, d(3, 4), [d(4)]);
      });
      it('should remove face 1 showing 5', function() {
        assertTransitions(op, d(5, 4), [d(4)]);
      });
      it('should remove face 2 showing 1', function() {
        assertTransitions(op, d(4, 1), [d(4)]);
      });
      it('should remove face 2 showing 3', function() {
        assertTransitions(op, d(4, 3), [d(4)]);
      });
      it('should remove face 2 showing 5', function() {
        assertTransitions(op, d(4, 5), [d(4)]);
      });
      it('should create variants if both faces odd', function() {
        assertTransitions(op, d(3, 5), [d(5), d(3)]);
      });
      it('should not create variants if both faces odd but equal', function() {
        assertTransitions(op, d(3, 3), [d(3)]);
      });
      it('should not operate on even faces', function() {
        assertTransitions(op, d(2, 4), []);
      });
      it('should not operate on single die', function() {
        assertTransitions(op, d(1), []);
      });
    });
    describe('R04 - Remove 2 or 4 or 6', function() {
      var op = operations.remove[3];
      it('should cost 3', function() {
        assert.equal(op.cost, 3);
      });
      it('should remove face 1 showing 2', function() {
        assertTransitions(op, d(2, 3), [d(3)]);
      });
      it('should remove face 1 showing 4', function() {
        assertTransitions(op, d(4, 3), [d(3)]);
      });
      it('should remove face 1 showing 6', function() {
        assertTransitions(op, d(6, 3), [d(3)]);
      });
      it('should remove face 2 showing 2', function() {
        assertTransitions(op, d(3, 2), [d(3)]);
      });
      it('should remove face 2 showing 4', function() {
        assertTransitions(op, d(3, 4), [d(3)]);
      });
      it('should remove face 2 showing 6', function() {
        assertTransitions(op, d(3, 6), [d(3)]);
      });
      it('should create variants if both faces even', function() {
        assertTransitions(op, d(4, 6), [d(6), d(4)]);
      });
      it('should not create variants if both faces even but equal', function() {
        assertTransitions(op, d(4, 4), [d(4)]);
      });
      it('should not operate on odd faces', function() {
        assertTransitions(op, d(1, 3), []);
      });
      it('should not operate on single die', function() {
        assertTransitions(op, d(1), []);
      });
    });
    describe('R05 - Remove 1 or 2 or 3', function() {
      var op = operations.remove[4];
      it('should cost 3', function() {
        assert.equal(op.cost, 3);
      });
      it('should remove face 1 showing 1', function() {
        assertTransitions(op, d(1, 4), [d(4)]);
      });
      it('should remove face 1 showing 2', function() {
        assertTransitions(op, d(2, 4), [d(4)]);
      });
      it('should remove face 1 showing 3', function() {
        assertTransitions(op, d(3, 4), [d(4)]);
      });
      it('should remove face 2 showing 1', function() {
        assertTransitions(op, d(4, 1), [d(4)]);
      });
      it('should remove face 2 showing 2', function() {
        assertTransitions(op, d(4, 2), [d(4)]);
      });
      it('should remove face 2 showing 3', function() {
        assertTransitions(op, d(4, 3), [d(4)]);
      });
      it('should create variants if both faces in 1..3', function() {
        assertTransitions(op, d(1, 3), [d(3), d(1)]);
      });
      it('should not create variants if both faces in 1..3 but equal', function() {
        assertTransitions(op, d(2, 2), [d(2)]);
      });
      it('should not operate on faces between 4..6', function() {
        assertTransitions(op, d(4, 5), []);
      });
      it('should not operate on single die', function() {
        assertTransitions(op, d(1), []);
      });
    });
    describe('R06 - Remove 4 or 5 or 6', function() {
      var op = operations.remove[5];
      it('should cost 3', function() {
        assert.equal(op.cost, 3);
      });
      it('should remove face 1 showing 4', function() {
        assertTransitions(op, d(4, 1), [d(1)]);
      });
      it('should remove face 1 showing 5', function() {
        assertTransitions(op, d(5, 1), [d(1)]);
      });
      it('should remove face 1 showing 6', function() {
        assertTransitions(op, d(6, 1), [d(1)]);
      });
      it('should remove face 2 showing 4', function() {
        assertTransitions(op, d(1, 4), [d(1)]);
      });
      it('should remove face 2 showing 5', function() {
        assertTransitions(op, d(1, 5), [d(1)]);
      });
      it('should remove face 2 showing 6', function() {
        assertTransitions(op, d(1, 6), [d(1)]);
      });
      it('should create variants if both faces in 4..6', function() {
        assertTransitions(op, d(4, 6), [d(6), d(4)]);
      });
      it('should not create variants if both faces in 4..6 but equal', function() {
        assertTransitions(op, d(5, 5), [d(5)]);
      });
      it('should not operate on faces between 1..3', function() {
        assertTransitions(op, d(2, 3), []);
      });
      it('should not operate on single die', function() {
        assertTransitions(op, d(1), []);
      });
    });
    describe('R07 - Remove face equal to op position', function() {
      var op = operations.remove[6];
      it('should cost 0', function() {
        assert.equal(op.cost, 0);
      });
      it('should remove face 1 showing pos', function() {
        assertTransitions(op, d(1, 2), [d(2)]);
      });
      it('should remove face 2 showing pos', function() {
        assertTransitions(op, d(2, 1), [d(2)]);
      });
      it('should not create variants if both faces showing pos', function() {
        assertTransitions(op, d(1, 1), [d(1)]);
      });
      it('should not operate on faces not showing pos', function() {
        assertTransitions(op, d(2, 3), []);
      });
      it('should not operate on single die', function() {
        assertTransitions(op, d(1), []);
      });
    });
    describe('R08 - Remove any', function() {
      var op = operations.remove[7];
      it('should cost 10', function() {
        assert.equal(op.cost, 10);
      });
      it('should create variants', function() {
        assertTransitions(op, d(1, 2), [d(1), d(2)]);
      });
      it('should not create variants if faces equal', function() {
        assertTransitions(op, d(2, 2), [d(2)]);
      });
      it('should not operate on single die', function() {
        assertTransitions(op, d(1), []);
      });
    });
    describe('R09 - Remove any if sum >= 7', function() {
      var op = operations.remove[8];
      it('should cost 1', function() {
        assert.equal(op.cost, 1);
      });
      it('should create variants if sum == 7', function() {
        assertTransitions(op, d(3, 4), [d(3), d(4)]);
      });
      it('should create variants if sum > 7', function() {
        assertTransitions(op, d(3, 5), [d(3), d(5)]);
      });
      it('should not create variants if faces equal', function() {
        assertTransitions(op, d(4, 4), [d(4)]);
      });
      it('should not operate if sum < 7', function() {
        assertTransitions(op, d(1, 5), []);
      });
      it('should not operate on single die', function() {
        assertTransitions(op, d(1), []);
      });
    });
    describe('R10 - Remove any if sum == 7', function() {
      var op = operations.remove[9];
      it('should cost 1', function() {
        assert.equal(op.cost, 1);
      });
      it('should create variants if sum == 7', function() {
        assertTransitions(op, d(3, 4), [d(3), d(4)]);
      });
      it('should not operate if sum < 7', function() {
        assertTransitions(op, d(1, 5), []);
      });
      it('should not operate if sum > 7', function() {
        assertTransitions(op, d(3, 5), []);
      });
      it('should not operate on single die', function() {
        assertTransitions(op, d(1), []);
      });
    });
    describe('R11 - Remove any if sum <= 7', function() {
      var op = operations.remove[10];
      it('should cost 2', function() {
        assert.equal(op.cost, 2);
      });
      it('should create variants if sum == 7', function() {
        assertTransitions(op, d(3, 4), [d(3), d(4)]);
      });
      it('should create variants if sum < 7', function() {
        assertTransitions(op, d(3, 2), [d(3), d(2)]);
      });
      it('should not create variants if faces equal', function() {
        assertTransitions(op, d(3, 3), [d(3)]);
      });
      it('should not operate if sum > 7', function() {
        assertTransitions(op, d(3, 5), []);
      });
      it('should not operate on single die', function() {
        assertTransitions(op, d(1), []);
      });
    });
    describe('R12 - Remove any if diff <= 2', function() {
      var op = operations.remove[11];
      it('should cost 1', function() {
        assert.equal(op.cost, 1);
      });
      it('should create variants if diff == 2', function() {
        assertTransitions(op, d(4, 6), [d(4), d(6)]);
      });
      it('should create variants if diff < 2', function() {
        assertTransitions(op, d(3, 2), [d(3), d(2)]);
      });
      it('should not create variants if faces equal', function() {
        assertTransitions(op, d(3, 3), [d(3)]);
      });
      it('should not operate if diff > 2', function() {
        assertTransitions(op, d(2, 5), []);
      });
      it('should not operate on single die', function() {
        assertTransitions(op, d(1), []);
      });
    });
    describe('R13 - Remove any if faces equal', function() {
      var op = operations.remove[12];
      it('should cost 1', function() {
        assert.equal(op.cost, 1);
      });
      it('should remove one if faces equal', function() {
        assertTransitions(op, d(3, 3), [d(3)]);
      });
      it('should not operate if faces not equal', function() {
        assertTransitions(op, d(2, 5), []);
      });
      it('should not operate on single die', function() {
        assertTransitions(op, d(1), []);
      });
    });
    describe('R14 - Remove any if sum is even', function() {
      var op = operations.remove[13];
      it('should cost 5', function() {
        assert.equal(op.cost, 5);
      });
      it('should create variants if sum is even', function() {
        assertTransitions(op, d(2, 4), [d(2), d(4)]);
      });
      it('should not create variants if faces equal', function() {
        assertTransitions(op, d(3, 3), [d(3)]);
      });
      it('should not operate if sum is odd', function() {
        assertTransitions(op, d(3, 4), []);
      });
      it('should not operate on single die', function() {
        assertTransitions(op, d(1), []);
      });
    });
    describe('R15 - Remove any if sum is odd', function() {
      var op = operations.remove[14];
      it('should cost 5', function() {
        assert.equal(op.cost, 5);
      });
      it('should create variants if sum is odd', function() {
        assertTransitions(op, d(3, 4), [d(3), d(4)]);
      });
      it('should not operate if sum is even', function() {
        assertTransitions(op, d(3, 3), []);
      });
      it('should not operate on single die', function() {
        assertTransitions(op, d(1), []);
      });
    });
  });
  describe('Get', function() {
    describe('G01 - Get same', function() {
      var op = operations.get[0];
      it('should cost 1', function() {
        assert.equal(op.cost, 1);
      });
      it('should get same', function() {
        assertTransitions(op, d(3), [d(3, 3)]);
      });
      it('should not operate on two dice', function() {
        assertTransitions(op, d(1, 2), []);
      });
    });
    describe('G02 - Get turned upside down', function() {
      var op = operations.get[1];
      it('should cost 1', function() {
        assert.equal(op.cost, 1);
      });
      it('should get turned upside down 1', function() {
        assertTransitions(op, d(1), [d(1, 6)]);
      });
      it('should get turned upside down 2', function() {
        assertTransitions(op, d(2), [d(2, 5)]);
      });
      it('should get turned upside down 3', function() {
        assertTransitions(op, d(3), [d(3, 4)]);
      });
      it('should get turned upside down 4', function() {
        assertTransitions(op, d(4), [d(4, 3)]);
      });
      it('should get turned upside down 5', function() {
        assertTransitions(op, d(5), [d(5, 2)]);
      });
      it('should get turned upside down 6', function() {
        assertTransitions(op, d(6), [d(6, 1)]);
      });
      it('should not operate on two dice', function() {
        assertTransitions(op, d(1, 2), []);
      });
    });
    describe('G03 - Get +1', function() {
      var op = operations.get[2];
      it('should cost 3', function() {
        assert.equal(op.cost, 3);
      });
      it('should get 1 + 1', function() {
        assertTransitions(op, d(1), [d(1, 2)]);
      });
      it('should get 2 + 1', function() {
        assertTransitions(op, d(2), [d(2, 3)]);
      });
      it('should get 3 + 1', function() {
        assertTransitions(op, d(3), [d(3, 4)]);
      });
      it('should get 4 + 1', function() {
        assertTransitions(op, d(4), [d(4, 5)]);
      });
      it('should get 5 + 1', function() {
        assertTransitions(op, d(5), [d(5, 6)]);
      });
      it('should get 6 + 1', function() {
        assertTransitions(op, d(6), [d(6, 1)]);
      });
      it('should not operate on two dice', function() {
        assertTransitions(op, d(1, 2), []);
      });
    });
    describe('G04 - Get +2', function() {
      var op = operations.get[3];
      it('should cost 3', function() {
        assert.equal(op.cost, 3);
      });
      it('should get 1 + 2', function() {
        assertTransitions(op, d(1), [d(1, 3)]);
      });
      it('should get 2 + 2', function() {
        assertTransitions(op, d(2), [d(2, 4)]);
      });
      it('should get 3 + 2', function() {
        assertTransitions(op, d(3), [d(3, 5)]);
      });
      it('should get 4 + 2', function() {
        assertTransitions(op, d(4), [d(4, 6)]);
      });
      it('should get 5 + 2', function() {
        assertTransitions(op, d(5), [d(5, 1)]);
      });
      it('should get 6 + 2', function() {
        assertTransitions(op, d(6), [d(6, 2)]);
      });
      it('should not operate on two dice', function() {
        assertTransitions(op, d(1, 2), []);
      });
    });
    describe('G05 - Get +3', function() {
      var op = operations.get[4];
      it('should cost 2', function() {
        assert.equal(op.cost, 2);
      });
      it('should get 1 + 3', function() {
        assertTransitions(op, d(1), [d(1, 4)]);
      });
      it('should get 2 + 3', function() {
        assertTransitions(op, d(2), [d(2, 5)]);
      });
      it('should get 3 + 3', function() {
        assertTransitions(op, d(3), [d(3, 6)]);
      });
      it('should get 4 + 3', function() {
        assertTransitions(op, d(4), [d(4, 1)]);
      });
      it('should get 5 + 3', function() {
        assertTransitions(op, d(5), [d(5, 2)]);
      });
      it('should get 6 + 3', function() {
        assertTransitions(op, d(6), [d(6, 3)]);
      });
      it('should not operate on two dice', function() {
        assertTransitions(op, d(1, 2), []);
      });
    });
    describe('G06 - Get x2', function() {
      var op = operations.get[5];
      it('should cost 2', function() {
        assert.equal(op.cost, 2);
      });
      it('should get 1 x 2', function() {
        assertTransitions(op, d(1), [d(1, 2)]);
      });
      it('should get 2 x 2', function() {
        assertTransitions(op, d(2), [d(2, 4)]);
      });
      it('should get 3 x 2', function() {
        assertTransitions(op, d(3), [d(3, 6)]);
      });
      it('should get 4 x 2', function() {
        assertTransitions(op, d(4), [d(4, 2)]);
      });
      it('should get 5 x 2', function() {
        assertTransitions(op, d(5), [d(5, 4)]);
      });
      it('should get 6 x 2', function() {
        assertTransitions(op, d(6), [d(6, 6)]);
      });
      it('should not operate on two dice', function() {
        assertTransitions(op, d(1, 2), []);
      });
    });
    describe('G07 - Get +1/-1', function() {
      var op = operations.get[6];
      it('should cost 5', function() {
        assert.equal(op.cost, 5);
      });
      it('should get 1 +1/-1', function() {
        assertTransitions(op, d(1), [d(1, 2), d(1, 6)]);
      });
      it('should get 2 +1/-1', function() {
        assertTransitions(op, d(2), [d(2, 3), d(2, 1)]);
      });
      it('should get 3 +1/-1', function() {
        assertTransitions(op, d(3), [d(3, 4), d(3, 2)]);
      });
      it('should get 4 +1/-1', function() {
        assertTransitions(op, d(4), [d(4, 5), d(4, 3)]);
      });
      it('should get 5 +1/-1', function() {
        assertTransitions(op, d(5), [d(5, 6), d(5, 4)]);
      });
      it('should get 6 +1/-1', function() {
        assertTransitions(op, d(6), [d(6, 1), d(6, 5)]);
      });
      it('should not operate on two dice', function() {
        assertTransitions(op, d(1, 2), []);
      });
    });
    describe('G08 - Get +2/-2', function() {
      var op = operations.get[7];
      it('should cost 5', function() {
        assert.equal(op.cost, 5);
      });
      it('should get 1 +2/-2', function() {
        assertTransitions(op, d(1), [d(1, 3), d(1, 5)]);
      });
      it('should get 2 +2/-2', function() {
        assertTransitions(op, d(2), [d(2, 4), d(2, 6)]);
      });
      it('should get 3 +2/-2', function() {
        assertTransitions(op, d(3), [d(3, 5), d(3, 1)]);
      });
      it('should get 4 +2/-2', function() {
        assertTransitions(op, d(4), [d(4, 6), d(4, 2)]);
      });
      it('should get 5 +2/-2', function() {
        assertTransitions(op, d(5), [d(5, 1), d(5, 3)]);
      });
      it('should get 6 +2/-2', function() {
        assertTransitions(op, d(6), [d(6, 2), d(6, 4)]);
      });
      it('should not operate on two dice', function() {
        assertTransitions(op, d(1, 2), []);
      });
    });
    describe('G09 - Get 4 if odd; 3 if even', function() {
      var op = operations.get[8];
      it('should cost 3', function() {
        assert.equal(op.cost, 3);
      });
      it('should get 1, 4', function() {
        assertTransitions(op, d(1), [d(1, 4)]);
      });
      it('should get 2, 3', function() {
        assertTransitions(op, d(2), [d(2, 3)]);
      });
      it('should get 3, 4', function() {
        assertTransitions(op, d(3), [d(3, 4)]);
      });
      it('should get 4, 3', function() {
        assertTransitions(op, d(4), [d(4, 3)]);
      });
      it('should get 5, 4', function() {
        assertTransitions(op, d(5), [d(5, 4)]);
      });
      it('should get 6, 3', function() {
        assertTransitions(op, d(6), [d(6, 3)]);
      });
      it('should not operate on two dice', function() {
        assertTransitions(op, d(1, 2), []);
      });
    });
    describe('G10 - Get pos', function() {
      var op = operations.get[9];
      it('should cost 0', function() {
        assert.equal(op.cost, 0);
      });
      it('should get pos', function() {
        assertTransitions(op, d(4), [d(4, 1)]);
      });
      it('should not operate on two dice', function() {
        assertTransitions(op, d(1, 2), []);
      });
    });
    describe('G11 - Get 1', function() {
      var op = operations.get[10];
      it('should cost 5', function() {
        assert.equal(op.cost, 5);
      });
      it('should get 1', function() {
        assertTransitions(op, d(4), [d(4, 1)]);
      });
      it('should not operate on two dice', function() {
        assertTransitions(op, d(1, 2), []);
      });
    });
    describe('G12 - Get 3', function() {
      var op = operations.get[11];
      it('should cost 5', function() {
        assert.equal(op.cost, 5);
      });
      it('should get 3', function() {
        assertTransitions(op, d(4), [d(4, 3)]);
      });
      it('should not operate on two dice', function() {
        assertTransitions(op, d(1, 2), []);
      });
    });
    describe('G13 - Get 5', function() {
      var op = operations.get[12];
      it('should cost 5', function() {
        assert.equal(op.cost, 5);
      });
      it('should get 5', function() {
        assertTransitions(op, d(4), [d(4, 5)]);
      });
      it('should not operate on two dice', function() {
        assertTransitions(op, d(1, 2), []);
      });
    });
    describe('G14 - Get 2 or 4 or 6', function() {
      var op = operations.get[13];
      it('should cost 10', function() {
        assert.equal(op.cost, 10);
      });
      it('should get 2 or 4 or 6', function() {
        assertTransitions(op, d(3), [d(3, 2), d(3, 4), d(3, 6)]);
      });
      it('should not operate on two dice', function() {
        assertTransitions(op, d(1, 2), []);
      });
    });
    describe('G15 - Get any', function() {
      var op = operations.get[14];
      it('should cost 20', function() {
        assert.equal(op.cost, 20);
      });
      it('should get any', function() {
        assertTransitions(op, d(3),
                          [d(3, 1), d(3, 2), d(3, 3), d(3, 4), d(3, 5), d(3, 6)]);
      });
      it('should not operate on two dice', function() {
        assertTransitions(op, d(1, 2), []);
      });
    });
  });
  describe('Change', function() {
    describe('C01 - A die +2', function() {
      var op = operations.change[0];
      it('should cost 3', function() {
        assert.equal(op.cost, 3);
      });
      it('should change single face +2', function() {
        assertTransitions(op, d(3), [d(5)]);
      });
      it('should create variants', function() {
        assertTransitions(op, d(3, 2), [d(5, 2), d(3, 4)]);
      });
      it('should not create variants if faces equal', function() {
        assertTransitions(op, d(3, 3), [d(5, 3)]);
      });
    });
    describe('C02 - A die -1', function() {
      var op = operations.change[1];
      it('should cost 3', function() {
        assert.equal(op.cost, 3);
      });
      it('should change single face -1', function() {
        assertTransitions(op, d(3), [d(2)]);
      });
      it('should create variants', function() {
        assertTransitions(op, d(3, 2), [d(2, 2), d(3, 1)]);
      });
      it('should not create variants if faces equal', function() {
        assertTransitions(op, d(3, 3), [d(2, 3)]);
      });
    });
    describe('C03 - All dice +2', function() {
      var op = operations.change[2];
      it('should cost 2', function() {
        assert.equal(op.cost, 2);
      });
      it('should change single face +2', function() {
        assertTransitions(op, d(3), [d(5)]);
      });
      it('should change all faces +2', function() {
        assertTransitions(op, d(3, 2), [d(5, 4)]);
      });
    });
    describe('C04 - All dice -1', function() {
      var op = operations.change[3];
      it('should cost 2', function() {
        assert.equal(op.cost, 2);
      });
      it('should change single face -1', function() {
        assertTransitions(op, d(3), [d(2)]);
      });
      it('should change all faces -1', function() {
        assertTransitions(op, d(3, 2), [d(2, 1)]);
      });
    });
    describe('C05 - A die turned upside down', function() {
      var op = operations.change[4];
      it('should cost 1', function() {
        assert.equal(op.cost, 1);
      });
      it('should change single face upside down', function() {
        assertTransitions(op, d(3), [d(4)]);
      });
      it('should create variants', function() {
        assertTransitions(op, d(3, 2), [d(4, 2), d(3, 5)]);
      });
      it('should not create variants if faces equal', function() {
        assertTransitions(op, d(3, 3), [d(4, 3)]);
      });
    });
    describe('C06 - All dice turned upside down', function() {
      var op = operations.change[5];
      it('should cost 2', function() {
        assert.equal(op.cost, 2);
      });
      it('should change single face upside down', function() {
        assertTransitions(op, d(3), [d(4)]);
      });
      it('should change all faces upside down', function() {
        assertTransitions(op, d(3, 2), [d(4, 5)]);
      });
    });
    describe('C07 - A die to 1', function() {
      var op = operations.change[6];
      it('should cost 10', function() {
        assert.equal(op.cost, 10);
      });
      it('should change single face to 1', function() {
        assertTransitions(op, d(3), [d(1)]);
      });
      it('should create variants', function() {
        assertTransitions(op, d(3, 2), [d(1, 2), d(3, 1)]);
      });
      it('should not create variants if faces equal', function() {
        assertTransitions(op, d(3, 3), [d(1, 3)]);
      });
    });
    describe('C08 - A die to 3', function() {
      var op = operations.change[7];
      it('should cost 10', function() {
        assert.equal(op.cost, 10);
      });
      it('should change single face to 3', function() {
        assertTransitions(op, d(2), [d(3)]);
      });
      it('should create variants', function() {
        assertTransitions(op, d(1, 2), [d(3, 2), d(1, 3)]);
      });
      it('should not create variants if faces equal', function() {
        assertTransitions(op, d(2, 2), [d(3, 2)]);
      });
    });
    describe('C09 - A die to 5', function() {
      var op = operations.change[8];
      it('should cost 10', function() {
        assert.equal(op.cost, 10);
      });
      it('should change single face to 5', function() {
        assertTransitions(op, d(2), [d(5)]);
      });
      it('should create variants', function() {
        assertTransitions(op, d(1, 2), [d(5, 2), d(1, 5)]);
      });
      it('should not create variants if faces equal', function() {
        assertTransitions(op, d(2, 2), [d(5, 2)]);
      });
    });
    describe('C10 - All dice to 2', function() {
      var op = operations.change[9];
      it('should cost 5', function() {
        assert.equal(op.cost, 5);
      });
      it('should change single face to 2', function() {
        assertTransitions(op, d(3), [d(2)]);
      });
      it('should change all faces to 2', function() {
        assertTransitions(op, d(3, 5), [d(2, 2)]);
      });
    });
    describe('C11 - All dice to 4', function() {
      var op = operations.change[10];
      it('should cost 5', function() {
        assert.equal(op.cost, 5);
      });
      it('should change single face to 4', function() {
        assertTransitions(op, d(3), [d(4)]);
      });
      it('should change all faces to 4', function() {
        assertTransitions(op, d(3, 5), [d(4, 4)]);
      });
    });
    describe('C12 - All dice to 6', function() {
      var op = operations.change[11];
      it('should cost 5', function() {
        assert.equal(op.cost, 5);
      });
      it('should change single face to 6', function() {
        assertTransitions(op, d(3), [d(6)]);
      });
      it('should change all faces to 6', function() {
        assertTransitions(op, d(3, 5), [d(6, 6)]);
      });
    });
    describe('C13 - Repeat previous change', function() {
      var op = operations.change[12];
      it('should cost 0', function() {
        assert.equal(op.cost, 0);
      });
      it('should repeat previous change', function() {
        assertTransitions(op, d(1), [d(5)], [tr(operations.change[0], d(3))]);
      });
      it('should not repeat previous op if not change', function() {
        assertTransitions(op, d(1), [], [tr(operations.get[0], d(1, 1))]);
      });
      it('should not repeat previous op if no previous op', function() {
        assertTransitions(op, d(3), []);
      });
    });
    describe('C14 - Allocate +1/+1/+1', function() {
      var op = operations.change[13];
      it('should cost 5', function() {
        assert.equal(op.cost, 5);
      });
      it('should change single face +3', function() {
        assertTransitions(op, d(3), [d(6)]);
      });
      it('should create variants', function() {
        assertTransitions(op, d(3, 5), [d(6, 5), d(5, 6), d(4, 1), d(3, 2)]);
      });
      it('should note create variants if faces equal', function() {
        assertTransitions(op, d(3, 3), [d(6, 3), d(5, 4)]);
      });
    });
    describe('C15 - Allocate -1/-1/-1', function() {
      var op = operations.change[14];
      it('should cost 5', function() {
        assert.equal(op.cost, 5);
      });
      it('should change single face -3', function() {
        assertTransitions(op, d(4), [d(1)]);
      });
      it('should create variants', function() {
        assertTransitions(op, d(3, 5), [d(6, 5), d(1, 4), d(2, 3), d(3, 2)]);
      });
      it('should note create variants if faces equal', function() {
        assertTransitions(op, d(3, 3), [d(6, 3), d(1, 2)]);
      });
    });
  });
});

