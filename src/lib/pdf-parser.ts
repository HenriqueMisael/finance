import * as pdfjsLib from "pdfjs-dist";
import { parseBrDate, parseBrCurrency } from "./format";

// Use the bundled worker
pdfjsLib.GlobalWorkerOptions.workerSrc = new URL(
  "pdfjs-dist/build/pdf.worker.mjs",
  import.meta.url
).toString();

export interface PdfFundTransaction {
  fitId: string;
  date: string; // ISO date string
  description: string;
  grossValue: number;
  netValue: number;
}

export interface PdfFundAccount {
  cnpj: string;
  name: string;
  balance: number;
  transactions: PdfFundTransaction[];
}

export interface PdfStatement {
  funds: PdfFundAccount[];
  investorId?: string;
}

export async function parsePdf(data: ArrayBuffer): Promise<PdfStatement> {
  const pdf = await pdfjsLib.getDocument({ data }).promise;
  const allText: string[] = [];

  for (let i = 1; i <= pdf.numPages; i++) {
    const page = await pdf.getPage(i);
    const content = await page.getTextContent();
    const pageText = content.items
      .map((item: any) => item.str)
      .join(" ");
    allText.push(pageText);
  }

  const fullText = allText.join("\n\n");
  return parsePdfText(fullText);
}

export function parsePdfText(text: string): PdfStatement {
  const funds: PdfFundAccount[] = [];

  // Extract investor ID
  const investorMatch = text.match(
    /C[oó]digo do investidor\s*(\d+)/i
  );
  const investorId = investorMatch?.[1];

  // Split by "Classe:" to find fund sections
  const sections = text.split(/(?=Classe:)/i);

  for (const section of sections) {
    const classeMatch = section.match(/Classe:\s*(.+?)(?:CNPJ|\.?\s*CNPJ)/i);
    if (!classeMatch) continue;

    const fundName = classeMatch[1].replace(/\s+/g, " ").trim().replace(/[.\s-]+$/, "").trim();

    // Extract CNPJ
    const cnpjMatch = section.match(
      /CNPJ[:\s]*(\d{2}\.\d{3}\.\d{3}\/\d{4}-\d{2})/
    );
    if (!cnpjMatch) continue;
    const cnpj = cnpjMatch[1];

    // Extract balance
    const balanceMatch = section.match(
      /Saldo no final do per[ií]odo:\s*(R\$\s*[\d.,]+)/i
    );
    const balance = balanceMatch ? parseBrCurrency(balanceMatch[1]) : 0;

    // Extract transactions
    const transactions: PdfFundTransaction[] = [];

    // Look for transaction rows: DD/MM/YYYY <description> R$ <amounts>...
    const txRegex =
      /(\d{2}\/\d{2}\/\d{4})\s+((?:Compra|Resgate|Aplica[cç][aã]o|Come-cotas)[^\n]*?)\s+R\$\s*([\d.,]+)\s+R\$\s*[\d.,]+\s+R\$\s*[\d.,]+\s+R\$\s*([\d.,]+)/gi;
    let txMatch;
    while ((txMatch = txRegex.exec(section)) !== null) {
      const date = parseBrDate(txMatch[1]);
      const description = txMatch[2].replace(/\s+/g, " ").trim();
      const grossValue = parseBrCurrency(txMatch[3]);
      const netValue = parseBrCurrency(txMatch[4]);

      // Generate a deterministic fitId from fund + date + description + value
      const fitId = `pdf-${cnpj}-${date}-${description}-${netValue}`;

      transactions.push({
        fitId,
        date,
        description,
        grossValue,
        netValue,
      });
    }

    funds.push({ cnpj, name: fundName, balance, transactions });
  }

  return { funds, investorId };
}
