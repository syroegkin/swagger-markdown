const inArray = require('../lib/inArray');

/**
 * Allowed methods
 * @type {string[]}
 */
const ALLOWED_METHODS = ['get', 'post', 'put', 'patch', 'delete', 'options'];

module.exports = (path, data) => {
  const res = [];
  if (path && data) {
    // Make path as a header
    res.push(`### ${path}`);
    res.push('---');

    // Go further method by methods
    Object.keys(data).map(method => {
      if (inArray(method, ALLOWED_METHODS)) {
        // Set method as a subheader
        res.push(`##### ***${method.toUpperCase()}***`);
        const pathInfo = data[method];

        // Build responses
        if ('responses' in pathInfo) {
          res.push('**Responses**');
          res.push('| Code | Description |');
          res.push('| ---- | ----------- |');
          Object.keys(pathInfo.responses).map(response => {
            res.push(`| ${response} | ${pathInfo.responses[response].description || ''} |`);
          });
        }
      }
    });
  }
  return res.length ? res.join('\n') : null;
};
