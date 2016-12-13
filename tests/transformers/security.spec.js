const expect = require('chai').expect;
const security = require('../../app/transformers/security');

const fixture = [
  {
    security: [{
      auth: []
    }],
    result: '**Security**\n\n'
            + '| Security Schema | Scopes |\n'
            + '| --- | --- |\n'
            + '| auth | |'
  }, {
    security: [{
      auth: ['write_pets', 'read_pets']
    }],
    result: '**Security**\n\n'
            + '| Security Schema | Scopes | |\n'
            + '| --- | --- | --- |\n'
            + '| auth | write_pets | read_pets |'
  }
];

describe('Security transformer', () => {
  it('should transform security to the tables', () => {
    fixture.map(usecase => {
      expect(security(usecase.security)).to.be.equal(usecase.result);
    });
  });
});
