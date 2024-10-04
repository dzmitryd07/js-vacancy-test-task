import { z } from 'zod';

import { productService } from 'resources/product';

import { validateMiddleware } from 'middlewares';
import { stringUtil } from 'utils';

import { paginationSchema } from 'schemas';
import { AppKoaContext, AppRouter, NestedKeys, Product } from 'types';

const schema = paginationSchema.extend({
  filter: z
    .object({
      price: z
        .object({
          startPrice: z.coerce.number().optional(),
          endPrice: z.coerce.number().optional(),
        })
        .optional(),
      name: z.enum(['asc', 'desc']).optional(),
      userId: z.string().optional(),
    })
    .optional(),
  sort: z
    .object({
      createdOn: z.enum(['asc', 'desc']).default('asc'),
    })
    .default({}),
});

type ValidatedData = z.infer<typeof schema>;

async function handler(ctx: AppKoaContext<ValidatedData>) {
  const { perPage, page, sort, searchValue, filter } = ctx.validatedData;

  const filterOptions = [];

  if (searchValue) {
    const searchPattern = stringUtil.escapeRegExpString(searchValue);

    const searchFields: NestedKeys<Product>[] = ['name'];

    filterOptions.push({
      $or: searchFields.map((field) => ({ [field]: { $regex: searchPattern } })),
    });
  }

  if (filter) {
    const { price, userId, ...otherFilters } = filter;

    if (userId) {
      filterOptions.push({
        userId,
      });
    }

    if (price) {
      const { startPrice = 0, endPrice = 0 } = price;

      filterOptions.push({
        price: {
          ...(startPrice >= 0 && { $gte: startPrice }),
          ...(endPrice > 0 && { $lt: endPrice }),
        },
      });
    }

    Object.entries(otherFilters).forEach(([key, value]) => {
      filterOptions.push({ [key]: value });
    });
  }

  const result = await productService.find(
    { ...(filterOptions.length && { $and: filterOptions }) },
    { page, perPage },
    { sort },
  );

  ctx.body = { ...result, results: result.results.map(productService.getPublic) };
}

export default (router: AppRouter) => {
  router.get('/', validateMiddleware(schema), handler);
};
