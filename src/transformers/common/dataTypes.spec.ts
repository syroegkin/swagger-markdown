import { expect } from 'chai';
import { dataTypeResolver } from './dataTypes';
import { Schema as V2Schema } from '../v2/models/Schema';
import { Schema as V3Schema } from '../v3-3_1/models/Schema';
import { anchor } from '../../lib/anchor';

const fixture = [
  // References
  [
    new V2Schema({ $ref: '#/definitions/ErrorModel' }),
    `[ErrorModel](#${anchor('ErrorModel model')})`,
  ],
  // Standard usecases
  [new V2Schema({ type: 'integer', format: 'int32' }), 'integer'],
  [new V2Schema({ type: 'integer' }), 'integer'],
  [new V2Schema({ type: 'integer', format: 'int64' }), 'long'],
  [new V2Schema({ type: 'number', format: 'float' }), 'float'],
  [new V2Schema({ type: 'number', format: 'double' }), 'double'],
  [new V2Schema({ type: 'number' }), 'number'],
  [new V2Schema({ type: 'string' }), 'string'],
  [new V2Schema({ type: 'string', format: 'byte' }), 'byte'],
  [new V2Schema({ type: 'string', format: 'binary' }), 'binary'],
  [new V2Schema({ type: 'boolean' }), 'boolean'],
  [new V2Schema({ type: 'string', format: 'date' }), 'date'],
  [new V2Schema({ type: 'string', format: 'date-time' }), 'dateTime'],
  [new V2Schema({ type: 'string', format: 'password' }), 'password'],
  [new V2Schema({ type: ['string', 'boolean'] }), 'string, boolean'],
  [new V2Schema({ type: ['string', 'boolean'], format: 'truefalsy' }), 'string (truefalsy), boolean (truefalsy)'],
  // Arrays
  [
    new V2Schema({
      type: 'array',
      items: { type: 'string' },
    }), '[ string ]',
  ], [
    new V2Schema({
      type: 'array',
      items: { $ref: '#/definitions/ErrorModel' },
    }), `[ [ErrorModel](#${anchor('ErrorModel model')}) ]`],
  // Weird usecases
  [new V2Schema({ type: 'random', format: 'number' }), 'random (number)'],
  [new V2Schema({ type: 'integer', format: 'int128' }), 'integer (int128)'],
  [new V2Schema({ type: 'a', format: 'b' }), 'a (b)'],
  // Empty schema
  [new V2Schema(), ''],
  [(new V2Schema()).setType(null as any).setFormat(null as any), ''],
  // Objects
  [new V2Schema({
    type: 'object',
    properties: {
      data: {
        type: 'array',
        items: {
          type: 'object',
          properties: {
            notificationId: {
              type: 'integer',
              description: 'ID of the notification',
            },
          },
        },
      },
    },
  // @todo: the schema according to the types is incorrect, although it is been seen in many places
  } as any), '{ **"data"**: [ { **"notificationId"**: integer } ] }'],
];

describe('Data Types', () => {
  it('should convert type and format to the common names', () => {
    fixture.forEach((usecase) => {
      expect(dataTypeResolver(usecase[0] as V2Schema)).to.be.equal(usecase[1]);
    });
  });

  it('should work with V3 Schema objects', () => {
    const schema = new V3Schema({ type: 'string', format: 'date-time' });
    expect(dataTypeResolver(schema)).to.equal('dateTime');
  });

  it('should resolve V3 Schema references', () => {
    const schema = new V3Schema({ $ref: '#/components/schemas/Pet' } as any);
    expect(dataTypeResolver(schema)).to.equal(`[Pet](#${anchor('Pet schema')})`);
  });

  it('should render enum values for V3 schemas', () => {
    const schema = new V3Schema({ type: 'string', enum: ['active', 'inactive'] });
    const result = dataTypeResolver(schema);
    expect(result).to.include('Available values:');
    expect(result).to.include('"active"');
    expect(result).to.include('"inactive"');
  });

  it('should render default value for V3 schemas', () => {
    const schema = new V3Schema({ type: 'string', default: 'hello' });
    const result = dataTypeResolver(schema);
    expect(result).to.include('Default:');
    expect(result).to.include('hello');
  });
});
