import { expect } from 'chai';
import { transformServers } from './servers';

describe('Servers transformer', () => {
  it('should return empty string for empty array', () => {
    expect(transformServers([])).to.equal('');
  });

  it('should return empty string for null/undefined', () => {
    expect(transformServers(null as any)).to.equal('');
    expect(transformServers(undefined as any)).to.equal('');
  });

  it('should render a single server with URL only and no Description column', () => {
    const result = transformServers([{ url: 'https://api.example.com/v1' }]);
    expect(result).to.include('Servers');
    expect(result).to.include('https://api.example.com/v1');
    expect(result).to.not.include('Description');
  });

  it('should render server with description', () => {
    const result = transformServers([{
      url: 'https://api.example.com/v1',
      description: 'Production server',
    }]);
    expect(result).to.include('https://api.example.com/v1');
    expect(result).to.include('Production server');
  });

  it('should render multiple servers', () => {
    const result = transformServers([
      { url: 'https://api.example.com', description: 'Production' },
      { url: 'https://staging.example.com', description: 'Staging' },
    ]);
    expect(result).to.include('https://api.example.com');
    expect(result).to.include('Production');
    expect(result).to.include('https://staging.example.com');
    expect(result).to.include('Staging');
  });

  it('should render server variables with defaults', () => {
    const result = transformServers([{
      url: 'https://{environment}.example.com/{version}',
      variables: {
        environment: { default: 'api' },
        version: { default: 'v1', enum: ['v1', 'v2'] },
      },
    }]);
    expect(result).to.include('`{environment}`');
    expect(result).to.include('default `api`');
    expect(result).to.include('`{version}`');
    expect(result).to.include('default `v1`');
    expect(result).to.include('v1, v2');
  });

  it('should render variable description when present', () => {
    const result = transformServers([{
      url: 'https://{env}.example.com',
      variables: {
        env: { default: 'prod', description: 'Target environment' },
      },
    }]);
    expect(result).to.include('Target environment');
  });

  it('should strip newlines from server description', () => {
    const result = transformServers([{
      url: 'https://api.example.com',
      description: 'Line one\nLine two',
    }]);
    expect(result).to.include('Line one Line two');
  });
});
