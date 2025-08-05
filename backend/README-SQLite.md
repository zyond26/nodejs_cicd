# FoodieHub Backend - SQLite Version

## 🚀 Backend SQLite đã sẵn sàng!

### ✅ Trạng thái hiện tại:
- ✅ Server đang chạy trên port 5000
- ✅ Database SQLite đã được tạo: `food_delivery.db`
- ✅ 4 bảng đã được tạo: `users`, `foods`, `orders`, `order_items`
- ✅ 11 users mặc định đã được tạo
- ✅ 12 món ăn mặc định đã được tạo

### 📊 Thống kê Database:
```bash
# Kiểm tra số lượng users
sqlite3 food_delivery.db "SELECT COUNT(*) as user_count FROM users;"
# Kết quả: 11 users

# Kiểm tra số lượng foods
sqlite3 food_delivery.db "SELECT COUNT(*) as food_count FROM foods;"
# Kết quả: 12 foods
```

### 🔧 Cách sử dụng:

#### 1. Khởi động server:
```bash
npm start
```

#### 2. Kiểm tra server:
```bash
curl http://localhost:5000/api/health
```

#### 3. Các API endpoints:
- **Auth API**: `http://localhost:5000/api/auth`
- **Orders API**: `http://localhost:5000/api/orders`
- **Foods API**: `http://localhost:5000/api/foods`
- **Admin API**: `http://localhost:5000/api/admin`

#### 4. Quản lý database:
```bash
# Mở SQLite shell
sqlite3 food_delivery.db

# Xem tất cả bảng
.tables

# Xem cấu trúc bảng users
.schema users

# Thoát
.quit
```

### 📁 Cấu trúc Database:
- **users**: Thông tin người dùng
- **foods**: Danh sách món ăn
- **orders**: Đơn hàng
- **order_items**: Chi tiết đơn hàng

### 🔐 Users mặc định:
- Email: `tranglam17115@gmail.com` | Password: `123456`
- Email: `tranglam1711@gmail.com` | Password: `123456`
- Email: `user1@example.com` | Password: `123456`
- Email: `user2@example.com` | Password: `123456`
- Email: `user3@example.com` | Password: `123456`
- Email: `test@example.com` | Password: `123456`

### 🛠️ Cấu hình:
File `config.env` đã được cập nhật cho SQLite:
- `DB_TYPE=sqlite`
- `DB_PATH=./food_delivery.db`
- `API_URL=http://localhost:5000`

### 🎯 Lợi ích của SQLite:
- ✅ Không cần cài đặt database server riêng
- ✅ File database nhỏ gọn, dễ backup
- ✅ Hoạt động offline
- ✅ Phù hợp cho development và small-scale production
- ✅ Không có vấn đề với spaces trong file path (đã fix)

### 📝 Ghi chú:
- Database file: `food_delivery.db` (32KB)
- Server đang chạy ổn định
- Tất cả API endpoints đã sẵn sàng
- Có thể kết nối frontend ngay lập tức 