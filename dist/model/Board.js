'use strict';

Object.defineProperty(exports, '__esModule', {
  value: true
});

var _slicedToArray = (function () { function sliceIterator(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i['return']) _i['return'](); } finally { if (_d) throw _e; } } return _arr; } return function (arr, i) { if (Array.isArray(arr)) { return arr; } else if (Symbol.iterator in Object(arr)) { return sliceIterator(arr, i); } else { throw new TypeError('Invalid attempt to destructure non-iterable instance'); } }; })();

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

var _Square = require('./Square');

var _Square2 = _interopRequireDefault(_Square);

var _Ship = require('./Ship');

var _Ship2 = _interopRequireDefault(_Ship);

var CharStart = 65;
var MaxTriesPerShip = 10;
var MaxTotalTries = 10;

var Board = (function () {
  function Board() {
    _classCallCheck(this, Board);

    this.N = 10;
    this._initializeSquares();

    for (var _len = arguments.length, ships = Array(_len), _key = 0; _key < _len; _key++) {
      ships[_key] = arguments[_key];
    }

    this.populate.apply(this, ships);
  }

  _createClass(Board, [{
    key: '_initializeSquares',
    value: function _initializeSquares() {
      var _this = this;

      this.squares = Array.apply(0, Array(this.N)).map(function (col, x) {
        return Array.apply(0, Array(_this.N)).map(function (row, y) {
          return new _Square2['default'](_this.squareNameFromCoords(x, y));
        });
      });
    }
  }, {
    key: 'reset',
    value: function reset() {
      this._initializeSquares();
      return true;
    }

    // TODO: Keep track of ships to perform this
    // operation in constant time.
  }, {
    key: 'finished',
    value: function finished() {
      var finished = true;
      this.squares.forEach(function (col) {
        col.forEach(function (square) {
          if (square.ship && !square.ship.sunk) {
            finished = false;
          }
        });
      });

      return finished;
    }
  }, {
    key: 'populate',
    value: function populate() {
      var _this2 = this;

      for (var _len2 = arguments.length, ships = Array(_len2), _key2 = 0; _key2 < _len2; _key2++) {
        ships[_key2] = arguments[_key2];
      }

      if (ships.length > 0) {
        var tries = 0;

        var _loop = function () {
          var spaceForAll = true;

          ships.forEach(function (s) {
            spaceForAll = spaceForAll && _this2._allocateShip(s);
          });

          if (spaceForAll) {
            return {
              v: true
            };
          }
          // Try another configuration
          else {
              tries++;
              _this2.reset();
            }
        };

        while (tries < MaxTotalTries) {
          var _ret = _loop();

          if (typeof _ret === 'object') return _ret.v;
        }

        // Unable to allocate all the ships
        this.reset();

        throw 'Unable to allocate all the ships';
      }
    }
  }, {
    key: 'getSquare',
    value: function getSquare(name) {
      var _squareCoordsFromName = this.squareCoordsFromName(name);

      var _squareCoordsFromName2 = _slicedToArray(_squareCoordsFromName, 2);

      var x = _squareCoordsFromName2[0];
      var y = _squareCoordsFromName2[1];

      return this.squares[x][y];
    }
  }, {
    key: 'shot',
    value: function shot(name) {
      var _squareCoordsFromName3 = this.squareCoordsFromName(name);

      var _squareCoordsFromName32 = _slicedToArray(_squareCoordsFromName3, 2);

      var x = _squareCoordsFromName32[0];
      var y = _squareCoordsFromName32[1];

      return this.squares[x][y].shot();
    }
  }, {
    key: 'neighbourSquares',
    value: function neighbourSquares(name) {
      var _this3 = this;

      var _squareCoordsFromName4 = this.squareCoordsFromName(name);

      var _squareCoordsFromName42 = _slicedToArray(_squareCoordsFromName4, 2);

      var x = _squareCoordsFromName42[0];
      var y = _squareCoordsFromName42[1];

      var neighbours = new Set();
      var movements = [[-1, -1], [-1, 0], [-1, 1], [0, -1], [0, 1], [1, -1], [1, 0], [1, 1]];

      // Try all possible movements and add them to
      // the Set if are within the valid values
      movements.forEach(function (m) {
        var mX = x + m[0];
        var mY = y + m[1];

        if (mX >= 0 && mX < _this3.N && mY >= 0 && mY < _this3.N) {
          neighbours.add(_this3.squareNameFromCoords(mX, mY));
        }
      });

      return neighbours;
    }

    // Try to put a ship from initial square in
    // horizontal/vertical direction.
    // Returns false if any square is unavailable
  }, {
    key: 'putShipAt',
    value: function putShipAt(ship, square) {
      var _this4 = this;

      var vertical = arguments.length <= 2 || arguments[2] === undefined ? false : arguments[2];

      var squares = this._checkSquares(square, ship.size, vertical);

      if (squares) {
        // Disable ship squares and adjacent ones
        squares.forEach(function (s) {
          s.ship = ship;
          s.available = false;
          _this4.neighbourSquares(s.name).forEach(function (n) {
            var _squareCoordsFromName5 = _this4.squareCoordsFromName(n);

            var _squareCoordsFromName52 = _slicedToArray(_squareCoordsFromName5, 2);

            var x = _squareCoordsFromName52[0];
            var y = _squareCoordsFromName52[1];

            _this4.squares[x][y].available = false;
          });
        });

        return true;
      } else {
        return false;
      }
    }

    // Convert [0, 0] to 'A1'
  }, {
    key: 'squareNameFromCoords',
    value: function squareNameFromCoords(x, y) {
      return String.fromCharCode(CharStart + x) + ('' + (y + 1));
    }

    // Convert 'A1' to [0, 0]
  }, {
    key: 'squareCoordsFromName',
    value: function squareCoordsFromName(name) {
      var _name$match = name.match(/([A-Z]+)(\d+)/);

      var _name$match2 = _slicedToArray(_name$match, 3);

      var character = _name$match2[1];
      var number = _name$match2[2];

      return [character.charCodeAt(0) - CharStart, number - 1];
    }
  }, {
    key: 'toString',
    value: function toString() {
      var string = '';

      this.squares.forEach(function (col) {
        col.forEach(function (square) {
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
  }, {
    key: '_allocateShip',
    value: function _allocateShip(size) {
      var tries = 0;
      var avail = this._availableSquares();

      if (avail.length > 0) {
        while (tries < MaxTriesPerShip) {
          var vert = Math.random() > 0.5;
          var from = avail[Math.floor(Math.random() * avail.length)].name;
          var check = this._checkSquares(from, size, vert);

          if (check) {
            var ship = new _Ship2['default'](size);
            this.putShipAt(ship, from, vert);
            return true;
          }

          tries++;
        }
      }

      return false;
    }

    // Return an array of all available squares
  }, {
    key: '_availableSquares',
    value: function _availableSquares() {
      var available = new Array();

      this.squares.forEach(function (col) {
        col.forEach(function (square) {
          if (square.available) {
            available.push(square);
          }
        });
      });

      return available;
    }

    // Return an array of 'size' available squares in
    // horizontal/vertical direction.
    // Returns false if any square is unavailable
  }, {
    key: '_checkSquares',
    value: function _checkSquares(from, size) {
      var vertical = arguments.length <= 2 || arguments[2] === undefined ? false : arguments[2];

      var _squareCoordsFromName6 = this.squareCoordsFromName(from);

      var _squareCoordsFromName62 = _slicedToArray(_squareCoordsFromName6, 2);

      var x = _squareCoordsFromName62[0];
      var y = _squareCoordsFromName62[1];

      var xDiff = vertical ? 1 : 0;
      var yDiff = vertical ? 0 : 1;
      var squares = new Array(size);

      // Check if all the squares are available
      for (var i = 0; i < size; i++) {
        var currentX = x + xDiff * i;
        var currentY = y + yDiff * i;

        if (currentX >= 0 && currentX < this.N && currentY >= 0 && currentY < this.N) {
          var currentSquare = this.squares[currentX][currentY];

          if (currentSquare.available == true) {
            squares[i] = currentSquare;
          } else {
            return false;
          }
        } else {
          return false;
        }
      }

      return squares;
    }
  }]);

  return Board;
})();

exports['default'] = Board;
module.exports = exports['default'];