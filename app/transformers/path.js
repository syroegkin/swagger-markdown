const inArray = require('../lib/inArray');
const transformResponses = require('./pathResponses');
const transformParameters = require('./pathParameters');
const security = require('./security');

/**
 * Allowed methods
 * @type {string[]}
 */
const ALLOWED_METHODS = ['get', 'post', 'put', 'patch', 'delete', 'options'];

module.exports = (path, data, parameters) => {
  const res = [];
  let pathParameters = null;

  if (path && data) {
    // Make path as a header
    res.push(`### ${path}\n`);

    // Check if parameter for path are in the place
    if ('parameters' in data) {
      pathParameters = data.parameters;
    }

    // Go further method by methods
    Object.keys(data).map(method => {
      if (inArray(method, ALLOWED_METHODS)) {
        // Set method as a subheader
        res.push(`#### ${method.toUpperCase()}`);
        const pathInfo = data[method];

        // Set summary
        if ('summary' in pathInfo) {
          res.push(`##### Summary:\n\n${pathInfo.summary}\n`);
        }

        // Set description
        if ('description' in pathInfo) {
          res.push(`##### Description:\n\n${pathInfo.description}\n`);
        }

        // Build parameters
        if ('parameters' in pathInfo || pathParameters) {
          res.push(`${transformParameters(pathInfo.parameters, pathParameters, parameters)}\n`);
        }

        // Build responses
        if ('responses' in pathInfo) {
          res.push(`${transformResponses(pathInfo.responses)}\n`);
        }

        // Build security
        if ('security' in pathInfo) {
          res.push(`${security(pathInfo.security)}\n`);
        }
      }
    });
  }
  return res.length ? res.join('\n') : null;
};
