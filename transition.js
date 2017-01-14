class Transition {
  constructor(operation, end) {
    this.operation = operation;
    this.end = end;
    this.cost = this.operation.cost;
  }

  endsIn(dice) {
    return this.end.equals(dice);
  }
}

module.exports = Transition;
