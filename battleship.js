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

var charStart = 65;

var Board = (function () {
  function Board() {
    _classCallCheck(this, Board);

    this.N = 10;
    this._initializeSquares();
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
      var _this2 = this;

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

        if (mX >= 0 && mX < _this2.N && mY >= 0 && mY < _this2.N) {
          neighbours.add(_this2.squareNameFromCoords(mX, mY));
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
      var _this3 = this;

      var vertical = arguments.length <= 2 || arguments[2] === undefined ? false : arguments[2];

      var squares = this._checkSquares(square, ship.size, vertical);

      if (squares) {
        // Disable ship squares and adjacent ones
        squares.forEach(function (s) {
          s.ship = ship;
          s.available = false;
          _this3.neighbourSquares(s.name).forEach(function (n) {
            var _squareCoordsFromName5 = _this3.squareCoordsFromName(n);

            var _squareCoordsFromName52 = _slicedToArray(_squareCoordsFromName5, 2);

            var x = _squareCoordsFromName52[0];
            var y = _squareCoordsFromName52[1];

            _this3.squares[x][y].available = false;
          });
        });

        return true;
      } else {
        return false;
      }
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

    // Convert [0, 0] to 'A1'
  }, {
    key: 'squareNameFromCoords',
    value: function squareNameFromCoords(x, y) {
      return String.fromCharCode(charStart + x) + ('' + (y + 1));
    }

    // Convert 'A1' to [0, 0]
  }, {
    key: 'squareCoordsFromName',
    value: function squareCoordsFromName(name) {
      var _name$match = name.match(/([A-Z]+)(\d+)/);

      var _name$match2 = _slicedToArray(_name$match, 3);

      var character = _name$match2[1];
      var number = _name$match2[2];

      return [character.charCodeAt(0) - charStart, number - 1];
    }
  }]);

  return Board;
})();

exports['default'] = Board;
module.exports = exports['default'];

},{"./Square":3}],3:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Square = (function () {
  function Square(name) {
    _classCallCheck(this, Square);

    this.name = name;
    this._ship = undefined;
    this._available = true;
    this._hit = false;
  }

  _createClass(Square, [{
    key: "shot",
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
    key: "ship",
    get: function get() {
      return this._ship;
    },
    set: function set(v) {
      this._ship = v;
    }
  }, {
    key: "available",
    get: function get() {
      return this._available;
    },
    set: function set(v) {
      this._available = v;
    }
  }]);

  return Square;
})();

