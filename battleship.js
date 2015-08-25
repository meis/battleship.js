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

},{"./Square":3}],3:[function(require,module,exports){
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
//# sourceMappingURL=data:application/json;charset:utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm5vZGVfbW9kdWxlcy9icm93c2VyaWZ5L25vZGVfbW9kdWxlcy9icm93c2VyLXBhY2svX3ByZWx1ZGUuanMiLCIvaG9tZS9tL3dvcmsvYmF0dGxlc2hpcC5qcy9zcmMvaW5kZXguanMiLCIvaG9tZS9tL3dvcmsvYmF0dGxlc2hpcC5qcy9zcmMvbW9kZWwvQm9hcmQuanMiLCIvaG9tZS9tL3dvcmsvYmF0dGxlc2hpcC5qcy9zcmMvbW9kZWwvU3F1YXJlLmpzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBOzs7OzswQkNBa0IsZUFBZTs7OztBQUVqQyxJQUFJLENBQUMsR0FBRyw2QkFBVyxDQUFDO0FBQ3BCLE9BQU8sQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDLFdBQVcsQ0FBQyxJQUFJLENBQUMsQ0FBQzs7Ozs7Ozs7Ozs7Ozs7Ozs7c0JDSGIsVUFBVTs7OztBQUU3QixJQUFJLFNBQVMsR0FBRyxFQUFFLENBQUM7O0lBRUUsS0FBSztBQUNiLFdBRFEsS0FBSyxHQUNWOzBCQURLLEtBQUs7O0FBRXRCLFFBQUksQ0FBQyxDQUFDLEdBQUcsRUFBRSxDQUFDO0FBQ1osUUFBSSxDQUFDLGtCQUFrQixFQUFFLENBQUM7R0FDM0I7O2VBSmtCLEtBQUs7O1dBTU4sOEJBQUc7OztBQUNuQixVQUFJLENBQUMsT0FBTyxHQUFHLEtBQUssQ0FBQyxLQUFLLENBQUMsQ0FBQyxFQUFFLEtBQUssQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxHQUFHLENBQUUsVUFBQyxHQUFHLEVBQUUsQ0FBQyxFQUFLO0FBQzVELGVBQU8sS0FBSyxDQUFDLEtBQUssQ0FBQyxDQUFDLEVBQUUsS0FBSyxDQUFDLE1BQUssQ0FBQyxDQUFDLENBQUMsQ0FBQyxHQUFHLENBQUUsVUFBQyxHQUFHLEVBQUUsQ0FBQyxFQUFLO0FBQ3BELGlCQUFPLHdCQUFXLE1BQUssb0JBQW9CLENBQUMsQ0FBQyxFQUFDLENBQUMsQ0FBQyxDQUFDLENBQUM7U0FDbkQsQ0FBRSxDQUFBO09BQ0os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QUksQ0FBQztBQUNqQixZQUFJLENBQUMsS0FBSyxDQUFDLEdBQUcsRUFBRSxDQUFBO0FBQ2hCLGNBQU0sQ0FBQyxHQUFHLEdBQUcsSUFBSSxDQUFDO0FBQ2xCLGNBQU0sQ0FBQyxJQUFJLEdBQUcsSUFBSSxDQUFDLEtBQUssQ0FBQyxJQUFJLENBQUM7T0FDL0I7O0FBRUQsYUFBTyxNQUFNLENBQUM7S0FDZjs7O1dBRU8sb0JBQUc7QUFDVCxVQUFLLElBQUksQ0FBQyxLQUFLLEVBQUc7QUFDaEIsZUFBTyxJQUFJLENBQUMsSUFBSSxHQUFHLEdBQUcsR0FBRyxHQUFHLENBQUM7T0FDOUIsTUFDSTtBQUNILGVBQU8sR0FBRyxDQUFDO09BQ1o7S0FDRjs7O1NBekJPLGVBQVM7QUFBRSxhQUFPLElBQUksQ0FBQyxLQUFLLENBQUE7S0FBRTtTQUM5QixhQUFDLENBQUMsRUFBTztBQUFFLFVBQUksQ0FBQyxLQUFLLEdBQUcsQ0FBQyxDQUFBO0tBQUU7OztTQUN0QixlQUFJO0FBQUUsYUFBTyxJQUFJLENBQUMsVUFBVSxDQUFBO0tBQUU7U0FDOUIsYUFBQyxDQUFDLEVBQUU7QUFBRSxVQUFJLENBQUMsVUFBVSxHQUFHLENBQUMsQ0FBQTtLQUFFOzs7U0FYckIsTUFBTTs7O3FCQUFOLE1BQU0iLCJmaWxlIjoiZ2VuZXJhdGVkLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXNDb250ZW50IjpbIihmdW5jdGlvbiBlKHQsbixyKXtmdW5jdGlvbiBzKG8sdSl7aWYoIW5bb10pe2lmKCF0W29dKXt2YXIgYT10eXBlb2YgcmVxdWlyZT09XCJmdW5jdGlvblwiJiZyZXF1aXJlO2lmKCF1JiZhKXJldHVybiBhKG8sITApO2lmKGkpcmV0dXJuIGkobywhMCk7dmFyIGY9bmV3IEVycm9yKFwiQ2Fubm90IGZpbmQgbW9kdWxlICdcIitvK1wiJ1wiKTt0aHJvdyBmLmNvZGU9XCJNT0RVTEVfTk9UX0ZPVU5EXCIsZn12YXIgbD1uW29dPXtleHBvcnRzOnt9fTt0W29dWzBdLmNhbGwobC5leHBvcnRzLGZ1bmN0aW9uKGUpe3ZhciBuPXRbb11bMV1bZV07cmV0dXJuIHMobj9uOmUpfSxsLGwuZXhwb3J0cyxlLHQsbixyKX1yZXR1cm4gbltvXS5leHBvcnRzfXZhciBpPXR5cGVvZiByZXF1aXJlPT1cImZ1bmN0aW9uXCImJnJlcXVpcmU7Zm9yKHZhciBvPTA7bzxyLmxlbmd0aDtvKyspcyhyW29dKTtyZXR1cm4gc30pIiwiaW1wb3J0IEJvYXJkIGZyb20gJy4vbW9kZWwvQm9hcmQnO1xuXG5sZXQgYiA9IG5ldyBCb2FyZCgpO1xuY29uc29sZS5sb2coYi5jb25zdHJ1Y3Rvci5uYW1lKTtcbiIsImltcG9ydCBTcXVhcmUgZnJvbSAnLi9TcXVhcmUnO1xuXG5sZXQgY2hhclN0YXJ0ID0gNjU7XG5cbmV4cG9ydCBkZWZhdWx0IGNsYXNzIEJvYXJkIHtcbiAgY29uc3RydWN0b3IoKSB7XG4gICAgdGhpcy5OID0gMTA7XG4gICAgdGhpcy5faW5pdGlhbGl6ZVNxdWFyZXMoKTtcbiAgfVxuXG4gIF9pbml0aWFsaXplU3F1YXJlcygpIHtcbiAgICB0aGlzLnNxdWFyZXMgPSBBcnJheS5hcHBseSgwLCBBcnJheSh0aGlzLk4pKS5tYXAoIChjb2wsIHgpID0+IHtcbiAgICAgIHJldHVybiBBcnJheS5hcHBseSgwLCBBcnJheSh0aGlzLk4pKS5tYXAoIChyb3csIHkpID0+IHtcbiAgICAgICAgcmV0dXJuIG5ldyBTcXVhcmUodGhpcy5zcXVhcmVOYW1lRnJvbUNvb3Jkcyh4LHkpKTtcbiAgICAgIH0gKVxuICAgIH0gKTtcbiAgfVxuXG4gIGdldFNxdWFyZShuYW1lKSB7XG4gICAgbGV0IFt4LCB5XSA9IHRoaXMuc3F1YXJlQ29vcmRzRnJvbU5hbWUobmFtZSk7XG4gICAgcmV0dXJuIHRoaXMuc3F1YXJlc1t4XVt5XTtcbiAgfVxuXG4gIGhpdChuYW1lKSB7XG4gICAgbGV0IFt4LCB5XSA9IHRoaXMuc3F1YXJlQ29vcmRzRnJvbU5hbWUobmFtZSk7XG4gICAgcmV0dXJuIHRoaXMuc3F1YXJlc1t4XVt5XS5oaXQoKTtcbiAgfVxuXG4gIG5laWdoYm91clNxdWFyZXMobmFtZSkge1xuICAgIGxldCBbeCwgeV0gPSB0aGlzLnNxdWFyZUNvb3Jkc0Zyb21OYW1lKG5hbWUpO1xuXG4gICAgbGV0IG5laWdoYm91cnMgPSBuZXcgU2V0KCk7XG4gICAgbGV0IG1vdmVtZW50cyAgPSBbXG4gICAgICBbLTEsLTFdLCBbLTEsIDBdLCBbLTEsIDFdLFxuICAgICAgWyAwLC0xXSAgICAgICAgICwgWyAwLCAxXSxcbiAgICAgIFsgMSwtMV0sIFsgMSwgMF0sIFsgMSwgMV0sXG4gICAgXTtcblxuICAgIC8vIFRyeSBhbGwgcG9zc2libGUgbW92ZW1lbnRzIGFuZCBhZGQgdGhlbSB0b1xuICAgIC8vIHRoZSBTZXQgaWYgYXJlIHdpdGhpbiB0aGUgdmFsaWQgdmFsdWVzXG4gICAgbW92ZW1lbnRzLmZvckVhY2goIG0gPT4ge1xuICAgICAgbGV0IG1YID0geCArIG1bMF07XG4gICAgICBsZXQgbVkgPSB5ICsgbVsxXTtcblxuICAgICAgaWYgKG1YID49IDAgJiYgbVggPCB0aGlzLk4gJiYgbVkgPj0gMCAmJiBtWSA8IHRoaXMuTikge1xuICAgICAgICBuZWlnaGJvdXJzLmFkZCh0aGlzLnNxdWFyZU5hbWVGcm9tQ29vcmRzKG1YLCBtWSkpO1xuICAgICAgfVxuICAgIH0gKTtcblxuICAgIHJldHVybiBuZWlnaGJvdXJzO1xuICB9XG5cbiAgLy8gVHJ5IHRvIHB1dCBhIHNoaXAgZnJvbSBpbml0aWFsIHNxdWFyZSBpblxuICAvLyBob3Jpem9udGFsL3ZlcnRpY2FsIGRpcmVjdGlvbi5cbiAgLy8gUmV0dXJucyBmYWxzZSBpZiBhbnkgc3F1YXJlIGlzIHVuYXZhaWxhYmxlXG4gIHB1dFNoaXBBdChzaGlwLCBzcXVhcmUsIHZlcnRpY2FsPWZhbHNlKSB7XG4gICAgbGV0IHNxdWFyZXMgPSB0aGlzLl9jaGVja1NxdWFyZXMoc3F1YXJlLCBzaGlwLnNpemUsIHZlcnRpY2FsKTtcblxuICAgIGlmIChzcXVhcmVzKSB7XG4gICAgICAvLyBEaXNhYmxlIHNoaXAgc3F1YXJlcyBhbmQgYWRqYWNlbnQgb25lc1xuICAgICAgc3F1YXJlcy5mb3JFYWNoKCBzID0+IHtcbiAgICAgICAgcy5zaGlwID0gc2hpcDtcbiAgICAgICAgcy5hdmFpbGFibGUgPSBmYWxzZTtcbiAgICAgICAgdGhpcy5uZWlnaGJvdXJTcXVhcmVzKHMubmFtZSkuZm9yRWFjaCggbiA9PiB7XG4gICAgICAgICAgbGV0IFt4LCB5XSA9IHRoaXMuc3F1YXJlQ29vcmRzRnJvbU5hbWUobik7XG4gICAgICAgICAgdGhpcy5zcXVhcmVzW3hdW3ldLmF2YWlsYWJsZSA9IGZhbHNlO1xuICAgICAgICB9ICk7XG4gICAgICB9ICk7XG5cbiAgICAgIHJldHVybiB0cnVlO1xuICAgIH1cbiAgICBlbHNlIHtcbiAgICAgIHJldHVybiBmYWxzZTtcbiAgICB9XG4gIH1cblxuICAvLyBDb252ZXJ0IFswLCAwXSB0byAnQTEnXG4gIHNxdWFyZU5hbWVGcm9tQ29vcmRzKHgsIHkpIHtcbiAgICByZXR1cm4gU3RyaW5nLmZyb21DaGFyQ29kZShjaGFyU3RhcnQgKyB4KSArIGAke3kgKyAxfWA7XG4gIH1cblxuICAvLyBDb252ZXJ0ICdBMScgdG8gWzAsIDBdXG4gIHNxdWFyZUNvb3Jkc0Zyb21OYW1lKG5hbWUpIHtcbiAgICBsZXQgWywgY2hhcmFjdGVyLCBudW1iZXJdID0gbmFtZS5tYXRjaCgvKFtBLVpdKykoXFxkKykvKTtcbiAgICByZXR1cm4gW2NoYXJhY3Rlci5jaGFyQ29kZUF0KDApIC0gY2hhclN0YXJ0LCBudW1iZXIgLTFdO1xuICB9XG5cbiAgdG9TdHJpbmcoKSB7XG4gICAgbGV0IHN0cmluZyA9ICcnO1xuXG4gICAgdGhpcy5zcXVhcmVzLmZvckVhY2goIGNvbCA9PiB7XG4gICAgICBjb2wuZm9yRWFjaCggc3F1YXJlID0+IHtcbiAgICAgICAgc3RyaW5nICs9IHNxdWFyZS50b1N0cmluZygpO1xuICAgICAgfSk7XG4gICAgICBzdHJpbmcgKz0gXCJcXG5cIjtcbiAgICB9KTtcblxuICAgIHJldHVybiBzdHJpbmcuc3Vic3RyaW5nKDAsIHN0cmluZy5sZW5ndGggLSAxKTs7XG4gIH1cblxuICAvLyBSZXR1cm4gYW4gYXJyYXkgb2YgJ3NpemUnIGF2YWlsYWJsZSBzcXVhcmVzIGluXG4gIC8vIGhvcml6b250YWwvdmVydGljYWwgZGlyZWN0aW9uLlxuICAvLyBSZXR1cm5zIGZhbHNlIGlmIGFueSBzcXVhcmUgaXMgdW5hdmFpbGFibGVcbiAgX2NoZWNrU3F1YXJlcyhmcm9tLCBzaXplLCB2ZXJ0aWNhbD1mYWxzZSkge1xuICAgIGxldCBbeCAseV0gPSB0aGlzLnNxdWFyZUNvb3Jkc0Zyb21OYW1lKGZyb20pO1xuICAgIGxldCB4RGlmZiA9IHZlcnRpY2FsID8gMSA6IDA7XG4gICAgbGV0IHlEaWZmID0gdmVydGljYWwgPyAwIDogMTtcbiAgICBsZXQgc3F1YXJlcyA9IG5ldyBBcnJheShzaXplKTtcblxuICAgIC8vIENoZWNrIGlmIGFsbCB0aGUgc3F1YXJlcyBhcmUgYXZhaWxhYmxlXG4gICAgZm9yIChsZXQgaT0wOyBpIDwgc2l6ZTsgaSsrKSB7XG4gICAgICBsZXQgY3VycmVudFggPSB4ICsgeERpZmYgKiBpO1xuICAgICAgbGV0IGN1cnJlbnRZID0geSArIHlEaWZmICogaTtcblxuICAgICAgaWYgKGN1cnJlbnRYID49IDAgJiYgY3VycmVudFggPCB0aGlzLk4gJiYgY3VycmVudFkgPj0gMCAmJiBjdXJyZW50WSA8IHRoaXMuTikge1xuICAgICAgICBsZXQgY3VycmVudFNxdWFyZSA9IHRoaXMuc3F1YXJlc1tjdXJyZW50WF1bY3VycmVudFldO1xuXG4gICAgICAgIGlmIChjdXJyZW50U3F1YXJlLmF2YWlsYWJsZSA9PSB0cnVlKSB7XG4gICAgICAgICAgc3F1YXJlc1tpXSA9IGN1cnJlbnRTcXVhcmU7XG4gICAgICAgIH1cbiAgICAgICAgZWxzZSB7XG4gICAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgICAgICB9XG4gICAgICB9XG4gICAgICBlbHNlIHtcbiAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgICAgfVxuICAgIH1cblxuICAgIHJldHVybiBzcXVhcmVzO1xuICB9XG59XG4iLCJleHBvcnQgZGVmYXVsdCBjbGFzcyBTcXVhcmUge1xuICBjb25zdHJ1Y3RvcihuYW1lKSB7XG4gICAgdGhpcy5uYW1lICAgICAgID0gbmFtZTtcbiAgICB0aGlzLl9zaGlwICAgICAgPSB1bmRlZmluZWQ7XG4gICAgdGhpcy5fYXZhaWxhYmxlID0gdHJ1ZTtcbiAgICB0aGlzLl9oaXQgICAgICAgPSBmYWxzZTtcbiAgfVxuXG4gIGdldCBzaGlwKCkgICAgICAgeyByZXR1cm4gdGhpcy5fc2hpcCB9XG4gIHNldCBzaGlwKHYpICAgICAgeyB0aGlzLl9zaGlwID0gdiB9XG4gIGdldCBhdmFpbGFibGUoKSAgeyByZXR1cm4gdGhpcy5fYXZhaWxhYmxlIH1cbiAgc2V0IGF2YWlsYWJsZSh2KSB7IHRoaXMuX2F2YWlsYWJsZSA9IHYgfVxuXG4gIHNob3QoKSB7XG4gICAgbGV0IHJlc3VsdCA9IHsgaGl0OiBmYWxzZSwgc3VuazogZmFsc2UgfTtcbiAgICAvLyBJZiB0aGUgU3F1YXJlIGlzIGFscmVhZHkgaGl0LCByZXR1cm4gYSBtaXNzXG4gICAgaWYgKCF0aGlzLl9oaXQgJiYgdGhpcy5fc2hpcCkge1xuICAgICAgdGhpcy5faGl0ID0gdHJ1ZTtcbiAgICAgIHRoaXMuX3NoaXAuaGl0KClcbiAgICAgIHJlc3VsdC5oaXQgPSB0cnVlO1xuICAgICAgcmVzdWx0LnN1bmsgPSB0aGlzLl9zaGlwLnN1bms7XG4gICAgfVxuXG4gICAgcmV0dXJuIHJlc3VsdDtcbiAgfVxuXG4gIHRvU3RyaW5nKCkge1xuICAgIGlmICggdGhpcy5fc2hpcCApIHtcbiAgICAgIHJldHVybiB0aGlzLl9oaXQgPyAnWCcgOiAnIyc7XG4gICAgfVxuICAgIGVsc2Uge1xuICAgICAgcmV0dXJuICcwJztcbiAgICB9XG4gIH1cbn1cbiJdfQ==
