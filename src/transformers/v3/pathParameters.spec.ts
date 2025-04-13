import { expect } from 'chai';
import { OpenAPIV3 } from 'openapi-types';
import { transformParameters } from './pathParameters';

const tableFixture: string[] = [
  '##### Parameters',
  '| Name | Located in | Description | Required | Schema |',
  '| ---- | ---------- | ----------- | -------- | ------ |',
];

describe('Path parameters transformer', () => {
  describe('Method parameters', () => {
    // Corrected fixture to use V3 ParameterObject structure
    const fixture: OpenAPIV3.ParameterObject[] = [
      {
        name: 'name',
        in: 'query', // 'formData' is V2, using 'query' as example for V3
        description: 'name',
        schema: { type: 'string' },
      }, {
        name: 'year',
        in: 'query',
        description: 'year',
        required: true,
        schema: { type: 'string' },
      }, {
        name: 'missing_description', // Added missing name
        in: 'query',
        schema: { type: 'string' },
      },
      // Removed invalid empty object {}
    ];

    // Updated expected results based on corrected fixture
    const results = [...tableFixture, ...[
      '| name | query | name | No | string |',
      '| year | query | year | Yes | string |',
      '| missing_description | query |  | No | string |',
      // Removed line corresponding to empty object
    ]];
    // Pass fixture directly as the first argument (parameters)
    const res = (transformParameters(fixture) as string).split('\n');

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
      // Removed assertion for the removed empty object
    });
  });
  describe('Path parameters', () => {
    describe('Should build parameters from path parameters', () => {
      // Corrected fixture to use V3 ParameterObject structure
      const fixture: OpenAPIV3.ParameterObject[] = [{
        name: 'name',
        in: 'path', // 'formData' is V2, using 'path' as example
        description: 'name',
        required: true, // Path parameters are typically required
        schema: { type: 'string' },
      }];
      // Updated expected results
      const results = [...tableFixture, ...[
        '| name | path | name | Yes | string |',
      ]];
      // Pass empty array for first arg (parameters), fixture for second (pathParameters)
      const res = (transformParameters([], fixture) as string).split('\n');

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
      // Corrected fixtures to use V3 ParameterObject structure
      const pathFixture: OpenAPIV3.ParameterObject[] = [{
        name: 'path_name',
        in: 'path',
        description: 'path name description',
        required: true,
        schema: { type: 'string' },
      }];
      const methodFixture: OpenAPIV3.ParameterObject[] = [{
        name: 'method_name',
        in: 'query',
        description: 'method name description',
        schema: { type: 'string' },
      }];
      // Updated expected results
      const results = [...tableFixture, ...[
        '| path_name | path | path name description | Yes | string |',
        '| method_name | query | method name description | No | string |',
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
