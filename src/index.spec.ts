import type { $Refs } from '@apidevtools/json-schema-ref-parser';
import { expect } from 'chai';
import fs from 'fs';
import { transformFile, partiallyDereference, transfromSwagger } from './index';
import { AllSwaggerDocumentVersions } from './types';

describe('Integration test examples', () => {
  const examplesDir = `${__dirname}/../examples`;
  ['v2', 'v3', 'v3.1'].forEach((version) => {
    const examples = fs.readdirSync(`${examplesDir}/${version}/`);
    examples
      .filter((example) => example.endsWith('.yaml'))
      .map((example) => example.substr(0, example.length - 5))
      .forEach((example) => {
        it(`converts ${version}/${example}.yaml`, async () => {
          const generated = await transformFile({ input: `${examplesDir}/${version}/${example}.yaml` });
          const expected = fs.readFileSync(`${__dirname}/../examples/${version}/${example}.md`, 'utf8');
          expect(generated).to.eql(expected);
        });
      });
  });
});

describe('transfromSwagger routing', () => {
  it('transforms OpenAPI 3.1 document via transformSwaggerV3_1', () => {
    const doc = {
      openapi: '3.1.0',
      info: { title: 'R', version: '1' },
      paths: {
        '/': {
          get: {
            responses: { 200: { description: 'OK' } },
          },
        },
      },
    };
    const result = transfromSwagger(doc as AllSwaggerDocumentVersions, { input: '' });
    expect(result).to.be.a('string').and.not.empty;
    expect(result).to.include('R');
    expect(result).to.include('/');
  });
});

describe('Partial dereference', () => {
  const mockRefs = {
    get(ref) {
      switch (ref) {
        case '#/some/thing':
          return { some: 'thing' };
        case '#/definitions/not/used':
          return { not: 'used' };
        case '#/transitive/ref':
          return { transitive: { $ref: '#/some/thing' } };
        default:
          return null;
      }
    },
  } as unknown as $Refs;

  it('makes no changes to object with no $refs', () => {
    const input = { one: { two: [3, 'four', { five: 'six' }] } } as unknown as AllSwaggerDocumentVersions;
    expect(partiallyDereference(input)).to.eql(input);
  });

  it('dereferences $refs', () => {
    const input = {
      one: { two: [3, 'four', { $ref: '#/some/thing' }] },
      five: { $ref: '#/some/thing' },
      six: { seven: { $ref: '#/transitive/ref' } },
      eight: { $ref: '#/definitions/not/used' },
    } as unknown as AllSwaggerDocumentVersions;
    const expected = {
      one: { two: [3, 'four', { some: 'thing' }] },
      five: { some: 'thing' },
      six: { seven: { transitive: { some: 'thing' } } },
      eight: { $ref: '#/definitions/not/used' },
    };
    expect(partiallyDereference(input, mockRefs)).to.eql(expected);
  });

  it('preserves $ref to #/components/schemas (rendered separately)', () => {
    const input = {
      schema: { $ref: '#/components/schemas/Pet' },
    } as unknown as AllSwaggerDocumentVersions;
    expect(partiallyDereference(input, mockRefs)).to.eql(input);
  });

  it('dereferences $ref to #/components/responses (inlined)', () => {
    const refs = {
      get: () => ({ description: 'Not Found' }),
    } as unknown as $Refs;
    const input = {
      response: { $ref: '#/components/responses/NotFound' },
    } as unknown as AllSwaggerDocumentVersions;
    expect(partiallyDereference(input, refs)).to.eql({
      response: { description: 'Not Found' },
    });
  });

  it('dereferences $ref to #/components/parameters (inlined)', () => {
    const refs = {
      get: () => ({
        name: 'limit', in: 'query', schema: { type: 'integer' },
      }),
    } as unknown as $Refs;
    const input = {
      param: { $ref: '#/components/parameters/Limit' },
    } as unknown as AllSwaggerDocumentVersions;
    expect(partiallyDereference(input, refs)).to.eql({
      param: {
        name: 'limit', in: 'query', schema: { type: 'integer' },
      },
    });
  });

  it('dereferences $ref to #/components/requestBodies (inlined)', () => {
    const refs = {
      get: () => ({
        content: { 'application/json': { schema: { type: 'object' } } },
      }),
    } as unknown as $Refs;
    const input = {
      body: { $ref: '#/components/requestBodies/PetBody' },
    } as unknown as AllSwaggerDocumentVersions;
    expect(partiallyDereference(input, refs)).to.eql({
      body: {
        content: { 'application/json': { schema: { type: 'object' } } },
      },
    });
  });

  it('dereferences $ref to #/components/headers (inlined)', () => {
    const refs = {
      get: () => ({ description: 'Rate limit', schema: { type: 'integer' } }),
    } as unknown as $Refs;
    const input = {
      header: { $ref: '#/components/headers/RateLimit' },
    } as unknown as AllSwaggerDocumentVersions;
    expect(partiallyDereference(input, refs)).to.eql({
      header: { description: 'Rate limit', schema: { type: 'integer' } },
    });
  });

  it('dereferences $ref to #/components/examples (inlined)', () => {
    const refs = {
      get: () => ({ summary: 'A pet', value: { name: 'doggie' } }),
    } as unknown as $Refs;
    const input = {
      example: { $ref: '#/components/examples/PetExample' },
    } as unknown as AllSwaggerDocumentVersions;
    expect(partiallyDereference(input, refs)).to.eql({
      example: { summary: 'A pet', value: { name: 'doggie' } },
    });
  });

  it('dereferences $ref to #/components/links (inlined)', () => {
    const refs = {
      get: () => ({ description: 'Get user by ID' }),
    } as unknown as $Refs;
    const input = {
      link: { $ref: '#/components/links/GetUser' },
    } as unknown as AllSwaggerDocumentVersions;
    expect(partiallyDereference(input, refs)).to.eql({
      link: { description: 'Get user by ID' },
    });
  });

  it('dereferences $ref to #/components/callbacks (inlined)', () => {
    const refs = {
      get: () => ({
        '{$request.body#/url}': {
          post: { responses: { 200: { description: 'OK' } } },
        },
      }),
    } as unknown as $Refs;
    const input = {
      callback: { $ref: '#/components/callbacks/OnEvent' },
    } as unknown as AllSwaggerDocumentVersions;
    expect(partiallyDereference(input, refs)).to.eql({
      callback: {
        '{$request.body#/url}': {
          post: { responses: { 200: { description: 'OK' } } },
        },
      },
    });
  });
});
