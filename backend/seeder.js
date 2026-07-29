const path = require('path');
const mongoose = require('mongoose');
const dotenv = require('dotenv');

dotenv.config({ path: path.join(__dirname, '.env') });

const Product = require('./models/Product');
const autoSeed = require('./config/autoSeed');

const seedData = async () => {
  try {
    if (!process.env.MONGO_URI) {
      throw new Error('MONGO_URI is missing in backend/.env file');
    }
    await mongoose.connect(process.env.MONGO_URI);

    await Product.deleteMany({});
    console.log('Existing products cleared.');

    await autoSeed();
    console.log('Seeder process executed successfully!');

    process.exit(0);
  } catch (error) {
    console.error(`Error with data import: ${error.message}`);
    process.exit(1);
  }
};

seedData();
