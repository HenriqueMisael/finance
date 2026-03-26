import { useCallback, useMemo, useState } from "react";
import {
  AppShell,
  NavLink,
  Group,
  Title,
  ActionIcon,
  useMantineColorScheme,
  Text,
  Kbd,
  Stack,
} from "@mantine/core";
import { AccountsPage } from "./pages/Accounts";
import { CategoriesPage } from "./pages/Categories";
import { CurrenciesPage } from "./pages/Currencies";
import { TagsPage } from "./pages/Tags";
import { TransactionsPage } from "./pages/Transactions";
import { Splash } from "./Splash";
import { Onboarding } from "./Onboarding";
import { useSettingsStore } from "./stores/settings";
import { useShortcuts } from "./hooks/useShortcuts";

type Page = "transactions" | "accounts" | "categories" | "tags" | "currencies";
type AppPhase = "splash" | "onboarding" | "app";

const PAGES: { key: Page; label: string; shortcut: string }[] = [
  { key: "transactions", label: "Transactions", shortcut: "1" },
  { key: "accounts", label: "Accounts", shortcut: "2" },
  { key: "categories", label: "Categories", shortcut: "3" },
  { key: "tags", label: "Tags", shortcut: "4" },
  { key: "currencies", label: "Currencies", shortcut: "5" },
];

export function App() {
  const { onboardingComplete, userName } = useSettingsStore();
  const [phase, setPhase] = useState<AppPhase>("splash");
  const [page, setPage] = useState<Page>("transactions");
  const { colorScheme, toggleColorScheme } = useMantineColorScheme();

  const shortcuts = useMemo(
    () => [
      ...PAGES.map((p) => ({
        key: p.shortcut,
        alt: true,
        action: () => setPage(p.key),
      })),
      { key: "d", alt: true, action: toggleColorScheme },
    ],
    [toggleColorScheme]
  );

  useShortcuts(shortcuts);

  const handleSplashFinished = useCallback(() => {
    setPhase(onboardingComplete ? "app" : "onboarding");
  }, [onboardingComplete]);

  // Re-read onboardingComplete after onboarding finishes
  const { onboardingComplete: isComplete } = useSettingsStore();
  if (phase === "onboarding" && isComplete) {
    setPhase("app");
  }

  if (phase === "splash") {
    return <Splash onFinished={handleSplashFinished} />;
  }

  if (phase === "onboarding") {
    return <Onboarding />;
  }

  return (
    <AppShell navbar={{ width: 220, breakpoint: 0 }} padding="md">
      <AppShell.Navbar p="xs">
        <Group justify="space-between" px="xs" py="sm">
          <Title order={4}>Finance</Title>
          <ActionIcon
            variant="subtle"
            onClick={toggleColorScheme}
            title="Toggle color scheme (Alt+D)"
          >
            {colorScheme === "dark" ? "☀" : "🌙"}
          </ActionIcon>
        </Group>

        <Text size="xs" c="dimmed" px="xs" mb="sm">
          Hi, {userName}
        </Text>

        {PAGES.map((p) => (
          <NavLink
            key={p.key}
            label={
              <Group justify="space-between" w="100%">
                <span>{p.label}</span>
                <Kbd size="xs">Alt+{p.shortcut}</Kbd>
              </Group>
            }
            active={page === p.key}
            onClick={() => setPage(p.key)}
          />
        ))}

        <Stack gap={2} mt="auto" px="xs" py="sm">
          <Text size="xs" c="dimmed" fw={600}>
            Shortcuts
          </Text>
          <Text size="xs" c="dimmed">
            <Kbd size="xs">N</Kbd> New item
          </Text>
          <Text size="xs" c="dimmed">
            <Kbd size="xs">Esc</Kbd> Close modal
          </Text>
          <Text size="xs" c="dimmed">
            <Kbd size="xs">Alt+D</Kbd> Toggle dark mode
          </Text>
        </Stack>
      </AppShell.Navbar>

      <AppShell.Main>
        {page === "transactions" && <TransactionsPage />}
        {page === "accounts" && <AccountsPage />}
        {page === "categories" && <CategoriesPage />}
        {page === "tags" && <TagsPage />}
        {page === "currencies" && <CurrenciesPage />}
      </AppShell.Main>
    </AppShell>
  );
}
