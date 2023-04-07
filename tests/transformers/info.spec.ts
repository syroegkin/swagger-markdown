import { expect } from 'chai';
import { OpenAPIV2 } from 'openapi-types';
import { transformInfo } from '../../src/transformers/v2/info';

describe('Info transformer', () => {
  it('should return null if nothing was passed', () => {
    expect(transformInfo({} as OpenAPIV2.InfoObject)).to.be.equal(null);
    // @ts-ignore
    expect(transformInfo()).to.be.equal(null);
  });

  it('should create title if title is listed', () => {
    const fixture = {
      title: 'Doc title',
    } as OpenAPIV2.InfoObject;
    const results = {
      underline: '=========',
    };

    const res = transformInfo(fixture)!.split('\n');
    expect(res[0]).to.be.equal(`# ${fixture.title}`);
    // Underline is same length as a title
    expect(res[1]).to.be.not.equal(results.underline);
  });

  it('should return description as is', () => {
    const fixture = {
      description: 'Here is a description',
    } as OpenAPIV2.InfoObject;
    const res = transformInfo(fixture);
    expect(res).to.be.equal(`${fixture.description}\n\n`);
  });

  it('should return proper doc generated for the title and description', () => {
    const fixture = {
      title: 'Document title',
      description: 'Document description',
      version: '1.0.1',
    };
    const result = '# Document title\n'
      + 'Document description\n\n'
      + '## Version: 1.0.1\n\n';
    const res = transformInfo(fixture);
    expect(res).to.be.equal(result);
  });

  it('should create term of service block', () => {
    const fixture = {
      termsOfService: 'Terms of service',
    } as OpenAPIV2.InfoObject;
    const result = `### Terms of service\n${fixture.termsOfService}\n\n`;
    const res = transformInfo(fixture);
    expect(res).to.be.equal(result);
  });
});
