import React from 'react';
import { Minus, Plus, Trash2 } from 'lucide-react';
import type { CartItem } from './types';
import { useAppDispatch } from '../../app/hooks';
import {
  decrementQuantity,
  incrementQuantity,
  removeFromCart,
  updateQuantity,
} from './cartSlice';

interface CartItemRowProps {
  item: CartItem;
}

export const CartItemRow: React.FC<CartItemRowProps> = ({ item }) => {
  const dispatch = useAppDispatch();

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = parseInt(e.target.value, 10);
    if (isNaN(val) || val <= 0) {
      dispatch(updateQuantity({ id: item.id, quantity: 0 }));
    } else {
      dispatch(updateQuantity({ id: item.id, quantity: val }));
    }
  };

  return (
    <div className="flex items-center gap-4 py-4 border-b border-slate-100 last:border-0 group">
      {/* Thumbnail */}
      <div className="w-18 h-18 rounded-xl bg-slate-100 overflow-hidden shrink-0 border border-slate-200/60">
        <img
          src={item.image}
          alt={item.title}
          className="w-full h-full object-cover object-center"
        />
      </div>

      {/* Info */}
      <div className="flex-1 min-w-0">
        <h4 className="text-sm font-semibold text-slate-900 truncate">
          {item.title}
        </h4>
        <p className="text-xs text-slate-500 mt-0.5">
          ${item.price.toLocaleString()} / cái
        </p>

        {/* Quantity Controls */}
        <div className="mt-2.5 flex items-center gap-2">
          <div className="flex items-center border border-slate-200 rounded-lg bg-slate-50 overflow-hidden">
            <button
              type="button"
              onClick={() => dispatch(decrementQuantity(item.id))}
              className="w-7 h-7 flex items-center justify-center text-slate-600 hover:text-slate-900 hover:bg-slate-200 transition-colors cursor-pointer"
              title="Giảm số lượng (xoá nếu còn 1)"
              aria-label="Giảm số lượng"
            >
              <Minus className="w-3 h-3" />
            </button>

            <input
              type="number"
              min="1"
              value={item.quantity}
              onChange={handleInputChange}
              className="w-10 h-7 text-center text-xs font-semibold text-slate-800 bg-white border-x border-slate-200 focus:outline-none focus:ring-1 focus:ring-indigo-500"
              aria-label="Nhập số lượng"
            />

            <button
              type="button"
              onClick={() => dispatch(incrementQuantity(item.id))}
              className="w-7 h-7 flex items-center justify-center text-slate-600 hover:text-slate-900 hover:bg-slate-200 transition-colors cursor-pointer"
              title="Tăng số lượng"
              aria-label="Tăng số lượng"
            >
              <Plus className="w-3 h-3" />
            </button>
          </div>

          <button
            type="button"
            onClick={() => dispatch(removeFromCart(item.id))}
            className="p-1.5 text-slate-400 hover:text-rose-600 hover:bg-rose-50 rounded-lg transition-colors cursor-pointer"
            title="Xoá khỏi giỏ hàng"
            aria-label="Xoá khỏi giỏ hàng"
          >
            <Trash2 className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Item total price */}
      <div className="text-right shrink-0">
        <span className="text-sm font-bold text-slate-900">
          ${(item.price * item.quantity).toLocaleString()}
        </span>
      </div>
    </div>
  );
};
