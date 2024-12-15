// import { OpenAPIV2 } from 'openapi-types';
// import { transformResponses } from './pathResponses';
// import { transformParameters } from './pathParameters';
// import { transformSecurity } from '../common/v2-3/security';
// import { Markdown } from '../../lib/markdown';
// import { ALLOWED_METHODS } from '../../types';
// import { transformExternalDocs } from '../common/v2-3/externalDocs';
// import { transformSchemes } from './schemes';
import { OpenAPIV3 } from 'openapi-types';
import { Markdown } from '../../lib/markdown';
import {
  ALLOWED_METHODS_V3,
} from '../../types';
import { transformExternalDocs } from '../common/v2-3/externalDocs';
import { transformSecurity } from '../common/v2-3/security';
import { transformResponses } from './pathResponses';

export function transformPath(
  path: string,
  data: OpenAPIV3.PathItemObject,
): string | null {
  // const pathParameters: OpenAPIV3.ParameterObject = null;

  if (!path || !data) {
    return null;
  }

  const md = Markdown.md();

  // Check if parameter for path are in the place
  // if ('parameters' in data) {
  //   pathParameters = data.parameters;
  // }

  // Go further method by methods
  Object.keys(data).forEach((method) => {
    if (ALLOWED_METHODS_V3.includes(method)) {
      const pathInfo: OpenAPIV3.OperationObject = data[method];

      const deprecated = 'deprecated' in pathInfo && pathInfo.deprecated === true;

      md.line('');
      const header = (md.string(`[${method.toUpperCase()}] ${path}`));
      if (deprecated) {
        header.strikethrough();
      }
      header.h3();
      md.line(header);

      // Deprecation
      if (deprecated) {
        md.line().line(md.string('DEPRECATED').bold().italic()).line();
      }

      //       // Schemes
      //       if ('schemes' in pathInfo && pathInfo.schemes.length > 0) {
      //         md.line(transformSchemes(pathInfo.schemes));
      //       }

      // Set summary
      if ('summary' in pathInfo) {
        md.line(md.string(pathInfo.summary).escape().bold()).line();
      }

      // Set description
      if ('description' in pathInfo && pathInfo.summary !== pathInfo.description) {
        md.line(md.string(pathInfo.description).escape()).line();
      }

      // Set externalDocs
      if ('externalDocs' in pathInfo) {
        md.line(
          md.string('Documentation:').bold(),
          md.string(' '),
          transformExternalDocs(pathInfo.externalDocs),
        );
      }

      // // Build parameters
      // if ('parameters' in pathInfo || pathParameters) {
      //   const builtParameters = md.string(transformParameters(
      //     pathInfo.parameters,
      //     pathParameters,
      //   ));
      //   if (builtParameters.length) {
      //     md.line(builtParameters).line();
      //   }
      // }

      // Build responses
      if ('responses' in pathInfo) {
        const builtResponses = md.string(transformResponses(
          pathInfo.responses,
        ));
        if (builtResponses.length) {
          md.line(builtResponses).line();
        }
      }

      // Build security
      if ('security' in pathInfo) {
        md.line(
          transformSecurity(pathInfo.security),
        );
      }
    }
  });

  return md.export();
}
