import { OpenAPIV3 } from 'openapi-types';
import { Markdown } from '../../../lib/markdown';
import { processSchemas } from './processSchemas';

export function transformComponents(components: OpenAPIV3.ComponentsObject): string | null {
  let hasComponents = false;
  const md = Markdown.md();
  md
    .line(md.string('Schemas').h3())
    .line();

  Object.keys(components).forEach((componentName: string) => {
    if (componentName === 'schemas' && components.schemas) {
      const processedSchemas = processSchemas(components.schemas);
      hasComponents = true;
      md.line(processedSchemas);
    }
  });
  if (hasComponents) {
    return md.export();
  }
  return null;
}
