import { anchor } from '../../lib/anchor';
import { Markdown } from '../../lib/markdown';
import { SchemaInterface } from '../../models/Schema';

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

/**
 * Transform data types into common names
 * @param {Schema} schema
 * @return {String}
 */
export const dataTypeResolver = (schema: SchemaInterface): string => {
  const md = Markdown.md();

  const all = schema.getAllOf();
  if (all) {
    return all.map((subSchema: SchemaInterface) => dataTypeResolver(subSchema))
      .filter((type) => type !== '')
      .join(' & ');
  }

  const reference = schema.getReference();
  if (reference) {
    const name = reference.match(/\/([^/]*)$/i)[1];
    const link = anchor(name);
    return md.string().link(name, `#${link}`).get();
  }

  const type = schema.getType();
  const format = schema.getFormat();
  if (type in resolver) {
    if (format) {
      return format in resolver[type]
        ? resolver[type][format]
        : `${type} (${format})`;
    }
    return type;
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
};
