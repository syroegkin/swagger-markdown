/**
 * Make camel case format
*/
module.exports = input => input
  .replace(/\s+/g, '-')
  .replace(/^-*/ig, '')
  .replace(/-*$/ig, '')
  .toLowerCase();
