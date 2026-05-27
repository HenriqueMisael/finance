import { useState } from "react";
import { Combobox, InputBase, useCombobox, ScrollArea } from "@mantine/core";

interface CreatableSelectProps {
  data: { value: string; label: string }[];
  value: string | null;
  onChange: (value: string | null) => void;
  onCreate: (name: string) => string;
  placeholder?: string;
  size?: string;
  variant?: string;
  onKeyDown?: (e: React.KeyboardEvent) => void;
  inputRef?: React.Ref<HTMLElement>;
}

export function CreatableSelect({
  data,
  value,
  onChange,
  onCreate,
  placeholder,
  size = "xs",
  variant = "unstyled",
  onKeyDown,
  inputRef,
}: CreatableSelectProps) {
  const combobox = useCombobox({
    onDropdownClose: () => combobox.resetSelectedOption(),
  });
  const [search, setSearch] = useState("");

  const selectedLabel = data.find((d) => d.value === value)?.label ?? "";

  const filtered = data.filter((d) =>
    d.label.toLowerCase().includes(search.toLowerCase().trim())
  );

  const exactMatch = data.some(
    (d) => d.label.toLowerCase() === search.toLowerCase().trim()
  );

  const options = filtered.map((item) => (
    <Combobox.Option value={item.value} key={item.value}>
      {item.label}
    </Combobox.Option>
  ));

  return (
    <Combobox
      store={combobox}
      withinPortal
      onOptionSubmit={(val) => {
        if (val === "$create") {
          const newId = onCreate(search.trim());
          onChange(newId);
          setSearch("");
        } else {
          onChange(val);
          setSearch(data.find((d) => d.value === val)?.label ?? "");
        }
        combobox.closeDropdown();
      }}
    >
      <Combobox.Target>
        <InputBase
          ref={inputRef as React.Ref<HTMLInputElement>}
          size={size}
          variant={variant}
          rightSection={<Combobox.Chevron />}
          rightSectionPointerEvents="none"
          value={combobox.dropdownOpened ? search : selectedLabel}
          onChange={(e) => {
            combobox.openDropdown();
            combobox.updateSelectedOptionIndex();
            setSearch(e.currentTarget.value);
          }}
          onClick={() => {
            combobox.openDropdown();
            setSearch("");
          }}
          onFocus={() => {
            combobox.openDropdown();
            setSearch("");
          }}
          onBlur={() => {
            combobox.closeDropdown();
            setSearch(selectedLabel);
          }}
          onKeyDown={onKeyDown}
          placeholder={placeholder}
        />
      </Combobox.Target>

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
