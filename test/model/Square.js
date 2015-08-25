import Square   from '../../src/model/Square';
import Ship     from '../../src/model/Ship';
import {assert} from 'chai';

describe('Square', () => {
  it('is an actual class', () => {
    let s = new Square('A1');

    assert.equal(s.constructor.name, 'Square');
  });

  it('provides initial values', () => {
    let s = new Square('A1');

    assert.equal(s.name, 'A1');
    assert.equal(s.ship, undefined);
    assert.equal(s.available, true);
  });

  it('can be shoot', () => {
    let s = new Square('A1');
    let result = s.shot();

    assert.ok(result);
    assert.notOk(result.hit);
    assert.notOk(result.sunk);
  });

  it('sunks own ships if shot', () => {
    let ship = new Ship(3);
    let a1   = new Square('A1');
    let a2   = new Square('A2');
    let a3   = new Square('A3');
    let result;

    a1.ship = ship;
    a2.ship = ship;
    a3.ship = ship;

    result = a1.shot()
    assert.ok(result.hit);
    assert.notOk(result.sunk);

    result = a2.shot()
    assert.ok(result.hit);
    assert.notOk(result.sunk);

    // Already shot squares are never a hit
    result = a1.shot()
    assert.notOk(result.hit);
    assert.notOk(result.sunk);

    result = a3.shot()
    assert.ok(result.hit);
    assert.ok(result.sunk);
  });
});
