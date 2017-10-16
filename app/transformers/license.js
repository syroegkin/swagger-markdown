/**
 * http://swagger.io/specification/#licenseObject
 * License object transformer
 */
module.exports = license => {
  const res = [];
  if ('url' in license || 'name' in license) {
    res.push('**License:** ');
    if ('url' in license && 'name' in license) {
      res.push(`[${license.name}](${license.url})`);
    } else {
      res.push(license.name || license.url);
    }
    res.push('\n');
  }
  return res.length > 0 ? res.join('') : null;
};
