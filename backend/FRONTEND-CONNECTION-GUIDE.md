# 🔧 Hướng dẫn khắc phục lỗi "Network request failed"

## ❌ Vấn đề:
Frontend không thể kết nối với backend, hiển thị lỗi:
```
ERROR Lỗi API login: [TypeError: Network request failed]
ERROR Lỗi đăng nhập: [TypeError: Network request failed]
```

## ✅ Giải pháp:

### 1. **Đảm bảo Backend đang chạy**
```bash
# Kiểm tra backend có chạy không
curl http://localhost:5000/api/health

# Nếu không có response, khởi động backend:
cd /Users/phong/Downloads/FoodieHub-main-clean/FoodieHub-main/backend
npm start
```

### 2. **Cập nhật API URL trong Frontend**
Frontend cần trỏ đến đúng địa chỉ backend:

#### Nếu frontend chạy trên localhost:
```javascript
// Trong file config của frontend
const API_BASE_URL = 'http://localhost:5000';
```

#### Nếu frontend chạy trên IP khác:
```javascript
// Thay YOUR_IP bằng IP thực tế của máy
const API_BASE_URL = 'http://YOUR_IP:5000';
```

### 3. **Kiểm tra CORS**
Backend đã được cấu hình CORS để cho phép frontend kết nối:
```javascript
app.use(cors());
```

### 4. **Test API Endpoints**
```bash
# Test health check
curl http://localhost:5000/api/health

# Test deals API
curl http://localhost:5000/api/deals

# Test foods API
curl http://localhost:5000/api/foods
```

### 5. **Cấu hình Network (nếu cần)**

#### Trên macOS:
```bash
# Lấy IP của máy
ifconfig | grep "inet " | grep -v 127.0.0.1

# Hoặc
ipconfig getifaddr en0
```

#### Trên Windows:
```bash
ipconfig
```

### 6. **Cập nhật Frontend Config**

#### Tìm file config trong frontend:
- `src/config/api.js`
- `src/services/api.js`
- `src/utils/config.js`
- Hoặc file tương tự

#### Cập nhật API URL:
```javascript
// Thay đổi từ
const API_URL = 'http://192.168.2.94:5000';

// Thành
const API_URL = 'http://localhost:5000';
// Hoặc
const API_URL = 'http://YOUR_ACTUAL_IP:5000';
```

### 7. **Test kết nối**

#### Từ browser:
```
http://localhost:5000/api/health
```

#### Từ frontend app:
- Mở Developer Tools (F12)
- Vào tab Network
- Thử đăng nhập
- Kiểm tra request có thành công không

### 8. **Backend Status hiện tại**
✅ **Server đang chạy**: http://localhost:5000  
✅ **Database**: SQLite (food_delivery.db)  
✅ **API Endpoints**: Đã sẵn sàng  
✅ **CORS**: Đã cấu hình  
✅ **Deals API**: Hoạt động  

### 9. **Troubleshooting**

#### Nếu vẫn lỗi:
1. **Kiểm tra firewall**: Tắt firewall tạm thời
2. **Kiểm tra port**: Đảm bảo port 5000 không bị block
3. **Restart backend**: Dừng và khởi động lại server
4. **Clear cache**: Xóa cache browser

#### Commands hữu ích:
```bash
# Kiểm tra port 5000 có đang được sử dụng
lsof -i :5000

# Kill process trên port 5000
kill -9 $(lsof -t -i:5000)

# Khởi động lại backend
pkill -f "node server.js" && npm start
```

### 10. **Backup Solution**
Nếu vẫn không được, sử dụng simple server:
```bash
cd /Users/phong/Downloads/FoodieHub-main-clean/FoodieHub-main/backend
node simple-server.js
```

---
**🎯 Sau khi thực hiện các bước trên, frontend sẽ có thể kết nối với backend thành công!** 