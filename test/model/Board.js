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

  it('computes the neighbours of a square', () => {
    let b = new Board();

    let neighboursA1 = b.neighbourSquares('A1');

    assert.equal(neighboursA1.size, 3);
    assert.ok(neighboursA1.has('A2'));
    assert.ok(neighboursA1.has('B2'));
    assert.ok(neighboursA1.has('B1'));
    assert.notOk(neighboursA1.has('A3'));

    let neighboursD4 = b.neighbourSquares('D4');

    assert.equal(neighboursD4.size, 8);
    assert.ok(neighboursD4.has('C3'));
    assert.ok(neighboursD4.has('C4'));
    assert.ok(neighboursD4.has('C5'));
    assert.ok(neighboursD4.has('D3'));
    assert.ok(neighboursD4.has('D5'));
    assert.ok(neighboursD4.has('E3'));
    assert.ok(neighboursD4.has('E4'));
    assert.ok(neighboursD4.has('E5'));
  });
});
