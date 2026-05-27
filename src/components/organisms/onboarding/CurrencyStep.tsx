import { useState } from "react";
import {
  Button,
  Group,
  NumberInput,
  ScrollArea,
  Stack,
  Table,
  Text,
  TextInput,
} from "@mantine/core";
import { useCurrencyStore } from "@/stores/currencies";
import { useShortcuts } from "@/hooks/useShortcuts";

const COMMON_CURRENCIES = [
  { code: "BRL", name: "Real", symbol: "R$", decimalPlaces: 2 },
  { code: "USD", name: "Dollar", symbol: "$", decimalPlaces: 2 },
  { code: "EUR", name: "Euro", symbol: "€", decimalPlaces: 2 },
  { code: "GBP", name: "Pound", symbol: "£", decimalPlaces: 2 },
  { code: "BTC", name: "Bitcoin", symbol: "₿", decimalPlaces: 8 },
  { code: "JPY", name: "Yen", symbol: "¥", decimalPlaces: 0 },
];

export function CurrencyStep() {
  const { currencies, add: addCurrency } = useCurrencyStore();

  const [customCode, setCustomCode] = useState("");
  const [customName, setCustomName] = useState("");
  const [customSymbol, setCustomSymbol] = useState("");
  const [customDecimals, setCustomDecimals] = useState<number>(2);

  function handleAddCommonCurrency(
    preset: (typeof COMMON_CURRENCIES)[number]
  ) {
    if (currencies.some((c) => c.code === preset.code)) return;
    addCurrency(preset);
  }

  function handleAddCustomCurrency() {
    if (!customCode || !customName || !customSymbol) return;
    addCurrency({
      code: customCode,
      name: customName,
      symbol: customSymbol,
      decimalPlaces: customDecimals,
    });
    setCustomCode("");
    setCustomName("");
    setCustomSymbol("");
    setCustomDecimals(2);
  }

  useShortcuts(
    COMMON_CURRENCIES.map((preset, idx) => ({
      key: String(idx + 1),
      action: () => handleAddCommonCurrency(preset),
    }))
  );

  return (
    <Stack mt="md" style={{ minHeight: 0 }}>
      <Text>Pick from common currencies or add your own.</Text>

      <Group>
        {COMMON_CURRENCIES.map((preset, idx) => {
          const added = currencies.some((c) => c.code === preset.code);
          return (
            <Button
              key={preset.code}
              variant={added ? "filled" : "outline"}
              onClick={() => handleAddCommonCurrency(preset)}
              disabled={added}
              size="sm"
            >
              <Text size="xs" c="dimmed" mr={4}>{idx + 1}</Text>
              {preset.symbol} {preset.code}
            </Button>
          );
        })}
      </Group>

      <Text size="sm" c="dimmed" mt="sm">
        Or add a custom currency:
      </Text>
      <Group align="end">
        <TextInput
          label="Code" placeholder="ARS"
          value={customCode}
          onChange={(e) => setCustomCode(e.currentTarget.value)}
          style={{ flex: 1 }}
        />
        <TextInput
          label="Name" placeholder="Peso"
          value={customName}
          onChange={(e) => setCustomName(e.currentTarget.value)}
          style={{ flex: 1 }}
        />
        <TextInput
          label="Symbol" placeholder="$"
          value={customSymbol}
          onChange={(e) => setCustomSymbol(e.currentTarget.value)}
          style={{ flex: 1 }}
        />
        <NumberInput
          label="Decimals"
          value={customDecimals}
          onChange={(v) => setCustomDecimals(Number(v))}
          min={0} max={18}
          style={{ width: 90 }}
        />
        <Button onClick={handleAddCustomCurrency}>Add</Button>
      </Group>

      {currencies.length > 0 && (
        <ScrollArea.Autosize mah={200} mt="sm">
          <Table striped>
            <Table.Thead>
              <Table.Tr>
                <Table.Th>Code</Table.Th>
                <Table.Th>Name</Table.Th>
                <Table.Th>Symbol</Table.Th>
                <Table.Th>Decimals</Table.Th>
              </Table.Tr>
            </Table.Thead>
            <Table.Tbody>
              {currencies.map((c) => (
                <Table.Tr key={c.id}>
                  <Table.Td>{c.code}</Table.Td>
                  <Table.Td>{c.name}</Table.Td>
                  <Table.Td>{c.symbol}</Table.Td>
                  <Table.Td>{c.decimalPlaces}</Table.Td>
                </Table.Tr>
              ))}
            </Table.Tbody>
          </Table>
        </ScrollArea.Autosize>
      )}
    </Stack>
  );
}
