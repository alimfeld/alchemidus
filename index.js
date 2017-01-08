var Dice = require('./dice');
var operations= require('./operations');
var findCheapestSeq = require('./solver');

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

var rops = shuffle(operations.remove.slice());
var gops = shuffle(operations.get.slice());
var cops = shuffle(operations.change.slice());
var ops = rops.slice(0, 5).concat(gops.slice(0, 5)).concat(cops.slice(0, 5));

var clay = new Dice(randomFace(), randomFace());
var gold = [new Dice(randomFace()), new Dice(randomFace(), randomFace())];

console.log("Clay:")
console.info(clay);

console.log("\nIron/Gold:")
console.info(gold);

console.log("\nOperations:");
console.info(ops);

var result = findCheapestSeq([], 0, ops, clay, gold);

console.log("\nSolution:");
console.dir(result, { depth: null });
