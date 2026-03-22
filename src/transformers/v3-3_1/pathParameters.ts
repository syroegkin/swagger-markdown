import { OpenAPIV3, OpenAPIV3_1 } from 'openapi-types';
import { dataTypeResolver } from './dataTypes';
import { Schema } from './models/Schema';
import { Markdown } from '../../lib/markdown';

type ParameterObject = OpenAPIV3.ParameterObject | OpenAPIV3_1.ParameterObject;

export const resolveParameterSchema = (parameterObject: ParameterObject): Schema => {
  if ('schema' in parameterObject && parameterObject.schema) {
    return new Schema(parameterObject.schema);
  }
  if ('content' in parameterObject && parameterObject.content) {
    const mediaType = Object.keys(parameterObject.content)[0];
    const contentSchema = mediaType && parameterObject.content[mediaType]?.schema;
    if (contentSchema) {
      return new Schema(contentSchema);
    }
  }
  return new Schema({});
};

export const getDescription = (md: Markdown, parameterObject: ParameterObject) => {
  if ('description' in parameterObject && parameterObject.description) {
    return md.string(parameterObject.description.replace(/[\r\n]/g, ' ')).escape();
  }
  return '';
};

export const transformParameters = (
  parameters: ParameterObject[] = [],
  pathParameters: ParameterObject[] = [],
) => {
  const allParameters = [...parameters, ...pathParameters];
  if (allParameters.length === 0) {
    return '';
  }
  const md = Markdown.md();

  md.line(md.string('Parameters').h4()).line();
  const table = md.table();
  table.th('Name').th('Located in').th('Description').th('Required')
    .th('Schema');

  allParameters.forEach((parameterObject: ParameterObject) => {
    if (parameterObject) {
      const tr = table.tr();
      tr.td(parameterObject.name || '');
      tr.td(parameterObject.in || '');
      tr.td(getDescription(md, parameterObject));
      tr.td(parameterObject.required ? 'Yes' : 'No');
      tr.td(dataTypeResolver(resolveParameterSchema(parameterObject)));
    }
  });

  md.line(table);
  return md.export();
};
