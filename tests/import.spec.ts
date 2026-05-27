import { test, expect, type Page } from "@playwright/test";
import { PDFDocument, StandardFonts } from "pdf-lib";
import {
  completeOnboarding,
  navigateToSettings,
  openImportModal,
  uploadFile,
} from "./helpers";

// Clear localStorage before each test
test.beforeEach(async ({ page }) => {
  await page.goto("/");
  await page.evaluate(() => localStorage.clear());
  await page.goto("/");
});

async function mapAccountAndPreview(
  page: Page,
  accountName: string,
  counterpartyName: string,
  accountCount: number = 1
) {
  // Wait for map step
  await expect(
    page.getByText(
      accountCount === 1
        ? "1 account found in statement"
        : `${accountCount} accounts found in statement`
    )
  ).toBeVisible();

  // Map account(s) — for single account, there's one "Map to account" select
  const mapSelects = page.getByRole("textbox", { name: "Map to account" });
  if (accountCount === 1) {
    await mapSelects.click();
    await page.getByRole("option", { name: new RegExp(accountName) }).click();
  }

  // Counterparty
  await page.getByRole("textbox", { name: "Counterparty account" }).click();
  await page
    .getByRole("option", { name: new RegExp(counterpartyName) })
    .click();

  await page.getByRole("button", { name: "Preview" }).click();
}

// ─── Sample Data ─────────────────────────────────────────

const SAMPLE_OFX = `OFXHEADER:100
DATA:OFXSGML
VERSION:102
SECURITY:NONE
ENCODING:USASCII
CHARSET:1252
COMPRESSION:NONE
OLDFILEUID:NONE
NEWFILEUID:NONE

<OFX>
<SIGNONMSGSRSV1>
<SONRS>
<STATUS><CODE>0<SEVERITY>INFO</STATUS>
<DTSERVER>20260301120000
<LANGUAGE>ENG
<FI>
<ORG>TEST BANK</ORG>
<FID>001</FID>
</FI>
</SONRS>
</SIGNONMSGSRSV1>
<BANKMSGSRSV1>
<STMTTRNRS>
<TRNUID>1001
<STATUS><CODE>0<SEVERITY>INFO</STATUS>
<STMTRS>
<CURDEF>BRL
<BANKACCTFROM>
<BANKID>001
<ACCTID>12345-6
<ACCTTYPE>CHECKING
</BANKACCTFROM>
<BANKTRANLIST>
<DTSTART>20260301
<DTEND>20260331
<STMTTRN>
<TRNTYPE>DEBIT
<DTPOSTED>20260305
<TRNAMT>-150.00
<FITID>TXN001
<NAME>SUPERMARKET PURCHASE
</STMTTRN>
<STMTTRN>
<TRNTYPE>CREDIT
<DTPOSTED>20260310
<TRNAMT>3500.00
<FITID>TXN002
<NAME>SALARY DEPOSIT
</STMTTRN>
<STMTTRN>
<TRNTYPE>DEBIT
<DTPOSTED>20260315
<TRNAMT>-45.90
<FITID>TXN003
<NAME>GAS STATION
</STMTTRN>
</BANKTRANLIST>
</STMTRS>
</STMTTRNRS>
</BANKMSGSRSV1>
</OFX>`;

const SAMPLE_CSV = `Data,Valor,Identificador,Descrição
07/03/2025,4.48,CSV-TX001,Transferência de saldo NuInvest
10/03/2025,-632.73,CSV-TX002,Pagamento de boleto efetuado - PJBANK
12/03/2025,-100.00,CSV-TX003,Transferência enviada pelo Pix - JOHN DOE`;

const SAMPLE_CSV_WITH_ACCT = `Data,Valor,Identificador,Descrição
07/03/2025,4.48,CSV-TX001,Transfer received
10/03/2025,-632.73,CSV-TX002,Bill payment`;

