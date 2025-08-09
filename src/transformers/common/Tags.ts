import { OpenAPIV2, OpenAPIV3 } from 'openapi-types';

type AnyTagObject = OpenAPIV2.TagObject | OpenAPIV3.TagObject;

export class TagsCollection<T extends AnyTagObject = AnyTagObject> {
  private tags: { [key: string]: T } = {};

  public get length(): number {
    return Object.keys(this.tags).length;
  }

  public tag(tag: T): this {
    if (!('name' in tag)) {
      throw new Error('Tag must have name property');
    }
    this.tags[tag.name] = tag;
    return this;
  }

  public getTag(name: string): T | null {
    if (name in this.tags) {
      return this.tags[name];
    }
    return null;
  }
}
