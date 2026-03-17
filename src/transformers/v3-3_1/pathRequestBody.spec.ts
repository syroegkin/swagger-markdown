import { expect } from 'chai';
import { transformRequestBody } from './pathRequestBody';

describe('pathRequestBody transformer (v3-3_1)', () => {
  it('should build Request Body header', () => {
    const fixture = {
      required: false,
      content: {
        'application/json': {
          schema: { type: 'object' },
        },
      },
    };
    const res = (transformRequestBody(fixture as any) as string).split('\n');
    expect(res.some((l) => l.includes('Request Body'))).to.equal(true);
  });

  it('should render description when present', () => {
    const fixture = {
      description: 'Create a new pet in the store',
      required: false,
      content: {
        'application/json': { schema: { type: 'object' } },
      },
    };
    const res = transformRequestBody(fixture as any) as string;
    expect(res).to.include('Create a new pet in the store');
  });

  it('should render Required column (Yes when required)', () => {
    const fixture = {
      required: true,
      content: {
        'application/json': {
          schema: { type: 'object' },
        },
      },
    };
    const res = (transformRequestBody(fixture as any) as string).split('\n');
    expect(res.some((l) => l.includes('Yes'))).to.equal(true);
  });

  it('should render Required column (No when not required)', () => {
    const fixture = {
      required: false,
      content: {
        'application/json': {
          schema: { type: 'object' },
        },
      },
    };
    const res = (transformRequestBody(fixture as any) as string).split('\n');
    expect(res.some((l) => l.includes('No'))).to.equal(true);
  });

  it('should include schema and property in output', () => {
    const fixture = {
      required: false,
      content: {
        'application/json': {
          schema: { type: 'object', properties: { name: { type: 'string' } } },
        },
      },
    };
    const res = transformRequestBody(fixture as any) as string;
    expect(res).to.include('application/json');
    expect(res).to.include('name');
  });

  it('should handle content with multiple media types', () => {
    const fixture = {
      required: false,
      content: {
        'application/json': { schema: { type: 'object' } },
        'text/plain': { schema: { type: 'string' } },
      },
    };
    const res = transformRequestBody(fixture as any) as string;
    expect(res).to.include('application/json');
    expect(res).to.include('text/plain');
  });
});
