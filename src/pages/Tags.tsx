import { useState } from "react";
import {
  Button,
  Group,
  Modal,
  Stack,
  Table,
  TextInput,
  Title,
  ActionIcon,
} from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import { useTagStore } from "@/stores/tags";
import type { Tag } from "@/types";

export function TagsPage() {
  const { tags, add, update, remove } = useTagStore();
  const [opened, { open, close }] = useDisclosure(false);
  const [editing, setEditing] = useState<Tag | null>(null);
  const [name, setName] = useState("");

  function openNew() {
    setEditing(null);
    setName("");
    open();
  }

  function openEdit(tag: Tag) {
    setEditing(tag);
    setName(tag.name);
    open();
  }

  function handleSubmit() {
    if (editing) {
      update(editing.id, name);
    } else {
      add(name);
    }
    close();
  }

  return (
    <Stack>
      <Group justify="space-between">
        <Title order={2}>Tags</Title>
        <Button onClick={openNew}>Add Tag</Button>
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
                <Group gap="xs">
                  <ActionIcon variant="subtle" onClick={() => openEdit(t)}>
                    ✏
                  </ActionIcon>
                  <ActionIcon
                    variant="subtle"
                    color="red"
                    onClick={() => remove(t.id)}
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
        title={editing ? "Edit Tag" : "New Tag"}
      >
        <Stack>
          <TextInput
            label="Name"
            placeholder="Leisure"
            value={name}
            onChange={(e) => setName(e.currentTarget.value)}
            required
          />
          <Button onClick={handleSubmit}>
            {editing ? "Save" : "Create"}
          </Button>
        </Stack>
      </Modal>
    </Stack>
  );
}
