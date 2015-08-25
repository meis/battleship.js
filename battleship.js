(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
'use strict';

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

var _modelBoard = require('./model/Board');

var _modelBoard2 = _interopRequireDefault(_modelBoard);

var b = new _modelBoard2['default']();
console.log(b.constructor.name);

},{"./model/Board":2}],2:[function(require,module,exports){
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
              _this2.reset();
            }
        };

        while (tries < MaxTotalTries) {
          var _ret = _loop();

          if (typeof _ret === 'object') return _ret.v;
        }

        // Unable to allocate all the ships
        this.reset();
        return false;
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
    key: 'hit',
    value: function hit(name) {
      var _squareCoordsFromName3 = this.squareCoordsFromName(name);

      var _squareCoordsFromName32 = _slicedToArray(_squareCoordsFromName3, 2);

      var x = _squareCoordsFromName32[0];
      var y = _squareCoordsFromName32[1];

      return this.squares[x][y].hit();
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

      while (tries < MaxTriesPerShip) {
        var vert = Math.random() > 0.5;
        var avail = this._availableSquares();
        var from = avail[Math.floor(Math.random() * avail.length)].name;
        var check = this._checkSquares(from, size, vert);

        if (check) {
          var ship = new _Ship2['default'](size);
          this.putShipAt(ship, from, vert);
          return true;
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

},{"./Ship":3,"./Square":4}],3:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Ship = (function () {
  function Ship(size) {
    _classCallCheck(this, Ship);

    this.size = size;
    this.sunk = false;
    this.remaining = size;
  }

  _createClass(Ship, [{
    key: "hit",
    value: function hit() {
      this.remaining--;

      if (this.remaining <= 0) {
        this.sunk = true;
      }
    }
  }]);

  return Ship;
})();

exports["default"] = Ship;
module.exports = exports["default"];

},{}],4:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, '__esModule', {
  value: true
});

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

var Square = (function () {
  function Square(name) {
    _classCallCheck(this, Square);

    this.name = name;
    this._ship = undefined;
    this._available = true;
    this._hit = false;
  }

  _createClass(Square, [{
    key: 'shot',
    value: function shot() {
      var result = { hit: false, sunk: false };
      // If the Square is already hit, return a miss
      if (!this._hit && this._ship) {
        this._hit = true;
        this._ship.hit();
        result.hit = true;
        result.sunk = this._ship.sunk;
      }

      return result;
    }
  }, {
    key: 'toString',
    value: function toString() {
      if (this._ship) {
        return this._hit ? 'X' : '#';
      } else {
        return '0';
      }
    }
  }, {
    key: 'ship',
    get: function get() {
      return this._ship;
    },
    set: function set(v) {
      this._ship = v;
    }
  }, {
    key: 'available',
    get: function get() {
      return this._available;
    },
    set: function set(v) {
      this._available = v;
    }
  }]);

  return Square;
})();

