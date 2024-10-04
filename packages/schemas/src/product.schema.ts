import { z } from 'zod';

import dbSchema from './db.schema';

export const productSchema = dbSchema.extend({
  name: z.string(),
  price: z.number(),
  userId: z.string(),
  image: z.string().nullable().optional(),
});

export const createProductSchema = productSchema
  .extend({
    name: z.string(),
    price: z.number(),
    image: z.string().nullable().optional(),
  })
  .partial();
