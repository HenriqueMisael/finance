import { useState } from "react";
import {
  Stack,
  TextInput,
  Select,
  Button,
  Kbd,
} from "@mantine/core";
import { type ContextModalProps } from "@mantine/modals";
import { useAccountStore } from "@/stores/accounts";
import { useCurrencyStore } from "@/stores/currencies";
import { useShortcuts } from "@/hooks/useShortcuts";
import { ACCOUNT_TYPES } from "@/lib/format";
import type { AccountType } from "@/types";
import { CreatableSelect } from "@/components/molecules/CreatableSelect";

export interface AccountCreateModalInnerProps {
  initialName?: string;
  onCreated: (accountId: string) => void;
}

export function AccountCreateModalContent({
  context,
  id,
  innerProps,
}: ContextModalProps<AccountCreateModalInnerProps>) {
  const { initialName = "", onCreated } = innerProps;
  const { add: addAccount } = useAccountStore();
  const { currencies, add: addCurrency } = useCurrencyStore();
  const [name, setName] = useState(initialName);
  const [currencyId, setCurrencyId] = useState<string | null>(
    currencies[0]?.id ?? null
  );
  const [type, setType] = useState<AccountType>("checking");

  function handleSubmit() {
    if (!name.trim() || !currencyId) return;
    const account = addAccount({ name: name.trim(), currencyId, type, externalIds: [] });
    onCreated(account.id);
    context.closeModal(id);
  }

  useShortcuts([
    { key: "Enter", ctrl: true, global: true, action: handleSubmit },
  ]);

  function handleCreateCurrency(currencyName: string): string {
    const currency = addCurrency({
      code: currencyName.toUpperCase().slice(0, 3),
      name: currencyName,
      symbol: currencyName.slice(0, 1),
      decimalPlaces: 2,
    });
    setCurrencyId(currency.id);
    return currency.id;
  }

  const currencyOptions = currencies.map((c) => ({
    value: c.id,
    label: `${c.code} - ${c.name}`,
  }));

  return (
    <Stack>
      <TextInput
        label="Name"
        placeholder="Checking Account"
        value={name}
        onChange={(e) => setName(e.currentTarget.value)}
        required
        autoFocus
      />
      <Select
        label="Type"
        data={ACCOUNT_TYPES}
        value={type}
        onChange={(v) => setType((v as AccountType) ?? "checking")}
        required
      />
      <CreatableSelect
        data={currencyOptions}
        value={currencyId}
        onChange={setCurrencyId}
        onCreate={handleCreateCurrency}
        placeholder="Select or create currency"
        size="sm"
        variant="default"
      />
      <Button onClick={handleSubmit}>
        Create <Kbd size="xs" ml="xs">Ctrl+Enter</Kbd>
      </Button>
    </Stack>
  );
}
