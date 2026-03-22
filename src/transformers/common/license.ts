import { OpenAPIV2, OpenAPIV3, OpenAPIV3_1 } from 'openapi-types';
import { Markdown } from '../../lib/markdown';
import { MDstring } from '../../lib/markdown/mdstring';

/**
 * @todo: add extensions, e.g. ^x-
 */
export function transformLicense(
  license: OpenAPIV2.LicenseObject | OpenAPIV3.LicenseObject | OpenAPIV3_1.LicenseObject,
): string {
  const md = Markdown.md();

  if ('url' in license || 'name' in license || 'identifier' in license) {
    const licenseDocument = md.string('License:').bold();
    let value: MDstring;
    if ('url' in license && 'name' in license) {
      value = md.string().link(license.name, license.url);
    } else if ('identifier' in license && license.identifier && 'name' in license) {
      value = md.string(`${license.name} (${license.identifier})`);
    } else if ('identifier' in license && license.identifier) {
      value = md.string(license.identifier);
    } else {
      value = md.string(license.name || license.url);
    }
    md.line(licenseDocument, ' ', value);
  }

  return md.export();
}
