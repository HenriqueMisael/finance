import { create } from "zustand";
import { persist } from "zustand/middleware";
import { v4 as uuid } from "uuid";
import type { Tag } from "@/types";

interface TagState {
  tags: Tag[];
  add: (name: string) => Tag;
  update: (id: string, name: string) => void;
  remove: (id: string) => void;
  getById: (id: string) => Tag | undefined;
}

export const useTagStore = create<TagState>()(
  persist(
    (set, get) => ({
      tags: [],
      add: (name) => {
        const newTag = { id: uuid(), name };
        set((s) => ({ tags: [...s.tags, newTag] }));
        return newTag;
      },
      update: (id, name) =>
        set((s) => ({
          tags: s.tags.map((t) => (t.id === id ? { ...t, name } : t)),
        })),
      remove: (id) =>
        set((s) => ({ tags: s.tags.filter((t) => t.id !== id) })),
      getById: (id) => get().tags.find((t) => t.id === id),
    }),
    { name: "finance-tags" }
  )
);
