export function isValidId(id: any): boolean {
  const num = Number(id);
  return Number.isInteger(num) && num > 0;
}
