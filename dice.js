function Dice(face1, face2) {
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

Dice.prototype.count = function() {
  return this.face2 ? 2 : 1;
}

Dice.prototype.sum = function() {
  return this.face1 + (this.face2 ? this.face2 : 0);
}

Dice.prototype.diff = function() {
  return Math.abs(this.face1 - (this.face2 ? this.face2 : 0));
}

Dice.prototype.areTwo = function() {
  return this.count() === 2;
}

Dice.prototype.isOne = function() {
  return this.count() === 1;
}

Dice.prototype.higher = function() {
  return this.face2 > this.face1 ? this.face2 : this.face1;
}

Dice.prototype.lower = function() {
  return this.face2 && this.face2 < this.face1 ? this.face2 : this.face1;
}

Dice.prototype.facesEqual = function() {
  return this.face1 === this.face2;
}

Dice.prototype.face1Shows = function(faceValues) {
  return faceValues.indexOf(this.face1) >= 0;
}

Dice.prototype.face2Shows = function(faceValues) {
  return faceValues.indexOf(this.face2) >= 0;
}

Dice.prototype.equals = function(that) {
  return (this.face1 === that.face1 && this.face2 === that.face2) ||
         (this.face1 === that.face2 && this.face2 === that.face1);
}

module.exports = Dice;
