const expect = require('chai').expect;
const parameters = require('../../../app/transformers/path/parameters');

describe('Path parameters transormer', () => {
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
    }
  ];

  const results = [
    '**Parameters**',
    '| Name | Located in | Description | Required | Type |',
    '| ---- | ---------- | ----------- | -------- | ---- |',
    '| name | formData | name | No | string |',
    '| year | formData | year | Yes | string |'
  ];
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
  });
});
