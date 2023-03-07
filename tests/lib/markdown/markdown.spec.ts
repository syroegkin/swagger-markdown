import { expect } from 'chai';
import { Markdown } from '../../../src/lib/markdown/markdown';
import { MDstring } from '../../../src/lib/markdown/mdstring';
import { MDtable } from '../../../src/lib/markdown/mdtable';

describe('Markdown', () => {
  it('should create markdown object', () => {
    const md = Markdown.md();
    expect(md).to.be.instanceOf(Markdown);
  });
  it('should create mdstring object', () => {
    const string = Markdown.md().string();
    expect(string).to.be.instanceOf(MDstring);
  });
  it('should create MDtable object', () => {
    const table = Markdown.md().table();
    expect(table).to.be.instanceOf(MDtable);
  });
  it('should add strings', () => {
    const md = Markdown.md();
    md.line(MDstring.string('123'), '234');
    md.line(MDstring.string('123'), '234');
    expect(md.length).to.be.equal(2);
  });
  it('should create markdown', () => {
    const md = Markdown.md();
    const table = md.table().th('1').th('2');
    const row = table.tr();
    row.td('1').td('2');
    const result = '**123**345\n| 1 | 2 |\n| --- | --- |\n| 1 | 2 |\n';
    md.line(MDstring.string('123').bold(), '345');
    md.line(table);
    expect(md.export()).to.be.equal(result);
  });
});
