import { expect } from 'chai';
import { OpenAPIV2 } from 'openapi-types';
import { transformSecurityDefinitions, nameResolver, typeResolver } from '../../src/transformers/v2/securityDefinitions';

describe('Security definitions', () => {
  it('Should not create any data if definitions is empty', () => {
    const fixture = {};
    const res = transformSecurityDefinitions(fixture);
    expect(res).to.be.equal(null);
  });
  it('Should resolve auth type', () => {
    Object.keys(typeResolver).forEach((type) => {
      const fixture = { auth: { type } };
      const res = transformSecurityDefinitions(fixture as OpenAPIV2.SecurityDefinitionsObject);
      const result = '### Security\n'
        + '**auth**  \n\n'
        + `| ${type} | *${typeResolver[type]}* |\n`
        + `| ${'-'.repeat(type.length)} | ${'-'.repeat(2 + typeResolver[type].length)} |\n\n\n`;
      expect(res).to.be.equal(result);
    });
  });
  it('Should resolve names', () => {
    Object.keys(nameResolver).forEach((key) => {
      const fixture = { auth: { type: 'basic' } };
      fixture.auth[key] = 'value';
      const res = transformSecurityDefinitions(fixture as OpenAPIV2.SecurityDefinitionsObject);
      const result = `| ${nameResolver[key]} | value |\n`;
      expect(res).to.include(result);
    });
  });
  it('Should transform complex types with objects', () => {
    const fixture = {
      'complex-structure': {
        type: 'apiKey',
        name: 'Name',
        'x-amazon-apigateway-authorizer': {
          type: 'token',
        },
      },
    };
    const res = transformSecurityDefinitions(fixture as OpenAPIV2.SecurityDefinitionsObject);
    expect(res).to.exist;
  });
  it('Should ignore undefined keys unless it is prefixed with x-', () => {
    const fixture = {
      'complex-structure': {
        type: 'apiKey',
        name: 'Name',
        'x-special-key': 'Special key',
        'unknown-key': 'Uknown key',
      },
    };
    const result = transformSecurityDefinitions(
      fixture as OpenAPIV2.SecurityDefinitionsObject,
    ) as string;
    expect(result.match(/undefined/ig)).to.be.null;
    expect(result.match(/x-special-key/ig)).to.be.not.null;
  });
});
