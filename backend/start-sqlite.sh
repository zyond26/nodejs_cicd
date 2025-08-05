#!/bin/bash

echo "🍽️  FoodieHub Backend - SQLite Version"
echo "======================================"

# Kiểm tra xem có đang chạy không
if curl -s http://localhost:5000/api/health > /dev/null 2>&1; then
    echo "✅ Server đang chạy trên http://localhost:5000"
    echo "📊 Thống kê database:"
    echo "   - Users: $(sqlite3 food_delivery.db "SELECT COUNT(*) FROM users;")"
    echo "   - Foods: $(sqlite3 food_delivery.db "SELECT COUNT(*) FROM foods;")"
    echo "   - Orders: $(sqlite3 food_delivery.db "SELECT COUNT(*) FROM orders;")"
    echo ""
    echo "🔗 API Endpoints:"
    echo "   - Health: http://localhost:5000/api/health"
    echo "   - Auth: http://localhost:5000/api/auth"
    echo "   - Foods: http://localhost:5000/api/foods"
    echo "   - Orders: http://localhost:5000/api/orders"
    echo "   - Admin: http://localhost:5000/api/admin"
    echo ""
    echo "🛑 Để dừng server: Ctrl+C"
else
    echo "🚀 Khởi động server..."
    npm start
fi 