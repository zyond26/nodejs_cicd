const express = require('express');
const cors = require('cors');
require('dotenv').config({ path: './config.env' });

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Health check endpoint
app.get('/api/health', (req, res) => {
  res.json({ 
    status: 'OK', 
    message: 'Server đang hoạt động',
    timestamp: new Date().toISOString()
  });
});

// Test deals endpoint
app.get('/api/deals', (req, res) => {
  res.json({
    success: true,
    data: [
      {
        id: 1,
        title: 'Combo Bún Chả + Nước Uống',
        description: 'Bún chả Hà Nội thơm ngon kèm nước uống tùy chọn',
        originalPrice: 45000,
        dealPrice: 35000,
        discountPercentage: 22
      },
      {
        id: 2,
        title: 'Phở Bò Giảm 30%',
        description: 'Phở bò truyền thống với nước dùng đậm đà',
        originalPrice: 45000,
        dealPrice: 31500,
        discountPercentage: 30
      }
    ]
  });
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`🚀 Simple Server đang chạy tại http://localhost:${PORT}`);
  console.log(`🔗 Health: http://localhost:${PORT}/api/health`);
  console.log(`🎯 Deals: http://localhost:${PORT}/api/deals`);
}); 