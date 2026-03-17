/* eslint-disable camelcase */
import { expect } from 'chai';
import { OpenAPIV3_1 } from 'openapi-types';
import { transformSwaggerV3_1 } from './documentV3_1';

describe('documentV3_1 transformer', () => {
  it('minimal (paths only): returns non-empty string, includes title and path', () => {
    const doc = {
      openapi: '3.1.0',
      info: { title: 'Test', version: '1.0' },
      paths: {
        '/ping': {
          get: {
            responses: { 200: { description: 'OK' } },
          },
        },
      },
    } as OpenAPIV3_1.Document;

    const result = transformSwaggerV3_1(doc, { input: '' });

    expect(result).to.be.a('string');
    expect(result.length).to.be.greaterThan(0);
    expect(result).to.include('Test');
    expect(result).to.include('/ping');
  });

  it('with components.schemas: output includes schema name', () => {
    const doc = {
      openapi: '3.1.0',
      info: { title: 'Test', version: '1.0' },
      paths: {
        '/ping': {
          get: {
            responses: { 200: { description: 'OK' } },
          },
        },
      },
      components: {
        schemas: {
          Foo: {
            type: 'object',
            properties: { id: { type: 'string' } },
          },
        },
      },
    } as OpenAPIV3_1.Document;

    const result = transformSwaggerV3_1(doc, { input: '' });

    expect(result).to.include('Foo');
  });

  it('skipInfo: output does not include info title', () => {
    const doc = {
      openapi: '3.1.0',
      info: { title: 'Test', version: '1.0' },
      paths: {
        '/ping': {
          get: {
            responses: { 200: { description: 'OK' } },
          },
        },
      },
    } as OpenAPIV3_1.Document;

    const result = transformSwaggerV3_1(doc, { skipInfo: true, input: '' });

    expect(result).not.to.include('Test');
  });

  it('empty paths: does not throw, returns string', () => {
    const doc = {
      openapi: '3.1.0',
      info: { title: 'Test', version: '1.0' },
      paths: {},
    } as OpenAPIV3_1.Document;

    expect(() => transformSwaggerV3_1(doc, { input: '' })).not.to.throw();
    const result = transformSwaggerV3_1(doc, { input: '' });
    expect(result).to.be.a('string');
  });
});
