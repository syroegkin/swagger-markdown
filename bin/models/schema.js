'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Schema = function () {
  /**
   * constructor
   *
   * @param {Object} [schema=null]
   */
  function Schema() {
    var schema = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : null;

    _classCallCheck(this, Schema);

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
    }
  }

  /**
   * @param {String} type
   */


  _createClass(Schema, [{
    key: 'setType',
    value: function setType(type) {
      this.type = type;
      return this;
    }

    /**
     * @param {String} format
     */

  }, {
    key: 'setFormat',
    value: function setFormat(format) {
      this.format = format;
      return this;
    }

    /**
     * @param {Object} items
     */

  }, {
    key: 'setItems',
    value: function setItems(items) {
      this.items = new Schema(items);
      return this;
    }

    /**
     * @param {String} ref
     */

  }, {
    key: 'setReference',
    value: function setReference(ref) {
      this.ref = ref;
      return this;
    }

    /**
     * @return {String}
     */

  }, {
    key: 'getType',
    value: function getType() {
      return this.type;
    }

    /**
     * @return {String}
     */

  }, {
    key: 'getFormat',
    value: function getFormat() {
      return this.format;
    }

    /**
     * @return {Object}
     */

  }, {
    key: 'getItems',
    value: function getItems() {
      return this.items;
    }

    /**
     * @return {String}
     */

  }, {
    key: 'getReference',
    value: function getReference() {
      return this.ref;
    }
  }]);

  return Schema;
}();

module.exports = Schema;