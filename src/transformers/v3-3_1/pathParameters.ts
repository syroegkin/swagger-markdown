import { OpenAPIV3, OpenAPIV3_1 } from 'openapi-types';
import { dataTypeResolver } from '../common/dataTypes';
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

  const hasStyle = allParameters.some((p) => p && 'style' in p);
  const hasExplode = allParameters.some((p) => p && 'explode' in p);

  md.line(md.string('Parameters').h4()).line();
  const table = md.table();
  table.th('Name').th('Located in').th('Description').th('Required')
    .th('Schema');
  if (hasStyle) {
    table.th('Style');
  }
  if (hasExplode) {
    table.th('Explode');
  }

  allParameters.forEach((parameterObject: ParameterObject) => {
    if (parameterObject) {
      const tr = table.tr();
      tr.td(parameterObject.name || '');
      tr.td(parameterObject.in || '');
      tr.td(getDescription(md, parameterObject));
      tr.td(parameterObject.required ? 'Yes' : 'No');
      tr.td(dataTypeResolver(resolveParameterSchema(parameterObject)));
      if (hasStyle) {
        tr.td(parameterObject.style || '');
      }
      if (hasExplode) {
        let explodeValue = '';
        if ('explode' in parameterObject) {
          explodeValue = parameterObject.explode ? 'Yes' : 'No';
        }
        tr.td(explodeValue);
      }
    }
  });

  md.line(table);
  return md.export();
};
