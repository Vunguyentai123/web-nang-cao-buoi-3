import React from 'react';
import type { Product } from './types';
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import { addToCart, selectCartItems } from '../cart/cartSlice';

interface ProductCardProps {
  product: Product;
  onAdded?: (productTitle: string) => void;
}

export const ProductCard: React.FC<ProductCardProps> = ({ product, onAdded }) => {
  const dispatch = useAppDispatch();
  const cartItems = useAppSelector(selectCartItems);

  const cartItem = cartItems.find((item) => item.id === product.id);
  const currentQuantity = cartItem ? cartItem.quantity : 0;

  const handleAddToCart = () => {
    dispatch(addToCart(product));
    if (onAdded) {
      onAdded(product.title);
    }
  };

  return (
    <div className="bg-white border border-gray-200 rounded-lg p-4 flex flex-col justify-between hover:border-gray-300 transition-colors">
      <div>
        <div className="w-full h-44 bg-gray-50 rounded mb-3 overflow-hidden">
          <img
            src={product.image}
            alt={product.title}
            className="w-full h-full object-cover"
            loading="lazy"
          />
        </div>
        <div className="text-xs text-gray-500 font-medium">{product.category}</div>
        <h3 className="font-semibold text-gray-800 text-sm mt-1 line-clamp-1">
          {product.title}
        </h3>
        <p className="text-xs text-gray-500 mt-1 line-clamp-2">
          {product.description}
        </p>
      </div>

      <div className="mt-4 pt-3 border-t border-gray-100 flex items-center justify-between">
        <div>
          <span className="text-base font-bold text-gray-900">${product.price}</span>
          {currentQuantity > 0 && (
            <span className="ml-2 text-xs text-green-700 bg-green-50 px-1.5 py-0.5 rounded">
              Trong giỏ: {currentQuantity}
            </span>
          )}
        </div>
        <button
          type="button"
          onClick={handleAddToCart}
          className="px-3 py-1.5 bg-blue-600 hover:bg-blue-700 text-white text-xs font-medium rounded transition-colors cursor-pointer"
        >
          + Thêm vào giỏ
        </button>
      </div>
    </div>
  );
};
