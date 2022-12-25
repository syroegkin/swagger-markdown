/* eslint-disable @typescript-eslint/no-non-null-assertion */
import { expect } from 'chai';
import { transformDefinition } from '../../src/transformers/definitions';
import { fixture } from './definitionsFixture';

describe('Definitions', () => {
  const res1 = transformDefinition(fixture.data1)?.split('\n');
  const res2 = transformDefinition(fixture.data2)?.split('\n');
  const res3 = transformDefinition(fixture.data3)?.split('\n');
  const res4 = transformDefinition(fixture.data4)?.split('\n');
  // Slice off header
  const res11 = res1?.slice(6);
  const res12 = res2?.slice(6);
  const res13 = res3?.slice(6);
  const res41 = res4?.slice(-3);

  it('should create model header', () => {
    expect(res1![0]).to.be.equal(fixture.definitionsHeader[0]);
    expect(res2![0]).to.be.equal(fixture.definitionsHeader[0]);
    expect(res3![0]).to.be.equal(fixture.definitionsHeader[0]);
  });

  it('should create proper header', () => {
    expect(res1![3]).to.be.equal(fixture.defHeader1);
    expect(res2![3]).to.be.equal(fixture.defHeader2);
    expect(res3![3]).to.be.equal(fixture.defHeader3);
  });

  it('should create table headers', () => {
    expect(res1![5]).to.be.equal(fixture.tableHeader[0]);
    expect(res1![6]).to.be.equal(fixture.tableHeader[1]);
    expect(res2![5]).to.be.equal(fixture.tableHeader[0]);
    expect(res2![6]).to.be.equal(fixture.tableHeader[1]);
    expect(res3![7]).to.be.equal(fixture.tableHeader[0]);
    expect(res3![8]).to.be.equal(fixture.tableHeader[1]);
  });

  it('should also create description', () => {
    expect(res3![5]).to.be.equal(fixture.data3.deviceid.description);
  });

  it('should create a single description line', () => {
    expect(res41![0]).to.be.equal(fixture.result4[0]);
  });

  describe('Simple data', () => {
    it('should create simple valid table', () => {
      expect(res11![1]).to.be.equal(fixture.result1[0]);
      expect(res11![2]).to.be.equal(fixture.result1[1]);
    });
  });

  describe('Complex data', () => {
    it('should add reference to other definition', () => {
      expect(res12![1]).to.be.equal(fixture.result2[0]);
    });
    it('should add description and example', () => {
      expect(res12![2]).to.be.equal(fixture.result2[1]);
    });
    it('should render types as an array', () => {
      expect(res12![3]).to.be.equal(fixture.result2[2]);
    });
    it('should render array of references', () => {
      expect(res12![4]).to.be.equal(fixture.result2[3]);
    });
    it('should add enum values', () => {
      expect(res12![5]).to.be.equal(fixture.result2[4]);
    });
  });

  describe('Primitive data', () => {
    it('should create simple valid primitive table', () => {
      expect(res13![3]).to.be.equal(fixture.result3[0]);
    });
  });
});
