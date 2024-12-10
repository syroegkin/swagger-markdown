import { expect } from 'chai';
import { processLink } from './link';

describe('processLink', () => {
  it('Should correctly format a simple string link', () => {
    const linkName = 'TestLink';
    const linkValue = 'https://example.com';
    const result = processLink(linkName, linkValue);
    expect(result.toString()).to.be.equal('**TestLink** https://example.com');
  });

  it('Should handle a link object with only a description', () => {
    const linkName = 'TestLink';
    const link = {
      description: 'This is a test description',
    };
    const result = processLink(linkName, link);
    const expected = '**TestLink**<br>This is a test description';
    expect(result.toString()).to.be.equal(expected);
  });

  it('Should process a link object with parameters but no description', () => {
    const linkName = 'TestLink';
    const link = {
      parameters: {
        param1: 'value1',
        param2: 'value2',
      },
    };
    const result = processLink(linkName, link);
    const expected = '**TestLink**<br>Parameters {<br>"param1": "value1",<br>"param2": "value2"<br>}<br>';
    expect(result.toString()).to.be.equal(expected);
  });

  it('Should format a link object with both description and parameters', () => {
    const linkName = 'ComplexLink';
    const link = {
      description: 'A complex link with description and parameters',
      parameters: {
        param1: 'value1',
        param2: 'value2',
      },
    };
    const result = processLink(linkName, link);
    const expected = '**ComplexLink**<br>'
                   + 'A complex link with description and parameters<br>'
                   + 'Parameters {<br>'
                   + '"param1": "value1",<br>"param2": "value2"<br>'
                   + '}<br>';
    expect(result.toString()).to.be.equal(expected);
  });

  it('Should handle a link object with an empty parameters object', () => {
    const linkName = 'EmptyParamsLink';
    const link = {
      description: 'A link with empty parameters',
      parameters: {},
    };
    const result = processLink(linkName, link);
    const expected = '**EmptyParamsLink**<br>'
                 + 'A link with empty parameters<br>'
                 + 'Parameters {<br>'
                 + '}<br>';
    expect(result.toString()).to.be.equal(expected);
  });
});
