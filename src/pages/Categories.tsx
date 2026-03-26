import { useMemo, useState } from "react";
import {
  Button,
  Group,
  Kbd,
  Modal,
  Select,
  Stack,
  Table,
  TextInput,
  Title,
  ActionIcon,
} from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import { useCategoryStore } from "@/stores/categories";
import { useShortcuts } from "@/hooks/useShortcuts";
import type { Category } from "@/types";

export function CategoriesPage() {
  const { categories, add, update, remove } = useCategoryStore();
  const [opened, { open, close }] = useDisclosure(false);
  const [editing, setEditing] = useState<Category | null>(null);

  const [name, setName] = useState("");
  const [parentId, setParentId] = useState<string | null>(null);

  useShortcuts(useMemo(() => [{ key: "n", action: () => openNew() }], []));

  function openNew(presetParentId: string | null = null) {
    setEditing(null);
    setName("");
    setParentId(presetParentId);
    open();
  }

  function openEdit(category: Category) {
    setEditing(category);
    setName(category.name);
    setParentId(category.parentId);
    open();
  }

  function handleSubmit() {
    if (editing) {
      update(editing.id, { name, parentId });
    } else {
      add({ name, parentId });
    }
    close();
  }

  function buildPath(category: Category): string {
    const parts: string[] = [category.name];
    let current = category;
    while (current.parentId) {
      const parent = categories.find((c) => c.id === current.parentId);
      if (!parent) break;
      parts.unshift(parent.name);
      current = parent;
    }
    return parts.join(" → ");
  }

  const sortedCategories = [...categories].sort((a, b) =>
    buildPath(a).localeCompare(buildPath(b))
  );

  return (
    <Stack>
      <Group justify="space-between">
        <Title order={2}>Categories</Title>
        <Button onClick={() => openNew()}>Add Category <Kbd size="xs" ml="xs">N</Kbd></Button>
      </Group>

      <Table striped highlightOnHover>
        <Table.Thead>
          <Table.Tr>
            <Table.Th>Category</Table.Th>
            <Table.Th />
          </Table.Tr>
        </Table.Thead>
        <Table.Tbody>
          {sortedCategories.map((c) => (
            <Table.Tr key={c.id}>
              <Table.Td>{buildPath(c)}</Table.Td>
              <Table.Td>
                <Group gap="xs">
                  <ActionIcon
                    variant="subtle"
                    title="Add subcategory"
                    onClick={() => openNew(c.id)}
                  >
                    +
                  </ActionIcon>
                  <ActionIcon variant="subtle" onClick={() => openEdit(c)}>
                    ✏
                  </ActionIcon>
                  <ActionIcon
                    variant="subtle"
                    color="red"
                    onClick={() => remove(c.id)}
                  >
                    ✕
                  </ActionIcon>
                </Group>
              </Table.Td>
            </Table.Tr>
          ))}
        </Table.Tbody>
      </Table>

      <Modal
        opened={opened}
        onClose={close}
        title={editing ? "Edit Category" : "New Category"}
      >
        <Stack>
          <TextInput
            label="Name"
            placeholder="Leisure"
            value={name}
            onChange={(e) => setName(e.currentTarget.value)}
            required
          />
          <Select
            label="Parent Category"
            placeholder="None (top-level)"
            data={categories
              .filter((c) => c.id !== editing?.id)
              .map((c) => ({ value: c.id, label: buildPath(c) }))}
            value={parentId}
            onChange={setParentId}
            clearable
          />
          <Button onClick={handleSubmit}>
            {editing ? "Save" : "Create"}
          </Button>
        </Stack>
      </Modal>
    </Stack>
  );
}
