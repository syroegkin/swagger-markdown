import { textEscape } from './textEscape';

export class Markdown {
  constructor(
    private res: string[] = [],
    private buffer: string = '',
  ) {}

  get length(): number {
    return this.res.length;
  }

  public line(line: string, escape = false): Markdown {
    if (escape) {
      this.buffer += textEscape(line);
    } else {
      this.buffer += line;
    }
    return this;
  }

  public link(anchor: string, href: string): Markdown {
    this.buffer += `[${anchor}](${href})`;
    return this;
  }

  public bold(): Markdown {
    if (this.buffer.length) this.buffer = `**${this.buffer}**`;
    return this;
  }

  public italic(): Markdown {
    if (this.buffer.length) this.buffer = `*${this.buffer}*`;
    return this;
  }

  public h1(): Markdown {
    if (this.buffer.length) this.buffer = `# ${this.buffer}`;
    return this;
  }

  public h2(): Markdown {
    if (this.buffer.length) this.buffer = `## ${this.buffer}`;
    return this;
  }

  public h3(): Markdown {
    if (this.buffer.length) this.buffer = `### ${this.buffer}`;
    return this;
  }

  public prepend(): Markdown {
    this.res.unshift(this.buffer);
    this.buffer = '';
    return this;
  }

  public append(): Markdown {
    this.res.push(this.buffer);
    this.buffer = '';
    return this;
  }

  public lineBreak(): Markdown {
    this.res.push('\n');
    return this;
  }

  public horizontalRule(): Markdown {
    this.res.push('---');
    return this;
  }

  public export(): string | null {
    if (!this.length) {
      return null;
    }
    return `${this.res.join('\n')}\n`;
  }
}
