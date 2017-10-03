"use strict";

/**
 * Checks if a value exists in an array
 * @param {string|number} needle
 * @param {Array} haystack
 * @returns {boolean}
 */
module.exports = function (needle, haystack) {
  if (haystack === undefined || haystack === null) return false;
  if (haystack.length) {
    for (var i = 0; i < haystack.length; i++) {
      if (needle === haystack[i]) {
        return true;
      }
    }
  }
  return false;
};