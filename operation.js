var Dice = require('./dice');
var Transition = require('./transition');

class Operation {
  constructor(id, type, cost, fn) {
    this.id = id;
    this.type = type;
    this.cost = cost;
    this.fn = fn;
  }

  transitions(sequence) {
    var ends = this.fn(sequence);
    return ends.map((end) => new Transition(this, end));
  }
}

module.exports = Operation;
