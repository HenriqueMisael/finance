import { create } from "zustand";
import { persist } from "zustand/middleware";
import { v4 as uuid } from "uuid";
import type { Transaction } from "@/types";

interface TransactionState {
  transactions: Transaction[];
  add: (transaction: Omit<Transaction, "id">) => Transaction;
  bulkAdd: (transactions: Omit<Transaction, "id">[]) => void;
  update: (id: string, data: Partial<Omit<Transaction, "id">>) => void;
  remove: (id: string) => void;
  getById: (id: string) => Transaction | undefined;
  getByAccount: (accountId: string) => Transaction[];
  getByFitId: (fitId: string, accountId: string) => Transaction | undefined;
  getChildren: (parentId: string) => Transaction[];
}

export const useTransactionStore = create<TransactionState>()(
  persist(
    (set, get) => ({
      transactions: [],
      add: (transaction) => {
        const newTransaction = { ...transaction, id: uuid() };
        set((s) => ({
          transactions: [...s.transactions, newTransaction],
        }));
        return newTransaction;
      },
      bulkAdd: (transactions) => {
        const newTransactions = transactions.map((t) => ({ ...t, id: uuid() }));
        set((s) => ({
          transactions: [...s.transactions, ...newTransactions],
        }));
      },
      update: (id, data) =>
        set((s) => ({
          transactions: s.transactions.map((t) =>
            t.id === id ? { ...t, ...data } : t
          ),
        })),
      remove: (id) =>
        set((s) => ({
          transactions: s.transactions.filter((t) => t.id !== id),
        })),
      getById: (id) => get().transactions.find((t) => t.id === id),
      getByAccount: (accountId) =>
        get().transactions.filter(
          (t) => t.payerId === accountId || t.payeeId === accountId
        ),
      getByFitId: (fitId, accountId) =>
        get().transactions.find(
          (t) =>
            t.fitId === fitId &&
            (t.payerId === accountId || t.payeeId === accountId)
        ),
      getChildren: (parentId) =>
        get().transactions.filter((t) => t.parentTransactionId === parentId),
    }),
    { name: "finance-transactions" }
  )
);
