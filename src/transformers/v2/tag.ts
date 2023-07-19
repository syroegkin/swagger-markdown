import { OpenAPIV2 } from 'openapi-types';
import { Markdown } from '../../lib/markdown';

export function transformTag(tag: OpenAPIV2.TagObject | '') {
  const md = Markdown.md();

  // If tag is just en empty line, then this means
  // we got a records with no tags, while other paths has tags.
  // display it as a default
  if (typeof (tag) === 'string' && tag === '') {
    md.line(md.string('default').h2());
    return md.export();
  }

  if (!tag || !tag.name) {
    throw new Error('No tag was provided');
  }

  const title = md.string(tag.name).h2();

  // External docs without description
  // In this case make a link from the title
  if (tag.externalDocs && tag.externalDocs.url && !tag.externalDocs.description) {
    md.line(md.string().link(title.get(), tag.externalDocs.url));
  } else {
    md.line(title);
  }

  if (tag.description) {
    md.line(tag.description);
  }

  // If we got external doc with description and url, make additional line
  if (tag.externalDocs && tag.externalDocs.url && tag.externalDocs.description) {
    md.line(md.string().link(
      tag.externalDocs.description,
      tag.externalDocs.url,
    ));
  }

  return md.export();
}
