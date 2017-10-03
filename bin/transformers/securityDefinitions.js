'use strict';

var typeResolver = {
  basic: 'Basic',
  apiKey: 'API Key',
  oauth2: 'OAuth 2.0'
};
var nameResolver = {
  description: 'Description',
  name: 'Name',
  in: 'In',
  flow: 'Flow',
  authorizationUrl: 'Authorization URL',
  tokenUrl: 'Token URL'
};

module.exports = function (securityDefinitions) {
  // Base block
  var res = [];
  Object.keys(securityDefinitions).map(function (type) {
    res.push('**' + type + '**  \n');
    res.push('|' + securityDefinitions[type].type + '|*' + typeResolver[securityDefinitions[type].type] + '*|');
    res.push('|---|---|');
    Object.keys(securityDefinitions[type]).map(function (value) {
      if (value === 'scopes') {
        res.push('|**Scopes**||');
        Object.keys(securityDefinitions[type][value]).map(function (scope) {
          res.push('|' + scope + '|' + (securityDefinitions[type][value][scope].replace(/[\r\n]/g, ' ') + '|'));
        });
      } else if (value !== 'type') {
        res.push('|' + nameResolver[value] + '|' + (securityDefinitions[type][value].replace(/[\r\n]/g, ' ') + '|'));
      }
    });
    res.push('');
  });

  // Create header
  // Only in case if there is some data
  if (res.length > 0) {
    res.unshift('---');
    res.unshift('### Security');
  }

  return res.length ? res.join('\n') : null;
};
module.exports.nameResolver = nameResolver;
module.exports.typeResolver = typeResolver;