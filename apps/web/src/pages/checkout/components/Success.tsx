import React, { FC, useEffect } from 'react';
import Head from 'next/head';
import { useRouter } from 'next/router';
import { Button, Center, Group, Stack, Text, Title } from '@mantine/core';
import { useShoppingCart } from 'use-shopping-cart';

import { PaymentSuccessIcon } from 'public/images';

import { RoutePath } from 'routes';

const PaymentSuccess: FC = () => {
  const { replace } = useRouter();

  const { clearCart } = useShoppingCart();

  useEffect(() => {
    clearCart();
  }, []);

  return (
    <>
      <Head>
        <title>Payment Successfull</title>
      </Head>

      <Center h="35vh">
        <Group
          h="auto"
          w="480px"
          style={{ borderRadius: '20px', top: '300px', padding: '20px', backgroundColor: 'white' }}
        >
          <Stack justify="center" m="auto" align="center" gap={0}>
            <Group mb={32}>
              <PaymentSuccessIcon />
            </Group>

            <Title order={2} mb={16}>
              Payment Successfull
            </Title>

            <Text mb={32} c="#767676" ta="center">
              Hooray, you have completed your payment!
            </Text>
            <Group>
              <Button onClick={() => replace(RoutePath.Cart)} color="#2B77EB" radius="md">
                Back to Cart
              </Button>
            </Group>
          </Stack>
        </Group>
      </Center>
    </>
  );
};

export default PaymentSuccess;
