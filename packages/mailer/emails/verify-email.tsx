import React, { FC } from 'react';
import { Text } from '@react-email/components';

import Button from './_components/button';
import Layout from './_layout';

export interface VerifyEmailProps {
  href: string;
}

export const VerifyEmail: FC<VerifyEmailProps> = ({ href = 'https://ship.paralect.com' }) => (
  <Layout previewText="Welcome on board the Shopy!">
    <Text>Dear user,</Text>

    <Text>Welcome to Ship! We are excited to have you on board.</Text>

    <Text>
      Before we get started, we just need to verify your email address. This is to ensure that you have access to all
      our features and so we can send you important account notifications.
    </Text>

    <Text>Please verify your account by clicking the button below:</Text>

    <Button href={href}>Verify email</Button>
  </Layout>
);

export default VerifyEmail;
