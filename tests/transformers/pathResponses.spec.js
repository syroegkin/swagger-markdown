const expect = require('chai').expect;
const respones = require('../../app/transformers/pathResponses');

describe('Path responses transformer', () => {
  const fixture = {
    200: {
      description: 'Echo GET'
    },
    404: {
      description: 'Not Found'
    }
  };
  const results = [
    '**Responses**',
    '| Code | Description |',
    '| ---- | ----------- |',
    '| 200 | Echo GET |',
    '| 404 | Not Found |'
  ];
  const res = respones(fixture).split('\n');

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
