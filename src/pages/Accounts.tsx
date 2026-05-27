import { useState } from "react";
import {
  Button,
  Group,
  Kbd,
  Modal,
  Select,
  Stack,
  Table,
  TextInput,
  Title,
} from "@mantine/core";
import { useAccountStore } from "@/stores/accounts";
import { useCurrencyStore } from "@/stores/currencies";
import { useCrudModal } from "@/hooks/useCrudModal";
import { CrudActions } from "@/components/molecules/CrudActions";
import { ACCOUNT_TYPES } from "@/lib/format";
import type { Account, AccountType } from "@/types";

export function AccountsPage() {
  const { accounts, add, update, remove } = useAccountStore();
  const { currencies } = useCurrencyStore();

  const [name, setName] = useState("");
  const [currencyId, setCurrencyId] = useState<string | null>(null);
  const [type, setType] = useState<AccountType>("checking");

  const crud = useCrudModal<Account>("Account", {
    onOpenNew: () => {
      setName("");
      setCurrencyId(currencies[0]?.id ?? null);
      setType("checking");
    },
    onOpenEdit: (a) => {
      setName(a.name);
      setCurrencyId(a.currencyId);
      setType(a.type);
    },
    onSubmit: () => {
      if (!currencyId) return;
      if (crud.editing) {
        update(crud.editing.id, { name, currencyId, type });
      } else {
        add({ name, currencyId, type, externalIds: [] });
      }
    },
  });

  const currencyMap = Object.fromEntries(currencies.map((c) => [c.id, c]));

  return (
    <Stack>
      <Group justify="space-between">
        <Title order={2}>Accounts</Title>
        <Button onClick={crud.openNew} disabled={currencies.length === 0}>
          Add Account <Kbd size="xs" ml="xs">Alt+N</Kbd>
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
              <Table.Td>{currencyMap[a.currencyId]?.code ?? "Unknown"}</Table.Td>
              <Table.Td>
                <CrudActions
                  onEdit={() => crud.openEdit(a)}
                  onDelete={() => remove(a.id)}
                />
              </Table.Td>
            </Table.Tr>
          ))}
        </Table.Tbody>
      </Table>

      <Modal opened={crud.opened} onClose={crud.close} title={crud.modalTitle}>
        <Stack>
          <TextInput
            label="Name" placeholder="Checking Account" value={name}
            onChange={(e) => setName(e.currentTarget.value)} required
          />
          <Select
            label="Type" data={ACCOUNT_TYPES} value={type}
            onChange={(v) => setType((v as AccountType) ?? "checking")} required
          />
          <Select
            label="Currency"
            data={currencies.map((c) => ({ value: c.id, label: `${c.code} - ${c.name}` }))}
            value={currencyId} onChange={setCurrencyId} required
          />
          <Button onClick={crud.handleSubmit}>
            {crud.submitLabel} <Kbd size="xs" ml="xs">Ctrl+Enter</Kbd>
          </Button>
        </Stack>
      </Modal>
    </Stack>
  );
}
