import React, { useState } from 'react';
import { NextPage } from 'next';
import Head from 'next/head';
import { Stack } from '@mantine/core';

import CartItems from './components/CartItems';

const Products: NextPage = () => {
  const [activeTab, setActiveTab] = useState<string | null>('cart');

  return (
    <>
      <Head>
        <title>Cart</title>
      </Head>

      <Stack align="stretch">
        <CartItems activeTab={activeTab} setActiveTab={setActiveTab} />
      </Stack>
    </>
  );
};

export default Products;
