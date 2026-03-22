import { OpenAPIV3 } from 'openapi-types';
import { transformApiKeySecuritySchema, isApiKeySecurityScheme } from './apiKeySecurityScheme';

describe('ApiKeySecurityScheme', () => {
  describe('transformApiKeySecuritySchema', () => {
    it('should transform a valid API Key security scheme with description and header location', () => {
      const apiKeyScheme: OpenAPIV3.ApiKeySecurityScheme = {
        type: 'apiKey',
        in: 'header',
        name: 'X-API-Key',
        description: 'This is the API key for authentication.',
      };
      const expectedMarkdown = '#### X-API-Key (API Key Authentication)\n'
        + 'This is the API key for authentication.  \n'
        + '**Name:** X-API-Key  \n'
        + '**In:** header  \n';

      expect(transformApiKeySecuritySchema('X-API-Key', apiKeyScheme)).toBe(expectedMarkdown);
    });

    it('should transform a valid API Key security scheme without description and query location', () => {
      const apiKeyScheme: OpenAPIV3.ApiKeySecurityScheme = {
        type: 'apiKey',
        in: 'query',
        name: 'api_key',
      };
      const expectedMarkdown = '#### api_key (API Key Authentication)\n'
        + '**Name:** api_key  \n'
        + '**In:** query  \n';
      expect(transformApiKeySecuritySchema('api_key', apiKeyScheme)).toBe(expectedMarkdown);
    });
  });

  it('should return true for a valid API Key security scheme', () => {
    const apiKeyScheme: OpenAPIV3.SecuritySchemeObject = {
      type: 'apiKey',
      in: 'header',
      name: 'X-API-Key',
    };
    expect(isApiKeySecurityScheme(apiKeyScheme)).toBe(true);
  });

  it('should return false for an invalid API Key security scheme', () => {
    const invalidScheme: OpenAPIV3.SecuritySchemeObject = {
      type: 'http',
      scheme: 'basic',
    };
    expect(isApiKeySecurityScheme(invalidScheme)).toBe(false);
  });
});
