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
      '**Version** 1.0.1\n';
    const res = transformInfo(fixture);
    expect(res).to.be.equal(result);
  });

  it('should create term of service block', () => {
    const fixture = {
      termsOfService: 'Terms of service'
    };
    const result = `**Terms of service**  \n${fixture.termsOfService}\n`;
    const res = transformInfo(fixture);
    expect(res).to.be.equal(result);
  });

  describe('Contact info', () => {
    it('should create contact info with all fields', () => {
      const fixture = {
        contact: {
          name: 'API Support',
          url: 'http://www.swagger.io/support',
          email: 'support@swagger.io'
        }
      };
      const res = transformInfo(fixture);
      const result = '**Contact information**  \n'
        + `${fixture.contact.name}  \n`
        + `${fixture.contact.url}  \n`
        + `${fixture.contact.email}  `;
      expect(res).to.be.equal(result);
    });
    it('should create only these fields which are provided', () => {
      const fixture = {
        contact: {
          url: 'http://www.swagger.io/support'
        }
      };
      const res = transformInfo(fixture);
      const result = '**Contact information**  \n'
        + `${fixture.contact.url}  `;
      expect(res).to.be.equal(result);
    });
    it('should not create header if information is not provided', () => {
      const fixture = {
        contact: {}
      };
      const res = transformInfo(fixture);
      expect(res).to.be.equal(null);
    });
  });

  describe('License field', () => {
    it('should not create header if information is not provided', () => {
      const fixture = {
        license: {}
      };
      const res = transformInfo(fixture);
      expect(res).to.be.equal(null);
    });
    it('should create license as link with name', () => {
      const fixture = {
        license: {
          name: 'Apache 2.0',
          url: 'http://www.apache.org/licenses/LICENSE-2.0.html'
        }
      };
      const res = transformInfo(fixture);
      const result = `**License** [${fixture.license.name}]`
        + `(${fixture.license.url})`;
      expect(res).to.be.equal(result);
    });
    it('should create license name as text if ony one field is available', () => {
      const fixture = {
        license: {
          name: 'Apache 2.0'
        }
      };
      const res = transformInfo(fixture);
      const result = `**License** ${fixture.license.name}`;
      expect(res).to.be.equal(result);
    });
    it('should create license url as text if ony one field is available', () => {
      const fixture = {
        license: {
          url: 'http://www.apache.org/licenses/LICENSE-2.0.html'
        }
      };
      const res = transformInfo(fixture);
      const result = `**License** ${fixture.license.url}`;
      expect(res).to.be.equal(result);
    });
  });
});
