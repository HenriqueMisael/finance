import { useState } from "react";
import {
  Combobox,
  useCombobox,
  ScrollArea,
  Pill,
  PillsInput,
} from "@mantine/core";

interface CreatableMultiSelectProps {
  data: { value: string; label: string }[];
  value: string[];
  onChange: (value: string[]) => void;
  onCreate: (name: string) => string;
  placeholder?: string;
  size?: string;
  variant?: string;
  onKeyDown?: (e: React.KeyboardEvent) => void;
  inputRef?: React.Ref<HTMLElement>;
}

export function CreatableMultiSelect({
  data,
  value,
  onChange,
  onCreate,
  placeholder,
  size = "xs",
  variant = "unstyled",
  onKeyDown,
  inputRef,
}: CreatableMultiSelectProps) {
  const combobox = useCombobox({
    onDropdownClose: () => combobox.resetSelectedOption(),
    onDropdownOpen: () => combobox.updateSelectedOptionIndex("active"),
  });
  const [search, setSearch] = useState("");

  function handleValueSelect(val: string) {
    if (val === "$create") {
      const newId = onCreate(search.trim());
      onChange([...value, newId]);
      setSearch("");
    } else if (value.includes(val)) {
      onChange(value.filter((v) => v !== val));
    } else {
      onChange([...value, val]);
      setSearch("");
    }
  }

  function handleValueRemove(val: string) {
    onChange(value.filter((v) => v !== val));
  }

  const filtered = data.filter((d) =>
    d.label.toLowerCase().includes(search.toLowerCase().trim())
  );

  const exactMatch = data.some(
    (d) => d.label.toLowerCase() === search.toLowerCase().trim()
  );

  const pills = value.map((v) => {
    const label = data.find((d) => d.value === v)?.label ?? v;
    return (
      <Pill key={v} withRemoveButton onRemove={() => handleValueRemove(v)}>
        {label}
      </Pill>
    );
  });

  const options = filtered.map((item) => (
    <Combobox.Option
      value={item.value}
      key={item.value}
      active={value.includes(item.value)}
    >
      {item.label}
    </Combobox.Option>
  ));

  return (
    <Combobox
      store={combobox}
      onOptionSubmit={handleValueSelect}
      withinPortal
    >
      <Combobox.DropdownTarget>
        <PillsInput
          size={size}
          variant={variant}
          onClick={() => combobox.openDropdown()}
          onKeyDown={onKeyDown}
        >
          <Pill.Group>
            {pills}
            <Combobox.EventsTarget>
              <PillsInput.Field
                ref={inputRef as React.Ref<HTMLInputElement>}
                onFocus={() => combobox.openDropdown()}
                onBlur={() => combobox.closeDropdown()}
                value={search}
                placeholder={value.length === 0 ? placeholder : undefined}
                onChange={(e) => {
                  combobox.updateSelectedOptionIndex();
                  setSearch(e.currentTarget.value);
                }}
                onKeyDown={(e) => {
                  if (
                    e.key === "Backspace" &&
                    search.length === 0 &&
                    value.length > 0
                  ) {
                    handleValueRemove(value[value.length - 1]);
                  }
                }}
              />
            </Combobox.EventsTarget>
          </Pill.Group>
        </PillsInput>
      </Combobox.DropdownTarget>

      <Combobox.Dropdown>
        <Combobox.Options>
          <ScrollArea.Autosize mah={200}>
            {options}
            {!exactMatch && search.trim().length > 0 && (
              <Combobox.Option value="$create">
                + Create "{search.trim()}"
              </Combobox.Option>
            )}
            {options.length === 0 && search.trim().length === 0 && (
              <Combobox.Empty>No options</Combobox.Empty>
            )}
          </ScrollArea.Autosize>
        </Combobox.Options>
      </Combobox.Dropdown>
    </Combobox>
  );
}
