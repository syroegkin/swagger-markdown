/* eslint-disable max-classes-per-file */
import { textEscape } from './textEscape';

class MDstring {
  private _string = '';

  public static string(string?: string): MDstring {
    return new MDstring(string);
  }

  constructor(string?: string) {
    if (string) {
      this._string = string;
    }
  }

  public get() {
    return this._string;
  }

  public set(string: string) {
    this._string = string;
  }

  public bold(): MDstring {
    this.set(`**${this.get()}**`);
    return this;
  }

  public italic(): MDstring {
    this.set(`*${this.get()}*`);
    return this;
  }

  public link(anchor: string, href: string): MDstring {
    if (this.get() !== '') {
      throw new Error('String is not empty');
    }
    this.set(`[${anchor}](${href})`);
    return this;
  }

  public h1(): MDstring {
    this.set(`# ${this.get()}`);
    return this;
  }

  public h2(): MDstring {
    this.set(`## ${this.get()}`);
    return this;
  }

  public h3(): MDstring {
    this.set(`### ${this.get()}`);
    return this;
  }

  public h4(): MDstring {
    this.set(`#### ${this.get()}`);
    return this;
  }

  public h5(): MDstring {
    this.set(`##### ${this.get()}`);
    return this;
  }

  public h6(): MDstring {
    this.set(`###### ${this.get()}`);
    return this;
  }

  public strikethrough(): MDstring {
    this.set(`~~${this.get()}~~`);
    return this;
  }

  public horizontalRule(): MDstring {
    if (this.get() !== '') {
      throw new Error('String is not empty');
    }
    this.set('---');
    return this;
  }

  public br(): MDstring {
    this.set(`${this.get()}  `);
    return this;
  }

  public escape(): MDstring {
    this.set(`${textEscape(this.get())}`);
    return this;
  }
}

export class Markdown {
  private doc: string[] = [];

  get length(): number {
    return this.doc.length;
  }

  public string(string?: string): MDstring {
    return MDstring.string(string);
  }

  public line(...strings: Array<MDstring | string>): Markdown {
    if (strings && strings.length > 0) {
      this.doc.push(
        strings.map(
          (d: MDstring | string) => (typeof d === 'string' ? d : d.get()),
        ).join(''),
      );
    } else {
      this.doc.push('');
    }
    return this;
  }

  public export(): string | null {
    if (!this.length) {
      return null;
    }
    return `${this.doc.join('\n')}\n`;
  }
}
