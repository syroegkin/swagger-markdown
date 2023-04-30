import { expect } from 'chai';
import { transformHeaders } from '../../src/transformers/v2/headers';

describe('transformHeaders', () => {
  it('should return empty string if headers is empty', () => {
    const headers = {};
    const result = transformHeaders(headers);
    expect(result.toString()).to.equal('');
  });

  it('should return empty string if has no valid headers', () => {
    const headers = {
      invalid_header: {},
    };
    const result = transformHeaders(headers as any);
    const expected = '';
    expect(result.toString()).to.equal(expected);
  });

  it('should return header name and description if it exists', () => {
    const headers = {
      'Content-Type': {
        type: 'string',
        description: 'MIME type of the response',
      },
    };
    const result = transformHeaders(headers);
    const expected = '**Headers:**<br>'
      + '**Content-Type** (string): MIME type of the response<br>';
    expect(result.toString()).to.equal(expected);
  });

  it('should only return header name and type if description is missing', () => {
    const headers = {
      'X-RateLimit-Remaining': {
        type: 'integer',
      },
    };
    const result = transformHeaders(headers);
    const expected = '**Headers:**<br>'
      + '**X-RateLimit-Remaining** (integer)<br>';
    expect(result.toString()).to.equal(expected);
  });
});
