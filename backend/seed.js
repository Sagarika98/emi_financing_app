const mongoose = require('mongoose');
const Product = require('./models/Product');
const EmiPlan = require('./models/EmiPlan');
require('dotenv').config();

// MongoDB connection
const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://localhost:27017/emi_financing';

const seedDatabase = async () => {
  try {
    // Connect to MongoDB
    await mongoose.connect(MONGODB_URI);
    console.log('✅ Connected to MongoDB');

    // Clear existing data
    await Product.deleteMany({});
    await EmiPlan.deleteMany({});
    console.log('🗑️  Cleared existing data');

    // ========== SEED PRODUCTS ==========
    const products = await Product.insertMany([
      {
        name: "iPhone 17 Pro",
        brand: "Apple",
        slug: "iphone-17-pro",
        category: "smartphones",
        variants: [
          {
            color: "Silver",
            storage: "256GB",
            ram: "8GB",
            price: 127400,
            mrp: 134900,
            image: "iphone-silver.jpg"
          },
          {
            color: "Cosmic Orange",
            storage: "256GB",
            ram: "8GB",
            price: 127400,
            mrp: 134900,
            image: "iphone-orange.jpg"
          }
        ]
      },
      {
        name: "Samsung S24 Ultra",
        brand: "Samsung",
        slug: "samsung-s24-ultra",
        category: "smartphones",
        variants: [
          {
            color: "Titanium Gray",
            storage: "512GB",
            ram: "12GB",
            price: 124999,
            mrp: 134999,
            image: "samsung-gray.jpg"
          }
        ]
      },
      {
        name: "OnePlus 12",
        brand: "OnePlus",
        slug: "oneplus-12",
        category: "smartphones",
        variants: [
          {
            color: "Emerald Green",
            storage: "256GB",
            ram: "12GB",
            price: 64999,
            mrp: 69999,
            image: "oneplus-green.jpg"
          }
        ]
      }
    ]);

    console.log(`✅ Created ${products.length} products`);

    // ========== SEED EMI PLANS ==========
    for (const product of products) {
      const emiPlans = [];
      const basePrice = product.variants[0].price;
      
      const tenures = [
        { tenure: 3, rate: "0%" },
        { tenure: 6, rate: "0%" },
        { tenure: 12, rate: "0%" },
        { tenure: 24, rate: "0%" },
        { tenure: 36, rate: "10.5%" },
        { tenure: 48, rate: "10.5%" },
        { tenure: 60, rate: "10.5%" }
      ];

      tenures.forEach(item => {
        const monthlyAmount = Math.round(basePrice / item.tenure);
        emiPlans.push({
          productId: product._id,
          tenure: item.tenure,
          monthlyAmount: monthlyAmount,
          interestRate: item.rate,
          cashback: 7500,
          totalAmount: monthlyAmount * item.tenure
        });
      });

      await EmiPlan.insertMany(emiPlans);
    }

    console.log(`✅ Created EMI plans for all products`);
    
    // Get counts
    const productCount = await Product.countDocuments();
    const emiCount = await EmiPlan.countDocuments();
    
    console.log('\n📊 Database Stats:');
    console.log(`   Products: ${productCount}`);
    console.log(`   EMI Plans: ${emiCount}`);
    
    console.log('\n✅ Database seeded successfully!');
    process.exit(0);

  } catch (error) {
    console.error('❌ Error seeding database:', error);
    process.exit(1);
  }
};

// Run seed function
seedDatabase();