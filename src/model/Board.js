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

  neighbourSquares(name) {
    let [x, y] = this.squareCoordsFromName(name);

    let neighbours = new Set();
    let movements  = [
      [-1,-1], [-1, 0], [-1, 1],
      [ 0,-1]         , [ 0, 1],
      [ 1,-1], [ 1, 0], [ 1, 1],
    ];

    // Try all possible movements and add them to
    // the Set if are within the valid values
    movements.forEach( m => {
      let mX = x + m[0];
      let mY = y + m[1];

      if (mX >= 0 && mX < this.N && mY >= 0 && mY < this.N) {
        neighbours.add(this.squareNameFromCoords(mX, mY));
      }
    } );

    return neighbours;
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
