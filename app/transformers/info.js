/**
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
      res.push(`**Version** ${info.version}`);
    }
    if ('termsOfService' in info) {
      res.push(`**Terms of service**\n${info.termsOfService}`);
    }
    if ('contact' in info) {
      const contact = [];
      Object.keys(info.contact).map(key => {
        contact.push(info.contact[key]);
      });
      if (contact.length > 0) {
        res.push('**Contact information**');
        contact.map(line => res.push(line));
      }
    }
  }
  return res.length ? res.join('\n') : null;
};
