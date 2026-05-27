export type AccountType = "checking" | "savings" | "investment";

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
  externalIds: string[]; // identifiers from imported statements (ACCTID, CNPJ, etc.)
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

export interface LineItem {
  description: string;
  quantity: number;
  unitValue: number; // smallest currency unit
  totalValue: number; // smallest currency unit
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
  items: LineItem[];
  fitId?: string; // OFX FITID for deduplication on import
}

export interface DescriptionMapping {
  id: string;
  originalDescription: string;
  mappedDescription: string;
}
