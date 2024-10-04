import React, { FC, useMemo } from 'react';
import { Button, Card, Group, Image, NumberFormatter, Text } from '@mantine/core';
// import { IconTrash } from '@tabler/icons-react';
import clsx from 'clsx';
import { useShoppingCart } from 'use-shopping-cart';

// import { productApi } from 'resources/product';
import { Product } from 'types';

import classes from './index.module.css';

interface ProductCardProps {
  product: Product;
  userId: string | null;
  // handleProductRemove: () => void;
}

const ProductCard: FC<ProductCardProps> = ({ product, userId }) => {
  const { addItem, cartDetails } = useShoppingCart();
  // const { mutate: removeProduct } = productApi.useRemoveProduct();
  // const handleProductRemove = async () => {
  //   removeProduct(product?._id);
  // };

  const isProductInCart = useMemo(() => {
    if (
      Object.values(cartDetails ?? {})
        .map(({ _id }) => _id)
        .includes(product?._id)
    ) {
      return true;
    }
    return false;
  }, [cartDetails]);

  return (
    <Card shadow="0" radius="md" withBorder w={320}>
      <Card.Section>
        {/* {userId === product?.userId && (
          <ActionIcon variant="default" onClick={handleProductRemove}>
            <IconTrash stroke={1} />
          </ActionIcon>
        )} */}
        <Image mih={220} src={product.image} height={160} alt="Norway" />
      </Card.Section>

      <Group justify="space-between" mt="md" mb="xs">
        <Text className={clsx(classes['black-color'], classes['fw-700'])}>{product.name}</Text>
      </Group>

      <Group justify="space-between">
        <Text size="sm" className={clsx(classes['light-gray-color'], classes['fw-500'])} fz="14px">
          Price:
        </Text>
        <Text size="sm" className={classes['product-color']} fw="700" fz="20px">
          <NumberFormatter prefix="$" value={product.price} thousandSeparator />
        </Text>
      </Group>

      {userId !== product?.userId && (
        <Button
          className={classes.button}
          color="blue"
          fullWidth
          mt="md"
          radius="md"
          onClick={() => addItem({ ...product, sku: '', currency: 'USD', image: product.image ?? undefined })}
          disabled={isProductInCart}
        >
          {!isProductInCart ? 'Add to cart' : 'In cart'}
        </Button>
      )}
    </Card>
  );
};

export default ProductCard;
