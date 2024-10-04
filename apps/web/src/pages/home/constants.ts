import { ProductsListParams, ProductsListSortParams } from 'resources/product';

export const DEFAULT_PAGE = 1;
export const PER_PAGE = 6;
export const EXTERNAL_SORT_FIELDS: Array<keyof ProductsListSortParams> = ['createdOn'];

export const DEFAULT_PARAMS: ProductsListParams = {
  page: DEFAULT_PAGE,
  searchValue: '',
  perPage: PER_PAGE,
  sort: {
    createdOn: 'desc',
  },
};
