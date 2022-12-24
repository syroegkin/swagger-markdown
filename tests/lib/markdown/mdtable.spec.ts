import { expect } from 'chai';
import { MDtableRow, MDtable } from '../../../src/lib/markdown/mdtable';
import { MDstring } from '../../../src/lib/markdown/mdstring';

describe('MDtableRow', () => {
  it('should create a string from the row', () => {
    const td1 = 'td number one';
    const td2 = 'td number two';
    const expected = `| **${td1}** | ${td2} |`;
    const tr = new MDtableRow();
    tr.td(MDstring.string(td1).bold())
      .td(td2);
    const result = tr.get();
    expect(result).to.be.equal(expected);
  });
  it('should return empty string if no columns provided', () => {
    const tr = new MDtableRow();
    expect(tr.get()).to.be.equal('');
  });
});

describe('MDtable', () => {
  it('should create a table row', () => {
    const table = new MDtable();
    expect(table.tr()).to.be.instanceOf(MDtableRow);
  });
  it('should create a table class', () => {
    expect(MDtable.table()).to.be.instanceOf(MDtable);
  });
  it('should return empty string if no data given', () => {
    expect(MDtable.table().get()).to.be.equal('');
  });
  it('should create a table', () => {
    const table = new MDtable();
    table
      .th('h1')
      .th('h2')
      .th(MDstring.string('h3').bold())
      .tr()
      .td('td1')
      .td('td2')
      .td(MDstring.string('td3').strikethrough());
    const expected = '| h1 | h2 | **h3** |\n| --- | --- | ------ |\n'
      + '| td1 | td2 | ~~td3~~ |';
    const result = table.get();
    expect(result).to.be.equal(expected);
  });
});
