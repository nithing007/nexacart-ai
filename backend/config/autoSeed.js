const Product = require('../models/Product');

const sampleProducts = [
  // 1. Electronics
  {
    name: "iPhone 15 Pro Max (256GB)",
    description: "Aerospace-grade titanium design, A17 Pro chip, customizable Action button, and ultimate triple-lens camera.",
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
    description: "Sony's industry-leading noise cancellation, premium high-res audio quality, and 30-hour battery life.",
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
    description: "Vibrant Liquid Retina XDR screen, next-gen M3 Max GPU/CPU, and pro-level port connectivity.",
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
    name: "Samsung Galaxy S24 Ultra (256GB)",
    description: "AI-boosted flagship phone. 200MP camera, built-in S-Pen, and titanium bezel structure.",
    price: 124999,
    originalPrice: 129999,
    category: "Electronics",
    image: "https://images.unsplash.com/photo-1610945265064-0e34e5519bbf?auto=format&fit=crop&w=500&q=80",
    countInStock: 8,
    rating: 4.8,
    numReviews: 142,
    isFeatured: false
  },
  {
    name: "iPad Air M2 (11-inch)",
    description: "Supercharged by M2 chip. 12MP landscape camera, support for Apple Pencil Pro, and gorgeous Liquid Retina display.",
    price: 59900,
    originalPrice: 64900,
    category: "Electronics",
    image: "https://images.unsplash.com/photo-1544244015-0df4b3ffc6b0?auto=format&fit=crop&w=500&q=80",
    countInStock: 14,
    rating: 4.7,
    numReviews: 86,
    isFeatured: false
  },
  
  // 2. Groceries
  {
    name: "Organic Avocados (Pack of 3)",
    description: "Rich, creamy local organic avocados. Sourced fresh daily, packed with good monounsaturated fats.",
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
    description: "Sweet, juicy blueberries packed with antioxidants, fresh organic harvest.",
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
    name: "Organic Almond Milk (1L)",
    description: "Unsweetened, plant-based dairy alternative made from premium Mediterranean organic almonds.",
    price: 299,
    originalPrice: 349,
    category: "Groceries",
    image: "https://images.unsplash.com/photo-1556881286-fc6915169721?auto=format&fit=crop&w=500&q=80",
    countInStock: 30,
    rating: 4.4,
    numReviews: 72,
    isFeatured: false
  },
  {
    name: "Fresh Organic Apples (1kg)",
    description: "Crisp and sweet Royal Gala apples harvested from pesticide-free orchards.",
    price: 149,
    originalPrice: 189,
    category: "Groceries",
    image: "https://images.unsplash.com/photo-1560806887-1e4cd0b6cbd6?auto=format&fit=crop&w=500&q=80",
    countInStock: 60,
    rating: 4.6,
    numReviews: 190,
    isFeatured: false
  },
  {
    name: "Premium Organic Green Tea (50 bags)",
    description: "Hand-picked pure green tea leaves rich in antioxidants and refreshing floral aroma.",
    price: 399,
    originalPrice: 499,
    category: "Groceries",
    image: "https://images.unsplash.com/photo-1597481499750-3e6b22637e12?auto=format&fit=crop&w=500&q=80",
    countInStock: 45,
    rating: 4.5,
    numReviews: 114,
    isFeatured: false
  },

  // 3. Home & Office
  {
    name: "Ergonomic Office Chair",
    description: "Mesh backing, lumbar support customization, 3D armrests, and premium gas lift mechanics.",
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
    description: "Modern touch control desk lamp featuring 5 brightness modes, USB port, and auto-off settings.",
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
    name: "Smart Steel Water Bottle (750ml)",
    description: "Insulated water bottle with an LED touch lid showing water temperature, double-walled vacuum steel.",
    price: 1999,
    originalPrice: 2499,
    category: "Home & Office",
    image: "https://images.unsplash.com/photo-1602143407151-7111542de6e8?auto=format&fit=crop&w=500&q=80",
    countInStock: 35,
    rating: 4.6,
    numReviews: 68,
    isFeatured: false
  },
  {
    name: "Espresso Coffee Maker Machine",
    description: "15-bar professional pump system, steam nozzle for milk frothing, and a compact design.",
    price: 8999,
    originalPrice: 10999,
    category: "Home & Office",
    image: "https://images.unsplash.com/photo-1517256064527-09c53b2d0bc6?auto=format&fit=crop&w=500&q=80",
    countInStock: 10,
    rating: 4.5,
    numReviews: 94,
    isFeatured: false
  },
  {
    name: "Classic Hardcover Dotted Notebook",
    description: "Lay-flat notebook with 120gsm ink-proof pages, ideal for journaling, bullet lists, and sketching.",
    price: 499,
    originalPrice: 699,
    category: "Home & Office",
    image: "https://images.unsplash.com/photo-1531346878377-a5be20888e57?auto=format&fit=crop&w=500&q=80",
    countInStock: 100,
    rating: 4.7,
    numReviews: 215,
    isFeatured: false
  },

  // 4. Fashion
  {
    name: "Nike Air Max Sneakers",
    description: "Retro Air Max running shoes providing cloud-like cushioning and a sleek silhouette.",
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
    description: "Premium full-grain leather, padded 15-inch laptop compartment, and dual water bottle pockets.",
    price: 4499,
    originalPrice: 5999,
    category: "Fashion",
    image: "https://images.unsplash.com/photo-1553062407-98eeb64c6a62?auto=format&fit=crop&w=500&q=80",
    countInStock: 20,
    rating: 4.5,
    numReviews: 74,
    isFeatured: false
  },
  {
    name: "Waterproof Windbreaker Jacket",
    description: "Ultra-lightweight rain jacket with adjustable hood and fully taped zip seams.",
    price: 2999,
    originalPrice: 3999,
    category: "Fashion",
    image: "https://images.unsplash.com/photo-1548883354-7622d03aca27?auto=format&fit=crop&w=500&q=80",
    countInStock: 22,
    rating: 4.4,
    numReviews: 53,
    isFeatured: false
  },
  {
    name: "Premium Cotton Crewneck T-Shirt",
    description: "Pack of 2 ultra-soft combed cotton tees with a tagless collar and active tailoring fit.",
    price: 999,
    originalPrice: 1499,
    category: "Fashion",
    image: "https://images.unsplash.com/photo-1521572267360-ee0c2909d518?auto=format&fit=crop&w=500&q=80",
    countInStock: 50,
    rating: 4.3,
    numReviews: 126,
    isFeatured: false
  },
  {
    name: "Classic Aviator Sunglasses",
    description: "Polarized UV400 lenses with solid metal frame backing and soft silicone nose pads.",
    price: 1499,
    originalPrice: 1999,
    category: "Fashion",
    image: "https://images.unsplash.com/photo-1572635196237-14b3f281503f?auto=format&fit=crop&w=500&q=80",
    countInStock: 30,
    rating: 4.5,
    numReviews: 89,
    isFeatured: false
  }
];

const autoSeed = async () => {
  try {
    const count = await Product.countDocuments();
    if (count < 20) {
      console.log(`Product database contains only ${count} products. Auto-seeding 20 products...`);
      await Product.deleteMany({});
      await Product.insertMany(sampleProducts);
      console.log('Auto-seeding completed successfully.');
    } else {
      console.log(`Product database contains ${count} products. Skipping auto-seed.`);
    }
  } catch (error) {
    console.error('Error during auto-seeding:', error.message);
  }
};

module.exports = autoSeed;
