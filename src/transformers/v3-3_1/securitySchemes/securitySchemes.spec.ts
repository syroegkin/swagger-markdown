import { OpenAPIV3 } from 'openapi-types';
import { transformSecuritySchemes } from './securitySchemes';
import * as httpSecurityScheme from './httpSecurityScheme';
import * as apiKeySecurityScheme from './apiKeySecurityScheme';
import * as OAuth2SecurityScheme from './OAuth2SecurityScheme';
import * as openIdSecurityScheme from './openIdSecurityScheme';

describe('SecuritySchemes', () => {
  beforeEach(() => {
    jest.spyOn(httpSecurityScheme, 'transformHTTPSecurityScheme');
    jest.spyOn(apiKeySecurityScheme, 'transformApiKeySecuritySchema');
    jest.spyOn(OAuth2SecurityScheme, 'transformOAuth2SecurityScheme');
    jest.spyOn(openIdSecurityScheme, 'transformOpenIdSecurityScheme');
  });

  afterEach(() => {
    jest.restoreAllMocks();
  });

  it('should be defined', () => {
    expect(transformSecuritySchemes).toBeDefined();
  });

  it('should return null if no security schemes are provided', () => {
    const securitySchemas: { [key: string]: OpenAPIV3.SecuritySchemeObject } = {};
    expect(transformSecuritySchemes(securitySchemas)).toBeNull();
  });

  it('should transform HTTP security scheme', () => {
    const securitySchemas: { [key: string]: OpenAPIV3.SecuritySchemeObject } = {
      http: {
        type: 'http',
        scheme: 'bearer',
        bearerFormat: 'JWT',
      },
    };

    transformSecuritySchemes(securitySchemas);
    expect(httpSecurityScheme.transformHTTPSecurityScheme).toHaveBeenCalledWith('http', securitySchemas.http);
  });

  it('should transform API key security scheme', () => {
    const securitySchemas: { [key: string]: OpenAPIV3.SecuritySchemeObject } = {
      apiKey: {
        type: 'apiKey',
        name: 'api_key',
        in: 'header',
      },
    };

    transformSecuritySchemes(securitySchemas);
    expect(apiKeySecurityScheme.transformApiKeySecuritySchema).toHaveBeenCalledWith('apiKey', securitySchemas.apiKey);
  });

  it('should transform OAuth2 security scheme', () => {
    const securitySchemas: { [key: string]: OpenAPIV3.SecuritySchemeObject } = {
      oAuth2: {
        type: 'oauth2',
        flows: {
          implicit: {
            authorizationUrl: 'https://example.com/oauth2/authorize',
            scopes: {
              read: 'read data',
              write: 'write data',
            },
          },
        },
      },
    };

    transformSecuritySchemes(securitySchemas);
    expect(OAuth2SecurityScheme.transformOAuth2SecurityScheme).toHaveBeenCalledWith('oAuth2', securitySchemas.oAuth2);
  });

  it('should transform OpenID Connect security scheme', () => {
    const securitySchemas: { [key: string]: OpenAPIV3.SecuritySchemeObject } = {
      openIdConnect: {
        type: 'openIdConnect',
        openIdConnectUrl: 'https://example.com/.well-known/openid-configuration',
      },
    };

    transformSecuritySchemes(securitySchemas);
    expect(openIdSecurityScheme.transformOpenIdSecurityScheme).toHaveBeenCalledWith('openIdConnect', securitySchemas.openIdConnect);
  });

  it('should transform multiple security schemes', () => {
    const securitySchemas: { [key: string]: OpenAPIV3.SecuritySchemeObject } = {
      http: {
        type: 'http',
        scheme: 'bearer',
        bearerFormat: 'JWT',
      },
      apiKey: {
        type: 'apiKey',
        name: 'api_key',
        in: 'header',
      },
    };

    transformSecuritySchemes(securitySchemas);
    expect(httpSecurityScheme.transformHTTPSecurityScheme).toHaveBeenCalledWith('http', securitySchemas.http);
    expect(apiKeySecurityScheme.transformApiKeySecuritySchema).toHaveBeenCalledWith('apiKey', securitySchemas.apiKey);
  });
});