async function createSamplePdf(): Promise<Buffer> {
  const pdfDoc = await PDFDocument.create();
  const font = await pdfDoc.embedFont(StandardFonts.Helvetica);
  const page = pdfDoc.addPage([612, 792]);
  const lines = [
    "Extrato de Fundos Periodo: JAN 2026",
    "",
    "Classe: TEST BITCOIN FUND CNPJ: 11.222.333/0001-44",
    "",
    "Administrador BTG CNPJ 59.281.253/0001-23",
    "Codigo do investidor 99999",
    "",
    "Transacoes concluidas Saldo no final do periodo: R$ 12.390,77",
    "",
    "Data Movimentacao Valor bruto IOF IR Valor liquido Qtd. cotas",
    "29/01/2026 Compra por aplicacao R$ 5.000,00 R$ 0,00 R$ 0,00 R$ 5.000,00 846.21598",
    "15/01/2026 Compra por aplicacao R$ 2.000,00 R$ 0,00 R$ 0,00 R$ 2.000,00 338.48639",
  ];
  let y = 750;
  for (const line of lines) {
    page.drawText(line, { x: 50, y, size: 10, font });
    y -= 14;
  }

  // Page 2 — second fund with no transactions
  const page2 = pdfDoc.addPage([612, 792]);
  const lines2 = [
    "Classe: TEST RESERVE FUND CNPJ: 55.666.777/0001-88",
    "",
    "Codigo do investidor 99999",
    "",
    "Transacoes concluidas Saldo no final do periodo: R$ 23.193,89",
    "Sem transacoes concluidas no periodo.",
  ];
  y = 750;
  for (const line of lines2) {
    page2.drawText(line, { x: 50, y, size: 10, font });
    y -= 14;
  }

  const bytes = await pdfDoc.save();
  return Buffer.from(bytes);
}

// ─── OFX Import ─────────────────────────────────────────

test.describe("OFX Import", () => {
  test.beforeEach(async ({ page }) => {
    await completeOnboarding(page);
  });

  test("can import transactions from OFX file", async ({ page }) => {
    await openImportModal(page);
    await uploadFile(
      page,
      "statement.ofx",
      "application/x-ofx",
      Buffer.from(SAMPLE_OFX)
    );

    // Map step — should detect account 12345-6
    await mapAccountAndPreview(page, "Wallet", "Bank");

    // Should show preview with 3 transactions
    await expect(page.getByText("3 transactions found")).toBeVisible();
    await expect(page.getByText("SUPERMARKET PURCHASE")).toBeVisible();
    await expect(page.getByText("SALARY DEPOSIT")).toBeVisible();
    await expect(page.getByText("GAS STATION")).toBeVisible();

    // All should be "New"
    await expect(page.getByText("New").first()).toBeVisible();

    // Import
    await page.getByRole("button", { name: /Import 3/ }).click();

    // Modal should close, transactions should appear in table
    await expect(page.getByRole("heading", { name: "Import Statement" })).not.toBeVisible();
    await expect(
      page.getByRole("cell", { name: "SUPERMARKET PURCHASE" })
    ).toBeVisible();
    await expect(
      page.getByRole("cell", { name: "SALARY DEPOSIT" })
    ).toBeVisible();
  });

  test("detects duplicate transactions on re-import", async ({ page }) => {
    // Import once
    await openImportModal(page);
    await uploadFile(
      page,
      "statement.ofx",
      "application/x-ofx",
      Buffer.from(SAMPLE_OFX)
    );
    await mapAccountAndPreview(page, "Wallet", "Bank");
    await page.getByRole("button", { name: /Import 3/ }).click();
    await expect(
      page.getByRole("cell", { name: "SUPERMARKET PURCHASE" })
    ).toBeVisible();

    // Import same file again
    await openImportModal(page);
    await uploadFile(
      page,
      "statement.ofx",
      "application/x-ofx",
      Buffer.from(SAMPLE_OFX)
    );

    // Should auto-match Wallet (externalId remembered from first import)
    await expect(page.getByText("Auto-matched by previous import")).toBeVisible();

    // Select counterparty and preview
    await page.getByRole("textbox", { name: "Counterparty account" }).click();
    await page.getByRole("option", { name: /Bank/ }).click();
    await page.getByRole("button", { name: "Preview" }).click();

    // Should show preview — all duplicates
    await expect(page.getByText(/transactions found/)).toBeVisible();
    const duplicateBadges = page.getByText("Duplicate", { exact: true });
    await expect(duplicateBadges).toHaveCount(3);

    // Import button should be disabled (0 selected)
    await expect(
      page.getByRole("button", { name: /Import 0/ })
    ).toBeDisabled();
  });

  test("remembers account external ID after import", async ({ page }) => {
    // Import to associate externalId "12345-6" with "Wallet"
    await openImportModal(page);
    await uploadFile(
      page,
      "statement.ofx",
      "application/x-ofx",
      Buffer.from(SAMPLE_OFX)
    );
    await mapAccountAndPreview(page, "Wallet", "Bank");
    await page.getByRole("button", { name: /Import 3/ }).click();

    // Rename "Wallet" to "Main Account" in settings
    await navigateToSettings(page, "Accounts");
    await page.getByRole("row").filter({ hasText: "Wallet" }).getByRole("button").first().click();
    await page.getByLabel("Name").fill("Main Account");
    await page.getByRole("button", { name: /Save|Create/ }).click();

    // Go back to transactions and import same OFX again
    await page.locator("nav").getByText("All Transactions").click();
    await openImportModal(page);
    await uploadFile(
      page,
      "statement.ofx",
      "application/x-ofx",
      Buffer.from(SAMPLE_OFX)
    );

    // Should auto-match "Main Account" (renamed, but externalId persists)
    await expect(page.getByText("Auto-matched by previous import")).toBeVisible();
    // The select should show Main Account
    await expect(
      page.getByRole("textbox", { name: "Map to account" })
    ).toHaveValue("Main Account (BRL)");
  });
});

