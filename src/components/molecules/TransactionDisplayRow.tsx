import { memo } from "react";
import { Group, Table, Tooltip, Badge, Text, Stack } from "@mantine/core";
import { DeleteAction } from "./DeleteAction";
import type { LineItem } from "@/types";

interface TransactionDisplayRowProps {
  id: string;
  date: string;
  description: string;
  value: string;
  payer: string;
  payee: string;
  category: string;
  tags: string;
  items?: LineItem[];
  onEdit: () => void;
  onDelete: () => void;
}

export const TransactionDisplayRow = memo(function TransactionDisplayRow({
  date,
  description,
  value,
  payer,
  payee,
  category,
  tags,
  items,
  onEdit,
  onDelete,
}: TransactionDisplayRowProps) {
  const hasItems = items && items.length > 0;

  return (
    <Table.Tr style={{ cursor: "pointer" }} onClick={onEdit}>
      <Table.Td>{date}</Table.Td>
      <Table.Td>
        <Group gap="xs">
          {description}
          {hasItems && (
            <Tooltip
              multiline
              w={300}
              label={
                <Stack gap={2}>
                  {items.map((item, i) => (
                    <Text key={i} size="xs">
                      {item.quantity}x {item.description} — {item.totalValue}
                    </Text>
                  ))}
                </Stack>
              }
            >
              <Badge size="xs" variant="light" color="teal" style={{ cursor: "help" }}>
                {items.length} items
              </Badge>
            </Tooltip>
          )}
        </Group>
      </Table.Td>
      <Table.Td>{value}</Table.Td>
      <Table.Td>{payer}</Table.Td>
      <Table.Td>{payee}</Table.Td>
      <Table.Td>{category}</Table.Td>
      <Table.Td>{tags}</Table.Td>
      <Table.Td>
        <DeleteAction onDelete={onDelete} />
      </Table.Td>
    </Table.Tr>
  );
});
