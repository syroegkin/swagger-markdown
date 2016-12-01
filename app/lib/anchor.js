/**
 * Make camel case format
*/
module.exports = input => input
  .replace(/[^\b\w\s]/ig, '')
  .replace(/^\s*/ig, '')
  .replace(/(?:^\w|[A-Z]|\b\w)/g, (letter, index) =>
    index === 0 ? letter.toLowerCase() : letter.toUpperCase()
  ).replace(/\s+/g, '');
