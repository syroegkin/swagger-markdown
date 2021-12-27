/**
 * Make kebap case format
*/
export function anchor(input: string): string {
  return input
    .replace(/\s+/g, '-')
    .replace(/^-*/ig, '')
    .replace(/-*$/ig, '')
    .replace(/\./g, '')
    .toLowerCase();
}
