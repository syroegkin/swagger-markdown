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

  it('should build responses table', () => {
    const fixture = {
      path: '/',
      data: {
        get: {
          responses: {
            200: {
              description: 'Echo GET'
            },
            404: {
              description: 'Not Found'
            }
          }
        }
      }
    };
    const result =
      '**Responses**\n' +
      '| Code | Description |\n' +
      '| ---- | ----------- |\n' +
      '| 200 | Echo GET |\n' +
      '| 404 | Not Found |';
    let res = transformPath(fixture.path, fixture.data).split('\n');
    // Remove fisrst part and bring back the string
    res = res.slice(3).join('\n');
    expect(res).to.be.equal(result);
  });
});
