import { OpenAPIV2 } from 'openapi-types';

export class TagsCollection {
  private tags: { [key: string]: OpenAPIV2.TagObject } = {};

  public get length(): number {
    return Object.keys(this.tags).length;
  }

  public tag(tag: OpenAPIV2.TagObject): TagsCollection {
    if (!('name' in tag)) {
      throw new Error('Tag must have name property');
    }
    this.tags[tag.name] = tag;
    return this;
  }

  public getTag(name: string): OpenAPIV2.TagObject | null {
    if (name in this.tags) {
      return this.tags[name];
    }
    return null;
  }
}
