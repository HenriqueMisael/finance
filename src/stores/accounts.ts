import { create } from "zustand";
import { persist } from "zustand/middleware";
import { v4 as uuid } from "uuid";
import type { Account } from "@/types";

interface AccountState {
  accounts: Account[];
  add: (account: Omit<Account, "id">) => Account;
  update: (id: string, data: Partial<Omit<Account, "id">>) => void;
  remove: (id: string) => void;
  getById: (id: string) => Account | undefined;
  findByExternalId: (externalId: string) => Account | undefined;
  addExternalId: (accountId: string, externalId: string) => void;
}

export const useAccountStore = create<AccountState>()(
  persist(
    (set, get) => ({
      accounts: [],
      add: (account) => {
        const newAccount = { ...account, externalIds: account.externalIds ?? [], id: uuid() };
        set((s) => ({ accounts: [...s.accounts, newAccount] }));
        return newAccount;
      },
      update: (id, data) =>
        set((s) => ({
          accounts: s.accounts.map((a) =>
            a.id === id ? { ...a, ...data } : a
          ),
        })),
      remove: (id) =>
        set((s) => ({ accounts: s.accounts.filter((a) => a.id !== id) })),
      getById: (id) => get().accounts.find((a) => a.id === id),
      findByExternalId: (externalId) =>
        get().accounts.find((a) =>
          (a.externalIds ?? []).some(
            (eid) => eid.toLowerCase() === externalId.toLowerCase()
          )
        ),
      addExternalId: (accountId, externalId) =>
        set((s) => ({
          accounts: s.accounts.map((a) =>
            a.id === accountId &&
            !(a.externalIds ?? []).some(
              (eid) => eid.toLowerCase() === externalId.toLowerCase()
            )
              ? { ...a, externalIds: [...(a.externalIds ?? []), externalId] }
              : a
          ),
        })),
    }),
    { name: "finance-accounts" }
  )
);
