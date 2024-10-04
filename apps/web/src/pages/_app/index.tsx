import React, { FC } from 'react';
import { AppProps } from 'next/app';
import Head from 'next/head';
import { MantineProvider } from '@mantine/core';
import { ModalsProvider } from '@mantine/modals';
import { Notifications } from '@mantine/notifications';
import { QueryClientProvider } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import { CartProvider } from 'use-shopping-cart';

import theme from 'theme';

import queryClient from 'query-client';
import config from 'config';

import PageConfig from './PageConfig';

import '@mantine/core/styles.layer.css';
import '@mantine/dates/styles.layer.css';
import '@mantine/notifications/styles.layer.css';

const App: FC<AppProps> = ({ Component, pageProps }) => (
  <>
    <Head>
      <title>Shopy</title>
    </Head>

    <QueryClientProvider client={queryClient}>
      <MantineProvider theme={theme}>
        <ModalsProvider>
          <CartProvider
            mode="payment"
            cartMode="client-only"
            stripe={config.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY}
            successUrl={`${config.WEB_URL}/checkout/result`}
            cancelUrl={`${config.WEB_URL}/checkout/result`}
            currency="USD"
            shouldPersist
          >
            <PageConfig>
              <Component {...pageProps} />
            </PageConfig>
          </CartProvider>
        </ModalsProvider>

        <Notifications autoClose={10000} />
        <ReactQueryDevtools buttonPosition="bottom-left" />
      </MantineProvider>
    </QueryClientProvider>
  </>
);

export default App;
