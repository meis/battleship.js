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

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Square = function Square(name) {
  _classCallCheck(this, Square);

  this.name = name;
};

exports["default"] = Square;
module.exports = exports["default"];

},{}]},{},[1])
//# sourceMappingURL=data:application/json;charset:utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm5vZGVfbW9kdWxlcy9icm93c2VyaWZ5L25vZGVfbW9kdWxlcy9icm93c2VyLXBhY2svX3ByZWx1ZGUuanMiLCIvaG9tZS9tL3dvcmsvYmF0dGxlc2hpcC5qcy9zcmMvaW5kZXguanMiLCIvaG9tZS9tL3dvcmsvYmF0dGxlc2hpcC5qcy9zcmMvbW9kZWwvQm9hcmQuanMiLCIvaG9tZS9tL3dvcmsvYmF0dGxlc2hpcC5qcy9zcmMvbW9kZWwvU3F1YXJlLmpzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBOzs7OzswQkNBa0IsZUFBZTs7OztBQUVqQyxJQUFJLENBQUMsR0FBRyw2QkFBVyxDQUFDO0FBQ3BCLE9BQU8sQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDLFdBQVcsQ0FBQyxJQUFJLENBQUMsQ0FBQzs7Ozs7Ozs7Ozs7Ozs7Ozs7c0JDSGIsVUFBVTs7OztBQUU3QixJQUFJLFNBQVMsR0FBRyxFQUFFLENBQUM7O0lBRUUsS0FBSztBQUNiLFdBRFEsS0FBSyxHQUNWOzBCQURLLEtBQUs7O0FBRXRCLFFBQUksQ0FBQyxDQUFDLEdBQUcsRUFBRSxDQUFDO0FBQ1osUUFBSSxDQUFDLGtCQUFrQixFQUFFLENBQUM7R0FDM0I7O2VBSmtCLEtBQUs7O1dBTU4sOEJBQUc7OztBQUNuQixVQUFJLENBQUMsT0FBTyxHQUFHLEtBQUssQ0FBQyxLQUFLLENBQUMsQ0FBQyxFQUFFLEtBQUssQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxHQUFHLENBQUUsVUFBQyxHQUFHLEVBQUUsQ0FBQyxFQUFLO0FBQzVELGVBQU8sS0FBSyxDQUFDLEtBQUssQ0FBQyxDQUFDLEVBQUUsS0FBSyxDQUFDLE1BQUssQ0FBQyxDQUFDLENBQUMsQ0FBQyxHQUFHLENBQUUsVUFBQyxHQUFHLEVBQUUsQ0FBQyxFQUFLO0FBQ3BELGlCQUFPLHdCQUFXLE1BQUssb0JBQW9CLENBQUMsQ0FBQyxFQUFDLENBQUMsQ0FBQyxDQUFDLENBQUM7U0FDbkQsQ0FBRSxDQUFBO09BQ0osQ0FBRSxDQUFDO0tBQ0w7OztXQUVRLG1CQUFDLElBQUksRUFBRTtrQ0FDRCxJQUFJLENBQUMsb0JBQW9CLENBQUMsSUFBSSxDQUFDOzs7O1VBQXZDLENBQUM7VUFBRSxDQUFDOztBQUNULGFBQU8sSUFBSSxDQUFDLE9BQU8sQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQztLQUMzQjs7Ozs7V0FHbUIsOEJBQUMsQ0FBQyxFQUFFLENBQUMsRUFBRTtBQUN6QixhQUFPLE1BQU0sQ0FBQyxZQUFZLENBQUMsU0FBUyxHQUFHLENBQUMsQ0FBQyxVQUFNLENBQUMsR0FBRyxDQUFDLENBQUEsQ0FBRSxDQUFDO0tBQ3hEOzs7OztXQUdtQiw4QkFBQyxJQUFJLEVBQUU7d0JBQ0csSUFBSSxDQUFDLEtBQUssQ0FBQyxlQUFlLENBQUM7Ozs7VUFBaEQsU0FBUztVQUFFLE1BQU07O0FBQ3hCLGFBQU8sQ0FBQyxTQUFTLENBQUMsVUFBVSxDQUFDLENBQUMsQ0FBQyxHQUFHLFNBQVMsRUFBRSxNQUFNLEdBQUUsQ0FBQyxDQUFDLENBQUM7S0FDekQ7OztTQTVCa0IsS0FBSzs7O3FCQUFMLEtBQUs7Ozs7Ozs7Ozs7OztJQ0pMLE1BQU0sR0FDZCxTQURRLE1BQU0sQ0FDYixJQUFJLEVBQUU7d0JBREMsTUFBTTs7QUFFdkIsTUFBSSxDQUFDLElBQUksR0FBRyxJQUFJLENBQUM7Q0FDbEI7O3FCQUhrQixNQUFNIiwiZmlsZSI6ImdlbmVyYXRlZC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzQ29udGVudCI6WyIoZnVuY3Rpb24gZSh0LG4scil7ZnVuY3Rpb24gcyhvLHUpe2lmKCFuW29dKXtpZighdFtvXSl7dmFyIGE9dHlwZW9mIHJlcXVpcmU9PVwiZnVuY3Rpb25cIiYmcmVxdWlyZTtpZighdSYmYSlyZXR1cm4gYShvLCEwKTtpZihpKXJldHVybiBpKG8sITApO3ZhciBmPW5ldyBFcnJvcihcIkNhbm5vdCBmaW5kIG1vZHVsZSAnXCIrbytcIidcIik7dGhyb3cgZi5jb2RlPVwiTU9EVUxFX05PVF9GT1VORFwiLGZ9dmFyIGw9bltvXT17ZXhwb3J0czp7fX07dFtvXVswXS5jYWxsKGwuZXhwb3J0cyxmdW5jdGlvbihlKXt2YXIgbj10W29dWzFdW2VdO3JldHVybiBzKG4/bjplKX0sbCxsLmV4cG9ydHMsZSx0LG4scil9cmV0dXJuIG5bb10uZXhwb3J0c312YXIgaT10eXBlb2YgcmVxdWlyZT09XCJmdW5jdGlvblwiJiZyZXF1aXJlO2Zvcih2YXIgbz0wO288ci5sZW5ndGg7bysrKXMocltvXSk7cmV0dXJuIHN9KSIsImltcG9ydCBCb2FyZCBmcm9tICcuL21vZGVsL0JvYXJkJztcblxubGV0IGIgPSBuZXcgQm9hcmQoKTtcbmNvbnNvbGUubG9nKGIuY29uc3RydWN0b3IubmFtZSk7XG4iLCJpbXBvcnQgU3F1YXJlIGZyb20gJy4vU3F1YXJlJztcblxubGV0IGNoYXJTdGFydCA9IDY1O1xuXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBCb2FyZCB7XG4gIGNvbnN0cnVjdG9yKCkge1xuICAgIHRoaXMuTiA9IDEwO1xuICAgIHRoaXMuX2luaXRpYWxpemVTcXVhcmVzKCk7XG4gIH1cblxuICBfaW5pdGlhbGl6ZVNxdWFyZXMoKSB7XG4gICAgdGhpcy5zcXVhcmVzID0gQXJyYXkuYXBwbHkoMCwgQXJyYXkodGhpcy5OKSkubWFwKCAoY29sLCB4KSA9PiB7XG4gICAgICByZXR1cm4gQXJyYXkuYXBwbHkoMCwgQXJyYXkodGhpcy5OKSkubWFwKCAocm93LCB5KSA9PiB7XG4gICAgICAgIHJldHVybiBuZXcgU3F1YXJlKHRoaXMuc3F1YXJlTmFtZUZyb21Db29yZHMoeCx5KSk7XG4gICAgICB9IClcbiAgICB9ICk7XG4gIH1cblxuICBnZXRTcXVhcmUobmFtZSkge1xuICAgIGxldCBbeCwgeV0gPSB0aGlzLnNxdWFyZUNvb3Jkc0Zyb21OYW1lKG5hbWUpO1xuICAgIHJldHVybiB0aGlzLnNxdWFyZXNbeF1beV07XG4gIH1cblxuICAvLyBDb252ZXJ0IFswLCAwXSB0byAnQTEnXG4gIHNxdWFyZU5hbWVGcm9tQ29vcmRzKHgsIHkpIHtcbiAgICByZXR1cm4gU3RyaW5nLmZyb21DaGFyQ29kZShjaGFyU3RhcnQgKyB4KSArIGAke3kgKyAxfWA7XG4gIH1cblxuICAvLyBDb252ZXJ0ICdBMScgdG8gWzAsIDBdXG4gIHNxdWFyZUNvb3Jkc0Zyb21OYW1lKG5hbWUpIHtcbiAgICBsZXQgWywgY2hhcmFjdGVyLCBudW1iZXJdID0gbmFtZS5tYXRjaCgvKFtBLVpdKykoXFxkKykvKTtcbiAgICByZXR1cm4gW2NoYXJhY3Rlci5jaGFyQ29kZUF0KDApIC0gY2hhclN0YXJ0LCBudW1iZXIgLTFdO1xuICB9XG59XG4iLCJleHBvcnQgZGVmYXVsdCBjbGFzcyBTcXVhcmUge1xuICBjb25zdHJ1Y3RvcihuYW1lKSB7XG4gICAgdGhpcy5uYW1lID0gbmFtZTtcbiAgfVxufVxuIl19
