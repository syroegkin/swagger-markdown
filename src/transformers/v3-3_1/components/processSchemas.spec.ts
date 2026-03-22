import { expect } from 'chai';
import { processSchemas } from './processSchemas';

describe('processSchemas', () => {
  describe('OpenAPI 3.1 schema shapes (guards)', () => {
    it('boolean schema true: does not throw; output contains AllowAll and note about any instance', () => {
      const result = processSchemas({ AllowAll: true } as any);
      expect(result).to.include('AllowAll');
      expect(result).to.include('schema allows any instance');
    });

    it('boolean schema false: does not throw; output contains DenyAll', () => {
      const result = processSchemas({ DenyAll: false } as any);
      expect(result).to.include('DenyAll');
      expect(result).to.include('schema allows no instance');
    });

    it('schema without type: does not throw; output contains NoType and description', () => {
      const result = processSchemas({ NoType: { description: 'No type' } } as any);
      expect(result).to.include('NoType');
      expect(result).to.include('No type');
    });

    it('schema without properties (object with only type/description): does not throw; table or primitive row present', () => {
      const result = processSchemas({ NoProps: { type: 'object', description: 'No props' } } as any);
      expect(result).to.include('NoProps');
      expect(result).to.include('No props');
      expect(result).to.include('object');
    });

    it('schema with examples array, no example: does not throw; output contains first example', () => {
      const result = processSchemas({ WithExamples: { type: 'string', examples: ['a', 'b'] } } as any);
      expect(result).to.include('WithExamples');
      expect(result).to.include('a');
    });

    it('normal schema (regression): returns string containing Normal and id', () => {
      const result = processSchemas({
        Normal: {
          type: 'object',
          properties: {
            id: { type: 'string' },
          },
        },
      });
      expect(result).to.include('Normal');
      expect(result).to.include('id');
    });
  });

  describe('readOnly and writeOnly properties', () => {
    it('should render readOnly badge', () => {
      const result = processSchemas({
        User: {
          type: 'object',
          properties: {
            id: { type: 'integer', readOnly: true },
            name: { type: 'string' },
          },
        },
      } as any);
      expect(result).to.include('**Read-only**');
    });

    it('should render writeOnly badge', () => {
      const result = processSchemas({
        User: {
          type: 'object',
          properties: {
            password: { type: 'string', writeOnly: true },
          },
        },
      } as any);
      expect(result).to.include('**Write-only**');
    });

    it('should render deprecated property with strikethrough and badge', () => {
      const result = processSchemas({
        User: {
          type: 'object',
          properties: {
            oldField: { type: 'string', deprecated: true },
            newField: { type: 'string' },
          },
        },
      } as any);
      expect(result).to.include('~~oldField~~');
      expect(result).to.include('**Deprecated**');
      expect(result).to.not.include('~~newField~~');
    });
  });
});
