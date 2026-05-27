import { create } from "zustand";
import { persist } from "zustand/middleware";
import { v4 as uuid } from "uuid";
import type { DescriptionMapping } from "@/types";

interface DescriptionMappingState {
  mappings: DescriptionMapping[];
  add: (original: string, mapped: string) => DescriptionMapping;
  update: (id: string, data: Partial<Omit<DescriptionMapping, "id">>) => void;
  remove: (id: string) => void;
  findMapping: (description: string) => string | undefined;
}

export const useDescriptionMappingStore = create<DescriptionMappingState>()(
  persist(
    (set, get) => ({
      mappings: [],
      add: (original, mapped) => {
        const mapping = {
          id: uuid(),
          originalDescription: original,
          mappedDescription: mapped,
        };
        set((s) => ({ mappings: [...s.mappings, mapping] }));
        return mapping;
      },
      update: (id, data) =>
        set((s) => ({
          mappings: s.mappings.map((m) =>
            m.id === id ? { ...m, ...data } : m
          ),
        })),
      remove: (id) =>
        set((s) => ({
          mappings: s.mappings.filter((m) => m.id !== id),
        })),
      findMapping: (description) => {
        const lower = description.toLowerCase().trim();
        const mapping = get().mappings.find(
          (m) => m.originalDescription.toLowerCase().trim() === lower
        );
        return mapping?.mappedDescription;
      },
    }),
    { name: "finance-description-mappings" }
  )
);
