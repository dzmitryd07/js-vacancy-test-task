import React, { FC } from 'react';
import { useRouter } from 'next/router';
import { Button, Center, Group, Stack, Text, Title } from '@mantine/core';

import { EmptyCartImage } from 'public/images';

import { RoutePath } from 'routes';

const EmptyCart: FC = () => {
  const router = useRouter();

  return (
    <Center h="40vh">
      <Group h="auto" w="480px">
        <Stack justify="center" m="auto" align="center" gap={0}>
          <Group mb={32}>
            <EmptyCartImage />
          </Group>

          <Title order={2} mb={16}>
            Oops, there&apos;s nothing here yet!
          </Title>

          <Text mb={32} c="#767676" ta="center">
            You haven&apos;t made any purchases yet. Go to the marketplace and make purchases.
          </Text>
          <Group>
            <Button onClick={() => router.replace(RoutePath.Home)} color="#2B77EB" radius="md">
              Go to Marketplace
            </Button>
          </Group>
        </Stack>
      </Group>
    </Center>
  );
};

export default EmptyCart;
