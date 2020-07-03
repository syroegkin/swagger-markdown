const { expect } = require('chai');
const parameters = require('../../app/transformers/pathParameters');

const tableFixture = [
  '##### Parameters',
  '| Name | Located in | Description | Required | Schema |',
  '| ---- | ---------- | ----------- | -------- | ---- |'
];

describe('Path parameters transformer', () => {
  describe('Method parameters', () => {
    const fixture = [
      {
        name: 'name',
        in: 'formData',
        description: 'name',
        type: 'string'
      }, {
        name: 'year',
        in: 'formData',
        description: 'year',
        type: 'string',
        required: true
      }, {
        in: 'formData',
        type: 'string'
      }, {}
    ];

    const results = [].concat(tableFixture, [
      '| name | formData | name | No | string |',
      '| year | formData | year | Yes | string |',
      '|  | formData |  | No | string |',
      '|  |  |  | No |  |'
    ]);
    const res = parameters(fixture).split('\n');

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
    it('Should build parameters from path parameters', () => {
      const fixture = [{
        name: 'name',
        in: 'formData',
        description: 'name',
        type: 'string'
      }];
      const results = [].concat(tableFixture, [
        '| name | formData | name | No | string |'
      ]);
      const res = parameters(undefined, fixture).split('\n');

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
    it('Should build parameters from path and method parameters', () => {
      const pathFixture = [{
        name: 'path name',
        in: 'formData',
        description: 'name',
        type: 'string'
      }];
      const methodFixture = [{
        name: 'method name',
        in: 'formData',
        description: 'name',
        type: 'string'
      }];
      const results = [].concat(tableFixture, [
        '| path name | formData | name | No | string |',
        '| method name | formData | name | No | string |'
      ]);
      const res = parameters(methodFixture, pathFixture).split('\n');
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
