import Board  from './model/Board';
import prompt from 'prompt';

let b = new Board(5, 4, 4);

prompt.message   = "";
prompt.delimiter = "";
prompt.colors    = false;
prompt.start();

let property = {
  name   : 'command',
  message: "Enter a square to shot or 'EXIT' to finish:",
}

let ask = function(board) {
  prompt.get([property], function(err, result) {
    if (result.command != 'EXIT' && result.command != 'exit') {
      if (board.validShot(result.command)) {
        let shot = board.shot(result.command);

        if (shot) {
          if (shot.sunk) {
            console.log('Hit!! The boat is sunk!'.green.bold);
          }
          else if (shot.hit) {
            console.log('You hit a boat!'.green);
          }
          else {
            console.log('Miss!'.blue);
          }
        }
      }
      else {
        console.log(`Invalid square ${result.command}. Please entry a valid one (ex: A5)`.red);
      }

      if (board.finished()) {
        console.log('You win! All ships are sunk!'.green.bold);
      }
      else {
        ask(board);
      }
    }
  });
}

ask(b);
