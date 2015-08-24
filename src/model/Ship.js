export default class Ship {
  constructor(size) {
    this.size = size;
    this.sunk = false;
    this.remaining = size;
  }

  hit() {
    this.remaining--;

    if (this.remaining <= 0) {
      this.sunk = true;
    }
  }
}
