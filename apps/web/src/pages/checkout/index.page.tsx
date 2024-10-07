import React from 'react';
import { NextPage } from 'next';
import Head from 'next/head';
import { Stack, Title } from '@mantine/core';
import { EmbeddedCheckout, EmbeddedCheckoutProvider } from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js';
import { useShoppingCart } from 'use-shopping-cart';

import { accountApi } from 'resources/account';
import { sessionApi } from 'resources/session';

import config from 'config';

const stripePromise = loadStripe(config.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY || '');

const CheckoutPage: NextPage = () => {
  const { cartDetails } = useShoppingCart();
  const { data: account } = accountApi.useGet();

  const lineItems = Object.values(cartDetails ?? {}).map((item) => ({
    price_data: {
      currency: 'usd',
      product_data: {
        name: item.name,
      },
      unit_amount: item.value * 100,
    },
    quantity: item.quantity,
  }));

  const session = sessionApi.useCreateSession({ lineItems, customer: { email: account?.email ?? '' } });

  return (
    <>
      <Head>
        <title>Checkout</title>
      </Head>

      <Stack w={400} fz={18} gap={24}>
        <Title order={1} mb={20}>
          Payment
        </Title>
        {session && (
          <EmbeddedCheckoutProvider stripe={stripePromise} options={{ clientSecret: session?.clientSecret }}>
            <EmbeddedCheckout />
          </EmbeddedCheckoutProvider>
        )}
      </Stack>
    </>
  );
};

export default CheckoutPage;
