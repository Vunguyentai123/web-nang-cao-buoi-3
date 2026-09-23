import { createSlice, createAsyncThunk, type PayloadAction } from '@reduxjs/toolkit';
import type { Product, ProductsState } from './types';
import { fetchProductsApi } from './productsApi';
import type { RootState } from '../../app/store';

const initialState: ProductsState = {
  items: [],
  status: 'idle',
  error: null,
  selectedCategory: 'Tất cả',
};

/**
 * Async Thunk xử lý gọi API giả lập nạp danh sách sản phẩm.
 * Xử lý đầy đủ 3 trạng thái: pending, fulfilled, rejected (với rejectWithValue kiểu string an toàn).
 */
export const fetchProducts = createAsyncThunk<
  Product[],
  boolean | undefined,
  { rejectValue: string }
>(
  'products/fetchProducts',
  async (shouldFail = false, { rejectWithValue }) => {
    try {
      const data = await fetchProductsApi(shouldFail);
      return data;
    } catch (error) {
      if (error instanceof Error) {
        return rejectWithValue(error.message);
      }
      return rejectWithValue('Đã xảy ra lỗi không mong muốn khi tải sản phẩm');
    }
  }
);

export const productsSlice = createSlice({
  name: 'products',
  initialState,
  reducers: {
    setSelectedCategory: (state, action: PayloadAction<string>) => {
      state.selectedCategory = action.payload;
    },
    resetProductsState: (state) => {
      state.items = [];
      state.status = 'idle';
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      // 1. Trạng thái Loading (pending)
      .addCase(fetchProducts.pending, (state) => {
        state.status = 'loading';
        state.error = null;
      })
      // 2. Trạng thái Thành công (fulfilled)
      .addCase(fetchProducts.fulfilled, (state, action: PayloadAction<Product[]>) => {
        state.status = 'succeeded';
        state.items = action.payload;
      })
      // 3. Trạng thái Thất bại/Lỗi (rejected)
      .addCase(fetchProducts.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload ?? action.error.message ?? 'Lỗi không xác định';
      });
  },
});

export const { setSelectedCategory, resetProductsState } = productsSlice.actions;

// Selectors
export const selectProducts = (state: RootState) => state.products.items;
export const selectProductsStatus = (state: RootState) => state.products.status;
export const selectProductsError = (state: RootState) => state.products.error;
export const selectSelectedCategory = (state: RootState) => state.products.selectedCategory;

export default productsSlice.reducer;
