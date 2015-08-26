'use strict';

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

var _modelBoard = require('./model/Board');

var _modelBoard2 = _interopRequireDefault(_modelBoard);

var _prompt = require('prompt');

var _prompt2 = _interopRequireDefault(_prompt);

var b = new _modelBoard2['default'](5, 4, 4);

_prompt2['default'].message = "";
_prompt2['default'].delimiter = "";
_prompt2['default'].colors = false;
_prompt2['default'].start();

var property = {
  name: 'command',
  message: "Enter a square to shot or 'EXIT' to finish:"
};

var ask = function ask(board) {
  _prompt2['default'].get([property], function (err, result) {
    if (result.command != 'EXIT' && result.command != 'exit') {
      if (board.validShot(result.command)) {
        var shot = board.shot(result.command);

        if (shot) {
          if (shot.sunk) {
            console.log('Hit!! The boat is sunk!'.green.bold);
          } else if (shot.hit) {
            console.log('You hit a boat!'.green);
          } else {
            console.log('Miss!'.blue);
          }
        }
      } else {
        console.log(('Invalid square ' + result.command + '. Please entry a valid one (ex: A5)').red);
      }

      if (board.finished()) {
        console.log('You win! All ships are sunk!'.green.bold);
      } else {
        ask(board);
      }
    }
  });
};

ask(b);