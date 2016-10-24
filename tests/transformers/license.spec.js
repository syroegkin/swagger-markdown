const expect = require('chai').expect;
const transformLicense = require('../../app/transformers/license');

describe('License field', () => {
  it('should not create header if information is not provided', () => {
    const fixture = {
      license: {}
    };
    const res = transformLicense(fixture.license);
    expect(res).to.be.equal(null);
  });
  it('should create license as link with name', () => {
    const fixture = {
      license: {
        name: 'Apache 2.0',
        url: 'http://www.apache.org/licenses/LICENSE-2.0.html'
      }
    };
    const res = transformLicense(fixture.license);
    const result = `**License:** [${fixture.license.name}]`
      + `(${fixture.license.url})\n`;
    expect(res).to.be.equal(result);
  });
  it('should create license name as text if ony one field is available', () => {
    const fixture = {
      license: {
        name: 'Apache 2.0'
      }
    };
    const res = transformLicense(fixture.license);
    const result = `**License:** ${fixture.license.name}\n`;
    expect(res).to.be.equal(result);
  });
  it('should create license url as text if ony one field is available', () => {
    const fixture = {
      license: {
        url: 'http://www.apache.org/licenses/LICENSE-2.0.html'
      }
    };
    const res = transformLicense(fixture.license);
    const result = `**License:** ${fixture.license.url}\n`;
    expect(res).to.be.equal(result);
  });
});
