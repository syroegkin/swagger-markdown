import { OpenAPIV2 } from 'openapi-types';
import { transformContact } from './contact';
import { transformLicense } from './license';
import { textEscape } from '../lib/textEscape';
// import { Markdown } from '../lib/markdown';

/**
 * http://swagger.io/specification/#infoObject
 * Prepare page header
 * Leave description with no changes
 * @param {Object} info
 * @returns {String}
 */
export function transformInfo(info: OpenAPIV2.InfoObject) {
  const res: string[] = [];
  if (info !== null && typeof info === 'object') {
    if ('title' in info) {
      res.push(`# ${info.title}`);
    }

    if ('description' in info) {
      res.push(`${textEscape(info.description)}\n`);
    }

    if ('version' in info) {
      res.push(`## Version: ${info.version}\n`);
    }

    if ('termsOfService' in info) {
      res.push(`### Terms of service\n${textEscape(info.termsOfService)}\n`);
    }

    if ('contact' in info) {
      res.push(transformContact(info.contact));
    }

    if ('license' in info) {
      res.push(transformLicense(info.license));
    }
  }
  return res.length ? res.join('\n') : null;
}
