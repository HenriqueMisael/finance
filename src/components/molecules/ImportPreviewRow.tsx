import { memo } from "react";
import { Table, Text, Stack, Checkbox, Badge } from "@mantine/core";

interface ImportPreviewRowProps {
  fitId: string;
  date: string;
  description: string;
  mappedName: string | null;
  amount: number;
  isDuplicate: boolean;
  selected: boolean;
  accountLabel?: string;
  onToggle: () => void;
}

export const ImportPreviewRow = memo(function ImportPreviewRow({
  date,
  description,
  mappedName,
  amount,
  isDuplicate,
  selected,
  accountLabel,
  onToggle,
}: ImportPreviewRowProps) {
  return (
    <Table.Tr style={{ opacity: isDuplicate ? 0.4 : 1 }}>
      <Table.Td>
        <Checkbox
          checked={selected}
          disabled={isDuplicate}
          onChange={onToggle}
        />
      </Table.Td>
      <Table.Td>{date}</Table.Td>
      <Table.Td>
        {mappedName ? (
          <Stack gap={0}>
            <Text size="sm">{mappedName}</Text>
            <Text size="xs" c="dimmed" td="line-through">
              {description}
            </Text>
          </Stack>
        ) : (
          description
        )}
      </Table.Td>
      <Table.Td>
        <Text c={amount < 0 ? "red" : "green"} size="sm">
          {amount.toFixed(2)}
        </Text>
      </Table.Td>
      {accountLabel !== undefined && (
        <Table.Td>
          <Text size="xs">{accountLabel}</Text>
        </Table.Td>
      )}
      <Table.Td>
        {isDuplicate ? (
          <Badge color="gray" size="sm">
            Duplicate
          </Badge>
        ) : mappedName ? (
          <Badge color="blue" size="sm">
            Renamed
          </Badge>
        ) : (
          <Badge color="green" size="sm">
            New
          </Badge>
        )}
      </Table.Td>
    </Table.Tr>
  );
});
