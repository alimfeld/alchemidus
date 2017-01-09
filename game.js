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

function Game() {
  this.ops = ops();
  this.start = start();
  this.targets = targets();
  this.solution = findCheapestSeq([], 0, this.ops, this.start, this.targets);
}

module.exports = Game;
