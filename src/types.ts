export type AccountType = "asset" | "liability" | "tracking";

export interface Currency {
  id: string;
  code: string;
  name: string;
  symbol: string;
  decimalPlaces: number;
}

export interface Account {
  id: string;
  name: string;
  currencyId: string;
  type: AccountType;
}

export interface Category {
  id: string;
  name: string;
  parentId: string | null;
}

export interface Tag {
  id: string;
  name: string;
}

export interface Transaction {
  id: string;
  description: string;
  date: string; // ISO date string
  value: number; // always positive integer, smallest currency unit
  categoryId: string | null;
  tagIds: string[];
  payerId: string;
  payeeId: string;
  parentTransactionId: string | null;
}
