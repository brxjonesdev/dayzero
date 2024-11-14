export function formatString(input: string): string {
  return input
    .toLowerCase()
    .replace(/[-/]/g, ' ')
    .replace(/\b\w/g, (char) => char.toUpperCase());
}
