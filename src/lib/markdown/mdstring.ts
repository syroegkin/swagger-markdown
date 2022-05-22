import { textEscape } from '../textEscape';

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
