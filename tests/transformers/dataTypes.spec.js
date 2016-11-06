const expect = require('chai').expect;
const transformDataTypes = require('../../app/transformers/dataTypes');

const fixture = [
  // Standard usecases
  ['integer', 'int32', 'integer'],
  ['integer', null, 'integer'],
  ['integer', 'int64', 'long'],
  ['number', 'float', 'float'],
  ['number', 'double', 'double'],
  ['number', null, 'number'],
  ['string', null, 'string'],
  ['string', 'byte', 'byte'],
  ['string', 'binary', 'binary'],
  ['boolean', null, 'boolean'],
  ['string', 'date', 'date'],
  ['string', 'date-time', 'dateTime'],
  ['string', 'password', 'password'],
  // Weird usecases
  ['random', 'number', 'random (number)'],
  ['integer', 'int128', 'integer (int128)'],
  ['a', 'b', 'a (b)']
];

describe('Data Types', () => {
  it('should convert type and format to the common names', () => {
    fixture.map(usecase => {
      expect(transformDataTypes(usecase[0], usecase[1])).to.be.equal(usecase[2]);
    });
  });
});
