import { OpenAPIV2 } from 'openapi-types';
import { Markdown } from '../../lib/markdown';

export const typeResolver = {
  basic: 'Basic',
  apiKey: 'API Key',
  oauth2: 'OAuth 2.0',
};
export const nameResolver = {
  description: 'Description',
  name: 'Name',
  in: 'In',
  flow: 'Flow',
  authorizationUrl: 'Authorization URL',
  tokenUrl: 'Token URL',
};

/**
 * https://swagger.io/specification/v2/#securityDefinitionsObject
 */
export const transformSecurityDefinitions = (
  securityDefinitions: OpenAPIV2.SecurityDefinitionsObject,
) => {
  // Base block
  const md = Markdown.md();

  Object.keys(securityDefinitions).forEach((type) => {
    md.line(md.string(type).bold().br()).line();

    const table = md.table();
    table
      .th(securityDefinitions[type].type)
      .th(md.string(typeResolver[securityDefinitions[type].type]).italic());
    Object.keys(securityDefinitions[type]).forEach((value) => {
      if (value === 'scopes') {
        table.tr()
          .td(md.string('Scopes').bold())
          .td();
        Object.keys(securityDefinitions[type][value]).forEach((scope) => {
          table.tr()
            .td(scope)
            .td(
              securityDefinitions[type][value][scope].replace(/[\r\n]/g, ' '),
            );
        });
        return;
      }
      if (value !== 'type' && securityDefinitions[type][value].replace) {
        let key = nameResolver[value];
        if (key === undefined) {
          if (!value.match(/^x-/i)) {
            return;
          }
          key = value;
        }
        table.tr()
          .td(key)
          .td(securityDefinitions[type][value].replace(/[\r\n]/g, ' '));
      }
    });
    md.line(table);
    md.line();
  });

  // Create header
  // Only in case if there is any data
  if (md.length > 0) {
    return Markdown.md()
      .line(md.string('Security').h3())
      .line(md.export())
      .export();
  }

  return null;
};
