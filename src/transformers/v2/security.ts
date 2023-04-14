import { OpenAPIV2 } from 'openapi-types';
import { Markdown } from '../../lib/markdown';

export function transformSecurity(security: OpenAPIV2.SecurityRequirementObject[]) {
  const md = Markdown.md();
  md.line(md.string('Security').h5()).line();
  let hasRules = false;

  let maxLength = 0;
  security.forEach((rules) => {
    Object.keys(rules).forEach((key) => {
      maxLength = rules[key].length > maxLength ? rules[key].length : maxLength;
    });
  });
  maxLength++;
  if (maxLength < 2) {
    maxLength = 2;
  }

  const table = md.table();

  table.th('Security Schema')
    .th('Scopes');

  for (let i = 0; i < maxLength - 2; i++) {
    table.th('');
  }

  security.forEach((rules: OpenAPIV2.SecurityRequirementObject) => {
    const tr = table.tr();
    Object.keys(rules).forEach((key) => {
      hasRules = true;
      const line = [key].concat(rules[key]);
      while (line.length < maxLength) {
        line.push('');
      }
      line.forEach((l) => tr.td(l));
    });
  });

  md.line(table);

  if (hasRules) {
    return md.export();
  }
  return '';
}
