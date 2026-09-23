import type { Product } from './types';

export const MOCK_PRODUCTS: Product[] = [
  {
    id: 1,
    title: 'Tai nghe Bluetooth Sony WH-1000XM5',
    price: 349,
    description: 'Tai nghe chống ồn chủ động hàng đầu, âm thanh Hi-Res, thời lượng pin lên đến 30 giờ và thiết kế siêu nhẹ tiện nghi.',
    category: 'Âm thanh',
    image: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?auto=format&fit=crop&w=600&q=80',
    rating: {
      rate: 4.8,
      count: 245,
    },
    stock: 15,
  },
  {
    id: 2,
    title: 'Bàn phím cơ không dây Keychron Q1 Pro',
    price: 199,
    description: 'Khung nhôm CNC nguyên khối, switch cơ học gõ êm ái, kết nối Bluetooth 5.1 và hot-swap cao cấp cho lập trình viên.',
    category: 'Phụ kiện',
    image: 'https://images.unsplash.com/photo-1587829741301-dc798b83add3?auto=format&fit=crop&w=600&q=80',
    rating: {
      rate: 4.9,
      count: 189,
    },
    stock: 8,
  },
  {
    id: 3,
    title: 'Chuột công thái học Logitech MX Master 3S',
    price: 99,
    description: 'Cuộn MagSpeed siêu nhanh, cảm biến 8000 DPI trên mọi bề mặt, click chuột tĩnh âm hoàn hảo cho dân văn phòng.',
    category: 'Phụ kiện',
    image: 'https://images.unsplash.com/photo-1527864550417-7fd91fc51a46?auto=format&fit=crop&w=600&q=80',
    rating: {
      rate: 4.7,
      count: 310,
    },
    stock: 25,
  },
  {
    id: 4,
    title: 'Đồng hồ thông minh Apple Watch Series 9',
    price: 399,
    description: 'Màn hình Retina luôn bật siêu sáng, chip S9 mạnh mẽ, cảm biến đo nhịp tim, ECG và hỗ trợ cử chỉ Chạm hai lần.',
    category: 'Đồng hồ',
    image: 'https://images.unsplash.com/photo-1546868871-7041f2a55e12?auto=format&fit=crop&w=600&q=80',
    rating: {
      rate: 4.6,
      count: 420,
    },
    stock: 12,
  },
  {
    id: 5,
    title: 'Loa Bluetooth di động Marshall Emberton II',
    price: 169,
    description: 'Âm thanh đa hướng 360 độ True Stereophonic, kháng nước chuẩn IP67, chơi nhạc liên tục hơn 30 giờ.',
    category: 'Âm thanh',
    image: 'https://images.unsplash.com/photo-1545454675-3531b543be5d?auto=format&fit=crop&w=600&q=80',
    rating: {
      rate: 4.5,
      count: 154,
    },
    stock: 18,
  },
  {
    id: 6,
    title: 'Màn hình đồ hoạ Dell UltraSharp U2723QE 4K',
    price: 579,
    description: 'Tấm nền IPS Black độ tương phản 2000:1, độ phân giải 4K sắc nét, chuẩn màu 98% DCI-P3 cùng cổng kết nối USB-C 90W.',
    category: 'Màn hình',
    image: 'https://images.unsplash.com/photo-1527443224154-c4a3942d3acf?auto=format&fit=crop&w=600&q=80',
    rating: {
      rate: 4.9,
      count: 98,
    },
    stock: 6,
  },
];

/**
 * Giả lập API gọi lấy danh sách sản phẩm với độ trễ (delay) mạng.
 * Cho phép truyền cờ `shouldFail` để mô phỏng trường hợp server gặp lỗi (HTTP 500),
 * giúp kiểm tra trạng thái rejected của createAsyncThunk.
 */
export const fetchProductsApi = async (shouldFail = false): Promise<Product[]> => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      if (shouldFail) {
        reject(new Error('Lỗi máy chủ: Không thể tải danh sách sản phẩm. Vui lòng thử lại sau!'));
      } else {
        resolve(MOCK_PRODUCTS);
      }
    }, 750);
  });
};
