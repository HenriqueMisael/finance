import { ActionIcon } from "@mantine/core";

interface DeleteActionProps {
  onDelete: () => void;
}

export function DeleteAction({ onDelete }: DeleteActionProps) {
  return (
    <ActionIcon
      variant="subtle"
      color="red"
      onClick={(e) => {
        e.stopPropagation();
        onDelete();
      }}
      size="sm"
    >
      ✕
    </ActionIcon>
  );
}
