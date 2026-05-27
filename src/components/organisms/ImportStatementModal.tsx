import { useRef, useState } from "react";
import {
  Modal,
  Stack,
  Button,
  Select,
  Table,
  Text,
  Group,
  Checkbox,
  Badge,
  ScrollArea,
  Alert,
} from "@mantine/core";
import {
  parseStatement,
  detectFormat,
  type ParsedStatement,
  type ParsedStatementAccount,
  type ParsedTransaction,
} from "@/lib/statement-parser";
import { useTransactionStore } from "@/stores/transactions";
import { useAccountStore } from "@/stores/accounts";
import { useCurrencyStore } from "@/stores/currencies";
import { useDescriptionMappingStore } from "@/stores/descriptionMappings";
import { toSmallestUnit } from "@/lib/format";
import { ImportPreviewRow } from "@/components/molecules/ImportPreviewRow";

interface ImportStatementModalProps {
  opened: boolean;
  onClose: () => void;
  preselectedAccountId?: string | null;
}

interface AccountMapping {
  parsedAccount: ParsedStatementAccount;
  appAccountId: string | null;
}

interface ImportRow {
  accountIndex: number;
  tx: ParsedTransaction;
  mappedName: string | null;
  isDuplicate: boolean;
  selected: boolean;
}

export function ImportStatementModal({
  opened,
  onClose,
  preselectedAccountId,
}: ImportStatementModalProps) {
  const { bulkAdd, getByFitId } = useTransactionStore();
  const { accounts, findByExternalId, addExternalId } = useAccountStore();
  const { currencies } = useCurrencyStore();
  const { findMapping } = useDescriptionMappingStore();

  const fileRef = useRef<HTMLInputElement>(null);
  const [step, setStep] = useState<"upload" | "map" | "preview">("upload");
  const [statement, setStatement] = useState<ParsedStatement | null>(null);
  const [accountMappings, setAccountMappings] = useState<AccountMapping[]>([]);
  const [counterpartyId, setCounterpartyId] = useState<string | null>(null);
  const [rows, setRows] = useState<ImportRow[]>([]);
  const [error, setError] = useState<string | null>(null);

  const currencyMap = Object.fromEntries(currencies.map((c) => [c.id, c]));
  const accountOptions = accounts.map((a) => ({
    value: a.id,
    label: `${a.name} (${currencyMap[a.currencyId]?.code ?? "?"})`,
  }));

  function reset() {
    setStep("upload");
    setStatement(null);
    setAccountMappings([]);
    setCounterpartyId(null);
    setRows([]);
    setError(null);
    if (fileRef.current) fileRef.current.value = "";
  }

  function handleClose() {
    reset();
    onClose();
  }

  async function handleFileSelect(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (!file) return;
    setError(null);

    try {
      const format = detectFormat(file.name);
      if (!format) {
        setError("Unsupported file format. Use .ofx, .csv, or .pdf files.");
        return;
      }

      let content: string | ArrayBuffer;
      if (format === "pdf") {
        content = await file.arrayBuffer();
      } else {
        content = await file.text();
      }

      const parsed = await parseStatement(content, file.name);
      setStatement(parsed);

      const mappings: AccountMapping[] = parsed.accounts.map((pa) => {
        const matched = pa.externalId
          ? findByExternalId(pa.externalId)
          : undefined;
        return {
          parsedAccount: pa,
          appAccountId: matched?.id ?? preselectedAccountId ?? null,
        };
      });

      setAccountMappings(mappings);
      setStep("map");
    } catch (err) {
      setError(
        `Failed to parse file: ${err instanceof Error ? err.message : String(err)}`
      );
    }
  }

  function allAccountsMapped(): boolean {
    return accountMappings.every(
      (m) => m.appAccountId !== null || m.parsedAccount.transactions.length === 0
    );
  }

  function proceedToPreview() {
    const importRows: ImportRow[] = [];

    accountMappings.forEach((mapping, accountIndex) => {
      if (!mapping.appAccountId || mapping.parsedAccount.transactions.length === 0) return;

      mapping.parsedAccount.transactions.forEach((tx) => {
        const duplicate = !!getByFitId(tx.fitId, mapping.appAccountId!);
        const mappedName = findMapping(tx.description) ?? null;

        importRows.push({
          accountIndex,
          tx,
          mappedName,
          isDuplicate: duplicate,
          selected: !duplicate,
        });
      });
    });

    setRows(importRows);
    setStep("preview");
  }

  function toggleRow(index: number) {
    setRows((prev) =>
      prev.map((r, i) => (i === index ? { ...r, selected: !r.selected } : r))
    );
  }

  function toggleAll(checked: boolean) {
    setRows((prev) =>
      prev.map((r) => (r.isDuplicate ? r : { ...r, selected: checked }))
    );
  }

  function handleImport() {
    if (!counterpartyId) return;

    const toImport: Omit<import("@/types").Transaction, "id">[] = [];

    rows
      .filter((r) => r.selected)
      .forEach((r) => {
        const mapping = accountMappings[r.accountIndex];
        if (!mapping?.appAccountId) return;

        const account = accounts.find((a) => a.id === mapping.appAccountId);
        if (!account) return;
        const currency = currencies.find((c) => c.id === account.currencyId);
        const decimalPlaces = currency?.decimalPlaces ?? 2;

        const absAmount = Math.abs(r.tx.amount);
        const value = toSmallestUnit(absAmount, decimalPlaces);
        const isDebit = r.tx.amount < 0;
        const description = r.mappedName ?? r.tx.description;

        toImport.push({
          description,
          date: new Date(r.tx.date + "T12:00:00").toISOString(),
          value,
          categoryId: null,
          tagIds: [],
          payerId: isDebit ? mapping.appAccountId! : counterpartyId!,
          payeeId: isDebit ? counterpartyId! : mapping.appAccountId!,
          parentTransactionId: null,
          items: [],
          fitId: r.tx.fitId,
        });
      });

    bulkAdd(toImport);

    accountMappings.forEach((mapping) => {
      if (mapping.appAccountId && mapping.parsedAccount.externalId) {
        addExternalId(mapping.appAccountId, mapping.parsedAccount.externalId);
      }
    });

    handleClose();
  }

  const selectedCount = rows.filter((r) => r.selected).length;
  const dupCount = rows.filter((r) => r.isDuplicate).length;

  const mappedAccountIds = new Set(
    accountMappings.map((m) => m.appAccountId).filter(Boolean)
  );
  const counterpartyOptions = accountOptions.filter(
    (a) => !mappedAccountIds.has(a.value)
  );
  const showAccountColumn = accountMappings.length > 1;

  return (
    <Modal
      opened={opened}
      onClose={handleClose}
      title="Import Statement"
      size="xl"
    >
      {step === "upload" && (
        <Stack>
          <Text size="sm" c="dimmed">
            Select a bank statement file (.ofx, .csv) or investment fund
            statement (.pdf) to import.
          </Text>
          <input
            ref={fileRef}
            type="file"
            accept=".ofx,.OFX,.csv,.CSV,.pdf,.PDF"
            onChange={handleFileSelect}
          />
          {error && (
            <Alert color="red" title="Error">
              {error}
            </Alert>
          )}
        </Stack>
      )}

      {step === "map" && statement && (
        <Stack>
          <Text size="sm" fw={600}>
            {statement.accounts.length === 1
              ? "1 account found in statement"
              : `${statement.accounts.length} accounts found in statement`}
          </Text>

          {accountMappings.map((mapping, i) => (
            <Stack key={i} gap="xs">
              <Group gap="xs">
                <Badge variant="light" size="sm">
                  {statement.format.toUpperCase()}
                </Badge>
                <Text size="sm" fw={500}>
                  {mapping.parsedAccount.label}
                </Text>
                {mapping.parsedAccount.externalId && (
                  <Text size="xs" c="dimmed">
                    ({mapping.parsedAccount.externalId})
                  </Text>
                )}
                <Text size="xs" c="dimmed">
                  — {mapping.parsedAccount.transactions.length} transaction
                  {mapping.parsedAccount.transactions.length !== 1 ? "s" : ""}
                </Text>
              </Group>
              <Select
                label="Map to account"
                description={
                  mapping.appAccountId &&
                  findByExternalId(mapping.parsedAccount.externalId)
                    ? "Auto-matched by previous import"
                    : undefined
                }
                data={accountOptions}
                value={mapping.appAccountId}
                onChange={(v) =>
                  setAccountMappings((prev) =>
                    prev.map((m, j) =>
                      j === i ? { ...m, appAccountId: v } : m
                    )
                  )
                }
                required={mapping.parsedAccount.transactions.length > 0}
              />
            </Stack>
          ))}

          <Select
            label="Counterparty account"
            description="Default account for the other side of each transaction"
            data={counterpartyOptions}
            value={counterpartyId}
            onChange={setCounterpartyId}
            required
          />

          <Group justify="space-between">
            <Button variant="subtle" size="compact-sm" onClick={reset}>
              Back
            </Button>
            <Button
              onClick={proceedToPreview}
              disabled={!allAccountsMapped() || !counterpartyId}
            >
              Preview
            </Button>
          </Group>
        </Stack>
      )}

      {step === "preview" && (
        <Stack>
          <Group justify="space-between">
            <Text size="sm">
              {rows.length} transactions found
              {dupCount > 0 && ` (${dupCount} duplicates)`}
            </Text>
            <Button
              variant="subtle"
              size="compact-sm"
              onClick={() => setStep("map")}
            >
              Back
            </Button>
          </Group>

          <ScrollArea.Autosize mah={400}>
            <Table striped highlightOnHover>
              <Table.Thead>
                <Table.Tr>
                  <Table.Th>
                    <Checkbox
                      checked={
                        selectedCount > 0 &&
                        selectedCount === rows.length - dupCount
                      }
                      indeterminate={
                        selectedCount > 0 &&
                        selectedCount < rows.length - dupCount
                      }
                      onChange={(e) => toggleAll(e.currentTarget.checked)}
                    />
                  </Table.Th>
                  <Table.Th>Date</Table.Th>
                  <Table.Th>Description</Table.Th>
                  <Table.Th>Amount</Table.Th>
                  {showAccountColumn && <Table.Th>Account</Table.Th>}
                  <Table.Th>Status</Table.Th>
                </Table.Tr>
              </Table.Thead>
              <Table.Tbody>
                {rows.map((row, i) => (
                  <ImportPreviewRow
                    key={row.tx.fitId}
                    fitId={row.tx.fitId}
                    date={row.tx.date}
                    description={row.tx.description}
                    mappedName={row.mappedName}
                    amount={row.tx.amount}
                    isDuplicate={row.isDuplicate}
                    selected={row.selected}
                    accountLabel={
                      showAccountColumn
                        ? accountMappings[row.accountIndex]?.parsedAccount.label
                        : undefined
                    }
                    onToggle={() => toggleRow(i)}
                  />
                ))}
              </Table.Tbody>
            </Table>
          </ScrollArea.Autosize>

          <Button
            onClick={handleImport}
            disabled={selectedCount === 0 || !counterpartyId}
          >
            Import {selectedCount} transaction
            {selectedCount !== 1 ? "s" : ""}
          </Button>
        </Stack>
      )}
    </Modal>
  );
}
