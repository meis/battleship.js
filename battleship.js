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
    key: 'neighbourSquares',
    value: function neighbourSquares(name) {
      var _this2 = this;

      var _squareCoordsFromName3 = this.squareCoordsFromName(name);

      var _squareCoordsFromName32 = _slicedToArray(_squareCoordsFromName3, 2);

      var x = _squareCoordsFromName32[0];
      var y = _squareCoordsFromName32[1];

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
            var _squareCoordsFromName4 = _this3.squareCoordsFromName(n);

            var _squareCoordsFromName42 = _slicedToArray(_squareCoordsFromName4, 2);

            var x = _squareCoordsFromName42[0];
            var y = _squareCoordsFromName42[1];

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

      var _squareCoordsFromName5 = this.squareCoordsFromName(from);

      var _squareCoordsFromName52 = _slicedToArray(_squareCoordsFromName5, 2);

      var x = _squareCoordsFromName52[0];
      var y = _squareCoordsFromName52[1];

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
  }

  _createClass(Square, [{
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
//# sourceMappingURL=data:application/json;charset:utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm5vZGVfbW9kdWxlcy9icm93c2VyaWZ5L25vZGVfbW9kdWxlcy9icm93c2VyLXBhY2svX3ByZWx1ZGUuanMiLCIvaG9tZS9tL3dvcmsvYmF0dGxlc2hpcC5qcy9zcmMvaW5kZXguanMiLCIvaG9tZS9tL3dvcmsvYmF0dGxlc2hpcC5qcy9zcmMvbW9kZWwvQm9hcmQuanMiLCIvaG9tZS9tL3dvcmsvYmF0dGxlc2hpcC5qcy9zcmMvbW9kZWwvU3F1YXJlLmpzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBOzs7OzswQkNBa0IsZUFBZTs7OztBQUVqQyxJQUFJLENBQUMsR0FBRyw2QkFBVyxDQUFDO0FBQ3BCLE9BQU8sQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDLFdBQVcsQ0FBQyxJQUFJLENBQUMsQ0FBQzs7Ozs7Ozs7Ozs7Ozs7Ozs7c0JDSGIsVUFBVTs7OztBQUU3QixJQUFJLFNBQVMsR0FBRyxFQUFFLENBQUM7O0lBRUUsS0FBSztBQUNiLFdBRFEsS0FBSyxHQUNWOzBCQURLLEtBQUs7O0FBRXRCLFFBQUksQ0FBQyxDQUFDLEdBQUcsRUFBRSxDQUFDO0FBQ1osUUFBSSxDQUFDLGtCQUFrQixFQUFFLENBQUM7R0FDM0I7O2VBSmtCLEtBQUs7O1dBTU4sOEJBQUc7OztBQUNuQixVQUFJLENBQUMsT0FBTyxHQUFHLEtBQUssQ0FBQyxLQUFLLENBQUMsQ0FBQyxFQUFFLEtBQUssQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxHQUFHLENBQUUsVUFBQyxHQUFHLEVBQUUsQ0FBQyxFQUFLO0FBQzVELGVBQU8sS0FBSyxDQUFDLEtBQUssQ0FBQyxDQUFDLEVBQUUsS0FBSyxDQUFDLE1BQUssQ0FBQyxDQUFDLENBQUMsQ0FBQyxHQUFHLENBQUUsVUFBQyxHQUFHLEVBQUUsQ0FBQyxFQUFLO0FBQ3BELGlCQUFPLHdCQUFXLE1BQUssb0JBQW9CLENBQUMsQ0FBQyxFQUFDLENBQUMsQ0FBQyxDQUFDLENBQUM7U0FDbkQsQ0FBRSxDQUFBO09BQ0os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QUFLOzs7cUJBQUwsS0FBSzs7Ozs7Ozs7Ozs7Ozs7SUNKTCxNQUFNO0FBQ2QsV0FEUSxNQUFNLENBQ2IsSUFBSSxFQUFFOzBCQURDLE1BQU07O0FBRXZCLFFBQUksQ0FBQyxJQUFJLEdBQUcsSUFBSSxDQUFDO0FBQ2pCLFFBQUksQ0FBQyxLQUFLLEdBQUcsU0FBUyxDQUFDO0FBQ3ZCLFFBQUksQ0FBQyxVQUFVLEdBQUcsSUFBSSxDQUFDO0dBQ3hCOztlQUxrQixNQUFNOztTQU9qQixlQUFTO0FBQUUsYUFBTyxJQUFJLENBQUMsS0FBSyxDQUFBO0tBQUU7U0FDOUIsYUFBQyxDQUFDLEVBQU87QUFBRSxVQUFJLENBQUMsS0FBSyxHQUFHLENBQUMsQ0FBQTtLQUFFOzs7U0FDdEIsZUFBSTtBQUFFLGFBQU8sSUFBSSxDQUFDLFVBQVUsQ0FBQTtLQUFFO1NBQzlCLGFBQUMsQ0FBQyxFQUFFO0FBQUUsVUFBSSxDQUFDLFVBQVUsR0FBRyxDQUFDLENBQUE7S0FBRTs7O1NBVnJCLE1BQU07OztxQkFBTixNQUFNIiwiZmlsZSI6ImdlbmVyYXRlZC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzQ29udGVudCI6WyIoZnVuY3Rpb24gZSh0LG4scil7ZnVuY3Rpb24gcyhvLHUpe2lmKCFuW29dKXtpZighdFtvXSl7dmFyIGE9dHlwZW9mIHJlcXVpcmU9PVwiZnVuY3Rpb25cIiYmcmVxdWlyZTtpZighdSYmYSlyZXR1cm4gYShvLCEwKTtpZihpKXJldHVybiBpKG8sITApO3ZhciBmPW5ldyBFcnJvcihcIkNhbm5vdCBmaW5kIG1vZHVsZSAnXCIrbytcIidcIik7dGhyb3cgZi5jb2RlPVwiTU9EVUxFX05PVF9GT1VORFwiLGZ9dmFyIGw9bltvXT17ZXhwb3J0czp7fX07dFtvXVswXS5jYWxsKGwuZXhwb3J0cyxmdW5jdGlvbihlKXt2YXIgbj10W29dWzFdW2VdO3JldHVybiBzKG4/bjplKX0sbCxsLmV4cG9ydHMsZSx0LG4scil9cmV0dXJuIG5bb10uZXhwb3J0c312YXIgaT10eXBlb2YgcmVxdWlyZT09XCJmdW5jdGlvblwiJiZyZXF1aXJlO2Zvcih2YXIgbz0wO288ci5sZW5ndGg7bysrKXMocltvXSk7cmV0dXJuIHN9KSIsImltcG9ydCBCb2FyZCBmcm9tICcuL21vZGVsL0JvYXJkJztcblxubGV0IGIgPSBuZXcgQm9hcmQoKTtcbmNvbnNvbGUubG9nKGIuY29uc3RydWN0b3IubmFtZSk7XG4iLCJpbXBvcnQgU3F1YXJlIGZyb20gJy4vU3F1YXJlJztcblxubGV0IGNoYXJTdGFydCA9IDY1O1xuXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBCb2FyZCB7XG4gIGNvbnN0cnVjdG9yKCkge1xuICAgIHRoaXMuTiA9IDEwO1xuICAgIHRoaXMuX2luaXRpYWxpemVTcXVhcmVzKCk7XG4gIH1cblxuICBfaW5pdGlhbGl6ZVNxdWFyZXMoKSB7XG4gICAgdGhpcy5zcXVhcmVzID0gQXJyYXkuYXBwbHkoMCwgQXJyYXkodGhpcy5OKSkubWFwKCAoY29sLCB4KSA9PiB7XG4gICAgICByZXR1cm4gQXJyYXkuYXBwbHkoMCwgQXJyYXkodGhpcy5OKSkubWFwKCAocm93LCB5KSA9PiB7XG4gICAgICAgIHJldHVybiBuZXcgU3F1YXJlKHRoaXMuc3F1YXJlTmFtZUZyb21Db29yZHMoeCx5KSk7XG4gICAgICB9IClcbiAgICB9ICk7XG4gIH1cblxuICBnZXRTcXVhcmUobmFtZSkge1xuICAgIGxldCBbeCwgeV0gPSB0aGlzLnNxdWFyZUNvb3Jkc0Zyb21OYW1lKG5hbWUpO1xuICAgIHJldHVybiB0aGlzLnNxdWFyZXNbeF1beV07XG4gIH1cblxuICBuZWlnaGJvdXJTcXVhcmVzKG5hbWUpIHtcbiAgICBsZXQgW3gsIHldID0gdGhpcy5zcXVhcmVDb29yZHNGcm9tTmFtZShuYW1lKTtcblxuICAgIGxldCBuZWlnaGJvdXJzID0gbmV3IFNldCgpO1xuICAgIGxldCBtb3ZlbWVudHMgID0gW1xuICAgICAgWy0xLC0xXSwgWy0xLCAwXSwgWy0xLCAxXSxcbiAgICAgIFsgMCwtMV0gICAgICAgICAsIFsgMCwgMV0sXG4gICAgICBbIDEsLTFdLCBbIDEsIDBdLCBbIDEsIDFdLFxuICAgIF07XG5cbiAgICAvLyBUcnkgYWxsIHBvc3NpYmxlIG1vdmVtZW50cyBhbmQgYWRkIHRoZW0gdG9cbiAgICAvLyB0aGUgU2V0IGlmIGFyZSB3aXRoaW4gdGhlIHZhbGlkIHZhbHVlc1xuICAgIG1vdmVtZW50cy5mb3JFYWNoKCBtID0+IHtcbiAgICAgIGxldCBtWCA9IHggKyBtWzBdO1xuICAgICAgbGV0IG1ZID0geSArIG1bMV07XG5cbiAgICAgIGlmIChtWCA+PSAwICYmIG1YIDwgdGhpcy5OICYmIG1ZID49IDAgJiYgbVkgPCB0aGlzLk4pIHtcbiAgICAgICAgbmVpZ2hib3Vycy5hZGQodGhpcy5zcXVhcmVOYW1lRnJvbUNvb3JkcyhtWCwgbVkpKTtcbiAgICAgIH1cbiAgICB9ICk7XG5cbiAgICByZXR1cm4gbmVpZ2hib3VycztcbiAgfVxuXG4gIC8vIFRyeSB0byBwdXQgYSBzaGlwIGZyb20gaW5pdGlhbCBzcXVhcmUgaW5cbiAgLy8gaG9yaXpvbnRhbC92ZXJ0aWNhbCBkaXJlY3Rpb24uXG4gIC8vIFJldHVybnMgZmFsc2UgaWYgYW55IHNxdWFyZSBpcyB1bmF2YWlsYWJsZVxuICBwdXRTaGlwQXQoc2hpcCwgc3F1YXJlLCB2ZXJ0aWNhbD1mYWxzZSkge1xuICAgIGxldCBzcXVhcmVzID0gdGhpcy5fY2hlY2tTcXVhcmVzKHNxdWFyZSwgc2hpcC5zaXplLCB2ZXJ0aWNhbCk7XG5cbiAgICBpZiAoc3F1YXJlcykge1xuICAgICAgLy8gRGlzYWJsZSBzaGlwIHNxdWFyZXMgYW5kIGFkamFjZW50IG9uZXNcbiAgICAgIHNxdWFyZXMuZm9yRWFjaCggcyA9PiB7XG4gICAgICAgIHMuc2hpcCA9IHNoaXA7XG4gICAgICAgIHMuYXZhaWxhYmxlID0gZmFsc2U7XG4gICAgICAgIHRoaXMubmVpZ2hib3VyU3F1YXJlcyhzLm5hbWUpLmZvckVhY2goIG4gPT4ge1xuICAgICAgICAgIGxldCBbeCwgeV0gPSB0aGlzLnNxdWFyZUNvb3Jkc0Zyb21OYW1lKG4pO1xuICAgICAgICAgIHRoaXMuc3F1YXJlc1t4XVt5XS5hdmFpbGFibGUgPSBmYWxzZTtcbiAgICAgICAgfSApO1xuICAgICAgfSApO1xuXG4gICAgICByZXR1cm4gdHJ1ZTtcbiAgICB9XG4gICAgZWxzZSB7XG4gICAgICByZXR1cm4gZmFsc2U7XG4gICAgfVxuICB9XG5cbiAgLy8gUmV0dXJuIGFuIGFycmF5IG9mICdzaXplJyBhdmFpbGFibGUgc3F1YXJlcyBpblxuICAvLyBob3Jpem9udGFsL3ZlcnRpY2FsIGRpcmVjdGlvbi5cbiAgLy8gUmV0dXJucyBmYWxzZSBpZiBhbnkgc3F1YXJlIGlzIHVuYXZhaWxhYmxlXG4gIF9jaGVja1NxdWFyZXMoZnJvbSwgc2l6ZSwgdmVydGljYWw9ZmFsc2UpIHtcbiAgICBsZXQgW3ggLHldID0gdGhpcy5zcXVhcmVDb29yZHNGcm9tTmFtZShmcm9tKTtcbiAgICBsZXQgeERpZmYgPSB2ZXJ0aWNhbCA/IDEgOiAwO1xuICAgIGxldCB5RGlmZiA9IHZlcnRpY2FsID8gMCA6IDE7XG4gICAgbGV0IHNxdWFyZXMgPSBuZXcgQXJyYXkoc2l6ZSk7XG5cbiAgICAvLyBDaGVjayBpZiBhbGwgdGhlIHNxdWFyZXMgYXJlIGF2YWlsYWJsZVxuICAgIGZvciAobGV0IGk9MDsgaSA8IHNpemU7IGkrKykge1xuICAgICAgbGV0IGN1cnJlbnRYID0geCArIHhEaWZmICogaTtcbiAgICAgIGxldCBjdXJyZW50WSA9IHkgKyB5RGlmZiAqIGk7XG5cbiAgICAgIGlmIChjdXJyZW50WCA+PSAwICYmIGN1cnJlbnRYIDwgdGhpcy5OICYmIGN1cnJlbnRZID49IDAgJiYgY3VycmVudFkgPCB0aGlzLk4pIHtcbiAgICAgICAgbGV0IGN1cnJlbnRTcXVhcmUgPSB0aGlzLnNxdWFyZXNbY3VycmVudFhdW2N1cnJlbnRZXTtcblxuICAgICAgICBpZiAoY3VycmVudFNxdWFyZS5hdmFpbGFibGUgPT0gdHJ1ZSkge1xuICAgICAgICAgIHNxdWFyZXNbaV0gPSBjdXJyZW50U3F1YXJlO1xuICAgICAgICB9XG4gICAgICAgIGVsc2Uge1xuICAgICAgICAgIHJldHVybiBmYWxzZTtcbiAgICAgICAgfVxuICAgICAgfVxuICAgICAgZWxzZSB7XG4gICAgICAgIHJldHVybiBmYWxzZTtcbiAgICAgIH1cbiAgICB9XG5cbiAgICByZXR1cm4gc3F1YXJlcztcbiAgfVxuXG4gIC8vIENvbnZlcnQgWzAsIDBdIHRvICdBMSdcbiAgc3F1YXJlTmFtZUZyb21Db29yZHMoeCwgeSkge1xuICAgIHJldHVybiBTdHJpbmcuZnJvbUNoYXJDb2RlKGNoYXJTdGFydCArIHgpICsgYCR7eSArIDF9YDtcbiAgfVxuXG4gIC8vIENvbnZlcnQgJ0ExJyB0byBbMCwgMF1cbiAgc3F1YXJlQ29vcmRzRnJvbU5hbWUobmFtZSkge1xuICAgIGxldCBbLCBjaGFyYWN0ZXIsIG51bWJlcl0gPSBuYW1lLm1hdGNoKC8oW0EtWl0rKShcXGQrKS8pO1xuICAgIHJldHVybiBbY2hhcmFjdGVyLmNoYXJDb2RlQXQoMCkgLSBjaGFyU3RhcnQsIG51bWJlciAtMV07XG4gIH1cbn1cbiIsImV4cG9ydCBkZWZhdWx0IGNsYXNzIFNxdWFyZSB7XG4gIGNvbnN0cnVjdG9yKG5hbWUpIHtcbiAgICB0aGlzLm5hbWUgPSBuYW1lO1xuICAgIHRoaXMuX3NoaXAgPSB1bmRlZmluZWQ7XG4gICAgdGhpcy5fYXZhaWxhYmxlID0gdHJ1ZTtcbiAgfVxuXG4gIGdldCBzaGlwKCkgICAgICAgeyByZXR1cm4gdGhpcy5fc2hpcCB9XG4gIHNldCBzaGlwKHYpICAgICAgeyB0aGlzLl9zaGlwID0gdiB9XG4gIGdldCBhdmFpbGFibGUoKSAgeyByZXR1cm4gdGhpcy5fYXZhaWxhYmxlIH1cbiAgc2V0IGF2YWlsYWJsZSh2KSB7IHRoaXMuX2F2YWlsYWJsZSA9IHYgfVxufVxuIl19
