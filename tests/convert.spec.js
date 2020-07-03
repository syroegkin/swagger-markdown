const { expect } = require('chai');
const fs = require('fs');
const { transformFile, partiallyDereference } = require('../app/convert');

describe('Integration test examples', () => {
  const examplesDir = `${__dirname}/../examples`;
  const examples = fs.readdirSync(examplesDir);
  examples
    .filter(example => example.endsWith('.yaml'))
    .map(example => example.substr(0, example.length - 5))
    .forEach(example => {
      it(`converts ${example}.yaml`, async () => {
        const generated = await transformFile({ input: `${examplesDir}/${example}.yaml` });
        const expected = fs.readFileSync(`${__dirname}/../examples/${example}.md`, 'utf8');
        expect(generated).to.eql(expected);
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
  };

  it('makes no changes to object with no $refs', () => {
    const input = { one: { two: [3, 'four', { five: 'six' }] } };
    expect(partiallyDereference(input)).to.eql(input);
  });

  it('dereferences $refs', () => {
    const input = {
      one: { two: [3, 'four', { $ref: '#/some/thing' }] },
      five: { $ref: '#/some/thing' },
      six: { seven: { $ref: '#/transitive/ref' } },
      eight: { $ref: '#/definitions/not/used' },
    };
    const expected = {
      one: { two: [3, 'four', { some: 'thing' }] },
      five: { some: 'thing' },
      six: { seven: { transitive: { some: 'thing' } } },
      eight: { $ref: '#/definitions/not/used' },
    };
    expect(partiallyDereference(input, mockRefs)).to.eql(expected);
  });
});
