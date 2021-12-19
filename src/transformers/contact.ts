import { OpenAPIV2 } from 'openapi-types';
import { Markdown } from '../lib/markdown';

/**
 * http://swagger.io/specification/#contactObject
 * Contact info transformer
 */
export function transformContact(contact: OpenAPIV2.ContactObject) {
  const md = new Markdown();

  if (Object.keys(contact).some(
    (item) => ['name', 'url', 'email'].includes(item),
  )) {
    md.line('Contact information:').bold().append();

    if ('name' in contact) {
      md.line(contact.name, true).append();
    }
    if ('url' in contact) {
      md.line(contact.url).append();
    }
    if ('email' in contact) {
      md.line(contact.email).append();
    }
  }

  return md.export();
}
