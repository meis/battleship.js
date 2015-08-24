import Ship     from '../../src/model/Ship';
import {assert} from 'chai';

describe('Ship', () => {
  it('is an actual class', () => {
    let s = new Ship(4);

    assert.equal(s.constructor.name, 'Ship');
  });

  it('provides initial values', () => {
    let s = new Ship(4);

    assert.equal(s.size, 4);
  });

  it('sinks if hit enough times', () => {
    let s = new Ship(4);

    assert.equal(s.size, 4);
    assert.notOk(s.sunk);

    s.hit()
    assert.notOk(s.sunk);
    s.hit()
    assert.notOk(s.sunk);
    s.hit()
    assert.notOk(s.sunk);
    s.hit()
    assert.ok(s.sunk);
  });
});
