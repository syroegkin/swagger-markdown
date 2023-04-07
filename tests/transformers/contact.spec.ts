import { expect } from 'chai';
import { transformContact } from '../../src/transformers/v2/contact';

describe('Contact info', () => {
  it('should create contact info with all fields', () => {
    const fixture = {
      contact: {
        name: 'API Support',
        url: 'http://www.swagger.io/support',
        email: 'support@swagger.io',
      },
    };
    const res = transformContact(fixture.contact);
    const result = '**Contact information:**  \n'
      + `${fixture.contact.name}  \n`
      + `${fixture.contact.url}  \n`
      + `${fixture.contact.email}  \n`;
    expect(res).to.be.equal(result);
  });
  it('should create only these fields which are provided', () => {
    const fixture = {
      contact: {
        url: 'http://www.swagger.io/support',
      },
    };
    const res = transformContact(fixture.contact);
    const result = '**Contact information:**  \n'
      + `${fixture.contact.url}  \n`;
    expect(res).to.be.equal(result);
  });
  it('should not create header if information is not provided', () => {
    const fixture = {
      contact: {},
    };
    const res = transformContact(fixture.contact);
    expect(res).to.be.equal(null);
  });
});
