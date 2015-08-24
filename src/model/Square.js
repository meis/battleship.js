export default class Square {
  constructor(name) {
    this.name = name;
    this._ship = undefined;
    this._available = true;
  }

  get ship()       { return this._ship }
  set ship(v)      { this._ship = v }
  get available()  { return this._available }
  set available(v) { this._available = v }
}
