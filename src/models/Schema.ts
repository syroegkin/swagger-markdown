import { OpenAPIV2 } from 'openapi-types';

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
  getReference?(): string | undefined;
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
  constructor(schema?: Partial<OpenAPIV2.SchemaObject>) {
    if (schema) {
      if ('type' in schema) {
        this.setType(schema.type);
      }
      if ('format' in schema) {
        this.setFormat(schema.format);
      }
      if ('$ref' in schema) {
        this.setReference(schema.$ref);
      }
      if ('items' in schema) {
        this.setItems(schema.items);
      }
      if ('allOf' in schema) {
        this.setAllOf(schema.allOf);
      }
      if ('properties' in schema) {
        this.setProperties(schema.properties);
      }
    }
  }

  /**
   * @param {{ [name: string]: OpenAPIV2.SchemaObject}} properties
   * @return {*}  {Schema}
   * @memberof Schema
   */
  public setProperties(properties: { [name: string]: OpenAPIV2.SchemaObject}): Schema {
    Object.keys(properties).forEach(
      (name) => {
        this.properties[name] = new Schema(properties[name]);
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
  setAllOf(allOf) {
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
   * @param {String} ref
   */
  public setReference(ref: string): Schema {
    this.ref = ref;
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
   * @return {String}
   */
  public getReference(): string | undefined {
    return this.ref;
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
