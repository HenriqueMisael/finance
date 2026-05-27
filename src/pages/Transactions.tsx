import { useState } from "react";
import { Stack, Title, Text, Group, Button } from "@mantine/core";
import { useSearchParams } from "react-router-dom";
import { useAccountStore } from "@/stores/accounts";
import { TransactionTable } from "@/components/organisms/TransactionTable";
import { ImportStatementModal } from "@/components/organisms/ImportStatementModal";

export function TransactionsPage() {
  const [searchParams] = useSearchParams();
  const { accounts } = useAccountStore();
  const accountId = searchParams.get("account");
  const account = accountId
    ? accounts.find((a) => a.id === accountId)
    : null;

  const [importOpen, setImportOpen] = useState(false);

  return (
    <Stack>
      <Group justify="space-between">
        <Title order={2}>
          {account ? `${account.name} — Transactions` : "All Transactions"}
        </Title>
        <Button
          variant="light"
          size="compact-sm"
          onClick={() => setImportOpen(true)}
          disabled={accounts.length < 2}
        >
          Import Statement
        </Button>
      </Group>

      {accounts.length < 2 && (
        <Text c="dimmed">
          You need at least 2 accounts to create transactions. Add them via
          Settings → Accounts.
        </Text>
      )}

      <TransactionTable accountFilter={accountId} />

      <ImportStatementModal
        opened={importOpen}
        onClose={() => setImportOpen(false)}
        preselectedAccountId={accountId}
      />
    </Stack>
  );
}
