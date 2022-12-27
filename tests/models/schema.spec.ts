import { expect } from 'chai';
import { Schema } from '../../src/models/Schema';

const fixture = {
  type: 'Type',
  format: 'Format',
  $ref: 'Ref',
  items: {
    type: 'Type1',
  },
};

describe('Schema class', () => {
  it('Should set and get properties using setters and getters', () => {
    const schema = new Schema();
    schema.setType(fixture.type);
    expect(schema.getType()).to.be.equal(fixture.type);
    schema.setFormat(fixture.format);
    expect(schema.getFormat()).to.be.equal(fixture.format);
    schema.setReference(fixture.$ref);
    expect(schema.getReference()).to.be.equal(fixture.$ref);
    schema.setItems(fixture.items);
    expect(schema.getItems()).to.be.instanceOf(Schema);
    expect(schema.getItems().type).to.be.equal(fixture.items.type);
  });
  it('Should set data using constructor', () => {
    const schema = new Schema(fixture);
    expect(schema.getType()).to.be.equal(fixture.type);
    expect(schema.getFormat()).to.be.equal(fixture.format);
    expect(schema.getReference()).to.be.equal(fixture.$ref);
    expect(schema.getItems()).to.be.instanceOf(Schema);
    expect(schema.getItems().type).to.be.equal(fixture.items.type);
  });
});
