import React from 'react';
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import {
  clearCart,
  decrementQuantity,
  incrementQuantity,
  removeFromCart,
  selectCartItems,
  selectCartTotalPrice,
  selectCartTotalQuantity,
  updateQuantity,
} from './cartSlice';

export const CartSection: React.FC = () => {
  const dispatch = useAppDispatch();
  const cartItems = useAppSelector(selectCartItems);
  const totalQuantity = useAppSelector(selectCartTotalQuantity);
  const totalPrice = useAppSelector(selectCartTotalPrice);

  const handleQuantityChange = (id: number, e: React.ChangeEvent<HTMLInputElement>) => {
    const val = parseInt(e.target.value, 10);
    if (isNaN(val) || val <= 0) {
      dispatch(updateQuantity({ id, quantity: 0 }));
    } else {
      dispatch(updateQuantity({ id, quantity: val }));
    }
  };

  return (
    <div className="bg-white border border-gray-200 rounded-lg p-5 sticky top-20 shadow-xs">
      <div className="flex items-center justify-between pb-3 border-b border-gray-200">
        <h2 className="text-base font-bold text-gray-800">
          Giỏ Hàng
        </h2>
        <span className="text-xs font-semibold px-2 py-0.5 bg-blue-50 text-blue-700 rounded-full">
          {totalQuantity} món
        </span>
      </div>

      {cartItems.length === 0 ? (
        <div className="py-10 text-center text-xs text-gray-400">
          Chưa có sản phẩm nào trong giỏ hàng.
        </div>
      ) : (
        <div className="divide-y divide-gray-100">
          <div className="py-2 max-h-96 overflow-y-auto space-y-3">
            {cartItems.map((item) => (
              <div key={item.id} className="pt-2 first:pt-0">
                <div className="flex justify-between items-start">
                  <div>
                    <h4 className="text-xs font-semibold text-gray-800 line-clamp-1">
                      {item.title}
                    </h4>
                    <span className="text-xs text-gray-500">
                      ${item.price} x {item.quantity} ={' '}
                      <span className="font-semibold text-gray-800">
                        ${item.price * item.quantity}
                      </span>
                    </span>
                  </div>

                  <button
                    type="button"
                    onClick={() => dispatch(removeFromCart(item.id))}
                    className="text-xs text-red-500 hover:text-red-700 hover:underline cursor-pointer ml-2"
                  >
                    Xoá
                  </button>
                </div>

                {/* Quantity Controls */}
                <div className="flex items-center gap-1 mt-2">
                  <button
                    type="button"
                    onClick={() => dispatch(decrementQuantity(item.id))}
                    className="w-6 h-6 flex items-center justify-center border border-gray-300 rounded text-xs hover:bg-gray-100 cursor-pointer"
                  >
                    -
                  </button>
                  <input
                    type="number"
                    min="1"
                    value={item.quantity}
                    onChange={(e) => handleQuantityChange(item.id, e)}
                    className="w-10 h-6 text-center text-xs border border-gray-300 rounded focus:outline-none focus:border-blue-500"
                  />
                  <button
                    type="button"
                    onClick={() => dispatch(incrementQuantity(item.id))}
                    className="w-6 h-6 flex items-center justify-center border border-gray-300 rounded text-xs hover:bg-gray-100 cursor-pointer"
                  >
                    +
                  </button>
                </div>
              </div>
            ))}
          </div>

          {/* Cart Footer */}
          <div className="pt-4 mt-2 border-t border-gray-200">
            <div className="flex justify-between text-sm font-bold text-gray-900 mb-3">
              <span>Tổng cộng:</span>
              <span className="text-blue-600">${totalPrice.toLocaleString()}</span>
            </div>

            <div className="flex gap-2">
              <button
                type="button"
                onClick={() => dispatch(clearCart())}
                className="w-1/2 py-1.5 px-2 border border-gray-300 text-gray-600 hover:bg-gray-50 rounded text-xs font-medium cursor-pointer"
              >
                Xoá tất cả
              </button>
              <button
                type="button"
                onClick={() => {
                  alert(`Đặt hàng thành công! Tổng tiền: $${totalPrice.toLocaleString()}`);
                  dispatch(clearCart());
                }}
                className="w-1/2 py-1.5 px-2 bg-blue-600 hover:bg-blue-700 text-white rounded text-xs font-medium cursor-pointer"
              >
                Thanh toán
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
