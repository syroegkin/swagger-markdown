import { expect } from 'chai';
import { OpenAPIV2 } from 'openapi-types';
import { transformExternalDocs } from '../../src/transformers/v2/externalDocs';

const fixture = {
  notext: {
    source: {
      url: 'http://google.com',
    },
    result: '[Find more info here](http://google.com)\n',
  },
  full: {
    source: {
      url: 'http://yahoo.com',
      description: 'RTFM',
    },
    result: '[RTFM](http://yahoo.com)\n',
  },
};

describe('External docs', () => {
  it('Should return empty string if empty object  has been provided', () => {
    const result = transformExternalDocs({} as OpenAPIV2.ExternalDocumentationObject);
    expect(result).to.be.equal(null);
  });
  it('should return default text link if no text has been provided', () => {
    const result = transformExternalDocs(fixture.notext.source);
    expect(result).to.be.equal(fixture.notext.result);
  });
  it('should return description and link if both are set', () => {
    const result = transformExternalDocs(fixture.full.source);
    expect(result).to.be.equal(fixture.full.result);
  });
});
