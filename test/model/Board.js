import Board    from '../../src/model/Board';
import {assert} from 'chai';

describe('Board', () => {
  it('is an actual class', () => {
    let b = new Board();

    assert.equal(b.constructor.name, 'Board');
  });

  it('initializes squares', () => {
    let b = new Board();

    b.squares.forEach( col => {
      col.forEach( square => {
        assert.equal(square.constructor.name, 'Square');
      });
    });
  });

  it('provides coords -> name', () => {
    let b = new Board();

    assert.equal(b.squares[0][0].name, 'A1');
    assert.equal(b.squares[9][9].name, 'J10');
  });

  it('provides name -> coords', () => {
    let b = new Board();

    assert.equal(b.getSquare('A1').name, 'A1');
    assert.equal(b.getSquare('J10').name, 'J10');
  });
});
