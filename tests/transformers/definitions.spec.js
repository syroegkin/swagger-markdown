const expect = require('chai').expect;
const transformDefinitions = require('../../app/transformers/definitions');
// const dataTypeTransformer = require('../../app/transformers/dataTypes');
const fixture = require('./definitionsFixture');

describe('Definitions', () => {
  const res1 = transformDefinitions(fixture.data1).split('\n');
  const res2 = transformDefinitions(fixture.data2).split('\n');
  // Slice off header
  const res11 = res1.slice(6);
  const res12 = res2.slice(6);

  it('should create model header', () => {
    expect(fixture.definitionsHeader[0]).to.be.equal(res1[0]);
    expect(fixture.definitionsHeader[1]).to.be.equal(res1[1]);
    expect(fixture.definitionsHeader[0]).to.be.equal(res2[0]);
    expect(fixture.definitionsHeader[1]).to.be.equal(res2[1]);
  });

  it('should create proper header', () => {
    expect(fixture.defHeader1).to.be.equal(res1[2]);
    expect(fixture.defHeader2).to.be.equal(res2[2]);
  });

  it('should create table headers', () => {
    expect(fixture.tableHeader[0]).to.be.equal(res1[4]);
    expect(fixture.tableHeader[1]).to.be.equal(res1[5]);
    expect(fixture.tableHeader[0]).to.be.equal(res2[4]);
    expect(fixture.tableHeader[1]).to.be.equal(res2[5]);
  });

  describe('Simple data', () => {
    it('should create simple valid table', () => {
      expect(res11[0]).to.be.equal(fixture.result1[0]);
      expect(res11[1]).to.be.equal(fixture.result1[1]);
    });
  });

  describe('Complex data', () => {
    it('should add reference to other definition', () => {
      expect(res12[0]).to.be.equal(fixture.result2[0]);
    });
    it('should add description', () => {
      expect(res12[1]).to.be.equal(fixture.result2[1]);
    });
    it('should render types as an array', () => {
      expect(res12[2]).to.be.equal(fixture.result2[2]);
    });
    it('should render array of references', () => {
      expect(res12[3]).to.be.equal(fixture.result2[3]);
    });
  });
});
