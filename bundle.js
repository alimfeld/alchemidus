(function(f){if(typeof exports==="object"&&typeof module!=="undefined"){module.exports=f()}else if(typeof define==="function"&&define.amd){define([],f)}else{var g;if(typeof window!=="undefined"){g=window}else if(typeof global!=="undefined"){g=global}else if(typeof self!=="undefined"){g=self}else{g=this}g.Game = f()}})(function(){var define,module,exports;return (function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
var Operation = require('./operation');
var Dice = require('./dice');

var operations = {
  remove: [
    // R01: Remove higher
    new Operation('R01', 'R', 2, (sequence) => {
      var dice = sequence.end;
      var next = [];
      if (dice.areTwo()) {
        next.push(new Dice(dice.lower()));
      }
      return next;
    }, "higher"),
    // R02: Remove lower
    new Operation('R02', 'R', 2, (sequence) => {
      var dice = sequence.end;
      var next = [];
      if (dice.areTwo()) {
        next.push(new Dice(dice.higher()));
      }
      return next;
    }, "lower"),
    // R03: Remove 1 or 3 or 5
    new Operation('R03', 'R', 3, (sequence) => {
      var dice = sequence.end;
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
    }, "&#x2680; / &#x2682; / &#x2684;"),
    // R04: Remove 2 or 4 or 6
    new Operation('R04', 'R', 3, (sequence) => {
      var dice = sequence.end;
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
    }, "&#x2681; / &#x2683; / &#x2685;"),
    // R05: Remove 1 or 2 or 3
    new Operation('R05', 'R', 3, (sequence) => {
      var dice = sequence.end;
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
    }, "&#x2680; / &#x2681; / &#x2682;"),
    // R06: Remove 4 or 5 or 6
    new Operation('R06', 'R', 3, (sequence) => {
      var dice = sequence.end;
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
    }, "&#x2683; / &#x2684; / &#x2685;"),
    // R07: Remove face equal to op position
    new Operation('R07', 'R', 0, (sequence) => {
      var dice = sequence.end;
      var pos = sequence.length + 1;
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
    }, "#"),
    // R08: Remove any
    new Operation('R08', 'R', 10, (sequence) => {
      var dice = sequence.end;
      var next = [];
      if (dice.areTwo()) {
        next.push(new Dice(dice.face1));
        if (!dice.facesEqual()) {
          next.push(new Dice(dice.face2));
        }
      }
      return next;
    }, "any"),
    // R09: Remove any if sum >= 7
    new Operation('R09', 'R', 1, (sequence) => {
      var dice = sequence.end;
      var next = [];
      if (dice.sum() >= 7) {
        next.push(new Dice(dice.face1));
        if (!dice.facesEqual()) {
          next.push(new Dice(dice.face2));
        }
      }
      return next;
    }, "any if &#x2211; &#x2265; 7"),
    // R10: Remove any if sum == 7
    new Operation('R10', 'R', 1, (sequence) => {
      var dice = sequence.end;
      var next = [];
      if (dice.sum() == 7) {
        next.push(new Dice(dice.face1));
        if (!dice.facesEqual()) {
          next.push(new Dice(dice.face2));
        }
      }
      return next;
    }, "any if &#x2211; = 7"),
    // R11: Remove any if sum <= 7
    new Operation('R11', 'R', 2, (sequence) => {
      var dice = sequence.end;
      var next = [];
      if (dice.areTwo() && dice.sum() <= 7) {
        next.push(new Dice(dice.face1));
        if (!dice.facesEqual()) {
          next.push(new Dice(dice.face2));
        }
      }
      return next;
    }, "any if &#x2211; &#x2264; 7"),
    // R12: Remove any if diff <= 2
    new Operation('R12', 'R', 1, (sequence) => {
      var dice = sequence.end;
      var next = [];
      if (dice.areTwo() && dice.diff() <= 2) {
        next.push(new Dice(dice.face1));
        if (!dice.facesEqual()) {
          next.push(new Dice(dice.face2));
        }
      }
      return next;
    }, "any if &#x2206; &#x2264; 2"),
    // R13: Remove any if faces equal
    new Operation('R13', 'R', 1, (sequence) => {
      var dice = sequence.end;
      var next = [];
      if (dice.areTwo() && dice.facesEqual()) {
        next.push(new Dice(dice.face1));
      }
      return next;
    }, "any if &#x2206; = 0"),
    // R14: Remove any if sum is even
    new Operation('R14', 'R', 5, (sequence) => {
      var dice = sequence.end;
      var next = [];
      if (dice.areTwo() && dice.sum() % 2 === 0) {
        next.push(new Dice(dice.face1));
        if (!dice.facesEqual()) {
          next.push(new Dice(dice.face2));
        }
      }
      return next;
    }, "any if &#x2211; even"),
    // R15: Remove any if sum is odd
    new Operation('R15', 'R', 5, (sequence) => {
      var dice = sequence.end;
      var next = [];
      if (dice.areTwo() && dice.sum() % 2 === 1) {
        next.push(new Dice(dice.face1));
        if (!dice.facesEqual()) {
          next.push(new Dice(dice.face2));
        }
      }
      return next;
    }, "any if &#x2211; odd")
  ],

  get: [
    // G01: Get same
    new Operation('G01', 'G', 1, (sequence) => {
      var dice = sequence.end;
      var next = [];
      if (dice.isOne()) {
        next.push(new Dice(dice.face1, dice.face1));
      }
      return next;
    }, "same"),
    // G02: Get turned upside down
    new Operation('G02', 'G', 1, (sequence) => {
      var dice = sequence.end;
      var next = [];
      if (dice.isOne()) {
        next.push(new Dice(dice.face1, Math.abs(7 - dice.face1)));
      }
      return next;
    }, "&#x21c5;"),
    // G03: Get +1
    new Operation('G03', 'G', 3, (sequence) => {
      var dice = sequence.end;
      var next = [];
      if (dice.isOne()) {
        next.push(new Dice(dice.face1, dice.face1 + 1));
      }
      return next;
    }, "+1"),
    // G04: Get +2
    new Operation('G04', 'G', 3, (sequence) => {
      var dice = sequence.end;
      var next = [];
      if (dice.isOne()) {
        next.push(new Dice(dice.face1, dice.face1 + 2));
      }
      return next;
    }, "+2"),
    // G05: Get +3
    new Operation('G05', 'G', 2, (sequence) => {
      var dice = sequence.end;
      var next = [];
      if (dice.isOne()) {
        next.push(new Dice(dice.face1, dice.face1 + 3));
      }
      return next;
    }, "+3"),
    // G06: Get x2
    new Operation('G06', 'G', 2, (sequence) => {
      var dice = sequence.end;
      var next = [];
      if (dice.isOne()) {
        next.push(new Dice(dice.face1, dice.face1 * 2));
      }
      return next;
    }, "x2"),
    // G07: Get +1/-1
    new Operation('G07', 'G', 5, (sequence) => {
      var dice = sequence.end;
      var next = [];
      if (dice.isOne()) {
        next.push(new Dice(dice.face1, dice.face1 + 1));
        next.push(new Dice(dice.face1, dice.face1 - 1));
      }
      return next;
    }, "+1 / -1"),
    // G08: Get +2/-2
    new Operation('G08', 'G', 5, (sequence) => {
      var dice = sequence.end;
      var next = [];
      if (dice.isOne()) {
        next.push(new Dice(dice.face1, dice.face1 + 2));
        next.push(new Dice(dice.face1, dice.face1 - 2));
      }
      return next;
    }, "+2 / -2"),
    // G09: Get 4 if odd; 3 if even
    new Operation('G09', 'G', 3, (sequence) => {
      var dice = sequence.end;
      var next = [];
      if (dice.isOne()) {
        next.push(new Dice(dice.face1, dice.face1 % 2 === 0 ? 3 : 4));
      }
      return next;
    }, "&#x2683; if odd / &#x2682; if even"),
    // G10: Get pos
    new Operation('G10', 'G', 0, (sequence) => {
      var dice = sequence.end;
      var pos = sequence.length + 1
      var next = [];
      if (dice.isOne()) {
        next.push(new Dice(dice.face1, pos));
      }
      return next;
    }, "#"),
    // G11: Get 1
    new Operation('G11', 'G', 5, (sequence) => {
      var dice = sequence.end;
      var next = [];
      if (dice.isOne()) {
        next.push(new Dice(dice.face1, 1));
      }
      return next;
    }, "&#x2680;"),
    // G12: Get 3
    new Operation('G12', 'G', 5, (sequence) => {
      var dice = sequence.end;
      var next = [];
      if (dice.isOne()) {
        next.push(new Dice(dice.face1, 3));
      }
      return next;
    }, "&#x2682;"),
    // G13: Get 5
    new Operation('G13', 'G', 5, (sequence) => {
      var dice = sequence.end;
      var next = [];
      if (dice.isOne()) {
        next.push(new Dice(dice.face1, 5));
      }
      return next;
    }, "&#x2684;"),
    // G14: Get 2 or 4 or 6
    new Operation('G14', 'G', 10, (sequence) => {
      var dice = sequence.end;
      var next = [];
      if (dice.isOne()) {
        next.push(new Dice(dice.face1, 2));
        next.push(new Dice(dice.face1, 4));
        next.push(new Dice(dice.face1, 6));
      }
      return next;
    }, "&#x2681; / &#x2683; / &#x2685;"),
    // G15: Get any
    new Operation('G15', 'G', 20, (sequence) => {
      var dice = sequence.end;
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
    }, "any")
  ],

  change: [
    // C01: A die +2
    new Operation('C01', 'C', 3, (sequence) => {
      var dice = sequence.end;
      var next = [];
      next.push(new Dice(dice.face1 + 2, dice.face2));
      if (dice.areTwo() && !dice.facesEqual()) {
        next.push(new Dice(dice.face1, dice.face2 + 2));
      }
      return next;
    }, "+2"),
    // C02: A die -1
    new Operation('C02', 'C', 3, (sequence) => {
      var dice = sequence.end;
      var next = [];
      next.push(new Dice(dice.face1 - 1, dice.face2));
      if (dice.areTwo() && !dice.facesEqual()) {
        next.push(new Dice(dice.face1, dice.face2 - 1));
      }
      return next;
    }, "-1"),
    // C03: All dice +2
    new Operation('C03', 'C', 2, (sequence) => {
      var dice = sequence.end;
      var next = [];
      if (dice.isOne()) {
        next.push(new Dice(dice.face1 + 2));
      } else {
        next.push(new Dice(dice.face1 + 2, dice.face2 + 2));
      }
      return next;
    }, "all +2"),
    // C04: All dice -1
    new Operation('C04', 'C', 2, (sequence) => {
      var dice = sequence.end;
      var next = [];
      if (dice.isOne()) {
        next.push(new Dice(dice.face1 - 1));
      } else {
        next.push(new Dice(dice.face1 - 1, dice.face2 - 1));
      }
      return next;
    }, "all -1"),
    // C05: A die turned upside down
    new Operation('C05', 'C', 1, (sequence) => {
      var dice = sequence.end;
      var next = [];
      next.push(new Dice(Math.abs(7 - dice.face1), dice.face2));
      if (dice.areTwo() && !dice.facesEqual()) {
        next.push(new Dice(dice.face1, Math.abs(7 - dice.face2)));
      }
      return next;
    }, "&#x21c5;"),
    // C06: All dice turned upside down
    new Operation('C06', 'C', 2, (sequence) => {
      var dice = sequence.end;
      var next = [];
      if (dice.isOne()) {
        next.push(new Dice(Math.abs(7 - dice.face1)));
      } else {
        next.push(new Dice(Math.abs(7 - dice.face1), Math.abs(7 - dice.face2)));
      }
      return next;
    }, "all &#x21c5;"),
    // C07: A die to 1
    new Operation('C07', 'C', 10, (sequence) => {
      var dice = sequence.end;
      var next = [];
      next.push(new Dice(1, dice.face2));
      if (dice.areTwo() && !dice.facesEqual()) {
        next.push(new Dice(dice.face1, 1));
      }
      return next;
    }, "&#x2680;"),
    // C08: A die to 3
    new Operation('C08', 'C', 10, (sequence) => {
      var dice = sequence.end;
      var next = [];
      next.push(new Dice(3, dice.face2));
      if (dice.areTwo() && !dice.facesEqual()) {
        next.push(new Dice(dice.face1, 3));
      }
      return next;
    }, "&#x2682;"),
    // C09: A die to 5
    new Operation('C09', 'C', 10, (sequence) => {
      var dice = sequence.end;
      var next = [];
      next.push(new Dice(5, dice.face2));
      if (dice.areTwo() && !dice.facesEqual()) {
        next.push(new Dice(dice.face1, 5));
      }
      return next;
    }, "&#x2684;"),
    // C10: All dice to 2
    new Operation('C10', 'C', 5, (sequence) => {
      var dice = sequence.end;
      var next = [];
      if (dice.isOne()) {
        next.push(new Dice(2));
      } else {
        next.push(new Dice(2, 2));
      }
      return next;
    }, "all &#x2681;"),
    // C11: All dice to 4
    new Operation('C11', 'C', 5, (sequence) => {
      var dice = sequence.end;
      var next = [];
      if (dice.isOne()) {
        next.push(new Dice(4));
      } else {
        next.push(new Dice(4, 4));
      }
      return next;
    }, "all &#x2683;"),
    // C12: All dice to 6
    new Operation('C12', 'C', 5, (sequence) => {
      var dice = sequence.end;
      var next = [];
      if (dice.isOne()) {
        next.push(new Dice(6));
      } else {
        next.push(new Dice(6, 6));
      }
      return next;
    }, "all &#x2685;"),
    // C13: Repeat previous change
    new Operation('C13', 'C', 0, (sequence) => {
      var dice = sequence.end;
      var op = sequence.lastOperation();
      if (op && op.type === 'C') {
        return op.fn(sequence);
      }
      return [];
    }, "Repeat"),
    // C14: Allocate +1/+1/+1
    new Operation('C14', 'C', 5, (sequence) => {
      var dice = sequence.end;
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
    }, "+1 . +1 . +1"),
    // C15: Allocate -1/-1/-1
    new Operation('C15', 'C', 5, (sequence) => {
      var dice = sequence.end;
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
    }, "-1 . -1 . -1")
  ]
};

module.exports = operations;

},{"./dice":2,"./operation":4}],2:[function(require,module,exports){
class Dice {
  constructor(face1, face2) {
    if (face1 === undefined) {
      throw new Error("Face 1 missing");
    }
    var face1mod6 = face1 % 6;
    this.face1 = face1mod6 <= 0 ? 6 + face1mod6 : face1mod6;
    if (face2 !== undefined) {
      var face2mod6 = face2 % 6;
      this.face2 = face2mod6 <= 0 ? 6 + face2mod6 : face2mod6;
    }
  }

  count() {
    return this.face2 ? 2 : 1;
  }

  sum() {
    return this.face1 + (this.face2 ? this.face2 : 0);
  }

  diff() {
    return Math.abs(this.face1 - (this.face2 ? this.face2 : 0));
  }

  areTwo() {
    return this.count() === 2;
  }

  isOne() {
    return this.count() === 1;
  }

  higher() {
    return this.face2 > this.face1 ? this.face2 : this.face1;
  }

  lower() {
    return this.face2 && this.face2 < this.face1 ? this.face2 : this.face1;
  }

  facesEqual() {
    return this.face1 === this.face2;
  }

  face1Shows(faceValues) {
    return faceValues.indexOf(this.face1) >= 0;
  }

  face2Shows(faceValues) {
    return faceValues.indexOf(this.face2) >= 0;
  }

  equals(that) {
    return (this.face1 === that.face1 && this.face2 === that.face2) ||
           (this.face1 === that.face2 && this.face2 === that.face1);
  }
}

module.exports = Dice;

},{}],3:[function(require,module,exports){
var Dice = require('./dice');
var Sequence = require('./sequence');
var operations = require('./cards');

function solve(sequence, operations, targets, best) {

  if (targets.length === 0) {
    // found solution
    return sequence;
  }

  var solution = best;

  // try all operations
  operations.forEach((operation) => {

    var cost = sequence.cost + operation.cost;
    if (solution && solution.cost < cost) {
      // operation will not produce cheaper solution
      return;
    }

    if (solution && solution.cost == cost) {
      // operation may produce solution with same cost
      if (solution.length <= sequence.length) {
        // operation will not produce shorter solution
        return;
      }
    }

    var transitions = operation.transitions(sequence);
    if (transitions.length === 0) {
      // operation is not applicable
      return;
    }

    var newOperations = operations.slice();
    newOperations.splice(newOperations.indexOf(operation), 1);

    transitions.forEach((transition) => {

      // update targets
      var newTargets = targets.slice();
      if (transition.endsIn(newTargets[0])) {
        newTargets.shift();
      }

      var newSequence = sequence.add(transition);

      solution = solve(newSequence, newOperations, newTargets, solution) || solution;
    });

  });

  return solution;
}

function randomFace() {
  return Math.floor((Math.random() * 6) + 1);
}

function shuffle(array) {
  var currentIndex = array.length, temporaryValue, randomIndex;

  // While there remain elements to shuffle...
  while (0 !== currentIndex) {

    // Pick a remaining element...
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex -= 1;

    // And swap it with the current element.
    temporaryValue = array[currentIndex];
    array[currentIndex] = array[randomIndex];
    array[randomIndex] = temporaryValue;
  }

  return array;
}

function ops() {
  return shuffle(operations.remove.slice()).slice(0, 5).
    concat(shuffle(operations.get.slice()).slice(0, 5)).
    concat(shuffle(operations.change.slice()).slice(0, 5));
}

function start() {
  return new Dice(randomFace(), randomFace());
}

function targets() {
  return [new Dice(randomFace()), new Dice(randomFace(), randomFace())];
}

class Game {
  constructor() {
    this.operations = ops();
    this.start = start();
    this.targets = targets();
    this.solution = solve(new Sequence(this.start), this.operations, this.targets);
    this.reset();
  }

  reset() {
    this.availableOperations = this.operations.slice();
    this.remainingTargets = this.targets.slice();
    this.solved = false;
    this.sequence = new Sequence(this.start);
    this.cost = 0;
  }

  isOperationAvailable(operation) {
    return this.availableOperations.indexOf(operation) >= 0;
  }

  addTransition(transition) {
    var index = this.availableOperations.indexOf(transition.operation);
    if (index < 0) {
      return false;
    }
    if (!transition.isValidFor(this.sequence)) {
      return false;
    }
    this.availableOperations.splice(index, 1);
    if (this.remainingTargets[0].equals(transition.end)) {
      this.remainingTargets.shift();
    }
    this.solved = this.remainingTargets.length === 0;
    this.sequence = this.sequence.add(transition);
    this.cost = this.sequence.cost;
    return true;
  }
}

module.exports = Game;

},{"./cards":1,"./dice":2,"./sequence":5}],4:[function(require,module,exports){
var Dice = require('./dice');
var Transition = require('./transition');

class Operation {
  constructor(id, type, cost, fn, description) {
    this.id = id;
    this.type = type;
    this.cost = cost;
    this.fn = fn;
    this.description = description;
  }

  transitions(sequence) {
    var ends = this.fn(sequence);
    return ends.map((end) => new Transition(this, end));
  }
}

module.exports = Operation;

},{"./dice":2,"./transition":6}],5:[function(require,module,exports){
class Sequence {
  constructor(start, transitions = []) {
    this.start = start;
    this.transitions = transitions || [];
    this.cost = transitions.reduce((cost, transition) => cost + transition.cost, 0);
    this.end = transitions.length ? transitions[transitions.length - 1].end : start;
    this.length = transitions.length;
  }

  add(transition) {
    return new Sequence(this.start, this.transitions.concat(transition));
  }

  lastTransition() {
    return this.length ? this.transitions[this.length - 1] : undefined;
  }

  lastOperation() {
    return this.length ? this.transitions[this.length - 1].operation : undefined;
  }
}

module.exports = Sequence;

},{}],6:[function(require,module,exports){
class Transition {
  constructor(operation, end) {
    this.operation = operation;
    this.end = end;
    this.cost = this.operation.cost;
  }

  isValidFor(sequence) {
    var valid = false;
    this.operation.transitions(sequence).forEach(tr => {
      if (tr.end.equals(this.end)) {
        valid = true;
        return;
      }
    });
    return valid;
  }

  endsIn(dice) {
    return this.end.equals(dice);
  }
}

module.exports = Transition;

},{}]},{},[3])(3)
});