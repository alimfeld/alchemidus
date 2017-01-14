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
  }
}

module.exports = Game;
