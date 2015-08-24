import Board    from '../../src/model/Board';
import {assert} from 'chai';

describe('Board', () => {
  it('is an actual class', () => {
    let b = new Board();
    assert.equal(b.constructor.name, 'Board');
  });
});
