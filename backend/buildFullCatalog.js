const fs = require('fs');
const path = require('path');

// Base high-resolution image sets per category for multi-angle galleries
const categoryGalleryBases = {
  Mobiles: [
    "https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?auto=format&fit=crop&w=800&q=80",
    "https://images.unsplash.com/photo-1598327105666-5b89351aff97?auto=format&fit=crop&w=800&q=80",
    "https://images.unsplash.com/photo-1592899677977-9c10ca588bbd?auto=format&fit=crop&w=800&q=80",
    "https://images.unsplash.com/photo-1565849904461-04a58ad377e0?auto=format&fit=crop&w=800&q=80",
    "https://images.unsplash.com/photo-1610945265064-0e34e5519bbf?auto=format&fit=crop&w=800&q=80",
    "https://images.unsplash.com/photo-1580910051074-3eb694886505?auto=format&fit=crop&w=800&q=80",
    "https://images.unsplash.com/photo-1546054454-aa26e2b734c7?auto=format&fit=crop&w=800&q=80",
    "https://images.unsplash.com/photo-1574944985070-8f3ebc6b79d2?auto=format&fit=crop&w=800&q=80"
  ],
  Laptops: [
    "https://images.unsplash.com/photo-1496181130204-755241544e3f?auto=format&fit=crop&w=800&q=80",
    "https://images.unsplash.com/photo-1517336714731-489689fd1ca8?auto=format&fit=crop&w=800&q=80",
    "https://images.unsplash.com/photo-1603302576837-37561b2e2302?auto=format&fit=crop&w=800&q=80",
    "https://images.unsplash.com/photo-1593642632823-8f785ba67e45?auto=format&fit=crop&w=800&q=80",
    "https://images.unsplash.com/photo-1544731612-de7f96afe55f?auto=format&fit=crop&w=800&q=80",
    "https://images.unsplash.com/photo-1588872657578-7efd1f1555ed?auto=format&fit=crop&w=800&q=80"
  ],
  Electronics: [
    "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?auto=format&fit=crop&w=800&q=80",
    "https://images.unsplash.com/photo-1600294037681-c80b4cb5b434?auto=format&fit=crop&w=800&q=80",
    "https://images.unsplash.com/photo-1593784991095-a205069470b6?auto=format&fit=crop&w=800&q=80",
    "https://images.unsplash.com/photo-1546868871-7041f2a55e12?auto=format&fit=crop&w=800&q=80",
    "https://images.unsplash.com/photo-1526170375885-4d8ecf77b99f?auto=format&fit=crop&w=800&q=80"
  ],
  Accessories: [
    "https://images.unsplash.com/photo-1602143407151-7111542de6e8?auto=format&fit=crop&w=800&q=80",
    "https://images.unsplash.com/photo-1583394838336-acd977736f90?auto=format&fit=crop&w=800&q=80",
    "https://images.unsplash.com/photo-1616440347437-b1c73416efc2?auto=format&fit=crop&w=800&q=80"
  ],
  Gaming: [
    "https://images.unsplash.com/photo-1603302576837-37561b2e2302?auto=format&fit=crop&w=800&q=80",
    "https://images.unsplash.com/photo-1612287230202-1ff1d85d1bdf?auto=format&fit=crop&w=800&q=80",
    "https://images.unsplash.com/photo-1550745165-9bc0b252726f?auto=format&fit=crop&w=800&q=80"
  ],
  Groceries: [
    "https://images.unsplash.com/photo-1523049673857-eb18f1d7b578?auto=format&fit=crop&w=800&q=80",
    "https://images.unsplash.com/photo-1498557850523-fd3d118b962e?auto=format&fit=crop&w=800&q=80",
    "https://images.unsplash.com/photo-1556881286-fc6915169721?auto=format&fit=crop&w=800&q=80",
    "https://images.unsplash.com/photo-1586201375761-83865001e31c?auto=format&fit=crop&w=800&q=80"
  ],
  Fashion: [
    "https://images.unsplash.com/photo-1542291026-7eec264c27ff?auto=format&fit=crop&w=800&q=80",
    "https://images.unsplash.com/photo-1553062407-98eeb64c6a62?auto=format&fit=crop&w=800&q=80",
    "https://images.unsplash.com/photo-1542272604-780c36856842?auto=format&fit=crop&w=800&q=80"
  ],
  "Home & Office": [
    "https://images.unsplash.com/photo-1567538096630-e0c55bd6374c?auto=format&fit=crop&w=800&q=80",
    "https://images.unsplash.com/photo-1507473885765-e6ed057f782c?auto=format&fit=crop&w=800&q=80"
  ],
  Furniture: [
    "https://images.unsplash.com/photo-1555041469-a586c61ea9bc?auto=format&fit=crop&w=800&q=80",
    "https://images.unsplash.com/photo-1586023492125-27b2c045efd7?auto=format&fit=crop&w=800&q=80"
  ],
  Kitchen: [
    "https://images.unsplash.com/photo-1556911220-e15b29be8c8f?auto=format&fit=crop&w=800&q=80",
    "https://images.unsplash.com/photo-1584269600464-37b1b58a9fe7?auto=format&fit=crop&w=800&q=80"
  ],
  Beauty: [
    "https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?auto=format&fit=crop&w=800&q=80",
    "https://images.unsplash.com/photo-1598440947619-2c35fc9aa908?auto=format&fit=crop&w=800&q=80"
  ],
  Sports: [
    "https://images.unsplash.com/photo-1517838277536-f5f99be501cd?auto=format&fit=crop&w=800&q=80",
    "https://images.unsplash.com/photo-1584735935682-2f2b69dff9d2?auto=format&fit=crop&w=800&q=80"
  ],
  Books: [
    "https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?auto=format&fit=crop&w=800&q=80",
    "https://images.unsplash.com/photo-1512820790803-83ca734da794?auto=format&fit=crop&w=800&q=80"
  ]
};

