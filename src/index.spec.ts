import type { $Refs } from '@apidevtools/json-schema-ref-parser';
import { expect } from 'chai';
import fs from 'fs';
import { transformFile, partiallyDereference } from './index';
import { AllSwaggerDocumentVersions } from './types';

describe('Integration test examples', () => {
  const examplesDir = `${__dirname}/../examples`;
  ['v2', 'v3'].forEach((version) => {
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
});
