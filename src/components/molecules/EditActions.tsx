import { ActionIcon, Group } from "@mantine/core";

interface EditActionsProps {
  onSave: () => void;
  onCancel: () => void;
  stopPropagation?: boolean;
}

export function EditActions({ onSave, onCancel, stopPropagation }: EditActionsProps) {
  const wrap = (fn: () => void) =>
    stopPropagation
      ? (e: React.MouseEvent) => { e.stopPropagation(); fn(); }
      : fn;

  return (
    <Group gap="xs" wrap="nowrap">
      <ActionIcon
        variant="subtle"
        color="green"
        onClick={wrap(onSave)}
        title="Save (Ctrl+Enter)"
        size="sm"
      >
        ✓
      </ActionIcon>
      <ActionIcon
        variant="subtle"
        onClick={wrap(onCancel)}
        title="Cancel (Esc)"
        size="sm"
      >
        ✕
      </ActionIcon>
    </Group>
  );
}
