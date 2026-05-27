import {
  Group,
  Title,
  ActionIcon,
  Menu,
  Button,
  useMantineColorScheme,
  Text,
} from "@mantine/core";
import { useNavigate } from "react-router-dom";
import { useSettingsStore } from "@/stores/settings";

export function AppHeader() {
  const { colorScheme, toggleColorScheme } = useMantineColorScheme();
  const { userName } = useSettingsStore();
  const navigate = useNavigate();

  return (
    <Group h="100%" px="md" justify="space-between">
      <Group gap="md">
        <Title order={4}>Finance</Title>
        <Menu shadow="md" width={200}>
          <Menu.Target>
            <Button variant="subtle" size="compact-sm">
              Settings
            </Button>
          </Menu.Target>
          <Menu.Dropdown>
            <Menu.Item onClick={() => navigate("/settings/accounts")}>
              Accounts
            </Menu.Item>
            <Menu.Item onClick={() => navigate("/settings/currencies")}>
              Currencies
            </Menu.Item>
            <Menu.Item onClick={() => navigate("/settings/categories")}>
              Categories
            </Menu.Item>
            <Menu.Item onClick={() => navigate("/settings/tags")}>
              Tags
            </Menu.Item>
            <Menu.Divider />
            <Menu.Item onClick={() => navigate("/settings/description-mappings")}>
              Description Mappings
            </Menu.Item>
          </Menu.Dropdown>
        </Menu>
      </Group>

      <Group gap="xs">
        <Text size="sm" c="dimmed">
          Hi, {userName}
        </Text>
        <ActionIcon
          variant="subtle"
          onClick={toggleColorScheme}
          title="Toggle color scheme"
        >
          {colorScheme === "dark" ? "☀" : "🌙"}
        </ActionIcon>
      </Group>
    </Group>
  );
}
