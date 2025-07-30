import { OpenAPIV3 } from 'openapi-types';
import { Markdown } from '../../../lib/markdown';
import { processSchemas } from './processSchemas';
import { processRequestBodies } from './requestBodies';

export function transformComponents(components: OpenAPIV3.ComponentsObject): string | null {
  let hasComponents = false;
  const md = Markdown.md();
  md
    .line(md.string('Schemas').h3())
    .line();

  Object.keys(components).forEach((componentName: string) => {
    // console.log(`Processing component: ${componentName}`);
    if (componentName === 'requestBodies' && components.requestBodies) {
      // console.log(JSON.stringify(components.requestBodies, null, 2));
      const processedRequestBodies = processRequestBodies(components.requestBodies);
      hasComponents = true;
      md.line(processedRequestBodies);
    }
    if (componentName === 'schemas' && components.schemas) {
      // console.log(JSON.stringify(components.schemas, null, 2));
      const processedSchemas = processSchemas(components.schemas);
      hasComponents = true;
      md.line(processedSchemas);
    }
    if (componentName === 'securitySchemes') {
      // securitySchemes has been processed already

    }

    // const processedDefinition = processDefinition(
    //   definitionName,
    //   definitions[definitionName],
    // );
    // if (processedDefinition) {
    //   hasComponents = true;
    //   md.line(processedDefinition);
    // }
  });
  if (hasComponents) {
    return md.export();
  }
  return null;
}
