import { createSlice, type PayloadAction } from '@reduxjs/toolkit';
import type { CartItem, CartState } from './types';
import type { Product } from '../products/types';
import type { RootState } from '../../app/store';

const initialState: CartState = {
  items: [],
  isOpen: false,
};

export const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    // Thêm sản phẩm vào giỏ hàng
    addToCart: (state, action: PayloadAction<Product>) => {
      const existingItem = state.items.find((item) => item.id === action.payload.id);
      if (existingItem) {
        existingItem.quantity += 1;
      } else {
        state.items.push({ ...action.payload, quantity: 1 });
      }
    },

    // Xoá sản phẩm khỏi giỏ hàng
    removeFromCart: (state, action: PayloadAction<number>) => {
      state.items = state.items.filter((item) => item.id !== action.payload);
    },

    // Cập nhật số lượng sản phẩm trong giỏ (nếu quantity <= 0 thì tự động xoá)
    updateQuantity: (
      state,
      action: PayloadAction<{ id: number; quantity: number }>
    ) => {
      const { id, quantity } = action.payload;
      if (quantity <= 0) {
        state.items = state.items.filter((item) => item.id !== id);
      } else {
        const item = state.items.find((i) => i.id === id);
        if (item) {
          item.quantity = quantity;
        }
      }
    },

    // Tăng 1 đơn vị số lượng
    incrementQuantity: (state, action: PayloadAction<number>) => {
      const item = state.items.find((i) => i.id === action.payload);
      if (item) {
        item.quantity += 1;
      }
    },

    // Giảm 1 đơn vị số lượng (nếu đang là 1 thì loại bỏ khỏi giỏ hàng)
    decrementQuantity: (state, action: PayloadAction<number>) => {
      const item = state.items.find((i) => i.id === action.payload);
      if (item) {
        if (item.quantity > 1) {
          item.quantity -= 1;
        } else {
          state.items = state.items.filter((i) => i.id !== action.payload);
        }
      }
    },

    // Xoá toàn bộ giỏ hàng
    clearCart: (state) => {
      state.items = [];
    },

    // Mở / đóng Drawer giỏ hàng
    setCartOpen: (state, action: PayloadAction<boolean>) => {
      state.isOpen = action.payload;
    },
    toggleCartOpen: (state) => {
      state.isOpen = !state.isOpen;
    },
  },
});

export const {
  addToCart,
  removeFromCart,
  updateQuantity,
  incrementQuantity,
  decrementQuantity,
  clearCart,
  setCartOpen,
  toggleCartOpen,
} = cartSlice.actions;

// Selectors
export const selectCartItems = (state: RootState): CartItem[] => state.cart.items;

export const selectCartTotalQuantity = (state: RootState): number =>
  state.cart.items.reduce((total, item) => total + item.quantity, 0);

export const selectCartTotalPrice = (state: RootState): number =>
  state.cart.items.reduce((total, item) => total + item.price * item.quantity, 0);

export const selectIsCartOpen = (state: RootState): boolean => state.cart.isOpen;

export default cartSlice.reducer;
