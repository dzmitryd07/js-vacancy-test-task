import { z } from 'zod';

import { createProductSchema, productSchema } from 'schemas';

export type Product = z.infer<typeof productSchema>;

export type CreateProductParams = z.infer<typeof createProductSchema>;
