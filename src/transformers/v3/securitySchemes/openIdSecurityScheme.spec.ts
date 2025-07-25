import { OpenAPIV3 } from 'openapi-types';
import { transformOpenIdSecurityScheme } from './openIdSecurityScheme';

describe('transformOpenIdSecurityScheme', () => {
  it('should transform an OpenIdConnectSecurityScheme', () => {
    const securityScheme: OpenAPIV3.OpenIdSecurityScheme = {
      type: 'openIdConnect',
      openIdConnectUrl: 'https://example.com/.well-known/openid-configuration',
      description: 'OpenID Connect authentication',
    };

    const result = transformOpenIdSecurityScheme('OpenIdConnect', securityScheme);

    expect(result).toEqual(
      '#### OpenIdConnect (OpenID Connect)\n'
      + 'OpenID Connect authentication  \n'
      + 'OpenID Connect URL: https://example.com/.well-known/openid-configuration  \n',
    );
  });

  it('should handle missing description', () => {
    const securityScheme: OpenAPIV3.OpenIdSecurityScheme = {
      type: 'openIdConnect',
      openIdConnectUrl: 'https://example.com/.well-known/openid-configuration',
    };

    const result = transformOpenIdSecurityScheme('OpenIdConnect', securityScheme);

    expect(result).toEqual(
      '#### OpenIdConnect (OpenID Connect)\n'
      + 'OpenID Connect URL: https://example.com/.well-known/openid-configuration  \n',
    );
  });
});
