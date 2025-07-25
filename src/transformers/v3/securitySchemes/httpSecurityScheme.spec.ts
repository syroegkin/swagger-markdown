import { OpenAPIV3 } from 'openapi-types';
import { isHttpSecurityScheme, transformHTTPSecurityScheme } from './httpSecurityScheme';

describe('isHttpSecurityScheme', () => {
  it('should return true for an HTTP security scheme', () => {
    const httpScheme: OpenAPIV3.SecuritySchemeObject = {
      type: 'http',
      scheme: 'basic',
    };
    expect(isHttpSecurityScheme(httpScheme)).toBe(true);
  });

  it('should return false for a non-HTTP security scheme', () => {
    const apiKeyScheme: OpenAPIV3.SecuritySchemeObject = {
      type: 'apiKey',
      in: 'header',
      name: 'api_key',
    };
    expect(isHttpSecurityScheme(apiKeyScheme)).toBe(false);
  });
});

describe('transformHTTPSecurityScheme', () => {
  it('should transform a basic HTTP security scheme correctly', () => {
    const httpScheme: OpenAPIV3.HttpSecurityScheme = {
      type: 'http',
      scheme: 'basic',
    };
    const expectedMarkdown = '#### Basic (HTTP, basic)\n';
    expect(transformHTTPSecurityScheme('Basic', httpScheme)).toBe(expectedMarkdown);
  });

  it('should transform an HTTP security scheme with a description correctly', () => {
    const httpScheme: OpenAPIV3.HttpSecurityScheme = {
      type: 'http',
      scheme: 'basic',
      description: 'This is a basic authentication scheme.',
    };
    const expectedMarkdown = '#### Basic (HTTP, basic)\nThis is a basic authentication scheme.  \n';
    expect(transformHTTPSecurityScheme('Basic', httpScheme)).toBe(expectedMarkdown);
  });

  it('should transform an HTTP security scheme with bearerFormat correctly', () => {
    const httpScheme: OpenAPIV3.HttpSecurityScheme = {
      type: 'http',
      scheme: 'bearer',
      bearerFormat: 'JWT',
    };
    const expectedMarkdown = '#### Bearer (HTTP, bearer)\nBearer format: JWT\n';
    expect(transformHTTPSecurityScheme('Bearer', httpScheme)).toBe(expectedMarkdown);
  });

  it('should transform an HTTP security scheme with all fields correctly', () => {
    const httpScheme: OpenAPIV3.HttpSecurityScheme = {
      type: 'http',
      scheme: 'bearer',
      description: 'This is a bearer authentication scheme.',
      bearerFormat: 'JWT',
    };
    const expectedMarkdown = '#### Bearer (HTTP, bearer)\nThis is a bearer authentication scheme.  \nBearer format: JWT\n';
    expect(transformHTTPSecurityScheme('Bearer', httpScheme)).toBe(expectedMarkdown);
  });
});
