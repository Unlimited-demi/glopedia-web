
export function cleanAsterisks(text) {
  if (typeof text !== 'string') return text;
  return text.replace(/\*/g, '');
}