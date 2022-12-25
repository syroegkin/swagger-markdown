/* eslint-disable max-classes-per-file */
import { MDstring } from './mdstring';

export class MDtableRow {
  public constructor(
    private _td: (MDstring | string)[] = [],
  ) {}

  public static tr(): MDtableRow {
    return new MDtableRow();
  }

  public td(string: string | MDstring = ''): MDtableRow {
    this._td.push(string);
    return this;
  }

  public get(): string {
    if (!this._td.length) {
      return '';
    }
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
    return this.insertRow(tr);
  }

  public insertRow(tr: MDtableRow): MDtableRow {
    this._tr.push(tr);
    return tr;
  }

  public get(): string {
    const result: string[] = [];
    const columns = this._th.length;

    if (columns) {
      const th = `| ${this._th.map(
        (d: MDstring | string) => (typeof d === 'string' ? d : d.get()),
      ).join(' | ')} |`;
      result.push(th);

      const thead = `| ${
        this._th.map(
          (el: string | MDstring) => '-'.repeat(el.length > 3 ? el.length : 3)
          ,
        ).join(' | ')
      } |`;
      result.push(thead);
    }

    if (this._tr.length) {
      this._tr.forEach((row: MDtableRow) => {
        result.push(row.get());
      });
    }

    return result.join('\n');
  }
}
