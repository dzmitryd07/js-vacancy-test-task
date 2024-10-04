import React, { NextPage } from 'next';
import Head from 'next/head';
import { useRouter } from 'next/router';
import { Button, Center, Group, Stack, Text, Title } from '@mantine/core';

import { PaymentFailedIcon } from 'public/images';

import { RoutePath } from 'routes';

const PaymentFail: NextPage = () => {
  const { replace } = useRouter();
  return (
    <>
      <Head>
        <title>Payment Failed</title>
      </Head>

      <Center h="35vh">
        <Group
          h="auto"
          w="480px"
          style={{ borderRadius: '20px', top: '300px', padding: '20px', backgroundColor: 'white' }}
        >
          <Stack justify="center" m="auto" align="center" gap={0}>
            <Group mb={32}>
              <PaymentFailedIcon />
            </Group>

            <Title order={2} mb={16}>
              Payment Failed
            </Title>

            <Text mb={32} c="#767676" ta="center">
              Sorry, your payment failed!
              <br /> Would you like to try again?
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

export default PaymentFail;
