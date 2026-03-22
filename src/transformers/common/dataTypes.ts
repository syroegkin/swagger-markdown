import { anchor } from '../../lib/anchor';
import { Markdown } from '../../lib/markdown';

// Suffixes appended to schema/definition headings to avoid anchor collisions with tag headings.
// Must stay in sync: link generation in dataTypeResolver uses these same suffixes.
export const V2_DEFINITION_SUFFIX = 'Model';
export const V3_SCHEMA_SUFFIX = 'Schema';

export interface SchemaInterface {
  type?: string | string[];
  format?: string;
  ref?: string;
  allOf?: SchemaInterface[];
  oneOf?: SchemaInterface[];
  anyOf?: SchemaInterface[];
  items?: SchemaInterface;
  properties?: { [name: string]: SchemaInterface };
  getType?(): string | string[] | undefined;
  getFormat?(): string | undefined;
  getItems?(): SchemaInterface;
  getReference(): string | undefined;
  getAllOf?(): SchemaInterface[];
  getOneOf?(): SchemaInterface[];
  getAnyOf?(): SchemaInterface[];
  nullable?: boolean;
  getNullable?(): boolean;
  getDefault?(): unknown;
  getEnum?(): unknown[];
}

const resolver = {
  integer: {
    int32: 'integer',
    int64: 'long',
  },
  number: {
    float: 'float',
    double: 'double',
  },
  string: {
    byte: 'byte',
    binary: 'binary',
    date: 'date',
    'date-time': 'dateTime',
    password: 'password',
  },
};

function resolveKnownType(type: string, format: string): string | undefined {
  if (type in resolver) {
    if (format) {
      return format in resolver[type]
        ? resolver[type][format]
        : `${type} (${format})`;
    }
    return type;
  }
  return undefined;
}

// eslint-disable-next-line no-use-before-define
type Resolver = (schema: SchemaInterface) => string;

function resolveComposition(
  schemas: SchemaInterface[] | undefined,
  separator: string,
  resolve: Resolver,
): string | null {
  if (!schemas) return null;
  const result = schemas.map((subSchema) => resolve(subSchema))
    .filter((type) => type !== '')
    .join(separator);
  return result || null;
}

export const dataTypeResolver = (schema: SchemaInterface): string => {
  const composition = resolveComposition(schema.getAllOf?.(), ' & ', dataTypeResolver)
    ?? resolveComposition(schema.getOneOf?.(), ' or ', dataTypeResolver)
    ?? resolveComposition(schema.getAnyOf?.(), ' or ', dataTypeResolver);
  if (composition) {
    return schema.getNullable?.() ? `${composition} or null` : composition;
  }

  const md = Markdown.md();

  const reference = schema.getReference();
  if (reference) {
    const name = reference.match(/\/([^/]*)$/i)[1];
    const suffix = reference.includes('/definitions/')
      ? V2_DEFINITION_SUFFIX : V3_SCHEMA_SUFFIX;
    const link = anchor(`${name} ${suffix}`);
    const resolved = md.string().link(name, `#${link}`).get();
    return schema.getNullable?.() ? `${resolved} or null` : resolved;
  }

  // Cast it to the array
  const schemaType = schema.getType();
  const types: string[] = Array.isArray(schemaType) ? schemaType : [schemaType];
  const format = schema.getFormat();

  const resolveResults = types.map((type: string) => {
    const known = resolveKnownType(type, format);
    if (known !== undefined) {
      return known;
    }

    if (format) {
      return `${type} (${format})`;
    }

    if (type === 'array') {
      const subType = dataTypeResolver(schema.getItems());
      return `[ ${subType} ]`;
    }

    // If schema has properties, it means that type is object
    // we can simply skip this check, furthemore some yaml files may just miss it
    if (Object.keys(schema.properties).length > 0) {
      const { properties } = schema;
      const values = Object.values(properties).map((p) => dataTypeResolver(p));
      const keys = Object.keys(properties);
      const pairs = [];
      for (let i = 0; i < keys.length; i++) {
        pairs.push(
          md.string(`"${keys[i]}"`)
            .bold()
            .concat(`: ${values[i]}`).get(),
        );
      }
      return `{ ${pairs.join(', ')} }`;
    }

    if (type) {
      return md.string(type).get();
    }

    return md.string('').get();
  }).filter((s) => s.length > 0); // and filter out empty strings

  const schemaEnum = schema.getEnum?.();
  if (schemaEnum && schemaEnum.length > 0) {
    const enumValues = schemaEnum.map((value) => {
      if (typeof value === 'string') {
        return md.string(`"${value}"`).get();
      }
      return md.string(`${value}`).get();
    });
    resolveResults.push(
      md.string().br(true).concat(
        md.string('Available values:').bold().concat(` ${enumValues.join(', ')}`),
      ).get(),
    );
  }

  const schemaDefault = schema.getDefault?.();
  if (schemaDefault) {
    resolveResults.push(
      md.string().br(true).concat(
        md.string('Default:').bold().concat(` ${schemaDefault}`),
      ).get(),
    );
  }

  const resolved = md.string(resolveResults.join(', ')).get();
  return schema.getNullable?.() ? `${resolved} or null` : resolved;
};
