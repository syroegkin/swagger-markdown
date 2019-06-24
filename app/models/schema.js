class Schema {
  /**
   * constructor
   *
   * @param {Object} [schema=null]
   */
  constructor(schema = null) {
    if (schema !== null) {
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
    }
  }

  /**
   * @param {String} type
   */
  setType(type) {
    this.type = type;
    return this;
  }

  /**
   * @param {Array<Object>} allOf
   */
  setAllOf(allOf) {
    this.allOf = allOf.map(schema => new Schema(schema));
    return this;
  }

  /**
   * @param {String} format
   */
  setFormat(format) {
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
  setReference(ref) {
    this.ref = ref;
    return this;
  }

  /**
   * @return {String}
   */
  getType() {
    return this.type;
  }

  /**
   * @return {String}
   */
  getFormat() {
    return this.format;
  }

  /**
   * @return {Object}
   */
  getItems() {
    return this.items;
  }

  /**
   * @return {String}
   */
  getReference() {
    return this.ref;
  }

  /**
   * @return {Array<Schema>}
   */
  getAllOf() {
    return this.allOf;
  }
}

module.exports = Schema;
