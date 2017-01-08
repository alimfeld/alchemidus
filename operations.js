var Dice = require('./dice');

var operations = {
  remove: [
    // R01: Remove higher
    {
      id: 'R01',
      type: 'R',
      cost: 2,
      fn: function(dice) {
        var next = [];
        if (dice.areTwo()) {
          next.push(new Dice(dice.lower()));
        }
        return next;
      }
    },
    // R02: Remove lower
    {
      id: 'R02',
      type: 'R',
      cost: 2,
      fn: function(dice) {
        var next = [];
        if (dice.areTwo()) {
          next.push(new Dice(dice.higher()));
        }
        return next;
      }
    },
    // R03: Remove 1 or 3 or 5
    {
      id: 'R03',
      type: 'R',
      cost: 3,
      fn: function(dice) {
        var next = [];
        if (dice.areTwo()) {
          if (dice.face1Shows([1, 3, 5])) {
            next.push(new Dice(dice.face2));
          }
          if (!dice.facesEqual() && dice.face2Shows([1, 3, 5])) {
            next.push(new Dice(dice.face1));
          }
        }
        return next;
      }
    },
    // R04: Remove 2 or 4 or 6
    {
      id: 'R04',
      type: 'R',
      cost: 3,
      fn: function(dice) {
        var next = [];
        if (dice.areTwo()) {
          if (dice.face1Shows([2, 4, 6])) {
            next.push(new Dice(dice.face2));
          }
          if (!dice.facesEqual() && dice.face2Shows([2, 4, 6])) {
            next.push(new Dice(dice.face1));
          }
        }
        return next;
      }
    },
    // R05: Remove 1 or 2 or 3
    {
      id: 'R05',
      type: 'R',
      cost: 3,
      fn: function(dice) {
        var next = [];
        if (dice.areTwo()) {
          if (dice.face1Shows([1, 2, 3])) {
            next.push(new Dice(dice.face2));
          }
          if (!dice.facesEqual() && dice.face2Shows([1, 2, 3])) {
            next.push(new Dice(dice.face1));
          }
        }
        return next;
      }
    },
    // R06: Remove 4 or 5 or 6
    {
      id: 'R06',
      type: 'R',
      cost: 3,
      fn: function(dice) {
        var next = [];
        if (dice.areTwo()) {
          if (dice.face1Shows([4, 5, 6])) {
            next.push(new Dice(dice.face2));
          }
          if (!dice.facesEqual() && dice.face2Shows([4, 5, 6])) {
            next.push(new Dice(dice.face1));
          }
        }
        return next;
      }
    },
    // R07: Remove face equal to op position
    {
      id: 'R07',
      type: 'R',
      cost: 0,
      fn: function(dice, seq) {
        var pos = seq.length + 1;
        var next = [];
        if (dice.areTwo()) {
          if (dice.face1Shows([pos])) {
            next.push(new Dice(dice.face2));
          }
          if (!dice.facesEqual() && dice.face2Shows([pos])) {
            next.push(new Dice(dice.face1));
          }
        }
        return next;
      }
    },
    // R08: Remove any
    {
      id: 'R08',
      type: 'R',
      cost: 10,
      fn: function(dice) {
        var next = [];
        if (dice.areTwo()) {
          next.push(new Dice(dice.face1));
          if (!dice.facesEqual()) {
            next.push(new Dice(dice.face2));
          }
        }
        return next;
      }
    },
    // R09: Remove any if sum >= 7
    {
      id: 'R09',
      type: 'R',
      cost: 1,
      fn: function(dice) {
        var next = [];
        if (dice.sum() >= 7) {
          next.push(new Dice(dice.face1));
          if (!dice.facesEqual()) {
            next.push(new Dice(dice.face2));
          }
        }
        return next;
      }
    },
    // R10: Remove any if sum == 7
    {
      id: 'R10',
      type: 'R',
      cost: 1,
      fn: function(dice) {
        var next = [];
        if (dice.sum() == 7) {
          next.push(new Dice(dice.face1));
          if (!dice.facesEqual()) {
            next.push(new Dice(dice.face2));
          }
        }
        return next;
      }
    },
    // R11: Remove any if sum <= 7
    {
      id: 'R11',
      type: 'R',
      cost: 2,
      fn: function(dice) {
        var next = [];
        if (dice.areTwo() && dice.sum() <= 7) {
          next.push(new Dice(dice.face1));
          if (!dice.facesEqual()) {
            next.push(new Dice(dice.face2));
          }
        }
        return next;
      }
    },
    // R12: Remove any if diff <= 2
    {
      id: 'R12',
      type: 'R',
      cost: 1,
      fn: function(dice) {
        var next = [];
        if (dice.areTwo() && dice.diff() <= 2) {
          next.push(new Dice(dice.face1));
          if (!dice.facesEqual()) {
            next.push(new Dice(dice.face2));
          }
        }
        return next;
      }
    },
    // R13: Remove any if faces equal
    {
      id: 'R13',
      type: 'R',
      cost: 1,
      fn: function(dice) {
        var next = [];
        if (dice.areTwo() && dice.facesEqual()) {
          next.push(new Dice(dice.face1));
        }
        return next;
      }
    },
    // R14: Remove any if sum is even
    {
      id: 'R14',
      type: 'R',
      cost: 5,
      fn: function(dice) {
        var next = [];
        if (dice.areTwo() && dice.sum() % 2 === 0) {
          next.push(new Dice(dice.face1));
          if (!dice.facesEqual()) {
            next.push(new Dice(dice.face2));
          }
        }
        return next;
      }
    },
    // R15: Remove any if sum is odd
    {
      id: 'R15',
      type: 'R',
      cost: 5,
      fn: function(dice) {
        var next = [];
        if (dice.areTwo() && dice.sum() % 2 === 1) {
          next.push(new Dice(dice.face1));
          if (!dice.facesEqual()) {
            next.push(new Dice(dice.face2));
          }
        }
        return next;
      }
    }
  ],

  get: [
    // G01: Get same
    {
      id: 'G01',
      type: 'G',
      cost: 1,
      fn: function(dice) {
        var next = [];
        if (dice.isOne()) {
          next.push(new Dice(dice.face1, dice.face1));
        }
        return next;
      }
    },
    // G02: Get turned upside down
    {
      id: 'G02',
      type: 'G',
      cost: 1,
      fn: function(dice) {
        var next = [];
        if (dice.isOne()) {
          next.push(new Dice(dice.face1, Math.abs(7 - dice.face1)));
        }
        return next;
      }
    },
    // G03: Get +1
    {
      id: 'G03',
      type: 'G',
      cost: 3,
      fn: function(dice) {
        var next = [];
        if (dice.isOne()) {
          next.push(new Dice(dice.face1, dice.face1 + 1));
        }
        return next;
      }
    },
    // G04: Get +2
    {
      id: 'G04',
      type: 'G',
      cost: 3,
      fn: function(dice) {
        var next = [];
        if (dice.isOne()) {
          next.push(new Dice(dice.face1, dice.face1 + 2));
        }
        return next;
      }
    },
    // G05: Get +3
    {
      id: 'G05',
      type: 'G',
      cost: 2,
      fn: function(dice) {
        var next = [];
        if (dice.isOne()) {
          next.push(new Dice(dice.face1, dice.face1 + 3));
        }
        return next;
      }
    },
    // G06: Get x2
    {
      id: 'G06',
      type: 'G',
      cost: 2,
      fn: function(dice) {
        var next = [];
        if (dice.isOne()) {
          next.push(new Dice(dice.face1, dice.face1 * 2));
        }
        return next;
      }
    },
    // G07: Get +1/-1
    {
      id: 'G07',
      type: 'G',
      cost: 5,
      fn: function(dice) {
        var next = [];
        if (dice.isOne()) {
          next.push(new Dice(dice.face1, dice.face1 + 1));
          next.push(new Dice(dice.face1, dice.face1 - 1));
        }
        return next;
      }
    },
    // G08: Get +2/-2
    {
      id: 'G08',
      type: 'G',
      cost: 5,
      fn: function(dice) {
        var next = [];
        if (dice.isOne()) {
          next.push(new Dice(dice.face1, dice.face1 + 2));
          next.push(new Dice(dice.face1, dice.face1 - 2));
        }
        return next;
      }
    },
    // G09: Get 4 if odd; 3 if even
    {
      id: 'G09',
      type: 'G',
      cost: 3,
      fn: function(dice) {
        var next = [];
        if (dice.isOne()) {
          next.push(new Dice(dice.face1, dice.face1 % 2 === 0 ? 3 : 4));
        }
        return next;
      }
    },
    // G10: Get pos
    {
      id: 'G10',
      type: 'G',
      cost: 0,
      fn: function(dice, seq) {
        var pos = seq.length + 1
        var next = [];
        if (dice.isOne()) {
          next.push(new Dice(dice.face1, pos));
        }
        return next;
      }
    },
    // G11: Get 1
    {
      id: 'G11',
      type: 'G',
      cost: 5,
      fn: function(dice) {
        var next = [];
        if (dice.isOne()) {
          next.push(new Dice(dice.face1, 1));
        }
        return next;
      }
    },
    // G12: Get 3
    {
      id: 'G12',
      type: 'G',
      cost: 5,
      fn: function(dice) {
        var next = [];
        if (dice.isOne()) {
          next.push(new Dice(dice.face1, 3));
        }
        return next;
      }
    },
    // G13: Get 5
    {
      id: 'G13',
      type: 'G',
      cost: 5,
      fn: function(dice) {
        var next = [];
        if (dice.isOne()) {
          next.push(new Dice(dice.face1, 5));
        }
        return next;
      }
    },
    // G14: Get 2 or 4 or 6
    {
      id: 'G14',
      type: 'G',
      cost: 10,
      fn: function(dice) {
        var next = [];
        if (dice.isOne()) {
          next.push(new Dice(dice.face1, 2));
          next.push(new Dice(dice.face1, 4));
          next.push(new Dice(dice.face1, 6));
        }
        return next;
      }
    },
    // G15: Get any
    {
      id: 'G15',
      type: 'G',
      cost: 20,
      fn: function(dice) {
        var next = [];
        if (dice.isOne()) {
          next.push(new Dice(dice.face1, 1));
          next.push(new Dice(dice.face1, 2));
          next.push(new Dice(dice.face1, 3));
          next.push(new Dice(dice.face1, 4));
          next.push(new Dice(dice.face1, 5));
          next.push(new Dice(dice.face1, 6));
        }
        return next;
      }
    }
  ],

  change: [
    // C01: A die +2
    {
      id: 'C01',
      type: 'C',
      cost: 3,
      fn: function(dice) {
        var next = [];
        next.push(new Dice(dice.face1 + 2, dice.face2));
        if (dice.areTwo() && !dice.facesEqual()) {
          next.push(new Dice(dice.face1, dice.face2 + 2));
        }
        return next;
      }
    },
    // C02: A die -1
    {
      id: 'C02',
      type: 'C',
      cost: 3,
      fn: function(dice) {
        var next = [];
        next.push(new Dice(dice.face1 - 1, dice.face2));
        if (dice.areTwo() && !dice.facesEqual()) {
          next.push(new Dice(dice.face1, dice.face2 - 1));
        }
        return next;
      }
    },
    // C03: All dice +2
    {
      id: 'C03',
      type: 'C',
      cost: 2,
      fn: function(dice) {
        var next = [];
        if (dice.isOne()) {
          next.push(new Dice(dice.face1 + 2));
        } else {
          next.push(new Dice(dice.face1 + 2, dice.face2 + 2));
        }
        return next;
      }
    },
    // C04: All dice -1
    {
      id: 'C04',
      type: 'C',
      cost: 2,
      fn: function(dice) {
        var next = [];
        if (dice.isOne()) {
          next.push(new Dice(dice.face1 - 1));
        } else {
          next.push(new Dice(dice.face1 - 1, dice.face2 - 1));
        }
        return next;
      }
    },
    // C05: A die turned upside down
    {
      id: 'C05',
      type: 'C',
      cost: 1,
      fn: function(dice) {
        var next = [];
        next.push(new Dice(Math.abs(7 - dice.face1), dice.face2));
        if (dice.areTwo() && !dice.facesEqual()) {
          next.push(new Dice(dice.face1, Math.abs(7 - dice.face2)));
        }
        return next;
      }
    },
    // C06: All dice turned upside down
    {
      id: 'C06',
      type: 'C',
      cost: 2,
      fn: function(dice) {
        var next = [];
        if (dice.isOne()) {
          next.push(new Dice(Math.abs(7 - dice.face1)));
        } else {
          next.push(new Dice(Math.abs(7 - dice.face1), Math.abs(7 - dice.face2)));
        }
        return next;
      }
    },
    // C07: A die to 1
    {
      id: 'C07',
      type: 'C',
      cost: 10,
      fn: function(dice) {
        var next = [];
        next.push(new Dice(1, dice.face2));
        if (dice.areTwo() && !dice.facesEqual()) {
          next.push(new Dice(dice.face1, 1));
        }
        return next;
      }
    },
    // C08: A die to 3
    {
      id: 'C08',
      type: 'C',
      cost: 10,
      fn: function(dice) {
        var next = [];
        next.push(new Dice(3, dice.face2));
        if (dice.areTwo() && !dice.facesEqual()) {
          next.push(new Dice(dice.face1, 3));
        }
        return next;
      }
    },
    // C09: A die to 5
    {
      id: 'C09',
      type: 'C',
      cost: 10,
      fn: function(dice) {
        var next = [];
        next.push(new Dice(5, dice.face2));
        if (dice.areTwo() && !dice.facesEqual()) {
          next.push(new Dice(dice.face1, 5));
        }
        return next;
      }
    },
    // C10: All dice to 2
    {
      id: 'C10',
      type: 'C',
      cost: 5,
      fn: function(dice) {
        var next = [];
        if (dice.isOne()) {
          next.push(new Dice(2));
        } else {
          next.push(new Dice(2, 2));
        }
        return next;
      }
    },
    // C11: All dice to 4
    {
      id: 'C11',
      type: 'C',
      cost: 5,
      fn: function(dice) {
        var next = [];
        if (dice.isOne()) {
          next.push(new Dice(4));
        } else {
          next.push(new Dice(4, 4));
        }
        return next;
      }
    },
    // C12: All dice to 6
    {
      id: 'C12',
      type: 'C',
      cost: 5,
      fn: function(dice) {
        var next = [];
        if (dice.isOne()) {
          next.push(new Dice(6));
        } else {
          next.push(new Dice(6, 6));
        }
        return next;
      }
    },
    // C13: Repeat previous change
    {
      id: 'C13',
      type: 'C',
      cost: 0,
      fn: function(dice, seq) {
        var op = seq.length ? seq[seq.length - 1][0] : undefined;
        if (op && op.type === 'C') {
          return op.fn(dice, seq);
        }
        return [];
      }
    },
    // C14: Allocate +1/+1/+1
    {
      id: 'C14',
      type: 'C',
      cost: 5,
      fn: function(dice) {
        var next = [];
        next.push(new Dice(dice.face1 + 3, dice.face2));
        if (dice.areTwo()) {
          next.push(new Dice(dice.face1 + 2, dice.face2 + 1));
          if (!dice.facesEqual()) {
            next.push(new Dice(dice.face1 + 1, dice.face2 + 2));
            next.push(new Dice(dice.face1, dice.face2 + 3));
          }
        }
        return next;
      }
    },
    // C15: Allocate -1/-1/-1
    {
      id: 'C15',
      type: 'C',
      cost: 5,
      fn: function(dice) {
        var next = [];
        next.push(new Dice(dice.face1 - 3, dice.face2));
        if (dice.areTwo()) {
          next.push(new Dice(dice.face1 - 2, dice.face2 - 1));
          if (!dice.facesEqual()) {
            next.push(new Dice(dice.face1 - 1, dice.face2 - 2));
            next.push(new Dice(dice.face1, dice.face2 - 3));
          }
        }
        return next;
      }
    }
  ]
};

module.exports = operations;
