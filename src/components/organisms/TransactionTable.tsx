import { useState } from "react";
import {
  ActionIcon,
  Button,
  Group,
  Modal,
  NumberInput,
  Stack,
  Table,
  Text,
  TextInput,
  Kbd,
} from "@mantine/core";
import { DatePickerInput } from "@mantine/dates";
import { useTransactionStore } from "@/stores/transactions";
import { useAccountStore } from "@/stores/accounts";
import { useCategoryStore } from "@/stores/categories";
import { useTagStore } from "@/stores/tags";
import { useCurrencyStore } from "@/stores/currencies";
import { formatCurrencyValue } from "@/lib/format";
import { buildCategoryPath } from "@/lib/categories";
import { useTransactionEditor, COLUMNS, type Column } from "@/hooks/useTransactionEditor";
import { CreatableSelect } from "@/components/molecules/CreatableSelect";
import { CreatableMultiSelect } from "@/components/molecules/CreatableMultiSelect";
import { TransactionDisplayRow } from "@/components/molecules/TransactionDisplayRow";
import { EditActions } from "@/components/molecules/EditActions";
import type { LineItem, Transaction } from "@/types";

interface TransactionTableProps {
  accountFilter?: string | null;
}

export function TransactionTable({ accountFilter }: TransactionTableProps) {
  const { transactions } = useTransactionStore();
  const { accounts } = useAccountStore();
  const { categories, add: addCategory } = useCategoryStore();
  const { tags, add: addTag } = useTagStore();
  const { currencies } = useCurrencyStore();

  const editor = useTransactionEditor();

  const [itemsModalOpen, setItemsModalOpen] = useState(false);

  const EMPTY_ITEM: LineItem = { description: "", quantity: 1, unitValue: 0, totalValue: 0 };

  function openItemsModal() {
    setItemsModalOpen(true);
  }

  function updateItem(index: number, patch: Partial<LineItem>) {
    editor.setDraft((d) => ({
      ...d,
      items: d.items.map((item, i) => {
        if (i !== index) return item;
        const updated = { ...item, ...patch };
        if ("quantity" in patch || "unitValue" in patch) {
          updated.totalValue = updated.quantity * updated.unitValue;
        }
        return updated;
      }),
    }));
  }

  function removeItem(index: number) {
    editor.setDraft((d) => ({
      ...d,
      items: d.items.filter((_, i) => i !== index),
    }));
  }

  function addItem() {
    editor.setDraft((d) => ({
      ...d,
      items: [...d.items, { ...EMPTY_ITEM }],
    }));
  }

  // ─── Lookup maps ────────────────────────────────────

  const accountMap = Object.fromEntries(accounts.map((a) => [a.id, a]));
  const currencyMap = Object.fromEntries(currencies.map((c) => [c.id, c]));

  const filteredTransactions = transactions
    .filter((t) => !t.parentTransactionId)
    .filter((t) =>
      accountFilter
        ? t.payerId === accountFilter || t.payeeId === accountFilter
        : true
    )
    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());

  const accountOptions = accounts.map((a) => ({
    value: a.id,
    label: `${a.name} (${currencyMap[accountMap[a.id]?.currencyId]?.code ?? ""})`,
  }));

  const categoryOptions = categories.map((c) => ({
    value: c.id,
    label: buildCategoryPath(c.id, categories),
  }));

  const tagOptions = tags.map((t) => ({ value: t.id, label: t.name }));

  function formatValue(tx: Transaction): string {
    const account = accountMap[tx.payerId];
    if (!account) return String(tx.value);
    const currency = currencyMap[account.currencyId];
    if (!currency) return String(tx.value);
    return formatCurrencyValue(tx.value, currency.symbol, currency.decimalPlaces);
  }

  // ─── Edit cell renderer ─────────────────────────────

  function renderEditCell(col: Column, colIndex: number) {
    const kd = (e: React.KeyboardEvent) => editor.handleCellKeyDown(e, colIndex);
    const ref = (el: HTMLElement | null) => { editor.cellRefs.current[colIndex] = el; };

    switch (col) {
      case "date":
        return (
          <DatePickerInput
            size="xs" variant="unstyled" value={editor.draft.date}
            onChange={(v) => editor.setDraft((d) => ({ ...d, date: v }))}
            onKeyDown={kd} ref={ref}
            popoverProps={{ withinPortal: true }}
            style={{ minWidth: 100 }}
          />
        );
      case "description":
        return (
          <TextInput
            size="xs" variant="unstyled" value={editor.draft.description}
            onChange={(e) => {
              const val = e.currentTarget.value;
              editor.setDraft((d) => ({ ...d, description: val }));
            }}
            onKeyDown={kd} ref={ref}
            placeholder="Description" aria-label="Description"
            style={{ minWidth: 120 }}
          />
        );
      case "value":
        return (
          <NumberInput
            size="xs" variant="unstyled" value={editor.draft.value}
            onChange={(v) => editor.setDraft((d) => ({ ...d, value: Number(v) }))}
            onKeyDown={kd} ref={ref}
            min={0} placeholder="Value" aria-label="Value"
            style={{ minWidth: 80 }}
          />
        );
      case "payer":
        return (
          <CreatableSelect
            data={accountOptions} value={editor.draft.payerId}
            onChange={(v) => editor.setDraft((d) => ({ ...d, payerId: v }))}
            onCreate={(name) => { editor.handleCreateAccount(name, "payer"); return editor.draft.payerId ?? ""; }}
            onKeyDown={kd} inputRef={ref} placeholder="From"
          />
        );
      case "payee":
        return (
          <CreatableSelect
            data={accountOptions} value={editor.draft.payeeId}
            onChange={(v) => editor.setDraft((d) => ({ ...d, payeeId: v }))}
            onCreate={(name) => { editor.handleCreateAccount(name, "payee"); return editor.draft.payeeId ?? ""; }}
            onKeyDown={kd} inputRef={ref} placeholder="To"
          />
        );
      case "category":
        return (
          <CreatableSelect
            data={categoryOptions} value={editor.draft.categoryId}
            onChange={(v) => editor.setDraft((d) => ({ ...d, categoryId: v }))}
            onCreate={(name) => addCategory({ name, parentId: null }).id}
            onKeyDown={kd} inputRef={ref} placeholder="Category"
          />
        );
      case "tags":
        return (
          <CreatableMultiSelect
            data={tagOptions} value={editor.draft.tagIds}
            onChange={(v) => editor.setDraft((d) => ({ ...d, tagIds: v }))}
            onCreate={(name) => addTag(name).id}
            onKeyDown={kd} inputRef={ref} placeholder="Tags"
          />
        );
    }
  }

  // ─── Render ──────────────────────────────────────────

  return (
    <>
      <Table striped highlightOnHover>
        <Table.Thead>
          <Table.Tr>
            <Table.Th>Date</Table.Th>
            <Table.Th>Description</Table.Th>
            <Table.Th>Value</Table.Th>
            <Table.Th>From</Table.Th>
            <Table.Th>To</Table.Th>
            <Table.Th>Category</Table.Th>
            <Table.Th>Tags</Table.Th>
            <Table.Th />
          </Table.Tr>
        </Table.Thead>
        <Table.Tbody>
          {filteredTransactions.map((tx) =>
            editor.editingId === tx.id ? (
              <Table.Tr key={tx.id}>
                {COLUMNS.map((col, ci) => (
                  <Table.Td key={col} style={{ padding: "2px 4px" }}>
                    {renderEditCell(col, ci)}
                  </Table.Td>
                ))}
                <Table.Td>
                  <Group gap={4} wrap="nowrap">
                    <Button
                      size="compact-xs"
                      variant="subtle"
                      onClick={(e) => { e.stopPropagation(); openItemsModal(); }}
                      data-testid="edit-items"
                    >
                      Items{editor.draft.items.length > 0 ? ` (${editor.draft.items.length})` : ""}
                    </Button>
                    <EditActions onSave={editor.commitRow} onCancel={editor.cancelEdit} stopPropagation />
                  </Group>
                </Table.Td>
              </Table.Tr>
            ) : (
              <TransactionDisplayRow
                key={tx.id}
                id={tx.id}
                date={new Date(tx.date).toLocaleDateString()}
                description={tx.description}
                value={formatValue(tx)}
                payer={accountMap[tx.payerId]?.name ?? "?"}
                payee={accountMap[tx.payeeId]?.name ?? "?"}
                category={tx.categoryId ? buildCategoryPath(tx.categoryId, categories) : "—"}
                items={tx.items}
                tags={
                  tx.tagIds
                    .map((id) => tags.find((t) => t.id === id)?.name)
                    .filter(Boolean)
                    .join(", ") || "—"
                }
                onEdit={() => { if (!editor.isEditing) editor.startEditing(tx); }}
                onDelete={() => editor.remove(tx.id)}
              />
            )
          )}

          {editor.editingId === "new" ? (
            <Table.Tr>
              {COLUMNS.map((col, ci) => (
                <Table.Td key={col} style={{ padding: "2px 4px" }}>
                  {renderEditCell(col, ci)}
                </Table.Td>
              ))}
              <Table.Td>
                <Group gap={4} wrap="nowrap">
                  <Button
                    size="compact-xs"
                    variant="subtle"
                    onClick={(e) => { e.stopPropagation(); openItemsModal(); }}
                    data-testid="edit-items"
                  >
                    Items{editor.draft.items.length > 0 ? ` (${editor.draft.items.length})` : ""}
                  </Button>
                  <EditActions onSave={editor.commitRow} onCancel={editor.cancelEdit} />
                </Group>
              </Table.Td>
            </Table.Tr>
          ) : (
            <Table.Tr
              style={{ cursor: "pointer", opacity: 0.5 }}
              onClick={() => { if (!editor.isEditing) editor.startNew(); }}
            >
              <Table.Td colSpan={8}>
                <Text size="sm" c="dimmed">
                  + New transaction <Kbd size="xs">Alt+N</Kbd>
                </Text>
              </Table.Td>
            </Table.Tr>
          )}
        </Table.Tbody>
      </Table>

      <Modal
        opened={itemsModalOpen}
        onClose={() => setItemsModalOpen(false)}
        title="Line Items"
        size="lg"
      >
        <Stack>
          {editor.draft.items.map((item, idx) => (
            <Group key={idx} align="end" gap="xs">
              <TextInput
                label={idx === 0 ? "Description" : undefined}
                placeholder="Product name"
                value={item.description}
                onChange={(e) =>
                  updateItem(idx, { description: e.currentTarget.value })
                }
                style={{ flex: 2 }}
                aria-label="Item description"
              />
              <NumberInput
                label={idx === 0 ? "Qty" : undefined}
                value={item.quantity}
                onChange={(v) => updateItem(idx, { quantity: Number(v) || 1 })}
                min={1}
                style={{ flex: 0.5 }}
                aria-label="Item quantity"
              />
              <NumberInput
                label={idx === 0 ? "Unit value" : undefined}
                value={item.unitValue}
                onChange={(v) => updateItem(idx, { unitValue: Number(v) || 0 })}
                min={0}
                style={{ flex: 1 }}
                aria-label="Item unit value"
              />
              <Text size="sm" fw={500} style={{ flex: 0.7, textAlign: "right" }}>
                = {item.totalValue}
              </Text>
              <ActionIcon
                color="red"
                variant="subtle"
                onClick={() => removeItem(idx)}
                aria-label="Remove item"
              >
                ✕
              </ActionIcon>
            </Group>
          ))}

          <Group justify="space-between">
            <Button variant="light" size="compact-sm" onClick={addItem}>
              + Add item
            </Button>
            <Text fw={600}>
              Total: {editor.draft.items.reduce((s, i) => s + i.totalValue, 0)}
            </Text>
          </Group>

          <Button onClick={() => setItemsModalOpen(false)}>Done</Button>
        </Stack>
      </Modal>
    </>
  );
}
