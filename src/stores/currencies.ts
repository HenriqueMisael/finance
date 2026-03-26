import { create } from "zustand";
import { persist } from "zustand/middleware";
import { v4 as uuid } from "uuid";
import type { Currency } from "@/types";

interface CurrencyState {
  currencies: Currency[];
  add: (currency: Omit<Currency, "id">) => Currency;
  update: (id: string, data: Partial<Omit<Currency, "id">>) => void;
  remove: (id: string) => void;
  getById: (id: string) => Currency | undefined;
}

export const useCurrencyStore = create<CurrencyState>()(
  persist(
    (set, get) => ({
      currencies: [],
      add: (currency) => {
        const newCurrency = { ...currency, id: uuid() };
        set((s) => ({ currencies: [...s.currencies, newCurrency] }));
        return newCurrency;
      },
      update: (id, data) =>
        set((s) => ({
          currencies: s.currencies.map((c) =>
            c.id === id ? { ...c, ...data } : c
          ),
        })),
      remove: (id) =>
        set((s) => ({
          currencies: s.currencies.filter((c) => c.id !== id),
        })),
      getById: (id) => get().currencies.find((c) => c.id === id),
    }),
    { name: "finance-currencies" }
  )
);
