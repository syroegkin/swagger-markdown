import { expect } from 'chai';
import { assertValidDocument } from './assertValidDocument';

const check = (document: unknown) => () => assertValidDocument(document, 'api.yaml');

describe('assertValidDocument', () => {
  it('accepts Swagger 2.0 documents', () => {
    expect(check({ swagger: '2.0', info: { title: 't', version: '1' }, paths: {} })).to.not.throw();
    expect(check({ swagger: '2.0' })).to.not.throw();
  });

  it('accepts OpenAPI 3.0 and 3.1 documents', () => {
    ['3.0.0', '3.0.4', '3.1.0', '3.1.2'].forEach((openapi) => {
      expect(check({ openapi, info: { title: 't', version: '1' }, paths: {} })).to.not.throw();
    });
  });

  it('accepts OpenAPI 3.1 documents with webhooks only', () => {
    expect(check({ openapi: '3.1.0', webhooks: {} })).to.not.throw();
  });

  it('rejects anything that is not a Swagger/OpenAPI definition', () => {
    const message = 'api.yaml is not a valid Swagger/OpenAPI definition';
    expect(check(null)).to.throw(SyntaxError, message);
    expect(check('just a string')).to.throw(SyntaxError, message);
    expect(check([])).to.throw(SyntaxError, message);
    expect(check({ name: 'package', version: '1.0.0' })).to.throw(SyntaxError, message);
  });

  it('rejects OpenAPI documents with nothing to render', () => {
    const message = 'api.yaml is not a valid OpenAPI definition';
    expect(check({ openapi: '3.0.0' })).to.throw(SyntaxError, message);
    expect(check({ openapi: '3.0.0', webhooks: {} })).to.throw(SyntaxError, message);
    expect(check({ openapi: '3.1.0' })).to.throw(SyntaxError, message);
    expect(check({ openapi: '3.1.0', components: {} })).to.throw(SyntaxError, message);
  });

  describe('with versions written as numbers', () => {
    let warn: jest.SpyInstance;
    beforeEach(() => {
      warn = jest.spyOn(console, 'warn').mockImplementation(() => undefined);
    });
    afterEach(() => warn.mockRestore());

    it('reads the specification version as a string, with a warning', () => {
      const v2 = { swagger: 2.0, paths: {} };
      const v30 = { openapi: 3.0, paths: {} };
      const v31 = { openapi: 3.1, webhooks: {} };
      [v2, v30, v31].forEach((document) => expect(check(document)).to.not.throw());
      expect([v2.swagger, v30.openapi, v31.openapi]).to.eql(['2.0', '3.0', '3.1']);
      expect(warn.mock.calls).to.have.length(3);
      expect(warn.mock.calls).to.deep.include(['api.yaml: openapi is a number, read as "3.1". Quote it to keep it exactly as written.']);
    });

    it('reads the API version as a string, with a warning', () => {
      const document = { openapi: '3.0.0', info: { version: 1 }, paths: {} };
      expect(check(document)).to.not.throw();
      expect(document.info.version).to.equal('1');
      expect(warn.mock.calls).to.deep.include(['api.yaml: version is a number, read as "1". Quote it to keep it exactly as written.']);
    });

    it('rejects the version which is not supported', () => {
      expect(check({ swagger: 1.2, paths: {} }))
        .to.throw(SyntaxError, 'Unrecognized Swagger version: 1.2. Expected 2.0');
      expect(check({ openapi: 4, paths: {} }))
        .to.throw(SyntaxError, 'Unsupported OpenAPI version: 4.0. Supported versions are 3.0.x, 3.1.x');
    });
  });

  it('rejects unsupported versions', () => {
    expect(check({ swagger: '1.2', paths: {} }))
      .to.throw(SyntaxError, 'Unrecognized Swagger version: 1.2. Expected 2.0');
    expect(check({ openapi: '4.0.0', paths: {} }))
      .to.throw(SyntaxError, 'Unsupported OpenAPI version: 4.0.0. Supported versions are 3.0.x, 3.1.x');
    expect(check({ openapi: '3.2.0', paths: {} })).to.throw(SyntaxError, 'Unsupported OpenAPI version: 3.2.0.');
  });
});
