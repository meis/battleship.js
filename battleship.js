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
  this.ship = undefined;
  this.available = true;
};

exports["default"] = Square;
module.exports = exports["default"];

},{}]},{},[1])
//# sourceMappingURL=data:application/json;charset:utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm5vZGVfbW9kdWxlcy9icm93c2VyaWZ5L25vZGVfbW9kdWxlcy9icm93c2VyLXBhY2svX3ByZWx1ZGUuanMiLCIvaG9tZS9tL3dvcmsvYmF0dGxlc2hpcC5qcy9zcmMvaW5kZXguanMiLCIvaG9tZS9tL3dvcmsvYmF0dGxlc2hpcC5qcy9zcmMvbW9kZWwvQm9hcmQuanMiLCIvaG9tZS9tL3dvcmsvYmF0dGxlc2hpcC5qcy9zcmMvbW9kZWwvU3F1YXJlLmpzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBOzs7OzswQkNBa0IsZUFBZTs7OztBQUVqQyxJQUFJLENBQUMsR0FBRyw2QkFBVyxDQUFDO0FBQ3BCLE9BQU8sQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDLFdBQVcsQ0FBQyxJQUFJLENBQUMsQ0FBQzs7Ozs7Ozs7Ozs7Ozs7Ozs7c0JDSGIsVUFBVTs7OztBQUU3QixJQUFJLFNBQVMsR0FBRyxFQUFFLENBQUM7O0lBRUUsS0FBSztBQUNiLFdBRFEsS0FBSyxHQUNWOzBCQURLLEtBQUs7O0FBRXRCLFFBQUksQ0FBQyxDQUFDLEdBQUcsRUFBRSxDQUFDO0FBQ1osUUFBSSxDQUFDLGtCQUFrQixFQUFFLENBQUM7R0FDM0I7O2VBSmtCLEtBQUs7O1dBTU4sOEJBQUc7OztBQUNuQixVQUFJLENBQUMsT0FBTyxHQUFHLEtBQUssQ0FBQyxLQUFLLENBQUMsQ0FBQyxFQUFFLEtBQUssQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxHQUFHLENBQUUsVUFBQyxHQUFHLEVBQUUsQ0FBQyxFQUFLO0FBQzVELGVBQU8sS0FBSyxDQUFDLEtBQUssQ0FBQyxDQUFDLEVBQUUsS0FBSyxDQUFDLE1BQUssQ0FBQyxDQUFDLENBQUMsQ0FBQyxHQUFHLENBQUUsVUFBQyxHQUFHLEVBQUUsQ0FBQyxFQUFLO0FBQ3BELGlCQUFPLHdCQUFXLE1BQUssb0JBQW9CLENBQUMsQ0FBQyxFQUFDLENBQUMsQ0FBQyxDQUFDLENBQUM7U0FDbkQsQ0FBRSxDQUFBO09BQ0osQ0FBRSxDQUFDO0tBQ0w7OztXQUVRLG1CQUFDLElBQUksRUFBRTtrQ0FDRCxJQUFJLENBQUMsb0JBQW9CLENBQUMsSUFBSSxDQUFDOzs7O1VBQXZDLENBQUM7VUFBRSxDQUFDOztBQUNULGFBQU8sSUFBSSxDQUFDLE9BQU8sQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQztLQUMzQjs7O1dBRWUsMEJBQUMsSUFBSSxFQUFFOzs7bUNBQ1IsSUFBSSxDQUFDLG9CQUFvQixDQUFDLElBQUksQ0FBQzs7OztVQUF2QyxDQUFDO1VBQUUsQ0FBQzs7QUFFVCxVQUFJLFVBQVUsR0FBRyxJQUFJLEdBQUcsRUFBRSxDQUFDO0FBQzNCLFVBQUksU0FBUyxHQUFJLENBQ2YsQ0FBQyxDQUFDLENBQUMsRUFBQyxDQUFDLENBQUMsQ0FBQyxFQUFFLENBQUMsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxDQUFDLENBQUMsRUFBRSxDQUFDLENBQUMsRUFDekIsQ0FBRSxDQUFDLEVBQUMsQ0FBQyxDQUFDLENBQUMsRUFBVyxDQUFFLENBQUMsRUFBRSxDQUFDLENBQUMsRUFDekIsQ0FBRSxDQUFDLEVBQUMsQ0FBQyxDQUFDLENBQUMsRUFBRSxDQUFFLENBQUMsRUFBRSxDQUFDLENBQUMsRUFBRSxDQUFFLENBQUMsRUFBRSxDQUFDLENBQUMsQ0FDMUIsQ0FBQzs7OztBQUlGLGVBQVMsQ0FBQyxPQUFPLENBQUUsVUFBQSxDQUFDLEVBQUk7QUFDdEIsWUFBSSxFQUFFLEdBQUcsQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQztBQUNsQixZQUFJLEVBQUUsR0FBRyxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDOztBQUVsQixZQUFJLEVBQUUsSUFBSSxDQUFDLElBQUksRUFBRSxHQUFHLE9BQUssQ0FBQyxJQUFJLEVBQUUsSUFBSSxDQUFDLElBQUksRUFBRSxHQUFHLE9BQUssQ0FBQyxFQUFFO0FBQ3BELG9CQUFVLENBQUMsR0FBRyxDQUFDLE9BQUssb0JBQW9CLENBQUMsRUFBRSxFQUFFLEVBQUUsQ0FBQyxDQUFDLENBQUM7U0FDbkQ7T0FDRixDQUFFLENBQUM7O0FBRUosYUFBTyxVQUFVLENBQUM7S0FDbkI7Ozs7O1dBR21CLDhCQUFDLENBQUMsRUFBRSxDQUFDLEVBQUU7QUFDekIsYUFBTyxNQUFNLENBQUMsWUFBWSxDQUFDLFNBQVMsR0FBRyxDQUFDLENBQUMsVUFBTSxDQUFDLEdBQUcsQ0FBQyxDQUFBLENBQUUsQ0FBQztLQUN4RDs7Ozs7V0FHbUIsOEJBQUMsSUFBSSxFQUFFO3dCQUNHLElBQUksQ0FBQyxLQUFLLENBQUMsZUFBZSxDQUFDOzs7O1VBQWhELFNBQVM7VUFBRSxNQUFNOztBQUN4QixhQUFPLENBQUMsU0FBUyxDQUFDLFVBQVUsQ0FBQyxDQUFDLENBQUMsR0FBRyxTQUFTLEVBQUUsTUFBTSxHQUFFLENBQUMsQ0FBQyxDQUFDO0tBQ3pEOzs7U0FwRGtCLEtBQUs7OztxQkFBTCxLQUFLOzs7Ozs7Ozs7Ozs7SUNKTCxNQUFNLEdBQ2QsU0FEUSxNQUFNLENBQ2IsSUFBSSxFQUFFO3dCQURDLE1BQU07O0FBRXZCLE1BQUksQ0FBQyxJQUFJLEdBQUcsSUFBSSxDQUFDO0FBQ2pCLE1BQUksQ0FBQyxJQUFJLEdBQUcsU0FBUyxDQUFDO0FBQ3RCLE1BQUksQ0FBQyxTQUFTLEdBQUcsSUFBSSxDQUFDO0NBQ3ZCOztxQkFMa0IsTUFBTSIsImZpbGUiOiJnZW5lcmF0ZWQuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlc0NvbnRlbnQiOlsiKGZ1bmN0aW9uIGUodCxuLHIpe2Z1bmN0aW9uIHMobyx1KXtpZighbltvXSl7aWYoIXRbb10pe3ZhciBhPXR5cGVvZiByZXF1aXJlPT1cImZ1bmN0aW9uXCImJnJlcXVpcmU7aWYoIXUmJmEpcmV0dXJuIGEobywhMCk7aWYoaSlyZXR1cm4gaShvLCEwKTt2YXIgZj1uZXcgRXJyb3IoXCJDYW5ub3QgZmluZCBtb2R1bGUgJ1wiK28rXCInXCIpO3Rocm93IGYuY29kZT1cIk1PRFVMRV9OT1RfRk9VTkRcIixmfXZhciBsPW5bb109e2V4cG9ydHM6e319O3Rbb11bMF0uY2FsbChsLmV4cG9ydHMsZnVuY3Rpb24oZSl7dmFyIG49dFtvXVsxXVtlXTtyZXR1cm4gcyhuP246ZSl9LGwsbC5leHBvcnRzLGUsdCxuLHIpfXJldHVybiBuW29dLmV4cG9ydHN9dmFyIGk9dHlwZW9mIHJlcXVpcmU9PVwiZnVuY3Rpb25cIiYmcmVxdWlyZTtmb3IodmFyIG89MDtvPHIubGVuZ3RoO28rKylzKHJbb10pO3JldHVybiBzfSkiLCJpbXBvcnQgQm9hcmQgZnJvbSAnLi9tb2RlbC9Cb2FyZCc7XG5cbmxldCBiID0gbmV3IEJvYXJkKCk7XG5jb25zb2xlLmxvZyhiLmNvbnN0cnVjdG9yLm5hbWUpO1xuIiwiaW1wb3J0IFNxdWFyZSBmcm9tICcuL1NxdWFyZSc7XG5cbmxldCBjaGFyU3RhcnQgPSA2NTtcblxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgQm9hcmQge1xuICBjb25zdHJ1Y3RvcigpIHtcbiAgICB0aGlzLk4gPSAxMDtcbiAgICB0aGlzLl9pbml0aWFsaXplU3F1YXJlcygpO1xuICB9XG5cbiAgX2luaXRpYWxpemVTcXVhcmVzKCkge1xuICAgIHRoaXMuc3F1YXJlcyA9IEFycmF5LmFwcGx5KDAsIEFycmF5KHRoaXMuTikpLm1hcCggKGNvbCwgeCkgPT4ge1xuICAgICAgcmV0dXJuIEFycmF5LmFwcGx5KDAsIEFycmF5KHRoaXMuTikpLm1hcCggKHJvdywgeSkgPT4ge1xuICAgICAgICByZXR1cm4gbmV3IFNxdWFyZSh0aGlzLnNxdWFyZU5hbWVGcm9tQ29vcmRzKHgseSkpO1xuICAgICAgfSApXG4gICAgfSApO1xuICB9XG5cbiAgZ2V0U3F1YXJlKG5hbWUpIHtcbiAgICBsZXQgW3gsIHldID0gdGhpcy5zcXVhcmVDb29yZHNGcm9tTmFtZShuYW1lKTtcbiAgICByZXR1cm4gdGhpcy5zcXVhcmVzW3hdW3ldO1xuICB9XG5cbiAgbmVpZ2hib3VyU3F1YXJlcyhuYW1lKSB7XG4gICAgbGV0IFt4LCB5XSA9IHRoaXMuc3F1YXJlQ29vcmRzRnJvbU5hbWUobmFtZSk7XG5cbiAgICBsZXQgbmVpZ2hib3VycyA9IG5ldyBTZXQoKTtcbiAgICBsZXQgbW92ZW1lbnRzICA9IFtcbiAgICAgIFstMSwtMV0sIFstMSwgMF0sIFstMSwgMV0sXG4gICAgICBbIDAsLTFdICAgICAgICAgLCBbIDAsIDFdLFxuICAgICAgWyAxLC0xXSwgWyAxLCAwXSwgWyAxLCAxXSxcbiAgICBdO1xuXG4gICAgLy8gVHJ5IGFsbCBwb3NzaWJsZSBtb3ZlbWVudHMgYW5kIGFkZCB0aGVtIHRvXG4gICAgLy8gdGhlIFNldCBpZiBhcmUgd2l0aGluIHRoZSB2YWxpZCB2YWx1ZXNcbiAgICBtb3ZlbWVudHMuZm9yRWFjaCggbSA9PiB7XG4gICAgICBsZXQgbVggPSB4ICsgbVswXTtcbiAgICAgIGxldCBtWSA9IHkgKyBtWzFdO1xuXG4gICAgICBpZiAobVggPj0gMCAmJiBtWCA8IHRoaXMuTiAmJiBtWSA+PSAwICYmIG1ZIDwgdGhpcy5OKSB7XG4gICAgICAgIG5laWdoYm91cnMuYWRkKHRoaXMuc3F1YXJlTmFtZUZyb21Db29yZHMobVgsIG1ZKSk7XG4gICAgICB9XG4gICAgfSApO1xuXG4gICAgcmV0dXJuIG5laWdoYm91cnM7XG4gIH1cblxuICAvLyBDb252ZXJ0IFswLCAwXSB0byAnQTEnXG4gIHNxdWFyZU5hbWVGcm9tQ29vcmRzKHgsIHkpIHtcbiAgICByZXR1cm4gU3RyaW5nLmZyb21DaGFyQ29kZShjaGFyU3RhcnQgKyB4KSArIGAke3kgKyAxfWA7XG4gIH1cblxuICAvLyBDb252ZXJ0ICdBMScgdG8gWzAsIDBdXG4gIHNxdWFyZUNvb3Jkc0Zyb21OYW1lKG5hbWUpIHtcbiAgICBsZXQgWywgY2hhcmFjdGVyLCBudW1iZXJdID0gbmFtZS5tYXRjaCgvKFtBLVpdKykoXFxkKykvKTtcbiAgICByZXR1cm4gW2NoYXJhY3Rlci5jaGFyQ29kZUF0KDApIC0gY2hhclN0YXJ0LCBudW1iZXIgLTFdO1xuICB9XG59XG4iLCJleHBvcnQgZGVmYXVsdCBjbGFzcyBTcXVhcmUge1xuICBjb25zdHJ1Y3RvcihuYW1lKSB7XG4gICAgdGhpcy5uYW1lID0gbmFtZTtcbiAgICB0aGlzLnNoaXAgPSB1bmRlZmluZWQ7XG4gICAgdGhpcy5hdmFpbGFibGUgPSB0cnVlO1xuICB9XG59XG4iXX0=
