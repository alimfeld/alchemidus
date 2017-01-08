function findCheapestSeq(seq, cost, ops, dice, targets, cheapest) {

  if (targets.length === 0) {
    // found solution
    return [seq, cost];
  }

  var solution = undefined;
  var newCheapest = cheapest;

  // brute force try all ops
  for (var i = 0; i < ops.length; i++) {
    var op = ops[i];

    var newCost = cost + op.cost;
    if (newCheapest && newCost >= newCheapest) {
      // op will not produce cheaper solution
      continue;
    }

    var variants = op.fn(dice, seq);
    if (variants.length === 0) {
      // op is not applicable
      continue;
    }

    var newOps = ops.slice();
    newOps.splice(newOps.indexOf(op), 1);

    for (var j = 0; j < variants.length; j++) {
      var newDice = variants[j];

      // update targets
      var newTargets = targets.slice();
      if (newTargets[0].equals(newDice)) {
        newTargets.shift();
      }

      var newSeq = seq.slice();
      newSeq.push([op, newDice]);

      var result = findCheapestSeq(newSeq, newCost, newOps, newDice, newTargets, newCheapest);
      if (result[0]) {
        solution = result[0];
        newCheapest = result[1];
      }
    }
  }

  return [solution, newCheapest];
}

module.exports = findCheapestSeq;
