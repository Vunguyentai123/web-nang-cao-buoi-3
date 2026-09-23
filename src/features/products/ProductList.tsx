import React, { useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import {
  fetchProducts,
  selectProducts,
  selectProductsError,
  selectProductsStatus,
  selectSelectedCategory,
  setSelectedCategory,
} from './productsSlice';
import { ProductCard } from './ProductCard';

interface ProductListProps {
  onAddedToCart?: (productTitle: string) => void;
}

export const ProductList: React.FC<ProductListProps> = ({ onAddedToCart }) => {
  const dispatch = useAppDispatch();

  const products = useAppSelector(selectProducts);
  const status = useAppSelector(selectProductsStatus);
  const error = useAppSelector(selectProductsError);
  const selectedCategory = useAppSelector(selectSelectedCategory);

  useEffect(() => {
    dispatch(fetchProducts());
  }, [dispatch]);

  const categories = ['Tất cả', 'Âm thanh', 'Phụ kiện', 'Đồng hồ', 'Màn hình'];

  const filteredProducts =
    selectedCategory === 'Tất cả'
      ? products
      : products.filter((p) => p.category === selectedCategory);

  const handleRetry = () => {
    dispatch(fetchProducts());
  };

  return (
    <div>
      {/* Thanh chọn danh mục đơn giản */}
      <div className="flex items-center justify-between bg-white border border-gray-200 rounded-lg px-4 py-3 mb-5">
        <h2 className="text-sm font-bold text-gray-800">Danh Sách Sản Phẩm</h2>
        <div className="flex items-center gap-1.5 overflow-x-auto">
          {categories.map((cat) => (
            <button
              key={cat}
              type="button"
              onClick={() => dispatch(setSelectedCategory(cat))}
              className={`px-3 py-1 text-xs rounded-md transition-colors cursor-pointer ${
                selectedCategory === cat
                  ? 'bg-blue-600 text-white font-medium'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      {/* Trạng thái Loading */}
      {status === 'loading' && (
        <div className="bg-white border border-gray-200 rounded-lg p-12 text-center text-sm text-gray-500">
          <div className="inline-block w-6 h-6 border-2 border-blue-600 border-t-transparent rounded-full animate-spin mb-2" />
          <div>Đang tải danh sách sản phẩm...</div>
        </div>
      )}

      {/* Trạng thái Lỗi */}
      {status === 'failed' && (
        <div className="bg-red-50 border border-red-200 rounded-lg p-5 text-center text-sm">
          <p className="font-semibold text-red-700">Lỗi khi tải dữ liệu!</p>
          <p className="text-xs text-red-600 mt-1">{error ?? 'Không thể tải danh sách sản phẩm.'}</p>
          <button
            type="button"
            onClick={handleRetry}
            className="mt-3 px-3 py-1.5 bg-red-600 hover:bg-red-700 text-white text-xs rounded cursor-pointer"
          >
            Thử lại
          </button>
        </div>
      )}

      {/* Trạng thái Trống */}
      {status === 'succeeded' && filteredProducts.length === 0 && (
        <div className="bg-white border border-gray-200 rounded-lg p-8 text-center text-sm text-gray-500">
          Không có sản phẩm nào trong danh mục này.
        </div>
      )}

      {/* Danh sách sản phẩm */}
      {status === 'succeeded' && filteredProducts.length > 0 && (
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {filteredProducts.map((product) => (
            <ProductCard
              key={product.id}
              product={product}
              onAdded={onAddedToCart}
            />
          ))}
        </div>
      )}
    </div>
  );
};
