const express = require('express');
const cors = require('cors');
const morgan = require('morgan');
require('dotenv').config({ path: './config.env' });
  
const { connectDB } = require('./database_sqlite');
const authRoutes = require('./routes/authRoutes');
const orderRoutes = require('./routes/orderRoutes');
const foodRoutes = require('./routes/foodRoutes');
const adminOrderRoutes = require('./routes/adminOrderRoutes');
const dealRoutes = require('./routes/dealRoutes');

// Import function khởi tạo users, foods và deals
const { initDefaultUsers } = require('./init_default_users');
const { initFoods } = require('./init_foods');
const { initDeals } = require('./init_deals');
  
const app = express();
  
// Middleware
app.use(cors());
app.use(express.json());
app.use(morgan('dev'));

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/orders', orderRoutes);
app.use('/api', foodRoutes);
app.use('/api/admin', adminOrderRoutes);
app.use('/api', dealRoutes);
  
// Health check endpoint
app.get('/api/health', (req, res) => {
  res.json({ 
    status: 'OK', 
    message: 'Server đang hoạt động',
    timestamp: new Date().toISOString()
  });
});
  
const PORT = process.env.PORT || 5000;

// Khởi động server trước
app.listen(PORT, () => {
  console.log(`🚀 Server đang chạy tại http://localhost:${PORT}`);
  console.log(`🔐 Auth API: http://localhost:${PORT}/api/auth`);
  console.log(`📦 Orders API: http://localhost:${PORT}/api/orders`);
  console.log(`🍽️ Foods API: http://localhost:${PORT}/api/foods`);
  console.log(`🎯 Deals API: http://localhost:${PORT}/api/deals`);
  
  // Sau đó khởi tạo database
  initializeDatabase();
});

// Function khởi tạo database
const initializeDatabase = async () => {
  try {
    // Kết nối database và khởi tạo users, foods, deals
    await connectDB();
    console.log('✅ Kết nối database thành công!');
    
    // Khởi tạo users mặc định
    await initDefaultUsers();
    console.log('✅ Khởi tạo users hoàn tất!');
    
    // Khởi tạo foods mặc định
    await initFoods();
    console.log('✅ Khởi tạo foods hoàn tất!');
    
    // Khởi tạo deals mặc định
    await initDeals();
    console.log('✅ Khởi tạo deals hoàn tất!');
    
  } catch (err) {
    console.error('❌ Lỗi khởi tạo database:', err);
    console.log('⚠️ Server vẫn hoạt động bình thường');
  }
}; 