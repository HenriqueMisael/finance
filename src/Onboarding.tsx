import { useState } from "react";
import {
  Button,
  Center,
  Container,
  Group,
  NumberInput,
  Select,
  Stepper,
  Table,
  TextInput,
  Title,
  Text,
  Stack,
} from "@mantine/core";
import { useSettingsStore } from "@/stores/settings";
import { useCurrencyStore } from "@/stores/currencies";
import { useAccountStore } from "@/stores/accounts";
import type { AccountType } from "@/types";

const COMMON_CURRENCIES = [
  { code: "BRL", name: "Real", symbol: "R$", decimalPlaces: 2 },
  { code: "USD", name: "Dollar", symbol: "$", decimalPlaces: 2 },
  { code: "EUR", name: "Euro", symbol: "€", decimalPlaces: 2 },
  { code: "GBP", name: "Pound", symbol: "£", decimalPlaces: 2 },
  { code: "BTC", name: "Bitcoin", symbol: "₿", decimalPlaces: 8 },
  { code: "JPY", name: "Yen", symbol: "¥", decimalPlaces: 0 },
];

const ACCOUNT_TYPES: { value: AccountType; label: string }[] = [
  { value: "asset", label: "Asset" },
  { value: "liability", label: "Liability" },
  { value: "tracking", label: "Tracking" },
];

export function Onboarding() {
  const [step, setStep] = useState(0);

  const { setUserName, completeOnboarding } = useSettingsStore();
  const { currencies, add: addCurrency } = useCurrencyStore();
  const { accounts, add: addAccount } = useAccountStore();

  // Step 0: Name
  const [name, setName] = useState("");

  // Step 1: Currencies
  const [customCode, setCustomCode] = useState("");
  const [customName, setCustomName] = useState("");
  const [customSymbol, setCustomSymbol] = useState("");
  const [customDecimals, setCustomDecimals] = useState<number>(2);

  // Step 2: Accounts
  const [accountName, setAccountName] = useState("");
  const [accountCurrencyId, setAccountCurrencyId] = useState<string | null>(
    null
  );
  const [accountType, setAccountType] = useState<AccountType>("asset");

  function handleAddCommonCurrency(
    preset: (typeof COMMON_CURRENCIES)[number]
  ) {
    const alreadyExists = currencies.some((c) => c.code === preset.code);
    if (alreadyExists) return;
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

  function handleAddAccount() {
    if (!accountName || !accountCurrencyId) return;
    addAccount({
      name: accountName,
      currencyId: accountCurrencyId,
      type: accountType,
    });
    setAccountName("");
    setAccountType("asset");
  }

  function handleFinish() {
    setUserName(name);
    completeOnboarding();
  }

  function canAdvance(): boolean {
    if (step === 0) return name.trim().length > 0;
    if (step === 1) return currencies.length > 0;
    if (step === 2) return accounts.length > 0;
    return true;
  }

  return (
    <Center style={{ minHeight: "100vh" }} py="xl">
      <Container size="sm" w="100%">
        <Title order={2} mb="xl" ta="center">
          Welcome to Finance
        </Title>

        <Stepper active={step} onStepClick={setStep} allowNextStepsSelect={false}>
          <Stepper.Step label="Your name" description="Who are you?">
            <Stack mt="md">
              <Text>What should we call you?</Text>
              <TextInput
                placeholder="Your name"
                value={name}
                onChange={(e) => setName(e.currentTarget.value)}
                size="lg"
                autoFocus
              />
            </Stack>
          </Stepper.Step>

          <Stepper.Step
            label="Currencies"
            description="Which currencies do you use?"
          >
            <Stack mt="md">
              <Text>Pick from common currencies or add your own.</Text>

              <Group>
                {COMMON_CURRENCIES.map((preset) => {
                  const added = currencies.some(
                    (c) => c.code === preset.code
                  );
                  return (
                    <Button
                      key={preset.code}
                      variant={added ? "filled" : "outline"}
                      onClick={() => handleAddCommonCurrency(preset)}
                      disabled={added}
                      size="sm"
                    >
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
                  label="Code"
                  placeholder="ARS"
                  value={customCode}
                  onChange={(e) => setCustomCode(e.currentTarget.value)}
                  style={{ flex: 1 }}
                />
                <TextInput
                  label="Name"
                  placeholder="Peso"
                  value={customName}
                  onChange={(e) => setCustomName(e.currentTarget.value)}
                  style={{ flex: 1 }}
                />
                <TextInput
                  label="Symbol"
                  placeholder="$"
                  value={customSymbol}
                  onChange={(e) => setCustomSymbol(e.currentTarget.value)}
                  style={{ flex: 1 }}
                />
                <NumberInput
                  label="Decimals"
                  value={customDecimals}
                  onChange={(v) => setCustomDecimals(Number(v))}
                  min={0}
                  max={18}
                  style={{ width: 90 }}
                />
                <Button onClick={handleAddCustomCurrency}>Add</Button>
              </Group>

              {currencies.length > 0 && (
                <Table striped mt="sm">
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
              )}
            </Stack>
          </Stepper.Step>

          <Stepper.Step
            label="Accounts"
            description="Set up your accounts"
          >
            <Stack mt="md">
              <Text>
                Add your bank accounts, credit cards, wallets, etc.
              </Text>

              <Group align="end">
                <TextInput
                  label="Account name"
                  placeholder="Checking Account"
                  value={accountName}
                  onChange={(e) => setAccountName(e.currentTarget.value)}
                  style={{ flex: 2 }}
                />
                <Select
                  label="Type"
                  data={ACCOUNT_TYPES}
                  value={accountType}
                  onChange={(v) =>
                    setAccountType((v as AccountType) ?? "asset")
                  }
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
                <Table striped mt="sm">
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
                          {currencies.find((c) => c.id === a.currencyId)
                            ?.code ?? "?"}
                        </Table.Td>
                      </Table.Tr>
                    ))}
                  </Table.Tbody>
                </Table>
              )}
            </Stack>
          </Stepper.Step>

          <Stepper.Completed>
            <Stack mt="md" align="center">
              <Title order={3}>You're all set, {name}!</Title>
              <Text c="dimmed">
                You can always add more currencies, accounts, and categories
                later.
              </Text>
              <Button size="lg" onClick={handleFinish} mt="md">
                Open Finance
              </Button>
            </Stack>
          </Stepper.Completed>
        </Stepper>

        {step < 3 && (
          <Group justify="space-between" mt="xl">
            <Button
              variant="default"
              onClick={() => setStep((s) => s - 1)}
              disabled={step === 0}
            >
              Back
            </Button>
            <Button
              onClick={() => setStep((s) => s + 1)}
              disabled={!canAdvance()}
            >
              Next
            </Button>
          </Group>
        )}
      </Container>
    </Center>
  );
}
