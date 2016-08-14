const expect = require('chai').expect;
const transformPath = require('../../app/transformers/path');

describe('Path transformer', () => {
  it('should return null if nothing was passed', () => {
    expect(transformPath(null, null)).to.be.equal(null);
    expect(transformPath()).to.be.equal(null);
  });

  it('should present path as a subheader', () => {
    const fixture = {
      path: '/status',
      data: {}
    };
    const result = '### /status\n' +
      '---';
    const res = transformPath(fixture.path, fixture.data);
    expect(res).to.be.equal(result);
  });

  it('should present the method as a subheader italic', () => {
    const fixture = {
      path: '/',
      data: {
        get: {}
      }
    };
    const result = '##### ***GET***';
    const res = transformPath(fixture.path, fixture.data).split('\n');
    expect(res[2]).to.be.equal(result);
  });
});
