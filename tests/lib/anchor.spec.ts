import { expect } from 'chai';
import { anchor } from '../../src/lib/anchor';

const fixture = [
  ['any string', 'any-string'],
  ['!_@ pe', '!_@-pe'],
  ['123', '123'],
  ['123may be 321', '123may-be-321'],
  [' look at /me', 'look-at-/me'],
  ['', ''],
  ['       ', ''],
  ['1234', '1234'],
  ['12 34', '12-34'],
  ['I.have.a.dot', 'ihaveadot'],
];

describe('anchor function', () => {
  it('should transform strings to camel case', () => {
    fixture.forEach((issue) => {
      expect(anchor(issue[0])).to.be.equal(issue[1]);
    });
  });
});
