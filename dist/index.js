'use strict';

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

var _modelBoard = require('./model/Board');

var _modelBoard2 = _interopRequireDefault(_modelBoard);

var _prompt = require('prompt');

var _prompt2 = _interopRequireDefault(_prompt);

var b = new _modelBoard2['default'](5, 4, 4);

_prompt2['default'].start();

var ask = function ask() {
  _prompt2['default'].get(['command'], function (err, result) {
    if (result.command != 'EXIT') {
      var shot = b.shot(result.command);

      if (shot) {
        if (shot.sunk) {
          console.log('Sunk!');
        } else if (shot.hit) {
          console.log('Hit!');
        } else {
          console.log('Miss!');
        }
        if (!b.finished()) {
          ask();
        }
      } else {
        console.log('Enter a valid location');
      }
    }
  });
};

ask();