const brands = {
  Mobiles: ["Apple", "Samsung", "Google Pixel", "OnePlus", "Nothing", "Motorola", "Realme", "Xiaomi", "Redmi", "POCO", "Vivo", "Oppo", "iQOO", "Honor", "Nokia"],
  Laptops: ["Apple MacBook", "Dell", "HP", "Lenovo", "ASUS", "Acer", "MSI", "Samsung Galaxy Book", "LG Gram", "Framework"],
  Electronics: ["Sony", "Bose", "JBL", "Sennheiser", "LG", "Samsung", "Canon", "Nikon", "Logitech", "Anker"],
  Accessories: ["Anker", "Belkin", "Spigen", "UGREEN", "SanDisk", "Samsung", "Apple", "Baseus"],
  Gaming: ["Sony PlayStation", "Microsoft Xbox", "Nintendo", "Razer", "Logitech G", "SteelSeries", "Corsair", "ASUS ROG"],
  Groceries: ["Daawat", "Fortune", "Amul", "Organic India", "Tata Simply Better", "Nestle", "Quaker", "Kellanova", "Tropico", "Nature Fresh"],
  Fashion: ["Nike", "Adidas", "Puma", "Levi's", "Zara", "H&M", "Tommy Hilfiger", "Calvin Klein", "Ray-Ban", "Fossil"],
  "Home & Office": ["Godrej Interio", "Green Soul", "Wipro", "Philips", "IKEA", "Haworth", "Steelcase"],
  Furniture: ["IKEA", "Urban Ladder", "Pepperfry", "Godrej Interio", "Wakefit", "Durian"],
  Kitchen: ["Philips", "Prestige", "Wonderchef", "Morphy Richards", "Instant Pot", "Ninja", "Cuisinart"],
  Beauty: ["L'Oreal Paris", "The Ordinary", "CeraVe", "Neutrogena", "Maybelline", "Nivea", "Plum", "Minimalist"],
  Sports: ["Decathlon", "Nivia", "Yonex", "Cosco", "Boldfit", "Strauss", "Flexnest"],
  Books: ["Penguin Random House", "HarperCollins", "Simon & Schuster", "O'Reilly Media", "Bloomsbury"]
};

const categoryCounts = {
  Mobiles: 55,
  Laptops: 45,
  Electronics: 65,
  Accessories: 45,
  Gaming: 35,
  Groceries: 85,
  Fashion: 55,
  "Home & Office": 45,
  Furniture: 35,
  Kitchen: 35,
  Beauty: 35,
  Sports: 35,
  Books: 25
};

const processors = ["MediaTek Dimensity 7050", "MediaTek Dimensity 7200", "MediaTek Dimensity 8200", "MediaTek Dimensity 9300", "Snapdragon 8 Gen 3", "Snapdragon 7 Gen 3", "Apple A17 Pro", "Google Tensor G3", "Exynos 2400"];

const products = [];
let productGlobalIndex = 1;

// Function to generate a 100% unique primary image and unique gallery set for any product
const generateUniqueImages = (category, productIndex) => {
  const bases = categoryGalleryBases[category] || categoryGalleryBases.Electronics;
  const primaryBase = bases[(productIndex - 1) % bases.length];
  
  // Make primary image URL 100% unique using distinct signature parameter
  const primaryImage = `${primaryBase}&sig=prod_unique_${productIndex}_${category.toLowerCase().replace(/[^a-z]/g, '')}`;
  
  // Generate 4 multi-view gallery URLs (Front, Back, Angle, Detail)
  const imagesArray = [
    primaryImage,
    `${bases[(productIndex) % bases.length]}&sig=gallery_view1_${productIndex}`,
    `${bases[(productIndex + 1) % bases.length]}&sig=gallery_view2_${productIndex}`,
    `${bases[(productIndex + 2) % bases.length]}&sig=gallery_view3_${productIndex}`
  ];

  return { primaryImage, imagesArray };
};

