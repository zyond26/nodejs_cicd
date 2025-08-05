const { getConnection } = require('../database_sqlite');
const { v4: uuidv4 } = require('uuid');

// Lấy tất cả deals đang hoạt động
const getAllDeals = async (req, res) => {
  try {
    const db = getConnection();
    
    db.all(`
      SELECT * FROM deals 
      WHERE is_active = 1 
      AND valid_until > datetime('now')
      ORDER BY created_at DESC
    `, (err, deals) => {
      if (err) {
        console.error('❌ Lỗi lấy deals:', err);
        return res.status(500).json({
          success: false,
          message: 'Lỗi server, vui lòng thử lại sau'
        });
      }

      res.json({
        success: true,
        data: deals
      });
    });
  } catch (error) {
    console.error('Lỗi getAllDeals:', error);
    res.status(500).json({
      success: false,
      message: 'Lỗi server, vui lòng thử lại sau'
    });
  }
};

// Lấy chi tiết deal
const getDealById = async (req, res) => {
  try {
    const { id } = req.params;
    const db = getConnection();

    db.get('SELECT * FROM deals WHERE id = ? AND is_active = 1', [id], (err, deal) => {
      if (err) {
        console.error('❌ Lỗi lấy deal:', err);
        return res.status(500).json({
          success: false,
          message: 'Lỗi server, vui lòng thử lại sau'
        });
      }

      if (!deal) {
        return res.status(404).json({
          success: false,
          message: 'Deal không tồn tại'
        });
      }

      res.json({
        success: true,
        data: deal
      });
    });
  } catch (error) {
    console.error('Lỗi getDealById:', error);
    res.status(500).json({
      success: false,
      message: 'Lỗi server, vui lòng thử lại sau'
    });
  }
};

// Mua deal
const purchaseDeal = async (req, res) => {
  try {
    const { dealId } = req.body;
    const userId = req.user.id; // Từ middleware auth
    const db = getConnection();

    // Kiểm tra deal có tồn tại và còn hiệu lực không
    db.get(`
      SELECT * FROM deals 
      WHERE id = ? AND is_active = 1 
      AND valid_until > datetime('now')
      AND current_purchases < max_purchases
    `, [dealId], (err, deal) => {
      if (err) {
        console.error('❌ Lỗi kiểm tra deal:', err);
        return res.status(500).json({
          success: false,
          message: 'Lỗi server, vui lòng thử lại sau'
        });
      }

      if (!deal) {
        return res.status(400).json({
          success: false,
          message: 'Deal không tồn tại hoặc đã hết hạn'
        });
      }

      // Kiểm tra user đã mua deal này chưa
      db.get('SELECT * FROM user_deals WHERE user_id = ? AND deal_id = ?', [userId, dealId], (err, existingPurchase) => {
        if (err) {
          console.error('❌ Lỗi kiểm tra purchase:', err);
          return res.status(500).json({
            success: false,
            message: 'Lỗi server, vui lòng thử lại sau'
          });
        }

        if (existingPurchase) {
          return res.status(400).json({
            success: false,
            message: 'Bạn đã mua deal này rồi'
          });
        }

        // Tạo deal code
        const dealCode = `DEAL-${uuidv4().substring(0, 8).toUpperCase()}`;
        const expiresAt = deal.valid_until;

        // Thêm vào user_deals
        db.run(`
          INSERT INTO user_deals (user_id, deal_id, deal_code, expires_at) 
          VALUES (?, ?, ?, ?)
        `, [userId, dealId, dealCode, expiresAt], function(err) {
          if (err) {
            console.error('❌ Lỗi mua deal:', err);
            return res.status(500).json({
              success: false,
              message: 'Lỗi server, vui lòng thử lại sau'
            });
          }

          // Cập nhật số lượng đã mua
          db.run('UPDATE deals SET current_purchases = current_purchases + 1 WHERE id = ?', [dealId]);

          res.status(201).json({
            success: true,
            message: 'Mua deal thành công!',
            data: {
              dealCode,
              expiresAt,
              dealTitle: deal.title,
              dealPrice: deal.deal_price
            }
          });
        });
      });
    });
  } catch (error) {
    console.error('Lỗi purchaseDeal:', error);
    res.status(500).json({
      success: false,
      message: 'Lỗi server, vui lòng thử lại sau'
    });
  }
};

