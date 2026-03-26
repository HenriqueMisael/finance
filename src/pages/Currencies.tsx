import { useState } from "react";
import {
  Button,
  Group,
  Modal,
  NumberInput,
  Stack,
  Table,
  TextInput,
  Title,
  ActionIcon,
} from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import { useCurrencyStore } from "@/stores/currencies";
import type { Currency } from "@/types";

export function CurrenciesPage() {
  const { currencies, add, update, remove } = useCurrencyStore();
  const [opened, { open, close }] = useDisclosure(false);
  const [editing, setEditing] = useState<Currency | null>(null);

  const [code, setCode] = useState("");
  const [name, setName] = useState("");
  const [symbol, setSymbol] = useState("");
  const [decimalPlaces, setDecimalPlaces] = useState<number>(2);

  function openNew() {
    setEditing(null);
    setCode("");
    setName("");
    setSymbol("");
    setDecimalPlaces(2);
    open();
  }

  function openEdit(currency: Currency) {
    setEditing(currency);
    setCode(currency.code);
    setName(currency.name);
    setSymbol(currency.symbol);
    setDecimalPlaces(currency.decimalPlaces);
    open();
  }

  function handleSubmit() {
    const data = { code, name, symbol, decimalPlaces };
    if (editing) {
      update(editing.id, data);
    } else {
      add(data);
    }
    close();
  }

  return (
    <Stack>
      <Group justify="space-between">
        <Title order={2}>Currencies</Title>
        <Button onClick={openNew}>Add Currency</Button>
      </Group>

      <Table striped highlightOnHover>
        <Table.Thead>
          <Table.Tr>
            <Table.Th>Code</Table.Th>
            <Table.Th>Name</Table.Th>
            <Table.Th>Symbol</Table.Th>
            <Table.Th>Decimals</Table.Th>
            <Table.Th />
          </Table.Tr>
        </Table.Thead>
        <Table.Tbody>
          {currencies.map((c) => (
            <Table.Tr key={c.id}>
              <Table.Td>{c.code}</Table.Td>
              <Table.Td>{c.name}</Table.Td>
              <Table.Td>{c.symbol}</Table.Td>
              <Table.Td>{c.decimalPlaces}</Table.Td>
              <Table.Td>
                <Group gap="xs">
                  <ActionIcon variant="subtle" onClick={() => openEdit(c)}>
                    ✏
                  </ActionIcon>
                  <ActionIcon
                    variant="subtle"
                    color="red"
                    onClick={() => remove(c.id)}
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
        title={editing ? "Edit Currency" : "New Currency"}
      >
        <Stack>
          <TextInput
            label="Code"
            placeholder="USD"
            value={code}
            onChange={(e) => setCode(e.currentTarget.value)}
            required
          />
          <TextInput
            label="Name"
            placeholder="Dollar"
            value={name}
            onChange={(e) => setName(e.currentTarget.value)}
            required
          />
          <TextInput
            label="Symbol"
            placeholder="$"
            value={symbol}
            onChange={(e) => setSymbol(e.currentTarget.value)}
            required
          />
          <NumberInput
            label="Decimal Places"
            value={decimalPlaces}
            onChange={(v) => setDecimalPlaces(Number(v))}
            min={0}
            max={18}
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
