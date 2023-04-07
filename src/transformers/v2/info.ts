import { OpenAPIV2 } from 'openapi-types';
import { transformContact } from './contact';
import { transformLicense } from './license';
import { Markdown } from '../../lib/markdown';

/**
 * http://swagger.io/specification/#infoObject
 * Prepare page header
 * Leave description with no changes
 * @param {Object} info
 * @returns {String}
 */
export function transformInfo(info: OpenAPIV2.InfoObject) {
  const md = Markdown.md();
  if (info !== null && typeof info === 'object') {
    if ('title' in info) {
      md.line(md.string(info.title).h1());
    }

    if ('description' in info) {
      md.line(md.string(info.description).escape()).line();
    }

    if ('version' in info) {
      md.line(md.string(`Version: ${info.version}`).h2()).line();
    }

    if ('termsOfService' in info) {
      md.line(md.string('Terms of service').h3())
        .line(md.string(info.termsOfService).escape())
        .line();
    }

    if ('contact' in info && Object.keys(info.contact).length) {
      md.line(transformContact(info.contact));
    }

    if ('license' in info && Object.keys(info.contact).length) {
      md.line(transformLicense(info.license));
    }
  }
  return md.length ? md.export() : null;
}