// Lấy deals đã mua của user
const getUserDeals = async (req, res) => {
  try {
    const userId = req.user.id;
    const db = getConnection();

    db.all(`
      SELECT ud.*, d.title, d.description, d.original_price, d.deal_price, d.image, d.category
      FROM user_deals ud
      JOIN deals d ON ud.deal_id = d.id
      WHERE ud.user_id = ?
      ORDER BY ud.purchase_date DESC
    `, [userId], (err, userDeals) => {
      if (err) {
        console.error('❌ Lỗi lấy user deals:', err);
        return res.status(500).json({
          success: false,
          message: 'Lỗi server, vui lòng thử lại sau'
        });
      }

      res.json({
        success: true,
        data: userDeals
      });
    });
  } catch (error) {
    console.error('Lỗi getUserDeals:', error);
    res.status(500).json({
      success: false,
      message: 'Lỗi server, vui lòng thử lại sau'
    });
  }
};

// Sử dụng deal
const useDeal = async (req, res) => {
  try {
    const { dealCode } = req.body;
    const db = getConnection();

    // Kiểm tra deal code
    db.get(`
      SELECT ud.*, d.title, d.deal_price
      FROM user_deals ud
      JOIN deals d ON ud.deal_id = d.id
      WHERE ud.deal_code = ? AND ud.status = 'active'
      AND ud.expires_at > datetime('now')
    `, [dealCode], (err, userDeal) => {
      if (err) {
        console.error('❌ Lỗi kiểm tra deal code:', err);
        return res.status(500).json({
          success: false,
          message: 'Lỗi server, vui lòng thử lại sau'
        });
      }

      if (!userDeal) {
        return res.status(400).json({
          success: false,
          message: 'Deal code không hợp lệ hoặc đã hết hạn'
        });
      }

      // Cập nhật trạng thái đã sử dụng
      db.run(`
        UPDATE user_deals 
        SET status = 'used', used_at = datetime('now')
        WHERE deal_code = ?
      `, [dealCode], function(err) {
        if (err) {
          console.error('❌ Lỗi cập nhật deal:', err);
          return res.status(500).json({
            success: false,
            message: 'Lỗi server, vui lòng thử lại sau'
          });
        }

        res.json({
          success: true,
          message: 'Sử dụng deal thành công!',
          data: {
            dealTitle: userDeal.title,
            dealPrice: userDeal.deal_price,
            usedAt: new Date().toISOString()
          }
        });
      });
    });
  } catch (error) {
    console.error('Lỗi useDeal:', error);
    res.status(500).json({
      success: false,
      message: 'Lỗi server, vui lòng thử lại sau'
    });
  }
};

// Admin: Tạo deal mới
const createDeal = async (req, res) => {
  try {
    const { title, description, originalPrice, dealPrice, discountPercentage, image, category, validFrom, validUntil, maxPurchases } = req.body;
    const db = getConnection();

    db.run(`
      INSERT INTO deals (title, description, original_price, deal_price, discount_percentage, image, category, valid_from, valid_until, max_purchases)
      VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
    `, [title, description, originalPrice, dealPrice, discountPercentage, image, category, validFrom, validUntil, maxPurchases || 100], function(err) {
      if (err) {
        console.error('❌ Lỗi tạo deal:', err);
        return res.status(500).json({
          success: false,
          message: 'Lỗi server, vui lòng thử lại sau'
        });
      }

      res.status(201).json({
        success: true,
        message: 'Tạo deal thành công!',
        data: {
          id: this.lastID,
          title,
          dealPrice
        }
      });
    });
  } catch (error) {
    console.error('Lỗi createDeal:', error);
    res.status(500).json({
      success: false,
      message: 'Lỗi server, vui lòng thử lại sau'
    });
  }
};

module.exports = {
  getAllDeals,
  getDealById,
  purchaseDeal,
  getUserDeals,
  useDeal,
  createDeal
}; 