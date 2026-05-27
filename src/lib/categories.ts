import type { Category } from "@/types";

export function buildCategoryPath(
  categoryId: string,
  categories: Category[]
): string {
  const map = Object.fromEntries(categories.map((c) => [c.id, c]));
  const parts: string[] = [];
  let current: Category | undefined = map[categoryId];
  while (current) {
    parts.unshift(current.name);
    current = current.parentId ? map[current.parentId] : undefined;
  }
  return parts.join(" → ");
}
