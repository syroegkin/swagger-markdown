import { AllSwaggerDocumentVersions } from '../types';

const SUPPORTED_OPENAPI_VERSIONS = ['3.0', '3.1'];

/**
 * A version written with no quotes is read as a number, which is a very common mistake.
 * It is read as a string then, with a warning.
 */
function readNumericVersion(
  holder: Record<string, unknown>,
  key: string,
  toString: (version: number) => string,
  source: string,
) {
  const version = holder[key];
  if (typeof version === 'number') {
    const fixed = toString(version);
    console.warn(`${source}: ${key} is a number, read as "${fixed}". Quote it to keep it exactly as written.`);
    holder[key] = fixed;
  }
}

// YAML reads 3.0 as 3, while the specification version always has the minor part
const specificationVersion = (version: number): string => (
  Number.isInteger(version) ? version.toFixed(1) : String(version)
);

/**
 * Basic sanity check of the parsed document: it has to be a Swagger/OpenAPI definition
 * of a version we can recognize. This is not a validation against the specification:
 * whatever the document has is rendered.
 * Versions written as numbers are turned into strings in the document.
 *
 * @param document parsed document
 * @param source where the document came from, for the messages
 */
export function assertValidDocument(
  document: unknown,
  source: string,
): asserts document is AllSwaggerDocumentVersions {
  if (document === null || typeof document !== 'object' || Array.isArray(document)) {
    throw new SyntaxError(`${source} is not a valid Swagger/OpenAPI definition`);
  }
  const fields = document as Record<string, unknown>;
  readNumericVersion(fields, 'swagger', specificationVersion, source);
  readNumericVersion(fields, 'openapi', specificationVersion, source);
  if (fields.info !== null && typeof fields.info === 'object') {
    readNumericVersion(fields.info as Record<string, unknown>, 'version', String, source);
  }
  const { swagger, openapi } = fields;

  if (swagger === undefined && openapi === undefined) {
    throw new SyntaxError(`${source} is not a valid Swagger/OpenAPI definition`);
  }

  if (swagger !== undefined) {
    if (typeof swagger !== 'string' || swagger.split('.')[0] !== '2') {
      throw new SyntaxError(`Unrecognized Swagger version: ${swagger}. Expected 2.0`);
    }
    return;
  }

  const [major, minor] = typeof openapi === 'string' ? openapi.split('.') : [];
  // The minor part tells which 3.x it is, without it there is no way to know
  if (major !== '3' || !/^\d+$/.test(minor ?? '')) {
    throw new SyntaxError(
      `Unsupported OpenAPI version: ${openapi}. `
      + `Supported versions are ${SUPPORTED_OPENAPI_VERSIONS.map((v) => `${v}.x`).join(', ')}`,
    );
  }
  if (!SUPPORTED_OPENAPI_VERSIONS.includes(`${major}.${minor}`)) {
    const newest = SUPPORTED_OPENAPI_VERSIONS[SUPPORTED_OPENAPI_VERSIONS.length - 1];
    console.warn(`${source}: OpenAPI ${openapi} is not supported yet, rendered as ${newest}.`);
  }
}
