import { useRef } from 'react';
import React, { NextPage } from 'next';
import Head from 'next/head';
import { Button, Group, Image, Stack, TextInput, Title } from '@mantine/core';
import { Dropzone, FileWithPath, IMAGE_MIME_TYPE } from '@mantine/dropzone';
import { showNotification } from '@mantine/notifications';
import { zodResolver } from '@hookform/resolvers/zod';
import { Controller, useForm } from 'react-hook-form';

import { productApi } from 'resources/product';

import { ImagePlaceholder } from 'public/images';

import { handleApiError } from 'utils';

import queryClient from 'query-client';

import { createProductSchema } from 'schemas';
import { CreateProductParams } from 'types';

const CreateProduct: NextPage = () => {
  const {
    register,
    handleSubmit,
    setError,
    setValue,
    reset,
    formState: { errors, isDirty },
    control,
  } = useForm<CreateProductParams>({
    resolver: zodResolver(createProductSchema),
  });

  const { mutate: createProduct, isPending: isUpdatePending } = productApi.useCreate();
  const { mutate: uploadPhoto } = productApi.useUploadPhoto<FormData>();

  const onSubmit = (submitData: CreateProductParams) => {
    if (!submitData.image) {
      showNotification({
        title: 'Error',
        message: 'Please upload an image before submitting.',
        color: 'red',
      });
      return;
    }

    createProduct(submitData, {
      onSuccess: (data) => {
        queryClient.setQueryData(['product'], data);

        showNotification({
          title: 'Success',
          message: 'Your product has been successfully created.',
          color: 'green',
        });

        reset(submitData, { keepDirtyValues: true });

        setValue('price', 0);
        setValue('name', '');
        setValue('image', null);
      },
      onError: (e) => handleApiError(e, setError),
    });
  };

  const handlePhotoUpload = async ([imageFile]: FileWithPath[]) => {
    const body = new FormData();
    body.append('file', imageFile, imageFile.name);
    uploadPhoto(body, {
      onSuccess: (data) => {
        setValue('image', data.image);
      },
      onError: (e) => handleApiError(e),
    });
  };

  const openRef = useRef<() => void>(null);

  return (
    <>
      <Head>
        <title>Create new product</title>
      </Head>

      <Stack w={408} pt={48} gap={32}>
        <Title order={1}>Create new product</Title>

        <form onSubmit={handleSubmit(onSubmit)}>
          <Stack gap={32}>
            <Stack gap={20}>
              <Group justify="center" mt="md">
                <Dropzone openRef={openRef} onDrop={handlePhotoUpload} maxSize={3 * 1024 ** 2} accept={IMAGE_MIME_TYPE}>
                  <Group>
                    <Controller
                      name="image"
                      control={control}
                      render={({ field }) =>
                        field.value ? <Image src={field.value} alt="Uploaded image" /> : <ImagePlaceholder />
                      }
                    />
                  </Group>
                </Dropzone>
                <Button variant="default" radius="md" c="#767676" size="md" onClick={() => openRef.current?.()}>
                  Upload photo
                </Button>
              </Group>
              <Group mt="md" />

              <TextInput {...register('name')} label="Title of the product" size="md" error={errors.name?.message} />
              <TextInput
                {...register('price', { valueAsNumber: true, min: '0' })}
                name="price"
                error={errors.price?.message}
                label="Price"
              />
            </Stack>

            <Button type="submit" color="blue" radius="md" loading={isUpdatePending} disabled={!isDirty}>
              Upload Product
            </Button>
          </Stack>
        </form>
      </Stack>
    </>
  );
};

export default CreateProduct;
