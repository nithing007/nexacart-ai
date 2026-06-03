const mongoose = require('mongoose');
const dotenv = require('dotenv');
const Product = require('./models/Product');
const connectDB = require('./config/db');

dotenv.config();

const products = [
  {
    name: "iPhone 15 Pro Max (256GB)",
    description: "The ultimate iPhone. Featuring an aerospace-grade titanium design, the groundbreaking A17 Pro chip, a customizable Action button, and the most powerful iPhone camera system ever.",
    price: 148900,
    originalPrice: 159900,
    category: "Electronics",
    image: "https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?auto=format&fit=crop&w=500&q=80",
    countInStock: 10,
    rating: 4.8,
    numReviews: 240,
    isFeatured: true
  },
  {
    name: "Sony WH-1000XM5 Noise Cancelling Headphones",
    description: "Sony's industry-leading noise cancellation gets even better. Experience premium sound quality, crystal-clear hands-free calling, and up to 30 hours of battery life.",
    price: 29990,
    originalPrice: 34990,
    category: "Electronics",
    image: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?auto=format&fit=crop&w=500&q=80",
    countInStock: 15,
    rating: 4.7,
    numReviews: 185,
    isFeatured: true
  },
  {
    name: "MacBook Pro M3 Max (16-inch)",
    description: "The ultimate laptop for power users. Featuring the groundbreaking M3 Max chip, a gorgeous Liquid Retina XDR display, up to 22 hours of battery life, and pro ports.",
    price: 229900,
    originalPrice: 249900,
    category: "Electronics",
    image: "https://images.unsplash.com/photo-1496181130204-755241544e3f?auto=format&fit=crop&w=500&q=80",
    countInStock: 5,
    rating: 4.9,
    numReviews: 95,
    isFeatured: true
  },
  {
    name: "Organic Avocados (Pack of 3)",
    description: "Fresh, premium grade organic avocados sourced directly from local organic farms. Rich in healthy fats and perfect for guacamole, toast, and salads.",
    price: 249,
    originalPrice: 299,
    category: "Groceries",
    image: "https://images.unsplash.com/photo-1523049673857-eb18f1d7b578?auto=format&fit=crop&w=500&q=80",
    countInStock: 50,
    rating: 4.5,
    numReviews: 320,
    isFeatured: false
  },
  {
    name: "Premium Blueberries (125g)",
    description: "Plump, sweet, and juicy organic blueberries. Packed with antioxidants, vitamins, and minerals. Perfect for snacking, baking, or cereal toppings.",
    price: 199,
    originalPrice: 249,
    category: "Groceries",
    image: "https://images.unsplash.com/photo-1498557850523-fd3d118b962e?auto=format&fit=crop&w=500&q=80",
    countInStock: 40,
    rating: 4.6,
    numReviews: 150,
    isFeatured: false
  },
  {
    name: "Ergonomic Office Chair",
    description: "Stay comfortable during long workdays. Fully adjustable armrests, lumbar support, and headrest with a breathable mesh back design for optimal airflow.",
    price: 12490,
    originalPrice: 15990,
    category: "Home & Office",
    image: "https://images.unsplash.com/photo-1567538096630-e0c55bd6374c?auto=format&fit=crop&w=500&q=80",
    countInStock: 12,
    rating: 4.4,
    numReviews: 88,
    isFeatured: false
  },
  {
    name: "Minimalist LED Desk Lamp",
    description: "Modern, flicker-free LED desk lamp with 5 brightness levels, 5 color temperature modes, built-in USB charging port, and auto-off timer.",
    price: 2499,
    originalPrice: 3499,
    category: "Home & Office",
    image: "https://images.unsplash.com/photo-1507473885765-e6ed057f782c?auto=format&fit=crop&w=500&q=80",
    countInStock: 25,
    rating: 4.5,
    numReviews: 112,
    isFeatured: false
  },
  {
    name: "Nike Air Max Sneakers",
    description: "Classic Nike Air Max sneakers featuring premium lightweight cushioning, rubber outsole for durability, and a clean modern aesthetic.",
    price: 9995,
    originalPrice: 12995,
    category: "Fashion",
    image: "https://images.unsplash.com/photo-1542291026-7eec264c27ff?auto=format&fit=crop&w=500&q=80",
    countInStock: 18,
    rating: 4.6,
    numReviews: 210,
    isFeatured: true
  },
  {
    name: "Minimalist Leather Backpack",
    description: "Handcrafted from full-grain water-resistant leather. Designed with a dedicated 15-inch laptop sleeve, hidden security pocket, and padded shoulder straps.",
    price: 4499,
    originalPrice: 5999,
    category: "Fashion",
    image: "https://images.unsplash.com/photo-1553062407-98eeb64c6a62?auto=format&fit=crop&w=500&q=80",
    countInStock: 20,
    rating: 4.5,
    numReviews: 74,
    isFeatured: false
  }
];

const seedData = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);

    await Product.deleteMany({});
    console.log('Existing products deleted');

    await Product.insertMany(products);
    console.log('Mock products seeded successfully');

    process.exit();
  } catch (error) {
    console.error(`Error with data import: ${error.message}`);
    process.exit(1);
  }
};

seedData();
