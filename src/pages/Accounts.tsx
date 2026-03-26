import { useState } from "react";
import {
  Button,
  Group,
  Modal,
  Select,
  Stack,
  Table,
  TextInput,
  Title,
  ActionIcon,
} from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import { useAccountStore } from "@/stores/accounts";
import { useCurrencyStore } from "@/stores/currencies";
import type { Account, AccountType } from "@/types";

const ACCOUNT_TYPES: { value: AccountType; label: string }[] = [
  { value: "asset", label: "Asset" },
  { value: "liability", label: "Liability" },
  { value: "tracking", label: "Tracking" },
];

export function AccountsPage() {
  const { accounts, add, update, remove } = useAccountStore();
  const { currencies } = useCurrencyStore();
  const [opened, { open, close }] = useDisclosure(false);
  const [editing, setEditing] = useState<Account | null>(null);

  const [name, setName] = useState("");
  const [currencyId, setCurrencyId] = useState<string | null>(null);
  const [type, setType] = useState<AccountType>("asset");

  function openNew() {
    setEditing(null);
    setName("");
    setCurrencyId(currencies[0]?.id ?? null);
    setType("asset");
    open();
  }

  function openEdit(account: Account) {
    setEditing(account);
    setName(account.name);
    setCurrencyId(account.currencyId);
    setType(account.type);
    open();
  }

  function handleSubmit() {
    if (!currencyId) return;
    const data = { name, currencyId, type };
    if (editing) {
      update(editing.id, data);
    } else {
      add(data);
    }
    close();
  }

  const currencyMap = Object.fromEntries(
    currencies.map((c) => [c.id, c])
  );

  return (
    <Stack>
      <Group justify="space-between">
        <Title order={2}>Accounts</Title>
        <Button onClick={openNew} disabled={currencies.length === 0}>
          Add Account
        </Button>
      </Group>

      {currencies.length === 0 && (
        <p>Create a currency first before adding accounts.</p>
      )}

      <Table striped highlightOnHover>
        <Table.Thead>
          <Table.Tr>
            <Table.Th>Name</Table.Th>
            <Table.Th>Type</Table.Th>
            <Table.Th>Currency</Table.Th>
            <Table.Th />
          </Table.Tr>
        </Table.Thead>
        <Table.Tbody>
          {accounts.map((a) => (
            <Table.Tr key={a.id}>
              <Table.Td>{a.name}</Table.Td>
              <Table.Td>{a.type}</Table.Td>
              <Table.Td>
                {currencyMap[a.currencyId]?.code ?? "Unknown"}
              </Table.Td>
              <Table.Td>
                <Group gap="xs">
                  <ActionIcon variant="subtle" onClick={() => openEdit(a)}>
                    ✏
                  </ActionIcon>
                  <ActionIcon
                    variant="subtle"
                    color="red"
                    onClick={() => remove(a.id)}
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
        title={editing ? "Edit Account" : "New Account"}
      >
        <Stack>
          <TextInput
            label="Name"
            placeholder="Checking Account"
            value={name}
            onChange={(e) => setName(e.currentTarget.value)}
            required
          />
          <Select
            label="Type"
            data={ACCOUNT_TYPES}
            value={type}
            onChange={(v) => setType((v as AccountType) ?? "asset")}
            required
          />
          <Select
            label="Currency"
            data={currencies.map((c) => ({ value: c.id, label: `${c.code} - ${c.name}` }))}
            value={currencyId}
            onChange={setCurrencyId}
            required
          />
          <Button onClick={handleSubmit}>
            {editing ? "Save" : "Create"}
          </Button>
        </Stack>
      </Modal>
    </Stack>
  );
}
