import { parseOfx } from "./ofx-parser";
import { parseCsv } from "./csv-parser";
import { parsePdf } from "./pdf-parser";

export interface ParsedTransaction {
  fitId: string;
  date: string;
  amount: number;
  description: string;
}

export interface ParsedStatementAccount {
  externalId: string; // identifier to match against Account.externalIds
  label: string; // human-readable label
  currency?: string;
  transactions: ParsedTransaction[];
  balance?: number;
  suggestedType?: "checking" | "savings" | "investment";
}

export interface ParsedStatement {
  format: "ofx" | "csv" | "pdf";
  accounts: ParsedStatementAccount[];
}

export function detectFormat(filename: string): "ofx" | "csv" | "pdf" | null {
  const ext = filename.toLowerCase().split(".").pop();
  if (ext === "ofx") return "ofx";
  if (ext === "csv") return "csv";
  if (ext === "pdf") return "pdf";
  return null;
}

export async function parseStatement(
  content: string | ArrayBuffer,
  filename: string
): Promise<ParsedStatement> {
  const format = detectFormat(filename);
  if (!format) throw new Error(`Unsupported file format: ${filename}`);

  switch (format) {
    case "ofx":
      return parseOfxStatement(content as string);
    case "csv":
      return parseCsvStatement(content as string, filename);
    case "pdf":
      return parsePdfStatement(content as ArrayBuffer);
  }
}

function parseOfxStatement(content: string): ParsedStatement {
  const result = parseOfx(content);

  const externalId = result.account?.acctId ?? "";
  const orgName = result.account?.org;
  const label = orgName
    ? `${orgName} — ${externalId}`
    : externalId || "Unknown Account";

  const acctType = result.account?.acctType?.toLowerCase();
  const suggestedType =
    acctType === "savings"
      ? ("savings" as const)
      : acctType === "checking"
        ? ("checking" as const)
        : undefined;

  return {
    format: "ofx",
    accounts: [
      {
        externalId,
        label,
        currency: result.currency,
        suggestedType,
        transactions: result.transactions.map((t) => ({
          fitId: t.fitId,
          date: t.date,
          amount: t.amount,
          description: t.name,
        })),
      },
    ],
  };
}

function parseCsvStatement(
  content: string,
  filename: string
): ParsedStatement {
  const result = parseCsv(content, filename);

  return {
    format: "csv",
    accounts: [
      {
        externalId: result.accountId ?? "",
        label: result.accountId
          ? `Account ${result.accountId}`
          : "Unknown Account",
        transactions: result.transactions.map((t) => ({
          fitId: t.fitId,
          date: t.date,
          amount: t.amount,
          description: t.description,
        })),
      },
    ],
  };
}

async function parsePdfStatement(content: ArrayBuffer): Promise<ParsedStatement> {
  const result = await parsePdf(content);

  return {
    format: "pdf",
    accounts: result.funds.map((fund) => ({
      externalId: fund.cnpj,
      label: fund.name,
      currency: "BRL",
      balance: fund.balance,
      suggestedType: "investment" as const,
      transactions: fund.transactions.map((t) => ({
        fitId: t.fitId,
        date: t.date,
        amount: t.netValue,
        description: t.description,
      })),
    })),
  };
}
