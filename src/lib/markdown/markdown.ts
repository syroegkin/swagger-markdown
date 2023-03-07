import { MDstring } from './mdstring';
import { MDtable } from './mdtable';

export class Markdown {
  private doc: string[] = [];

  get length(): number {
    return this.doc.length;
  }

  public static md(): Markdown {
    return new Markdown();
  }

  public string(string?: string): MDstring {
    return MDstring.string(string);
  }

  public table(): MDtable {
    return MDtable.table();
  }

  public line(...strings: Array<MDstring | MDtable | string>): Markdown {
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
