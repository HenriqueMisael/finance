import { useState } from "react";
import {
  Button,
  Group,
  ScrollArea,
  Select,
  Stack,
  Table,
  Text,
  TextInput,
} from "@mantine/core";
import { useAccountStore } from "@/stores/accounts";
import { useCurrencyStore } from "@/stores/currencies";
import { ACCOUNT_TYPES } from "@/lib/format";
import type { AccountType } from "@/types";

export function AccountStep() {
  const { accounts, add: addAccount } = useAccountStore();
  const { currencies } = useCurrencyStore();

  const [accountName, setAccountName] = useState("");
  const [accountCurrencyId, setAccountCurrencyId] = useState<string | null>(null);
  const [accountType, setAccountType] = useState<AccountType>("checking");

  function handleAddAccount() {
    if (!accountName || !accountCurrencyId) return;
    addAccount({
      name: accountName,
      currencyId: accountCurrencyId,
      type: accountType,
      externalIds: [],
    });
    setAccountName("");
    setAccountType("checking");
  }

  return (
    <Stack mt="md" style={{ minHeight: 0 }}>
      <Text>
        Add your bank accounts, credit cards, wallets, etc. You need at least 2
        accounts to record transactions (a source and a destination).
      </Text>

      <Group align="end">
        <TextInput
          label="Account name" placeholder="Checking Account"
          value={accountName}
          onChange={(e) => setAccountName(e.currentTarget.value)}
          onKeyDown={(e) => {
            if (e.key === "Enter") {
              e.preventDefault();
              handleAddAccount();
            }
          }}
          style={{ flex: 2 }}
        />
        <Select
          label="Type"
          data={ACCOUNT_TYPES}
          value={accountType}
          onChange={(v) => setAccountType((v as AccountType) ?? "checking")}
          style={{ flex: 1 }}
        />
        <Select
          label="Currency"
          data={currencies.map((c) => ({
            value: c.id,
            label: `${c.code} - ${c.name}`,
          }))}
          value={accountCurrencyId}
          onChange={setAccountCurrencyId}
          style={{ flex: 1 }}
        />
        <Button onClick={handleAddAccount}>Add</Button>
      </Group>

      {accounts.length > 0 && (
        <ScrollArea.Autosize mah={200} mt="sm">
          <Table striped>
            <Table.Thead>
              <Table.Tr>
                <Table.Th>Name</Table.Th>
                <Table.Th>Type</Table.Th>
                <Table.Th>Currency</Table.Th>
              </Table.Tr>
            </Table.Thead>
            <Table.Tbody>
              {accounts.map((a) => (
                <Table.Tr key={a.id}>
                  <Table.Td>{a.name}</Table.Td>
                  <Table.Td>{a.type}</Table.Td>
                  <Table.Td>
                    {currencies.find((c) => c.id === a.currencyId)?.code ?? "?"}
                  </Table.Td>
                </Table.Tr>
              ))}
            </Table.Tbody>
          </Table>
        </ScrollArea.Autosize>
      )}

      {accounts.length > 0 && accounts.length < 2 && (
        <Text size="sm" c="yellow">
          Add at least one more account.
        </Text>
      )}
    </Stack>
  );
}
