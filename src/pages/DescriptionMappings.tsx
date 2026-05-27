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
import { useDescriptionMappingStore } from "@/stores/descriptionMappings";
import { useCrudModal } from "@/hooks/useCrudModal";
import { CrudActions } from "@/components/molecules/CrudActions";
import type { DescriptionMapping } from "@/types";

export function DescriptionMappingsPage() {
  const { mappings, add, update, remove } = useDescriptionMappingStore();
  const [original, setOriginal] = useState("");
  const [mapped, setMapped] = useState("");

  const crud = useCrudModal<DescriptionMapping>("Mapping", {
    onOpenNew: () => {
      setOriginal("");
      setMapped("");
    },
    onOpenEdit: (m) => {
      setOriginal(m.originalDescription);
      setMapped(m.mappedDescription);
    },
    onSubmit: () => {
      if (!original.trim() || !mapped.trim()) return;
      if (crud.editing) {
        update(crud.editing.id, {
          originalDescription: original.trim(),
          mappedDescription: mapped.trim(),
        });
      } else {
        add(original.trim(), mapped.trim());
      }
    },
  });

  return (
    <Stack>
      <Group justify="space-between">
        <Title order={2}>Description Mappings</Title>
        <Button onClick={crud.openNew}>
          Add Mapping <Kbd size="xs" ml="xs">Alt+N</Kbd>
        </Button>
      </Group>

      <Table striped highlightOnHover>
        <Table.Thead>
          <Table.Tr>
            <Table.Th>Original (from statement)</Table.Th>
            <Table.Th>Display as</Table.Th>
            <Table.Th />
          </Table.Tr>
        </Table.Thead>
        <Table.Tbody>
          {mappings.map((m) => (
            <Table.Tr key={m.id}>
              <Table.Td>{m.originalDescription}</Table.Td>
              <Table.Td>{m.mappedDescription}</Table.Td>
              <Table.Td>
                <CrudActions
                  onEdit={() => crud.openEdit(m)}
                  onDelete={() => remove(m.id)}
                />
              </Table.Td>
            </Table.Tr>
          ))}
        </Table.Tbody>
      </Table>

      <Modal opened={crud.opened} onClose={crud.close} title={crud.modalTitle}>
        <Stack>
          <TextInput
            label="Original description"
            placeholder="POS PURCHASE GROCERY STORE"
            value={original}
            onChange={(e) => setOriginal(e.currentTarget.value)}
            required
          />
          <TextInput
            label="Display as"
            placeholder="Grocery Store"
            value={mapped}
            onChange={(e) => setMapped(e.currentTarget.value)}
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
