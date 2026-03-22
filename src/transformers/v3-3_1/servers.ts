import { OpenAPIV3, OpenAPIV3_1 } from 'openapi-types';
import { Markdown } from '../../lib/markdown';

type ServerObject = OpenAPIV3.ServerObject | OpenAPIV3_1.ServerObject;

export function transformServers(servers: ServerObject[]): string {
  if (!servers || servers.length === 0) {
    return '';
  }

  const md = Markdown.md();

  md.line(md.string('Servers').h3()).line();

  const hasDetails = servers.some((s) => s.description || s.variables);

  const table = md.table();
  table.th('URL');
  if (hasDetails) {
    table.th('Description');
  }

  servers.forEach((server) => {
    const tr = table.tr();
    tr.td(server.url || '');

    if (hasDetails) {
      const parts: string[] = [];
      if (server.description) {
        parts.push(md.string(server.description.replace(/[\r\n]/g, ' ')).escape().get());
      }
      if (server.variables) {
        const vars = Object.entries(server.variables).map(([name, variable]) => {
          const varParts = [`\`{${name}}\`: default \`${variable.default}\``];
          if (variable.description) {
            varParts.push(variable.description.replace(/[\r\n]/g, ' '));
          }
          if (variable.enum && variable.enum.length > 0) {
            varParts.push(`(${variable.enum.join(', ')})`);
          }
          return varParts.join(' ');
        });
        parts.push(vars.join(', '));
      }
      tr.td(parts.join(' — '));
    }
  });

  md.line(table);
  return md.export();
}
