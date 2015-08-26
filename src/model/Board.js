import Square from './Square';
import Ship   from './Ship';

let CharStart = 65;
let MaxTriesPerShip = 10;
let MaxTotalTries   = 10;

export default class Board {
  constructor(...ships) {
    this.N = 10;
    this._initializeSquares();
    this.populate.apply(this, ships);
  }

  _initializeSquares() {
    this.squares = Array.apply(0, Array(this.N)).map( (col, x) => {
      return Array.apply(0, Array(this.N)).map( (row, y) => {
        return new Square(this.squareNameFromCoords(x,y));
      } )
    } );
  }

  reset() {
    this._initializeSquares();
    return true;
  }

  // TODO: Keep track of ships to perform this
  // operation in constant time.
  finished() {
    let finished = true;
    this.squares.forEach( col => {
      col.forEach( square => {
        if (square.ship && !square.ship.sunk) {
          finished = false;
        }
      });
    });

    return finished;
  }

  populate(...ships) {
    if (ships.length > 0) {
      let tries = 0;

      while (tries < MaxTotalTries) {
        let spaceForAll = true;

        ships.forEach( s => {
          spaceForAll = spaceForAll && this._allocateShip(s);
        } );

        if (spaceForAll) {
          return true;
        }
        // Try another configuration
        else {
          tries++;
          this.reset()
        }
      }

      // Unable to allocate all the ships
      this.reset();

      throw 'Unable to allocate all the ships';
    }
  }

  getSquare(name) {
    let [x, y] = this.squareCoordsFromName(name);

    if (this._validCoord(x) && this._validCoord(y)) {
      return this.squares[x][y];
    }

    throw 'Invalid coordinates';
  }

  validShot(name) {
    try {
      this.getSquare(name);
      return true;
    }
    catch(e) {
      return false;
    }
  }

  shot(name) {
    return this.getSquare(name).shot();
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

      if (this._validCoord(mX) && this._validCoord(mY)) {
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
          this.getSquare(n).available = false;
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
    return String.fromCharCode(CharStart + x) + `${y + 1}`;
  }

  // Convert 'A1' to [0, 0]
  squareCoordsFromName(name) {
    try {
      let [, character, number] = name.match(/([A-Za-z]+)(\d+)/);
      character = character.toUpperCase();
      return [character.charCodeAt(0) - CharStart, number -1];
    }
    catch(e) {
      throw "Invalid square name " + name;
    }
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

  // Put new ship of 'size' in a random available position.
  // Return false if it's unable to allocate the ship.
  // TODO: Improve heuristic. In this scenario 10x10 are fast, but
  // it's possible to improve the way ships are allocated
  // (ex: don't try to put ship(4) at 3< squares from border)
  _allocateShip(size) {
    let tries = 0;
    let avail = this._availableSquares();

    if ( avail.length > 0 ) {
      while (tries < MaxTriesPerShip) {
        let vert  = Math.random() > 0.5;
        let from  = avail[Math.floor(Math.random()*avail.length)].name;
        let check = this._checkSquares(from, size, vert);

        if (check) {
          let ship = new Ship(size);
          this.putShipAt(ship, from, vert);
          return true;
        }

        tries++;
      }
    }

    return false;
  }

  // Return an array of all available squares
  _availableSquares() {
    let available = new Array();

    this.squares.forEach( col => {
      col.forEach( square => {
        if (square.available) {
          available.push(square)
        }
      });
    });

    return available;
  }

  _validCoord(c) {
    return c >= 0 && c < this.N
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

      if (this._validCoord(currentX) && this._validCoord(currentY)) {
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
