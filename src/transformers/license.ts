import { OpenAPIV2 } from 'openapi-types';
import { Markdown } from '../lib/markdown';

/**
 * http://swagger.io/specification/#licenseObject
 * License object transformer
 */
export function transformLicense(license: OpenAPIV2.LicenseObject): string {
  const md = new Markdown();

  if ('url' in license || 'name' in license) {
    md.line('License:').bold().line(' ');
    if ('url' in license && 'name' in license) {
      md.link(license.name, license.url);
    } else {
      md.line(license.name || license.url);
    }
    md.append();
  }

  return md.export();
}
