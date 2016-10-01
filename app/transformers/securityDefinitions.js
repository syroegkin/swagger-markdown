const resolver = {
  basic: 'Basic',
  apiKey: 'API Key',
  oauth2: 'OAuth 2.0'
};

module.exports = securityDefinitions => {
  // Base block
  const res = [];
  Object.keys(securityDefinitions).map(type => {
    res.push(`|${securityDefinitions[type].type}|*${resolver[securityDefinitions[type].type]}*|`);
    res.push('|---|---|');
    Object.keys(securityDefinitions[type]).map(value => {
      if (value === 'scopes') {
        res.push('|**Scopes**|');
        Object.keys(securityDefinitions[type][value]).map(scope => {
          res.push(`|${scope}|${securityDefinitions[type][value][scope].replace(/[\r\n]/g, ' ')}|`);
        });
      } else if (value !== 'type') {
        res.push(`|${value}|${securityDefinitions[type][value].replace(/[\r\n]/g, ' ')}|`);
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

  return res.join('\n');
};
