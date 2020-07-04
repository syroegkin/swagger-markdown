const { expect } = require('chai');
const textEscape = require('../../app/lib/textEscape');

const fixture = [
  ['I am \\ an arm', 'I am \\\\ an arm'],
  ['I love `boogie`', 'I love \\`boogie\\`'],
  [':-*', ':\\-\\*'],
  [':-) :-{} :-(', ':\\-\\) :\\-\\{\\} :\\-\\('],
  [
    '_Example_: #twitter + #reddit !== #tweddit',
    '\\_Example\\_: \\#twitter \\+ \\#reddit \\!== \\#tweddit'
  ]
];

describe('escape function', () => {
  it('should escape special strings characters', () => {
    fixture.forEach(issue => {
      expect(textEscape(issue[0])).to.be.equal(issue[1]);
    });
  });
});
