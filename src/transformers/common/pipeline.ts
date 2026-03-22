import { OpenAPIV2, OpenAPIV3, OpenAPIV3_1 } from 'openapi-types';
import { Markdown } from '../../lib/markdown';
import { TagsCollection } from './Tags';
import { transformTag } from './tag';

type AnyTagObject =
  OpenAPIV2.TagObject | OpenAPIV3.TagObject | OpenAPIV3_1.TagObject;

/**
 * Collect tags from a document into a TagsCollection.
 */
export function collectTags(tags: AnyTagObject[]): TagsCollection {
  const tagsCollection = new TagsCollection();
  tags.forEach((tag) => {
    tagsCollection.tag(tag);
  });
  return tagsCollection;
}

/**
 * Render paths grouped by tags with horizontal rules and tag headers.
 */
export function renderPathsByTags<P>(
  md: Markdown,
  tagged: { [tagName: string]: { [path: string]: P } },
  tagsCollection: TagsCollection,
  transformPathFn: (path: string, pathItem: P) => string | null,
): void {
  Object.keys(tagged).forEach((tagName) => {
    md.line(md.string().horizontalRule());
    if (tagsCollection.length) {
      const tagObject = tagsCollection.getTag(tagName) || '';
      md.line(transformTag(tagObject));
    }
    const pathsUnderTag = tagged[tagName];
    Object.keys(pathsUnderTag).forEach((path: string) => md.line(
      transformPathFn(path, pathsUnderTag[path]),
    ));
  });
}
