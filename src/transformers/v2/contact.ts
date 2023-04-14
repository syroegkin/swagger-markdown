import { OpenAPIV2 } from 'openapi-types';
import { Markdown } from '../../lib/markdown';

/**
 * http://swagger.io/specification/#contactObject
 * Contact info transformer
 */
export function transformContact(contact: OpenAPIV2.ContactObject) {
  const md = Markdown.md();

  if (Object.keys(contact).some(
    (item) => ['name', 'url', 'email'].includes(item),
  )) {
    md.line(
      md.string('Contact information:').bold().br(),
    );

    if ('name' in contact) {
      md.line(md.string(contact.name).escape().br());
    }
    if ('url' in contact) {
      md.line(md.string(contact.url).escape().br());
    }
    if ('email' in contact) {
      md.line(md.string(contact.email).escape().br());
    }
  }

  return md.export();
}
