const express = require('express');
const router = express.Router();
const {
  getAllDeals,
  getDealById,
  purchaseDeal,
  getUserDeals,
  useDeal,
  createDeal
} = require('../controllers/dealController');

// Middleware để kiểm tra authentication (tạm thời bỏ qua)
const authMiddleware = (req, res, next) => {
  // Tạm thời set user id = 1 để test
  req.user = { id: 1 };
  next();
};

// Public routes - không cần đăng nhập
router.get('/deals', getAllDeals); // Lấy tất cả deals
router.get('/deals/:id', getDealById); // Lấy chi tiết deal

// Protected routes - cần đăng nhập
router.post('/deals/purchase', authMiddleware, purchaseDeal); // Mua deal
router.get('/user/deals', authMiddleware, getUserDeals); // Lấy deals đã mua
router.post('/deals/use', authMiddleware, useDeal); // Sử dụng deal

// Admin routes
router.post('/admin/deals', authMiddleware, createDeal); // Tạo deal mới (admin)

module.exports = router; 