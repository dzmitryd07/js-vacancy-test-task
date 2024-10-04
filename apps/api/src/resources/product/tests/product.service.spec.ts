import { Database } from '@paralect/node-mongo';

import { DATABASE_DOCUMENTS } from 'app-constants';
import { productSchema } from 'schemas';
import { Product } from 'types';

const database = new Database(process.env.MONGO_URL as string);

const productService = database.createService<Product>(DATABASE_DOCUMENTS.PRODUCTS, {
  schemaValidator: (obj) => productSchema.parseAsync(obj),
});

describe('Product service', () => {
  beforeAll(async () => {
    await database.connect();
  });

  beforeEach(async () => {
    await productService.deleteMany({});
  });

  it('should create product', async () => {
    const mockProduct = {
      _id: '123asdqwer',
      name: 'Personal computer',
      price: 100,
      image: 'https://dummyimage.com/300x200/000/fff',
      userId: '66f5a4787ad80bd51e7e6cf4',
    };

    await productService.insertOne(mockProduct);

    const insertedProduct = await productService.findOne({ _id: mockProduct._id });

    expect(insertedProduct).not.toBeNull();
  });

  afterAll(async () => {
    await database.close();
  });
});
