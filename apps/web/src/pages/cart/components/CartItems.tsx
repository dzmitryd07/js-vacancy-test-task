import React, { FC } from 'react';
import { useRouter } from 'next/router';
import { ActionIcon, Button, Card, Group, Image, NumberInput, Table, Tabs, Text, Title } from '@mantine/core';
import { IconMinus, IconPlus, IconX } from '@tabler/icons-react';
import clsx from 'clsx';
import { useShoppingCart } from 'use-shopping-cart';
import { CartEntry } from 'use-shopping-cart/core';

import { RoutePath } from 'routes';

import EmptyCart from './EmptyCart';

import classes from '../index.module.css';

const CartItems: FC<{ activeTab: string | null; setActiveTab: (value: string) => void }> = ({
  activeTab,
  setActiveTab,
}) => {
  const { cartCount, cartDetails, totalPrice, removeItem, incrementItem, decrementItem } = useShoppingCart();
  const router = useRouter();

  const rows = Object.values(cartDetails ?? {}).map((element: CartEntry) => (
    <Table.Tr key={element._id}>
      <Table.Td>
        <Group>
          <Image
            src={element.image}
            w={80}
            h={80}
            fallbackSrc="https://placehold.co/600x400?text=Placeholder"
            radius="md"
            fit="fill"
          />
          {element.name}
        </Group>
      </Table.Td>
      <Table.Td>${element.price}</Table.Td>
      <Table.Td>
        <Group gap={2}>
          <ActionIcon variant="transparent" onClick={() => decrementItem(element.id)} size="sm">
            <IconMinus stroke={1} className={classes['increment-btn-color']} />
          </ActionIcon>
          <NumberInput
            step={1}
            min={1}
            w={60}
            variant="transparent"
            value={element.quantity}
            size="sm"
            hideControls
            allowNegative={false}
          />
          <ActionIcon variant="transparent" onClick={() => incrementItem(element.id)} size="sm">
            <IconPlus stroke={1} className={classes['increment-btn-color']} />
          </ActionIcon>
        </Group>
      </Table.Td>
      <Table.Td>
        <Button
          variant="default"
          justify="center"
          fullWidth
          className={classes['remove-item-btn']}
          leftSection={<IconX size={18} stroke={1.5} />}
          onClick={() => removeItem(element.id)}
        >
          Remove
        </Button>
      </Table.Td>
    </Table.Tr>
  ));

  const historyRows = Object.values(cartDetails ?? {}).map((element: CartEntry) => (
    <Table.Tr key={element._id}>
      <Table.Td>
        <Group>
          <Image
            src={element.image}
            w={80}
            h={80}
            fallbackSrc="https://placehold.co/600x400?text=Placeholder"
            radius="md"
            fit="fill"
          />
          {element.name}
        </Group>
      </Table.Td>
      <Table.Td>${element.price}</Table.Td>
      <Table.Td> {element.date}</Table.Td>
    </Table.Tr>
  ));

  return (
    <Tabs
      value={activeTab}
      variant="none"
      onChange={(value: string | null) => setActiveTab(value || 'cart')}
      maw={1500}
    >
      <Tabs.List mb={20}>
        <Tabs.Tab
          value="cart"
          className={clsx(classes['default-tab'], {
            [classes['active-tab']]: activeTab === 'cart',
            [classes['not-active-tab']]: activeTab === 'history',
          })}
        >
          My cart
        </Tabs.Tab>
        <Tabs.Tab
          value="history"
          className={clsx(classes['default-tab'], {
            [classes['active-tab']]: activeTab === 'history',
            [classes['not-active-tab']]: activeTab === 'cart',
          })}
        >
          History
        </Tabs.Tab>
      </Tabs.List>

      {cartCount && cartCount > 0 ? (
        <>
          <Tabs.Panel value="cart">
            <Group
              grow
              preventGrowOverflow={false}
              gap={78}
              style={{ alignItems: 'start', justifyContent: 'space-between' }}
            >
              <Table w="50%">
                <Table.Thead c="#767676" bd={0}>
                  <Table.Tr>
                    <Table.Th fw={400} fz={16}>
                      Item
                    </Table.Th>
                    <Table.Th fw={400} fz={16}>
                      Unit price
                    </Table.Th>
                    <Table.Th fw={400} fz={16}>
                      Quantity
                    </Table.Th>
                  </Table.Tr>
                </Table.Thead>
                <Table.Tbody>{rows}</Table.Tbody>
              </Table>
              <Card radius="md" maw={320} style={{ border: '1px solid #ECECEE' }}>
                <Group justify="space-between" mt="md" mb="xs">
                  <Title fw={700} fz={20}>
                    Summary
                  </Title>
                </Group>

                <Group justify="space-between" mt="md" mb="xs">
                  <Text fw={500}>Total price</Text>${totalPrice}
                </Group>

                <Button color="blue" fullWidth mt="md" radius="md" onClick={() => router.replace(RoutePath.Checkout)}>
                  Proceed to checkout
                </Button>
              </Card>
            </Group>
          </Tabs.Panel>

          <Tabs.Panel value="history">
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
          </Tabs.Panel>
        </>
      ) : (
        <EmptyCart />
      )}
    </Tabs>
  );
};

export default CartItems;
