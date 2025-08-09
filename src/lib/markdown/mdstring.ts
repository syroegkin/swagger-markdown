import { textEscape } from '../textEscape';

/**
 * Helper class to create and format markdown strings
 *
 * @export
 * @class MDstring
 */
export class MDstring {
  private _string = '';

  public static string(string?: string): MDstring {
    return new MDstring(string);
  }

  constructor(string?: string) {
    if (string) {
      this._string = string;
    }
  }

  get length(): number {
    return this._string.length;
  }

  public get() {
    return this._string;
  }

  /**
   * Synonym for this.get()
   */
  public toString(): string {
    return this.get();
  }

  public set(string: string) {
    this._string = string;
  }

  public bold(): this {
    if (this._string !== '') {
      this.set(`**${this._string}**`);
    }
    return this;
  }

  public italic(): this {
    if (this._string !== '') {
      this.set(`*${this._string}*`);
    }
    return this;
  }

  public link(anchor: string, href: string): this {
    if (this._string !== '') {
      throw new Error('String is not empty');
    }
    if (!anchor || !href) {
      throw new Error('All arguments are required');
    }
    this.set(`[${anchor}](${href})`);
    return this;
  }

  public h1(): this {
    if (this._string !== '') {
      this.set(`# ${this._string}`);
    }
    return this;
  }

  public h2(): this {
    if (this._string !== '') {
      this.set(`## ${this._string}`);
    }
    return this;
  }

  public h3(): this {
    if (this._string !== '') {
      this.set(`### ${this._string}`);
    }
    return this;
  }

  public h4(): this {
    if (this._string !== '') {
      this.set(`#### ${this._string}`);
    }
    return this;
  }

  public h5(): this {
    if (this._string !== '') {
      this.set(`##### ${this._string}`);
    }
    return this;
  }

  public h6(): this {
    if (this._string !== '') {
      this.set(`###### ${this._string}`);
    }
    return this;
  }

  public strikethrough(): this {
    if (this._string !== '') {
      this.set(`~~${this._string}~~`);
    }
    return this;
  }

  public horizontalRule(): this {
    if (this._string !== '') {
      throw new Error('String is not empty');
    }
    this.set('---');
    return this;
  }

  public br(asHtmlTag = false): this {
    if (asHtmlTag === true) {
      this.set(`${this._string}<br>`);
      return this;
    }
    if (this._string !== '') {
      this.set(`${this._string}  `);
    }
    return this;
  }

  public codeBlock(language = ''): this {
    if (this._string !== '') {
      this.set(
        `\`\`\`${language}
${this._string}
\`\`\``,
      );
    }
    return this;
  }

  public escape(): this {
    this.set(`${textEscape(this._string)}`);
    return this;
  }

  public concat(string: string | this): this {
    const s = typeof string === 'string' ? string : string.get();
    this._string = `${this._string}${s}`;
    return this;
  }
}
