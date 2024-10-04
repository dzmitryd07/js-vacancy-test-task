import React, { FC, ReactElement } from 'react';
import { AppShell, Stack } from '@mantine/core';

import { accountApi } from 'resources/account';

import Header from './Header';

interface MainLayoutProps {
  children: ReactElement;
}

const MainLayout: FC<MainLayoutProps> = ({ children }) => {
  const { data: account } = accountApi.useGet();

  if (!account) return null;

  return (
    <AppShell component={Stack} bg="#FCFCFC">
      <Header />

      <AppShell.Main p={48} pt={account.isShadow ? 144 : 124}>
        {children}
      </AppShell.Main>
    </AppShell>
  );
};

export default MainLayout;
