import Square from './Square';

let charStart = 65;

export default class Board {
  constructor() {
    this.N = 10;
    this._initializeSquares();
  }

  _initializeSquares() {
    this.squares = Array.apply(0, Array(this.N)).map( (col, x) => {
      return Array.apply(0, Array(this.N)).map( (row, y) => {
        return new Square(this.squareNameFromCoords(x,y));
      } )
    } );
  }

  getSquare(name) {
    let [x, y] = this.squareCoordsFromName(name);
    return this.squares[x][y];
  }

  // Convert [0, 0] to 'A1'
  squareNameFromCoords(x, y) {
    return String.fromCharCode(charStart + x) + `${y + 1}`;
  }

  // Convert 'A1' to [0, 0]
  squareCoordsFromName(name) {
    let [, character, number] = name.match(/([A-Z]+)(\d+)/);
    return [character.charCodeAt(0) - charStart, number -1];
  }
}
