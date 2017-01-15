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
