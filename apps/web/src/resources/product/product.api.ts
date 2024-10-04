import { DateValue } from '@mantine/dates';
import { useMutation, useQuery } from '@tanstack/react-query';

import { apiService } from 'services';

import queryClient from 'query-client';

import { ApiError, ListParams, ListResult, Product, SortOrder } from 'types';

export type ProductsListFilterParams = {
  name?: SortOrder;
  price?: {
    startPrice: number | string;
    endPrice: number | string;
  };
  userId?: string;
};

export type ProductsListSortParams = {
  createdOn?: {
    startDate: DateValue;
    endDate: DateValue;
  };
};

export type ProductsListParams = ListParams<ProductsListFilterParams, ProductsListSortParams>;

export const useList = <T extends ProductsListParams>(params: T) =>
  useQuery<ListResult<Product>>({
    queryKey: ['products', params],
    queryFn: () => apiService.get('/products', params),
  });

export const useCreate = <T>() =>
  useMutation<Product, ApiError, T>({
    mutationFn: (data: T) => apiService.post('/products/create', data),
    onSuccess: (data) => {
      queryClient.setQueryData(['product'], data);
    },
  });

export const useUploadPhoto = <T>() =>
  useMutation<Product, ApiError, T>({
    mutationFn: (data: T) => apiService.post('/products/upload-photo', data),
    onSuccess: (data) => {
      queryClient.setQueryData(['products'], data);
    },
  });

export const useRemoveProduct = <T>() =>
  useMutation<Product, ApiError, T>({
    mutationFn: (data: T) => apiService.delete(`/products/${data}`),
    onSuccess: (data) => {
      queryClient.setQueryData(['products'], data);
    },
  });
