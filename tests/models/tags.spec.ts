import { expect } from 'chai';
import { TagsCollection } from '../../src/models/Tags';

const tags = [{
  name: 'Tag',
  description: 'Some description',
  externalDocs: 'http://127.0.0.1',
}, {
  name: 'Tag1',
  description: 'Some description1',
  externalDocs: 'http://127.0.0.1',
}];

describe('Tags collection', () => {
  it('Should report if tag is wrong', () => {
    const collection = new TagsCollection();
    try {
      collection.tag({} as any);
    } catch (e) {
      expect(e).to.be.instanceOf(Error);
    }
  });
  it('Should import tags', () => {
    const collection = new TagsCollection();
    collection.tag(tags[0] as any).tag(tags[1] as any);
    expect(collection.getTag(tags[1].name)).to.be.deep.equal(tags[1]);
    expect(collection.getTag(tags[0].name)).to.be.deep.equal(tags[0]);
  });
});
