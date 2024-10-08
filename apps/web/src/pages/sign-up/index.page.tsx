import React, { useEffect, useState } from 'react';
import { NextPage } from 'next';
import Head from 'next/head';
import Link from 'next/link';
import {
  Anchor,
  Button,
  Checkbox,
  CheckboxProps,
  Group,
  PasswordInput,
  Stack,
  Text,
  TextInput,
  Title,
} from '@mantine/core';
import { zodResolver } from '@hookform/resolvers/zod';
import { IconCircleCheck } from '@tabler/icons-react';
import { useForm } from 'react-hook-form';

import { accountApi } from 'resources/account';

import { handleApiError } from 'utils';

import { RoutePath } from 'routes';
import config from 'config';

import { signUpSchema } from 'schemas';
import { SignUpParams } from 'types';

import classes from './index.module.css';

type SignUpResponse = { signupToken?: string };

const passwordRules = [
  {
    title: 'Must be at least 8 characters',
    done: false,
  },
  {
    title: 'Must contain at least 1 number',
    done: false,
  },
  {
    title: 'Must contain lover case and capital letters',
    done: false,
  },
];

const CheckboxIcon: CheckboxProps['icon'] = ({ ...others }) => <IconCircleCheck {...others} />;

const SignUp: NextPage = () => {
  const [email, setEmail] = useState<string | null>(null);
  const [signupToken, setSignupToken] = useState<string | null>(null);
  const [registered, setRegistered] = useState(false);

  const [passwordRulesData, setPasswordRulesData] = useState(passwordRules);

  const {
    register,
    handleSubmit,
    setError,
    watch,
    formState: { errors },
  } = useForm<SignUpParams>({ resolver: zodResolver(signUpSchema) });

  const passwordValue = watch('password', '').trim();

  useEffect(() => {
    const updatedPasswordRulesData = [...passwordRules];

    updatedPasswordRulesData[0].done = passwordValue.length >= 8;
    updatedPasswordRulesData[1].done = /\d/.test(passwordValue);
    updatedPasswordRulesData[2].done = /^(?=.*[a-z])(?=.*[A-Z]).+$/.test(passwordValue);

    setPasswordRulesData(updatedPasswordRulesData);
  }, [passwordValue]);

  const { mutate: signUp, isPending: isSignUpPending } = accountApi.useSignUp();

  const onSubmit = (data: SignUpParams) => {
    signUp(data, {
      onSuccess: (response: SignUpResponse) => {
        if (response.signupToken) setSignupToken(response.signupToken);

        setRegistered(true);
        setEmail(data.email);
      },
      onError: (e) => handleApiError(e, setError),
    });
  };

  if (registered) {
    return (
      <>
        <Head>
          <title>Sign up</title>
        </Head>

        <Stack w={450}>
          <Title order={2}>Thanks!</Title>

          <Text size="md" c="gray.6">
            Please follow the instructions from the email to complete a sign up process. We sent an email with a
            confirmation link to <b>{email}</b>
          </Text>

          {signupToken && (
            <Stack gap={0}>
              {/* <Text>You look like a cool developer.</Text> */}
              <Anchor size="sm" href={`${config.API_URL}/account/verify-email?token=${signupToken}`} target="_blank">
                Verify email
              </Anchor>
            </Stack>
          )}
        </Stack>
      </>
    );
  }

  return (
    <>
      <Head>
        <title>Sign up</title>
      </Head>

      <Stack w={400} gap={20}>
        <Stack gap={32}>
          <Title order={1}>Sign Up</Title>

          <form onSubmit={handleSubmit(onSubmit)}>
            <Stack gap={20}>
              <TextInput
                {...register('email')}
                label="Email Address"
                placeholder="Enter email Address"
                error={errors.email?.message}
                radius="md"
              />

              <PasswordInput
                {...register('password')}
                label="Password"
                placeholder="Enter password"
                error={errors.password?.message}
                radius="md"
              />

              <Stack gap={8}>
                {passwordRulesData.map((ruleData) => (
                  <Checkbox
                    icon={CheckboxIcon}
                    key={ruleData.title}
                    label={ruleData.title}
                    checked={ruleData.done}
                    indeterminate={!ruleData.done}
                    readOnly
                    variant="outline"
                    color={ruleData.done ? 'blue' : 'gray'}
                    size="md"
                    className={classes.checkbox}
                  />
                ))}
              </Stack>
            </Stack>

            <Button
              type="submit"
              radius="md"
              color="#2B77EB"
              loading={isSignUpPending}
              fullWidth
              mt={32}
              disabled={!passwordRulesData.every(({ done }) => done)}
            >
              Create account
            </Button>
          </form>
        </Stack>

        <Stack gap={32}>
          <Group justify="center" gap={12}>
            Have an account?
            <Anchor component={Link} href={RoutePath.SignIn} c="#2B77EB">
              Sign In
            </Anchor>
          </Group>
        </Stack>
      </Stack>
    </>
  );
};

export default SignUp;
