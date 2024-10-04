import { productService } from 'resources/product';

import { validateMiddleware } from 'middlewares';

import { createProductSchema } from 'schemas';
import { AppKoaContext, AppRouter, CreateProductParams, Next } from 'types';

async function validator(ctx: AppKoaContext, next: Next) {
  await next();
}

async function handler(ctx: AppKoaContext<CreateProductParams>) {
  const { user } = ctx.state;
  const { name, price, image } = ctx.validatedData;

  const createdProduct = await productService.insertOne({
    price,
    name,
    image,
    userId: user._id,
  });

  ctx.body = productService.getPublic(createdProduct);
  ctx.status = 201;
}

export default (router: AppRouter) => {
  router.post('/create', validator, validateMiddleware(createProductSchema), handler);
};
