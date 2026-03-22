import { expect } from 'chai';
import { transformComponents } from './components';

describe('transformComponents (v3-3_1)', () => {
  it('should return null when components has no schemas', () => {
    expect(transformComponents({} as any)).to.equal(null);
    expect(transformComponents({ parameters: {} } as any)).to.equal(null);
    expect(transformComponents({ schemas: {} } as any)).to.equal(null);
  });

  it('should return markdown with Schemas h3 when schemas present', () => {
    const components = {
      schemas: {
        Foo: {
          type: 'object',
          properties: {
            id: { type: 'string' },
          },
        },
      },
    };
    const res = transformComponents(components as any) as string;
    expect(res).to.include('### Schemas');
    expect(res).to.include('Foo');
    expect(res).to.include('id');
  });

  it('should process multiple schemas', () => {
    const components = {
      schemas: {
        Foo: { type: 'object', properties: { a: { type: 'string' } } },
        Bar: { type: 'object', properties: { b: { type: 'integer' } } },
      },
    };
    const res = transformComponents(components as any) as string;
    expect(res).to.include('Foo');
    expect(res).to.include('Bar');
    expect(res).to.include('a');
    expect(res).to.include('b');
  });
});
