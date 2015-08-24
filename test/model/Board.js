import Board    from '../../src/model/Board';
import Ship     from '../../src/model/Ship';
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

  it('allows putting vertical ships in', () => {
    let b    = new Board();
    let ship = new Ship(3);

    assert.ok(b.putShipAt(ship, 'D5', true));

    // Squares with ship
    assert.equal(b.getSquare('D5').ship, ship);
    assert.notOk(b.getSquare('D5').available);
    assert.equal(b.getSquare('E5').ship, ship);
    assert.notOk(b.getSquare('E5').available);
    assert.equal(b.getSquare('F5').ship, ship);
    assert.notOk(b.getSquare('F5').available);

    // Adjacent squares
    assert.equal(b.getSquare('C4').ship, undefined);
    assert.notOk(b.getSquare('C4').available);
    assert.equal(b.getSquare('C5').ship, undefined);
    assert.notOk(b.getSquare('C5').available);
    assert.equal(b.getSquare('C6').ship, undefined);
    assert.notOk(b.getSquare('C6').available);
    assert.equal(b.getSquare('D4').ship, undefined);
    assert.notOk(b.getSquare('D4').available);
    assert.equal(b.getSquare('D6').ship, undefined);
    assert.notOk(b.getSquare('D6').available);
    assert.equal(b.getSquare('E4').ship, undefined);
    assert.notOk(b.getSquare('E4').available);
    assert.equal(b.getSquare('E6').ship, undefined);
    assert.notOk(b.getSquare('E6').available);
    assert.equal(b.getSquare('F4').ship, undefined);
    assert.notOk(b.getSquare('F4').available);
    assert.equal(b.getSquare('F6').ship, undefined);
    assert.notOk(b.getSquare('F6').available);
    assert.equal(b.getSquare('G4').ship, undefined);
    assert.notOk(b.getSquare('G4').available);
    assert.equal(b.getSquare('G5').ship, undefined);
    assert.notOk(b.getSquare('G5').available);
    assert.equal(b.getSquare('G6').ship, undefined);
    assert.notOk(b.getSquare('G6').available);
  });

  it('allows putting horizontal ships in', () => {
    let b    = new Board();
    let ship = new Ship(4);

    assert.ok(b.putShipAt(ship, 'A1', false));

    // Squares with ship
    assert.equal(b.getSquare('A1').ship, ship);
    assert.notOk(b.getSquare('A1').available);
    assert.equal(b.getSquare('A2').ship, ship);
    assert.notOk(b.getSquare('A2').available);
    assert.equal(b.getSquare('A3').ship, ship);
    assert.notOk(b.getSquare('A3').available);
    assert.equal(b.getSquare('A4').ship, ship);
    assert.notOk(b.getSquare('A4').available);

    // Adjacent squares
    assert.equal(b.getSquare('B1').ship, undefined);
    assert.notOk(b.getSquare('B1').available);
    assert.equal(b.getSquare('B2').ship, undefined);
    assert.notOk(b.getSquare('B2').available);
    assert.equal(b.getSquare('B3').ship, undefined);
    assert.notOk(b.getSquare('B3').available);
    assert.equal(b.getSquare('B4').ship, undefined);
    assert.notOk(b.getSquare('B4').available);
    assert.equal(b.getSquare('B5').ship, undefined);
    assert.notOk(b.getSquare('B5').available);
    assert.equal(b.getSquare('A5').ship, undefined);
    assert.notOk(b.getSquare('A5').available);
  });

  it('returns false when trying to put ships at unavailable squares', () => {
    let b     = new Board();
    let ship1 = new Ship(4);
    let ship2 = new Ship(4);

    // Invalid positions
    assert.notOk(b.putShipAt(ship1, 'A8', false));
    assert.notOk(b.putShipAt(ship1, 'J8', false));
    assert.notOk(b.putShipAt(ship1, 'J8', true));

    assert.ok(b.putShipAt(ship1, 'C4', false));

    // Adjacent squares
    assert.notOk(b.putShipAt(ship2, 'C4', false));
    assert.notOk(b.putShipAt(ship2, 'C4', true));
    assert.notOk(b.putShipAt(ship2, 'B3', true));
    assert.notOk(b.putShipAt(ship2, 'B4', false));
    assert.notOk(b.putShipAt(ship2, 'C3', true));
    assert.notOk(b.putShipAt(ship2, 'C8', true));
  });
});
