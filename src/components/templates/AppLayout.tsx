import { AppShell } from "@mantine/core";
import { Outlet } from "react-router-dom";
import { AppHeader } from "@/components/organisms/AppHeader";
import { AccountSidebar } from "@/components/organisms/AccountSidebar";

export function AppLayout() {
  return (
    <AppShell
      header={{ height: 50 }}
      navbar={{ width: 220, breakpoint: 0 }}
      padding="md"
    >
      <AppShell.Header>
        <AppHeader />
      </AppShell.Header>

      <AppShell.Navbar p="xs">
        <AccountSidebar />
      </AppShell.Navbar>

      <AppShell.Main>
        <Outlet />
      </AppShell.Main>
    </AppShell>
  );
}