// ─── CSV Import ─────────────────────────────────────────

test.describe("CSV Import", () => {
  test.beforeEach(async ({ page }) => {
    await completeOnboarding(page);
  });

  test("can import transactions from CSV file", async ({ page }) => {
    await openImportModal(page);
    await uploadFile(
      page,
      "NU_123456_01MAR2025_31MAR2025.csv",
      "text/csv",
      Buffer.from(SAMPLE_CSV)
    );

    await mapAccountAndPreview(page, "Wallet", "Bank");

    // Should show 3 transactions
    await expect(page.getByText("3 transactions found")).toBeVisible();
    await expect(
      page.getByText("Transferência de saldo NuInvest")
    ).toBeVisible();
    await expect(page.getByText("Pagamento de boleto efetuado")).toBeVisible();

    // Import
    await page.getByRole("button", { name: /Import 3/ }).click();
    await expect(page.getByRole("heading", { name: "Import Statement" })).not.toBeVisible();

    // Verify transactions appear in table
    await expect(
      page.getByRole("cell", { name: /NuInvest/ })
    ).toBeVisible();
  });

  test("CSV import detects duplicates", async ({ page }) => {
    // First import
    await openImportModal(page);
    await uploadFile(
      page,
      "NU_123456_01MAR2025_31MAR2025.csv",
      "text/csv",
      Buffer.from(SAMPLE_CSV)
    );
    await mapAccountAndPreview(page, "Wallet", "Bank");
    await page.getByRole("button", { name: /Import 3/ }).click();

    // Re-import
    await openImportModal(page);
    await uploadFile(
      page,
      "NU_123456_01MAR2025_31MAR2025.csv",
      "text/csv",
      Buffer.from(SAMPLE_CSV)
    );

    // Auto-matched
    await page.getByRole("textbox", { name: "Counterparty account" }).click();
    await page.getByRole("option", { name: /Bank/ }).click();
    await page.getByRole("button", { name: "Preview" }).click();

    const duplicateBadges = page.getByText("Duplicate", { exact: true });
    await expect(duplicateBadges).toHaveCount(3);
  });

  test("CSV account ID from filename is remembered", async ({ page }) => {
    // Import CSV with account ID in filename (12345-6 from NU_123456_...)
    await openImportModal(page);
    await uploadFile(
      page,
      "NU_123456_01MAR2025_31MAR2025.csv",
      "text/csv",
      Buffer.from(SAMPLE_CSV_WITH_ACCT)
    );
    await mapAccountAndPreview(page, "Wallet", "Bank");
    await page.getByRole("button", { name: /Import 2/ }).click();

    // Second import with same account ID should auto-match
    await openImportModal(page);
    await uploadFile(
      page,
      "NU_123456_01APR2025_30APR2025.csv",
      "text/csv",
      Buffer.from(SAMPLE_CSV_WITH_ACCT)
    );
    await expect(page.getByText("Auto-matched by previous import")).toBeVisible();
  });
});

// ─── PDF Import ─────────────────────────────────────────

