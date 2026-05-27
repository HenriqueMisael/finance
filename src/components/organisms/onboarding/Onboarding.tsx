import { useEffect, useRef, useState } from "react";
import {
  Button,
  Center,
  Container,
  Group,
  Stepper,
  Title,
  Text,
  Stack,
  Kbd,
} from "@mantine/core";
import { useSettingsStore } from "@/stores/settings";
import { useCurrencyStore } from "@/stores/currencies";
import { useAccountStore } from "@/stores/accounts";
import { NameStep } from "./NameStep";
import { CurrencyStep } from "./CurrencyStep";
import { AccountStep } from "./AccountStep";

export function Onboarding() {
  const [step, setStep] = useState(0);
  const [name, setName] = useState("");

  const { setUserName, completeOnboarding } = useSettingsStore();
  const { currencies } = useCurrencyStore();
  const { accounts } = useAccountStore();

  function handleFinish() {
    setUserName(name);
    completeOnboarding();
  }

  function canAdvance(): boolean {
    if (step === 0) return name.trim().length > 0;
    if (step === 1) return currencies.length > 0;
    if (step === 2) return accounts.length >= 2;
    return true;
  }

  function advance() {
    if (canAdvance() && step < 3) setStep((s) => s + 1);
  }

  function goBack() {
    if (step > 0) setStep((s) => s - 1);
  }

  // Global Ctrl+Enter shortcut
  const handlerRef = useRef((_e: KeyboardEvent) => {});
  handlerRef.current = (e: KeyboardEvent) => {
    if ((e.ctrlKey || e.metaKey) && e.key === "Enter") {
      e.preventDefault();
      if (step === 3) handleFinish();
      else advance();
    }
  };

  useEffect(() => {
    const handler = (e: KeyboardEvent) => handlerRef.current(e);
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, []);

  return (
    <Center style={{ height: "100vh" }}>
      <Container size="sm" w="100%" style={{ height: "80vh", display: "flex", flexDirection: "column" }}>
        <Title order={2} mb="xl" ta="center">
          Welcome to Finance
        </Title>

        <div style={{ flex: 1, minHeight: 0, display: "flex", flexDirection: "column" }}>
          <Stepper active={step} onStepClick={setStep} allowNextStepsSelect={false}>
            <Stepper.Step label="Your name" description="Who are you?">
              <NameStep onNameChange={setName} onSubmit={advance} />
            </Stepper.Step>

            <Stepper.Step label="Currencies" description="Which currencies do you use?">
              <CurrencyStep />
            </Stepper.Step>

            <Stepper.Step label="Accounts" description="Set up your accounts">
              <AccountStep />
            </Stepper.Step>

            <Stepper.Completed>
              <Stack mt="md" align="center">
                <Title order={3}>You're all set, {name}!</Title>
                <Text c="dimmed">
                  You can always add more currencies, accounts, and categories later.
                </Text>
                <Button size="lg" onClick={handleFinish} mt="md">
                  Open Finance <Kbd size="xs" ml="xs">Ctrl+Enter</Kbd>
                </Button>
              </Stack>
            </Stepper.Completed>
          </Stepper>
        </div>

        {step < 3 && (
          <Group justify="space-between" mt="xl">
            <Button variant="default" onClick={goBack} disabled={step === 0}>
              Back
            </Button>
            <Button onClick={advance} disabled={!canAdvance()}>
              Next <Kbd size="xs" ml="xs">Ctrl+Enter</Kbd>
            </Button>
          </Group>
        )}
      </Container>
    </Center>
  );
}
