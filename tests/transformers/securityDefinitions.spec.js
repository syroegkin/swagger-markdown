const { expect } = require('chai');
const transformSecurityDefinitions = require('../../app/transformers/securityDefinitions');
const { nameResolver } = require('../../app/transformers/securityDefinitions');
const { typeResolver } = require('../../app/transformers/securityDefinitions');

describe('Security definitions', () => {
  it('Should not create any data if definitions is empty', () => {
    const fixture = {};
    const res = transformSecurityDefinitions(fixture);
    expect(res).to.be.equal(null);
  });
  it('Should resolve auth type', () => {
    Object.keys(typeResolver).map(type => {
      const fixture = { auth: { type } };
      const res = transformSecurityDefinitions(fixture);
      const result = '### Security\n'
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
      const res = transformSecurityDefinitions(fixture);
      const result = `|${nameResolver[key]}|value|\n`;
      expect(res).to.include(result);
    });
  });
  it('Should transform complex types with objects', () => {
    const fixture = {
      'complex-structure': {
        type: 'apiKey',
        name: 'Name',
        'x-amazon-apigateway-authorizer': {
          type: 'token'
        }
      }
    };
    const res = transformSecurityDefinitions(fixture);
    expect(res).to.exist;
  });
  it('Should ignore undefined keys unless it is prefixed with x-', () => {
    const fixture = {
      'complex-structure': {
        type: 'apiKey',
        name: 'Name',
        'x-special-key': 'Special key',
        'unknown-key': 'Uknown key',
      }
    };
    const result = transformSecurityDefinitions(fixture);
    expect(result.match(/undefined/ig)).to.be.null;
    expect(result.match(/x-special-key/ig)).to.be.not.null;
  });
});
