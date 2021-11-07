const escapeTable = {
    '|': '\\|',
    '\\': '\\\\', // backslash itself
};
/**
 * Escape special characters for the text part
 * @param {string} text to escape
 * @returns {string}
 */
module.exports = (text) => text.split('').map((character) => escapeTable[character] || character).join('');
//# sourceMappingURL=textEscape.js.map