const escapeTable = {
  '|': '\\|', // pipe
  '\\': '\\\\', // backslash itself
};

/**
 * Escape special characters for the text part
 * @param {string} text to escape
 * @returns {string}
 */
export const textEscape = (text: string): string => text
  .split('')
  .map((character) => escapeTable[character] || character).join('');
