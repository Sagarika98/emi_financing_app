const mongoose = require('mongoose');

const emiPlanSchema = new mongoose.Schema({
  productId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Product',
    required: [true, 'Product ID is required']
  },
  tenure: {
    type: Number,
    required: [true, 'Tenure is required'],
    enum: [3, 6, 12, 24, 36, 48, 60]  // Only these tenures allowed
  },
  monthlyAmount: {
    type: Number,
    required: [true, 'Monthly amount is required']
  },
  interestRate: {
    type: String,
    required: [true, 'Interest rate is required'],
    enum: ['0%', '10.5%']  // Only these rates allowed
  },
  cashback: {
    type: Number,
    default: 7500
  },
  totalAmount: {
    type: Number,
    required: [true, 'Total amount is required']
  }
}, {
  timestamps: true  // Adds createdAt and updatedAt automatically
});

module.exports = mongoose.model('EmiPlan', emiPlanSchema);