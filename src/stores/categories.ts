import { create } from "zustand";
import { persist } from "zustand/middleware";
import { v4 as uuid } from "uuid";
import type { Category } from "@/types";

interface CategoryState {
  categories: Category[];
  add: (category: Omit<Category, "id">) => Category;
  update: (id: string, data: Partial<Omit<Category, "id">>) => void;
  remove: (id: string) => void;
  getById: (id: string) => Category | undefined;
  getChildren: (parentId: string | null) => Category[];
}

export const useCategoryStore = create<CategoryState>()(
  persist(
    (set, get) => ({
      categories: [],
      add: (category) => {
        const newCategory = { ...category, id: uuid() };
        set((s) => ({ categories: [...s.categories, newCategory] }));
        return newCategory;
      },
      update: (id, data) =>
        set((s) => ({
          categories: s.categories.map((c) =>
            c.id === id ? { ...c, ...data } : c
          ),
        })),
      remove: (id) =>
        set((s) => ({
          categories: s.categories.filter((c) => c.id !== id),
        })),
      getById: (id) => get().categories.find((c) => c.id === id),
      getChildren: (parentId) =>
        get().categories.filter((c) => c.parentId === parentId),
    }),
    { name: "finance-categories" }
  )
);
