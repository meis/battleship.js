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