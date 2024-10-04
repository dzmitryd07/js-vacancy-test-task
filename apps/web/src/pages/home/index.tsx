import React, { useCallback, useState } from 'react';
import { NextPage } from 'next';
import Head from 'next/head';
import { Badge, Group, Pagination, Stack } from '@mantine/core';
import { useInputState, useSetState } from '@mantine/hooks';

import { accountApi } from 'resources/account';
import { productApi, ProductsListParams } from 'resources/product';

import { ProductCard } from 'components';

import { CloseIcon } from 'public/images';

import { Product } from 'types';

import Filters from './components/Filters';
import PriceFilter from './components/PriceFilter';
import { DEFAULT_PARAMS } from './constants';

import classes from './index.module.css';

const Home: NextPage = () => {
  const [params, setParams] = useSetState<ProductsListParams>(DEFAULT_PARAMS);
  const { data: products } = productApi.useList(params);
  const { data: account } = accountApi.useGet();
  const [activePage, setPage] = useState(1);
  const [startPrice, setStartPrice] = useInputState<string | number>('');
  const [endPrice, setEndPrice] = useInputState<string | number>('');

  const handleResetFilter = useCallback(() => {
    setStartPrice('');
    setEndPrice('');
    setParams((prevParams) => ({
      ...prevParams,
      filter: undefined,
    }));
  }, [setParams]);

  const handleFilterPriceChange = useCallback(
    (value: string | number, type: 'start' | 'end') => {
      if (type === 'start') {
        setStartPrice(typeof value === 'string' ? 0 : value);
      } else {
        setEndPrice(value);
      }

      if (startPrice === 0 && endPrice === 0) {
        setParams((prevParams) => ({
          ...prevParams,
          filter: undefined,
        }));
      } else {
        setParams({
          filter: {
            price: {
              startPrice: type === 'start' ? value : startPrice,
              endPrice: type === 'end' ? value : endPrice,
            },
          },
        });
      }
    },
    [setParams, startPrice, endPrice],
  );

  return (
    <>
      <Head>
        <title>Marketplace</title>
      </Head>

      <Group wrap="nowrap">
        <PriceFilter
          startPrice={startPrice}
          endPrice={endPrice}
          handlePriceChange={(value: string | number, type: 'start' | 'end') => handleFilterPriceChange(value, type)}
          handleResetFilter={handleResetFilter}
        />

        <Stack w="100%">
          <Filters setParams={setParams} totalProducts={products?.count || 0} />

          {startPrice && endPrice ? (
            <Badge variant="white" className={classes.badge}>
              <Group gap={4}>
                ${startPrice}-${endPrice}
                <CloseIcon onClick={handleResetFilter} />
              </Group>
            </Badge>
          ) : null}

          <Group align="center">
            {account &&
              products?.results.map((product: Product) => (
                <ProductCard key={product._id} userId={account?._id} product={product} />
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
        </Stack>
      </Group>
    </>
  );
};

export default Home;