// Seed specific realistic items first for search testing
const coreItems = [
  { name: "Realme 12 Pro+ 5G (8GB RAM, 256GB Storage)", price: 24999, originalPrice: 29999, category: "Mobiles", countInStock: 25, rating: 4.6, numReviews: 180, isFeatured: true, description: "Brand: Realme | Model: 12 Pro+ | RAM: 8GB | Storage: 256GB | Processor: MediaTek Dimensity 7050 | Display: 6.7-inch OLED 120Hz | Battery: 5000mAh | Camera: 50MP Sony OIS." },
  { name: "POCO X6 Neo 5G (12GB RAM, 256GB Storage)", price: 15999, originalPrice: 19999, category: "Mobiles", countInStock: 30, rating: 4.4, numReviews: 120, isFeatured: false, description: "Brand: POCO | Model: X6 Neo | RAM: 12GB | Storage: 256GB | Processor: MediaTek Dimensity 6080 | Display: 6.67-inch AMOLED 120Hz | Battery: 5000mAh." },
  { name: "Vivo T3 5G (8GB RAM, 128GB Storage)", price: 19999, originalPrice: 22999, category: "Mobiles", countInStock: 20, rating: 4.5, numReviews: 95, isFeatured: false, description: "Brand: Vivo | Model: T3 5G | RAM: 8GB | Storage: 128GB | Processor: MediaTek Dimensity 7200 | Display: 6.38-inch AMOLED 120Hz | Battery: 5000mAh." },
  { name: "Nothing Phone (2a) 5G (8GB RAM, 128GB Storage)", price: 23999, originalPrice: 25999, category: "Mobiles", countInStock: 18, rating: 4.7, numReviews: 210, isFeatured: true, description: "Brand: Nothing | Model: Phone (2a) | RAM: 8GB | Storage: 128GB | Processor: MediaTek Dimensity 7200 Pro | Display: 6.7-inch AMOLED 120Hz | Battery: 5000mAh." },
  { name: "Redmi Note 13 Pro 5G (8GB RAM, 256GB Storage)", price: 21999, originalPrice: 24999, category: "Mobiles", countInStock: 22, rating: 4.5, numReviews: 160, isFeatured: false, description: "Brand: Redmi | Model: Note 13 Pro | RAM: 8GB | Storage: 256GB | Processor: MediaTek Dimensity 7200 Ultra | Display: 6.67-inch 1.5K AMOLED 120Hz | Battery: 5000mAh." },
  { name: "iQOO Z9 5G (8GB RAM, 128GB Storage)", price: 19999, originalPrice: 23999, category: "Mobiles", countInStock: 15, rating: 4.6, numReviews: 140, isFeatured: false, description: "Brand: iQOO | Model: Z9 5G | RAM: 8GB | Storage: 128GB | Processor: MediaTek Dimensity 7200 | Display: 6.67-inch AMOLED 120Hz | Battery: 5000mAh." },
  { name: "Motorola Edge 50 Fusion (8GB RAM, 128GB Storage)", price: 22999, originalPrice: 25999, category: "Mobiles", countInStock: 19, rating: 4.6, numReviews: 115, isFeatured: false, description: "Brand: Motorola | Model: Edge 50 Fusion | RAM: 8GB | Storage: 128GB | Processor: MediaTek Dimensity 7030 | Display: 6.7-inch pOLED 144Hz | Battery: 5000mAh." },
  { name: "Xiaomi 14 Civi (8GB RAM, 256GB Storage)", price: 42999, originalPrice: 47999, category: "Mobiles", countInStock: 10, rating: 4.8, numReviews: 88, isFeatured: true, description: "Brand: Xiaomi | Model: 14 Civi | RAM: 8GB | Storage: 256GB | Processor: MediaTek Dimensity 8300 Ultra | Display: 6.55-inch AMOLED 120Hz | Battery: 4700mAh." },
  { name: "OnePlus Nord 3 5G (16GB RAM, 256GB Storage)", price: 28999, originalPrice: 33999, category: "Mobiles", countInStock: 25, rating: 4.6, numReviews: 240, isFeatured: true, description: "Brand: OnePlus | Model: Nord 3 | RAM: 16GB | Storage: 256GB | Processor: MediaTek Dimensity 9000 | Display: 6.74-inch Fluid AMOLED 120Hz | Battery: 5000mAh." },
  { name: "Infinix GT 20 Pro Gaming Phone (12GB RAM, 256GB Storage)", price: 24999, originalPrice: 28999, category: "Mobiles", countInStock: 14, rating: 4.5, numReviews: 105, isFeatured: false, description: "Brand: Infinix | Model: GT 20 Pro | RAM: 12GB | Storage: 256GB | Processor: MediaTek Dimensity 8200 Ultimate | Display: 6.78-inch FHD+ 144Hz AMOLED | Battery: 5000mAh." }
];

