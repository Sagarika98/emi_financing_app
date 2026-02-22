const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Product name is required']
  },
  brand: {
    type: String,
    required: [true, 'Brand name is required']
  },
  slug: {
    type: String,
    required: [true, 'Slug is required'],
    unique: true,
    lowercase: true,
    trim: true
  },
  category: {
    type: String,
    default: 'smartphones'
  },
  description: {
    type: String,
    default: ''
  },
  variants: [{
    color: {
      type: String,
      required: true
    },
    storage: {
      type: String,
      required: true
    },
    ram: {
      type: String,
      required: true
    },
    price: {
      type: Number,
      required: true
    },
    mrp: {
      type: Number,
      required: true
    },
    image: {
      type: String,
      required: true
    },
    inStock: {
      type: Boolean,
      default: true
    }
  }],
  createdAt: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model('Product', productSchema);