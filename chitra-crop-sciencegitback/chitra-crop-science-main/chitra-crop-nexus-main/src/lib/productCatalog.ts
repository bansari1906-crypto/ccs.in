export function normalizeCategorySlug(value: string): string {
  return value.toLowerCase().replace(/\s+/g, "-");
}
