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
