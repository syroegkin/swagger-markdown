const expect = require('chai').expect;
const anchor = require('../../app/lib/anchor');

const fixture = [
  ['any string', 'anyString'],
  ['!_@ pe', '_Pe'],
  ['123', '123'],
  ['123may be 321', '123mayBe321'],
  [' look at /me', 'lookAtMe'],
  ['', ''],
  ['       ', ''],
  ['1234', '1234'],
  ['12 34', '1234']
];

describe('anchor function', () => {
  it('should transform strings to camel case', () => {
    fixture.forEach(issue => {
      expect(anchor(issue[0])).to.be.equal(issue[1]);
    });
  });
});
