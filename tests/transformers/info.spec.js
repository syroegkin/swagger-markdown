const expect = require('chai').expect;
const infoTrasformer = require('../../app/transformers/info');

describe('Info transformer', () => {
  it('should create title if title is listed', () => {
    const fixture = {
      title: 'Doc title'
    };
    const results = {
      underline: '========='
    };

    const res = infoTrasformer(fixture).split('\n');
    expect(res[0]).to.be.equal(fixture.title);
    // Underline is same length as a title
    expect(res[1]).to.be.equal(results.underline);
  });

  it('should return description as is', () => {
    const fixture = {
      description: 'Here is a description'
    };
    const res = infoTrasformer(fixture);
    expect(res).to.be.equal(fixture.description);
  });

  it('should return proper doc generated for the title and description', () => {
    const fixture = {
      title: 'Document title',
      description: 'Document description',
      version: '1.0.1'
    };
    const result = 'Document title\n' +
      '==============\n' +
      'Document description\n' +
      '**Version** 1.0.1';
    const res = infoTrasformer(fixture);
    expect(res).to.be.equal(result);
  });

  it('should return empty string if nothing was passed', () => {
    expect(infoTrasformer({})).to.be.equal(null);
    expect(infoTrasformer()).to.be.equal(null);
  });
});
