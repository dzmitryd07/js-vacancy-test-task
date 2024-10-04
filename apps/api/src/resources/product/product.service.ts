import _ from 'lodash';

import db from 'db';

import { DATABASE_DOCUMENTS } from 'app-constants';
import { productSchema } from 'schemas';
import { Product } from 'types';

const service = db.createService<Product>(DATABASE_DOCUMENTS.PRODUCTS, {
  schemaValidator: (obj) => productSchema.parseAsync(obj),
});

const getPublic = (product: Product | null) => _.omit(product);

export default Object.assign(service, {
  getPublic,
});