test.describe("PDF Import", () => {
  test.beforeEach(async ({ page }) => {
    await completeOnboarding(page);
  });

  test("can import transactions from PDF fund statement", async ({ page }) => {
    const pdfBuffer = await createSamplePdf();

    // Need an investment account — create one
    await navigateToSettings(page, "Accounts");
    await page.getByRole("button", { name: /Add Account|Alt/ }).click();
    await page.getByLabel("Name").fill("Bitcoin Fund");
    // Change type to Investment
    await page.getByRole("textbox", { name: "Type" }).click();
    await page.getByRole("option", { name: "Investment" }).click();
    await page.getByRole("button", { name: /Create/ }).click();
    await expect(
      page.getByRole("cell", { name: "Bitcoin Fund" })
    ).toBeVisible();

    // Navigate to transactions
    await page.locator("nav").getByText("All Transactions").click();

    await openImportModal(page);
    await uploadFile(page, "statement.pdf", "application/pdf", pdfBuffer);

    // Should find 2 accounts (funds) in the PDF
    await expect(
      page.getByText("2 accounts found in statement")
    ).toBeVisible();

    // Map first fund (TEST BITCOIN FUND) to Bitcoin Fund account
    const mapSelects = page.getByRole("textbox", { name: "Map to account" });
    await mapSelects.first().click();
    await page
      .getByRole("option", { name: /Bitcoin Fund/ })
      .click();

    // Second fund has no transactions, so we can leave it unmapped
    // Select counterparty
    await page.getByRole("textbox", { name: "Counterparty account" }).click();
    await page.getByRole("option", { name: /Wallet/ }).click();

    await page.getByRole("button", { name: "Preview" }).click();

    // Should show 2 transactions from the first fund
    await expect(page.getByText("2 transactions found")).toBeVisible();
    await expect(page.getByText("Compra por aplicacao").first()).toBeVisible();

    // Import
    await page.getByRole("button", { name: /Import 2/ }).click();
    await expect(page.getByRole("heading", { name: "Import Statement" })).not.toBeVisible();

    // Verify transactions appear
    await expect(
      page.getByRole("cell", { name: /Compra por aplicacao/ }).first()
    ).toBeVisible();
  });

  test("PDF fund CNPJ is remembered for future imports", async ({ page }) => {
    const pdfBuffer = await createSamplePdf();

    // Create investment account
    await navigateToSettings(page, "Accounts");
    await page.getByRole("button", { name: /Add Account|Alt/ }).click();
    await page.getByLabel("Name").fill("BTC Fund");
    await page.getByRole("textbox", { name: "Type" }).click();
    await page.getByRole("option", { name: "Investment" }).click();
    await page.getByRole("button", { name: /Create/ }).click();

    await page.locator("nav").getByText("All Transactions").click();

    // First import — map manually
    await openImportModal(page);
    await uploadFile(page, "statement.pdf", "application/pdf", pdfBuffer);

    const mapSelects = page.getByRole("textbox", { name: "Map to account" });
    await mapSelects.first().click();
    await page.getByRole("option", { name: /BTC Fund/ }).click();
    await page.getByRole("textbox", { name: "Counterparty account" }).click();
    await page.getByRole("option", { name: /Wallet/ }).click();
    await page.getByRole("button", { name: "Preview" }).click();
    await page.getByRole("button", { name: /Import 2/ }).click();

    // Rename account
    await navigateToSettings(page, "Accounts");
    await page
      .getByRole("row")
      .filter({ hasText: "BTC Fund" })
      .getByRole("button")
      .first()
      .click();
    await page.getByLabel("Name").fill("My Bitcoin Fund");
    await page.getByRole("button", { name: /Save|Create/ }).click();

    // Second import — should auto-match by CNPJ
    await page.locator("nav").getByText("All Transactions").click();
    await openImportModal(page);
    await uploadFile(page, "statement.pdf", "application/pdf", pdfBuffer);

    // First fund should be auto-matched to "My Bitcoin Fund"
    await expect(page.getByText("Auto-matched by previous import")).toBeVisible();
  });
});

// ─── Description Mapping ────────────────────────────────

