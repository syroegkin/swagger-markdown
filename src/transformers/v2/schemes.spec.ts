import { transformSchemes } from './schemes';

describe('transformSchemes', () => {
  it('should transform schemes into a markdown string', () => {
    const schemes = ['http', 'https'];
    const result = transformSchemes(schemes);

    expect(result).toBe('**Schemes:** http, https\n');
  });
});
