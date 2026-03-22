import { OpenAPIV2 } from 'openapi-types';
import { Schema } from './models/Schema';
import { Markdown } from '../../lib/markdown';
import { V2_DEFINITION_SUFFIX } from '../common/dataTypes';
import {
  parseProperties,
  parsePrimitive,
} from '../common/schemaProperties';

export function processDefinition(name: string, definition: OpenAPIV2.SchemaObject) {
  const md = Markdown.md();
  md.line()
    .line(md.string(`${name} ${V2_DEFINITION_SUFFIX}`).h4())
    .line();
  if (definition.description) {
    md.line(definition.description)
      .line();
  }
  const table = md.table();
  table.th('Name').th('Type').th('Description').th('Required');

  if ('properties' in definition) {
    const parsedProperties = parseProperties(definition, Schema);
    parsedProperties.forEach((row) => table.insertRow(row));
  } else {
    table.insertRow(parsePrimitive(name, definition));
  }
  md.line(table);

  if (definition.example) {
    const formattedExample = typeof definition.example === 'string'
      ? definition.example
      : JSON.stringify(definition.example, null, '  ');
    md.line()
      .line(md.string('Example').bold())
      .line(`<pre>${formattedExample}</pre>`);
  }

  return md.export();
}

export function transformDefinition(definitions: OpenAPIV2.DefinitionsObject): string | null {
  let hasDefinitions = false;
  const md = Markdown.md();
  md
    .line(md.string('Models').h3())
    .line();

  Object.keys(definitions).forEach((definitionName: string) => {
    const processedDefinition = processDefinition(
      definitionName,
      definitions[definitionName],
    );
    if (processedDefinition) {
      hasDefinitions = true;
      md.line(processedDefinition);
    }
  });
  if (hasDefinitions) {
    return md.export();
  }
  return null;
}
