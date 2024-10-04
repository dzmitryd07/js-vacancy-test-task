import React, { FC, memo } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useRouter } from 'next/router';
import { ActionIcon, Anchor, AppShell, Button, Group, Indicator } from '@mantine/core';
import { useShoppingCart } from 'use-shopping-cart';

import { accountApi } from 'resources/account';

import { CartIcon, LogoImage, SignoutIcon } from 'public/images';

import { RoutePath } from 'routes';

import ShadowLoginBanner from './components/ShadowLoginBanner';

import classes from './index.module.css';

const Header: FC = () => {
  const { data: account } = accountApi.useGet();
  const { mutate: signOut } = accountApi.useSignOut();
  const router = useRouter();
  const { cartCount } = useShoppingCart();
  const path = usePathname();

  if (!account) return null;

  return (
    <AppShell.Header bd={0} px={48} bg="#FCFCFC" h={100} py={35}>
      {account.isShadow && <ShadowLoginBanner email={account.email} />}

      <Group justify="space-between">
        <Anchor component={Link} href={RoutePath.Home}>
          <LogoImage />
        </Anchor>

        <Group>
          <Button
            variant="default"
            component="a"
            onClick={() => router.replace(RoutePath.Home)}
            radius="xl"
            size="md"
            className={path === RoutePath.Home ? classes['btn-active'] : classes.btn}
          >
            Marketplace
          </Button>
          <Button
            variant="default"
            component="a"
            onClick={() => router.replace(RoutePath.Products)}
            className={
              path === RoutePath.Products || path === RoutePath.CreateProduct ? classes['btn-active'] : classes.btn
            }
            radius="xl"
            size="md"
          >
            Your Products
          </Button>
        </Group>

        <Group>
          <ActionIcon onClick={() => router.replace(RoutePath.Cart)} size="xl" variant="transparent" w={40}>
            <Indicator label={cartCount} size={16} offset={6} position="top-end" color="blue">
              <CartIcon />
            </Indicator>
          </ActionIcon>

          <ActionIcon onClick={() => signOut()} size="xl" variant="transparent">
            <SignoutIcon />
          </ActionIcon>
        </Group>
      </Group>
    </AppShell.Header>
  );
};

export default memo(Header);
