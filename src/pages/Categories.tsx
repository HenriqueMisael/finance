import { useState } from "react";
import {
  ActionIcon,
  Button,
  Group,
  Kbd,
  Modal,
  Select,
  Stack,
  Table,
  TextInput,
  Title,
} from "@mantine/core";
import { useCategoryStore } from "@/stores/categories";
import { useCrudModal } from "@/hooks/useCrudModal";
import { CrudActions } from "@/components/molecules/CrudActions";
import { buildCategoryPath } from "@/lib/categories";
import type { Category } from "@/types";

export function CategoriesPage() {
  const { categories, add, update, remove } = useCategoryStore();

  const [name, setName] = useState("");
  const [parentId, setParentId] = useState<string | null>(null);

  const crud = useCrudModal<Category>("Category", {
    onOpenNew: () => {
      setName("");
      setParentId(null);
    },
    onOpenEdit: (c) => {
      setName(c.name);
      setParentId(c.parentId);
    },
    onSubmit: () => {
      if (crud.editing) {
        update(crud.editing.id, { name, parentId });
      } else {
        add({ name, parentId });
      }
    },
  });

  function openNewWithParent(presetParentId: string) {
    setName("");
    setParentId(presetParentId);
    crud.openNew();
    // Override the parentId that openNew just set to null
    setParentId(presetParentId);
  }

  const sortedCategories = [...categories].sort((a, b) =>
    buildCategoryPath(a.id, categories).localeCompare(
      buildCategoryPath(b.id, categories)
    )
  );

  return (
    <Stack>
      <Group justify="space-between">
        <Title order={2}>Categories</Title>
        <Button onClick={crud.openNew}>
          Add Category <Kbd size="xs" ml="xs">Alt+N</Kbd>
        </Button>
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
              <Table.Td>{buildCategoryPath(c.id, categories)}</Table.Td>
              <Table.Td>
                <CrudActions
                  onEdit={() => crud.openEdit(c)}
                  onDelete={() => remove(c.id)}
                  extra={
                    <ActionIcon
                      variant="subtle"
                      title="Add subcategory"
                      onClick={() => openNewWithParent(c.id)}
                    >
                      +
                    </ActionIcon>
                  }
                />
              </Table.Td>
            </Table.Tr>
          ))}
        </Table.Tbody>
      </Table>

      <Modal opened={crud.opened} onClose={crud.close} title={crud.modalTitle}>
        <Stack>
          <TextInput
            label="Name" placeholder="Leisure" value={name}
            onChange={(e) => setName(e.currentTarget.value)} required
          />
          <Select
            label="Parent Category"
            placeholder="None (top-level)"
            data={categories
              .filter((c) => c.id !== crud.editing?.id)
              .map((c) => ({ value: c.id, label: buildCategoryPath(c.id, categories) }))}
            value={parentId}
            onChange={setParentId}
            clearable
          />
          <Button onClick={crud.handleSubmit}>
            {crud.submitLabel} <Kbd size="xs" ml="xs">Ctrl+Enter</Kbd>
          </Button>
        </Stack>
      </Modal>
    </Stack>
  );
}
