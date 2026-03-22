import { isMutualTlsSecurityScheme, transformMutualTlsSecurityScheme } from './mutualTlsSecurityScheme';

describe('isMutualTlsSecurityScheme', () => {
  it('should return true for a mutualTLS security scheme', () => {
    expect(isMutualTlsSecurityScheme({ type: 'mutualTLS' } as any)).toBe(true);
  });

  it('should return false for other security scheme types', () => {
    expect(isMutualTlsSecurityScheme({ type: 'http', scheme: 'basic' } as any)).toBe(false);
    expect(isMutualTlsSecurityScheme({ type: 'apiKey', in: 'header', name: 'x' } as any)).toBe(false);
  });
});

describe('transformMutualTlsSecurityScheme', () => {
  it('should render name and type', () => {
    const result = transformMutualTlsSecurityScheme('client_cert', { type: 'mutualTLS' } as any);
    expect(result).toBe('#### client_cert (Mutual TLS)\n');
  });

  it('should render description when present', () => {
    const result = transformMutualTlsSecurityScheme('client_cert', {
      type: 'mutualTLS',
      description: 'Client certificate authentication',
    } as any);
    expect(result).toContain('client_cert (Mutual TLS)');
    expect(result).toContain('Client certificate authentication');
  });
});
