import { expect } from 'chai';
import {
  transformResponses,
  hasSchemasInResponses,
  hasLinksInResponses,
} from './pathResponses';

describe('Path responses transformer (v3-3_1)', () => {
  describe('transformResponses', () => {
    it('should build header and table when no schemas or links', () => {
      const fixture = {
        200: { description: 'OK' },
        404: { description: 'Not Found' },
      };
      const res = (transformResponses(fixture as any) as string).split('\n');
      expect(res[0]).to.equal('#### Responses');
      expect(res.some((l) => l.includes('| Code | Description |'))).to.equal(true);
      expect(res.some((l) => l.includes('| 200 |'))).to.equal(true);
      expect(res.some((l) => l.includes('| 404 |'))).to.equal(true);
    });

    it('should include Schema column when any response has content.schema', () => {
      const fixture = {
        200: {
          description: 'Success',
          content: {
            'application/json': {
              schema: { $ref: '#/components/schemas/Foo' },
            },
          },
        },
        404: { description: 'Not Found' },
      };
      const res = (transformResponses(fixture as any) as string).split('\n');
      expect(res.some((l) => l.includes('Schema'))).to.equal(true);
      expect(res.some((l) => l.includes('Foo') || l.includes('foo'))).to.equal(true);
    });

    it('should include Links column when any response has links', () => {
      const fixture = {
        200: {
          description: 'OK',
          links: {
            next: { operationId: 'getNext' },
          },
        },
      };
      const res = (transformResponses(fixture as any) as string).split('\n');
      expect(res.some((l) => l.includes('Links'))).to.equal(true);
    });

    it('should render description for each response', () => {
      const fixture = {
        200: { description: 'Echo GET' },
        500: { description: 'Server Error' },
      };
      const res = (transformResponses(fixture as any) as string).split('\n');
      expect(res.some((l) => l.includes('Echo GET'))).to.equal(true);
      expect(res.some((l) => l.includes('Server Error'))).to.equal(true);
    });
  });

  describe('hasSchemasInResponses', () => {
    it('should return false when no response has content with schema', () => {
      const responses = {
        200: { description: 'OK' },
      };
      expect(hasSchemasInResponses(responses as any)).to.equal(false);
    });

    it('should return true when at least one response has content with schema', () => {
      const responses = {
        200: {
          description: 'OK',
          content: {
            'application/json': { schema: { type: 'object' } },
          },
        },
      };
      expect(hasSchemasInResponses(responses as any)).to.equal(true);
    });
  });

  describe('hasLinksInResponses', () => {
    it('should return false when no response has links', () => {
      const responses = {
        200: { description: 'OK' },
      };
      expect(hasLinksInResponses(responses as any)).to.equal(false);
    });

    it('should return true when at least one response has links', () => {
      const responses = {
        200: {
          description: 'OK',
          links: { next: 'getNext' },
        },
      };
      expect(hasLinksInResponses(responses as any)).to.equal(true);
    });
  });
});
