import React from 'react';
import { X, ShoppingCart, ArrowRight, Trash2 } from 'lucide-react';
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import {
  clearCart,
  selectCartItems,
  selectCartTotalPrice,
  selectCartTotalQuantity,
  selectIsCartOpen,
  setCartOpen,
} from './cartSlice';
import { CartItemRow } from './CartItemRow';

export const CartDrawer: React.FC = () => {
  const dispatch = useAppDispatch();
  const isOpen = useAppSelector(selectIsCartOpen);
  const items = useAppSelector(selectCartItems);
  const totalQuantity = useAppSelector(selectCartTotalQuantity);
  const totalPrice = useAppSelector(selectCartTotalPrice);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 overflow-hidden">
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-slate-900/60 backdrop-blur-xs transition-opacity"
        onClick={() => dispatch(setCartOpen(false))}
        aria-hidden="true"
      />

      {/* Slide-over panel */}
      <div className="fixed inset-y-0 right-0 max-w-full flex pl-10">
        <div className="w-screen max-w-md bg-white shadow-2xl flex flex-col">
          {/* Header */}
          <div className="px-6 py-5 border-b border-slate-200 flex items-center justify-between">
            <div className="flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-lg bg-indigo-50 text-indigo-600 flex items-center justify-center">
                <ShoppingCart className="w-4 h-4" />
              </div>
              <h2 className="text-lg font-bold text-slate-900">
                Giỏ hàng của bạn
              </h2>
              <span className="px-2 py-0.5 rounded-full bg-slate-100 text-xs font-semibold text-slate-600">
                {totalQuantity}
              </span>
            </div>

            <button
              type="button"
              onClick={() => dispatch(setCartOpen(false))}
              className="p-2 text-slate-400 hover:text-slate-700 hover:bg-slate-100 rounded-lg transition-colors cursor-pointer"
              aria-label="Đóng giỏ hàng"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Cart Content */}
          <div className="flex-1 overflow-y-auto px-6 divide-y divide-slate-100">
            {items.length === 0 ? (
              <div className="h-full flex flex-col items-center justify-center text-center py-16">
                <div className="w-16 h-16 rounded-2xl bg-slate-100 text-slate-400 flex items-center justify-center mb-4">
                  <ShoppingCart className="w-8 h-8 stroke-1" />
                </div>
                <h3 className="text-base font-semibold text-slate-800">
                  Giỏ hàng còn trống
                </h3>
                <p className="text-xs text-slate-500 mt-1 max-w-xs">
                  Bạn chưa có sản phẩm nào trong giỏ hàng. Hãy chọn cho mình những món đồ ưng ý nhé!
                </p>
                <button
                  type="button"
                  onClick={() => dispatch(setCartOpen(false))}
                  className="mt-6 px-5 py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white text-xs font-semibold transition-colors cursor-pointer shadow-sm"
                >
                  Khám phá sản phẩm ngay
                </button>
              </div>
            ) : (
              <div className="py-2">
                {items.map((item) => (
                  <CartItemRow key={item.id} item={item} />
                ))}
              </div>
            )}
          </div>

          {/* Footer / Summary */}
          {items.length > 0 && (
            <div className="p-6 border-t border-slate-200 bg-slate-50/60 space-y-4">
              <div className="space-y-2 text-xs">
                <div className="flex justify-between text-slate-500">
                  <span>Tạm tính</span>
                  <span className="font-semibold text-slate-800">
                    ${totalPrice.toLocaleString()}
                  </span>
                </div>
                <div className="flex justify-between text-slate-500">
                  <span>Phí vận chuyển</span>
                  <span className="font-semibold text-emerald-600">Miễn phí</span>
                </div>
                <div className="pt-2 border-t border-slate-200 flex justify-between text-base font-bold text-slate-900">
                  <span>Tổng thanh toán</span>
                  <span className="text-indigo-600">
                    ${totalPrice.toLocaleString()}
                  </span>
                </div>
              </div>

              <div className="flex gap-2.5 pt-2">
                {/* Clear cart button */}
                <button
                  type="button"
                  onClick={() => dispatch(clearCart())}
                  className="flex items-center justify-center gap-1.5 px-3.5 py-3 rounded-xl border border-rose-200 text-rose-600 hover:bg-rose-50 text-xs font-semibold transition-colors cursor-pointer"
                  title="Xoá tất cả sản phẩm khỏi giỏ"
                >
                  <Trash2 className="w-4 h-4" />
                  Xoá hết
                </button>

                {/* Checkout button */}
                <button
                  type="button"
                  onClick={() => {
                    alert(
                      `Đặt hàng thành công! Tổng số tiền là: $${totalPrice.toLocaleString()}`
                    );
                    dispatch(clearCart());
                    dispatch(setCartOpen(false));
                  }}
                  className="flex-1 flex items-center justify-center gap-2 py-3 px-4 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white font-semibold text-xs transition-colors shadow-md shadow-indigo-200 cursor-pointer"
                >
                  <span>Thanh toán ngay</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
