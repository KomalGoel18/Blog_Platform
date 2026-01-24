export function generateId(posts: { id: number }[]): number {
  if (posts.length === 0) return 1;
  return Math.max(...posts.map((p) => p.id)) + 1;
}
