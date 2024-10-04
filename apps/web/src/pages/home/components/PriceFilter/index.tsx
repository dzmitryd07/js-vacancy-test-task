import React, { FC } from 'react';
import { Button, Group, NumberInput, Paper, Text, Title } from '@mantine/core';
import { IconX } from '@tabler/icons-react';

import classes from 'pages/home/index.module.css';

interface FiltersProps {
  handlePriceChange: (value: number | string, type: 'start' | 'end') => void;
  handleResetFilter: () => void;
  startPrice: number | string;
  endPrice: number | string;
}

const PriceFilter: FC<FiltersProps> = ({ handlePriceChange, handleResetFilter, startPrice, endPrice }) => (
  <Group justify="space-between" gap="sm" className={classes['filter-block']}>
    <Paper shadow="0" radius="md" className={classes['filter-block-paper']} withBorder>
      <Group justify="space-between" mb={32}>
        <Title order={4} fw={700} fz={20}>
          Filters
        </Title>
        <Button
          variant="default"
          justify="center"
          fullWidth
          className={classes['filter-block-reset-btn']}
          rightSection={<IconX size={18} stroke={1.5} />}
          onClick={() => handleResetFilter()} // Changed to an arrow function
        >
          Reset All
        </Button>
      </Group>

      <Title order={5} mb={12} fz={16} fw={700}>
        Price
      </Title>
      <Group wrap="nowrap">
        <NumberInput
          w={131}
          size="sm"
          value={startPrice}
          onChange={(value) => handlePriceChange(value, 'start')}
          radius="md"
          placeholder="0$"
          leftSection={
            <Text size="sm" fw={500} fz={14}>
              From:
            </Text>
          }
          leftSectionWidth={60}
          suffix="$"
          hideControls
          className={classes['filter-price-input']}
          min={0}
          allowNegative={false}
          defaultValue={0}
        />
        <NumberInput
          hideControls
          w={131}
          radius="md"
          value={endPrice}
          onChange={(value) => handlePriceChange(value, 'end')}
          size="sm"
          leftSection={
            <Text size="sm" fw={500} fz={14}>
              To:
            </Text>
          }
          leftSectionWidth={40}
          min={0}
          className={classes['filter-price-input']}
          allowNegative={false}
          defaultValue={0}
          placeholder="100$"
          suffix="$"
        />
      </Group>
    </Paper>
  </Group>
);
export default PriceFilter;
