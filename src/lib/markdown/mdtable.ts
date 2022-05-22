/* eslint-disable max-classes-per-file */
import { MDstring } from './mdstring';

class MDtableRow {
  public constructor(
    private _td: (MDstring | string)[] = [],
  ) {}

  public td(string: string | MDstring = ''): MDtableRow {
    this._td.push(string);
    return this;
  }

  public export(): string {
    return `| ${this._td.map(
      (d: MDstring | string) => (typeof d === 'string' ? d : d.get()),
    ).join(' | ')} |`;
  }
}

export class MDtable {
  public constructor(
    private _th: (MDstring | string)[] = [],
    private _tr: MDtableRow[] = [],
  ) {}

  public static table(): MDtable {
    return new MDtable();
  }

  public th(string: string | MDstring): MDtable {
    this._th.push(string);
    return this;
  }

  public tr(): MDtableRow {
    const tr = new MDtableRow();
    this._tr.push(tr);
    return tr;
  }

  public get(): string {
    const result: string[] = [];
    const columns = this._th.length;

    if (this._th) {
      const th = `| ${this._th.map(
        (d: MDstring | string) => (typeof d === 'string' ? d : d.get()),
      ).join(' | ')} |`;
      result.push(th);

      const thead = `| ${[...Array(columns).keys()].map(() => '---').join(' | ')} |`;
      result.push(thead);
    }

    if (this._tr) {
      this._tr.forEach((row: MDtableRow) => {
        result.push(row.export());
      });
    }

    return result.join('\n');
  }
}
