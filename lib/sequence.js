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

  lastOperation() {
    return this.length ? this.transitions[this.length - 1].operation : undefined;
  }
}

module.exports = Sequence;