exports["default"] = Square;
module.exports = exports["default"];

},{}]},{},[1])
//# sourceMappingURL=data:application/json;charset:utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm5vZGVfbW9kdWxlcy9icm93c2VyaWZ5L25vZGVfbW9kdWxlcy9icm93c2VyLXBhY2svX3ByZWx1ZGUuanMiLCIvaG9tZS9tL3dvcmsvYmF0dGxlc2hpcC5qcy9zcmMvaW5kZXguanMiLCIvaG9tZS9tL3dvcmsvYmF0dGxlc2hpcC5qcy9zcmMvbW9kZWwvQm9hcmQuanMiLCIvaG9tZS9tL3dvcmsvYmF0dGxlc2hpcC5qcy9zcmMvbW9kZWwvU3F1YXJlLmpzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBOzs7OzswQkNBa0IsZUFBZTs7OztBQUVqQyxJQUFJLENBQUMsR0FBRyw2QkFBVyxDQUFDO0FBQ3BCLE9BQU8sQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDLFdBQVcsQ0FBQyxJQUFJLENBQUMsQ0FBQzs7Ozs7Ozs7Ozs7Ozs7Ozs7c0JDSGIsVUFBVTs7OztBQUU3QixJQUFJLFNBQVMsR0FBRyxFQUFFLENBQUM7O0lBRUUsS0FBSztBQUNiLFdBRFEsS0FBSyxHQUNWOzBCQURLLEtBQUs7O0FBRXRCLFFBQUksQ0FBQyxDQUFDLEdBQUcsRUFBRSxDQUFDO0FBQ1osUUFBSSxDQUFDLGtCQUFrQixFQUFFLENBQUM7R0FDM0I7O2VBSmtCLEtBQUs7O1dBTU4sOEJBQUc7OztBQUNuQixVQUFJLENBQUMsT0FBTyxHQUFHLEtBQUssQ0FBQyxLQUFLLENBQUMsQ0FBQyxFQUFFLEtBQUssQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxHQUFHLENBQUUsVUFBQyxHQUFHLEVBQUUsQ0FBQyxFQUFLO0FBQzVELGVBQU8sS0FBSyxDQUFDLEtBQUssQ0FBQyxDQUFDLEVBQUUsS0FBSyxDQUFDLE1BQUssQ0FBQyxDQUFDLENBQUMsQ0FBQyxHQUFHLENBQUUsVUFBQyxHQUFHLEVBQUUsQ0FBQyxFQUFLO0FBQ3BELGlCQUFPLHdCQUFXLE1BQUssb0JBQW9CLENBQUMsQ0FBQyxFQUFDLENBQUMsQ0FBQyxDQUFDLENBQUM7U0FDbkQsQ0FBRSxDQUFBO09BQ0os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QUE7S0FBRTtTQUM5QixhQUFDLENBQUMsRUFBRTtBQUFFLFVBQUksQ0FBQyxVQUFVLEdBQUcsQ0FBQyxDQUFBO0tBQUU7OztTQVhyQixNQUFNOzs7cUJBQU4sTUFBTSIsImZpbGUiOiJnZW5lcmF0ZWQuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlc0NvbnRlbnQiOlsiKGZ1bmN0aW9uIGUodCxuLHIpe2Z1bmN0aW9uIHMobyx1KXtpZighbltvXSl7aWYoIXRbb10pe3ZhciBhPXR5cGVvZiByZXF1aXJlPT1cImZ1bmN0aW9uXCImJnJlcXVpcmU7aWYoIXUmJmEpcmV0dXJuIGEobywhMCk7aWYoaSlyZXR1cm4gaShvLCEwKTt2YXIgZj1uZXcgRXJyb3IoXCJDYW5ub3QgZmluZCBtb2R1bGUgJ1wiK28rXCInXCIpO3Rocm93IGYuY29kZT1cIk1PRFVMRV9OT1RfRk9VTkRcIixmfXZhciBsPW5bb109e2V4cG9ydHM6e319O3Rbb11bMF0uY2FsbChsLmV4cG9ydHMsZnVuY3Rpb24oZSl7dmFyIG49dFtvXVsxXVtlXTtyZXR1cm4gcyhuP246ZSl9LGwsbC5leHBvcnRzLGUsdCxuLHIpfXJldHVybiBuW29dLmV4cG9ydHN9dmFyIGk9dHlwZW9mIHJlcXVpcmU9PVwiZnVuY3Rpb25cIiYmcmVxdWlyZTtmb3IodmFyIG89MDtvPHIubGVuZ3RoO28rKylzKHJbb10pO3JldHVybiBzfSkiLCJpbXBvcnQgQm9hcmQgZnJvbSAnLi9tb2RlbC9Cb2FyZCc7XG5cbmxldCBiID0gbmV3IEJvYXJkKCk7XG5jb25zb2xlLmxvZyhiLmNvbnN0cnVjdG9yLm5hbWUpO1xuIiwiaW1wb3J0IFNxdWFyZSBmcm9tICcuL1NxdWFyZSc7XG5cbmxldCBjaGFyU3RhcnQgPSA2NTtcblxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgQm9hcmQge1xuICBjb25zdHJ1Y3RvcigpIHtcbiAgICB0aGlzLk4gPSAxMDtcbiAgICB0aGlzLl9pbml0aWFsaXplU3F1YXJlcygpO1xuICB9XG5cbiAgX2luaXRpYWxpemVTcXVhcmVzKCkge1xuICAgIHRoaXMuc3F1YXJlcyA9IEFycmF5LmFwcGx5KDAsIEFycmF5KHRoaXMuTikpLm1hcCggKGNvbCwgeCkgPT4ge1xuICAgICAgcmV0dXJuIEFycmF5LmFwcGx5KDAsIEFycmF5KHRoaXMuTikpLm1hcCggKHJvdywgeSkgPT4ge1xuICAgICAgICByZXR1cm4gbmV3IFNxdWFyZSh0aGlzLnNxdWFyZU5hbWVGcm9tQ29vcmRzKHgseSkpO1xuICAgICAgfSApXG4gICAgfSApO1xuICB9XG5cbiAgZ2V0U3F1YXJlKG5hbWUpIHtcbiAgICBsZXQgW3gsIHldID0gdGhpcy5zcXVhcmVDb29yZHNGcm9tTmFtZShuYW1lKTtcbiAgICByZXR1cm4gdGhpcy5zcXVhcmVzW3hdW3ldO1xuICB9XG5cbiAgaGl0KG5hbWUpIHtcbiAgICBsZXQgW3gsIHldID0gdGhpcy5zcXVhcmVDb29yZHNGcm9tTmFtZShuYW1lKTtcbiAgICByZXR1cm4gdGhpcy5zcXVhcmVzW3hdW3ldLmhpdCgpO1xuICB9XG5cbiAgbmVpZ2hib3VyU3F1YXJlcyhuYW1lKSB7XG4gICAgbGV0IFt4LCB5XSA9IHRoaXMuc3F1YXJlQ29vcmRzRnJvbU5hbWUobmFtZSk7XG5cbiAgICBsZXQgbmVpZ2hib3VycyA9IG5ldyBTZXQoKTtcbiAgICBsZXQgbW92ZW1lbnRzICA9IFtcbiAgICAgIFstMSwtMV0sIFstMSwgMF0sIFstMSwgMV0sXG4gICAgICBbIDAsLTFdICAgICAgICAgLCBbIDAsIDFdLFxuICAgICAgWyAxLC0xXSwgWyAxLCAwXSwgWyAxLCAxXSxcbiAgICBdO1xuXG4gICAgLy8gVHJ5IGFsbCBwb3NzaWJsZSBtb3ZlbWVudHMgYW5kIGFkZCB0aGVtIHRvXG4gICAgLy8gdGhlIFNldCBpZiBhcmUgd2l0aGluIHRoZSB2YWxpZCB2YWx1ZXNcbiAgICBtb3ZlbWVudHMuZm9yRWFjaCggbSA9PiB7XG4gICAgICBsZXQgbVggPSB4ICsgbVswXTtcbiAgICAgIGxldCBtWSA9IHkgKyBtWzFdO1xuXG4gICAgICBpZiAobVggPj0gMCAmJiBtWCA8IHRoaXMuTiAmJiBtWSA+PSAwICYmIG1ZIDwgdGhpcy5OKSB7XG4gICAgICAgIG5laWdoYm91cnMuYWRkKHRoaXMuc3F1YXJlTmFtZUZyb21Db29yZHMobVgsIG1ZKSk7XG4gICAgICB9XG4gICAgfSApO1xuXG4gICAgcmV0dXJuIG5laWdoYm91cnM7XG4gIH1cblxuICAvLyBUcnkgdG8gcHV0IGEgc2hpcCBmcm9tIGluaXRpYWwgc3F1YXJlIGluXG4gIC8vIGhvcml6b250YWwvdmVydGljYWwgZGlyZWN0aW9uLlxuICAvLyBSZXR1cm5zIGZhbHNlIGlmIGFueSBzcXVhcmUgaXMgdW5hdmFpbGFibGVcbiAgcHV0U2hpcEF0KHNoaXAsIHNxdWFyZSwgdmVydGljYWw9ZmFsc2UpIHtcbiAgICBsZXQgc3F1YXJlcyA9IHRoaXMuX2NoZWNrU3F1YXJlcyhzcXVhcmUsIHNoaXAuc2l6ZSwgdmVydGljYWwpO1xuXG4gICAgaWYgKHNxdWFyZXMpIHtcbiAgICAgIC8vIERpc2FibGUgc2hpcCBzcXVhcmVzIGFuZCBhZGphY2VudCBvbmVzXG4gICAgICBzcXVhcmVzLmZvckVhY2goIHMgPT4ge1xuICAgICAgICBzLnNoaXAgPSBzaGlwO1xuICAgICAgICBzLmF2YWlsYWJsZSA9IGZhbHNlO1xuICAgICAgICB0aGlzLm5laWdoYm91clNxdWFyZXMocy5uYW1lKS5mb3JFYWNoKCBuID0+IHtcbiAgICAgICAgICBsZXQgW3gsIHldID0gdGhpcy5zcXVhcmVDb29yZHNGcm9tTmFtZShuKTtcbiAgICAgICAgICB0aGlzLnNxdWFyZXNbeF1beV0uYXZhaWxhYmxlID0gZmFsc2U7XG4gICAgICAgIH0gKTtcbiAgICAgIH0gKTtcblxuICAgICAgcmV0dXJuIHRydWU7XG4gICAgfVxuICAgIGVsc2Uge1xuICAgICAgcmV0dXJuIGZhbHNlO1xuICAgIH1cbiAgfVxuXG4gIC8vIFJldHVybiBhbiBhcnJheSBvZiAnc2l6ZScgYXZhaWxhYmxlIHNxdWFyZXMgaW5cbiAgLy8gaG9yaXpvbnRhbC92ZXJ0aWNhbCBkaXJlY3Rpb24uXG4gIC8vIFJldHVybnMgZmFsc2UgaWYgYW55IHNxdWFyZSBpcyB1bmF2YWlsYWJsZVxuICBfY2hlY2tTcXVhcmVzKGZyb20sIHNpemUsIHZlcnRpY2FsPWZhbHNlKSB7XG4gICAgbGV0IFt4ICx5XSA9IHRoaXMuc3F1YXJlQ29vcmRzRnJvbU5hbWUoZnJvbSk7XG4gICAgbGV0IHhEaWZmID0gdmVydGljYWwgPyAxIDogMDtcbiAgICBsZXQgeURpZmYgPSB2ZXJ0aWNhbCA/IDAgOiAxO1xuICAgIGxldCBzcXVhcmVzID0gbmV3IEFycmF5KHNpemUpO1xuXG4gICAgLy8gQ2hlY2sgaWYgYWxsIHRoZSBzcXVhcmVzIGFyZSBhdmFpbGFibGVcbiAgICBmb3IgKGxldCBpPTA7IGkgPCBzaXplOyBpKyspIHtcbiAgICAgIGxldCBjdXJyZW50WCA9IHggKyB4RGlmZiAqIGk7XG4gICAgICBsZXQgY3VycmVudFkgPSB5ICsgeURpZmYgKiBpO1xuXG4gICAgICBpZiAoY3VycmVudFggPj0gMCAmJiBjdXJyZW50WCA8IHRoaXMuTiAmJiBjdXJyZW50WSA+PSAwICYmIGN1cnJlbnRZIDwgdGhpcy5OKSB7XG4gICAgICAgIGxldCBjdXJyZW50U3F1YXJlID0gdGhpcy5zcXVhcmVzW2N1cnJlbnRYXVtjdXJyZW50WV07XG5cbiAgICAgICAgaWYgKGN1cnJlbnRTcXVhcmUuYXZhaWxhYmxlID09IHRydWUpIHtcbiAgICAgICAgICBzcXVhcmVzW2ldID0gY3VycmVudFNxdWFyZTtcbiAgICAgICAgfVxuICAgICAgICBlbHNlIHtcbiAgICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICAgIGVsc2Uge1xuICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgICB9XG4gICAgfVxuXG4gICAgcmV0dXJuIHNxdWFyZXM7XG4gIH1cblxuICAvLyBDb252ZXJ0IFswLCAwXSB0byAnQTEnXG4gIHNxdWFyZU5hbWVGcm9tQ29vcmRzKHgsIHkpIHtcbiAgICByZXR1cm4gU3RyaW5nLmZyb21DaGFyQ29kZShjaGFyU3RhcnQgKyB4KSArIGAke3kgKyAxfWA7XG4gIH1cblxuICAvLyBDb252ZXJ0ICdBMScgdG8gWzAsIDBdXG4gIHNxdWFyZUNvb3Jkc0Zyb21OYW1lKG5hbWUpIHtcbiAgICBsZXQgWywgY2hhcmFjdGVyLCBudW1iZXJdID0gbmFtZS5tYXRjaCgvKFtBLVpdKykoXFxkKykvKTtcbiAgICByZXR1cm4gW2NoYXJhY3Rlci5jaGFyQ29kZUF0KDApIC0gY2hhclN0YXJ0LCBudW1iZXIgLTFdO1xuICB9XG59XG4iLCJleHBvcnQgZGVmYXVsdCBjbGFzcyBTcXVhcmUge1xuICBjb25zdHJ1Y3RvcihuYW1lKSB7XG4gICAgdGhpcy5uYW1lICAgICAgID0gbmFtZTtcbiAgICB0aGlzLl9zaGlwICAgICAgPSB1bmRlZmluZWQ7XG4gICAgdGhpcy5fYXZhaWxhYmxlID0gdHJ1ZTtcbiAgICB0aGlzLl9oaXQgICAgICAgPSBmYWxzZTtcbiAgfVxuXG4gIGdldCBzaGlwKCkgICAgICAgeyByZXR1cm4gdGhpcy5fc2hpcCB9XG4gIHNldCBzaGlwKHYpICAgICAgeyB0aGlzLl9zaGlwID0gdiB9XG4gIGdldCBhdmFpbGFibGUoKSAgeyByZXR1cm4gdGhpcy5fYXZhaWxhYmxlIH1cbiAgc2V0IGF2YWlsYWJsZSh2KSB7IHRoaXMuX2F2YWlsYWJsZSA9IHYgfVxuXG4gIHNob3QoKSB7XG4gICAgbGV0IHJlc3VsdCA9IHsgaGl0OiBmYWxzZSwgc3VuazogZmFsc2UgfTtcbiAgICAvLyBJZiB0aGUgU3F1YXJlIGlzIGFscmVhZHkgaGl0LCByZXR1cm4gYSBtaXNzXG4gICAgaWYgKCF0aGlzLl9oaXQgJiYgdGhpcy5fc2hpcCkge1xuICAgICAgdGhpcy5faGl0ID0gdHJ1ZTtcbiAgICAgIHRoaXMuX3NoaXAuaGl0KClcbiAgICAgIHJlc3VsdC5oaXQgPSB0cnVlO1xuICAgICAgcmVzdWx0LnN1bmsgPSB0aGlzLl9zaGlwLnN1bms7XG4gICAgfVxuXG4gICAgcmV0dXJuIHJlc3VsdDtcbiAgfVxufVxuIl19
