import React, { FC, useLayoutEffect, useState } from 'react';
import { ActionIcon, ComboboxItem, Group, Select, Stack, Text, TextInput } from '@mantine/core';
import { useDebouncedValue, useInputState, useSetState } from '@mantine/hooks';
import { IconArrowsSort, IconChevronDown, IconSearch, IconX } from '@tabler/icons-react';
import { set } from 'lodash';

import { ProductsListParams } from 'resources/product';

const selectOptions: ComboboxItem[] = [
  {
    value: 'newest',
    label: 'Sort by newest',
  },
  {
    value: 'oldest',
    label: 'Sort by oldest',
  },
];

interface FiltersProps {
  setParams: ReturnType<typeof useSetState<ProductsListParams>>[1];
  totalProducts: number;
}

const Filters: FC<FiltersProps> = ({ setParams, totalProducts }) => {
  const [search, setSearch] = useInputState('');
  const [sortBy, setSortBy] = useState<string | null>(selectOptions[0].value);
  const [debouncedSearch] = useDebouncedValue(search, 500);

  const handleSort = (value: string | null) => {
    setSortBy(value);
    setParams((old) => set(old, 'sort.createdOn', value === 'newest' ? 'desc' : 'asc'));
  };

  useLayoutEffect(() => {
    setParams({ searchValue: debouncedSearch });
  }, [debouncedSearch]);

  return (
    <Stack align="stretch">
      <TextInput
        size="md"
        value={search}
        onChange={setSearch}
        placeholder="Type to search..."
        leftSection={<IconSearch size={16} />}
        radius="md"
        rightSection={
          search && (
            <ActionIcon variant="transparent" onClick={() => setSearch('')}>
              <IconX color="#ECECEE" stroke={1} />
            </ActionIcon>
          )
        }
      />

      <Group justify="space-between">
        <Text fw={700}>{totalProducts} results</Text>

        <Select
          w="170px"
          size="sm"
          data={selectOptions}
          value={sortBy}
          onChange={handleSort}
          variant="transparent"
          allowDeselect={false}
          rightSection={<IconChevronDown size={14} />}
          leftSection={<IconArrowsSort stroke={1} size={14} />}
          comboboxProps={{
            withinPortal: false,
            transitionProps: {
              transition: 'fade',
              duration: 120,
              timingFunction: 'ease-out',
            },
          }}
        />
      </Group>
    </Stack>
  );
};
export default Filters;
