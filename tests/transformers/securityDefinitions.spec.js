const expect = require('chai').expect;
const transformSecurituDefinitions = require('../../app/transformers/securityDefinitions');
const nameResolver = require('../../app/transformers/securityDefinitions').nameResolver;
const typeResolver = require('../../app/transformers/securityDefinitions').typeResolver;

describe('Security definitions', () => {
  it('Should not create any data if definitions is empty', () => {
    const fixture = {};
    const res = transformSecurituDefinitions(fixture);
    expect(res).to.be.equal(null);
  });
  it('Should resolve auth type', () => {
    Object.keys(typeResolver).map(type => {
      const fixture = { auth: { type } };
      const res = transformSecurituDefinitions(fixture);
      const result = '### Security\n---\n'
        + '**auth**  \n\n'
        + `|${type}|*${typeResolver[type]}*|\n`
        + '|---|---|\n';
      expect(result).to.be.equal(res);
    });
  });
  it('Should resolve names', () => {
    Object.keys(nameResolver).map(key => {
      const fixture = { auth: { type: 'basic' } };
      fixture.auth[key] = 'value';
      const res = transformSecurituDefinitions(fixture);
      const result = `|${nameResolver[key]}|value|\n`;
      expect(res).to.include(result);
    });
  });
});
