import React from 'react';
import { useAppSelector } from '../app/hooks';
import { selectCartTotalPrice, selectCartTotalQuantity } from '../features/cart/cartSlice';

export const Navbar: React.FC = () => {
  const totalQuantity = useAppSelector(selectCartTotalQuantity);
  const totalPrice = useAppSelector(selectCartTotalPrice);

  return (
    <header className="bg-white border-b border-gray-200">
      <div className="max-w-6xl mx-auto px-4 h-14 flex items-center justify-between">
        
        <div className="text-xs text-gray-700 bg-gray-50 border border-gray-200 px-3 py-1.5 rounded-md">
          Giỏ hàng: <span className="font-bold text-blue-600">{totalQuantity}</span> món | Tổng:{' '}
          <span className="font-bold text-blue-600">${totalPrice.toLocaleString()}</span>
        </div>
      </div>
    </header>
  );
};
