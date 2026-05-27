import { NavLink, Stack, Text } from "@mantine/core";
import { useNavigate, useSearchParams, useLocation } from "react-router-dom";
import { useAccountStore } from "@/stores/accounts";
import { useCurrencyStore } from "@/stores/currencies";

export function AccountSidebar() {
  const { accounts } = useAccountStore();
  const { currencies } = useCurrencyStore();
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const location = useLocation();

  const currencyMap = Object.fromEntries(currencies.map((c) => [c.id, c]));
  const isTransactionsPage = location.pathname === "/transactions";
  const selectedAccountId = searchParams.get("account");

  return (
    <Stack gap={0}>
      <Text size="xs" c="dimmed" fw={600} px="xs" py={4}>
        Transactions
      </Text>
      <NavLink
        label="All Transactions"
        active={isTransactionsPage && !selectedAccountId}
        onClick={() => navigate("/transactions")}
      />
      {accounts.map((a) => (
        <NavLink
          key={a.id}
          label={a.name}
          description={currencyMap[a.currencyId]?.code}
          active={isTransactionsPage && selectedAccountId === a.id}
          onClick={() => navigate(`/transactions?account=${a.id}`)}
        />
      ))}
    </Stack>
  );
}
