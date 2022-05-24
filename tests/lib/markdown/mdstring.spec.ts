import { expect } from 'chai';
import { MDstring } from '../../../src/lib/markdown/mdstring';

describe('mdstring', () => {
  it('should return instance when calling the static one', () => {
    const s = MDstring.string();
    expect(s).to.be.instanceOf(MDstring);
    expect(s.get()).to.be.equal('');
  });
  it('should be init with a string', () => {
    const test = 'it should be init with a string';
    const s = new MDstring(test);
    expect(s.get()).to.be.equal(test);
  });
  it('should be possible to set the string', () => {
    const test = 'it should be possible to set the string';
    const s = MDstring.string(test);
    expect(s.get()).to.be.equal(test);
  });
  it('should make string bold', () => {
    const test = 'it should make string bold';
    const s = MDstring.string(test);
    expect(s.bold().get()).to.be.equal(`**${test}**`);
    s.set('');
    expect(s.bold().get()).to.be.equal('');
  });
  it('should make string italic', () => {
    const test = 'it should make string italic';
    const s = MDstring.string(test);
    expect(s.italic().get()).to.be.equal(`*${test}*`);
    s.set('');
    expect(s.italic().get()).to.be.equal('');
  });
  describe('create a link', () => {
    it('should not allow to create a link if string is not empty', () => {
      const s = MDstring.string('rubbish');
      expect(() => s.link('a', 'b')).to.throw();
    });
    it('should create a link', () => {
      const s = MDstring.string();
      const [anchor, href] = ['anchor', 'href'];
      expect(s.link(anchor, href).get()).to.be.equal(`[${anchor}](${href})`);
    });
    it('should throw if any of the arguments are missing', () => {
      const s = MDstring.string();
      // @ts-ignore
      expect(() => s.link()).to.throw();
      // @ts-ignore
      expect(() => s.link('anchor')).to.throw();
      expect(() => s.link(undefined, 'href')).to.throw();
    });
  });
  it('should create h1', () => {
    const test = 'h1';
    const s = MDstring.string(test);
    expect(s.h1().get()).to.be.equal(`# ${test}`);
    s.set('');
    expect(s.h1().get()).to.be.equal('');
  });
  it('should create h2', () => {
    const test = 'h2';
    const s = MDstring.string(test);
    expect(s.h2().get()).to.be.equal(`## ${test}`);
    s.set('');
    expect(s.h2().get()).to.be.equal('');
  });
  it('should create h3', () => {
    const test = 'h3';
    const s = MDstring.string(test);
    expect(s.h3().get()).to.be.equal(`### ${test}`);
    s.set('');
    expect(s.h3().get()).to.be.equal('');
  });
  it('should create h4', () => {
    const test = 'h4';
    const s = MDstring.string(test);
    expect(s.h4().get()).to.be.equal(`#### ${test}`);
    s.set('');
    expect(s.h4().get()).to.be.equal('');
  });
  it('should create h5', () => {
    const test = 'h5';
    const s = MDstring.string(test);
    expect(s.h5().get()).to.be.equal(`##### ${test}`);
    s.set('');
    expect(s.h5().get()).to.be.equal('');
  });
  it('should create h6', () => {
    const test = 'h6';
    const s = MDstring.string(test);
    expect(s.h6().get()).to.be.equal(`###### ${test}`);
    s.set('');
    expect(s.h6().get()).to.be.equal('');
  });
  it('should make string strikethrough', () => {
    const test = 'it should make string strikethrough';
    const s = MDstring.string(test);
    expect(s.strikethrough().get()).to.be.equal(`~~${test}~~`);
    s.set('');
    expect(s.strikethrough().get()).to.be.equal('');
  });
  it('should add horizontal rule', () => {
    const s = MDstring.string('rubbish');
    expect(() => s.horizontalRule()).to.throw();
    s.set('');
    expect(s.horizontalRule().get()).to.be.equal('---');
  });
  it('should add some spaces after the line to make a br like line', () => {
    const test = 'string';
    const s = MDstring.string(test);
    expect(s.br().get()).to.be.equal(`${test}  `);
    s.set('');
    expect(s.br().get()).to.be.equal('');
  });
});
