export default class Square {
  constructor(name) {
    this.name       = name;
    this._ship      = undefined;
    this._available = true;
    this._hit       = false;
  }

  get ship()       { return this._ship }
  set ship(v)      { this._ship = v }
  get available()  { return this._available }
  set available(v) { this._available = v }

  shot() {
    let result = { hit: false, sunk: false };
    // If the Square is already hit, return a miss
    if (!this._hit && this._ship) {
      this._hit = true;
      this._ship.hit()
      result.hit = true;
      result.sunk = this._ship.sunk;
    }

    return result;
  }

  toString() {
    if ( this._ship ) {
      return this._hit ? 'X' : '#';
    }
    else {
      return '0';
    }
  }
}
