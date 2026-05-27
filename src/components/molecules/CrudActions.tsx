import { ActionIcon, Group } from "@mantine/core";

interface CrudActionsProps {
  onEdit: () => void;
  onDelete: () => void;
  extra?: React.ReactNode;
}

export function CrudActions({ onEdit, onDelete, extra }: CrudActionsProps) {
  return (
    <Group gap="xs">
      {extra}
      <ActionIcon variant="subtle" onClick={onEdit}>
        ✏
      </ActionIcon>
      <ActionIcon variant="subtle" color="red" onClick={onDelete}>
        ✕
      </ActionIcon>
    </Group>
  );
}
