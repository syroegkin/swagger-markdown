import { OpenAPIV2 } from 'openapi-types';

export interface SchemaInterface {
  type?: OpenAPIV2.SchemaObject['type'];
  format?: string;
  ref?: string;
  allOf?: SchemaInterface[];
  items?: SchemaInterface;
  properties?: { [name: string]: SchemaInterface };
  getType(): OpenAPIV2.SchemaObject['type'] | undefined;
  getFormat(): string | undefined;
  getItems(): SchemaInterface | undefined;
  getReference(): string | undefined;
  getAllOf(): SchemaInterface[] | undefined;
}

export class Schema implements SchemaInterface {
  public type?: OpenAPIV2.SchemaObject['type'];

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
      // Custom property
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
  public setProperties(properties: { [name: string]: OpenAPIV2.SchemaObject}): this {
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
  public setType(type: OpenAPIV2.SchemaObject['type']): this {
    this.type = type;
    return this;
  }

  /**
   * @param {Array<Object>} allOf
   */
  public setAllOf(allOf): this {
    this.allOf = allOf.map((schema) => new Schema(schema));
    return this;
  }

  /**
   * @param {String} format
   */
  public setFormat(format: string): this {
    this.format = format;
    return this;
  }

  /**
   * @param {Object} items
   */
  public setItems(items: OpenAPIV2.SchemaObject['items']): this {
    this.items = new Schema(items);
    return this;
  }

  /**
   * @param {String} ref
   */
  public setReference(ref: string): this {
    this.ref = ref;
    return this;
  }

  /**
   * @return {String}
   */
  public getType(): OpenAPIV2.SchemaObject['type'] | undefined {
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
  public getItems(): SchemaInterface | undefined {
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
