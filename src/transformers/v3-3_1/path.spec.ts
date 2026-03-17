import { expect } from 'chai';
import { transformPath } from './path';

describe('Path transformer (v3-3_1)', () => {
  it('should return null if path is empty', () => {
    expect(transformPath('', { get: {} } as any)).to.equal(null);
  });

  it('should return null if data is null/undefined', () => {
    expect(transformPath('/status', null as any)).to.equal(null);
    expect(transformPath('/status', undefined as any)).to.equal(null);
  });

  it('should present path and method as subheader', () => {
    const res = transformPath('/', { get: {} } as any) as string;
    const lines = res.split('\n');
    expect(lines[1]).to.equal('### [GET] /');
  });

  it('should present the method as subheader for multiple methods', () => {
    const res = transformPath('/pets', { get: {}, post: {} } as any) as string;
    const lines = res.split('\n');
    expect(lines[1]).to.include('[GET]');
    expect(lines.some((l) => l.includes('[POST]'))).to.equal(true);
  });

  it('should render summary if present', () => {
    const fixture = {
      path: '/',
      data: { get: { summary: 'List pets' } },
    };
    const res = (transformPath(fixture.path, fixture.data as any) as string).split('\n');
    expect(res.some((l) => l.includes('List pets'))).to.equal(true);
  });

  it('should render description if present and different from summary', () => {
    const fixture = {
      path: '/',
      data: { get: { summary: 'Short', description: 'Long description' } },
    };
    const res = (transformPath(fixture.path, fixture.data as any) as string).split('\n');
    expect(res.some((l) => l.includes('Long description'))).to.equal(true);
  });

  it('should render external docs if present', () => {
    const fixture = {
      path: '/',
      data: {
        get: {
          externalDocs: {
            description: 'External text',
            url: 'http://example.com',
          },
        },
      },
    };
    const res = (transformPath(fixture.path, fixture.data as any) as string).split('\n');
    expect(res.some((l) => l.includes('External text') && l.includes('http://example.com'))).to.equal(true);
  });

  it('should render deprecated if true', () => {
    const fixture = {
      path: '/',
      data: { get: { deprecated: true } },
    };
    const res = (transformPath(fixture.path, fixture.data as any) as string).split('\n');
    expect(res.some((l) => l.includes('DEPRECATED'))).to.equal(true);
  });

  it('should not render deprecated when false', () => {
    const fixture = {
      path: '/',
      data: { get: { deprecated: false } },
    };
    const res = (transformPath(fixture.path, fixture.data as any) as string).split('\n');
    const deprecatedLines = res.filter((l) => l.trim() === '***DEPRECATED***');
    expect(deprecatedLines.length).to.equal(0);
  });

  it('should include parameters section when operation has parameters', () => {
    const fixture = {
      path: '/pets',
      data: {
        get: {
          parameters: [
            { name: 'limit', in: 'query', schema: { type: 'integer' } },
          ],
        },
      },
    };
    const res = (transformPath(fixture.path, fixture.data as any) as string).split('\n');
    expect(res.some((l) => l.includes('Parameters'))).to.equal(true);
    expect(res.some((l) => l.includes('limit'))).to.equal(true);
  });

  it('should include request body section when operation has requestBody', () => {
    const fixture = {
      path: '/pets',
      data: {
        post: {
          requestBody: {
            required: true,
            content: {
              'application/json': {
                schema: { type: 'object', properties: { name: { type: 'string' } } },
              },
            },
          },
        },
      },
    };
    const res = (transformPath(fixture.path, fixture.data as any) as string).split('\n');
    expect(res.some((l) => l.includes('Request Body'))).to.equal(true);
  });

  it('should include responses section when operation has responses', () => {
    const fixture = {
      path: '/pets',
      data: {
        get: {
          responses: {
            200: { description: 'OK' },
          },
        },
      },
    };
    const res = (transformPath(fixture.path, fixture.data as any) as string).split('\n');
    expect(res.some((l) => l.includes('Responses'))).to.equal(true);
    expect(res.some((l) => l.includes('200'))).to.equal(true);
  });
});
