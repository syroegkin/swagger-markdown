import { OpenAPIV2, OpenAPIV3 } from 'openapi-types';
import { Markdown } from '../../../lib/markdown';
import { MDstring } from '../../../lib/markdown/mdstring';

/**
 * @todo: add extensions, e.g. ^x-
 */
export function transformLicense(
  license: OpenAPIV2.LicenseObject | OpenAPIV3.LicenseObject,
): string {
  const md = Markdown.md();

  if ('url' in license || 'name' in license) {
    const licenseDocument = md.string('License:').bold();
    let url: MDstring;
    if ('url' in license && 'name' in license) {
      url = md.string().link(license.name, license.url);
    } else {
      url = md.string(license.name || license.url);
    }
    md.line(licenseDocument, ' ', url);
  }

  return md.export();
}
