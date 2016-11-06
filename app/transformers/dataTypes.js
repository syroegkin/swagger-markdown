const resolver = {
  integer: {
    int32: 'integer',
    int64: 'long'
  },
  number: {
    float: 'float',
    double: 'double'
  },
  string: {
    byte: 'byte',
    binary: 'binary',
    date: 'date',
    'date-time': 'dateTime',
    password: 'password'
  }
};

/**
 * Transform data types into common names
 * @param {String} type
 * @param {mixed} format
 */
module.exports = (type, format = null) => {
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
  return type;
};
