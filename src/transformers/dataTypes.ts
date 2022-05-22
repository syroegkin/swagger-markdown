import { anchor } from '../lib/anchor';
import { Markdown } from '../lib/markdown';
import { SchemaInterface } from '../models/schema';

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
  if (type) {
    return type;
  }
  return '';
};
