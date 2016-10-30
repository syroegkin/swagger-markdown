const expect = require('chai').expect;
const transformInfo = require('../../app/transformers/info');

describe('Info transformer', () => {
  it('should return null if nothing was passed', () => {
    expect(transformInfo({})).to.be.equal(null);
    expect(transformInfo()).to.be.equal(null);
  });

  it('should create title if title is listed', () => {
    const fixture = {
      title: 'Doc title'
    };
    const results = {
      underline: '========='
    };

    const res = transformInfo(fixture).split('\n');
    expect(res[0]).to.be.equal(fixture.title);
    // Underline is same length as a title
    expect(res[1]).to.be.equal(results.underline);
  });

  it('should return description as is', () => {
    const fixture = {
      description: 'Here is a description'
    };
    const res = transformInfo(fixture);
    expect(res).to.be.equal(`${fixture.description}\n`);
  });

  it('should return proper doc generated for the title and description', () => {
    const fixture = {
      title: 'Document title',
      description: 'Document description',
      version: '1.0.1'
    };
    const result = 'Document title\n' +
      '==============\n' +
      'Document description\n\n' +
      '**Version:** 1.0.1\n';
    const res = transformInfo(fixture);
    expect(res).to.be.equal(result);
  });

  it('should create term of service block', () => {
    const fixture = {
      termsOfService: 'Terms of service'
    };
    const result = `**Terms of service:**  \n${fixture.termsOfService}\n`;
    const res = transformInfo(fixture);
    expect(res).to.be.equal(result);
  });
});
