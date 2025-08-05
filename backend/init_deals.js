const { getConnection } = require('./database_sqlite');

async function initDeals() {
  try {
    const db = getConnection();
    
    return new Promise((resolve, reject) => {
      db.get('SELECT COUNT(*) as count FROM deals', async (err, result) => {
        if (err) {
          console.error('❌ Lỗi kiểm tra deals:', err);
          reject(err);
          return;
        }
        
        if (result.count > 0) {
          console.log('✅ Database đã có deals!');
          resolve();
          return;
        }
        
        console.log('🔄 Tạo deals mặc định...');
        
        const deals = [
          {
            title: 'Combo Bún Chả + Nước Uống',
            description: 'Bún chả Hà Nội thơm ngon kèm nước uống tùy chọn',
            originalPrice: 45000,
            dealPrice: 35000,
            discountPercentage: 22,
            image: 'https://images.unsplash.com/photo-1553621042-f6e147245754?w=400',
            category: 'Combo',
            validFrom: '2025-08-01 00:00:00',
            validUntil: '2025-12-31 23:59:59',
            maxPurchases: 50
          },
          {
            title: 'Phở Bò Giảm 30%',
            description: 'Phở bò truyền thống với nước dùng đậm đà, bánh phở mềm dai',
            originalPrice: 45000,
            dealPrice: 31500,
            discountPercentage: 30,
            image: 'https://images.unsplash.com/photo-1569718212165-3a8278d5f624?w=400',
            category: 'Món chính',
            validFrom: '2025-08-01 00:00:00',
            validUntil: '2025-11-30 23:59:59',
            maxPurchases: 100
          },
          {
            title: 'Gà Nướng Lá Chanh - Giảm 25%',
            description: 'Gà nướng lá chanh thơm ngon với da giòn, thịt mềm',
            originalPrice: 180000,
            dealPrice: 135000,
            discountPercentage: 25,
            image: 'https://images.unsplash.com/photo-1565299624946-b28f40a0ca4b?w=400',
            category: 'Món chính',
            validFrom: '2025-08-01 00:00:00',
            validUntil: '2025-10-31 23:59:59',
            maxPurchases: 30
          },
          {
            title: 'Trà Sữa Trân Châu - Mua 2 Tặng 1',
            description: 'Trà sữa trân châu đường đen với trân châu dai ngon',
            originalPrice: 35000,
            dealPrice: 70000,
            discountPercentage: 33,
            image: 'https://images.unsplash.com/photo-1558857563-b371033873b8?w=400',
            category: 'Đồ uống',
            validFrom: '2025-08-01 00:00:00',
            validUntil: '2025-09-30 23:59:59',
            maxPurchases: 200
          },
          {
            title: 'Lẩu Hải Sản - Giảm 20%',
            description: 'Lẩu hải sản tươi ngon với nước dùng đậm đà, rau tươi',
            originalPrice: 120000,
            dealPrice: 96000,
            discountPercentage: 20,
            image: 'https://images.unsplash.com/photo-1553621042-f6e147245754?w=400',
            category: 'Món chính',
            validFrom: '2025-08-01 00:00:00',
            validUntil: '2025-12-31 23:59:59',
            maxPurchases: 40
          },
          {
            title: 'Combo Bánh Mì + Cà Phê',
            description: 'Bánh mì thịt nướng kèm cà phê sữa đá',
            originalPrice: 45000,
            dealPrice: 35000,
            discountPercentage: 22,
            image: 'https://images.unsplash.com/photo-1603133872878-684f208fb84b?w=400',
            category: 'Combo',
            validFrom: '2025-08-01 00:00:00',
            validUntil: '2025-12-31 23:59:59',
            maxPurchases: 80
          }
        ];

        let createdCount = 0;
        for (const deal of deals) {
          db.run(`
            INSERT INTO deals (title, description, original_price, deal_price, discount_percentage, image, category, valid_from, valid_until, max_purchases)
            VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
          `, [
            deal.title, deal.description, deal.originalPrice, deal.dealPrice, 
            deal.discountPercentage, deal.image, deal.category, deal.validFrom, 
            deal.validUntil, deal.maxPurchases
          ], function(err) {
            if (err) {
              console.error(`❌ Lỗi tạo deal ${deal.title}:`, err);
            } else {
              console.log(`✅ Deal "${deal.title}" đã được tạo!`);
            }
            
            createdCount++;
            if (createdCount === deals.length) {
              console.log('✅ Tất cả deals mặc định đã được tạo!');
              resolve();
            }
          });
        }
      });
    });
    
  } catch (error) {
    console.error('❌ Lỗi:', error);
    throw error;
  }
}

module.exports = { initDeals }; 