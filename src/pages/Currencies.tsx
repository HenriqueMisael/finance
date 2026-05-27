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
  Kbd,
} from "@mantine/core";
import { useCurrencyStore } from "@/stores/currencies";
import { useCrudModal } from "@/hooks/useCrudModal";
import { CrudActions } from "@/components/molecules/CrudActions";
import type { Currency } from "@/types";

export function CurrenciesPage() {
  const { currencies, add, update, remove } = useCurrencyStore();
  const [code, setCode] = useState("");
  const [name, setName] = useState("");
  const [symbol, setSymbol] = useState("");
  const [decimalPlaces, setDecimalPlaces] = useState<number>(2);

  const crud = useCrudModal<Currency>("Currency", {
    onOpenNew: () => {
      setCode("");
      setName("");
      setSymbol("");
      setDecimalPlaces(2);
    },
    onOpenEdit: (c) => {
      setCode(c.code);
      setName(c.name);
      setSymbol(c.symbol);
      setDecimalPlaces(c.decimalPlaces);
    },
    onSubmit: () => {
      const data = { code, name, symbol, decimalPlaces };
      if (crud.editing) {
        update(crud.editing.id, data);
      } else {
        add(data);
      }
    },
  });

  return (
    <Stack>
      <Group justify="space-between">
        <Title order={2}>Currencies</Title>
        <Button onClick={crud.openNew}>
          Add Currency <Kbd size="xs" ml="xs">Alt+N</Kbd>
        </Button>
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
                <CrudActions
                  onEdit={() => crud.openEdit(c)}
                  onDelete={() => remove(c.id)}
                />
              </Table.Td>
            </Table.Tr>
          ))}
        </Table.Tbody>
      </Table>

      <Modal opened={crud.opened} onClose={crud.close} title={crud.modalTitle}>
        <Stack>
          <TextInput
            label="Code" placeholder="USD" value={code}
            onChange={(e) => setCode(e.currentTarget.value)} required
          />
          <TextInput
            label="Name" placeholder="Dollar" value={name}
            onChange={(e) => setName(e.currentTarget.value)} required
          />
          <TextInput
            label="Symbol" placeholder="$" value={symbol}
            onChange={(e) => setSymbol(e.currentTarget.value)} required
          />
          <NumberInput
            label="Decimal Places" value={decimalPlaces}
            onChange={(v) => setDecimalPlaces(Number(v))}
            min={0} max={18} required
          />
          <Button onClick={crud.handleSubmit}>
            {crud.submitLabel} <Kbd size="xs" ml="xs">Ctrl+Enter</Kbd>
          </Button>
        </Stack>
      </Modal>
    </Stack>
  );
}
