const sqlite3 = require('sqlite3').verbose();
const path = require('path');

// Kết nối database
const dbPath = path.join(__dirname, 'food_delivery.db');
const db = new sqlite3.Database(dbPath);

console.log('🔄 Đang thêm deals mẫu...');

// Thêm deals mẫu
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
      console.log('✅ Tất cả deals mẫu đã được tạo!');
      
      // Kiểm tra deals đã tạo
      db.all('SELECT * FROM deals', (err, rows) => {
        if (err) {
          console.error('❌ Lỗi lấy deals:', err);
        } else {
          console.log(`📊 Tổng số deals: ${rows.length}`);
          rows.forEach(deal => {
            console.log(`- ${deal.title}: ${deal.deal_price}đ (giảm ${deal.discount_percentage}%)`);
          });
        }
        db.close();
      });
    }
  });
} 