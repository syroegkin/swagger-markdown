import { expect } from 'chai';
import { transformTag } from '../../src/transformers/v2/tag';

describe('Tags', () => {
  it('should throw an error if nothing is provided', () => {
    try {
      // @ts-ignore
      transformTag();
    } catch (e) {
      expect(e).to.be.instanceOf(Error);
    }
  });
  it('should create default tag', () => {
    const result = '## default\n';
    expect(transformTag('')).to.be.equal(result);
  });
  it('should create tag with just a name', () => {
    const tag = {
      name: 'Tag name',
    };
    const result = '## Tag name\n';
    expect(transformTag(tag)).to.be.equal(result);
  });
  it('should create tag with description', () => {
    const tag = {
      name: 'Tag name',
      description: 'description',
    };
    const result = '## Tag name\ndescription\n';
    expect(transformTag(tag)).to.be.equal(result);
  });
  it('should create tag as a link', () => {
    const tag = {
      name: 'Tag name',
      externalDocs: {
        url: 'http://127.0.0.1',
      },
    };
    const result = '[## Tag name](http://127.0.0.1)\n';
    expect(transformTag(tag)).to.be.equal(result);
  });
  it('should create tag with all fields', () => {
    const tag = {
      name: 'Tag name',
      description: 'description',
      externalDocs: {
        url: 'http://127.0.0.1',
        description: 'url description',
      },
    };
    const result = '## Tag name\ndescription\n[url description](http://127.0.0.1)\n';
    expect(transformTag(tag)).to.be.equal(result);
  });
});
