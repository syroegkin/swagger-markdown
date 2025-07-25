import { OpenAPIV3 } from 'openapi-types';
import { isOAuth2SecurityScheme, transformOAuth2SecurityScheme } from './OAuth2SecurityScheme';

describe('OAuth2SecurityScheme', () => {
  describe('transformOAuth2SecurityScheme', () => {
    it('should transform a valid OAuth2 security scheme with authorizationUrl, tokenUrl, refreshUrl, and scopes', () => {
      const oauth2Scheme: OpenAPIV3.OAuth2SecurityScheme = {
        type: 'oauth2',
        flows: {
          authorizationCode: {
            authorizationUrl: 'https://example.com/oauth2/authorize',
            tokenUrl: 'https://example.com/oauth2/token',
            refreshUrl: 'https://example.com/oauth2/refresh',
            scopes: {
              'read:pets': 'read your pets',
              'write:pets': 'modify pets in your account',
            },
          },
        },
      };
      const expectedMarkdown = '####  (OAuth2, authorizationCode)\n'
        + 'Authorization URL: https://example.com/oauth2/authorize  \n'
        + 'Token URL: https://example.com/oauth2/token  \n'
        + 'Refresh URL: https://example.com/oauth2/refresh  \n'
        + 'Scopes:\n'
        + '- read:pets: read your pets  \n'
        + '- write:pets: modify pets in your account  \n\n';
      expect(transformOAuth2SecurityScheme('', oauth2Scheme)).toBe(expectedMarkdown);
    });

    it('should transform a valid OAuth2 security scheme with only authorizationUrl', () => {
      const oauth2Scheme: OpenAPIV3.OAuth2SecurityScheme = {
        type: 'oauth2',
        flows: {
          implicit: {
            authorizationUrl: 'https://example.com/oauth2/authorize',
            scopes: {},
          },
        },
      };
      const expectedMarkdown = '####  (OAuth2, implicit)\n'
        + 'Authorization URL: https://example.com/oauth2/authorize  \n'
        + 'Scopes:\n\n';
      expect(transformOAuth2SecurityScheme('', oauth2Scheme)).toBe(expectedMarkdown);
    });

    it('should transform a valid OAuth2 security scheme with only tokenUrl', () => {
      const oauth2Scheme: OpenAPIV3.OAuth2SecurityScheme = {
        type: 'oauth2',
        flows: {
          password: {
            tokenUrl: 'https://example.com/oauth2/token',
            scopes: {},
          },
        },
      };
      const expectedMarkdown = '####  (OAuth2, password)\n'
        + 'Token URL: https://example.com/oauth2/token  \n'
        + 'Scopes:\n\n';
      expect(transformOAuth2SecurityScheme('', oauth2Scheme)).toBe(expectedMarkdown);
    });

    it('should transform a valid OAuth2 security scheme with only refreshUrl', () => {
      const oauth2Scheme: OpenAPIV3.OAuth2SecurityScheme = {
        type: 'oauth2',
        flows: {
          clientCredentials: {
            refreshUrl: 'https://example.com/oauth2/refresh',
            tokenUrl: undefined as any,
            scopes: {},
          },
        },
      };
      const expectedMarkdown = '####  (OAuth2, clientCredentials)\n'
        + 'Refresh URL: https://example.com/oauth2/refresh  \n'
        + 'Scopes:\n\n';
      expect(transformOAuth2SecurityScheme('', oauth2Scheme)).toBe(expectedMarkdown);
    });

    it('should transform a valid OAuth2 security scheme with no flows', () => {
      const oauth2Scheme: OpenAPIV3.OAuth2SecurityScheme = {
        type: 'oauth2',
        flows: {},
      };
      const expectedMarkdown = '####  (OAuth2, )\n';
      expect(transformOAuth2SecurityScheme('', oauth2Scheme)).toBe(expectedMarkdown);
    });

    it('should transform a valid OAuth2 security scheme with a description', () => {
      const oauth2Scheme: OpenAPIV3.OAuth2SecurityScheme = {
        type: 'oauth2',
        description: 'This is an OAuth2 security scheme.',
        flows: {
          authorizationCode: {
            authorizationUrl: 'https://example.com/oauth2/authorize',
            tokenUrl: 'https://example.com/oauth2/token',
            scopes: {
              'read:pets': 'read your pets',
              'write:pets': 'modify pets in your account',
            },
          },
        },
      };
      const expectedMarkdown = '####  (OAuth2, authorizationCode)\n'
        + 'This is an OAuth2 security scheme.  \n'
        + 'Authorization URL: https://example.com/oauth2/authorize  \n'
        + 'Token URL: https://example.com/oauth2/token  \n'
        + 'Scopes:\n'
        + '- read:pets: read your pets  \n'
        + '- write:pets: modify pets in your account  \n\n';
      expect(transformOAuth2SecurityScheme('', oauth2Scheme)).toBe(expectedMarkdown);
    });
  });

  it('should return true for a valid OAuth2 security scheme', () => {
    const oauth2Scheme: OpenAPIV3.SecuritySchemeObject = {
      type: 'oauth2',
      flows: {
        authorizationCode: {
          authorizationUrl: 'https://example.com/oauth2/authorize',
          tokenUrl: 'https://example.com/oauth2/token',
          scopes: {
            'read:pets': 'read your pets',
            'write:pets': 'modify pets in your account',
          },
        },
      },
    };
    expect(isOAuth2SecurityScheme(oauth2Scheme)).toBe(true);
  });

  it('should return false for an invalid OAuth2 security scheme', () => {
    const invalidScheme: OpenAPIV3.SecuritySchemeObject = {
      type: 'http',
      scheme: 'basic',
    };
    expect(isOAuth2SecurityScheme(invalidScheme)).toBe(false);
  });

  it('should be defined', () => {
    expect(isOAuth2SecurityScheme).toBeDefined();
  });
});
