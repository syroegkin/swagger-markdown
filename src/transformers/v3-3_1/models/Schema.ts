import { OpenAPIV3, OpenAPIV3_1 } from 'openapi-types';
import { SchemaInterface } from '../../common/dataTypes';

export class Schema implements SchemaInterface {
  public type?: string;

  public format?: string;

  public ref?: string;

  public allOf?: SchemaInterface[];

  public oneOf?: SchemaInterface[];

  public anyOf?: SchemaInterface[];

  public items?: SchemaInterface;

  public properties?: { [name: string]: SchemaInterface } = {};

  public defaultValue?: unknown;

  public enum?: unknown[] = [];

  /**
   * constructor
   *
   * @param schema Schema or reference (V3 or V3.1)
   */
  constructor(
    schema?: OpenAPIV3.SchemaObject | OpenAPIV3.ReferenceObject
    | OpenAPIV3_1.SchemaObject | OpenAPIV3_1.ReferenceObject,
  ) {
    if (schema) {
      // Check if it's a Reference Object
      if ('$ref' in schema) {
        this.setReference(schema.$ref);
      } else {
        // It's a Schema Object
        if ('type' in schema && schema.type) {
          this.setType(schema.type);
        }
        if ('format' in schema && schema.format) {
          this.setFormat(schema.format);
        }
        if ('items' in schema && schema.items) {
          this.setItems(schema.items);
        }
        if ('allOf' in schema && schema.allOf) {
          this.setAllOf(schema.allOf);
        }
        if ('oneOf' in schema && schema.oneOf) {
          this.setOneOf(schema.oneOf);
        }
        if ('anyOf' in schema && schema.anyOf) {
          this.setAnyOf(schema.anyOf);
        }
        if ('properties' in schema && schema.properties) {
          // At this point the document is dereferenced
          // So we can avoid the reference here
          this.setProperties(schema.properties);
        }
        if ('default' in schema) {
          this.setDefault(schema.default);
        }
        if ('enum' in schema && schema.enum) {
          this.enum = schema.enum;
        }
      }
    }
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
  public getReference(): string | undefined {
    return this.ref;
  }

  /**
   * @param {string} defaultValue
   * @return {*}  {Schema}
   * @memberof Schema
   */
  public setDefault(defaultValue: unknown): Schema {
    this.defaultValue = defaultValue;
    return this;
  }

  public setEnum(enumValues: unknown[]): Schema {
    this.enum = enumValues;
    return this;
  }

  /**
   * @param {({
   *     [name: string]: OpenAPIV3.SchemaObject | OpenAPIV3.ReferenceObject
   *   })} properties
   * @return {*}  {Schema}
   * @memberof Schema
   */
  public setProperties(properties: {
    [name: string]: OpenAPIV3.SchemaObject | OpenAPIV3.ReferenceObject
    | OpenAPIV3_1.SchemaObject | OpenAPIV3_1.ReferenceObject;
  }): Schema {
    Object.keys(properties).forEach(
      (name) => {
        this.properties[name] = new Schema(
          properties[name] as OpenAPIV3.SchemaObject | OpenAPIV3_1.SchemaObject,
        );
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
  public setAllOf(allOf: (OpenAPIV3.SchemaObject | OpenAPIV3.ReferenceObject
  | OpenAPIV3_1.SchemaObject | OpenAPIV3_1.ReferenceObject)[]): Schema {
    this.allOf = allOf.map((s) => new Schema(s));
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
   * @param {OpenAPIV3.SchemaObject | OpenAPIV3.ReferenceObject} items
   */
  setItems(items: OpenAPIV3.SchemaObject | OpenAPIV3.ReferenceObject
  | OpenAPIV3_1.SchemaObject | OpenAPIV3_1.ReferenceObject) {
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

  public setOneOf(oneOf: (OpenAPIV3.SchemaObject | OpenAPIV3.ReferenceObject
  | OpenAPIV3_1.SchemaObject | OpenAPIV3_1.ReferenceObject)[]): Schema {
    this.oneOf = oneOf.map((s) => new Schema(s));
    return this;
  }

  public getOneOf(): SchemaInterface[] {
    return this.oneOf;
  }

  public setAnyOf(anyOf: (OpenAPIV3.SchemaObject | OpenAPIV3.ReferenceObject
  | OpenAPIV3_1.SchemaObject | OpenAPIV3_1.ReferenceObject)[]): Schema {
    this.anyOf = anyOf.map((s) => new Schema(s));
    return this;
  }

  public getAnyOf(): SchemaInterface[] {
    return this.anyOf;
  }

  public getProperties() {
    return this.properties;
  }

  public getDefault(): unknown {
    return this.defaultValue;
  }

  public getEnum(): unknown[] {
    return this.enum;
  }
}
