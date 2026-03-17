import { OpenAPIV2, OpenAPIV3, OpenAPIV3_1 } from 'openapi-types';
import { Markdown } from '../../lib/markdown';
import { MDstring } from '../../lib/markdown/mdstring';

/**
 * Make it a little bit simpler
 * Respect just type and description, like it is shown in the documentation
 *
 * @export
 * @param headers Headers object (v2, v3, or v3.1)
 * @return {MDstring}
 */
export function transformHeaders(
  headers:
  | OpenAPIV2.HeadersObject
  | { [index: string]: OpenAPIV3.HeaderObject }
  | { [index: string]: OpenAPIV3_1.HeaderObject },
): MDstring {
  const md = Markdown.md();
  let string: MDstring;
  const subString = md.string();
  let hasHeaders = false;
  Object.entries(headers).forEach(([name, obj]) => {
    if ('type' in obj || 'description' in obj) {
      hasHeaders = true;
      subString.concat(md.string(name).bold());
      if ('type' in obj) {
        subString.concat(md.string(` (${obj.type})`));
      }
      if ('description' in obj) {
        subString.concat(md.string(': '));
        subString.concat(md.string(obj.description as string));
      }
      subString.concat(md.string().br(true));
    }
  });
  if (hasHeaders) {
    string = md.string('Headers:').bold().br(true);
    string.concat(subString);
  } else {
    string = md.string();
  }
  return string;
}
