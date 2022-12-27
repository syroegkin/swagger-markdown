import { expect } from 'chai';
import { isV2Document, isV31Document, isV3Document } from '../../src/lib/detectDocumentVersion';
import { AllSwaggerDocumentVersions } from '../../src/types';

function makeDocV2(version: string): AllSwaggerDocumentVersions {
  return { swagger: version } as AllSwaggerDocumentVersions;
}

function makeDocV3(version: string): AllSwaggerDocumentVersions {
  return { openapi: version } as AllSwaggerDocumentVersions;
}

describe('detectDocumentVersion', () => {
  it('Shouild detect propertly version 2 of the document', () => {
    expect(isV2Document(makeDocV2('2.0.0'))).to.be.equal(true);
    expect(isV2Document(makeDocV2('22.0.0'))).to.be.equal(false);
    expect(isV2Document(makeDocV2('2.0.1'))).to.be.equal(true);
    expect(isV2Document(makeDocV2('2.0'))).to.be.equal(true);
    expect(isV2Document(makeDocV2('2'))).to.be.equal(true);
    expect(isV2Document(makeDocV3('2.0.0'))).to.be.equal(false);
    expect(isV2Document(makeDocV3('22.0.0'))).to.be.equal(false);
    expect(isV2Document(makeDocV3('2.0.1'))).to.be.equal(false);
    expect(isV2Document(makeDocV3('2.0'))).to.be.equal(false);
    expect(isV2Document(makeDocV3('2'))).to.be.equal(false);
  });
  it('Shouild detect propertly version 3 of the document', () => {
    expect(isV3Document(makeDocV3('3.0.0'))).to.be.equal(true);
    expect(isV3Document(makeDocV3('33.0.0'))).to.be.equal(false);
    expect(isV3Document(makeDocV3('3.0.1'))).to.be.equal(true);
    expect(isV3Document(makeDocV3('3.0'))).to.be.equal(true);
    expect(isV3Document(makeDocV3('3'))).to.be.equal(true);
    expect(isV3Document(makeDocV3('3.1'))).to.be.equal(true);
    expect(isV3Document(makeDocV2('3.0.0'))).to.be.equal(false);
    expect(isV3Document(makeDocV2('33.0.0'))).to.be.equal(false);
    expect(isV3Document(makeDocV2('3.0.1'))).to.be.equal(false);
    expect(isV3Document(makeDocV2('3.0'))).to.be.equal(false);
    expect(isV3Document(makeDocV2('3'))).to.be.equal(false);
    expect(isV3Document(makeDocV2('3.1'))).to.be.equal(false);
  });
  it('Shouild detect propertly version 3.1 of the document', () => {
    expect(isV31Document(makeDocV3('3.0.0'))).to.be.equal(false);
    expect(isV31Document(makeDocV3('33.0.0'))).to.be.equal(false);
    expect(isV31Document(makeDocV3('3.0.1'))).to.be.equal(false);
    expect(isV31Document(makeDocV3('3.0'))).to.be.equal(false);
    expect(isV31Document(makeDocV3('3'))).to.be.equal(false);
    expect(isV31Document(makeDocV3('3.1'))).to.be.equal(true);
  });
});
