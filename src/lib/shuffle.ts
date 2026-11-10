/**
 * A copy of `items` in random order (Fisher–Yates). It is random, so call it in the browser (as ShuffledGrid does) or,
 * in a Server Component, only at request time (after `await connection()`): a prerendered order would be frozen.
 */
export function shuffled<T>(items: readonly T[]): T[] {
  const copy = [...items];
  for (let i = copy.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [copy[i], copy[j]] = [copy[j], copy[i]];
  }
  return copy;
}
