import { useEffect, useState } from "react";
import { Center, Stack, Title, Text, Transition } from "@mantine/core";

interface SplashProps {
  onFinished: () => void;
}

export function Splash({ onFinished }: SplashProps) {
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setVisible(false);
      setTimeout(onFinished, 300);
    }, 1500);
    return () => clearTimeout(timer);
  }, [onFinished]);

  return (
    <Transition mounted={visible} transition="fade" duration={300}>
      {(styles) => (
        <Center style={{ ...styles, height: "100vh" }}>
          <Stack align="center" gap="xs">
            <Title order={1}>Finance</Title>
            <Text c="dimmed" size="sm">
              Personal finance & budgeting
            </Text>
          </Stack>
        </Center>
      )}
    </Transition>
  );
}
