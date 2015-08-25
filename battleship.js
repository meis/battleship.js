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
//# sourceMappingURL=data:application/json;charset:utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm5vZGVfbW9kdWxlcy9icm93c2VyaWZ5L25vZGVfbW9kdWxlcy9icm93c2VyLXBhY2svX3ByZWx1ZGUuanMiLCIvaG9tZS9tL3dvcmsvYmF0dGxlc2hpcC5qcy9zcmMvaW5kZXguanMiLCIvaG9tZS9tL3dvcmsvYmF0dGxlc2hpcC5qcy9zcmMvbW9kZWwvQm9hcmQuanMiLCIvaG9tZS9tL3dvcmsvYmF0dGxlc2hpcC5qcy9zcmMvbW9kZWwvU2hpcC5qcyIsIi9ob21lL20vd29yay9iYXR0bGVzaGlwLmpzL3NyYy9tb2RlbC9TcXVhcmUuanMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7Ozs7OzBCQ0FrQixlQUFlOzs7O0FBRWpDLElBQUksQ0FBQyxHQUFHLDZCQUFXLENBQUM7QUFDcEIsT0FBTyxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUMsV0FBVyxDQUFDLElBQUksQ0FBQyxDQUFDOzs7Ozs7Ozs7Ozs7Ozs7OztzQkNIYixVQUFVOzs7O29CQUNWLFFBQVE7Ozs7QUFFM0IsSUFBSSxTQUFTLEdBQUcsRUFBRSxDQUFDO0FBQ25CLElBQUksZUFBZSxHQUFHLEVBQUUsQ0FBQztBQUN6QixJQUFJLGFBQWEsR0FBSyxFQUFFLENBQUM7O0lBRUosS0FBSztBQUNiLFdBRFEsS0FBSyxHQUNGOzBCQURILEtBQUs7O0FBRXRCLFFBQUksQ0FBQyxDQUFDLEdBQUcsRUFBRSxDQUFDO0FBQ1osUUFBSSxDQUFDLGtCQUFrQixFQUFFLENBQUM7O3NDQUZiLEtBQUs7QUFBTCxXQUFLOzs7QUFHbEIsUUFBSSxDQUFDLFFBQVEsQ0FBQyxLQUFLLENBQUMsSUFBSSxFQUFFLEtBQUssQ0FBQyxDQUFDO0dBQ2xDOztlQUxrQixLQUFLOztXQU9OLDhCQUFHOzs7QUFDbkIsVUFBSSxDQUFDLE9BQU8sR0FBRyxLQUFLLENBQUMsS0FBSyxDQUFDLENBQUMsRUFBRSxLQUFLLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsR0FBRyxDQUFFLFVBQUMsR0FBRyxFQUFF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Q0FBQyxLQUFLLEdBQUcsQ0FBQyxDQUFBO0tBQUU7OztTQUN0QixlQUFJO0FBQUUsYUFBTyxJQUFJLENBQUMsVUFBVSxDQUFBO0tBQUU7U0FDOUIsYUFBQyxDQUFDLEVBQUU7QUFBRSxVQUFJLENBQUMsVUFBVSxHQUFHLENBQUMsQ0FBQTtLQUFFOzs7U0FYckIsTUFBTTs7O3FCQUFOLE1BQU0iLCJmaWxlIjoiZ2VuZXJhdGVkLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXNDb250ZW50IjpbIihmdW5jdGlvbiBlKHQsbixyKXtmdW5jdGlvbiBzKG8sdSl7aWYoIW5bb10pe2lmKCF0W29dKXt2YXIgYT10eXBlb2YgcmVxdWlyZT09XCJmdW5jdGlvblwiJiZyZXF1aXJlO2lmKCF1JiZhKXJldHVybiBhKG8sITApO2lmKGkpcmV0dXJuIGkobywhMCk7dmFyIGY9bmV3IEVycm9yKFwiQ2Fubm90IGZpbmQgbW9kdWxlICdcIitvK1wiJ1wiKTt0aHJvdyBmLmNvZGU9XCJNT0RVTEVfTk9UX0ZPVU5EXCIsZn12YXIgbD1uW29dPXtleHBvcnRzOnt9fTt0W29dWzBdLmNhbGwobC5leHBvcnRzLGZ1bmN0aW9uKGUpe3ZhciBuPXRbb11bMV1bZV07cmV0dXJuIHMobj9uOmUpfSxsLGwuZXhwb3J0cyxlLHQsbixyKX1yZXR1cm4gbltvXS5leHBvcnRzfXZhciBpPXR5cGVvZiByZXF1aXJlPT1cImZ1bmN0aW9uXCImJnJlcXVpcmU7Zm9yKHZhciBvPTA7bzxyLmxlbmd0aDtvKyspcyhyW29dKTtyZXR1cm4gc30pIiwiaW1wb3J0IEJvYXJkIGZyb20gJy4vbW9kZWwvQm9hcmQnO1xuXG5sZXQgYiA9IG5ldyBCb2FyZCgpO1xuY29uc29sZS5sb2coYi5jb25zdHJ1Y3Rvci5uYW1lKTtcbiIsImltcG9ydCBTcXVhcmUgZnJvbSAnLi9TcXVhcmUnO1xuaW1wb3J0IFNoaXAgICBmcm9tICcuL1NoaXAnO1xuXG5sZXQgQ2hhclN0YXJ0ID0gNjU7XG5sZXQgTWF4VHJpZXNQZXJTaGlwID0gMTA7XG5sZXQgTWF4VG90YWxUcmllcyAgID0gMTA7XG5cbmV4cG9ydCBkZWZhdWx0IGNsYXNzIEJvYXJkIHtcbiAgY29uc3RydWN0b3IoLi4uc2hpcHMpIHtcbiAgICB0aGlzLk4gPSAxMDtcbiAgICB0aGlzLl9pbml0aWFsaXplU3F1YXJlcygpO1xuICAgIHRoaXMucG9wdWxhdGUuYXBwbHkodGhpcywgc2hpcHMpO1xuICB9XG5cbiAgX2luaXRpYWxpemVTcXVhcmVzKCkge1xuICAgIHRoaXMuc3F1YXJlcyA9IEFycmF5LmFwcGx5KDAsIEFycmF5KHRoaXMuTikpLm1hcCggKGNvbCwgeCkgPT4ge1xuICAgICAgcmV0dXJuIEFycmF5LmFwcGx5KDAsIEFycmF5KHRoaXMuTikpLm1hcCggKHJvdywgeSkgPT4ge1xuICAgICAgICByZXR1cm4gbmV3IFNxdWFyZSh0aGlzLnNxdWFyZU5hbWVGcm9tQ29vcmRzKHgseSkpO1xuICAgICAgfSApXG4gICAgfSApO1xuICB9XG5cbiAgcmVzZXQoKSB7XG4gICAgdGhpcy5faW5pdGlhbGl6ZVNxdWFyZXMoKTtcbiAgICByZXR1cm4gdHJ1ZTtcbiAgfVxuXG4gIC8vIFRPRE86IEtlZXAgdHJhY2sgb2Ygc2hpcHMgdG8gcGVyZm9ybSB0aGlzXG4gIC8vIG9wZXJhdGlvbiBpbiBjb25zdGFudCB0aW1lLlxuICBmaW5pc2hlZCgpIHtcbiAgICBsZXQgZmluaXNoZWQgPSB0cnVlO1xuICAgIHRoaXMuc3F1YXJlcy5mb3JFYWNoKCBjb2wgPT4ge1xuICAgICAgY29sLmZvckVhY2goIHNxdWFyZSA9PiB7XG4gICAgICAgIGlmIChzcXVhcmUuc2hpcCAmJiAhc3F1YXJlLnNoaXAuc3Vuaykge1xuICAgICAgICAgIGZpbmlzaGVkID0gZmFsc2U7XG4gICAgICAgIH1cbiAgICAgIH0pO1xuICAgIH0pO1xuXG4gICAgcmV0dXJuIGZpbmlzaGVkO1xuICB9XG5cbiAgcG9wdWxhdGUoLi4uc2hpcHMpIHtcbiAgICBpZiAoc2hpcHMubGVuZ3RoID4gMCkge1xuICAgICAgbGV0IHRyaWVzID0gMDtcblxuICAgICAgd2hpbGUgKHRyaWVzIDwgTWF4VG90YWxUcmllcykge1xuICAgICAgICBsZXQgc3BhY2VGb3JBbGwgPSB0cnVlO1xuXG4gICAgICAgIHNoaXBzLmZvckVhY2goIHMgPT4ge1xuICAgICAgICAgIHNwYWNlRm9yQWxsID0gc3BhY2VGb3JBbGwgJiYgdGhpcy5fYWxsb2NhdGVTaGlwKHMpO1xuICAgICAgICB9ICk7XG5cbiAgICAgICAgaWYgKHNwYWNlRm9yQWxsKSB7XG4gICAgICAgICAgcmV0dXJuIHRydWU7XG4gICAgICAgIH1cbiAgICAgICAgLy8gVHJ5IGFub3RoZXIgY29uZmlndXJhdGlvblxuICAgICAgICBlbHNlIHtcbiAgICAgICAgICB0cmllcysrO1xuICAgICAgICAgIHRoaXMucmVzZXQoKVxuICAgICAgICB9XG4gICAgICB9XG5cbiAgICAgIC8vIFVuYWJsZSB0byBhbGxvY2F0ZSBhbGwgdGhlIHNoaXBzXG4gICAgICB0aGlzLnJlc2V0KCk7XG5cbiAgICAgIHRocm93ICdVbmFibGUgdG8gYWxsb2NhdGUgYWxsIHRoZSBzaGlwcyc7XG4gICAgfVxuICB9XG5cbiAgZ2V0U3F1YXJlKG5hbWUpIHtcbiAgICBsZXQgW3gsIHldID0gdGhpcy5zcXVhcmVDb29yZHNGcm9tTmFtZShuYW1lKTtcbiAgICByZXR1cm4gdGhpcy5zcXVhcmVzW3hdW3ldO1xuICB9XG5cbiAgc2hvdChuYW1lKSB7XG4gICAgbGV0IFt4LCB5XSA9IHRoaXMuc3F1YXJlQ29vcmRzRnJvbU5hbWUobmFtZSk7XG4gICAgcmV0dXJuIHRoaXMuc3F1YXJlc1t4XVt5XS5zaG90KCk7XG4gIH1cblxuICBuZWlnaGJvdXJTcXVhcmVzKG5hbWUpIHtcbiAgICBsZXQgW3gsIHldID0gdGhpcy5zcXVhcmVDb29yZHNGcm9tTmFtZShuYW1lKTtcblxuICAgIGxldCBuZWlnaGJvdXJzID0gbmV3IFNldCgpO1xuICAgIGxldCBtb3ZlbWVudHMgID0gW1xuICAgICAgWy0xLC0xXSwgWy0xLCAwXSwgWy0xLCAxXSxcbiAgICAgIFsgMCwtMV0gICAgICAgICAsIFsgMCwgMV0sXG4gICAgICBbIDEsLTFdLCBbIDEsIDBdLCBbIDEsIDFdLFxuICAgIF07XG5cbiAgICAvLyBUcnkgYWxsIHBvc3NpYmxlIG1vdmVtZW50cyBhbmQgYWRkIHRoZW0gdG9cbiAgICAvLyB0aGUgU2V0IGlmIGFyZSB3aXRoaW4gdGhlIHZhbGlkIHZhbHVlc1xuICAgIG1vdmVtZW50cy5mb3JFYWNoKCBtID0+IHtcbiAgICAgIGxldCBtWCA9IHggKyBtWzBdO1xuICAgICAgbGV0IG1ZID0geSArIG1bMV07XG5cbiAgICAgIGlmIChtWCA+PSAwICYmIG1YIDwgdGhpcy5OICYmIG1ZID49IDAgJiYgbVkgPCB0aGlzLk4pIHtcbiAgICAgICAgbmVpZ2hib3Vycy5hZGQodGhpcy5zcXVhcmVOYW1lRnJvbUNvb3JkcyhtWCwgbVkpKTtcbiAgICAgIH1cbiAgICB9ICk7XG5cbiAgICByZXR1cm4gbmVpZ2hib3VycztcbiAgfVxuXG4gIC8vIFRyeSB0byBwdXQgYSBzaGlwIGZyb20gaW5pdGlhbCBzcXVhcmUgaW5cbiAgLy8gaG9yaXpvbnRhbC92ZXJ0aWNhbCBkaXJlY3Rpb24uXG4gIC8vIFJldHVybnMgZmFsc2UgaWYgYW55IHNxdWFyZSBpcyB1bmF2YWlsYWJsZVxuICBwdXRTaGlwQXQoc2hpcCwgc3F1YXJlLCB2ZXJ0aWNhbD1mYWxzZSkge1xuICAgIGxldCBzcXVhcmVzID0gdGhpcy5fY2hlY2tTcXVhcmVzKHNxdWFyZSwgc2hpcC5zaXplLCB2ZXJ0aWNhbCk7XG5cbiAgICBpZiAoc3F1YXJlcykge1xuICAgICAgLy8gRGlzYWJsZSBzaGlwIHNxdWFyZXMgYW5kIGFkamFjZW50IG9uZXNcbiAgICAgIHNxdWFyZXMuZm9yRWFjaCggcyA9PiB7XG4gICAgICAgIHMuc2hpcCA9IHNoaXA7XG4gICAgICAgIHMuYXZhaWxhYmxlID0gZmFsc2U7XG4gICAgICAgIHRoaXMubmVpZ2hib3VyU3F1YXJlcyhzLm5hbWUpLmZvckVhY2goIG4gPT4ge1xuICAgICAgICAgIGxldCBbeCwgeV0gPSB0aGlzLnNxdWFyZUNvb3Jkc0Zyb21OYW1lKG4pO1xuICAgICAgICAgIHRoaXMuc3F1YXJlc1t4XVt5XS5hdmFpbGFibGUgPSBmYWxzZTtcbiAgICAgICAgfSApO1xuICAgICAgfSApO1xuXG4gICAgICByZXR1cm4gdHJ1ZTtcbiAgICB9XG4gICAgZWxzZSB7XG4gICAgICByZXR1cm4gZmFsc2U7XG4gICAgfVxuICB9XG5cbiAgLy8gQ29udmVydCBbMCwgMF0gdG8gJ0ExJ1xuICBzcXVhcmVOYW1lRnJvbUNvb3Jkcyh4LCB5KSB7XG4gICAgcmV0dXJuIFN0cmluZy5mcm9tQ2hhckNvZGUoQ2hhclN0YXJ0ICsgeCkgKyBgJHt5ICsgMX1gO1xuICB9XG5cbiAgLy8gQ29udmVydCAnQTEnIHRvIFswLCAwXVxuICBzcXVhcmVDb29yZHNGcm9tTmFtZShuYW1lKSB7XG4gICAgbGV0IFssIGNoYXJhY3RlciwgbnVtYmVyXSA9IG5hbWUubWF0Y2goLyhbQS1aXSspKFxcZCspLyk7XG4gICAgcmV0dXJuIFtjaGFyYWN0ZXIuY2hhckNvZGVBdCgwKSAtIENoYXJTdGFydCwgbnVtYmVyIC0xXTtcbiAgfVxuXG4gIHRvU3RyaW5nKCkge1xuICAgIGxldCBzdHJpbmcgPSAnJztcblxuICAgIHRoaXMuc3F1YXJlcy5mb3JFYWNoKCBjb2wgPT4ge1xuICAgICAgY29sLmZvckVhY2goIHNxdWFyZSA9PiB7XG4gICAgICAgIHN0cmluZyArPSBzcXVhcmUudG9TdHJpbmcoKTtcbiAgICAgIH0pO1xuICAgICAgc3RyaW5nICs9IFwiXFxuXCI7XG4gICAgfSk7XG5cbiAgICByZXR1cm4gc3RyaW5nLnN1YnN0cmluZygwLCBzdHJpbmcubGVuZ3RoIC0gMSk7O1xuICB9XG5cbiAgLy8gUHV0IG5ldyBzaGlwIG9mICdzaXplJyBpbiBhIHJhbmRvbSBhdmFpbGFibGUgcG9zaXRpb24uXG4gIC8vIFJldHVybiBmYWxzZSBpZiBpdCdzIHVuYWJsZSB0byBhbGxvY2F0ZSB0aGUgc2hpcC5cbiAgLy8gVE9ETzogSW1wcm92ZSBoZXVyaXN0aWMuIEluIHRoaXMgc2NlbmFyaW8gMTB4MTAgYXJlIGZhc3QsIGJ1dFxuICAvLyBpdCdzIHBvc3NpYmxlIHRvIGltcHJvdmUgdGhlIHdheSBzaGlwcyBhcmUgYWxsb2NhdGVkXG4gIC8vIChleDogZG9uJ3QgdHJ5IHRvIHB1dCBzaGlwKDQpIGF0IDM8IHNxdWFyZXMgZnJvbSBib3JkZXIpXG4gIF9hbGxvY2F0ZVNoaXAoc2l6ZSkge1xuICAgIGxldCB0cmllcyA9IDA7XG4gICAgbGV0IGF2YWlsID0gdGhpcy5fYXZhaWxhYmxlU3F1YXJlcygpO1xuXG4gICAgaWYgKCBhdmFpbC5sZW5ndGggPiAwICkge1xuICAgICAgd2hpbGUgKHRyaWVzIDwgTWF4VHJpZXNQZXJTaGlwKSB7XG4gICAgICAgIGxldCB2ZXJ0ICA9IE1hdGgucmFuZG9tKCkgPiAwLjU7XG4gICAgICAgIGxldCBmcm9tICA9IGF2YWlsW01hdGguZmxvb3IoTWF0aC5yYW5kb20oKSphdmFpbC5sZW5ndGgpXS5uYW1lO1xuICAgICAgICBsZXQgY2hlY2sgPSB0aGlzLl9jaGVja1NxdWFyZXMoZnJvbSwgc2l6ZSwgdmVydCk7XG5cbiAgICAgICAgaWYgKGNoZWNrKSB7XG4gICAgICAgICAgbGV0IHNoaXAgPSBuZXcgU2hpcChzaXplKTtcbiAgICAgICAgICB0aGlzLnB1dFNoaXBBdChzaGlwLCBmcm9tLCB2ZXJ0KTtcbiAgICAgICAgICByZXR1cm4gdHJ1ZTtcbiAgICAgICAgfVxuXG4gICAgICAgIHRyaWVzKys7XG4gICAgICB9XG4gICAgfVxuXG4gICAgcmV0dXJuIGZhbHNlO1xuICB9XG5cbiAgLy8gUmV0dXJuIGFuIGFycmF5IG9mIGFsbCBhdmFpbGFibGUgc3F1YXJlc1xuICBfYXZhaWxhYmxlU3F1YXJlcygpIHtcbiAgICBsZXQgYXZhaWxhYmxlID0gbmV3IEFycmF5KCk7XG5cbiAgICB0aGlzLnNxdWFyZXMuZm9yRWFjaCggY29sID0+IHtcbiAgICAgIGNvbC5mb3JFYWNoKCBzcXVhcmUgPT4ge1xuICAgICAgICBpZiAoc3F1YXJlLmF2YWlsYWJsZSkge1xuICAgICAgICAgIGF2YWlsYWJsZS5wdXNoKHNxdWFyZSlcbiAgICAgICAgfVxuICAgICAgfSk7XG4gICAgfSk7XG5cbiAgICByZXR1cm4gYXZhaWxhYmxlO1xuICB9XG5cbiAgLy8gUmV0dXJuIGFuIGFycmF5IG9mICdzaXplJyBhdmFpbGFibGUgc3F1YXJlcyBpblxuICAvLyBob3Jpem9udGFsL3ZlcnRpY2FsIGRpcmVjdGlvbi5cbiAgLy8gUmV0dXJucyBmYWxzZSBpZiBhbnkgc3F1YXJlIGlzIHVuYXZhaWxhYmxlXG4gIF9jaGVja1NxdWFyZXMoZnJvbSwgc2l6ZSwgdmVydGljYWw9ZmFsc2UpIHtcbiAgICBsZXQgW3ggLHldID0gdGhpcy5zcXVhcmVDb29yZHNGcm9tTmFtZShmcm9tKTtcbiAgICBsZXQgeERpZmYgPSB2ZXJ0aWNhbCA/IDEgOiAwO1xuICAgIGxldCB5RGlmZiA9IHZlcnRpY2FsID8gMCA6IDE7XG4gICAgbGV0IHNxdWFyZXMgPSBuZXcgQXJyYXkoc2l6ZSk7XG5cbiAgICAvLyBDaGVjayBpZiBhbGwgdGhlIHNxdWFyZXMgYXJlIGF2YWlsYWJsZVxuICAgIGZvciAobGV0IGk9MDsgaSA8IHNpemU7IGkrKykge1xuICAgICAgbGV0IGN1cnJlbnRYID0geCArIHhEaWZmICogaTtcbiAgICAgIGxldCBjdXJyZW50WSA9IHkgKyB5RGlmZiAqIGk7XG5cbiAgICAgIGlmIChjdXJyZW50WCA+PSAwICYmIGN1cnJlbnRYIDwgdGhpcy5OICYmIGN1cnJlbnRZID49IDAgJiYgY3VycmVudFkgPCB0aGlzLk4pIHtcbiAgICAgICAgbGV0IGN1cnJlbnRTcXVhcmUgPSB0aGlzLnNxdWFyZXNbY3VycmVudFhdW2N1cnJlbnRZXTtcblxuICAgICAgICBpZiAoY3VycmVudFNxdWFyZS5hdmFpbGFibGUgPT0gdHJ1ZSkge1xuICAgICAgICAgIHNxdWFyZXNbaV0gPSBjdXJyZW50U3F1YXJlO1xuICAgICAgICB9XG4gICAgICAgIGVsc2Uge1xuICAgICAgICAgIHJldHVybiBmYWxzZTtcbiAgICAgICAgfVxuICAgICAgfVxuICAgICAgZWxzZSB7XG4gICAgICAgIHJldHVybiBmYWxzZTtcbiAgICAgIH1cbiAgICB9XG5cbiAgICByZXR1cm4gc3F1YXJlcztcbiAgfVxufVxuIiwiZXhwb3J0IGRlZmF1bHQgY2xhc3MgU2hpcCB7XG4gIGNvbnN0cnVjdG9yKHNpemUpIHtcbiAgICB0aGlzLnNpemUgPSBzaXplO1xuICAgIHRoaXMuc3VuayA9IGZhbHNlO1xuICAgIHRoaXMucmVtYWluaW5nID0gc2l6ZTtcbiAgfVxuXG4gIGhpdCgpIHtcbiAgICB0aGlzLnJlbWFpbmluZy0tO1xuXG4gICAgaWYgKHRoaXMucmVtYWluaW5nIDw9IDApIHtcbiAgICAgIHRoaXMuc3VuayA9IHRydWU7XG4gICAgfVxuICB9XG59XG4iLCJleHBvcnQgZGVmYXVsdCBjbGFzcyBTcXVhcmUge1xuICBjb25zdHJ1Y3RvcihuYW1lKSB7XG4gICAgdGhpcy5uYW1lICAgICAgID0gbmFtZTtcbiAgICB0aGlzLl9zaGlwICAgICAgPSB1bmRlZmluZWQ7XG4gICAgdGhpcy5fYXZhaWxhYmxlID0gdHJ1ZTtcbiAgICB0aGlzLl9oaXQgICAgICAgPSBmYWxzZTtcbiAgfVxuXG4gIGdldCBzaGlwKCkgICAgICAgeyByZXR1cm4gdGhpcy5fc2hpcCB9XG4gIHNldCBzaGlwKHYpICAgICAgeyB0aGlzLl9zaGlwID0gdiB9XG4gIGdldCBhdmFpbGFibGUoKSAgeyByZXR1cm4gdGhpcy5fYXZhaWxhYmxlIH1cbiAgc2V0IGF2YWlsYWJsZSh2KSB7IHRoaXMuX2F2YWlsYWJsZSA9IHYgfVxuXG4gIHNob3QoKSB7XG4gICAgbGV0IHJlc3VsdCA9IHsgaGl0OiBmYWxzZSwgc3VuazogZmFsc2UgfTtcbiAgICAvLyBJZiB0aGUgU3F1YXJlIGlzIGFscmVhZHkgaGl0LCByZXR1cm4gYSBtaXNzXG4gICAgaWYgKCF0aGlzLl9oaXQgJiYgdGhpcy5fc2hpcCkge1xuICAgICAgdGhpcy5faGl0ID0gdHJ1ZTtcbiAgICAgIHRoaXMuX3NoaXAuaGl0KClcbiAgICAgIHJlc3VsdC5oaXQgPSB0cnVlO1xuICAgICAgcmVzdWx0LnN1bmsgPSB0aGlzLl9zaGlwLnN1bms7XG4gICAgfVxuXG4gICAgcmV0dXJuIHJlc3VsdDtcbiAgfVxuXG4gIHRvU3RyaW5nKCkge1xuICAgIGlmICggdGhpcy5fc2hpcCApIHtcbiAgICAgIHJldHVybiB0aGlzLl9oaXQgPyAnWCcgOiAnIyc7XG4gICAgfVxuICAgIGVsc2Uge1xuICAgICAgcmV0dXJuICcwJztcbiAgICB9XG4gIH1cbn1cbiJdfQ==
