import { OpenAPIV3 } from 'openapi-types';
import { Markdown } from '../../lib/markdown';
import { MDstring } from '../../lib/markdown/mdstring';

export function processLink(
  linkName: string,
  link: OpenAPIV3.LinkObject | string,
): MDstring {
  const md = Markdown.md();

  if (typeof link === 'string') {
    return md.string(linkName).bold().concat(' ').concat(link);
  }

  const linkString = md.string(linkName).bold();

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
