import mongoose from 'mongoose';

const productSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true,
  },
  title: {
    type: String,
    required: true,
    trim: true,
  },
  price: {
    type: Number,
    required: true,
  },
  category: {
    type: String,
    required: true,
    trim: true,
  },
  productType: {
    type: String,
    required: true,
  },
  brand: {
    type: String,
  },
  sku: {
    type: String,
    required: true,
    unique: true, // SKUs should be unique
    trim: true,
  },
  stockQuantity: {
    type: Number,
    required: true,
    min: 0,
    default: 0,
  },
  description: {
    type: String,
    required: true,
  },
  images: {
    type: [String], // An array of strings (URLs)
    default: [],
  },
  rating : {
    type : Number,
    default : 0
  },
  review : {
    type : Number,
    default : 0
  }
}, {
  timestamps: true, // Automatically adds createdAt and updatedAt fields
});

const Product = mongoose.model('Product', productSchema);

export default Product;