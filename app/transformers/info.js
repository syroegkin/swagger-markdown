const transformContact = require('./contact');

/**
 * http://swagger.io/specification/#infoObject
 * Prepare page header
 * Leave description with no changes
 * @param {Object} info
 * @returns {String}
 */
module.exports = info => {
  const res = [];
  if (info !== null && typeof info === 'object') {
    if ('title' in info) {
      res.push(`${info.title}\n${Array(info.title.length + 1).join('=')}`);
    }

    if ('description' in info) {
      res.push(`${info.description}\n`);
    }

    if ('version' in info) {
      res.push(`**Version:** ${info.version}\n`);
    }

    if ('termsOfService' in info) {
      res.push(`**Terms of service:**  \n${info.termsOfService}\n`);
    }

    if ('contact' in info) {
      res.push(transformContact(info.contact));
    }

    if ('license' in info) {
      const license = [];
      if (info.license.url || info.license.name) {
        license.push('**License:** ');
        if (info.license.url && info.license.name) {
          license.push(`[${info.license.name}](${info.license.url})`);
        } else {
          license.push(info.license.name || info.license.url);
        }
        license.push('\n');
      }
      if (license.length > 0) {
        res.push(license.join(''));
      }
    }
  }
  return res.length ? res.join('\n') : null;
};
