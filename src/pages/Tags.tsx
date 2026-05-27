import { useState } from "react";
import {
  Button,
  Group,
  Kbd,
  Modal,
  Stack,
  Table,
  TextInput,
  Title,
} from "@mantine/core";
import { useTagStore } from "@/stores/tags";
import { useCrudModal } from "@/hooks/useCrudModal";
import { CrudActions } from "@/components/molecules/CrudActions";
import type { Tag } from "@/types";

export function TagsPage() {
  const { tags, add, update, remove } = useTagStore();
  const [name, setName] = useState("");

  const crud = useCrudModal<Tag>("Tag", {
    onOpenNew: () => setName(""),
    onOpenEdit: (tag) => setName(tag.name),
    onSubmit: () => {
      if (crud.editing) {
        update(crud.editing.id, name);
      } else {
        add(name);
      }
    },
  });

  return (
    <Stack>
      <Group justify="space-between">
        <Title order={2}>Tags</Title>
        <Button onClick={crud.openNew}>
          Add Tag <Kbd size="xs" ml="xs">Alt+N</Kbd>
        </Button>
      </Group>

      <Table striped highlightOnHover>
        <Table.Thead>
          <Table.Tr>
            <Table.Th>Name</Table.Th>
            <Table.Th />
          </Table.Tr>
        </Table.Thead>
        <Table.Tbody>
          {tags.map((t) => (
            <Table.Tr key={t.id}>
              <Table.Td>{t.name}</Table.Td>
              <Table.Td>
                <CrudActions
                  onEdit={() => crud.openEdit(t)}
                  onDelete={() => remove(t.id)}
                />
              </Table.Td>
            </Table.Tr>
          ))}
        </Table.Tbody>
      </Table>

      <Modal opened={crud.opened} onClose={crud.close} title={crud.modalTitle}>
        <Stack>
          <TextInput
            label="Name"
            placeholder="Leisure"
            value={name}
            onChange={(e) => setName(e.currentTarget.value)}
            required
          />
          <Button onClick={crud.handleSubmit}>
            {crud.submitLabel} <Kbd size="xs" ml="xs">Ctrl+Enter</Kbd>
          </Button>
        </Stack>
      </Modal>
    </Stack>
  );
}
