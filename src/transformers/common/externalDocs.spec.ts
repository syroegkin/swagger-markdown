import { expect } from 'chai';
import { OpenAPIV2 } from 'openapi-types';
import { transformExternalDocs } from './externalDocs';

const fixture = {
  notext: {
    source: {
      url: 'https://google.com',
    },
    result: '[Find more info here](https://google.com)\n',
  },
  full: {
    source: {
      url: 'https://yahoo.com',
      description: 'RTFM',
    },
    result: '[RTFM](https://yahoo.com)\n',
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
