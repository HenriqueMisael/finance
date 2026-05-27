import { useState, useCallback } from "react";
import { useDisclosure } from "@mantine/hooks";
import { useShortcuts } from "./useShortcuts";

interface UseCrudModalOptions<T> {
  /** Called when the user opens a "new" modal — return initial form state */
  onOpenNew: () => void;
  /** Called when the user opens an "edit" modal — populate form from entity */
  onOpenEdit: (entity: T) => void;
  /** Called when the user submits the form */
  onSubmit: () => void;
}

interface UseCrudModalResult<T> {
  opened: boolean;
  editing: T | null;
  openNew: () => void;
  openEdit: (entity: T) => void;
  close: () => void;
  handleSubmit: () => void;
  modalTitle: string;
  submitLabel: string;
}

export function useCrudModal<T extends { id: string }>(
  entityName: string,
  { onOpenNew, onOpenEdit, onSubmit }: UseCrudModalOptions<T>
): UseCrudModalResult<T> {
  const [opened, { open, close }] = useDisclosure(false);
  const [editing, setEditing] = useState<T | null>(null);

  const openNew = useCallback(() => {
    setEditing(null);
    onOpenNew();
    open();
  }, [onOpenNew, open]);

  const openEdit = useCallback(
    (entity: T) => {
      setEditing(entity);
      onOpenEdit(entity);
      open();
    },
    [onOpenEdit, open]
  );

  const handleSubmit = useCallback(() => {
    onSubmit();
    close();
  }, [onSubmit, close]);

  useShortcuts([
    { key: "n", alt: true, action: openNew },
    {
      key: "Enter",
      ctrl: true,
      global: true,
      action: () => {
        if (opened) handleSubmit();
      },
    },
  ]);

  return {
    opened,
    editing,
    openNew,
    openEdit,
    close,
    handleSubmit,
    modalTitle: editing ? `Edit ${entityName}` : `New ${entityName}`,
    submitLabel: editing ? "Save" : "Create",
  };
}
