import { expect } from 'chai';
import { textEscape } from '../../src/lib/textEscape';

const fixture = [
  ['I am \\ an arm', 'I am \\\\ an arm'],
  ['I love boogie | funk', 'I love boogie \\| funk'],
];

describe('escape function', () => {
  it('should escape special strings characters', () => {
    fixture.forEach((issue) => {
      expect(textEscape(issue[0])).to.be.equal(issue[1]);
    });
  });
});
