import { OpenAPIV2, OpenAPIV3, OpenAPIV3_1 } from 'openapi-types';
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
export function transformInfo(
  info: OpenAPIV2.InfoObject | OpenAPIV3.InfoObject | OpenAPIV3_1.InfoObject,
) {
  const md = Markdown.md();
  if (info !== null && typeof info === 'object') {
    if ('title' in info) {
      md.line(md.string(info.title).h1());
    }

    if ('summary' in info && info.summary) {
      md.line(md.string(info.summary).escape()).line();
    }

    if ('description' in info && info.description) {
      const descriptionLines = info.description.split('\n');
      let prevIsList = false;
      for (let i = 0; i < descriptionLines.length; i++) {
        const line = descriptionLines[i];
        const isList = /^\s*[-*+]\s/.test(line);
        // Insert blank line at list boundaries; tidyMarkdown deduplicates
        if (i > 0 && isList !== prevIsList) {
          md.line();
        }
        md.line(md.string(line).escape());
        prevIsList = isList;
      }
      md.line();
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

    if ('license' in info && Object.keys(info.license).length) {
      md.line(transformLicense(info.license));
    }
  }
  return md.length ? md.export() : null;
}
