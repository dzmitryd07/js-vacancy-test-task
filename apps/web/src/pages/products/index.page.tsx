import React, { useState } from 'react';
import { NextPage } from 'next';
import Head from 'next/head';
import { useRouter } from 'next/router';
import { Card, Center, Group, Pagination, Stack, Text, Title } from '@mantine/core';
import { useSetState } from '@mantine/hooks';
import { IconCirclePlusFilled } from '@tabler/icons-react';

import { accountApi } from 'resources/account';
import { productApi } from 'resources/product';
import { ProductsListParams } from 'resources/product/product.api';

import { ProductCard } from 'components';

import { RoutePath } from 'routes';

import { Product } from 'types';

import classes from './index.module.css';

const Products: NextPage = () => {
  const { data: account } = accountApi.useGet();
  const [params, setParams] = useSetState<ProductsListParams>({
    perPage: 7,
    filter: { userId: account?._id },
  });

  const { data: products } = productApi.useList(params);

  const [activePage, setPage] = useState(1);

  const router = useRouter();

  return (
    <>
      <Head>
        <title>Your products</title>
      </Head>

      <Title fz={20} fw={600} mb={20}>
        Your Products
      </Title>

      <Group>
        <Card
          className={classes['add-new-product-card']}
          shadow="0"
          radius="md"
          withBorder
          onClick={() => router.replace(RoutePath.CreateProduct)}
        >
          <Center h="100%">
            <Stack align="center" gap={12}>
              <IconCirclePlusFilled color="#2B77EB" width={40} height={40} />
              <Text fz={20} fw={400} c="#2B77EB">
                New Product
              </Text>
            </Stack>
          </Center>
        </Card>

        {account &&
          products?.results.map((product: Product) => (
            <ProductCard
              key={product._id}
              product={product}
              userId={account?._id}
              // handleProductRemove={() => handleProductRemove(product?._id)}
            />
          ))}
      </Group>

      {products?.pagesCount && products?.pagesCount > 1 && (
        <Pagination
          total={products?.pagesCount || 0}
          value={activePage}
          onChange={(v) => {
            setParams({
              page: v,
            });
            setPage(v);
          }}
          mt="sm"
          color="blue"
        />
      )}
    </>
  );
};

export default Products;
