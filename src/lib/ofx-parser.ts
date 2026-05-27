export interface OfxTransaction {
  fitId: string;
  date: string; // ISO date string
  amount: number; // decimal number, negative = debit, positive = credit
  name: string;
  type: string;
}

export interface OfxAccountInfo {
  acctId: string;
  bankId?: string;
  acctType?: string;
  org?: string;
}

export interface OfxStatement {
  transactions: OfxTransaction[];
  currency?: string;
  account?: OfxAccountInfo;
}

function parseOfxDate(raw: string): string {
  // OFX dates: YYYYMMDD or YYYYMMDDHHMMSS or YYYYMMDDHHMMSS.XXX[TZ]
  const y = raw.slice(0, 4);
  const m = raw.slice(4, 6);
  const d = raw.slice(6, 8);
  return `${y}-${m}-${d}`;
}

function extractTag(block: string, tag: string): string | undefined {
  // Handles both SGML-style (<TAG>value) and XML-style (<TAG>value</TAG>)
  const regex = new RegExp(`<${tag}>\\s*([^<\\r\\n]+)`, "i");
  const match = block.match(regex);
  return match ? match[1].trim() : undefined;
}

function extractTransactionBlocks(content: string): string[] {
  const blocks: string[] = [];
  const regex = /<STMTTRN>([\s\S]*?)(?:<\/STMTTRN>|(?=<STMTTRN>)|(?=<\/BANKTRANLIST>))/gi;
  let match;
  while ((match = regex.exec(content)) !== null) {
    blocks.push(match[1]);
  }
  return blocks;
}

function extractAccountInfo(content: string): OfxAccountInfo | undefined {
  const acctFromMatch = content.match(
    /<BANKACCTFROM>([\s\S]*?)(?:<\/BANKACCTFROM>|<BANKTRANLIST>)/i
  );
  if (!acctFromMatch) return undefined;

  const block = acctFromMatch[1];
  const acctId = extractTag(block, "ACCTID");
  if (!acctId) return undefined;

  return {
    acctId,
    bankId: extractTag(block, "BANKID"),
    acctType: extractTag(block, "ACCTTYPE"),
    org: extractTag(content, "ORG"),
  };
}

export function parseOfx(content: string): OfxStatement {
  const currency = extractTag(content, "CURDEF");
  const account = extractAccountInfo(content);

  const blocks = extractTransactionBlocks(content);

  const transactions: OfxTransaction[] = blocks
    .map((block) => {
      const fitId = extractTag(block, "FITID");
      const dtPosted = extractTag(block, "DTPOSTED");
      const trnAmt = extractTag(block, "TRNAMT");
      const name = extractTag(block, "NAME") ?? extractTag(block, "MEMO") ?? "";
      const type = extractTag(block, "TRNTYPE") ?? "OTHER";

      if (!fitId || !dtPosted || !trnAmt) return null;

      return {
        fitId,
        date: parseOfxDate(dtPosted),
        amount: parseFloat(trnAmt),
        name: name.trim(),
        type: type.trim(),
      };
    })
    .filter((t): t is OfxTransaction => t !== null);

  return { transactions, currency, account };
}
