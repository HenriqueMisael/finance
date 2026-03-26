import { useState } from "react";
import {
  Button,
  Group,
  Modal,
  MultiSelect,
  NumberInput,
  Select,
  Stack,
  Table,
  TextInput,
  Title,
  ActionIcon,
  Text,
} from "@mantine/core";
import { DatePickerInput } from "@mantine/dates";
import { useDisclosure } from "@mantine/hooks";
import { useTransactionStore } from "@/stores/transactions";
import { useAccountStore } from "@/stores/accounts";
import { useCategoryStore } from "@/stores/categories";
import { useTagStore } from "@/stores/tags";
import { useCurrencyStore } from "@/stores/currencies";
import type { Transaction } from "@/types";

export function TransactionsPage() {
  const { transactions, add, update, remove } = useTransactionStore();
  const { accounts } = useAccountStore();
  const { categories } = useCategoryStore();
  const { tags } = useTagStore();
  const { currencies } = useCurrencyStore();
  const [opened, { open, close }] = useDisclosure(false);
  const [editing, setEditing] = useState<Transaction | null>(null);

  const [description, setDescription] = useState("");
  const [date, setDate] = useState<Date | null>(new Date());
  const [value, setValue] = useState<number>(0);
  const [categoryId, setCategoryId] = useState<string | null>(null);
  const [tagIds, setTagIds] = useState<string[]>([]);
  const [payerId, setPayerId] = useState<string | null>(null);
  const [payeeId, setPayeeId] = useState<string | null>(null);

  function openNew() {
    setEditing(null);
    setDescription("");
    setDate(new Date());
    setValue(0);
    setCategoryId(null);
    setTagIds([]);
    setPayerId(accounts[0]?.id ?? null);
    setPayeeId(accounts[1]?.id ?? accounts[0]?.id ?? null);
    open();
  }

  function openEdit(tx: Transaction) {
    setEditing(tx);
    setDescription(tx.description);
    setDate(new Date(tx.date));
    setValue(tx.value);
    setCategoryId(tx.categoryId);
    setTagIds(tx.tagIds);
    setPayerId(tx.payerId);
    setPayeeId(tx.payeeId);
    open();
  }

  function handleSubmit() {
    if (!payerId || !payeeId || !date) return;
    const data = {
      description,
      date: date.toISOString(),
      value,
      categoryId,
      tagIds,
      payerId,
      payeeId,
      parentTransactionId: null,
    };
    if (editing) {
      update(editing.id, data);
    } else {
      add(data);
    }
    close();
  }

  const accountMap = Object.fromEntries(accounts.map((a) => [a.id, a]));
  const categoryMap = Object.fromEntries(categories.map((c) => [c.id, c]));
  const currencyMap = Object.fromEntries(currencies.map((c) => [c.id, c]));

  function formatValue(tx: Transaction): string {
    const account = accountMap[tx.payerId];
    if (!account) return String(tx.value);
    const currency = currencyMap[account.currencyId];
    if (!currency) return String(tx.value);
    const amount = tx.value / Math.pow(10, currency.decimalPlaces);
    return `${currency.symbol} ${amount.toFixed(currency.decimalPlaces)}`;
  }

  function buildCategoryPath(id: string): string {
    const parts: string[] = [];
    let current: typeof categoryMap[string] | undefined = categoryMap[id];
    while (current) {
      parts.unshift(current.name);
      current = current.parentId ? categoryMap[current.parentId] : undefined;
    }
    return parts.join(" → ");
  }

  const sortedTransactions = [...transactions]
    .filter((t) => !t.parentTransactionId)
    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());

  const accountOptions = accounts.map((a) => ({
    value: a.id,
    label: `${a.name} (${currencyMap[accountMap[a.id]?.currencyId]?.code ?? ""})`,
  }));

  return (
    <Stack>
      <Group justify="space-between">
        <Title order={2}>Transactions</Title>
        <Button onClick={openNew} disabled={accounts.length < 2}>
          Add Transaction
        </Button>
      </Group>

      {accounts.length < 2 && (
        <Text c="dimmed">
          You need at least 2 accounts to create transactions.
        </Text>
      )}

      <Table striped highlightOnHover>
        <Table.Thead>
          <Table.Tr>
            <Table.Th>Date</Table.Th>
            <Table.Th>Description</Table.Th>
            <Table.Th>Value</Table.Th>
            <Table.Th>From</Table.Th>
            <Table.Th>To</Table.Th>
            <Table.Th>Category</Table.Th>
            <Table.Th />
          </Table.Tr>
        </Table.Thead>
        <Table.Tbody>
          {sortedTransactions.map((tx) => (
            <Table.Tr key={tx.id}>
              <Table.Td>
                {new Date(tx.date).toLocaleDateString()}
              </Table.Td>
              <Table.Td>{tx.description}</Table.Td>
              <Table.Td>{formatValue(tx)}</Table.Td>
              <Table.Td>{accountMap[tx.payerId]?.name ?? "?"}</Table.Td>
              <Table.Td>{accountMap[tx.payeeId]?.name ?? "?"}</Table.Td>
              <Table.Td>
                {tx.categoryId ? buildCategoryPath(tx.categoryId) : "—"}
              </Table.Td>
              <Table.Td>
                <Group gap="xs">
                  <ActionIcon variant="subtle" onClick={() => openEdit(tx)}>
                    ✏
                  </ActionIcon>
                  <ActionIcon
                    variant="subtle"
                    color="red"
                    onClick={() => remove(tx.id)}
                  >
                    ✕
                  </ActionIcon>
                </Group>
              </Table.Td>
            </Table.Tr>
          ))}
        </Table.Tbody>
      </Table>

      <Modal
        opened={opened}
        onClose={close}
        title={editing ? "Edit Transaction" : "New Transaction"}
        size="lg"
      >
        <Stack>
          <TextInput
            label="Description"
            placeholder="Groceries"
            value={description}
            onChange={(e) => setDescription(e.currentTarget.value)}
            required
          />
          <DatePickerInput
            label="Date"
            value={date}
            onChange={setDate}
            required
          />
          <NumberInput
            label="Value (smallest unit)"
            description="e.g. 1050 = $10.50 for a 2-decimal currency"
            value={value}
            onChange={(v) => setValue(Number(v))}
            min={0}
            required
          />
          <Select
            label="From (Payer)"
            data={accountOptions}
            value={payerId}
            onChange={setPayerId}
            required
          />
          <Select
            label="To (Payee)"
            data={accountOptions}
            value={payeeId}
            onChange={setPayeeId}
            required
          />
          <Select
            label="Category"
            placeholder="None"
            data={categories.map((c) => ({
              value: c.id,
              label: buildCategoryPath(c.id),
            }))}
            value={categoryId}
            onChange={setCategoryId}
            clearable
          />
          <MultiSelect
            label="Tags"
            data={tags.map((t) => ({ value: t.id, label: t.name }))}
            value={tagIds}
            onChange={setTagIds}
          />
          <Button onClick={handleSubmit}>
            {editing ? "Save" : "Create"}
          </Button>
        </Stack>
      </Modal>
    </Stack>
  );
}
