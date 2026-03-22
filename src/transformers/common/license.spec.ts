import { expect } from 'chai';
import { OpenAPIV2 } from 'openapi-types';
import { transformLicense } from './license';

describe('License field', () => {
  it('should not create header if information is not provided', () => {
    const fixture = {
      license: {} as OpenAPIV2.LicenseObject,
    };
    const res = transformLicense(fixture.license);
    expect(res).to.be.equal(null);
  });
  it('should create license as link with name', () => {
    const fixture = {
      license: {
        name: 'Apache 2.0',
        url: 'https://www.apache.org/licenses/LICENSE-2.0.html',
      } as OpenAPIV2.LicenseObject,
    };
    const res = transformLicense(fixture.license);
    const result = `**License:** [${fixture.license.name}]`
      + `(${fixture.license.url})\n`;
    expect(res).to.be.equal(result);
  });
  it('should create license name as text if ony one field is available', () => {
    const fixture = {
      license: {
        name: 'Apache 2.0',
      } as OpenAPIV2.LicenseObject,
    };
    const res = transformLicense(fixture.license);
    const result = `**License:** ${fixture.license.name}\n`;
    expect(res).to.be.equal(result);
  });
  it('should create license url as text if ony one field is available', () => {
    const fixture = {
      license: {
        url: 'https://www.apache.org/licenses/LICENSE-2.0.html',
      } as OpenAPIV2.LicenseObject,
    };
    const res = transformLicense(fixture.license);
    const result = `**License:** ${fixture.license.url}\n`;
    expect(res).to.be.equal(result);
  });
  it('should render name with SPDX identifier (v3.1)', () => {
    const res = transformLicense({ name: 'Apache 2.0', identifier: 'Apache-2.0' } as any);
    expect(res).to.equal('**License:** Apache 2.0 (Apache-2.0)\n');
  });
  it('should render identifier alone when no name or url', () => {
    const res = transformLicense({ identifier: 'MIT' } as any);
    expect(res).to.equal('**License:** MIT\n');
  });
});
