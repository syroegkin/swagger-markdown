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

  public set(string: string) {
    this._string = string;
  }

  public bold(): MDstring {
    if (this._string !== '') {
      this.set(`**${this._string}**`);
    }
    return this;
  }

  public italic(): MDstring {
    if (this._string !== '') {
      this.set(`*${this._string}*`);
    }
    return this;
  }

  public link(anchor: string, href: string): MDstring {
    if (this._string !== '') {
      throw new Error('String is not empty');
    }
    if (!anchor || !href) {
      throw new Error('All arguments are required');
    }
    this.set(`[${anchor}](${href})`);
    return this;
  }

  public h1(): MDstring {
    if (this._string !== '') {
      this.set(`# ${this._string}`);
    }
    return this;
  }

  public h2(): MDstring {
    if (this._string !== '') {
      this.set(`## ${this._string}`);
    }
    return this;
  }

  public h3(): MDstring {
    if (this._string !== '') {
      this.set(`### ${this._string}`);
    }
    return this;
  }

  public h4(): MDstring {
    if (this._string !== '') {
      this.set(`#### ${this._string}`);
    }
    return this;
  }

  public h5(): MDstring {
    if (this._string !== '') {
      this.set(`##### ${this._string}`);
    }
    return this;
  }

  public h6(): MDstring {
    if (this._string !== '') {
      this.set(`###### ${this._string}`);
    }
    return this;
  }

  public strikethrough(): MDstring {
    if (this._string !== '') {
      this.set(`~~${this._string}~~`);
    }
    return this;
  }

  public horizontalRule(): MDstring {
    if (this._string !== '') {
      throw new Error('String is not empty');
    }
    this.set('---');
    return this;
  }

  public br(): MDstring {
    if (this._string !== '') {
      this.set(`${this._string}  `);
    }
    return this;
  }

  public escape(): MDstring {
    this.set(`${textEscape(this._string)}`);
    return this;
  }
}
