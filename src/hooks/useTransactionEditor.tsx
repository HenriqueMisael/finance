import { useCallback, useEffect, useRef, useState } from "react";
import { modals } from "@mantine/modals";
import { Text } from "@mantine/core";
import { useTransactionStore } from "@/stores/transactions";
import { useAccountStore } from "@/stores/accounts";
import { useDescriptionMappingStore } from "@/stores/descriptionMappings";
import { useShortcuts } from "./useShortcuts";
import type { LineItem, Transaction } from "@/types";

export interface RowDraft {
  description: string;
  date: Date | null;
  value: number;
  payerId: string | null;
  payeeId: string | null;
  categoryId: string | null;
  tagIds: string[];
  items: LineItem[];
}

const EMPTY_DRAFT: RowDraft = {
  description: "",
  date: new Date(),
  value: 0,
  payerId: null,
  payeeId: null,
  categoryId: null,
  tagIds: [],
  items: [],
};

const COLUMNS = ["date", "description", "value", "payer", "payee", "category", "tags"] as const;
export type Column = (typeof COLUMNS)[number];
export { COLUMNS };

export function useTransactionEditor() {
  const { transactions, add, update, remove } = useTransactionStore();
  const { accounts } = useAccountStore();
  const { add: addMapping } = useDescriptionMappingStore();

  const [editingId, setEditingId] = useState<string | null>(null);
  const [draft, setDraft] = useState<RowDraft>({ ...EMPTY_DRAFT });
  const [focusCol, setFocusCol] = useState<number>(0);

  const cellRefs = useRef<(HTMLElement | null)[]>([]);

  // Keep a ref to the latest draft target for account creation callback
  const accountTargetRef = useRef<"payer" | "payee">("payer");

  // ─── Edit lifecycle ──────────────────────────────────

  function startEditing(tx: Transaction) {
    setEditingId(tx.id);
    setDraft({
      description: tx.description,
      date: new Date(tx.date),
      value: tx.value,
      payerId: tx.payerId,
      payeeId: tx.payeeId,
      categoryId: tx.categoryId,
      tagIds: [...tx.tagIds],
      items: tx.items.map((i) => ({ ...i })),
    });
    setFocusCol(0);
  }

  function startNew() {
    setEditingId("new");
    setDraft({
      ...EMPTY_DRAFT,
      date: new Date(),
      payerId: accounts[0]?.id ?? null,
      payeeId: accounts[1]?.id ?? accounts[0]?.id ?? null,
    });
    setFocusCol(1);
  }

  function cancelEdit() {
    setEditingId(null);
    setDraft({ ...EMPTY_DRAFT });
  }

  const commitRow = useCallback(() => {
    if (!draft.payerId || !draft.payeeId || !draft.date) return;

    const data = {
      description: draft.description,
      date: draft.date.toISOString(),
      value: draft.value,
      categoryId: draft.categoryId,
      tagIds: draft.tagIds,
      payerId: draft.payerId,
      payeeId: draft.payeeId,
      parentTransactionId: null,
      items: draft.items,
    };

    if (editingId === "new") {
      add(data);
    } else if (editingId) {
      const original = transactions.find((t) => t.id === editingId);
      if (
        original &&
        original.description !== draft.description &&
        draft.description.trim() !== ""
      ) {
        openRenamePrompt(original.description, draft.description);
      }
      update(editingId, data);
    }

    setEditingId(null);
    setDraft({ ...EMPTY_DRAFT });
  }, [draft, editingId, add, update, transactions]);

  // ─── Shortcuts ──────────────────────────────────────

  useShortcuts([
    { key: "n", alt: true, action: () => { if (!editingId) startNew(); } },
    { key: "Enter", ctrl: true, global: true, action: () => { if (editingId) commitRow(); } },
  ]);

  // ─── Focus management ────────────────────────────────

  useEffect(() => {
    if (editingId && cellRefs.current[focusCol]) {
      const el = cellRefs.current[focusCol];
      requestAnimationFrame(() => el?.focus());
    }
  }, [editingId, focusCol]);

  function handleCellKeyDown(e: React.KeyboardEvent, colIndex: number) {
    if (e.ctrlKey && e.key === "Enter") {
      e.preventDefault();
      commitRow();
      return;
    }
    if (e.key === "Escape") {
      e.preventDefault();
      cancelEdit();
      return;
    }
    if (e.key === "Tab") {
      e.preventDefault();
      if (e.shiftKey) {
        if (colIndex > 0) setFocusCol(colIndex - 1);
      } else {
        if (colIndex < COLUMNS.length - 1) setFocusCol(colIndex + 1);
      }
    }
  }

  // ─── Modal actions ──────────────────────────────────

  function handleCreateAccount(name: string, target: "payer" | "payee") {
    accountTargetRef.current = target;
    modals.openContextModal({
      modal: "accountCreate",
      title: "Create Account",
      innerProps: {
        initialName: name,
        onCreated: (accountId: string) => {
          const key = accountTargetRef.current === "payer" ? "payerId" : "payeeId";
          setDraft((d) => ({ ...d, [key]: accountId }));
        },
      },
    });
  }

  function openRenamePrompt(original: string, mapped: string) {
    modals.openConfirmModal({
      title: "Remember this renaming?",
      children: (
        <>
          <Text size="sm">
            You renamed "<Text span fw={600}>{original}</Text>"
            to "<Text span fw={600}>{mapped}</Text>".
          </Text>
          <Text size="sm" c="dimmed">
            Should the app automatically rename future occurrences?
          </Text>
        </>
      ),
      labels: { confirm: "Yes, remember", cancel: "No" },
      onConfirm: () => addMapping(original, mapped),
    });
  }

  return {
    // State
    editingId,
    draft,
    setDraft,
    cellRefs,
    isEditing: editingId !== null,

    // Edit lifecycle
    startEditing,
    startNew,
    cancelEdit,
    commitRow,

    // Focus
    handleCellKeyDown,

    // Inline create
    handleCreateAccount,

    // Store passthrough
    remove,
  };
}