test.describe("Description Mapping", () => {
  test.beforeEach(async ({ page }) => {
    await completeOnboarding(page);
  });

  test("rename prompt appears when editing a transaction description", async ({
    page,
  }) => {
    // Create a transaction
    await page.getByText("+ New transaction").click();
    await page.getByPlaceholder("Description").fill("Original Name");
    await page.getByLabel("Value").fill("1000");
    await page.keyboard.press("Control+Enter");
    await expect(
      page.getByRole("cell", { name: "Original Name" })
    ).toBeVisible();

    // Edit it
    await page.getByRole("row").filter({ hasText: "Original Name" }).click();
    await page.getByPlaceholder("Description").fill("New Name");
    await page.keyboard.press("Control+Enter");

    // Rename prompt should appear
    await expect(
      page.getByText("Remember this renaming?")
    ).toBeVisible();
    const dialog = page.getByLabel("Remember this renaming?");
    await expect(dialog.getByText("Original Name")).toBeVisible();
    await expect(dialog.getByText("New Name")).toBeVisible();

    // Accept
    await page.getByRole("button", { name: "Yes, remember" }).click();
    await expect(
      page.getByText("Remember this renaming?")
    ).not.toBeVisible();

    // Verify mapping was saved in settings
    await navigateToSettings(page, "Description Mappings");
    await expect(
      page.getByRole("cell", { name: "Original Name" })
    ).toBeVisible();
    await expect(
      page.getByRole("cell", { name: "New Name" })
    ).toBeVisible();
  });

  test("can decline rename prompt", async ({ page }) => {
    await page.getByText("+ New transaction").click();
    await page.getByPlaceholder("Description").fill("Some Tx");
    await page.getByLabel("Value").fill("500");
    await page.keyboard.press("Control+Enter");

    await page.getByRole("row").filter({ hasText: "Some Tx" }).click();
    await page.getByPlaceholder("Description").fill("Renamed Tx");
    await page.keyboard.press("Control+Enter");

    await expect(
      page.getByText("Remember this renaming?")
    ).toBeVisible();
    await page.getByRole("button", { name: "No" }).click();

    // No mapping should be saved
    await navigateToSettings(page, "Description Mappings");
    await expect(
      page.getByRole("cell", { name: "Some Tx" })
    ).not.toBeVisible();
  });

  test("mappings are applied during OFX import", async ({ page }) => {
    // Create a mapping first
    await navigateToSettings(page, "Description Mappings");
    await page.getByRole("button", { name: /Add Mapping/ }).click();
    await page.getByLabel("Original description").fill("SUPERMARKET PURCHASE");
    await page.getByLabel("Display as").fill("Groceries");
    await page.getByRole("button", { name: "Create" }).click();
    await expect(
      page.getByRole("cell", { name: "Groceries" })
    ).toBeVisible();

    // Navigate back to transactions
    await page.locator("nav").getByText("All Transactions").click();

    // Import OFX
    await openImportModal(page);
    await uploadFile(
      page,
      "statement.ofx",
      "application/x-ofx",
      Buffer.from(SAMPLE_OFX)
    );
    await mapAccountAndPreview(page, "Wallet", "Bank");

    // Preview should show mapped name with "Renamed" badge
    await expect(page.getByText("Groceries").first()).toBeVisible();
    await expect(page.getByText("Renamed")).toBeVisible();
    // Original should be shown struck through
    await expect(page.getByText("SUPERMARKET PURCHASE")).toBeVisible();

    // Import
    await page.getByRole("button", { name: /Import 3/ }).click();

    // The imported transaction should use the mapped name
    await expect(
      page.getByRole("cell", { name: "Groceries" })
    ).toBeVisible();
  });
});

// ─── Description Mappings CRUD ──────────────────────────

test.describe("Description Mappings Settings", () => {
  test.beforeEach(async ({ page }) => {
    await completeOnboarding(page);
  });

  test("can navigate to description mappings page", async ({ page }) => {
    await navigateToSettings(page, "Description Mappings");
    await expect(
      page.getByRole("heading", { name: "Description Mappings" })
    ).toBeVisible();
  });

  test("can create and delete a mapping", async ({ page }) => {
    await navigateToSettings(page, "Description Mappings");
    await page.getByRole("button", { name: /Add Mapping/ }).click();
    await page.getByLabel("Original description").fill("POS STORE ABC");
    await page.getByLabel("Display as").fill("Store ABC");
    await page.getByRole("button", { name: "Create" }).click();

    await expect(
      page.getByRole("cell", { name: "POS STORE ABC" })
    ).toBeVisible();
    await expect(
      page.getByRole("cell", { name: "Store ABC", exact: true })
    ).toBeVisible();

    // Delete
    const row = page.getByRole("row").filter({ hasText: "POS STORE ABC" });
    await row.getByRole("button", { name: "✕" }).click();
    await expect(
      page.getByRole("cell", { name: "POS STORE ABC" })
    ).not.toBeVisible();
  });
});
