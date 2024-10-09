import React, { FC, useState } from 'react';
import Head from 'next/head';
import { Stack, Tabs } from '@mantine/core';
import clsx from 'clsx';
import { useShoppingCart } from 'use-shopping-cart';
import { CartEntry } from 'use-shopping-cart/core';

import { accountApi } from 'resources/account';
import { sessionApi } from 'resources/session';

import CartItems from './components/CartItems';
import EmptyCart from './components/EmptyCart';
import HistoryTab from './components/HistoryTab';

import classes from './index.module.css';

const Cart: FC = () => {
  const [activeTab, setActiveTab] = useState<string | null>('cart');
  const { cartCount, cartDetails, totalPrice, removeItem, incrementItem, decrementItem } = useShoppingCart();
  const { data: account } = accountApi.useGet();
  const sessions = sessionApi.useListCheckoutSessions({ customer_details: { email: account?.email } });
  return (
    <>
      <Head>
        <title>Cart</title>
      </Head>

      <Stack align="stretch">
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

          <Tabs.Panel value="cart">
            {cartCount && cartCount > 0 ? (
              <CartItems
                cartDetails={(cartDetails || []) as CartEntry[]}
                totalPrice={totalPrice ?? 0}
                removeItem={removeItem}
                incrementItem={incrementItem}
                decrementItem={decrementItem}
              />
            ) : (
              <EmptyCart />
            )}
          </Tabs.Panel>

          <Tabs.Panel value="history">
            <HistoryTab sessions={sessions} />
          </Tabs.Panel>
        </Tabs>
      </Stack>
    </>
  );
};

export default Cart;
