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

  hit(name) {
    let [x, y] = this.squareCoordsFromName(name);
    return this.squares[x][y].hit();
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

  // Try to put a ship from initial square in
  // horizontal/vertical direction.
  // Returns false if any square is unavailable
  putShipAt(ship, square, vertical=false) {
    let squares = this._checkSquares(square, ship.size, vertical);

    if (squares) {
      // Disable ship squares and adjacent ones
      squares.forEach( s => {
        s.ship = ship;
        s.available = false;
        this.neighbourSquares(s.name).forEach( n => {
          let [x, y] = this.squareCoordsFromName(n);
          this.squares[x][y].available = false;
        } );
      } );

      return true;
    }
    else {
      return false;
    }
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

  toString() {
    let string = '';

    this.squares.forEach( col => {
      col.forEach( square => {
        string += square.toString();
      });
      string += "\n";
    });

    return string.substring(0, string.length - 1);;
  }

  // Return an array of 'size' available squares in
  // horizontal/vertical direction.
  // Returns false if any square is unavailable
  _checkSquares(from, size, vertical=false) {
    let [x ,y] = this.squareCoordsFromName(from);
    let xDiff = vertical ? 1 : 0;
    let yDiff = vertical ? 0 : 1;
    let squares = new Array(size);

    // Check if all the squares are available
    for (let i=0; i < size; i++) {
      let currentX = x + xDiff * i;
      let currentY = y + yDiff * i;

      if (currentX >= 0 && currentX < this.N && currentY >= 0 && currentY < this.N) {
        let currentSquare = this.squares[currentX][currentY];

        if (currentSquare.available == true) {
          squares[i] = currentSquare;
        }
        else {
          return false;
        }
      }
      else {
        return false;
      }
    }

    return squares;
  }
}
