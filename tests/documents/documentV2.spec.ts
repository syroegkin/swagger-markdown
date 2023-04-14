import { expect } from 'chai';
import { transformSwaggerV2 } from '../../src/transformers/documentV2';

describe('transformSwaggerV2', () => {
  it('should create schemas', () => {
    const fixture = {
      swagger: '2.0',
      schemes: ['http', 'https'],
    };
    const expectedResult = '**Schemes:** http, https\n\n';
    const res = transformSwaggerV2(fixture as any, {} as any);
    expect(res).to.equal(expectedResult);
  });
});
