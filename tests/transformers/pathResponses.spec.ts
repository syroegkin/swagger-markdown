import { expect } from 'chai';
import { transformResponses } from '../../src/transformers/pathResponses';

describe('Path responses transformer', () => {
  describe('no schemas', () => {
    const fixture = {
      200: { description: '200' },
      404: {},
    };
    const results = [
      '##### Responses',
      '| Code | Description |',
      '| ---- | ----------- |',
      '| 200 | 200 |',
      '| 404 |  |',
    ];
    const res = (transformResponses(fixture as any) as string).split('\n');

    it('should build the header', () => {
      expect(res[0]).to.be.equal(results[0]);
    });

    it('should build the table header', () => {
      expect(res[2]).to.be.equal(results[1]);
      expect(res[3]).to.be.equal(results[2]);
    });

    it('should build the table body', () => {
      expect(res[4]).to.be.equal(results[3]);
      expect(res[5]).to.be.equal(results[4]);
    });
  });
  describe('simple case', () => {
    const fixture = {
      404: {
        description: 'Not Found',
      },
      200: {
        description: 'Echo GET',
        schema: {
          $ref: '#/definitions/Foo',
        },
      },
      500: {},
    };
    const results = [
      '##### Responses',
      '| Code | Description | Schema |',
      '| ---- | ----------- | ------ |',
      '| 200 | Echo GET | [Foo](#foo) |',
      '| 404 | Not Found |  |',
      '| 500 |  |  |',
    ];
    const res = (transformResponses(fixture as any) as string).split('\n');

    it('should build the header', () => {
      expect(res[0]).to.be.equal(results[0]);
    });

    it('should build the table header', () => {
      expect(res[2]).to.be.equal(results[1]);
      expect(res[3]).to.be.equal(results[2]);
    });

    it('should build the table body', () => {
      expect(res[4]).to.be.equal(results[3]);
      expect(res[5]).to.be.equal(results[4]);
      expect(res[6]).to.be.equal(results[5]);
    });
  });
  describe('tricky case when schema is not first case', () => {
    const fixture = {
      200: {},
      404: {
        schema: { $ref: '#/definitions/Bar' },
      },
    };
    const results = [
      '##### Responses',
      '| Code | Description | Schema |',
      '| ---- | ----------- | ------ |',
      '| 200 |  |  |',
      '| 404 |  | [Bar](#bar) |',
    ];
    const res = (transformResponses(fixture as any) as string).split('\n');
    it('should build the header', () => {
      expect(res[0]).to.be.equal(results[0]);
    });

    it('should build the table header', () => {
      expect(res[2]).to.be.equal(results[1]);
      expect(res[3]).to.be.equal(results[2]);
    });

    it('should build the table body', () => {
      expect(res[4]).to.be.equal(results[3]);
      expect(res[5]).to.be.equal(results[4]);
    });
  });
});
