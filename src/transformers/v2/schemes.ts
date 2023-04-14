import { Markdown } from '../../lib/markdown';

export function transformSchemes(schemes: string[]) {
  const md = Markdown.md();

  return md.line(
    md.string('Schemes:').bold(),
    md.string(' '),
    md.string(schemes.join(', ')).escape(),
  ).export();
}
