import { useState } from "react";
import {
  AppShell,
  NavLink,
  Group,
  Title,
  ActionIcon,
  useMantineColorScheme,
} from "@mantine/core";
import { AccountsPage } from "./pages/Accounts";
import { CategoriesPage } from "./pages/Categories";
import { CurrenciesPage } from "./pages/Currencies";
import { TagsPage } from "./pages/Tags";
import { TransactionsPage } from "./pages/Transactions";

type Page = "transactions" | "accounts" | "categories" | "tags" | "currencies";

export function App() {
  const [page, setPage] = useState<Page>("transactions");
  const { colorScheme, toggleColorScheme } = useMantineColorScheme();

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
