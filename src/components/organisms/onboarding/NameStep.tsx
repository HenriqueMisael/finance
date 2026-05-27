import { useState } from "react";
import { Stack, Text, TextInput } from "@mantine/core";

interface NameStepProps {
  onNameChange: (name: string) => void;
  onSubmit: () => void;
}

export function NameStep({ onNameChange, onSubmit }: NameStepProps) {
  const [name, setName] = useState("");

  function handleChange(value: string) {
    setName(value);
    onNameChange(value);
  }

  return (
    <Stack mt="md">
      <Text>What should we call you?</Text>
      <TextInput
        placeholder="Your name"
        value={name}
        onChange={(e) => handleChange(e.currentTarget.value)}
        onKeyDown={(e) => {
          if (e.key === "Enter") {
            e.preventDefault();
            onSubmit();
          }
        }}
        size="lg"
        autoFocus
      />
    </Stack>
  );
}