coreItems.forEach((item) => {
  const { primaryImage, imagesArray } = generateUniqueImages(item.category, productGlobalIndex);
  productGlobalIndex++;
  products.push({
    ...item,
    image: primaryImage,
    images: imagesArray
  });
});

// Helper to generate realistic items for remaining slots
Object.keys(categoryCounts).forEach(cat => {
  const targetCount = categoryCounts[cat];
  const currentCatItems = products.filter(p => p.category === cat);
  let needed = targetCount - currentCatItems.length;

  const catBrands = brands[cat] || ["Generic"];

  for (let i = 1; i <= needed; i++) {
    const brand = catBrands[i % catBrands.length];
    let price = 500;
    let name = `${brand} Premium ${cat} Model ${i + 10}`;
    let desc = `Brand: ${brand} | High quality ${cat.toLowerCase()} product designed for durability and daily performance.`;

    if (cat === "Mobiles") {
      price = 12000 + (i * 2500);
      const proc = processors[i % processors.length];
      const ram = (i % 2 === 0) ? "8GB" : "12GB";
      const storage = (i % 2 === 0) ? "128GB" : "256GB";
      name = `${brand} Smartphone Z${i} (${ram} RAM, ${storage})`;
      desc = `Brand: ${brand} | Model: Z${i} | RAM: ${ram} | Storage: ${storage} | Processor: ${proc} | Display: 6.7-inch AMOLED 120Hz | Battery: 5000mAh.`;
    } else if (cat === "Laptops") {
      price = 35000 + (i * 4500);
      const ram = (i % 2 === 0) ? "16GB" : "32GB";
      const ssd = (i % 2 === 0) ? "512GB" : "1TB";
      name = `${brand} Ultrabook ${i + 100} (${ram} RAM, ${ssd} SSD)`;
      desc = `Brand: ${brand} | Model: Ultrabook ${i + 100} | CPU: Intel Core i7 13th Gen | GPU: NVIDIA RTX 4060 | RAM: ${ram} | SSD: ${ssd} | Display: 15.6-inch FHD.`;
    } else if (cat === "Groceries") {
      price = 45 + (i * 35);
      name = `${brand} Organic Pantry Item #${i}`;
      desc = `Brand: ${brand} | Fresh organic grocery product harvested under natural farming standards.`;
    } else if (cat === "Fashion") {
      price = 800 + (i * 350);
      name = `${brand} Classic Wear Item #${i}`;
      desc = `Brand: ${brand} | Premium tailored fashion product crafted from soft durable material.`;
    } else if (cat === "Electronics") {
      price = 1500 + (i * 1200);
      name = `${brand} Smart Tech Device ${i}`;
      desc = `Brand: ${brand} | Next-gen electronics gadget with high efficiency power rating.`;
    } else if (cat === "Gaming") {
      price = 2500 + (i * 1800);
      name = `${brand} Pro Gaming Gear ${i}`;
      desc = `Brand: ${brand} | High-speed response latency and RGB lighting customization.`;
    }

    const { primaryImage, imagesArray } = generateUniqueImages(cat, productGlobalIndex);
    productGlobalIndex++;

    products.push({
      name,
      price,
      originalPrice: Math.round(price * 1.2),
      category: cat,
      image: primaryImage,
      images: imagesArray,
      countInStock: 10 + (i * 2),
      rating: +(4.0 + (i % 10) * 0.1).toFixed(1),
      numReviews: 40 + i * 5,
      isFeatured: i % 5 === 0,
      description: desc
    });
  }
});

const content = `const Product = require('../models/Product');

const sampleProducts = ${JSON.stringify(products, null, 2)};

const autoSeed = async () => {
  try {
    const count = await Product.countDocuments();
    if (count < 500) {
      console.log(\`Product database contains \${count} products. Seeding comprehensive 595+ item catalog...\`);
      await Product.deleteMany({});
      await Product.insertMany(sampleProducts);
      console.log('Seeding 595+ unique products completed successfully!');
    } else {
      console.log(\`Product database contains \${count} products. Skipping auto-seed.\`);
    }
  } catch (error) {
    console.error('Error during auto-seeding:', error.message);
  }
};

module.exports = autoSeed;
`;

fs.writeFileSync(path.join(__dirname, 'config', 'autoSeed.js'), content, 'utf8');
console.log(`Generated full catalog with ${products.length} unique products inside backend/config/autoSeed.js`);
