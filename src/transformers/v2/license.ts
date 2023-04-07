import { OpenAPIV2 } from 'openapi-types';
import { Markdown } from '../../lib/markdown';

/**
 * http://swagger.io/specification/#licenseObject
 * License object transformer
 */
export function transformLicense(license: OpenAPIV2.LicenseObject): string {
  const md = Markdown.md();

  if ('url' in license || 'name' in license) {
    const licenseDocument = md.string('License:').bold();
    let url;
    if ('url' in license && 'name' in license) {
      url = md.string().link(license.name, license.url);
    } else {
      url = md.string(license.name || license.url);
    }
    md.line(licenseDocument, ' ', url);
  }

  return md.export();
}
