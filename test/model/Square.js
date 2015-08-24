import Square   from '../../src/model/Square';
import {assert} from 'chai';

describe('Square', () => {
  it('is an actual class', () => {
    let s = new Square('A1');

    assert.equal(s.constructor.name, 'Square');
  });

  it('provides initial values', () => {
    let s = new Square('A1');

    assert.equal(s.name, 'A1');
  });
});
