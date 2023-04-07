import { expect } from 'chai';
import { groupPathsByTags } from '../../src/transformers/v2/groupPathsByTags';

describe('Group paths by tag', () => {
  it('should group with default tag', () => {
    const fixture = {
      '/': {
        parameters: undefined,
        $ref: undefined,
        get: {},
      },
    };
    const grouped = groupPathsByTags(fixture as any);
    expect(grouped).to.be.deep.equal({ '': fixture });
  });
  it('should group by tags', () => {
    const fixture = {
      a: {
        parameters: undefined,
        $ref: undefined,
        get: {
          tags: ['a'],
        },
      },
      b: {
        parameters: undefined,
        $ref: undefined,
        get: {
          tags: ['b'],
        },
      },
    };
    const grouped = groupPathsByTags(fixture as any);
    expect(grouped.a).to.be.deep.equal({ a: fixture.a });
    expect(grouped.b).to.be.deep.equal({ b: fixture.b });
  });
  it('should create duplicate path if it has 2 tags', () => {
    const fixture = {
      '/': {
        parameters: undefined,
        $ref: undefined,
        get: {
          tags: ['a', 'b'],
        },
      },
    };
    const grouped = groupPathsByTags(fixture as any);
    expect(grouped.a).to.be.deep.equal(fixture);
    expect(grouped.b).to.be.deep.equal(fixture);
  });
});
