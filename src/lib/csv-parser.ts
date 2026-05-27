import { parseBrDate } from "./format";

export interface CsvTransaction {
  fitId: string;
  date: string; // ISO date string
  amount: number;
  description: string;
}

export interface CsvStatement {
  transactions: CsvTransaction[];
  accountId?: string; // extracted from filename if possible
}

function parseCsvLine(line: string): string[] {
  const fields: string[] = [];
  let current = "";
  let inQuotes = false;

  for (let i = 0; i < line.length; i++) {
    const ch = line[i];
    if (ch === '"') {
      if (inQuotes && line[i + 1] === '"') {
        current += '"';
        i++;
      } else {
        inQuotes = !inQuotes;
      }
    } else if (ch === "," && !inQuotes) {
      fields.push(current);
      current = "";
    } else {
      current += ch;
    }
  }
  fields.push(current);
  return fields;
}

function extractAccountIdFromFilename(filename: string): string | undefined {
  // Pattern: NU_<ACCTID>_<START>_<END>.csv
  const match = filename.match(/NU_(\d+)_/i);
  if (!match) return undefined;
  // Format as account ID with dash before last digit (e.g., 45983639 → 4598363-9)
  const raw = match[1];
  if (raw.length > 1) {
    return `${raw.slice(0, -1)}-${raw.slice(-1)}`;
  }
  return raw;
}

export function parseCsv(content: string, filename: string): CsvStatement {
  const lines = content.split(/\r?\n/).filter((l) => l.trim());
  if (lines.length === 0) return { transactions: [] };

  // Detect header
  const header = lines[0].toLowerCase();
  const isNubankFormat =
    header.includes("data") &&
    header.includes("valor") &&
    header.includes("identificador") &&
    header.includes("descri");

  if (!isNubankFormat) {
    return { transactions: [] };
  }

  const headerFields = parseCsvLine(lines[0]);
  const dateIdx = headerFields.findIndex((h) => h.toLowerCase() === "data");
  const valueIdx = headerFields.findIndex((h) => h.toLowerCase() === "valor");
  const idIdx = headerFields.findIndex(
    (h) => h.toLowerCase() === "identificador"
  );
  const descIdx = headerFields.findIndex((h) =>
    h.toLowerCase().startsWith("descri")
  );

  const transactions: CsvTransaction[] = [];

  for (let i = 1; i < lines.length; i++) {
    const fields = parseCsvLine(lines[i]);
    if (fields.length < 4) continue;

    const dateRaw = fields[dateIdx]?.trim();
    const valueRaw = fields[valueIdx]?.trim();
    const fitId = fields[idIdx]?.trim();
    const description = fields[descIdx]?.trim();

    if (!dateRaw || !valueRaw || !fitId || !description) continue;

    const amount = parseFloat(valueRaw.replace(",", "."));
    if (isNaN(amount)) continue;

    transactions.push({
      fitId,
      date: parseBrDate(dateRaw),
      amount,
      description,
    });
  }

  return {
    transactions,
    accountId: extractAccountIdFromFilename(filename),
  };
}
