import { expect } from 'chai';
import { transformParameters } from '../../src/transformers/v2/pathParameters';

const tableFixture: string[] = [
  '##### Parameters',
  '| Name | Located in | Description | Required | Schema |',
  '| ---- | ---------- | ----------- | -------- | ------ |',
];

describe('Path parameters transformer', () => {
  describe('Method parameters', () => {
    const fixture = [
      {
        name: 'name',
        in: 'formData',
        description: 'name',
        type: 'string',
      }, {
        name: 'year',
        in: 'formData',
        description: 'year',
        type: 'string',
        required: true,
      }, {
        in: 'formData',
        type: 'string',
      }, {},
    ];

    const results = [...tableFixture, ...[
      '| name | formData | name | No | string |',
      '| year | formData | year | Yes | string |',
      '|  | formData |  | No | string |',
      '|  |  |  | No |  |',
    ]];
    const res = (transformParameters(fixture as any) as string).split('\n');

    it('Should create parameters header', () => {
      expect(res[0]).to.be.equal(results[0]);
    });

    it('Should create table header', () => {
      expect(res[2]).to.be.equal(results[1]);
      expect(res[3]).to.be.equal(results[2]);
    });

    it('Should create table body', () => {
      expect(res[4]).to.be.equal(results[3]);
      expect(res[5]).to.be.equal(results[4]);
      expect(res[6]).to.be.equal(results[5]);
      expect(res[7]).to.be.equal(results[6]);
    });
  });
  describe('Path parameters', () => {
    describe('Should build parameters from path parameters', () => {
      const fixture = [{
        name: 'name',
        in: 'formData',
        description: 'name',
        type: 'string',
      }];
      const results = [...tableFixture, ...[
        '| name | formData | name | No | string |',
      ]];
      const res = (transformParameters(undefined as any, fixture) as string).split('\n');

      it('Should create parameters header', () => {
        expect(res[0]).to.be.equal(results[0]);
      });

      it('Should create table header', () => {
        expect(res[2]).to.be.equal(results[1]);
        expect(res[3]).to.be.equal(results[2]);
      });

      it('Should create table body', () => {
        expect(res[4]).to.be.equal(results[3]);
      });
    });
  });

  describe('Path and method parameters', () => {
    describe('Should build parameters from path and method parameters', () => {
      const pathFixture = [{
        name: 'path name',
        in: 'formData',
        description: 'name',
        type: 'string',
      }];
      const methodFixture = [{
        name: 'method name',
        in: 'formData',
        description: 'name',
        type: 'string',
      }];
      const results = [...tableFixture, ...[
        '| path name | formData | name | No | string |',
        '| method name | formData | name | No | string |',
      ]];
      const res = (transformParameters(methodFixture, pathFixture) as string).split('\n');
      it('Should create parameters header', () => {
        expect(res[0]).to.be.equal(results[0]);
      });

      it('Should create table header', () => {
        expect(res[2]).to.be.equal(results[1]);
        expect(res[3]).to.be.equal(results[2]);
      });

      it('Should create table body', () => {
        expect(res[4]).to.be.equal(results[3]);
        expect(res[5]).to.be.equal(results[4]);
      });
    });
  });
});
