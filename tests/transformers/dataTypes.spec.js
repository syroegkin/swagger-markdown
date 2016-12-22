const expect = require('chai').expect;
const transformDataTypes = require('../../app/transformers/dataTypes');
const Schema = require('../../app/models/schema');
const anchor = require('../../app/lib/anchor');

const fixture = [
  // References
  [
    new Schema({ $ref: '#/definitions/ErrorModel' }),
    `[ErrorModel](#${anchor('ErrorModel')})`
  ],
  // Standard usecases
  [new Schema({ type: 'integer', format: 'int32' }), 'integer'],
  [new Schema({ type: 'integer' }), 'integer'],
  [new Schema({ type: 'integer', format: 'int64' }), 'long'],
  [new Schema({ type: 'number', format: 'float' }), 'float'],
  [new Schema({ type: 'number', format: 'double' }), 'double'],
  [new Schema({ type: 'number' }), 'number'],
  [new Schema({ type: 'string' }), 'string'],
  [new Schema({ type: 'string', format: 'byte' }), 'byte'],
  [new Schema({ type: 'string', format: 'binary' }), 'binary'],
  [new Schema({ type: 'boolean' }), 'boolean'],
  [new Schema({ type: 'string', format: 'date' }), 'date'],
  [new Schema({ type: 'string', format: 'date-time' }), 'dateTime'],
  [new Schema({ type: 'string', format: 'password' }), 'password'],
  // Arrays
  [
    new Schema({
      type: 'array',
      items: new Schema({ type: 'string' })
    }), '[ string ]'
  ], [
    new Schema({
      type: 'array',
      items: { $ref: '#/definitions/ErrorModel' }
    }), `[ [ErrorModel](#${anchor('ErrorModel')}) ]`],
  // Weird usecases
  [new Schema({ type: 'random', format: 'number' }), 'random (number)'],
  [new Schema({ type: 'integer', format: 'int128' }), 'integer (int128)'],
  [new Schema({ type: 'a', format: 'b' }), 'a (b)'],
  // Empty schema
  [new Schema(), ''],
  [(new Schema()).setType(null).setFormat(null), '']
];

describe('Data Types', () => {
  it('should convert type and format to the common names', () => {
    fixture.map(usecase => {
      expect(transformDataTypes(usecase[0])).to.be.equal(usecase[1]);
    });
  });
});
