import React, { useState } from 'react';
import { Navbar } from './components/Navbar';
import { ProductList } from './features/products/ProductList';
import { CartSection } from './features/cart/CartSection';
import { ToastNotification } from './components/ToastNotification';

export const App: React.FC = () => {
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const handleAddedToCart = (productTitle: string) => {
    setToastMessage(`Đã thêm "${productTitle}" vào giỏ hàng`);
  };

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col font-sans text-gray-800">
      {/* Thanh tiêu đề đơn giản */}
      <Navbar />

      {/* Bố cục 2 cột trực quan: Bên trái là Sản phẩm, Bên phải là Giỏ hàng */}
      <main className="flex-1 max-w-6xl w-full mx-auto px-4 py-6">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Cột danh sách sản phẩm (2/3) */}
          <div className="lg:col-span-2">
            <ProductList onAddedToCart={handleAddedToCart} />
          </div>

          {/* Cột giỏ hàng (1/3) */}
          <div className="lg:col-span-1">
            <CartSection />
          </div>
        </div>
      </main>

      {/* Thông báo ngắn khi thêm giỏ hàng */}
      <ToastNotification
        message={toastMessage}
        onClose={() => setToastMessage(null)}
      />

      {/* Chân trang đơn giản */}
      <footer className="border-t border-gray-200 bg-white py-4 text-center text-xs text-gray-500">
      </footer>
    </div>
  );
};

export default App;
