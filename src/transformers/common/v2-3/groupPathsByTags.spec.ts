import { expect } from 'chai';
import { groupPathsByTags } from './groupPathsByTags';

const v2methods = ['get', 'post', 'put', 'patch', 'delete', 'options', 'head'];

describe('Group paths by tag', () => {
  it('should group with default tag', () => {
    // Fixture without undefined properties
    const fixture = {
      '/': {
        get: {},
      },
    };
    // Expected output structure
    const expected = {
      '': {
        '/': {
          get: {},
        },
      },
    };
    const grouped = groupPathsByTags(
      fixture as any, // Keep as any for input flexibility if needed
      v2methods,
    );
    expect(grouped).to.be.deep.equal(expected);
  });
  it('should group by tags', () => {
    // Fixture without undefined properties
    const fixture = {
      a: {
        get: {
          tags: ['a'],
        },
      },
      b: {
        get: {
          tags: ['b'],
        },
      },
    };
    // Expected output structure
    const expectedA = { a: { get: { tags: ['a'] } } };
    const expectedB = { b: { get: { tags: ['b'] } } };

    const grouped = groupPathsByTags(fixture as any, v2methods);
    expect(grouped.a).to.be.deep.equal(expectedA);
    expect(grouped.b).to.be.deep.equal(expectedB);
  });
  it('should create duplicate path if it has 2 tags', () => {
    // Fixture without undefined properties
    const fixture = {
      '/': {
        get: {
          tags: ['a', 'b'],
        },
      },
    };
    // Expected output structure for each tag
    const expected = {
      '/': {
        get: {
          tags: ['a', 'b'],
        },
      },
    };
    const grouped = groupPathsByTags(fixture as any, v2methods);
    expect(grouped.a).to.be.deep.equal(expected);
    expect(grouped.b).to.be.deep.equal(expected);
  });
});
