const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Connect to MongoDB
mongoose.connect('mongodb://localhost:27017/emi_financing')
.then(() => console.log('MongoDB connected successfully'))
.catch(err => console.log('MongoDB connection error:', err));

// Product Schema
const productSchema = new mongoose.Schema({
  name: String,
  variant: String,
  mrp: Number,
  price: Number,
  image: String,
  slug: String,
  category: String,
  storage: String,
  color: String
});

// EMI Plan Schema
const emiPlanSchema = new mongoose.Schema({
  productId: { type: mongoose.Schema.Types.ObjectId, ref: 'Product' },
  tenure: Number,
  monthlyAmount: Number,
  interestRate: String,
  cashback: Number,
  totalAmount: Number
});

const Product = mongoose.model('Product', productSchema);
const EmiPlan = mongoose.model('EmiPlan', emiPlanSchema);

// API Routes
app.get('/api/products', async (req, res) => {
  try {
    const products = await Product.find();
    res.json(products);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

app.get('/api/products/:slug', async (req, res) => {
  try {
    const product = await Product.findOne({ slug: req.params.slug });
    if (!product) {
      return res.status(404).json({ message: 'Product not found' });
    }
    
    const emiPlans = await EmiPlan.find({ productId: product._id });
    res.json({ product, emiPlans });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Seed Data Route
app.post('/api/seed', async (req, res) => {
  try {
    // Clear existing data
    await Product.deleteMany({});
    await EmiPlan.deleteMany({});

    // Create products
    const products = await Product.insertMany([
      {
        name: "iPhone 17 Pro",
        variant: "Silver",
        mrp: 134900,
        price: 127400,
        image: "/images/iphone-17-Pro-Max-Image.png",
        slug: "iphone-17-pro",
        category: "smartphones",
        storage: "256GB",
        color: "Silver"
      },
      {
        name: "iPhone 17 Pro",
        variant: "Black",
        mrp: 134900,
        price: 127400,
        image: "https://store.storeimages.cdn-apple.com/1/as-images.apple.com/is/iphone-15-pro-finish-select-202309-6-7inch-blacktitanium?wid=5120&hei=2880&fmt=webp",
        slug: "iphone-17-pro-black",
        category: "smartphones",
        storage: "256GB",
        color: "Black"
      },
      {
        name: "Samsung S24 Ultra",
        variant: "Titanium Gray",
        mrp: 134999,
        price: 124999,
        image: "/images/THUMB_Galaxy-S2-image.jpg",
        slug: "samsung-s24-ultra",
        category: "smartphones",
        storage: "512GB",
        color: "Titanium Gray"
      },
      {
        name: "OnePlus 12",
        variant: "Emerald Green",
        mrp: 69999,
        price: 64999,
        image: "oneplus-11.jpg", 
        slug: "oneplus-12",      
        category: "smartphones",
        storage: "256GB",
        color: "Emerald Green"
      }
    ]);

    // Create EMI plans for each product with different interest rates
    for (const product of products) {
      const emiPlans = [];
      //const tenures = [3, 6, 12, 24, 36, 48, 60];
      
      //tenures.forEach(tenure => {
        //const monthlyAmount = Math.round(product.price / tenure);
        
        // ✅ INTEREST RATE LOGIC - 24 months tak 0%, uske baad 10.5%
       const tenureData = [
    { tenure: 3, rate: "0%" },
    { tenure: 6, rate: "0%" },
    { tenure: 12, rate: "0%" },
    { tenure: 24, rate: "0%" },
    { tenure: 36, rate: "10.5%" },
    { tenure: 48, rate: "10.5%" },
    { tenure: 60, rate: "10.5%" }
  ];
  
  tenureData.forEach(item => {
    const monthlyAmount = Math.round(product.price / item.tenure);
    
    emiPlans.push({
      productId: product._id,
      tenure: item.tenure,
      monthlyAmount: monthlyAmount,
      interestRate: item.rate,  // ✅ rate set from array
      cashback: 7500,
      totalAmount: monthlyAmount * item.tenure
    });
  });
      
      await EmiPlan.insertMany(emiPlans);
    }

    res.json({ message: 'Database seeded successfully' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

const PORT = 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});