exports['default'] = Square;
module.exports = exports['default'];

},{}]},{},[1])
//# sourceMappingURL=data:application/json;charset:utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm5vZGVfbW9kdWxlcy9icm93c2VyaWZ5L25vZGVfbW9kdWxlcy9icm93c2VyLXBhY2svX3ByZWx1ZGUuanMiLCIvaG9tZS9tL3dvcmsvYmF0dGxlc2hpcC5qcy9zcmMvaW5kZXguanMiLCIvaG9tZS9tL3dvcmsvYmF0dGxlc2hpcC5qcy9zcmMvbW9kZWwvQm9hcmQuanMiLCIvaG9tZS9tL3dvcmsvYmF0dGxlc2hpcC5qcy9zcmMvbW9kZWwvU2hpcC5qcyIsIi9ob21lL20vd29yay9iYXR0bGVzaGlwLmpzL3NyYy9tb2RlbC9TcXVhcmUuanMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7Ozs7OzBCQ0FrQixlQUFlOzs7O0FBRWpDLElBQUksQ0FBQyxHQUFHLDZCQUFXLENBQUM7QUFDcEIsT0FBTyxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUMsV0FBVyxDQUFDLElBQUksQ0FBQyxDQUFDOzs7Ozs7Ozs7Ozs7Ozs7OztzQkNIYixVQUFVOzs7O29CQUNWLFFBQVE7Ozs7QUFFM0IsSUFBSSxTQUFTLEdBQUcsRUFBRSxDQUFDO0FBQ25CLElBQUksZUFBZSxHQUFHLEVBQUUsQ0FBQztBQUN6QixJQUFJLGFBQWEsR0FBSyxFQUFFLENBQUM7O0lBRUosS0FBSztBQUNiLFdBRFEsS0FBSyxHQUNGOzBCQURILEtBQUs7O0FBRXRCLFFBQUksQ0FBQyxDQUFDLEdBQUcsRUFBRSxDQUFDO0FBQ1osUUFBSSxDQUFDLGtCQUFrQixFQUFFLENBQUM7O3NDQUZiLEtBQUs7QUFBTCxXQUFLOzs7QUFHbEIsUUFBSSxDQUFDLFFBQVEsQ0FBQyxLQUFLLENBQUMsSUFBSSxFQUFFLEtBQUssQ0FBQyxDQUFDO0dBQ2xDOztlQUxrQixLQUFLOztXQU9OLDhCQUFHOzs7QUFDbkIsVUFBSSxDQUFDLE9BQU8sR0FBRyxLQUFLLENBQUMsS0FBSyxDQUFDLENBQUMsRUFBRSxLQUFLLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsR0FBRyxDQUFFLFVBQUMsR0FBRyxFQUFF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RUFBRSxLQUFLLEVBQUUsSUFBSSxFQUFFLEtBQUssRUFBRSxDQUFDOztBQUV6QyxVQUFJLENBQUMsSUFBSSxDQUFDLElBQUksSUFBSSxJQUFJLENBQUMsS0FBSyxFQUFFO0FBQzVCLFlBQUksQ0FBQyxJQUFJLEdBQUcsSUFBSSxDQUFDO0FBQ2pCLFlBQUksQ0FBQyxLQUFLLENBQUMsR0FBRyxFQUFFLENBQUE7QUFDaEIsY0FBTSxDQUFDLEdBQUcsR0FBRyxJQUFJLENBQUM7QUFDbEIsY0FBTSxDQUFDLElBQUksR0FBRyxJQUFJLENBQUMsS0FBSyxDQUFDLElBQUksQ0FBQztPQUMvQjs7QUFFRCxhQUFPLE1BQU0sQ0FBQztLQUNmOzs7V0FFTyxvQkFBRztBQUNULFVBQUssSUFBSSxDQUFDLEtBQUssRUFBRztBQUNoQixlQUFPLElBQUksQ0FBQyxJQUFJLEdBQUcsR0FBRyxHQUFHLEdBQUcsQ0FBQztPQUM5QixNQUNJO0FBQ0gsZUFBTyxHQUFHLENBQUM7T0FDWjtLQUNGOzs7U0F6Qk8sZUFBUztBQUFFLGFBQU8sSUFBSSxDQUFDLEtBQUssQ0FBQTtLQUFFO1NBQzlCLGFBQUMsQ0FBQyxFQUFPO0FBQUUsVUFBSSxDQUFDLEtBQUssR0FBRyxDQUFDLENBQUE7S0FBRTs7O1NBQ3RCLGVBQUk7QUFBRSxhQUFPLElBQUksQ0FBQyxVQUFVLENBQUE7S0FBRTtTQUM5QixhQUFDLENBQUMsRUFBRTtBQUFFLFVBQUksQ0FBQyxVQUFVLEdBQUcsQ0FBQyxDQUFBO0tBQUU7OztTQVhyQixNQUFNOzs7cUJBQU4sTUFBTSIsImZpbGUiOiJnZW5lcmF0ZWQuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlc0NvbnRlbnQiOlsiKGZ1bmN0aW9uIGUodCxuLHIpe2Z1bmN0aW9uIHMobyx1KXtpZighbltvXSl7aWYoIXRbb10pe3ZhciBhPXR5cGVvZiByZXF1aXJlPT1cImZ1bmN0aW9uXCImJnJlcXVpcmU7aWYoIXUmJmEpcmV0dXJuIGEobywhMCk7aWYoaSlyZXR1cm4gaShvLCEwKTt2YXIgZj1uZXcgRXJyb3IoXCJDYW5ub3QgZmluZCBtb2R1bGUgJ1wiK28rXCInXCIpO3Rocm93IGYuY29kZT1cIk1PRFVMRV9OT1RfRk9VTkRcIixmfXZhciBsPW5bb109e2V4cG9ydHM6e319O3Rbb11bMF0uY2FsbChsLmV4cG9ydHMsZnVuY3Rpb24oZSl7dmFyIG49dFtvXVsxXVtlXTtyZXR1cm4gcyhuP246ZSl9LGwsbC5leHBvcnRzLGUsdCxuLHIpfXJldHVybiBuW29dLmV4cG9ydHN9dmFyIGk9dHlwZW9mIHJlcXVpcmU9PVwiZnVuY3Rpb25cIiYmcmVxdWlyZTtmb3IodmFyIG89MDtvPHIubGVuZ3RoO28rKylzKHJbb10pO3JldHVybiBzfSkiLCJpbXBvcnQgQm9hcmQgZnJvbSAnLi9tb2RlbC9Cb2FyZCc7XG5cbmxldCBiID0gbmV3IEJvYXJkKCk7XG5jb25zb2xlLmxvZyhiLmNvbnN0cnVjdG9yLm5hbWUpO1xuIiwiaW1wb3J0IFNxdWFyZSBmcm9tICcuL1NxdWFyZSc7XG5pbXBvcnQgU2hpcCAgIGZyb20gJy4vU2hpcCc7XG5cbmxldCBDaGFyU3RhcnQgPSA2NTtcbmxldCBNYXhUcmllc1BlclNoaXAgPSAxMDtcbmxldCBNYXhUb3RhbFRyaWVzICAgPSAxMDtcblxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgQm9hcmQge1xuICBjb25zdHJ1Y3RvciguLi5zaGlwcykge1xuICAgIHRoaXMuTiA9IDEwO1xuICAgIHRoaXMuX2luaXRpYWxpemVTcXVhcmVzKCk7XG4gICAgdGhpcy5wb3B1bGF0ZS5hcHBseSh0aGlzLCBzaGlwcyk7XG4gIH1cblxuICBfaW5pdGlhbGl6ZVNxdWFyZXMoKSB7XG4gICAgdGhpcy5zcXVhcmVzID0gQXJyYXkuYXBwbHkoMCwgQXJyYXkodGhpcy5OKSkubWFwKCAoY29sLCB4KSA9PiB7XG4gICAgICByZXR1cm4gQXJyYXkuYXBwbHkoMCwgQXJyYXkodGhpcy5OKSkubWFwKCAocm93LCB5KSA9PiB7XG4gICAgICAgIHJldHVybiBuZXcgU3F1YXJlKHRoaXMuc3F1YXJlTmFtZUZyb21Db29yZHMoeCx5KSk7XG4gICAgICB9IClcbiAgICB9ICk7XG4gIH1cblxuICByZXNldCgpIHtcbiAgICB0aGlzLl9pbml0aWFsaXplU3F1YXJlcygpO1xuICAgIHJldHVybiB0cnVlO1xuICB9XG5cbiAgcG9wdWxhdGUoLi4uc2hpcHMpIHtcbiAgICBpZiAoc2hpcHMubGVuZ3RoID4gMCkge1xuICAgICAgbGV0IHRyaWVzID0gMDtcblxuICAgICAgd2hpbGUgKHRyaWVzIDwgTWF4VG90YWxUcmllcykge1xuICAgICAgICBsZXQgc3BhY2VGb3JBbGwgPSB0cnVlO1xuXG4gICAgICAgIHNoaXBzLmZvckVhY2goIHMgPT4ge1xuICAgICAgICAgIHNwYWNlRm9yQWxsID0gc3BhY2VGb3JBbGwgJiYgdGhpcy5fYWxsb2NhdGVTaGlwKHMpO1xuICAgICAgICB9ICk7XG5cbiAgICAgICAgaWYgKHNwYWNlRm9yQWxsKSB7XG4gICAgICAgICAgcmV0dXJuIHRydWU7XG4gICAgICAgIH1cbiAgICAgICAgLy8gVHJ5IGFub3RoZXIgY29uZmlndXJhdGlvblxuICAgICAgICBlbHNlIHtcbiAgICAgICAgICB0aGlzLnJlc2V0KClcbiAgICAgICAgfVxuICAgICAgfVxuXG4gICAgICAvLyBVbmFibGUgdG8gYWxsb2NhdGUgYWxsIHRoZSBzaGlwc1xuICAgICAgdGhpcy5yZXNldCgpO1xuICAgICAgcmV0dXJuIGZhbHNlO1xuICAgIH1cbiAgfVxuXG4gIGdldFNxdWFyZShuYW1lKSB7XG4gICAgbGV0IFt4LCB5XSA9IHRoaXMuc3F1YXJlQ29vcmRzRnJvbU5hbWUobmFtZSk7XG4gICAgcmV0dXJuIHRoaXMuc3F1YXJlc1t4XVt5XTtcbiAgfVxuXG4gIGhpdChuYW1lKSB7XG4gICAgbGV0IFt4LCB5XSA9IHRoaXMuc3F1YXJlQ29vcmRzRnJvbU5hbWUobmFtZSk7XG4gICAgcmV0dXJuIHRoaXMuc3F1YXJlc1t4XVt5XS5oaXQoKTtcbiAgfVxuXG4gIG5laWdoYm91clNxdWFyZXMobmFtZSkge1xuICAgIGxldCBbeCwgeV0gPSB0aGlzLnNxdWFyZUNvb3Jkc0Zyb21OYW1lKG5hbWUpO1xuXG4gICAgbGV0IG5laWdoYm91cnMgPSBuZXcgU2V0KCk7XG4gICAgbGV0IG1vdmVtZW50cyAgPSBbXG4gICAgICBbLTEsLTFdLCBbLTEsIDBdLCBbLTEsIDFdLFxuICAgICAgWyAwLC0xXSAgICAgICAgICwgWyAwLCAxXSxcbiAgICAgIFsgMSwtMV0sIFsgMSwgMF0sIFsgMSwgMV0sXG4gICAgXTtcblxuICAgIC8vIFRyeSBhbGwgcG9zc2libGUgbW92ZW1lbnRzIGFuZCBhZGQgdGhlbSB0b1xuICAgIC8vIHRoZSBTZXQgaWYgYXJlIHdpdGhpbiB0aGUgdmFsaWQgdmFsdWVzXG4gICAgbW92ZW1lbnRzLmZvckVhY2goIG0gPT4ge1xuICAgICAgbGV0IG1YID0geCArIG1bMF07XG4gICAgICBsZXQgbVkgPSB5ICsgbVsxXTtcblxuICAgICAgaWYgKG1YID49IDAgJiYgbVggPCB0aGlzLk4gJiYgbVkgPj0gMCAmJiBtWSA8IHRoaXMuTikge1xuICAgICAgICBuZWlnaGJvdXJzLmFkZCh0aGlzLnNxdWFyZU5hbWVGcm9tQ29vcmRzKG1YLCBtWSkpO1xuICAgICAgfVxuICAgIH0gKTtcblxuICAgIHJldHVybiBuZWlnaGJvdXJzO1xuICB9XG5cbiAgLy8gVHJ5IHRvIHB1dCBhIHNoaXAgZnJvbSBpbml0aWFsIHNxdWFyZSBpblxuICAvLyBob3Jpem9udGFsL3ZlcnRpY2FsIGRpcmVjdGlvbi5cbiAgLy8gUmV0dXJucyBmYWxzZSBpZiBhbnkgc3F1YXJlIGlzIHVuYXZhaWxhYmxlXG4gIHB1dFNoaXBBdChzaGlwLCBzcXVhcmUsIHZlcnRpY2FsPWZhbHNlKSB7XG4gICAgbGV0IHNxdWFyZXMgPSB0aGlzLl9jaGVja1NxdWFyZXMoc3F1YXJlLCBzaGlwLnNpemUsIHZlcnRpY2FsKTtcblxuICAgIGlmIChzcXVhcmVzKSB7XG4gICAgICAvLyBEaXNhYmxlIHNoaXAgc3F1YXJlcyBhbmQgYWRqYWNlbnQgb25lc1xuICAgICAgc3F1YXJlcy5mb3JFYWNoKCBzID0+IHtcbiAgICAgICAgcy5zaGlwID0gc2hpcDtcbiAgICAgICAgcy5hdmFpbGFibGUgPSBmYWxzZTtcbiAgICAgICAgdGhpcy5uZWlnaGJvdXJTcXVhcmVzKHMubmFtZSkuZm9yRWFjaCggbiA9PiB7XG4gICAgICAgICAgbGV0IFt4LCB5XSA9IHRoaXMuc3F1YXJlQ29vcmRzRnJvbU5hbWUobik7XG4gICAgICAgICAgdGhpcy5zcXVhcmVzW3hdW3ldLmF2YWlsYWJsZSA9IGZhbHNlO1xuICAgICAgICB9ICk7XG4gICAgICB9ICk7XG5cbiAgICAgIHJldHVybiB0cnVlO1xuICAgIH1cbiAgICBlbHNlIHtcbiAgICAgIHJldHVybiBmYWxzZTtcbiAgICB9XG4gIH1cblxuICAvLyBDb252ZXJ0IFswLCAwXSB0byAnQTEnXG4gIHNxdWFyZU5hbWVGcm9tQ29vcmRzKHgsIHkpIHtcbiAgICByZXR1cm4gU3RyaW5nLmZyb21DaGFyQ29kZShDaGFyU3RhcnQgKyB4KSArIGAke3kgKyAxfWA7XG4gIH1cblxuICAvLyBDb252ZXJ0ICdBMScgdG8gWzAsIDBdXG4gIHNxdWFyZUNvb3Jkc0Zyb21OYW1lKG5hbWUpIHtcbiAgICBsZXQgWywgY2hhcmFjdGVyLCBudW1iZXJdID0gbmFtZS5tYXRjaCgvKFtBLVpdKykoXFxkKykvKTtcbiAgICByZXR1cm4gW2NoYXJhY3Rlci5jaGFyQ29kZUF0KDApIC0gQ2hhclN0YXJ0LCBudW1iZXIgLTFdO1xuICB9XG5cbiAgdG9TdHJpbmcoKSB7XG4gICAgbGV0IHN0cmluZyA9ICcnO1xuXG4gICAgdGhpcy5zcXVhcmVzLmZvckVhY2goIGNvbCA9PiB7XG4gICAgICBjb2wuZm9yRWFjaCggc3F1YXJlID0+IHtcbiAgICAgICAgc3RyaW5nICs9IHNxdWFyZS50b1N0cmluZygpO1xuICAgICAgfSk7XG4gICAgICBzdHJpbmcgKz0gXCJcXG5cIjtcbiAgICB9KTtcblxuICAgIHJldHVybiBzdHJpbmcuc3Vic3RyaW5nKDAsIHN0cmluZy5sZW5ndGggLSAxKTs7XG4gIH1cblxuICAvLyBQdXQgbmV3IHNoaXAgb2YgJ3NpemUnIGluIGEgcmFuZG9tIGF2YWlsYWJsZSBwb3NpdGlvbi5cbiAgLy8gUmV0dXJuIGZhbHNlIGlmIGl0J3MgdW5hYmxlIHRvIGFsbG9jYXRlIHRoZSBzaGlwLlxuICAvLyBUT0RPOiBJbXByb3ZlIGhldXJpc3RpYy4gSW4gdGhpcyBzY2VuYXJpbyAxMHgxMCBhcmUgZmFzdCwgYnV0XG4gIC8vIGl0J3MgcG9zc2libGUgdG8gaW1wcm92ZSB0aGUgd2F5IHNoaXBzIGFyZSBhbGxvY2F0ZWRcbiAgLy8gKGV4OiBkb24ndCB0cnkgdG8gcHV0IHNoaXAoNCkgYXQgMzwgc3F1YXJlcyBmcm9tIGJvcmRlcilcbiAgX2FsbG9jYXRlU2hpcChzaXplKSB7XG4gICAgbGV0IHRyaWVzID0gMDtcblxuICAgIHdoaWxlICh0cmllcyA8IE1heFRyaWVzUGVyU2hpcCkge1xuICAgICAgbGV0IHZlcnQgID0gTWF0aC5yYW5kb20oKSA+IDAuNTtcbiAgICAgIGxldCBhdmFpbCA9IHRoaXMuX2F2YWlsYWJsZVNxdWFyZXMoKTtcbiAgICAgIGxldCBmcm9tICA9IGF2YWlsW01hdGguZmxvb3IoTWF0aC5yYW5kb20oKSphdmFpbC5sZW5ndGgpXS5uYW1lO1xuICAgICAgbGV0IGNoZWNrID0gdGhpcy5fY2hlY2tTcXVhcmVzKGZyb20sIHNpemUsIHZlcnQpO1xuXG4gICAgICBpZiAoY2hlY2spIHtcbiAgICAgICAgbGV0IHNoaXAgPSBuZXcgU2hpcChzaXplKTtcbiAgICAgICAgdGhpcy5wdXRTaGlwQXQoc2hpcCwgZnJvbSwgdmVydCk7XG4gICAgICAgIHJldHVybiB0cnVlO1xuICAgICAgfVxuICAgIH1cblxuICAgIHJldHVybiBmYWxzZTtcbiAgfVxuXG4gIC8vIFJldHVybiBhbiBhcnJheSBvZiBhbGwgYXZhaWxhYmxlIHNxdWFyZXNcbiAgX2F2YWlsYWJsZVNxdWFyZXMoKSB7XG4gICAgbGV0IGF2YWlsYWJsZSA9IG5ldyBBcnJheSgpO1xuXG4gICAgdGhpcy5zcXVhcmVzLmZvckVhY2goIGNvbCA9PiB7XG4gICAgICBjb2wuZm9yRWFjaCggc3F1YXJlID0+IHtcbiAgICAgICAgaWYgKHNxdWFyZS5hdmFpbGFibGUpIHtcbiAgICAgICAgICBhdmFpbGFibGUucHVzaChzcXVhcmUpXG4gICAgICAgIH1cbiAgICAgIH0pO1xuICAgIH0pO1xuXG4gICAgcmV0dXJuIGF2YWlsYWJsZTtcbiAgfVxuXG4gIC8vIFJldHVybiBhbiBhcnJheSBvZiAnc2l6ZScgYXZhaWxhYmxlIHNxdWFyZXMgaW5cbiAgLy8gaG9yaXpvbnRhbC92ZXJ0aWNhbCBkaXJlY3Rpb24uXG4gIC8vIFJldHVybnMgZmFsc2UgaWYgYW55IHNxdWFyZSBpcyB1bmF2YWlsYWJsZVxuICBfY2hlY2tTcXVhcmVzKGZyb20sIHNpemUsIHZlcnRpY2FsPWZhbHNlKSB7XG4gICAgbGV0IFt4ICx5XSA9IHRoaXMuc3F1YXJlQ29vcmRzRnJvbU5hbWUoZnJvbSk7XG4gICAgbGV0IHhEaWZmID0gdmVydGljYWwgPyAxIDogMDtcbiAgICBsZXQgeURpZmYgPSB2ZXJ0aWNhbCA/IDAgOiAxO1xuICAgIGxldCBzcXVhcmVzID0gbmV3IEFycmF5KHNpemUpO1xuXG4gICAgLy8gQ2hlY2sgaWYgYWxsIHRoZSBzcXVhcmVzIGFyZSBhdmFpbGFibGVcbiAgICBmb3IgKGxldCBpPTA7IGkgPCBzaXplOyBpKyspIHtcbiAgICAgIGxldCBjdXJyZW50WCA9IHggKyB4RGlmZiAqIGk7XG4gICAgICBsZXQgY3VycmVudFkgPSB5ICsgeURpZmYgKiBpO1xuXG4gICAgICBpZiAoY3VycmVudFggPj0gMCAmJiBjdXJyZW50WCA8IHRoaXMuTiAmJiBjdXJyZW50WSA+PSAwICYmIGN1cnJlbnRZIDwgdGhpcy5OKSB7XG4gICAgICAgIGxldCBjdXJyZW50U3F1YXJlID0gdGhpcy5zcXVhcmVzW2N1cnJlbnRYXVtjdXJyZW50WV07XG5cbiAgICAgICAgaWYgKGN1cnJlbnRTcXVhcmUuYXZhaWxhYmxlID09IHRydWUpIHtcbiAgICAgICAgICBzcXVhcmVzW2ldID0gY3VycmVudFNxdWFyZTtcbiAgICAgICAgfVxuICAgICAgICBlbHNlIHtcbiAgICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICAgIGVsc2Uge1xuICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgICB9XG4gICAgfVxuXG4gICAgcmV0dXJuIHNxdWFyZXM7XG4gIH1cbn1cbiIsImV4cG9ydCBkZWZhdWx0IGNsYXNzIFNoaXAge1xuICBjb25zdHJ1Y3RvcihzaXplKSB7XG4gICAgdGhpcy5zaXplID0gc2l6ZTtcbiAgICB0aGlzLnN1bmsgPSBmYWxzZTtcbiAgICB0aGlzLnJlbWFpbmluZyA9IHNpemU7XG4gIH1cblxuICBoaXQoKSB7XG4gICAgdGhpcy5yZW1haW5pbmctLTtcblxuICAgIGlmICh0aGlzLnJlbWFpbmluZyA8PSAwKSB7XG4gICAgICB0aGlzLnN1bmsgPSB0cnVlO1xuICAgIH1cbiAgfVxufVxuIiwiZXhwb3J0IGRlZmF1bHQgY2xhc3MgU3F1YXJlIHtcbiAgY29uc3RydWN0b3IobmFtZSkge1xuICAgIHRoaXMubmFtZSAgICAgICA9IG5hbWU7XG4gICAgdGhpcy5fc2hpcCAgICAgID0gdW5kZWZpbmVkO1xuICAgIHRoaXMuX2F2YWlsYWJsZSA9IHRydWU7XG4gICAgdGhpcy5faGl0ICAgICAgID0gZmFsc2U7XG4gIH1cblxuICBnZXQgc2hpcCgpICAgICAgIHsgcmV0dXJuIHRoaXMuX3NoaXAgfVxuICBzZXQgc2hpcCh2KSAgICAgIHsgdGhpcy5fc2hpcCA9IHYgfVxuICBnZXQgYXZhaWxhYmxlKCkgIHsgcmV0dXJuIHRoaXMuX2F2YWlsYWJsZSB9XG4gIHNldCBhdmFpbGFibGUodikgeyB0aGlzLl9hdmFpbGFibGUgPSB2IH1cblxuICBzaG90KCkge1xuICAgIGxldCByZXN1bHQgPSB7IGhpdDogZmFsc2UsIHN1bms6IGZhbHNlIH07XG4gICAgLy8gSWYgdGhlIFNxdWFyZSBpcyBhbHJlYWR5IGhpdCwgcmV0dXJuIGEgbWlzc1xuICAgIGlmICghdGhpcy5faGl0ICYmIHRoaXMuX3NoaXApIHtcbiAgICAgIHRoaXMuX2hpdCA9IHRydWU7XG4gICAgICB0aGlzLl9zaGlwLmhpdCgpXG4gICAgICByZXN1bHQuaGl0ID0gdHJ1ZTtcbiAgICAgIHJlc3VsdC5zdW5rID0gdGhpcy5fc2hpcC5zdW5rO1xuICAgIH1cblxuICAgIHJldHVybiByZXN1bHQ7XG4gIH1cblxuICB0b1N0cmluZygpIHtcbiAgICBpZiAoIHRoaXMuX3NoaXAgKSB7XG4gICAgICByZXR1cm4gdGhpcy5faGl0ID8gJ1gnIDogJyMnO1xuICAgIH1cbiAgICBlbHNlIHtcbiAgICAgIHJldHVybiAnMCc7XG4gICAgfVxuICB9XG59XG4iXX0=
