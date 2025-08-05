#!/bin/bash

echo "🍽️  FoodieHub Backend - Khởi động"
echo "=================================="

# Kiểm tra xem có đang chạy không
if curl -s http://localhost:5000/api/health > /dev/null 2>&1; then
    echo "✅ Backend đang chạy trên http://localhost:5000"
    echo ""
    echo "🔗 API Endpoints:"
    echo "   - Health: http://localhost:5000/api/health"
    echo "   - Auth: http://localhost:5000/api/auth"
    echo "   - Foods: http://localhost:5000/api/foods"
    echo "   - Orders: http://localhost:5000/api/orders"
    echo "   - Deals: http://localhost:5000/api/deals"
    echo ""
    echo "📊 Database Status:"
    echo "   - Users: $(sqlite3 food_delivery.db "SELECT COUNT(*) FROM users;" 2>/dev/null || echo "N/A")"
    echo "   - Foods: $(sqlite3 food_delivery.db "SELECT COUNT(*) FROM foods;" 2>/dev/null || echo "N/A")"
    echo "   - Deals: $(sqlite3 food_delivery.db "SELECT COUNT(*) FROM deals;" 2>/dev/null || echo "N/A")"
    echo ""
    echo "🛑 Để dừng server: Ctrl+C"
else
    echo "🚀 Khởi động backend..."
    echo ""
    echo "📝 Lưu ý:"
    echo "   - Backend sẽ chạy trên http://localhost:5000"
    echo "   - Cập nhật frontend config để trỏ đến localhost:5000"
    echo "   - Nếu frontend chạy trên IP khác, thay localhost bằng IP thực tế"
    echo ""
    
    # Khởi động backend
    npm start
fi 