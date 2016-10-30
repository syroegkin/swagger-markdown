const expect = require('chai').expect;
const transformExternalDocs = require('../../app/transformers/externalDocs');

const fixture = {
  notext: {
    source: {
      url: 'http://google.com'
    },
    result: '[Find more info here](http://google.com)'
  },
  full: {
    source: {
      url: 'http://yahoo.com',
      description: 'RTFM'
    },
    result: '[RTFM](http://yahoo.com)'
  }
};

describe('External docs', () => {
  it('Should return empty string if empty object  has been provided', () => {
    const result = transformExternalDocs({});
    expect(result).to.be.equal(null);
  });
  it('should return default text link if no text has been provided', () => {
    const result = transformExternalDocs(fixture.notext.source);
    expect(result).to.be.equal(fixture.notext.result);
  });
  it('should return description and link if both are set', () => {
    const result = transformExternalDocs(fixture.full.source);
    expect(result).to.be.equal(fixture.full.result);
  });
});
