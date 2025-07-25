import { OpenAPIV3 } from 'openapi-types';
import { Markdown } from '../../../lib/markdown';

export function isOAuth2SecurityScheme(
  scheme: OpenAPIV3.SecuritySchemeObject,
): scheme is OpenAPIV3.OAuth2SecurityScheme {
  return scheme.type === 'oauth2';
}

export function transformOAuth2SecurityScheme(
  name: string,
  scheme: OpenAPIV3.OAuth2SecurityScheme,
) {
  const md = Markdown.md();

  const types = Object.keys(scheme.flows || {}).join(', ');
  const typesNumber = Object.keys(scheme.flows || {}).length;

  md.line(md.string(`${name} (OAuth2, ${types})`).h4());

  if (scheme.description) {
    md.line(md.string(scheme.description).br());
  }

  if (scheme.flows) {
    Object.keys(scheme.flows).forEach((flowType) => {
      if (typesNumber > 1) {
        md.line(md.string(`**Flow:** ${flowType}`).bold().br());
      }
      const flow = scheme.flows[flowType];
      if (flow.authorizationUrl) {
        md.line(md.string(`Authorization URL: ${flow.authorizationUrl}`).br());
      }
      if (flow.tokenUrl) {
        md.line(md.string(`Token URL: ${flow.tokenUrl}`).br());
      }
      if (flow.refreshUrl) {
        md.line(md.string(`Refresh URL: ${flow.refreshUrl}`).br());
      }
      if (flow.scopes) {
        md.line(md.string('Scopes:'));
        Object.keys(flow.scopes).forEach((scope) => {
          md.line(md.string(`- ${scope}: ${flow.scopes[scope]}`).br());
        });
        md.line();
      }
    });
  }

  return md.export();
}
