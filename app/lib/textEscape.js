const escapeTable = {
  '\\': '\\\\', // backslash itself
  '`': '\\`', // backtick
  '*': '\\*', // asterisk
  '_': '\\_', // underscore
  '{': '\\{', // curly braces
  '}': '\\}', // curly braces
  '[': '\\[', // square brackets
  ']': '\\]', // square brackets
  '(': '\\(', // parentheses
  ')': '\\)', // parentheses
  '#': '\\#', // hash mark
  '+': '\\+', // plus sign
  '-': '\\-', // minus sign (hyphen)
  '!': '\\!', // exclamation mark
};

/**
 * Escape special characters for the text part
 * @param {string} text to escape
 * @returns {string}
 */
module.exports = (text) => text.split('').map(character => escapeTable[character] || character).join('');
