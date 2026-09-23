import { createApi, fakeBaseQuery } from '@reduxjs/toolkit/query/react';
import type { Product } from './types';
import { MOCK_PRODUCTS } from './productsApi';

export interface RtkQueryError {
  status: string;
  data: string;
}

/**
 * RTK Query API slice triển khai lấy danh sách sản phẩm (tính năng điểm cộng).
 * Sử dụng fakeBaseQuery để giả lập API với trạng thái loading/lỗi/dữ liệu hoàn chỉnh.
 */
export const productsRtkApi = createApi({
  reducerPath: 'productsRtkApi',
  baseQuery: fakeBaseQuery<RtkQueryError>(),
  tagTypes: ['Product'],
  endpoints: (builder) => ({
    getProductsList: builder.query<Product[], { shouldFail?: boolean } | void>({
      queryFn: async (arg) => {
        const shouldFail = arg?.shouldFail ?? false;
        await new Promise((resolve) => setTimeout(resolve, 750));

        if (shouldFail) {
          return {
            error: {
              status: 'FETCH_ERROR',
              data: 'Lỗi RTK Query: Máy chủ tạm thời gián đoạn, vui lòng tải lại.',
            },
          };
        }

        return { data: MOCK_PRODUCTS };
      },
      providesTags: (result) =>
        result
          ? [
              ...result.map(({ id }) => ({ type: 'Product' as const, id })),
              { type: 'Product', id: 'LIST' },
            ]
          : [{ type: 'Product', id: 'LIST' }],
    }),
  }),
});

export const { useGetProductsListQuery } = productsRtkApi;
