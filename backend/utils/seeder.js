const Product = require('../models/products');
const dotenv = require('dotenv');
const connectDatabase = require('../config/database');
const path = require('path');

const products = require('../data/product.json');

// dotenv 설정
dotenv.config({ path: 'backend/config/config.env' });
connectDatabase();

const seedProducts = async () => {
  try {
    await Product.deleteMany();
    console.log('Products are deleted.');

    await Product.insertMany(products);
    console.log('All products are added');

    process.exit();

  } catch(error) {
    console.log(error.message);
    process.exit();
  }
}


seedProducts()