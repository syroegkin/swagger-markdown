import { OpenAPIV3, OpenAPIV3_1 } from 'openapi-types';
import { Markdown } from '../../lib/markdown';
import { MDstring } from '../../lib/markdown/mdstring';

export function processLink(
  linkName: string,
  link: OpenAPIV3.LinkObject | OpenAPIV3_1.LinkObject | string,
): MDstring {
  const md = Markdown.md();

  if (typeof link === 'string') {
    return md.string(linkName).bold().concat(' ').concat(link);
  }

  const linkString = md.string(linkName).bold();

  // operationId and operationRef are intentionally not rendered — they are
  // machine-readable references that don't improve human-readable documentation.

  if ('description' in link) {
    linkString.br(true).concat(link.description);
  }

  if ('parameters' in link) {
    linkString.br(true).concat('Parameters {').br(true);
    const links = [];
    Object.entries(link.parameters).forEach((parameter) => {
      links.push(`"${parameter[0]}": "${parameter[1]}"`);
    });
    if (links.length > 0) {
      linkString.concat(links.join(',<br>')).br(true);
    }
    linkString.concat('}').br(true);
  }

  return linkString;
}
