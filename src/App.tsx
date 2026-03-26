import { useCallback, useState } from "react";
import {
  AppShell,
  NavLink,
  Group,
  Title,
  ActionIcon,
  useMantineColorScheme,
  Text,
} from "@mantine/core";
import { AccountsPage } from "./pages/Accounts";
import { CategoriesPage } from "./pages/Categories";
import { CurrenciesPage } from "./pages/Currencies";
import { TagsPage } from "./pages/Tags";
import { TransactionsPage } from "./pages/Transactions";
import { Splash } from "./Splash";
import { Onboarding } from "./Onboarding";
import { useSettingsStore } from "./stores/settings";

type Page = "transactions" | "accounts" | "categories" | "tags" | "currencies";
type AppPhase = "splash" | "onboarding" | "app";

export function App() {
  const { onboardingComplete, userName } = useSettingsStore();
  const [phase, setPhase] = useState<AppPhase>("splash");
  const [page, setPage] = useState<Page>("transactions");
  const { colorScheme, toggleColorScheme } = useMantineColorScheme();

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
    <AppShell navbar={{ width: 200, breakpoint: 0 }} padding="md">
      <AppShell.Navbar p="xs">
        <Group justify="space-between" px="xs" py="sm">
          <Title order={4}>Finance</Title>
          <ActionIcon
            variant="subtle"
            onClick={toggleColorScheme}
            title="Toggle color scheme"
          >
            {colorScheme === "dark" ? "☀" : "🌙"}
          </ActionIcon>
        </Group>

        <Text size="xs" c="dimmed" px="xs" mb="sm">
          Hi, {userName}
        </Text>

        <NavLink
          label="Transactions"
          active={page === "transactions"}
          onClick={() => setPage("transactions")}
        />
        <NavLink
          label="Accounts"
          active={page === "accounts"}
          onClick={() => setPage("accounts")}
        />
        <NavLink
          label="Categories"
          active={page === "categories"}
          onClick={() => setPage("categories")}
        />
        <NavLink
          label="Tags"
          active={page === "tags"}
          onClick={() => setPage("tags")}
        />
        <NavLink
          label="Currencies"
          active={page === "currencies"}
          onClick={() => setPage("currencies")}
        />
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
