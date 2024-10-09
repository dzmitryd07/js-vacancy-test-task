import React, { FC } from 'react';
import { Group, Table } from '@mantine/core';

const HistoryTab: FC<{
  sessions:
    | Array<{
        id: string;
        description: string;
        quantity: number;
        price: { created: number; unit_amount: number };
      }>
    | undefined;
}> = ({ sessions }) => {
  const historyRows = sessions?.map(({ id, description, price }) => (
    <Table.Tr key={id}>
      <Table.Td>
        <Group>{description}</Group>
      </Table.Td>
      <Table.Td>{(price?.unit_amount ?? 0) / 100}</Table.Td>
      <Table.Td>{new Date((price?.created ?? new Date()) * 1000).toLocaleString()}</Table.Td>
    </Table.Tr>
  ));

  return (
    <Table w="100%">
      <Table.Thead c="#767676" bd={0}>
        <Table.Tr>
          <Table.Th fw={400} fz={16}>
            Item
          </Table.Th>
          <Table.Th fw={400} fz={16}>
            Unit price
          </Table.Th>
          <Table.Th fw={400} fz={16}>
            Date
          </Table.Th>
        </Table.Tr>
      </Table.Thead>
      <Table.Tbody>{historyRows}</Table.Tbody>
    </Table>
  );
};

export default HistoryTab;
