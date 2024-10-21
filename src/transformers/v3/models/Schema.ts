import { OpenAPIV3 } from 'openapi-types';

export interface SchemaInterface {
  type?: string;
  format?: string;
  ref?: string;
  allOf?: SchemaInterface[];
  items?: SchemaInterface;
  properties?: { [name: string]: SchemaInterface };
  getType?(): string | undefined;
  getFormat?(): string | undefined;
  getItems?(): SchemaInterface;
  getAllOf?(): SchemaInterface[];
}

export class Schema implements SchemaInterface {
  public type?: string;

  public format?: string;

  public ref?: string;

  public allOf?: SchemaInterface[];

  public items?: SchemaInterface;

  public properties?: { [name: string]: SchemaInterface } = {};

  /**
   * constructor
   *
   * @param {Object} [schema=null]
   */
  constructor(schema?: Partial<OpenAPIV3.SchemaObject>) {
    if (schema) {
      if ('type' in schema) {
        this.setType(schema.type);
      }
      if ('format' in schema) {
        this.setFormat(schema.format);
      }
      if ('items' in schema) {
        this.setItems(schema.items);
      }
      if ('allOf' in schema) {
        this.setAllOf(schema.allOf);
      }
      if ('properties' in schema) {
        // At this point the document is dereferenced
        // So we can avoid the reference here
        this.setProperties(schema.properties);
      }
    }
  }

  public setProperties(properties: {
    [name: string]: OpenAPIV3.SchemaObject | OpenAPIV3.ReferenceObject
  }): Schema {
    Object.keys(properties).forEach(
      (name) => {
        this.properties[name] = new Schema(properties[name] as OpenAPIV3.SchemaObject);
      },
    );
    return this;
  }

  /**
   * @param {String} type
   */
  public setType(type: string | string[]): Schema {
    // @todo: wtf
    this.type = type as string;
    return this;
  }

  /**
   * @param {Array<Object>} allOf
   */
  public setAllOf(allOf) {
    this.allOf = allOf.map((schema) => new Schema(schema));
    return this;
  }

  /**
   * @param {String} format
   */
  public setFormat(format: string): Schema {
    this.format = format;
    return this;
  }

  /**
   * @param {Object} items
   */
  setItems(items) {
    this.items = new Schema(items);
    return this;
  }

  /**
   * @return {String}
   */
  public getType(): string | undefined {
    return this.type;
  }

  /**
   * @return {String}
   */
  public getFormat(): string | undefined {
    return this.format;
  }

  /**
   * @return {Object}
   */
  public getItems(): SchemaInterface {
    return this.items;
  }

  /**
   * @return {Array<Schema>}
   */
  public getAllOf(): SchemaInterface[] {
    return this.allOf;
  }

  public getProperties() {
    return this.properties;
  }
}
