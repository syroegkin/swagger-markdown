const expect = require('chai').expect;
const inArray = require('../../app/lib/inArray');

describe('InArray function', () => {
  it('should return false if no data provided', () => {
    expect(inArray()).to.be.equal(false);
  });

  it('should found element in the haystack', () => {
    expect(inArray('a', ['a', 'b'])).to.be.equal(true);
    expect(inArray('a', ['a'])).to.be.equal(true);
    expect(inArray('cdscksdcksdcposdkcosdpcksdpockscsdockspdo',
      ['asd', 'asdsa', 'cdscksdcksdcposdkcosdpcksdpockscsdockspdo']
    )).to.be.equal(true);
  });

  it('should not found element in the haystack', () => {
    expect(inArray('', ['a', 'b'])).to.be.equal(false);
    expect(inArray(null, ['a', 'b'])).to.be.equal(false);
    expect(inArray(undefined, ['a', 'b'])).to.be.equal(false);
    expect(inArray('a', { a: 'a', b: 'b' })).to.be.equal(false);
  });
});
