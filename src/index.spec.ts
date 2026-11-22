import type { $Refs } from '@apidevtools/json-schema-ref-parser';
import { expect } from 'chai';
import fs from 'node:fs';
import os from 'node:os';
import path from 'node:path';
import { transformFile, partiallyDereference, transfromSwagger } from './index';
import { AllSwaggerDocumentVersions } from './types';

// Temporary directories made by the tests, removed when these are done
const directories: string[] = [];
afterAll(() => directories.forEach((dir) => fs.rmSync(dir, { recursive: true, force: true })));

const makeDirectory = (): string => {
  const dir = fs.mkdtempSync(path.join(os.tmpdir(), 'swagger-markdown-'));
  directories.push(dir);
  return dir;
};

// Writes the lines to a file, in a new temporary directory by default, and returns the path
const write = (lines: string[], name = 'api.yaml', dir = makeDirectory()): string => {
  const file = path.join(dir, name);
  fs.writeFileSync(file, lines.join('\n'));
  return file;
};

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

describe('transformFile with invalid documents', () => {
  let warn: jest.SpyInstance;
  beforeEach(() => {
    warn = jest.spyOn(console, 'warn').mockImplementation(() => undefined);
  });
  afterEach(() => warn.mockRestore());

  const failure = async (lines: string[]): Promise<Error> => {
    try {
      await transformFile({ input: write(lines) });
    } catch (e) {
      return e;
    }
    throw new Error('transformFile was expected to fail');
  };

  it('rejects a version written as a number which is not supported', async () => {
    const error = await failure(['openapi: 4', 'info: {title: t, version: "1"}', 'paths: {}']);
    expect(error.message).to.include('Unsupported OpenAPI version: 4.0');
  });

  it('rejects an unrecognized OpenAPI version', async () => {
    const error = await failure(['openapi: 4.0.0', 'info: {title: t, version: "1"}', 'paths: {}']);
    expect(error.message).to.include('Unsupported OpenAPI version: 4.0.0');
  });

  it('rejects a document which is not an object', async () => {
    const error = await failure(['just a text']);
    expect(error.message).to.include('is not a valid JSON Schema');
  });

  it('checks the version before reading the files it refers to', async () => {
    const error = await failure([
      'openapi: 4.0.0',
      'info: {title: t, version: "1"}',
      'paths: {/a: {$ref: "missing.yaml"}}',
    ]);
    expect(error.message).to.include('Unsupported OpenAPI version: 4.0.0');
  });

  it('rejects a document which is not a Swagger/OpenAPI definition', async () => {
    const error = await failure(['name: package', 'version: 1.0.0']);
    expect(error.message).to.include('is not a valid Swagger/OpenAPI definition');
  });
});

describe('transformFile with incomplete documents', () => {
  let warn: jest.SpyInstance;
  beforeEach(() => {
    warn = jest.spyOn(console, 'warn').mockImplementation(() => undefined);
  });
  afterEach(() => warn.mockRestore());

  const operation = ['paths:', '  /pets:', '    get:', '      responses: {"200": {description: OK}}'];

  it('renders a newer OpenAPI 3.x as 3.1, with a warning', async () => {
    const result = await transformFile({
      input: write([
        'openapi: 3.3.0',
        'info: {title: Pets, version: "1"}',
        ...operation,
        // Webhooks are rendered since 3.1
        'webhooks: {newPet: {post: {responses: {"200": {description: OK}}}}}',
      ]),
    });
    expect(result).to.include('### [GET] /pets');
    expect(result).to.include('### [POST] newPet');
    expect(warn.mock.calls).to.have.length(1);
  });

  it('renders a document with components only', async () => {
    const result = await transformFile({ input: write(['openapi: 3.0.0', 'info: {title: t, version: "1"}', 'components: {schemas: {Pet: {type: object}}}']) });
    expect(result).to.include('#### Pet Schema');
  });

  it('renders a document with no info', async () => {
    const result = await transformFile({ input: write(['swagger: "2.0"', ...operation]) });
    expect(result).to.include('### /pets');
  });

  it('renders a document with nothing but the version', async () => {
    expect(await transformFile({ input: write(['openapi: 3.0.0']) })).to.equal('\n');
  });

  it('renders a document with empty components', async () => {
    const results = await Promise.all(['3.0.0', '3.1.0'].map((openapi) => transformFile({
      input: write([`openapi: ${openapi}`, 'info: {title: Pets, version: "1"}', 'components:']),
    })));
    results.forEach((result) => expect(result).to.include('# Pets'));
  });
});

describe('transformFile with versions written as numbers', () => {
  it('reads these as strings, with a warning', async () => {
    const warn = jest.spyOn(console, 'warn').mockImplementation(() => undefined);
    try {
      const file = write(['openapi: 3.1', 'info: {title: Pets, version: 1.5}', 'paths: {}']);
      const result = await transformFile({ input: file });
      expect(result).to.include('# Pets');
      expect(result).to.include('Version: 1.5');
      expect(warn.mock.calls).to.have.length(2);
    } finally {
      warn.mockRestore();
    }
  });
});

describe('transformFile with external $refs', () => {
  it('reads the $refs to other files', async () => {
    const file = write([
      'openapi: 3.0.0',
      'info: {title: t, version: "1"}',
      'paths:',
      '  /pets:',
      '    get:',
      '      responses:',
      '        "200": {$ref: "responses.yaml#/Ok"}',
    ]);
    write(['Ok: {description: Pets from the other file}'], 'responses.yaml', path.dirname(file));
    expect(await transformFile({ input: file })).to.include('Pets from the other file');
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

  it('keeps null values', () => {
    const input = {
      one: null,
      two: [null, { three: null }],
    } as unknown as AllSwaggerDocumentVersions;
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
