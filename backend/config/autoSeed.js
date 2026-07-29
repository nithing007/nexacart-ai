const Product = require('../models/Product');

const sampleProducts = [
  {
    "name": "Realme 12 Pro+ 5G (8GB RAM, 256GB Storage)",
    "price": 24999,
    "originalPrice": 29999,
    "category": "Mobiles",
    "countInStock": 25,
    "rating": 4.6,
    "numReviews": 180,
    "isFeatured": true,
    "description": "Brand: Realme | Model: 12 Pro+ | RAM: 8GB | Storage: 256GB | Processor: MediaTek Dimensity 7050 | Display: 6.7-inch OLED 120Hz | Battery: 5000mAh | Camera: 50MP Sony OIS.",
    "image": "https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?auto=format&fit=crop&w=800&q=80&sig=prod_unique_1_mobiles",
    "images": [
      "https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?auto=format&fit=crop&w=800&q=80&sig=prod_unique_1_mobiles",
      "https://images.unsplash.com/photo-1598327105666-5b89351aff97?auto=format&fit=crop&w=800&q=80&sig=gallery_view1_1",
      "https://images.unsplash.com/photo-1592899677977-9c10ca588bbd?auto=format&fit=crop&w=800&q=80&sig=gallery_view2_1",
      "https://images.unsplash.com/photo-1565849904461-04a58ad377e0?auto=format&fit=crop&w=800&q=80&sig=gallery_view3_1"
    ]
  },
  {
    "name": "POCO X6 Neo 5G (12GB RAM, 256GB Storage)",
    "price": 15999,
    "originalPrice": 19999,
    "category": "Mobiles",
    "countInStock": 30,
    "rating": 4.4,
    "numReviews": 120,
    "isFeatured": false,
    "description": "Brand: POCO | Model: X6 Neo | RAM: 12GB | Storage: 256GB | Processor: MediaTek Dimensity 6080 | Display: 6.67-inch AMOLED 120Hz | Battery: 5000mAh.",
    "image": "https://images.unsplash.com/photo-1598327105666-5b89351aff97?auto=format&fit=crop&w=800&q=80&sig=prod_unique_2_mobiles",
    "images": [
      "https://images.unsplash.com/photo-1598327105666-5b89351aff97?auto=format&fit=crop&w=800&q=80&sig=prod_unique_2_mobiles",
      "https://images.unsplash.com/photo-1592899677977-9c10ca588bbd?auto=format&fit=crop&w=800&q=80&sig=gallery_view1_2",
      "https://images.unsplash.com/photo-1565849904461-04a58ad377e0?auto=format&fit=crop&w=800&q=80&sig=gallery_view2_2",
      "https://images.unsplash.com/photo-1610945265064-0e34e5519bbf?auto=format&fit=crop&w=800&q=80&sig=gallery_view3_2"
    ]
  },
  {
    "name": "Vivo T3 5G (8GB RAM, 128GB Storage)",
    "price": 19999,
    "originalPrice": 22999,
    "category": "Mobiles",
    "countInStock": 20,
    "rating": 4.5,
    "numReviews": 95,
    "isFeatured": false,
    "description": "Brand: Vivo | Model: T3 5G | RAM: 8GB | Storage: 128GB | Processor: MediaTek Dimensity 7200 | Display: 6.38-inch AMOLED 120Hz | Battery: 5000mAh.",
    "image": "https://images.unsplash.com/photo-1592899677977-9c10ca588bbd?auto=format&fit=crop&w=800&q=80&sig=prod_unique_3_mobiles",
    "images": [
      "https://images.unsplash.com/photo-1592899677977-9c10ca588bbd?auto=format&fit=crop&w=800&q=80&sig=prod_unique_3_mobiles",
      "https://images.unsplash.com/photo-1565849904461-04a58ad377e0?auto=format&fit=crop&w=800&q=80&sig=gallery_view1_3",
      "https://images.unsplash.com/photo-1610945265064-0e34e5519bbf?auto=format&fit=crop&w=800&q=80&sig=gallery_view2_3",
      "https://images.unsplash.com/photo-1580910051074-3eb694886505?auto=format&fit=crop&w=800&q=80&sig=gallery_view3_3"
    ]
  },
  {
    "name": "Nothing Phone (2a) 5G (8GB RAM, 128GB Storage)",
    "price": 23999,
    "originalPrice": 25999,
    "category": "Mobiles",
    "countInStock": 18,
    "rating": 4.7,
    "numReviews": 210,
    "isFeatured": true,
    "description": "Brand: Nothing | Model: Phone (2a) | RAM: 8GB | Storage: 128GB | Processor: MediaTek Dimensity 7200 Pro | Display: 6.7-inch AMOLED 120Hz | Battery: 5000mAh.",
    "image": "https://images.unsplash.com/photo-1565849904461-04a58ad377e0?auto=format&fit=crop&w=800&q=80&sig=prod_unique_4_mobiles",
    "images": [
      "https://images.unsplash.com/photo-1565849904461-04a58ad377e0?auto=format&fit=crop&w=800&q=80&sig=prod_unique_4_mobiles",
      "https://images.unsplash.com/photo-1610945265064-0e34e5519bbf?auto=format&fit=crop&w=800&q=80&sig=gallery_view1_4",
      "https://images.unsplash.com/photo-1580910051074-3eb694886505?auto=format&fit=crop&w=800&q=80&sig=gallery_view2_4",
      "https://images.unsplash.com/photo-1546054454-aa26e2b734c7?auto=format&fit=crop&w=800&q=80&sig=gallery_view3_4"
    ]
  },
  {
    "name": "Redmi Note 13 Pro 5G (8GB RAM, 256GB Storage)",
    "price": 21999,
    "originalPrice": 24999,
    "category": "Mobiles",
    "countInStock": 22,
    "rating": 4.5,
    "numReviews": 160,
    "isFeatured": false,
    "description": "Brand: Redmi | Model: Note 13 Pro | RAM: 8GB | Storage: 256GB | Processor: MediaTek Dimensity 7200 Ultra | Display: 6.67-inch 1.5K AMOLED 120Hz | Battery: 5000mAh.",
    "image": "https://images.unsplash.com/photo-1610945265064-0e34e5519bbf?auto=format&fit=crop&w=800&q=80&sig=prod_unique_5_mobiles",
    "images": [
      "https://images.unsplash.com/photo-1610945265064-0e34e5519bbf?auto=format&fit=crop&w=800&q=80&sig=prod_unique_5_mobiles",
      "https://images.unsplash.com/photo-1580910051074-3eb694886505?auto=format&fit=crop&w=800&q=80&sig=gallery_view1_5",
      "https://images.unsplash.com/photo-1546054454-aa26e2b734c7?auto=format&fit=crop&w=800&q=80&sig=gallery_view2_5",
      "https://images.unsplash.com/photo-1574944985070-8f3ebc6b79d2?auto=format&fit=crop&w=800&q=80&sig=gallery_view3_5"
    ]
  },
  {
    "name": "iQOO Z9 5G (8GB RAM, 128GB Storage)",
    "price": 19999,
    "originalPrice": 23999,
    "category": "Mobiles",
    "countInStock": 15,
    "rating": 4.6,
    "numReviews": 140,
    "isFeatured": false,
    "description": "Brand: iQOO | Model: Z9 5G | RAM: 8GB | Storage: 128GB | Processor: MediaTek Dimensity 7200 | Display: 6.67-inch AMOLED 120Hz | Battery: 5000mAh.",
    "image": "https://images.unsplash.com/photo-1580910051074-3eb694886505?auto=format&fit=crop&w=800&q=80&sig=prod_unique_6_mobiles",
    "images": [
      "https://images.unsplash.com/photo-1580910051074-3eb694886505?auto=format&fit=crop&w=800&q=80&sig=prod_unique_6_mobiles",
      "https://images.unsplash.com/photo-1546054454-aa26e2b734c7?auto=format&fit=crop&w=800&q=80&sig=gallery_view1_6",
      "https://images.unsplash.com/photo-1574944985070-8f3ebc6b79d2?auto=format&fit=crop&w=800&q=80&sig=gallery_view2_6",
      "https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?auto=format&fit=crop&w=800&q=80&sig=gallery_view3_6"
    ]
  },
  {
    "name": "Motorola Edge 50 Fusion (8GB RAM, 128GB Storage)",
    "price": 22999,
    "originalPrice": 25999,
    "category": "Mobiles",
    "countInStock": 19,
    "rating": 4.6,
    "numReviews": 115,
    "isFeatured": false,
    "description": "Brand: Motorola | Model: Edge 50 Fusion | RAM: 8GB | Storage: 128GB | Processor: MediaTek Dimensity 7030 | Display: 6.7-inch pOLED 144Hz | Battery: 5000mAh.",
    "image": "https://images.unsplash.com/photo-1546054454-aa26e2b734c7?auto=format&fit=crop&w=800&q=80&sig=prod_unique_7_mobiles",
    "images": [
      "https://images.unsplash.com/photo-1546054454-aa26e2b734c7?auto=format&fit=crop&w=800&q=80&sig=prod_unique_7_mobiles",
      "https://images.unsplash.com/photo-1574944985070-8f3ebc6b79d2?auto=format&fit=crop&w=800&q=80&sig=gallery_view1_7",
      "https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?auto=format&fit=crop&w=800&q=80&sig=gallery_view2_7",
      "https://images.unsplash.com/photo-1598327105666-5b89351aff97?auto=format&fit=crop&w=800&q=80&sig=gallery_view3_7"
    ]
  },
  {
    "name": "Xiaomi 14 Civi (8GB RAM, 256GB Storage)",
    "price": 42999,
    "originalPrice": 47999,
    "category": "Mobiles",
    "countInStock": 10,
    "rating": 4.8,
    "numReviews": 88,
    "isFeatured": true,
    "description": "Brand: Xiaomi | Model: 14 Civi | RAM: 8GB | Storage: 256GB | Processor: MediaTek Dimensity 8300 Ultra | Display: 6.55-inch AMOLED 120Hz | Battery: 4700mAh.",
    "image": "https://images.unsplash.com/photo-1574944985070-8f3ebc6b79d2?auto=format&fit=crop&w=800&q=80&sig=prod_unique_8_mobiles",
    "images": [
      "https://images.unsplash.com/photo-1574944985070-8f3ebc6b79d2?auto=format&fit=crop&w=800&q=80&sig=prod_unique_8_mobiles",
      "https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?auto=format&fit=crop&w=800&q=80&sig=gallery_view1_8",
      "https://images.unsplash.com/photo-1598327105666-5b89351aff97?auto=format&fit=crop&w=800&q=80&sig=gallery_view2_8",
      "https://images.unsplash.com/photo-1592899677977-9c10ca588bbd?auto=format&fit=crop&w=800&q=80&sig=gallery_view3_8"
    ]
  },
  {
    "name": "OnePlus Nord 3 5G (16GB RAM, 256GB Storage)",
    "price": 28999,
    "originalPrice": 33999,
    "category": "Mobiles",
    "countInStock": 25,
    "rating": 4.6,
    "numReviews": 240,
    "isFeatured": true,
    "description": "Brand: OnePlus | Model: Nord 3 | RAM: 16GB | Storage: 256GB | Processor: MediaTek Dimensity 9000 | Display: 6.74-inch Fluid AMOLED 120Hz | Battery: 5000mAh.",
    "image": "https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?auto=format&fit=crop&w=800&q=80&sig=prod_unique_9_mobiles",
    "images": [
      "https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?auto=format&fit=crop&w=800&q=80&sig=prod_unique_9_mobiles",
      "https://images.unsplash.com/photo-1598327105666-5b89351aff97?auto=format&fit=crop&w=800&q=80&sig=gallery_view1_9",
      "https://images.unsplash.com/photo-1592899677977-9c10ca588bbd?auto=format&fit=crop&w=800&q=80&sig=gallery_view2_9",
      "https://images.unsplash.com/photo-1565849904461-04a58ad377e0?auto=format&fit=crop&w=800&q=80&sig=gallery_view3_9"
    ]
  },
  {
    "name": "Infinix GT 20 Pro Gaming Phone (12GB RAM, 256GB Storage)",
    "price": 24999,
    "originalPrice": 28999,
    "category": "Mobiles",
    "countInStock": 14,
    "rating": 4.5,
    "numReviews": 105,
    "isFeatured": false,
    "description": "Brand: Infinix | Model: GT 20 Pro | RAM: 12GB | Storage: 256GB | Processor: MediaTek Dimensity 8200 Ultimate | Display: 6.78-inch FHD+ 144Hz AMOLED | Battery: 5000mAh.",
    "image": "https://images.unsplash.com/photo-1598327105666-5b89351aff97?auto=format&fit=crop&w=800&q=80&sig=prod_unique_10_mobiles",
    "images": [
      "https://images.unsplash.com/photo-1598327105666-5b89351aff97?auto=format&fit=crop&w=800&q=80&sig=prod_unique_10_mobiles",
      "https://images.unsplash.com/photo-1592899677977-9c10ca588bbd?auto=format&fit=crop&w=800&q=80&sig=gallery_view1_10",
      "https://images.unsplash.com/photo-1565849904461-04a58ad377e0?auto=format&fit=crop&w=800&q=80&sig=gallery_view2_10",
      "https://images.unsplash.com/photo-1610945265064-0e34e5519bbf?auto=format&fit=crop&w=800&q=80&sig=gallery_view3_10"
    ]
  },
  {
    "name": "Samsung Smartphone Z1 (12GB RAM, 256GB)",
    "price": 14500,
    "originalPrice": 17400,
    "category": "Mobiles",
    "image": "https://images.unsplash.com/photo-1592899677977-9c10ca588bbd?auto=format&fit=crop&w=800&q=80&sig=prod_unique_11_mobiles",
    "images": [
      "https://images.unsplash.com/photo-1592899677977-9c10ca588bbd?auto=format&fit=crop&w=800&q=80&sig=prod_unique_11_mobiles",
      "https://images.unsplash.com/photo-1565849904461-04a58ad377e0?auto=format&fit=crop&w=800&q=80&sig=gallery_view1_11",
      "https://images.unsplash.com/photo-1610945265064-0e34e5519bbf?auto=format&fit=crop&w=800&q=80&sig=gallery_view2_11",
      "https://images.unsplash.com/photo-1580910051074-3eb694886505?auto=format&fit=crop&w=800&q=80&sig=gallery_view3_11"
    ],
    "countInStock": 12,
    "rating": 4.1,
    "numReviews": 45,
    "isFeatured": false,
    "description": "Brand: Samsung | Model: Z1 | RAM: 12GB | Storage: 256GB | Processor: MediaTek Dimensity 7200 | Display: 6.7-inch AMOLED 120Hz | Battery: 5000mAh."
  },
  {
    "name": "Google Pixel Smartphone Z2 (8GB RAM, 128GB)",
    "price": 17000,
    "originalPrice": 20400,
    "category": "Mobiles",
    "image": "https://images.unsplash.com/photo-1565849904461-04a58ad377e0?auto=format&fit=crop&w=800&q=80&sig=prod_unique_12_mobiles",
    "images": [
      "https://images.unsplash.com/photo-1565849904461-04a58ad377e0?auto=format&fit=crop&w=800&q=80&sig=prod_unique_12_mobiles",
      "https://images.unsplash.com/photo-1610945265064-0e34e5519bbf?auto=format&fit=crop&w=800&q=80&sig=gallery_view1_12",
      "https://images.unsplash.com/photo-1580910051074-3eb694886505?auto=format&fit=crop&w=800&q=80&sig=gallery_view2_12",
      "https://images.unsplash.com/photo-1546054454-aa26e2b734c7?auto=format&fit=crop&w=800&q=80&sig=gallery_view3_12"
    ],
    "countInStock": 14,
    "rating": 4.2,
    "numReviews": 50,
    "isFeatured": false,
    "description": "Brand: Google Pixel | Model: Z2 | RAM: 8GB | Storage: 128GB | Processor: MediaTek Dimensity 8200 | Display: 6.7-inch AMOLED 120Hz | Battery: 5000mAh."
  },
  {
    "name": "OnePlus Smartphone Z3 (12GB RAM, 256GB)",
    "price": 19500,
    "originalPrice": 23400,
    "category": "Mobiles",
    "image": "https://images.unsplash.com/photo-1610945265064-0e34e5519bbf?auto=format&fit=crop&w=800&q=80&sig=prod_unique_13_mobiles",
    "images": [
      "https://images.unsplash.com/photo-1610945265064-0e34e5519bbf?auto=format&fit=crop&w=800&q=80&sig=prod_unique_13_mobiles",
      "https://images.unsplash.com/photo-1580910051074-3eb694886505?auto=format&fit=crop&w=800&q=80&sig=gallery_view1_13",
      "https://images.unsplash.com/photo-1546054454-aa26e2b734c7?auto=format&fit=crop&w=800&q=80&sig=gallery_view2_13",
      "https://images.unsplash.com/photo-1574944985070-8f3ebc6b79d2?auto=format&fit=crop&w=800&q=80&sig=gallery_view3_13"
    ],
    "countInStock": 16,
    "rating": 4.3,
    "numReviews": 55,
    "isFeatured": false,
    "description": "Brand: OnePlus | Model: Z3 | RAM: 12GB | Storage: 256GB | Processor: MediaTek Dimensity 9300 | Display: 6.7-inch AMOLED 120Hz | Battery: 5000mAh."
  },
  {
    "name": "Nothing Smartphone Z4 (8GB RAM, 128GB)",
    "price": 22000,
    "originalPrice": 26400,
    "category": "Mobiles",
    "image": "https://images.unsplash.com/photo-1580910051074-3eb694886505?auto=format&fit=crop&w=800&q=80&sig=prod_unique_14_mobiles",
    "images": [
      "https://images.unsplash.com/photo-1580910051074-3eb694886505?auto=format&fit=crop&w=800&q=80&sig=prod_unique_14_mobiles",
      "https://images.unsplash.com/photo-1546054454-aa26e2b734c7?auto=format&fit=crop&w=800&q=80&sig=gallery_view1_14",
      "https://images.unsplash.com/photo-1574944985070-8f3ebc6b79d2?auto=format&fit=crop&w=800&q=80&sig=gallery_view2_14",
      "https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?auto=format&fit=crop&w=800&q=80&sig=gallery_view3_14"
    ],
    "countInStock": 18,
    "rating": 4.4,
    "numReviews": 60,
    "isFeatured": false,
    "description": "Brand: Nothing | Model: Z4 | RAM: 8GB | Storage: 128GB | Processor: Snapdragon 8 Gen 3 | Display: 6.7-inch AMOLED 120Hz | Battery: 5000mAh."
  },
  {
    "name": "Motorola Smartphone Z5 (12GB RAM, 256GB)",
    "price": 24500,
    "originalPrice": 29400,
    "category": "Mobiles",
    "image": "https://images.unsplash.com/photo-1546054454-aa26e2b734c7?auto=format&fit=crop&w=800&q=80&sig=prod_unique_15_mobiles",
    "images": [
      "https://images.unsplash.com/photo-1546054454-aa26e2b734c7?auto=format&fit=crop&w=800&q=80&sig=prod_unique_15_mobiles",
      "https://images.unsplash.com/photo-1574944985070-8f3ebc6b79d2?auto=format&fit=crop&w=800&q=80&sig=gallery_view1_15",
      "https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?auto=format&fit=crop&w=800&q=80&sig=gallery_view2_15",
      "https://images.unsplash.com/photo-1598327105666-5b89351aff97?auto=format&fit=crop&w=800&q=80&sig=gallery_view3_15"
    ],
    "countInStock": 20,
    "rating": 4.5,
    "numReviews": 65,
    "isFeatured": true,
    "description": "Brand: Motorola | Model: Z5 | RAM: 12GB | Storage: 256GB | Processor: Snapdragon 7 Gen 3 | Display: 6.7-inch AMOLED 120Hz | Battery: 5000mAh."
  },
  {
    "name": "Realme Smartphone Z6 (8GB RAM, 128GB)",
    "price": 27000,
    "originalPrice": 32400,
    "category": "Mobiles",
    "image": "https://images.unsplash.com/photo-1574944985070-8f3ebc6b79d2?auto=format&fit=crop&w=800&q=80&sig=prod_unique_16_mobiles",
    "images": [
      "https://images.unsplash.com/photo-1574944985070-8f3ebc6b79d2?auto=format&fit=crop&w=800&q=80&sig=prod_unique_16_mobiles",
      "https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?auto=format&fit=crop&w=800&q=80&sig=gallery_view1_16",
      "https://images.unsplash.com/photo-1598327105666-5b89351aff97?auto=format&fit=crop&w=800&q=80&sig=gallery_view2_16",
      "https://images.unsplash.com/photo-1592899677977-9c10ca588bbd?auto=format&fit=crop&w=800&q=80&sig=gallery_view3_16"
    ],
    "countInStock": 22,
    "rating": 4.6,
    "numReviews": 70,
    "isFeatured": false,
    "description": "Brand: Realme | Model: Z6 | RAM: 8GB | Storage: 128GB | Processor: Apple A17 Pro | Display: 6.7-inch AMOLED 120Hz | Battery: 5000mAh."
  },
  {
    "name": "Xiaomi Smartphone Z7 (12GB RAM, 256GB)",
    "price": 29500,
    "originalPrice": 35400,
    "category": "Mobiles",
    "image": "https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?auto=format&fit=crop&w=800&q=80&sig=prod_unique_17_mobiles",
    "images": [
      "https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?auto=format&fit=crop&w=800&q=80&sig=prod_unique_17_mobiles",
      "https://images.unsplash.com/photo-1598327105666-5b89351aff97?auto=format&fit=crop&w=800&q=80&sig=gallery_view1_17",
      "https://images.unsplash.com/photo-1592899677977-9c10ca588bbd?auto=format&fit=crop&w=800&q=80&sig=gallery_view2_17",
      "https://images.unsplash.com/photo-1565849904461-04a58ad377e0?auto=format&fit=crop&w=800&q=80&sig=gallery_view3_17"
    ],
    "countInStock": 24,
    "rating": 4.7,
    "numReviews": 75,
    "isFeatured": false,
    "description": "Brand: Xiaomi | Model: Z7 | RAM: 12GB | Storage: 256GB | Processor: Google Tensor G3 | Display: 6.7-inch AMOLED 120Hz | Battery: 5000mAh."
  },
  {
    "name": "Redmi Smartphone Z8 (8GB RAM, 128GB)",
    "price": 32000,
    "originalPrice": 38400,
    "category": "Mobiles",
    "image": "https://images.unsplash.com/photo-1598327105666-5b89351aff97?auto=format&fit=crop&w=800&q=80&sig=prod_unique_18_mobiles",
    "images": [
      "https://images.unsplash.com/photo-1598327105666-5b89351aff97?auto=format&fit=crop&w=800&q=80&sig=prod_unique_18_mobiles",
      "https://images.unsplash.com/photo-1592899677977-9c10ca588bbd?auto=format&fit=crop&w=800&q=80&sig=gallery_view1_18",
      "https://images.unsplash.com/photo-1565849904461-04a58ad377e0?auto=format&fit=crop&w=800&q=80&sig=gallery_view2_18",
      "https://images.unsplash.com/photo-1610945265064-0e34e5519bbf?auto=format&fit=crop&w=800&q=80&sig=gallery_view3_18"
    ],
    "countInStock": 26,
    "rating": 4.8,
    "numReviews": 80,
    "isFeatured": false,
    "description": "Brand: Redmi | Model: Z8 | RAM: 8GB | Storage: 128GB | Processor: Exynos 2400 | Display: 6.7-inch AMOLED 120Hz | Battery: 5000mAh."
  },
  {
    "name": "POCO Smartphone Z9 (12GB RAM, 256GB)",
    "price": 34500,
    "originalPrice": 41400,
    "category": "Mobiles",
    "image": "https://images.unsplash.com/photo-1592899677977-9c10ca588bbd?auto=format&fit=crop&w=800&q=80&sig=prod_unique_19_mobiles",
    "images": [
      "https://images.unsplash.com/photo-1592899677977-9c10ca588bbd?auto=format&fit=crop&w=800&q=80&sig=prod_unique_19_mobiles",
      "https://images.unsplash.com/photo-1565849904461-04a58ad377e0?auto=format&fit=crop&w=800&q=80&sig=gallery_view1_19",
      "https://images.unsplash.com/photo-1610945265064-0e34e5519bbf?auto=format&fit=crop&w=800&q=80&sig=gallery_view2_19",
      "https://images.unsplash.com/photo-1580910051074-3eb694886505?auto=format&fit=crop&w=800&q=80&sig=gallery_view3_19"
    ],
    "countInStock": 28,
    "rating": 4.9,
    "numReviews": 85,
    "isFeatured": false,
    "description": "Brand: POCO | Model: Z9 | RAM: 12GB | Storage: 256GB | Processor: MediaTek Dimensity 7050 | Display: 6.7-inch AMOLED 120Hz | Battery: 5000mAh."
  },
  {
    "name": "Vivo Smartphone Z10 (8GB RAM, 128GB)",
    "price": 37000,
    "originalPrice": 44400,
    "category": "Mobiles",
    "image": "https://images.unsplash.com/photo-1565849904461-04a58ad377e0?auto=format&fit=crop&w=800&q=80&sig=prod_unique_20_mobiles",
    "images": [
      "https://images.unsplash.com/photo-1565849904461-04a58ad377e0?auto=format&fit=crop&w=800&q=80&sig=prod_unique_20_mobiles",
      "https://images.unsplash.com/photo-1610945265064-0e34e5519bbf?auto=format&fit=crop&w=800&q=80&sig=gallery_view1_20",
      "https://images.unsplash.com/photo-1580910051074-3eb694886505?auto=format&fit=crop&w=800&q=80&sig=gallery_view2_20",
      "https://images.unsplash.com/photo-1546054454-aa26e2b734c7?auto=format&fit=crop&w=800&q=80&sig=gallery_view3_20"
    ],
    "countInStock": 30,
    "rating": 4,
    "numReviews": 90,
    "isFeatured": true,
    "description": "Brand: Vivo | Model: Z10 | RAM: 8GB | Storage: 128GB | Processor: MediaTek Dimensity 7200 | Display: 6.7-inch AMOLED 120Hz | Battery: 5000mAh."
  },
  {
    "name": "Oppo Smartphone Z11 (12GB RAM, 256GB)",
    "price": 39500,
    "originalPrice": 47400,
    "category": "Mobiles",
    "image": "https://images.unsplash.com/photo-1610945265064-0e34e5519bbf?auto=format&fit=crop&w=800&q=80&sig=prod_unique_21_mobiles",
    "images": [
      "https://images.unsplash.com/photo-1610945265064-0e34e5519bbf?auto=format&fit=crop&w=800&q=80&sig=prod_unique_21_mobiles",
      "https://images.unsplash.com/photo-1580910051074-3eb694886505?auto=format&fit=crop&w=800&q=80&sig=gallery_view1_21",
      "https://images.unsplash.com/photo-1546054454-aa26e2b734c7?auto=format&fit=crop&w=800&q=80&sig=gallery_view2_21",
      "https://images.unsplash.com/photo-1574944985070-8f3ebc6b79d2?auto=format&fit=crop&w=800&q=80&sig=gallery_view3_21"
    ],
    "countInStock": 32,
    "rating": 4.1,
    "numReviews": 95,
    "isFeatured": false,
    "description": "Brand: Oppo | Model: Z11 | RAM: 12GB | Storage: 256GB | Processor: MediaTek Dimensity 8200 | Display: 6.7-inch AMOLED 120Hz | Battery: 5000mAh."
  },
  {
    "name": "iQOO Smartphone Z12 (8GB RAM, 128GB)",
    "price": 42000,
    "originalPrice": 50400,
    "category": "Mobiles",
    "image": "https://images.unsplash.com/photo-1580910051074-3eb694886505?auto=format&fit=crop&w=800&q=80&sig=prod_unique_22_mobiles",
    "images": [
      "https://images.unsplash.com/photo-1580910051074-3eb694886505?auto=format&fit=crop&w=800&q=80&sig=prod_unique_22_mobiles",
      "https://images.unsplash.com/photo-1546054454-aa26e2b734c7?auto=format&fit=crop&w=800&q=80&sig=gallery_view1_22",
      "https://images.unsplash.com/photo-1574944985070-8f3ebc6b79d2?auto=format&fit=crop&w=800&q=80&sig=gallery_view2_22",
      "https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?auto=format&fit=crop&w=800&q=80&sig=gallery_view3_22"
    ],
    "countInStock": 34,
    "rating": 4.2,
    "numReviews": 100,
    "isFeatured": false,
    "description": "Brand: iQOO | Model: Z12 | RAM: 8GB | Storage: 128GB | Processor: MediaTek Dimensity 9300 | Display: 6.7-inch AMOLED 120Hz | Battery: 5000mAh."
  },
  {
    "name": "Honor Smartphone Z13 (12GB RAM, 256GB)",
    "price": 44500,
    "originalPrice": 53400,
    "category": "Mobiles",
    "image": "https://images.unsplash.com/photo-1546054454-aa26e2b734c7?auto=format&fit=crop&w=800&q=80&sig=prod_unique_23_mobiles",
    "images": [
      "https://images.unsplash.com/photo-1546054454-aa26e2b734c7?auto=format&fit=crop&w=800&q=80&sig=prod_unique_23_mobiles",
      "https://images.unsplash.com/photo-1574944985070-8f3ebc6b79d2?auto=format&fit=crop&w=800&q=80&sig=gallery_view1_23",
      "https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?auto=format&fit=crop&w=800&q=80&sig=gallery_view2_23",
      "https://images.unsplash.com/photo-1598327105666-5b89351aff97?auto=format&fit=crop&w=800&q=80&sig=gallery_view3_23"
    ],
    "countInStock": 36,
    "rating": 4.3,
    "numReviews": 105,
    "isFeatured": false,
    "description": "Brand: Honor | Model: Z13 | RAM: 12GB | Storage: 256GB | Processor: Snapdragon 8 Gen 3 | Display: 6.7-inch AMOLED 120Hz | Battery: 5000mAh."
  },
  {
    "name": "Nokia Smartphone Z14 (8GB RAM, 128GB)",
    "price": 47000,
    "originalPrice": 56400,
    "category": "Mobiles",
    "image": "https://images.unsplash.com/photo-1574944985070-8f3ebc6b79d2?auto=format&fit=crop&w=800&q=80&sig=prod_unique_24_mobiles",
    "images": [
      "https://images.unsplash.com/photo-1574944985070-8f3ebc6b79d2?auto=format&fit=crop&w=800&q=80&sig=prod_unique_24_mobiles",
      "https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?auto=format&fit=crop&w=800&q=80&sig=gallery_view1_24",
      "https://images.unsplash.com/photo-1598327105666-5b89351aff97?auto=format&fit=crop&w=800&q=80&sig=gallery_view2_24",
      "https://images.unsplash.com/photo-1592899677977-9c10ca588bbd?auto=format&fit=crop&w=800&q=80&sig=gallery_view3_24"
    ],
    "countInStock": 38,
    "rating": 4.4,
    "numReviews": 110,
    "isFeatured": false,
    "description": "Brand: Nokia | Model: Z14 | RAM: 8GB | Storage: 128GB | Processor: Snapdragon 7 Gen 3 | Display: 6.7-inch AMOLED 120Hz | Battery: 5000mAh."
  },
  {
    "name": "Apple Smartphone Z15 (12GB RAM, 256GB)",
    "price": 49500,
    "originalPrice": 59400,
    "category": "Mobiles",
    "image": "https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?auto=format&fit=crop&w=800&q=80&sig=prod_unique_25_mobiles",
    "images": [
      "https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?auto=format&fit=crop&w=800&q=80&sig=prod_unique_25_mobiles",
      "https://images.unsplash.com/photo-1598327105666-5b89351aff97?auto=format&fit=crop&w=800&q=80&sig=gallery_view1_25",
      "https://images.unsplash.com/photo-1592899677977-9c10ca588bbd?auto=format&fit=crop&w=800&q=80&sig=gallery_view2_25",
      "https://images.unsplash.com/photo-1565849904461-04a58ad377e0?auto=format&fit=crop&w=800&q=80&sig=gallery_view3_25"
    ],
    "countInStock": 40,
    "rating": 4.5,
    "numReviews": 115,
    "isFeatured": true,
    "description": "Brand: Apple | Model: Z15 | RAM: 12GB | Storage: 256GB | Processor: Apple A17 Pro | Display: 6.7-inch AMOLED 120Hz | Battery: 5000mAh."
  },
  {
    "name": "Samsung Smartphone Z16 (8GB RAM, 128GB)",
    "price": 52000,
    "originalPrice": 62400,
    "category": "Mobiles",
    "image": "https://images.unsplash.com/photo-1598327105666-5b89351aff97?auto=format&fit=crop&w=800&q=80&sig=prod_unique_26_mobiles",
    "images": [
      "https://images.unsplash.com/photo-1598327105666-5b89351aff97?auto=format&fit=crop&w=800&q=80&sig=prod_unique_26_mobiles",
      "https://images.unsplash.com/photo-1592899677977-9c10ca588bbd?auto=format&fit=crop&w=800&q=80&sig=gallery_view1_26",
      "https://images.unsplash.com/photo-1565849904461-04a58ad377e0?auto=format&fit=crop&w=800&q=80&sig=gallery_view2_26",
      "https://images.unsplash.com/photo-1610945265064-0e34e5519bbf?auto=format&fit=crop&w=800&q=80&sig=gallery_view3_26"
    ],
    "countInStock": 42,
    "rating": 4.6,
    "numReviews": 120,
    "isFeatured": false,
    "description": "Brand: Samsung | Model: Z16 | RAM: 8GB | Storage: 128GB | Processor: Google Tensor G3 | Display: 6.7-inch AMOLED 120Hz | Battery: 5000mAh."
  },
  {
    "name": "Google Pixel Smartphone Z17 (12GB RAM, 256GB)",
    "price": 54500,
    "originalPrice": 65400,
    "category": "Mobiles",
    "image": "https://images.unsplash.com/photo-1592899677977-9c10ca588bbd?auto=format&fit=crop&w=800&q=80&sig=prod_unique_27_mobiles",
    "images": [
      "https://images.unsplash.com/photo-1592899677977-9c10ca588bbd?auto=format&fit=crop&w=800&q=80&sig=prod_unique_27_mobiles",
      "https://images.unsplash.com/photo-1565849904461-04a58ad377e0?auto=format&fit=crop&w=800&q=80&sig=gallery_view1_27",
      "https://images.unsplash.com/photo-1610945265064-0e34e5519bbf?auto=format&fit=crop&w=800&q=80&sig=gallery_view2_27",
      "https://images.unsplash.com/photo-1580910051074-3eb694886505?auto=format&fit=crop&w=800&q=80&sig=gallery_view3_27"
    ],
    "countInStock": 44,
    "rating": 4.7,
    "numReviews": 125,
    "isFeatured": false,
    "description": "Brand: Google Pixel | Model: Z17 | RAM: 12GB | Storage: 256GB | Processor: Exynos 2400 | Display: 6.7-inch AMOLED 120Hz | Battery: 5000mAh."
  },
  {
    "name": "OnePlus Smartphone Z18 (8GB RAM, 128GB)",
    "price": 57000,
    "originalPrice": 68400,
    "category": "Mobiles",
    "image": "https://images.unsplash.com/photo-1565849904461-04a58ad377e0?auto=format&fit=crop&w=800&q=80&sig=prod_unique_28_mobiles",
    "images": [
      "https://images.unsplash.com/photo-1565849904461-04a58ad377e0?auto=format&fit=crop&w=800&q=80&sig=prod_unique_28_mobiles",
      "https://images.unsplash.com/photo-1610945265064-0e34e5519bbf?auto=format&fit=crop&w=800&q=80&sig=gallery_view1_28",
      "https://images.unsplash.com/photo-1580910051074-3eb694886505?auto=format&fit=crop&w=800&q=80&sig=gallery_view2_28",
      "https://images.unsplash.com/photo-1546054454-aa26e2b734c7?auto=format&fit=crop&w=800&q=80&sig=gallery_view3_28"
    ],
    "countInStock": 46,
    "rating": 4.8,
    "numReviews": 130,
    "isFeatured": false,
    "description": "Brand: OnePlus | Model: Z18 | RAM: 8GB | Storage: 128GB | Processor: MediaTek Dimensity 7050 | Display: 6.7-inch AMOLED 120Hz | Battery: 5000mAh."
  },
  {
    "name": "Nothing Smartphone Z19 (12GB RAM, 256GB)",
    "price": 59500,
    "originalPrice": 71400,
    "category": "Mobiles",
    "image": "https://images.unsplash.com/photo-1610945265064-0e34e5519bbf?auto=format&fit=crop&w=800&q=80&sig=prod_unique_29_mobiles",
    "images": [
      "https://images.unsplash.com/photo-1610945265064-0e34e5519bbf?auto=format&fit=crop&w=800&q=80&sig=prod_unique_29_mobiles",
      "https://images.unsplash.com/photo-1580910051074-3eb694886505?auto=format&fit=crop&w=800&q=80&sig=gallery_view1_29",
      "https://images.unsplash.com/photo-1546054454-aa26e2b734c7?auto=format&fit=crop&w=800&q=80&sig=gallery_view2_29",
      "https://images.unsplash.com/photo-1574944985070-8f3ebc6b79d2?auto=format&fit=crop&w=800&q=80&sig=gallery_view3_29"
    ],
    "countInStock": 48,
    "rating": 4.9,
    "numReviews": 135,
    "isFeatured": false,
    "description": "Brand: Nothing | Model: Z19 | RAM: 12GB | Storage: 256GB | Processor: MediaTek Dimensity 7200 | Display: 6.7-inch AMOLED 120Hz | Battery: 5000mAh."
  },
  {
    "name": "Motorola Smartphone Z20 (8GB RAM, 128GB)",
    "price": 62000,
    "originalPrice": 74400,
    "category": "Mobiles",
    "image": "https://images.unsplash.com/photo-1580910051074-3eb694886505?auto=format&fit=crop&w=800&q=80&sig=prod_unique_30_mobiles",
    "images": [
      "https://images.unsplash.com/photo-1580910051074-3eb694886505?auto=format&fit=crop&w=800&q=80&sig=prod_unique_30_mobiles",
      "https://images.unsplash.com/photo-1546054454-aa26e2b734c7?auto=format&fit=crop&w=800&q=80&sig=gallery_view1_30",
      "https://images.unsplash.com/photo-1574944985070-8f3ebc6b79d2?auto=format&fit=crop&w=800&q=80&sig=gallery_view2_30",
      "https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?auto=format&fit=crop&w=800&q=80&sig=gallery_view3_30"
    ],
    "countInStock": 50,
    "rating": 4,
    "numReviews": 140,
    "isFeatured": true,
    "description": "Brand: Motorola | Model: Z20 | RAM: 8GB | Storage: 128GB | Processor: MediaTek Dimensity 8200 | Display: 6.7-inch AMOLED 120Hz | Battery: 5000mAh."
  },
  {
    "name": "Realme Smartphone Z21 (12GB RAM, 256GB)",
    "price": 64500,
    "originalPrice": 77400,
    "category": "Mobiles",
    "image": "https://images.unsplash.com/photo-1546054454-aa26e2b734c7?auto=format&fit=crop&w=800&q=80&sig=prod_unique_31_mobiles",
    "images": [
      "https://images.unsplash.com/photo-1546054454-aa26e2b734c7?auto=format&fit=crop&w=800&q=80&sig=prod_unique_31_mobiles",
      "https://images.unsplash.com/photo-1574944985070-8f3ebc6b79d2?auto=format&fit=crop&w=800&q=80&sig=gallery_view1_31",
      "https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?auto=format&fit=crop&w=800&q=80&sig=gallery_view2_31",
      "https://images.unsplash.com/photo-1598327105666-5b89351aff97?auto=format&fit=crop&w=800&q=80&sig=gallery_view3_31"
    ],
    "countInStock": 52,
    "rating": 4.1,
    "numReviews": 145,
    "isFeatured": false,
    "description": "Brand: Realme | Model: Z21 | RAM: 12GB | Storage: 256GB | Processor: MediaTek Dimensity 9300 | Display: 6.7-inch AMOLED 120Hz | Battery: 5000mAh."
  },
  {
    "name": "Xiaomi Smartphone Z22 (8GB RAM, 128GB)",
    "price": 67000,
    "originalPrice": 80400,
    "category": "Mobiles",
    "image": "https://images.unsplash.com/photo-1574944985070-8f3ebc6b79d2?auto=format&fit=crop&w=800&q=80&sig=prod_unique_32_mobiles",
    "images": [
      "https://images.unsplash.com/photo-1574944985070-8f3ebc6b79d2?auto=format&fit=crop&w=800&q=80&sig=prod_unique_32_mobiles",
      "https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?auto=format&fit=crop&w=800&q=80&sig=gallery_view1_32",
      "https://images.unsplash.com/photo-1598327105666-5b89351aff97?auto=format&fit=crop&w=800&q=80&sig=gallery_view2_32",
      "https://images.unsplash.com/photo-1592899677977-9c10ca588bbd?auto=format&fit=crop&w=800&q=80&sig=gallery_view3_32"
    ],
    "countInStock": 54,
    "rating": 4.2,
    "numReviews": 150,
    "isFeatured": false,
    "description": "Brand: Xiaomi | Model: Z22 | RAM: 8GB | Storage: 128GB | Processor: Snapdragon 8 Gen 3 | Display: 6.7-inch AMOLED 120Hz | Battery: 5000mAh."
  },
  {
    "name": "Redmi Smartphone Z23 (12GB RAM, 256GB)",
    "price": 69500,
    "originalPrice": 83400,
    "category": "Mobiles",
    "image": "https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?auto=format&fit=crop&w=800&q=80&sig=prod_unique_33_mobiles",
    "images": [
      "https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?auto=format&fit=crop&w=800&q=80&sig=prod_unique_33_mobiles",
      "https://images.unsplash.com/photo-1598327105666-5b89351aff97?auto=format&fit=crop&w=800&q=80&sig=gallery_view1_33",
      "https://images.unsplash.com/photo-1592899677977-9c10ca588bbd?auto=format&fit=crop&w=800&q=80&sig=gallery_view2_33",
      "https://images.unsplash.com/photo-1565849904461-04a58ad377e0?auto=format&fit=crop&w=800&q=80&sig=gallery_view3_33"
    ],
    "countInStock": 56,
    "rating": 4.3,
    "numReviews": 155,
    "isFeatured": false,
    "description": "Brand: Redmi | Model: Z23 | RAM: 12GB | Storage: 256GB | Processor: Snapdragon 7 Gen 3 | Display: 6.7-inch AMOLED 120Hz | Battery: 5000mAh."
  },
  {
    "name": "POCO Smartphone Z24 (8GB RAM, 128GB)",
    "price": 72000,
    "originalPrice": 86400,
    "category": "Mobiles",
    "image": "https://images.unsplash.com/photo-1598327105666-5b89351aff97?auto=format&fit=crop&w=800&q=80&sig=prod_unique_34_mobiles",
    "images": [
      "https://images.unsplash.com/photo-1598327105666-5b89351aff97?auto=format&fit=crop&w=800&q=80&sig=prod_unique_34_mobiles",
      "https://images.unsplash.com/photo-1592899677977-9c10ca588bbd?auto=format&fit=crop&w=800&q=80&sig=gallery_view1_34",
      "https://images.unsplash.com/photo-1565849904461-04a58ad377e0?auto=format&fit=crop&w=800&q=80&sig=gallery_view2_34",
      "https://images.unsplash.com/photo-1610945265064-0e34e5519bbf?auto=format&fit=crop&w=800&q=80&sig=gallery_view3_34"
    ],
    "countInStock": 58,
    "rating": 4.4,
    "numReviews": 160,
    "isFeatured": false,
    "description": "Brand: POCO | Model: Z24 | RAM: 8GB | Storage: 128GB | Processor: Apple A17 Pro | Display: 6.7-inch AMOLED 120Hz | Battery: 5000mAh."
  },
  {
    "name": "Vivo Smartphone Z25 (12GB RAM, 256GB)",
    "price": 74500,
    "originalPrice": 89400,
    "category": "Mobiles",
    "image": "https://images.unsplash.com/photo-1592899677977-9c10ca588bbd?auto=format&fit=crop&w=800&q=80&sig=prod_unique_35_mobiles",
    "images": [
      "https://images.unsplash.com/photo-1592899677977-9c10ca588bbd?auto=format&fit=crop&w=800&q=80&sig=prod_unique_35_mobiles",
      "https://images.unsplash.com/photo-1565849904461-04a58ad377e0?auto=format&fit=crop&w=800&q=80&sig=gallery_view1_35",
      "https://images.unsplash.com/photo-1610945265064-0e34e5519bbf?auto=format&fit=crop&w=800&q=80&sig=gallery_view2_35",
      "https://images.unsplash.com/photo-1580910051074-3eb694886505?auto=format&fit=crop&w=800&q=80&sig=gallery_view3_35"
    ],
    "countInStock": 60,
    "rating": 4.5,
    "numReviews": 165,
    "isFeatured": true,
    "description": "Brand: Vivo | Model: Z25 | RAM: 12GB | Storage: 256GB | Processor: Google Tensor G3 | Display: 6.7-inch AMOLED 120Hz | Battery: 5000mAh."
  },
  {
    "name": "Oppo Smartphone Z26 (8GB RAM, 128GB)",
    "price": 77000,
    "originalPrice": 92400,
    "category": "Mobiles",
    "image": "https://images.unsplash.com/photo-1565849904461-04a58ad377e0?auto=format&fit=crop&w=800&q=80&sig=prod_unique_36_mobiles",
    "images": [
      "https://images.unsplash.com/photo-1565849904461-04a58ad377e0?auto=format&fit=crop&w=800&q=80&sig=prod_unique_36_mobiles",
      "https://images.unsplash.com/photo-1610945265064-0e34e5519bbf?auto=format&fit=crop&w=800&q=80&sig=gallery_view1_36",
      "https://images.unsplash.com/photo-1580910051074-3eb694886505?auto=format&fit=crop&w=800&q=80&sig=gallery_view2_36",
      "https://images.unsplash.com/photo-1546054454-aa26e2b734c7?auto=format&fit=crop&w=800&q=80&sig=gallery_view3_36"
    ],
    "countInStock": 62,
    "rating": 4.6,
    "numReviews": 170,
    "isFeatured": false,
    "description": "Brand: Oppo | Model: Z26 | RAM: 8GB | Storage: 128GB | Processor: Exynos 2400 | Display: 6.7-inch AMOLED 120Hz | Battery: 5000mAh."
  },
  {
    "name": "iQOO Smartphone Z27 (12GB RAM, 256GB)",
    "price": 79500,
    "originalPrice": 95400,
    "category": "Mobiles",
    "image": "https://images.unsplash.com/photo-1610945265064-0e34e5519bbf?auto=format&fit=crop&w=800&q=80&sig=prod_unique_37_mobiles",
    "images": [
      "https://images.unsplash.com/photo-1610945265064-0e34e5519bbf?auto=format&fit=crop&w=800&q=80&sig=prod_unique_37_mobiles",
      "https://images.unsplash.com/photo-1580910051074-3eb694886505?auto=format&fit=crop&w=800&q=80&sig=gallery_view1_37",
      "https://images.unsplash.com/photo-1546054454-aa26e2b734c7?auto=format&fit=crop&w=800&q=80&sig=gallery_view2_37",
      "https://images.unsplash.com/photo-1574944985070-8f3ebc6b79d2?auto=format&fit=crop&w=800&q=80&sig=gallery_view3_37"
    ],
    "countInStock": 64,
    "rating": 4.7,
    "numReviews": 175,
    "isFeatured": false,
    "description": "Brand: iQOO | Model: Z27 | RAM: 12GB | Storage: 256GB | Processor: MediaTek Dimensity 7050 | Display: 6.7-inch AMOLED 120Hz | Battery: 5000mAh."
  },
  {
    "name": "Honor Smartphone Z28 (8GB RAM, 128GB)",
    "price": 82000,
    "originalPrice": 98400,
    "category": "Mobiles",
    "image": "https://images.unsplash.com/photo-1580910051074-3eb694886505?auto=format&fit=crop&w=800&q=80&sig=prod_unique_38_mobiles",
    "images": [
      "https://images.unsplash.com/photo-1580910051074-3eb694886505?auto=format&fit=crop&w=800&q=80&sig=prod_unique_38_mobiles",
      "https://images.unsplash.com/photo-1546054454-aa26e2b734c7?auto=format&fit=crop&w=800&q=80&sig=gallery_view1_38",
      "https://images.unsplash.com/photo-1574944985070-8f3ebc6b79d2?auto=format&fit=crop&w=800&q=80&sig=gallery_view2_38",
      "https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?auto=format&fit=crop&w=800&q=80&sig=gallery_view3_38"
    ],
    "countInStock": 66,
    "rating": 4.8,
    "numReviews": 180,
    "isFeatured": false,
    "description": "Brand: Honor | Model: Z28 | RAM: 8GB | Storage: 128GB | Processor: MediaTek Dimensity 7200 | Display: 6.7-inch AMOLED 120Hz | Battery: 5000mAh."
  },
  {
    "name": "Nokia Smartphone Z29 (12GB RAM, 256GB)",
    "price": 84500,
    "originalPrice": 101400,
    "category": "Mobiles",
    "image": "https://images.unsplash.com/photo-1546054454-aa26e2b734c7?auto=format&fit=crop&w=800&q=80&sig=prod_unique_39_mobiles",
    "images": [
      "https://images.unsplash.com/photo-1546054454-aa26e2b734c7?auto=format&fit=crop&w=800&q=80&sig=prod_unique_39_mobiles",
      "https://images.unsplash.com/photo-1574944985070-8f3ebc6b79d2?auto=format&fit=crop&w=800&q=80&sig=gallery_view1_39",
      "https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?auto=format&fit=crop&w=800&q=80&sig=gallery_view2_39",
      "https://images.unsplash.com/photo-1598327105666-5b89351aff97?auto=format&fit=crop&w=800&q=80&sig=gallery_view3_39"
    ],
    "countInStock": 68,
    "rating": 4.9,
    "numReviews": 185,
    "isFeatured": false,
    "description": "Brand: Nokia | Model: Z29 | RAM: 12GB | Storage: 256GB | Processor: MediaTek Dimensity 8200 | Display: 6.7-inch AMOLED 120Hz | Battery: 5000mAh."
  },
  {
    "name": "Apple Smartphone Z30 (8GB RAM, 128GB)",
    "price": 87000,
    "originalPrice": 104400,
    "category": "Mobiles",
    "image": "https://images.unsplash.com/photo-1574944985070-8f3ebc6b79d2?auto=format&fit=crop&w=800&q=80&sig=prod_unique_40_mobiles",
    "images": [
      "https://images.unsplash.com/photo-1574944985070-8f3ebc6b79d2?auto=format&fit=crop&w=800&q=80&sig=prod_unique_40_mobiles",
      "https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?auto=format&fit=crop&w=800&q=80&sig=gallery_view1_40",
      "https://images.unsplash.com/photo-1598327105666-5b89351aff97?auto=format&fit=crop&w=800&q=80&sig=gallery_view2_40",
      "https://images.unsplash.com/photo-1592899677977-9c10ca588bbd?auto=format&fit=crop&w=800&q=80&sig=gallery_view3_40"
    ],
    "countInStock": 70,
    "rating": 4,
    "numReviews": 190,
    "isFeatured": true,
    "description": "Brand: Apple | Model: Z30 | RAM: 8GB | Storage: 128GB | Processor: MediaTek Dimensity 9300 | Display: 6.7-inch AMOLED 120Hz | Battery: 5000mAh."
  },
  {
    "name": "Samsung Smartphone Z31 (12GB RAM, 256GB)",
    "price": 89500,
    "originalPrice": 107400,
    "category": "Mobiles",
    "image": "https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?auto=format&fit=crop&w=800&q=80&sig=prod_unique_41_mobiles",
    "images": [
      "https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?auto=format&fit=crop&w=800&q=80&sig=prod_unique_41_mobiles",
      "https://images.unsplash.com/photo-1598327105666-5b89351aff97?auto=format&fit=crop&w=800&q=80&sig=gallery_view1_41",
      "https://images.unsplash.com/photo-1592899677977-9c10ca588bbd?auto=format&fit=crop&w=800&q=80&sig=gallery_view2_41",
      "https://images.unsplash.com/photo-1565849904461-04a58ad377e0?auto=format&fit=crop&w=800&q=80&sig=gallery_view3_41"
    ],
    "countInStock": 72,
    "rating": 4.1,
    "numReviews": 195,
    "isFeatured": false,
    "description": "Brand: Samsung | Model: Z31 | RAM: 12GB | Storage: 256GB | Processor: Snapdragon 8 Gen 3 | Display: 6.7-inch AMOLED 120Hz | Battery: 5000mAh."
  },
  {
    "name": "Google Pixel Smartphone Z32 (8GB RAM, 128GB)",
    "price": 92000,
    "originalPrice": 110400,
    "category": "Mobiles",
    "image": "https://images.unsplash.com/photo-1598327105666-5b89351aff97?auto=format&fit=crop&w=800&q=80&sig=prod_unique_42_mobiles",
    "images": [
      "https://images.unsplash.com/photo-1598327105666-5b89351aff97?auto=format&fit=crop&w=800&q=80&sig=prod_unique_42_mobiles",
      "https://images.unsplash.com/photo-1592899677977-9c10ca588bbd?auto=format&fit=crop&w=800&q=80&sig=gallery_view1_42",
      "https://images.unsplash.com/photo-1565849904461-04a58ad377e0?auto=format&fit=crop&w=800&q=80&sig=gallery_view2_42",
      "https://images.unsplash.com/photo-1610945265064-0e34e5519bbf?auto=format&fit=crop&w=800&q=80&sig=gallery_view3_42"
    ],
    "countInStock": 74,
    "rating": 4.2,
    "numReviews": 200,
    "isFeatured": false,
    "description": "Brand: Google Pixel | Model: Z32 | RAM: 8GB | Storage: 128GB | Processor: Snapdragon 7 Gen 3 | Display: 6.7-inch AMOLED 120Hz | Battery: 5000mAh."
  },
  {
    "name": "OnePlus Smartphone Z33 (12GB RAM, 256GB)",
    "price": 94500,
    "originalPrice": 113400,
    "category": "Mobiles",
    "image": "https://images.unsplash.com/photo-1592899677977-9c10ca588bbd?auto=format&fit=crop&w=800&q=80&sig=prod_unique_43_mobiles",
    "images": [
      "https://images.unsplash.com/photo-1592899677977-9c10ca588bbd?auto=format&fit=crop&w=800&q=80&sig=prod_unique_43_mobiles",
      "https://images.unsplash.com/photo-1565849904461-04a58ad377e0?auto=format&fit=crop&w=800&q=80&sig=gallery_view1_43",
      "https://images.unsplash.com/photo-1610945265064-0e34e5519bbf?auto=format&fit=crop&w=800&q=80&sig=gallery_view2_43",
      "https://images.unsplash.com/photo-1580910051074-3eb694886505?auto=format&fit=crop&w=800&q=80&sig=gallery_view3_43"
    ],
    "countInStock": 76,
    "rating": 4.3,
    "numReviews": 205,
    "isFeatured": false,
    "description": "Brand: OnePlus | Model: Z33 | RAM: 12GB | Storage: 256GB | Processor: Apple A17 Pro | Display: 6.7-inch AMOLED 120Hz | Battery: 5000mAh."
  },
  {
    "name": "Nothing Smartphone Z34 (8GB RAM, 128GB)",
    "price": 97000,
    "originalPrice": 116400,
    "category": "Mobiles",
    "image": "https://images.unsplash.com/photo-1565849904461-04a58ad377e0?auto=format&fit=crop&w=800&q=80&sig=prod_unique_44_mobiles",
    "images": [
      "https://images.unsplash.com/photo-1565849904461-04a58ad377e0?auto=format&fit=crop&w=800&q=80&sig=prod_unique_44_mobiles",
      "https://images.unsplash.com/photo-1610945265064-0e34e5519bbf?auto=format&fit=crop&w=800&q=80&sig=gallery_view1_44",
      "https://images.unsplash.com/photo-1580910051074-3eb694886505?auto=format&fit=crop&w=800&q=80&sig=gallery_view2_44",
      "https://images.unsplash.com/photo-1546054454-aa26e2b734c7?auto=format&fit=crop&w=800&q=80&sig=gallery_view3_44"
    ],
    "countInStock": 78,
    "rating": 4.4,
    "numReviews": 210,
    "isFeatured": false,
    "description": "Brand: Nothing | Model: Z34 | RAM: 8GB | Storage: 128GB | Processor: Google Tensor G3 | Display: 6.7-inch AMOLED 120Hz | Battery: 5000mAh."
  },
  {
    "name": "Motorola Smartphone Z35 (12GB RAM, 256GB)",
    "price": 99500,
    "originalPrice": 119400,
    "category": "Mobiles",
    "image": "https://images.unsplash.com/photo-1610945265064-0e34e5519bbf?auto=format&fit=crop&w=800&q=80&sig=prod_unique_45_mobiles",
    "images": [
      "https://images.unsplash.com/photo-1610945265064-0e34e5519bbf?auto=format&fit=crop&w=800&q=80&sig=prod_unique_45_mobiles",
      "https://images.unsplash.com/photo-1580910051074-3eb694886505?auto=format&fit=crop&w=800&q=80&sig=gallery_view1_45",
      "https://images.unsplash.com/photo-1546054454-aa26e2b734c7?auto=format&fit=crop&w=800&q=80&sig=gallery_view2_45",
      "https://images.unsplash.com/photo-1574944985070-8f3ebc6b79d2?auto=format&fit=crop&w=800&q=80&sig=gallery_view3_45"
    ],
    "countInStock": 80,
    "rating": 4.5,
    "numReviews": 215,
    "isFeatured": true,
    "description": "Brand: Motorola | Model: Z35 | RAM: 12GB | Storage: 256GB | Processor: Exynos 2400 | Display: 6.7-inch AMOLED 120Hz | Battery: 5000mAh."
  },
  {
    "name": "Realme Smartphone Z36 (8GB RAM, 128GB)",
    "price": 102000,
    "originalPrice": 122400,
    "category": "Mobiles",
    "image": "https://images.unsplash.com/photo-1580910051074-3eb694886505?auto=format&fit=crop&w=800&q=80&sig=prod_unique_46_mobiles",
    "images": [
      "https://images.unsplash.com/photo-1580910051074-3eb694886505?auto=format&fit=crop&w=800&q=80&sig=prod_unique_46_mobiles",
      "https://images.unsplash.com/photo-1546054454-aa26e2b734c7?auto=format&fit=crop&w=800&q=80&sig=gallery_view1_46",
      "https://images.unsplash.com/photo-1574944985070-8f3ebc6b79d2?auto=format&fit=crop&w=800&q=80&sig=gallery_view2_46",
      "https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?auto=format&fit=crop&w=800&q=80&sig=gallery_view3_46"
    ],
    "countInStock": 82,
    "rating": 4.6,
    "numReviews": 220,
    "isFeatured": false,
    "description": "Brand: Realme | Model: Z36 | RAM: 8GB | Storage: 128GB | Processor: MediaTek Dimensity 7050 | Display: 6.7-inch AMOLED 120Hz | Battery: 5000mAh."
  },
  {
    "name": "Xiaomi Smartphone Z37 (12GB RAM, 256GB)",
    "price": 104500,
    "originalPrice": 125400,
    "category": "Mobiles",
    "image": "https://images.unsplash.com/photo-1546054454-aa26e2b734c7?auto=format&fit=crop&w=800&q=80&sig=prod_unique_47_mobiles",
    "images": [
      "https://images.unsplash.com/photo-1546054454-aa26e2b734c7?auto=format&fit=crop&w=800&q=80&sig=prod_unique_47_mobiles",
      "https://images.unsplash.com/photo-1574944985070-8f3ebc6b79d2?auto=format&fit=crop&w=800&q=80&sig=gallery_view1_47",
      "https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?auto=format&fit=crop&w=800&q=80&sig=gallery_view2_47",
      "https://images.unsplash.com/photo-1598327105666-5b89351aff97?auto=format&fit=crop&w=800&q=80&sig=gallery_view3_47"
    ],
    "countInStock": 84,
    "rating": 4.7,
    "numReviews": 225,
    "isFeatured": false,
    "description": "Brand: Xiaomi | Model: Z37 | RAM: 12GB | Storage: 256GB | Processor: MediaTek Dimensity 7200 | Display: 6.7-inch AMOLED 120Hz | Battery: 5000mAh."
  },
  {
    "name": "Redmi Smartphone Z38 (8GB RAM, 128GB)",
    "price": 107000,
    "originalPrice": 128400,
    "category": "Mobiles",
    "image": "https://images.unsplash.com/photo-1574944985070-8f3ebc6b79d2?auto=format&fit=crop&w=800&q=80&sig=prod_unique_48_mobiles",
    "images": [
      "https://images.unsplash.com/photo-1574944985070-8f3ebc6b79d2?auto=format&fit=crop&w=800&q=80&sig=prod_unique_48_mobiles",
      "https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?auto=format&fit=crop&w=800&q=80&sig=gallery_view1_48",
      "https://images.unsplash.com/photo-1598327105666-5b89351aff97?auto=format&fit=crop&w=800&q=80&sig=gallery_view2_48",
      "https://images.unsplash.com/photo-1592899677977-9c10ca588bbd?auto=format&fit=crop&w=800&q=80&sig=gallery_view3_48"
    ],
    "countInStock": 86,
    "rating": 4.8,
    "numReviews": 230,
    "isFeatured": false,
    "description": "Brand: Redmi | Model: Z38 | RAM: 8GB | Storage: 128GB | Processor: MediaTek Dimensity 8200 | Display: 6.7-inch AMOLED 120Hz | Battery: 5000mAh."
  },
  {
    "name": "POCO Smartphone Z39 (12GB RAM, 256GB)",
    "price": 109500,
    "originalPrice": 131400,
    "category": "Mobiles",
    "image": "https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?auto=format&fit=crop&w=800&q=80&sig=prod_unique_49_mobiles",
    "images": [
      "https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?auto=format&fit=crop&w=800&q=80&sig=prod_unique_49_mobiles",
      "https://images.unsplash.com/photo-1598327105666-5b89351aff97?auto=format&fit=crop&w=800&q=80&sig=gallery_view1_49",
      "https://images.unsplash.com/photo-1592899677977-9c10ca588bbd?auto=format&fit=crop&w=800&q=80&sig=gallery_view2_49",
      "https://images.unsplash.com/photo-1565849904461-04a58ad377e0?auto=format&fit=crop&w=800&q=80&sig=gallery_view3_49"
    ],
    "countInStock": 88,
    "rating": 4.9,
    "numReviews": 235,
    "isFeatured": false,
    "description": "Brand: POCO | Model: Z39 | RAM: 12GB | Storage: 256GB | Processor: MediaTek Dimensity 9300 | Display: 6.7-inch AMOLED 120Hz | Battery: 5000mAh."
  },
  {
    "name": "Vivo Smartphone Z40 (8GB RAM, 128GB)",
    "price": 112000,
    "originalPrice": 134400,
    "category": "Mobiles",
    "image": "https://images.unsplash.com/photo-1598327105666-5b89351aff97?auto=format&fit=crop&w=800&q=80&sig=prod_unique_50_mobiles",
    "images": [
      "https://images.unsplash.com/photo-1598327105666-5b89351aff97?auto=format&fit=crop&w=800&q=80&sig=prod_unique_50_mobiles",
      "https://images.unsplash.com/photo-1592899677977-9c10ca588bbd?auto=format&fit=crop&w=800&q=80&sig=gallery_view1_50",
      "https://images.unsplash.com/photo-1565849904461-04a58ad377e0?auto=format&fit=crop&w=800&q=80&sig=gallery_view2_50",
      "https://images.unsplash.com/photo-1610945265064-0e34e5519bbf?auto=format&fit=crop&w=800&q=80&sig=gallery_view3_50"
    ],
    "countInStock": 90,
    "rating": 4,
    "numReviews": 240,
    "isFeatured": true,
    "description": "Brand: Vivo | Model: Z40 | RAM: 8GB | Storage: 128GB | Processor: Snapdragon 8 Gen 3 | Display: 6.7-inch AMOLED 120Hz | Battery: 5000mAh."
  },
  {
    "name": "Oppo Smartphone Z41 (12GB RAM, 256GB)",
    "price": 114500,
    "originalPrice": 137400,
    "category": "Mobiles",
    "image": "https://images.unsplash.com/photo-1592899677977-9c10ca588bbd?auto=format&fit=crop&w=800&q=80&sig=prod_unique_51_mobiles",
    "images": [
      "https://images.unsplash.com/photo-1592899677977-9c10ca588bbd?auto=format&fit=crop&w=800&q=80&sig=prod_unique_51_mobiles",
      "https://images.unsplash.com/photo-1565849904461-04a58ad377e0?auto=format&fit=crop&w=800&q=80&sig=gallery_view1_51",
      "https://images.unsplash.com/photo-1610945265064-0e34e5519bbf?auto=format&fit=crop&w=800&q=80&sig=gallery_view2_51",
      "https://images.unsplash.com/photo-1580910051074-3eb694886505?auto=format&fit=crop&w=800&q=80&sig=gallery_view3_51"
    ],
    "countInStock": 92,
    "rating": 4.1,
    "numReviews": 245,
    "isFeatured": false,
    "description": "Brand: Oppo | Model: Z41 | RAM: 12GB | Storage: 256GB | Processor: Snapdragon 7 Gen 3 | Display: 6.7-inch AMOLED 120Hz | Battery: 5000mAh."
  },
  {
    "name": "iQOO Smartphone Z42 (8GB RAM, 128GB)",
    "price": 117000,
    "originalPrice": 140400,
    "category": "Mobiles",
    "image": "https://images.unsplash.com/photo-1565849904461-04a58ad377e0?auto=format&fit=crop&w=800&q=80&sig=prod_unique_52_mobiles",
    "images": [
      "https://images.unsplash.com/photo-1565849904461-04a58ad377e0?auto=format&fit=crop&w=800&q=80&sig=prod_unique_52_mobiles",
      "https://images.unsplash.com/photo-1610945265064-0e34e5519bbf?auto=format&fit=crop&w=800&q=80&sig=gallery_view1_52",
      "https://images.unsplash.com/photo-1580910051074-3eb694886505?auto=format&fit=crop&w=800&q=80&sig=gallery_view2_52",
      "https://images.unsplash.com/photo-1546054454-aa26e2b734c7?auto=format&fit=crop&w=800&q=80&sig=gallery_view3_52"
    ],
    "countInStock": 94,
    "rating": 4.2,
    "numReviews": 250,
    "isFeatured": false,
    "description": "Brand: iQOO | Model: Z42 | RAM: 8GB | Storage: 128GB | Processor: Apple A17 Pro | Display: 6.7-inch AMOLED 120Hz | Battery: 5000mAh."
  },
  {
    "name": "Honor Smartphone Z43 (12GB RAM, 256GB)",
    "price": 119500,
    "originalPrice": 143400,
    "category": "Mobiles",
    "image": "https://images.unsplash.com/photo-1610945265064-0e34e5519bbf?auto=format&fit=crop&w=800&q=80&sig=prod_unique_53_mobiles",
    "images": [
      "https://images.unsplash.com/photo-1610945265064-0e34e5519bbf?auto=format&fit=crop&w=800&q=80&sig=prod_unique_53_mobiles",
      "https://images.unsplash.com/photo-1580910051074-3eb694886505?auto=format&fit=crop&w=800&q=80&sig=gallery_view1_53",
      "https://images.unsplash.com/photo-1546054454-aa26e2b734c7?auto=format&fit=crop&w=800&q=80&sig=gallery_view2_53",
      "https://images.unsplash.com/photo-1574944985070-8f3ebc6b79d2?auto=format&fit=crop&w=800&q=80&sig=gallery_view3_53"
    ],
    "countInStock": 96,
    "rating": 4.3,
    "numReviews": 255,
    "isFeatured": false,
    "description": "Brand: Honor | Model: Z43 | RAM: 12GB | Storage: 256GB | Processor: Google Tensor G3 | Display: 6.7-inch AMOLED 120Hz | Battery: 5000mAh."
  },
  {
    "name": "Nokia Smartphone Z44 (8GB RAM, 128GB)",
    "price": 122000,
    "originalPrice": 146400,
    "category": "Mobiles",
    "image": "https://images.unsplash.com/photo-1580910051074-3eb694886505?auto=format&fit=crop&w=800&q=80&sig=prod_unique_54_mobiles",
    "images": [
      "https://images.unsplash.com/photo-1580910051074-3eb694886505?auto=format&fit=crop&w=800&q=80&sig=prod_unique_54_mobiles",
      "https://images.unsplash.com/photo-1546054454-aa26e2b734c7?auto=format&fit=crop&w=800&q=80&sig=gallery_view1_54",
      "https://images.unsplash.com/photo-1574944985070-8f3ebc6b79d2?auto=format&fit=crop&w=800&q=80&sig=gallery_view2_54",
      "https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?auto=format&fit=crop&w=800&q=80&sig=gallery_view3_54"
    ],
    "countInStock": 98,
    "rating": 4.4,
    "numReviews": 260,
    "isFeatured": false,
    "description": "Brand: Nokia | Model: Z44 | RAM: 8GB | Storage: 128GB | Processor: Exynos 2400 | Display: 6.7-inch AMOLED 120Hz | Battery: 5000mAh."
  },
  {
    "name": "Apple Smartphone Z45 (12GB RAM, 256GB)",
    "price": 124500,
    "originalPrice": 149400,
    "category": "Mobiles",
    "image": "https://images.unsplash.com/photo-1546054454-aa26e2b734c7?auto=format&fit=crop&w=800&q=80&sig=prod_unique_55_mobiles",
    "images": [
      "https://images.unsplash.com/photo-1546054454-aa26e2b734c7?auto=format&fit=crop&w=800&q=80&sig=prod_unique_55_mobiles",
      "https://images.unsplash.com/photo-1574944985070-8f3ebc6b79d2?auto=format&fit=crop&w=800&q=80&sig=gallery_view1_55",
      "https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?auto=format&fit=crop&w=800&q=80&sig=gallery_view2_55",
      "https://images.unsplash.com/photo-1598327105666-5b89351aff97?auto=format&fit=crop&w=800&q=80&sig=gallery_view3_55"
    ],
    "countInStock": 100,
    "rating": 4.5,
    "numReviews": 265,
    "isFeatured": true,
    "description": "Brand: Apple | Model: Z45 | RAM: 12GB | Storage: 256GB | Processor: MediaTek Dimensity 7050 | Display: 6.7-inch AMOLED 120Hz | Battery: 5000mAh."
  },
  {
    "name": "Dell Ultrabook 101 (32GB RAM, 1TB SSD)",
    "price": 39500,
    "originalPrice": 47400,
    "category": "Laptops",
    "image": "https://images.unsplash.com/photo-1517336714731-489689fd1ca8?auto=format&fit=crop&w=800&q=80&sig=prod_unique_56_laptops",
    "images": [
      "https://images.unsplash.com/photo-1517336714731-489689fd1ca8?auto=format&fit=crop&w=800&q=80&sig=prod_unique_56_laptops",
      "https://images.unsplash.com/photo-1603302576837-37561b2e2302?auto=format&fit=crop&w=800&q=80&sig=gallery_view1_56",
      "https://images.unsplash.com/photo-1593642632823-8f785ba67e45?auto=format&fit=crop&w=800&q=80&sig=gallery_view2_56",
      "https://images.unsplash.com/photo-1544731612-de7f96afe55f?auto=format&fit=crop&w=800&q=80&sig=gallery_view3_56"
    ],
    "countInStock": 12,
    "rating": 4.1,
    "numReviews": 45,
    "isFeatured": false,
    "description": "Brand: Dell | Model: Ultrabook 101 | CPU: Intel Core i7 13th Gen | GPU: NVIDIA RTX 4060 | RAM: 32GB | SSD: 1TB | Display: 15.6-inch FHD."
  },
  {
    "name": "HP Ultrabook 102 (16GB RAM, 512GB SSD)",
    "price": 44000,
    "originalPrice": 52800,
    "category": "Laptops",
    "image": "https://images.unsplash.com/photo-1603302576837-37561b2e2302?auto=format&fit=crop&w=800&q=80&sig=prod_unique_57_laptops",
    "images": [
      "https://images.unsplash.com/photo-1603302576837-37561b2e2302?auto=format&fit=crop&w=800&q=80&sig=prod_unique_57_laptops",
      "https://images.unsplash.com/photo-1593642632823-8f785ba67e45?auto=format&fit=crop&w=800&q=80&sig=gallery_view1_57",
      "https://images.unsplash.com/photo-1544731612-de7f96afe55f?auto=format&fit=crop&w=800&q=80&sig=gallery_view2_57",
      "https://images.unsplash.com/photo-1588872657578-7efd1f1555ed?auto=format&fit=crop&w=800&q=80&sig=gallery_view3_57"
    ],
    "countInStock": 14,
    "rating": 4.2,
    "numReviews": 50,
    "isFeatured": false,
    "description": "Brand: HP | Model: Ultrabook 102 | CPU: Intel Core i7 13th Gen | GPU: NVIDIA RTX 4060 | RAM: 16GB | SSD: 512GB | Display: 15.6-inch FHD."
  },
  {
    "name": "Lenovo Ultrabook 103 (32GB RAM, 1TB SSD)",
    "price": 48500,
    "originalPrice": 58200,
    "category": "Laptops",
    "image": "https://images.unsplash.com/photo-1593642632823-8f785ba67e45?auto=format&fit=crop&w=800&q=80&sig=prod_unique_58_laptops",
    "images": [
      "https://images.unsplash.com/photo-1593642632823-8f785ba67e45?auto=format&fit=crop&w=800&q=80&sig=prod_unique_58_laptops",
      "https://images.unsplash.com/photo-1544731612-de7f96afe55f?auto=format&fit=crop&w=800&q=80&sig=gallery_view1_58",
      "https://images.unsplash.com/photo-1588872657578-7efd1f1555ed?auto=format&fit=crop&w=800&q=80&sig=gallery_view2_58",
      "https://images.unsplash.com/photo-1496181130204-755241544e3f?auto=format&fit=crop&w=800&q=80&sig=gallery_view3_58"
    ],
    "countInStock": 16,
    "rating": 4.3,
    "numReviews": 55,
    "isFeatured": false,
    "description": "Brand: Lenovo | Model: Ultrabook 103 | CPU: Intel Core i7 13th Gen | GPU: NVIDIA RTX 4060 | RAM: 32GB | SSD: 1TB | Display: 15.6-inch FHD."
  },
  {
    "name": "ASUS Ultrabook 104 (16GB RAM, 512GB SSD)",
    "price": 53000,
    "originalPrice": 63600,
    "category": "Laptops",
    "image": "https://images.unsplash.com/photo-1544731612-de7f96afe55f?auto=format&fit=crop&w=800&q=80&sig=prod_unique_59_laptops",
    "images": [
      "https://images.unsplash.com/photo-1544731612-de7f96afe55f?auto=format&fit=crop&w=800&q=80&sig=prod_unique_59_laptops",
      "https://images.unsplash.com/photo-1588872657578-7efd1f1555ed?auto=format&fit=crop&w=800&q=80&sig=gallery_view1_59",
      "https://images.unsplash.com/photo-1496181130204-755241544e3f?auto=format&fit=crop&w=800&q=80&sig=gallery_view2_59",
      "https://images.unsplash.com/photo-1517336714731-489689fd1ca8?auto=format&fit=crop&w=800&q=80&sig=gallery_view3_59"
    ],
    "countInStock": 18,
    "rating": 4.4,
    "numReviews": 60,
    "isFeatured": false,
    "description": "Brand: ASUS | Model: Ultrabook 104 | CPU: Intel Core i7 13th Gen | GPU: NVIDIA RTX 4060 | RAM: 16GB | SSD: 512GB | Display: 15.6-inch FHD."
  },
  {
    "name": "Acer Ultrabook 105 (32GB RAM, 1TB SSD)",
    "price": 57500,
    "originalPrice": 69000,
    "category": "Laptops",
    "image": "https://images.unsplash.com/photo-1588872657578-7efd1f1555ed?auto=format&fit=crop&w=800&q=80&sig=prod_unique_60_laptops",
    "images": [
      "https://images.unsplash.com/photo-1588872657578-7efd1f1555ed?auto=format&fit=crop&w=800&q=80&sig=prod_unique_60_laptops",
      "https://images.unsplash.com/photo-1496181130204-755241544e3f?auto=format&fit=crop&w=800&q=80&sig=gallery_view1_60",
      "https://images.unsplash.com/photo-1517336714731-489689fd1ca8?auto=format&fit=crop&w=800&q=80&sig=gallery_view2_60",
      "https://images.unsplash.com/photo-1603302576837-37561b2e2302?auto=format&fit=crop&w=800&q=80&sig=gallery_view3_60"
    ],
    "countInStock": 20,
    "rating": 4.5,
    "numReviews": 65,
    "isFeatured": true,
    "description": "Brand: Acer | Model: Ultrabook 105 | CPU: Intel Core i7 13th Gen | GPU: NVIDIA RTX 4060 | RAM: 32GB | SSD: 1TB | Display: 15.6-inch FHD."
  },
  {
    "name": "MSI Ultrabook 106 (16GB RAM, 512GB SSD)",
    "price": 62000,
    "originalPrice": 74400,
    "category": "Laptops",
    "image": "https://images.unsplash.com/photo-1496181130204-755241544e3f?auto=format&fit=crop&w=800&q=80&sig=prod_unique_61_laptops",
    "images": [
      "https://images.unsplash.com/photo-1496181130204-755241544e3f?auto=format&fit=crop&w=800&q=80&sig=prod_unique_61_laptops",
      "https://images.unsplash.com/photo-1517336714731-489689fd1ca8?auto=format&fit=crop&w=800&q=80&sig=gallery_view1_61",
      "https://images.unsplash.com/photo-1603302576837-37561b2e2302?auto=format&fit=crop&w=800&q=80&sig=gallery_view2_61",
      "https://images.unsplash.com/photo-1593642632823-8f785ba67e45?auto=format&fit=crop&w=800&q=80&sig=gallery_view3_61"
    ],
    "countInStock": 22,
    "rating": 4.6,
    "numReviews": 70,
    "isFeatured": false,
    "description": "Brand: MSI | Model: Ultrabook 106 | CPU: Intel Core i7 13th Gen | GPU: NVIDIA RTX 4060 | RAM: 16GB | SSD: 512GB | Display: 15.6-inch FHD."
  },
  {
    "name": "Samsung Galaxy Book Ultrabook 107 (32GB RAM, 1TB SSD)",
    "price": 66500,
    "originalPrice": 79800,
    "category": "Laptops",
    "image": "https://images.unsplash.com/photo-1517336714731-489689fd1ca8?auto=format&fit=crop&w=800&q=80&sig=prod_unique_62_laptops",
    "images": [
      "https://images.unsplash.com/photo-1517336714731-489689fd1ca8?auto=format&fit=crop&w=800&q=80&sig=prod_unique_62_laptops",
      "https://images.unsplash.com/photo-1603302576837-37561b2e2302?auto=format&fit=crop&w=800&q=80&sig=gallery_view1_62",
      "https://images.unsplash.com/photo-1593642632823-8f785ba67e45?auto=format&fit=crop&w=800&q=80&sig=gallery_view2_62",
      "https://images.unsplash.com/photo-1544731612-de7f96afe55f?auto=format&fit=crop&w=800&q=80&sig=gallery_view3_62"
    ],
    "countInStock": 24,
    "rating": 4.7,
    "numReviews": 75,
    "isFeatured": false,
    "description": "Brand: Samsung Galaxy Book | Model: Ultrabook 107 | CPU: Intel Core i7 13th Gen | GPU: NVIDIA RTX 4060 | RAM: 32GB | SSD: 1TB | Display: 15.6-inch FHD."
  },
  {
    "name": "LG Gram Ultrabook 108 (16GB RAM, 512GB SSD)",
    "price": 71000,
    "originalPrice": 85200,
    "category": "Laptops",
    "image": "https://images.unsplash.com/photo-1603302576837-37561b2e2302?auto=format&fit=crop&w=800&q=80&sig=prod_unique_63_laptops",
    "images": [
      "https://images.unsplash.com/photo-1603302576837-37561b2e2302?auto=format&fit=crop&w=800&q=80&sig=prod_unique_63_laptops",
      "https://images.unsplash.com/photo-1593642632823-8f785ba67e45?auto=format&fit=crop&w=800&q=80&sig=gallery_view1_63",
      "https://images.unsplash.com/photo-1544731612-de7f96afe55f?auto=format&fit=crop&w=800&q=80&sig=gallery_view2_63",
      "https://images.unsplash.com/photo-1588872657578-7efd1f1555ed?auto=format&fit=crop&w=800&q=80&sig=gallery_view3_63"
    ],
    "countInStock": 26,
    "rating": 4.8,
    "numReviews": 80,
    "isFeatured": false,
    "description": "Brand: LG Gram | Model: Ultrabook 108 | CPU: Intel Core i7 13th Gen | GPU: NVIDIA RTX 4060 | RAM: 16GB | SSD: 512GB | Display: 15.6-inch FHD."
  },
  {
    "name": "Framework Ultrabook 109 (32GB RAM, 1TB SSD)",
    "price": 75500,
    "originalPrice": 90600,
    "category": "Laptops",
    "image": "https://images.unsplash.com/photo-1593642632823-8f785ba67e45?auto=format&fit=crop&w=800&q=80&sig=prod_unique_64_laptops",
    "images": [
      "https://images.unsplash.com/photo-1593642632823-8f785ba67e45?auto=format&fit=crop&w=800&q=80&sig=prod_unique_64_laptops",
      "https://images.unsplash.com/photo-1544731612-de7f96afe55f?auto=format&fit=crop&w=800&q=80&sig=gallery_view1_64",
      "https://images.unsplash.com/photo-1588872657578-7efd1f1555ed?auto=format&fit=crop&w=800&q=80&sig=gallery_view2_64",
      "https://images.unsplash.com/photo-1496181130204-755241544e3f?auto=format&fit=crop&w=800&q=80&sig=gallery_view3_64"
    ],
    "countInStock": 28,
    "rating": 4.9,
    "numReviews": 85,
    "isFeatured": false,
    "description": "Brand: Framework | Model: Ultrabook 109 | CPU: Intel Core i7 13th Gen | GPU: NVIDIA RTX 4060 | RAM: 32GB | SSD: 1TB | Display: 15.6-inch FHD."
  },
  {
    "name": "Apple MacBook Ultrabook 110 (16GB RAM, 512GB SSD)",
    "price": 80000,
    "originalPrice": 96000,
    "category": "Laptops",
    "image": "https://images.unsplash.com/photo-1544731612-de7f96afe55f?auto=format&fit=crop&w=800&q=80&sig=prod_unique_65_laptops",
    "images": [
      "https://images.unsplash.com/photo-1544731612-de7f96afe55f?auto=format&fit=crop&w=800&q=80&sig=prod_unique_65_laptops",
      "https://images.unsplash.com/photo-1588872657578-7efd1f1555ed?auto=format&fit=crop&w=800&q=80&sig=gallery_view1_65",
      "https://images.unsplash.com/photo-1496181130204-755241544e3f?auto=format&fit=crop&w=800&q=80&sig=gallery_view2_65",
      "https://images.unsplash.com/photo-1517336714731-489689fd1ca8?auto=format&fit=crop&w=800&q=80&sig=gallery_view3_65"
    ],
    "countInStock": 30,
    "rating": 4,
    "numReviews": 90,
    "isFeatured": true,
    "description": "Brand: Apple MacBook | Model: Ultrabook 110 | CPU: Intel Core i7 13th Gen | GPU: NVIDIA RTX 4060 | RAM: 16GB | SSD: 512GB | Display: 15.6-inch FHD."
  },
  {
    "name": "Dell Ultrabook 111 (32GB RAM, 1TB SSD)",
    "price": 84500,
    "originalPrice": 101400,
    "category": "Laptops",
    "image": "https://images.unsplash.com/photo-1588872657578-7efd1f1555ed?auto=format&fit=crop&w=800&q=80&sig=prod_unique_66_laptops",
    "images": [
      "https://images.unsplash.com/photo-1588872657578-7efd1f1555ed?auto=format&fit=crop&w=800&q=80&sig=prod_unique_66_laptops",
      "https://images.unsplash.com/photo-1496181130204-755241544e3f?auto=format&fit=crop&w=800&q=80&sig=gallery_view1_66",
      "https://images.unsplash.com/photo-1517336714731-489689fd1ca8?auto=format&fit=crop&w=800&q=80&sig=gallery_view2_66",
      "https://images.unsplash.com/photo-1603302576837-37561b2e2302?auto=format&fit=crop&w=800&q=80&sig=gallery_view3_66"
    ],
    "countInStock": 32,
    "rating": 4.1,
    "numReviews": 95,
    "isFeatured": false,
    "description": "Brand: Dell | Model: Ultrabook 111 | CPU: Intel Core i7 13th Gen | GPU: NVIDIA RTX 4060 | RAM: 32GB | SSD: 1TB | Display: 15.6-inch FHD."
  },
  {
    "name": "HP Ultrabook 112 (16GB RAM, 512GB SSD)",
    "price": 89000,
    "originalPrice": 106800,
    "category": "Laptops",
    "image": "https://images.unsplash.com/photo-1496181130204-755241544e3f?auto=format&fit=crop&w=800&q=80&sig=prod_unique_67_laptops",
    "images": [
      "https://images.unsplash.com/photo-1496181130204-755241544e3f?auto=format&fit=crop&w=800&q=80&sig=prod_unique_67_laptops",
      "https://images.unsplash.com/photo-1517336714731-489689fd1ca8?auto=format&fit=crop&w=800&q=80&sig=gallery_view1_67",
      "https://images.unsplash.com/photo-1603302576837-37561b2e2302?auto=format&fit=crop&w=800&q=80&sig=gallery_view2_67",
      "https://images.unsplash.com/photo-1593642632823-8f785ba67e45?auto=format&fit=crop&w=800&q=80&sig=gallery_view3_67"
    ],
    "countInStock": 34,
    "rating": 4.2,
    "numReviews": 100,
    "isFeatured": false,
    "description": "Brand: HP | Model: Ultrabook 112 | CPU: Intel Core i7 13th Gen | GPU: NVIDIA RTX 4060 | RAM: 16GB | SSD: 512GB | Display: 15.6-inch FHD."
  },
  {
    "name": "Lenovo Ultrabook 113 (32GB RAM, 1TB SSD)",
    "price": 93500,
    "originalPrice": 112200,
    "category": "Laptops",
    "image": "https://images.unsplash.com/photo-1517336714731-489689fd1ca8?auto=format&fit=crop&w=800&q=80&sig=prod_unique_68_laptops",
    "images": [
      "https://images.unsplash.com/photo-1517336714731-489689fd1ca8?auto=format&fit=crop&w=800&q=80&sig=prod_unique_68_laptops",
      "https://images.unsplash.com/photo-1603302576837-37561b2e2302?auto=format&fit=crop&w=800&q=80&sig=gallery_view1_68",
      "https://images.unsplash.com/photo-1593642632823-8f785ba67e45?auto=format&fit=crop&w=800&q=80&sig=gallery_view2_68",
      "https://images.unsplash.com/photo-1544731612-de7f96afe55f?auto=format&fit=crop&w=800&q=80&sig=gallery_view3_68"
    ],
    "countInStock": 36,
    "rating": 4.3,
    "numReviews": 105,
    "isFeatured": false,
    "description": "Brand: Lenovo | Model: Ultrabook 113 | CPU: Intel Core i7 13th Gen | GPU: NVIDIA RTX 4060 | RAM: 32GB | SSD: 1TB | Display: 15.6-inch FHD."
  },
  {
    "name": "ASUS Ultrabook 114 (16GB RAM, 512GB SSD)",
    "price": 98000,
    "originalPrice": 117600,
    "category": "Laptops",
    "image": "https://images.unsplash.com/photo-1603302576837-37561b2e2302?auto=format&fit=crop&w=800&q=80&sig=prod_unique_69_laptops",
    "images": [
      "https://images.unsplash.com/photo-1603302576837-37561b2e2302?auto=format&fit=crop&w=800&q=80&sig=prod_unique_69_laptops",
      "https://images.unsplash.com/photo-1593642632823-8f785ba67e45?auto=format&fit=crop&w=800&q=80&sig=gallery_view1_69",
      "https://images.unsplash.com/photo-1544731612-de7f96afe55f?auto=format&fit=crop&w=800&q=80&sig=gallery_view2_69",
      "https://images.unsplash.com/photo-1588872657578-7efd1f1555ed?auto=format&fit=crop&w=800&q=80&sig=gallery_view3_69"
    ],
    "countInStock": 38,
    "rating": 4.4,
    "numReviews": 110,
    "isFeatured": false,
    "description": "Brand: ASUS | Model: Ultrabook 114 | CPU: Intel Core i7 13th Gen | GPU: NVIDIA RTX 4060 | RAM: 16GB | SSD: 512GB | Display: 15.6-inch FHD."
  },
  {
    "name": "Acer Ultrabook 115 (32GB RAM, 1TB SSD)",
    "price": 102500,
    "originalPrice": 123000,
    "category": "Laptops",
    "image": "https://images.unsplash.com/photo-1593642632823-8f785ba67e45?auto=format&fit=crop&w=800&q=80&sig=prod_unique_70_laptops",
    "images": [
      "https://images.unsplash.com/photo-1593642632823-8f785ba67e45?auto=format&fit=crop&w=800&q=80&sig=prod_unique_70_laptops",
      "https://images.unsplash.com/photo-1544731612-de7f96afe55f?auto=format&fit=crop&w=800&q=80&sig=gallery_view1_70",
      "https://images.unsplash.com/photo-1588872657578-7efd1f1555ed?auto=format&fit=crop&w=800&q=80&sig=gallery_view2_70",
      "https://images.unsplash.com/photo-1496181130204-755241544e3f?auto=format&fit=crop&w=800&q=80&sig=gallery_view3_70"
    ],
    "countInStock": 40,
    "rating": 4.5,
    "numReviews": 115,
    "isFeatured": true,
    "description": "Brand: Acer | Model: Ultrabook 115 | CPU: Intel Core i7 13th Gen | GPU: NVIDIA RTX 4060 | RAM: 32GB | SSD: 1TB | Display: 15.6-inch FHD."
  },
  {
    "name": "MSI Ultrabook 116 (16GB RAM, 512GB SSD)",
    "price": 107000,
    "originalPrice": 128400,
    "category": "Laptops",
    "image": "https://images.unsplash.com/photo-1544731612-de7f96afe55f?auto=format&fit=crop&w=800&q=80&sig=prod_unique_71_laptops",
    "images": [
      "https://images.unsplash.com/photo-1544731612-de7f96afe55f?auto=format&fit=crop&w=800&q=80&sig=prod_unique_71_laptops",
      "https://images.unsplash.com/photo-1588872657578-7efd1f1555ed?auto=format&fit=crop&w=800&q=80&sig=gallery_view1_71",
      "https://images.unsplash.com/photo-1496181130204-755241544e3f?auto=format&fit=crop&w=800&q=80&sig=gallery_view2_71",
      "https://images.unsplash.com/photo-1517336714731-489689fd1ca8?auto=format&fit=crop&w=800&q=80&sig=gallery_view3_71"
    ],
    "countInStock": 42,
    "rating": 4.6,
    "numReviews": 120,
    "isFeatured": false,
    "description": "Brand: MSI | Model: Ultrabook 116 | CPU: Intel Core i7 13th Gen | GPU: NVIDIA RTX 4060 | RAM: 16GB | SSD: 512GB | Display: 15.6-inch FHD."
  },
  {
    "name": "Samsung Galaxy Book Ultrabook 117 (32GB RAM, 1TB SSD)",
    "price": 111500,
    "originalPrice": 133800,
    "category": "Laptops",
    "image": "https://images.unsplash.com/photo-1588872657578-7efd1f1555ed?auto=format&fit=crop&w=800&q=80&sig=prod_unique_72_laptops",
    "images": [
      "https://images.unsplash.com/photo-1588872657578-7efd1f1555ed?auto=format&fit=crop&w=800&q=80&sig=prod_unique_72_laptops",
      "https://images.unsplash.com/photo-1496181130204-755241544e3f?auto=format&fit=crop&w=800&q=80&sig=gallery_view1_72",
      "https://images.unsplash.com/photo-1517336714731-489689fd1ca8?auto=format&fit=crop&w=800&q=80&sig=gallery_view2_72",
      "https://images.unsplash.com/photo-1603302576837-37561b2e2302?auto=format&fit=crop&w=800&q=80&sig=gallery_view3_72"
    ],
    "countInStock": 44,
    "rating": 4.7,
    "numReviews": 125,
    "isFeatured": false,
    "description": "Brand: Samsung Galaxy Book | Model: Ultrabook 117 | CPU: Intel Core i7 13th Gen | GPU: NVIDIA RTX 4060 | RAM: 32GB | SSD: 1TB | Display: 15.6-inch FHD."
  },
  {
    "name": "LG Gram Ultrabook 118 (16GB RAM, 512GB SSD)",
    "price": 116000,
    "originalPrice": 139200,
    "category": "Laptops",
    "image": "https://images.unsplash.com/photo-1496181130204-755241544e3f?auto=format&fit=crop&w=800&q=80&sig=prod_unique_73_laptops",
    "images": [
      "https://images.unsplash.com/photo-1496181130204-755241544e3f?auto=format&fit=crop&w=800&q=80&sig=prod_unique_73_laptops",
      "https://images.unsplash.com/photo-1517336714731-489689fd1ca8?auto=format&fit=crop&w=800&q=80&sig=gallery_view1_73",
      "https://images.unsplash.com/photo-1603302576837-37561b2e2302?auto=format&fit=crop&w=800&q=80&sig=gallery_view2_73",
      "https://images.unsplash.com/photo-1593642632823-8f785ba67e45?auto=format&fit=crop&w=800&q=80&sig=gallery_view3_73"
    ],
    "countInStock": 46,
    "rating": 4.8,
    "numReviews": 130,
    "isFeatured": false,
    "description": "Brand: LG Gram | Model: Ultrabook 118 | CPU: Intel Core i7 13th Gen | GPU: NVIDIA RTX 4060 | RAM: 16GB | SSD: 512GB | Display: 15.6-inch FHD."
  },
  {
    "name": "Framework Ultrabook 119 (32GB RAM, 1TB SSD)",
    "price": 120500,
    "originalPrice": 144600,
    "category": "Laptops",
    "image": "https://images.unsplash.com/photo-1517336714731-489689fd1ca8?auto=format&fit=crop&w=800&q=80&sig=prod_unique_74_laptops",
    "images": [
      "https://images.unsplash.com/photo-1517336714731-489689fd1ca8?auto=format&fit=crop&w=800&q=80&sig=prod_unique_74_laptops",
      "https://images.unsplash.com/photo-1603302576837-37561b2e2302?auto=format&fit=crop&w=800&q=80&sig=gallery_view1_74",
      "https://images.unsplash.com/photo-1593642632823-8f785ba67e45?auto=format&fit=crop&w=800&q=80&sig=gallery_view2_74",
      "https://images.unsplash.com/photo-1544731612-de7f96afe55f?auto=format&fit=crop&w=800&q=80&sig=gallery_view3_74"
    ],
    "countInStock": 48,
    "rating": 4.9,
    "numReviews": 135,
    "isFeatured": false,
    "description": "Brand: Framework | Model: Ultrabook 119 | CPU: Intel Core i7 13th Gen | GPU: NVIDIA RTX 4060 | RAM: 32GB | SSD: 1TB | Display: 15.6-inch FHD."
  },
  {
    "name": "Apple MacBook Ultrabook 120 (16GB RAM, 512GB SSD)",
    "price": 125000,
    "originalPrice": 150000,
    "category": "Laptops",
    "image": "https://images.unsplash.com/photo-1603302576837-37561b2e2302?auto=format&fit=crop&w=800&q=80&sig=prod_unique_75_laptops",
    "images": [
      "https://images.unsplash.com/photo-1603302576837-37561b2e2302?auto=format&fit=crop&w=800&q=80&sig=prod_unique_75_laptops",
      "https://images.unsplash.com/photo-1593642632823-8f785ba67e45?auto=format&fit=crop&w=800&q=80&sig=gallery_view1_75",
      "https://images.unsplash.com/photo-1544731612-de7f96afe55f?auto=format&fit=crop&w=800&q=80&sig=gallery_view2_75",
      "https://images.unsplash.com/photo-1588872657578-7efd1f1555ed?auto=format&fit=crop&w=800&q=80&sig=gallery_view3_75"
    ],
    "countInStock": 50,
    "rating": 4,
    "numReviews": 140,
    "isFeatured": true,
    "description": "Brand: Apple MacBook | Model: Ultrabook 120 | CPU: Intel Core i7 13th Gen | GPU: NVIDIA RTX 4060 | RAM: 16GB | SSD: 512GB | Display: 15.6-inch FHD."
  },
  {
    "name": "Dell Ultrabook 121 (32GB RAM, 1TB SSD)",
    "price": 129500,
    "originalPrice": 155400,
    "category": "Laptops",
    "image": "https://images.unsplash.com/photo-1593642632823-8f785ba67e45?auto=format&fit=crop&w=800&q=80&sig=prod_unique_76_laptops",
    "images": [
      "https://images.unsplash.com/photo-1593642632823-8f785ba67e45?auto=format&fit=crop&w=800&q=80&sig=prod_unique_76_laptops",
      "https://images.unsplash.com/photo-1544731612-de7f96afe55f?auto=format&fit=crop&w=800&q=80&sig=gallery_view1_76",
      "https://images.unsplash.com/photo-1588872657578-7efd1f1555ed?auto=format&fit=crop&w=800&q=80&sig=gallery_view2_76",
      "https://images.unsplash.com/photo-1496181130204-755241544e3f?auto=format&fit=crop&w=800&q=80&sig=gallery_view3_76"
    ],
    "countInStock": 52,
    "rating": 4.1,
    "numReviews": 145,
    "isFeatured": false,
    "description": "Brand: Dell | Model: Ultrabook 121 | CPU: Intel Core i7 13th Gen | GPU: NVIDIA RTX 4060 | RAM: 32GB | SSD: 1TB | Display: 15.6-inch FHD."
  },
  {
    "name": "HP Ultrabook 122 (16GB RAM, 512GB SSD)",
    "price": 134000,
    "originalPrice": 160800,
    "category": "Laptops",
    "image": "https://images.unsplash.com/photo-1544731612-de7f96afe55f?auto=format&fit=crop&w=800&q=80&sig=prod_unique_77_laptops",
    "images": [
      "https://images.unsplash.com/photo-1544731612-de7f96afe55f?auto=format&fit=crop&w=800&q=80&sig=prod_unique_77_laptops",
      "https://images.unsplash.com/photo-1588872657578-7efd1f1555ed?auto=format&fit=crop&w=800&q=80&sig=gallery_view1_77",
      "https://images.unsplash.com/photo-1496181130204-755241544e3f?auto=format&fit=crop&w=800&q=80&sig=gallery_view2_77",
      "https://images.unsplash.com/photo-1517336714731-489689fd1ca8?auto=format&fit=crop&w=800&q=80&sig=gallery_view3_77"
    ],
    "countInStock": 54,
    "rating": 4.2,
    "numReviews": 150,
    "isFeatured": false,
    "description": "Brand: HP | Model: Ultrabook 122 | CPU: Intel Core i7 13th Gen | GPU: NVIDIA RTX 4060 | RAM: 16GB | SSD: 512GB | Display: 15.6-inch FHD."
  },
  {
    "name": "Lenovo Ultrabook 123 (32GB RAM, 1TB SSD)",
    "price": 138500,
    "originalPrice": 166200,
    "category": "Laptops",
    "image": "https://images.unsplash.com/photo-1588872657578-7efd1f1555ed?auto=format&fit=crop&w=800&q=80&sig=prod_unique_78_laptops",
    "images": [
      "https://images.unsplash.com/photo-1588872657578-7efd1f1555ed?auto=format&fit=crop&w=800&q=80&sig=prod_unique_78_laptops",
      "https://images.unsplash.com/photo-1496181130204-755241544e3f?auto=format&fit=crop&w=800&q=80&sig=gallery_view1_78",
      "https://images.unsplash.com/photo-1517336714731-489689fd1ca8?auto=format&fit=crop&w=800&q=80&sig=gallery_view2_78",
      "https://images.unsplash.com/photo-1603302576837-37561b2e2302?auto=format&fit=crop&w=800&q=80&sig=gallery_view3_78"
    ],
    "countInStock": 56,
    "rating": 4.3,
    "numReviews": 155,
    "isFeatured": false,
    "description": "Brand: Lenovo | Model: Ultrabook 123 | CPU: Intel Core i7 13th Gen | GPU: NVIDIA RTX 4060 | RAM: 32GB | SSD: 1TB | Display: 15.6-inch FHD."
  },
  {
    "name": "ASUS Ultrabook 124 (16GB RAM, 512GB SSD)",
    "price": 143000,
    "originalPrice": 171600,
    "category": "Laptops",
    "image": "https://images.unsplash.com/photo-1496181130204-755241544e3f?auto=format&fit=crop&w=800&q=80&sig=prod_unique_79_laptops",
    "images": [
      "https://images.unsplash.com/photo-1496181130204-755241544e3f?auto=format&fit=crop&w=800&q=80&sig=prod_unique_79_laptops",
      "https://images.unsplash.com/photo-1517336714731-489689fd1ca8?auto=format&fit=crop&w=800&q=80&sig=gallery_view1_79",
      "https://images.unsplash.com/photo-1603302576837-37561b2e2302?auto=format&fit=crop&w=800&q=80&sig=gallery_view2_79",
      "https://images.unsplash.com/photo-1593642632823-8f785ba67e45?auto=format&fit=crop&w=800&q=80&sig=gallery_view3_79"
    ],
    "countInStock": 58,
    "rating": 4.4,
    "numReviews": 160,
    "isFeatured": false,
    "description": "Brand: ASUS | Model: Ultrabook 124 | CPU: Intel Core i7 13th Gen | GPU: NVIDIA RTX 4060 | RAM: 16GB | SSD: 512GB | Display: 15.6-inch FHD."
  },
  {
    "name": "Acer Ultrabook 125 (32GB RAM, 1TB SSD)",
    "price": 147500,
    "originalPrice": 177000,
    "category": "Laptops",
    "image": "https://images.unsplash.com/photo-1517336714731-489689fd1ca8?auto=format&fit=crop&w=800&q=80&sig=prod_unique_80_laptops",
    "images": [
      "https://images.unsplash.com/photo-1517336714731-489689fd1ca8?auto=format&fit=crop&w=800&q=80&sig=prod_unique_80_laptops",
      "https://images.unsplash.com/photo-1603302576837-37561b2e2302?auto=format&fit=crop&w=800&q=80&sig=gallery_view1_80",
      "https://images.unsplash.com/photo-1593642632823-8f785ba67e45?auto=format&fit=crop&w=800&q=80&sig=gallery_view2_80",
      "https://images.unsplash.com/photo-1544731612-de7f96afe55f?auto=format&fit=crop&w=800&q=80&sig=gallery_view3_80"
    ],
    "countInStock": 60,
    "rating": 4.5,
    "numReviews": 165,
    "isFeatured": true,
    "description": "Brand: Acer | Model: Ultrabook 125 | CPU: Intel Core i7 13th Gen | GPU: NVIDIA RTX 4060 | RAM: 32GB | SSD: 1TB | Display: 15.6-inch FHD."
  },
  {
    "name": "MSI Ultrabook 126 (16GB RAM, 512GB SSD)",
    "price": 152000,
    "originalPrice": 182400,
    "category": "Laptops",
    "image": "https://images.unsplash.com/photo-1603302576837-37561b2e2302?auto=format&fit=crop&w=800&q=80&sig=prod_unique_81_laptops",
    "images": [
      "https://images.unsplash.com/photo-1603302576837-37561b2e2302?auto=format&fit=crop&w=800&q=80&sig=prod_unique_81_laptops",
      "https://images.unsplash.com/photo-1593642632823-8f785ba67e45?auto=format&fit=crop&w=800&q=80&sig=gallery_view1_81",
      "https://images.unsplash.com/photo-1544731612-de7f96afe55f?auto=format&fit=crop&w=800&q=80&sig=gallery_view2_81",
      "https://images.unsplash.com/photo-1588872657578-7efd1f1555ed?auto=format&fit=crop&w=800&q=80&sig=gallery_view3_81"
    ],
    "countInStock": 62,
    "rating": 4.6,
    "numReviews": 170,
    "isFeatured": false,
    "description": "Brand: MSI | Model: Ultrabook 126 | CPU: Intel Core i7 13th Gen | GPU: NVIDIA RTX 4060 | RAM: 16GB | SSD: 512GB | Display: 15.6-inch FHD."
  },
  {
    "name": "Samsung Galaxy Book Ultrabook 127 (32GB RAM, 1TB SSD)",
    "price": 156500,
    "originalPrice": 187800,
    "category": "Laptops",
    "image": "https://images.unsplash.com/photo-1593642632823-8f785ba67e45?auto=format&fit=crop&w=800&q=80&sig=prod_unique_82_laptops",
    "images": [
      "https://images.unsplash.com/photo-1593642632823-8f785ba67e45?auto=format&fit=crop&w=800&q=80&sig=prod_unique_82_laptops",
      "https://images.unsplash.com/photo-1544731612-de7f96afe55f?auto=format&fit=crop&w=800&q=80&sig=gallery_view1_82",
      "https://images.unsplash.com/photo-1588872657578-7efd1f1555ed?auto=format&fit=crop&w=800&q=80&sig=gallery_view2_82",
      "https://images.unsplash.com/photo-1496181130204-755241544e3f?auto=format&fit=crop&w=800&q=80&sig=gallery_view3_82"
    ],
    "countInStock": 64,
    "rating": 4.7,
    "numReviews": 175,
    "isFeatured": false,
    "description": "Brand: Samsung Galaxy Book | Model: Ultrabook 127 | CPU: Intel Core i7 13th Gen | GPU: NVIDIA RTX 4060 | RAM: 32GB | SSD: 1TB | Display: 15.6-inch FHD."
  },
  {
    "name": "LG Gram Ultrabook 128 (16GB RAM, 512GB SSD)",
    "price": 161000,
    "originalPrice": 193200,
    "category": "Laptops",
    "image": "https://images.unsplash.com/photo-1544731612-de7f96afe55f?auto=format&fit=crop&w=800&q=80&sig=prod_unique_83_laptops",
    "images": [
      "https://images.unsplash.com/photo-1544731612-de7f96afe55f?auto=format&fit=crop&w=800&q=80&sig=prod_unique_83_laptops",
      "https://images.unsplash.com/photo-1588872657578-7efd1f1555ed?auto=format&fit=crop&w=800&q=80&sig=gallery_view1_83",
      "https://images.unsplash.com/photo-1496181130204-755241544e3f?auto=format&fit=crop&w=800&q=80&sig=gallery_view2_83",
      "https://images.unsplash.com/photo-1517336714731-489689fd1ca8?auto=format&fit=crop&w=800&q=80&sig=gallery_view3_83"
    ],
    "countInStock": 66,
    "rating": 4.8,
    "numReviews": 180,
    "isFeatured": false,
    "description": "Brand: LG Gram | Model: Ultrabook 128 | CPU: Intel Core i7 13th Gen | GPU: NVIDIA RTX 4060 | RAM: 16GB | SSD: 512GB | Display: 15.6-inch FHD."
  },
  {
    "name": "Framework Ultrabook 129 (32GB RAM, 1TB SSD)",
    "price": 165500,
    "originalPrice": 198600,
    "category": "Laptops",
    "image": "https://images.unsplash.com/photo-1588872657578-7efd1f1555ed?auto=format&fit=crop&w=800&q=80&sig=prod_unique_84_laptops",
    "images": [
      "https://images.unsplash.com/photo-1588872657578-7efd1f1555ed?auto=format&fit=crop&w=800&q=80&sig=prod_unique_84_laptops",
      "https://images.unsplash.com/photo-1496181130204-755241544e3f?auto=format&fit=crop&w=800&q=80&sig=gallery_view1_84",
      "https://images.unsplash.com/photo-1517336714731-489689fd1ca8?auto=format&fit=crop&w=800&q=80&sig=gallery_view2_84",
      "https://images.unsplash.com/photo-1603302576837-37561b2e2302?auto=format&fit=crop&w=800&q=80&sig=gallery_view3_84"
    ],
    "countInStock": 68,
    "rating": 4.9,
    "numReviews": 185,
    "isFeatured": false,
    "description": "Brand: Framework | Model: Ultrabook 129 | CPU: Intel Core i7 13th Gen | GPU: NVIDIA RTX 4060 | RAM: 32GB | SSD: 1TB | Display: 15.6-inch FHD."
  },
  {
    "name": "Apple MacBook Ultrabook 130 (16GB RAM, 512GB SSD)",
    "price": 170000,
    "originalPrice": 204000,
    "category": "Laptops",
    "image": "https://images.unsplash.com/photo-1496181130204-755241544e3f?auto=format&fit=crop&w=800&q=80&sig=prod_unique_85_laptops",
    "images": [
      "https://images.unsplash.com/photo-1496181130204-755241544e3f?auto=format&fit=crop&w=800&q=80&sig=prod_unique_85_laptops",
      "https://images.unsplash.com/photo-1517336714731-489689fd1ca8?auto=format&fit=crop&w=800&q=80&sig=gallery_view1_85",
      "https://images.unsplash.com/photo-1603302576837-37561b2e2302?auto=format&fit=crop&w=800&q=80&sig=gallery_view2_85",
      "https://images.unsplash.com/photo-1593642632823-8f785ba67e45?auto=format&fit=crop&w=800&q=80&sig=gallery_view3_85"
    ],
    "countInStock": 70,
    "rating": 4,
    "numReviews": 190,
    "isFeatured": true,
    "description": "Brand: Apple MacBook | Model: Ultrabook 130 | CPU: Intel Core i7 13th Gen | GPU: NVIDIA RTX 4060 | RAM: 16GB | SSD: 512GB | Display: 15.6-inch FHD."
  },
  {
    "name": "Dell Ultrabook 131 (32GB RAM, 1TB SSD)",
    "price": 174500,
    "originalPrice": 209400,
    "category": "Laptops",
    "image": "https://images.unsplash.com/photo-1517336714731-489689fd1ca8?auto=format&fit=crop&w=800&q=80&sig=prod_unique_86_laptops",
    "images": [
      "https://images.unsplash.com/photo-1517336714731-489689fd1ca8?auto=format&fit=crop&w=800&q=80&sig=prod_unique_86_laptops",
      "https://images.unsplash.com/photo-1603302576837-37561b2e2302?auto=format&fit=crop&w=800&q=80&sig=gallery_view1_86",
      "https://images.unsplash.com/photo-1593642632823-8f785ba67e45?auto=format&fit=crop&w=800&q=80&sig=gallery_view2_86",
      "https://images.unsplash.com/photo-1544731612-de7f96afe55f?auto=format&fit=crop&w=800&q=80&sig=gallery_view3_86"
    ],
    "countInStock": 72,
    "rating": 4.1,
    "numReviews": 195,
    "isFeatured": false,
    "description": "Brand: Dell | Model: Ultrabook 131 | CPU: Intel Core i7 13th Gen | GPU: NVIDIA RTX 4060 | RAM: 32GB | SSD: 1TB | Display: 15.6-inch FHD."
  },
  {
    "name": "HP Ultrabook 132 (16GB RAM, 512GB SSD)",
    "price": 179000,
    "originalPrice": 214800,
    "category": "Laptops",
    "image": "https://images.unsplash.com/photo-1603302576837-37561b2e2302?auto=format&fit=crop&w=800&q=80&sig=prod_unique_87_laptops",
    "images": [
      "https://images.unsplash.com/photo-1603302576837-37561b2e2302?auto=format&fit=crop&w=800&q=80&sig=prod_unique_87_laptops",
      "https://images.unsplash.com/photo-1593642632823-8f785ba67e45?auto=format&fit=crop&w=800&q=80&sig=gallery_view1_87",
      "https://images.unsplash.com/photo-1544731612-de7f96afe55f?auto=format&fit=crop&w=800&q=80&sig=gallery_view2_87",
      "https://images.unsplash.com/photo-1588872657578-7efd1f1555ed?auto=format&fit=crop&w=800&q=80&sig=gallery_view3_87"
    ],
    "countInStock": 74,
    "rating": 4.2,
    "numReviews": 200,
    "isFeatured": false,
    "description": "Brand: HP | Model: Ultrabook 132 | CPU: Intel Core i7 13th Gen | GPU: NVIDIA RTX 4060 | RAM: 16GB | SSD: 512GB | Display: 15.6-inch FHD."
  },
  {
    "name": "Lenovo Ultrabook 133 (32GB RAM, 1TB SSD)",
    "price": 183500,
    "originalPrice": 220200,
    "category": "Laptops",
    "image": "https://images.unsplash.com/photo-1593642632823-8f785ba67e45?auto=format&fit=crop&w=800&q=80&sig=prod_unique_88_laptops",
    "images": [
      "https://images.unsplash.com/photo-1593642632823-8f785ba67e45?auto=format&fit=crop&w=800&q=80&sig=prod_unique_88_laptops",
      "https://images.unsplash.com/photo-1544731612-de7f96afe55f?auto=format&fit=crop&w=800&q=80&sig=gallery_view1_88",
      "https://images.unsplash.com/photo-1588872657578-7efd1f1555ed?auto=format&fit=crop&w=800&q=80&sig=gallery_view2_88",
      "https://images.unsplash.com/photo-1496181130204-755241544e3f?auto=format&fit=crop&w=800&q=80&sig=gallery_view3_88"
    ],
    "countInStock": 76,
    "rating": 4.3,
    "numReviews": 205,
    "isFeatured": false,
    "description": "Brand: Lenovo | Model: Ultrabook 133 | CPU: Intel Core i7 13th Gen | GPU: NVIDIA RTX 4060 | RAM: 32GB | SSD: 1TB | Display: 15.6-inch FHD."
  },
  {
    "name": "ASUS Ultrabook 134 (16GB RAM, 512GB SSD)",
    "price": 188000,
    "originalPrice": 225600,
    "category": "Laptops",
    "image": "https://images.unsplash.com/photo-1544731612-de7f96afe55f?auto=format&fit=crop&w=800&q=80&sig=prod_unique_89_laptops",
    "images": [
      "https://images.unsplash.com/photo-1544731612-de7f96afe55f?auto=format&fit=crop&w=800&q=80&sig=prod_unique_89_laptops",
      "https://images.unsplash.com/photo-1588872657578-7efd1f1555ed?auto=format&fit=crop&w=800&q=80&sig=gallery_view1_89",
      "https://images.unsplash.com/photo-1496181130204-755241544e3f?auto=format&fit=crop&w=800&q=80&sig=gallery_view2_89",
      "https://images.unsplash.com/photo-1517336714731-489689fd1ca8?auto=format&fit=crop&w=800&q=80&sig=gallery_view3_89"
    ],
    "countInStock": 78,
    "rating": 4.4,
    "numReviews": 210,
    "isFeatured": false,
    "description": "Brand: ASUS | Model: Ultrabook 134 | CPU: Intel Core i7 13th Gen | GPU: NVIDIA RTX 4060 | RAM: 16GB | SSD: 512GB | Display: 15.6-inch FHD."
  },
  {
    "name": "Acer Ultrabook 135 (32GB RAM, 1TB SSD)",
    "price": 192500,
    "originalPrice": 231000,
    "category": "Laptops",
    "image": "https://images.unsplash.com/photo-1588872657578-7efd1f1555ed?auto=format&fit=crop&w=800&q=80&sig=prod_unique_90_laptops",
    "images": [
      "https://images.unsplash.com/photo-1588872657578-7efd1f1555ed?auto=format&fit=crop&w=800&q=80&sig=prod_unique_90_laptops",
      "https://images.unsplash.com/photo-1496181130204-755241544e3f?auto=format&fit=crop&w=800&q=80&sig=gallery_view1_90",
      "https://images.unsplash.com/photo-1517336714731-489689fd1ca8?auto=format&fit=crop&w=800&q=80&sig=gallery_view2_90",
      "https://images.unsplash.com/photo-1603302576837-37561b2e2302?auto=format&fit=crop&w=800&q=80&sig=gallery_view3_90"
    ],
    "countInStock": 80,
    "rating": 4.5,
    "numReviews": 215,
    "isFeatured": true,
    "description": "Brand: Acer | Model: Ultrabook 135 | CPU: Intel Core i7 13th Gen | GPU: NVIDIA RTX 4060 | RAM: 32GB | SSD: 1TB | Display: 15.6-inch FHD."
  },
  {
    "name": "MSI Ultrabook 136 (16GB RAM, 512GB SSD)",
    "price": 197000,
    "originalPrice": 236400,
    "category": "Laptops",
    "image": "https://images.unsplash.com/photo-1496181130204-755241544e3f?auto=format&fit=crop&w=800&q=80&sig=prod_unique_91_laptops",
    "images": [
      "https://images.unsplash.com/photo-1496181130204-755241544e3f?auto=format&fit=crop&w=800&q=80&sig=prod_unique_91_laptops",
      "https://images.unsplash.com/photo-1517336714731-489689fd1ca8?auto=format&fit=crop&w=800&q=80&sig=gallery_view1_91",
      "https://images.unsplash.com/photo-1603302576837-37561b2e2302?auto=format&fit=crop&w=800&q=80&sig=gallery_view2_91",
      "https://images.unsplash.com/photo-1593642632823-8f785ba67e45?auto=format&fit=crop&w=800&q=80&sig=gallery_view3_91"
    ],
    "countInStock": 82,
    "rating": 4.6,
    "numReviews": 220,
    "isFeatured": false,
    "description": "Brand: MSI | Model: Ultrabook 136 | CPU: Intel Core i7 13th Gen | GPU: NVIDIA RTX 4060 | RAM: 16GB | SSD: 512GB | Display: 15.6-inch FHD."
  },
  {
    "name": "Samsung Galaxy Book Ultrabook 137 (32GB RAM, 1TB SSD)",
    "price": 201500,
    "originalPrice": 241800,
    "category": "Laptops",
    "image": "https://images.unsplash.com/photo-1517336714731-489689fd1ca8?auto=format&fit=crop&w=800&q=80&sig=prod_unique_92_laptops",
    "images": [
      "https://images.unsplash.com/photo-1517336714731-489689fd1ca8?auto=format&fit=crop&w=800&q=80&sig=prod_unique_92_laptops",
      "https://images.unsplash.com/photo-1603302576837-37561b2e2302?auto=format&fit=crop&w=800&q=80&sig=gallery_view1_92",
      "https://images.unsplash.com/photo-1593642632823-8f785ba67e45?auto=format&fit=crop&w=800&q=80&sig=gallery_view2_92",
      "https://images.unsplash.com/photo-1544731612-de7f96afe55f?auto=format&fit=crop&w=800&q=80&sig=gallery_view3_92"
    ],
    "countInStock": 84,
    "rating": 4.7,
    "numReviews": 225,
    "isFeatured": false,
    "description": "Brand: Samsung Galaxy Book | Model: Ultrabook 137 | CPU: Intel Core i7 13th Gen | GPU: NVIDIA RTX 4060 | RAM: 32GB | SSD: 1TB | Display: 15.6-inch FHD."
  },
  {
    "name": "LG Gram Ultrabook 138 (16GB RAM, 512GB SSD)",
    "price": 206000,
    "originalPrice": 247200,
    "category": "Laptops",
    "image": "https://images.unsplash.com/photo-1603302576837-37561b2e2302?auto=format&fit=crop&w=800&q=80&sig=prod_unique_93_laptops",
    "images": [
      "https://images.unsplash.com/photo-1603302576837-37561b2e2302?auto=format&fit=crop&w=800&q=80&sig=prod_unique_93_laptops",
      "https://images.unsplash.com/photo-1593642632823-8f785ba67e45?auto=format&fit=crop&w=800&q=80&sig=gallery_view1_93",
      "https://images.unsplash.com/photo-1544731612-de7f96afe55f?auto=format&fit=crop&w=800&q=80&sig=gallery_view2_93",
      "https://images.unsplash.com/photo-1588872657578-7efd1f1555ed?auto=format&fit=crop&w=800&q=80&sig=gallery_view3_93"
    ],
    "countInStock": 86,
    "rating": 4.8,
    "numReviews": 230,
    "isFeatured": false,
    "description": "Brand: LG Gram | Model: Ultrabook 138 | CPU: Intel Core i7 13th Gen | GPU: NVIDIA RTX 4060 | RAM: 16GB | SSD: 512GB | Display: 15.6-inch FHD."
  },
  {
    "name": "Framework Ultrabook 139 (32GB RAM, 1TB SSD)",
    "price": 210500,
    "originalPrice": 252600,
    "category": "Laptops",
    "image": "https://images.unsplash.com/photo-1593642632823-8f785ba67e45?auto=format&fit=crop&w=800&q=80&sig=prod_unique_94_laptops",
    "images": [
      "https://images.unsplash.com/photo-1593642632823-8f785ba67e45?auto=format&fit=crop&w=800&q=80&sig=prod_unique_94_laptops",
      "https://images.unsplash.com/photo-1544731612-de7f96afe55f?auto=format&fit=crop&w=800&q=80&sig=gallery_view1_94",
      "https://images.unsplash.com/photo-1588872657578-7efd1f1555ed?auto=format&fit=crop&w=800&q=80&sig=gallery_view2_94",
      "https://images.unsplash.com/photo-1496181130204-755241544e3f?auto=format&fit=crop&w=800&q=80&sig=gallery_view3_94"
    ],
    "countInStock": 88,
    "rating": 4.9,
    "numReviews": 235,
    "isFeatured": false,
    "description": "Brand: Framework | Model: Ultrabook 139 | CPU: Intel Core i7 13th Gen | GPU: NVIDIA RTX 4060 | RAM: 32GB | SSD: 1TB | Display: 15.6-inch FHD."
  },
  {
    "name": "Apple MacBook Ultrabook 140 (16GB RAM, 512GB SSD)",
    "price": 215000,
    "originalPrice": 258000,
    "category": "Laptops",
    "image": "https://images.unsplash.com/photo-1544731612-de7f96afe55f?auto=format&fit=crop&w=800&q=80&sig=prod_unique_95_laptops",
    "images": [
      "https://images.unsplash.com/photo-1544731612-de7f96afe55f?auto=format&fit=crop&w=800&q=80&sig=prod_unique_95_laptops",
      "https://images.unsplash.com/photo-1588872657578-7efd1f1555ed?auto=format&fit=crop&w=800&q=80&sig=gallery_view1_95",
      "https://images.unsplash.com/photo-1496181130204-755241544e3f?auto=format&fit=crop&w=800&q=80&sig=gallery_view2_95",
      "https://images.unsplash.com/photo-1517336714731-489689fd1ca8?auto=format&fit=crop&w=800&q=80&sig=gallery_view3_95"
    ],
    "countInStock": 90,
    "rating": 4,
    "numReviews": 240,
    "isFeatured": true,
    "description": "Brand: Apple MacBook | Model: Ultrabook 140 | CPU: Intel Core i7 13th Gen | GPU: NVIDIA RTX 4060 | RAM: 16GB | SSD: 512GB | Display: 15.6-inch FHD."
  },
  {
    "name": "Dell Ultrabook 141 (32GB RAM, 1TB SSD)",
    "price": 219500,
    "originalPrice": 263400,
    "category": "Laptops",
    "image": "https://images.unsplash.com/photo-1588872657578-7efd1f1555ed?auto=format&fit=crop&w=800&q=80&sig=prod_unique_96_laptops",
    "images": [
      "https://images.unsplash.com/photo-1588872657578-7efd1f1555ed?auto=format&fit=crop&w=800&q=80&sig=prod_unique_96_laptops",
      "https://images.unsplash.com/photo-1496181130204-755241544e3f?auto=format&fit=crop&w=800&q=80&sig=gallery_view1_96",
      "https://images.unsplash.com/photo-1517336714731-489689fd1ca8?auto=format&fit=crop&w=800&q=80&sig=gallery_view2_96",
      "https://images.unsplash.com/photo-1603302576837-37561b2e2302?auto=format&fit=crop&w=800&q=80&sig=gallery_view3_96"
    ],
    "countInStock": 92,
    "rating": 4.1,
    "numReviews": 245,
    "isFeatured": false,
    "description": "Brand: Dell | Model: Ultrabook 141 | CPU: Intel Core i7 13th Gen | GPU: NVIDIA RTX 4060 | RAM: 32GB | SSD: 1TB | Display: 15.6-inch FHD."
  },
  {
    "name": "HP Ultrabook 142 (16GB RAM, 512GB SSD)",
    "price": 224000,
    "originalPrice": 268800,
    "category": "Laptops",
    "image": "https://images.unsplash.com/photo-1496181130204-755241544e3f?auto=format&fit=crop&w=800&q=80&sig=prod_unique_97_laptops",
    "images": [
      "https://images.unsplash.com/photo-1496181130204-755241544e3f?auto=format&fit=crop&w=800&q=80&sig=prod_unique_97_laptops",
      "https://images.unsplash.com/photo-1517336714731-489689fd1ca8?auto=format&fit=crop&w=800&q=80&sig=gallery_view1_97",
      "https://images.unsplash.com/photo-1603302576837-37561b2e2302?auto=format&fit=crop&w=800&q=80&sig=gallery_view2_97",
      "https://images.unsplash.com/photo-1593642632823-8f785ba67e45?auto=format&fit=crop&w=800&q=80&sig=gallery_view3_97"
    ],
    "countInStock": 94,
    "rating": 4.2,
    "numReviews": 250,
    "isFeatured": false,
    "description": "Brand: HP | Model: Ultrabook 142 | CPU: Intel Core i7 13th Gen | GPU: NVIDIA RTX 4060 | RAM: 16GB | SSD: 512GB | Display: 15.6-inch FHD."
  },
  {
    "name": "Lenovo Ultrabook 143 (32GB RAM, 1TB SSD)",
    "price": 228500,
    "originalPrice": 274200,
    "category": "Laptops",
    "image": "https://images.unsplash.com/photo-1517336714731-489689fd1ca8?auto=format&fit=crop&w=800&q=80&sig=prod_unique_98_laptops",
    "images": [
      "https://images.unsplash.com/photo-1517336714731-489689fd1ca8?auto=format&fit=crop&w=800&q=80&sig=prod_unique_98_laptops",
      "https://images.unsplash.com/photo-1603302576837-37561b2e2302?auto=format&fit=crop&w=800&q=80&sig=gallery_view1_98",
      "https://images.unsplash.com/photo-1593642632823-8f785ba67e45?auto=format&fit=crop&w=800&q=80&sig=gallery_view2_98",
      "https://images.unsplash.com/photo-1544731612-de7f96afe55f?auto=format&fit=crop&w=800&q=80&sig=gallery_view3_98"
    ],
    "countInStock": 96,
    "rating": 4.3,
    "numReviews": 255,
    "isFeatured": false,
    "description": "Brand: Lenovo | Model: Ultrabook 143 | CPU: Intel Core i7 13th Gen | GPU: NVIDIA RTX 4060 | RAM: 32GB | SSD: 1TB | Display: 15.6-inch FHD."
  },
  {
    "name": "ASUS Ultrabook 144 (16GB RAM, 512GB SSD)",
    "price": 233000,
    "originalPrice": 279600,
    "category": "Laptops",
    "image": "https://images.unsplash.com/photo-1603302576837-37561b2e2302?auto=format&fit=crop&w=800&q=80&sig=prod_unique_99_laptops",
    "images": [
      "https://images.unsplash.com/photo-1603302576837-37561b2e2302?auto=format&fit=crop&w=800&q=80&sig=prod_unique_99_laptops",
      "https://images.unsplash.com/photo-1593642632823-8f785ba67e45?auto=format&fit=crop&w=800&q=80&sig=gallery_view1_99",
      "https://images.unsplash.com/photo-1544731612-de7f96afe55f?auto=format&fit=crop&w=800&q=80&sig=gallery_view2_99",
      "https://images.unsplash.com/photo-1588872657578-7efd1f1555ed?auto=format&fit=crop&w=800&q=80&sig=gallery_view3_99"
    ],
    "countInStock": 98,
    "rating": 4.4,
    "numReviews": 260,
    "isFeatured": false,
    "description": "Brand: ASUS | Model: Ultrabook 144 | CPU: Intel Core i7 13th Gen | GPU: NVIDIA RTX 4060 | RAM: 16GB | SSD: 512GB | Display: 15.6-inch FHD."
  },
  {
    "name": "Acer Ultrabook 145 (32GB RAM, 1TB SSD)",
    "price": 237500,
    "originalPrice": 285000,
    "category": "Laptops",
    "image": "https://images.unsplash.com/photo-1593642632823-8f785ba67e45?auto=format&fit=crop&w=800&q=80&sig=prod_unique_100_laptops",
    "images": [
      "https://images.unsplash.com/photo-1593642632823-8f785ba67e45?auto=format&fit=crop&w=800&q=80&sig=prod_unique_100_laptops",
      "https://images.unsplash.com/photo-1544731612-de7f96afe55f?auto=format&fit=crop&w=800&q=80&sig=gallery_view1_100",
      "https://images.unsplash.com/photo-1588872657578-7efd1f1555ed?auto=format&fit=crop&w=800&q=80&sig=gallery_view2_100",
      "https://images.unsplash.com/photo-1496181130204-755241544e3f?auto=format&fit=crop&w=800&q=80&sig=gallery_view3_100"
    ],
    "countInStock": 100,
    "rating": 4.5,
    "numReviews": 265,
    "isFeatured": true,
    "description": "Brand: Acer | Model: Ultrabook 145 | CPU: Intel Core i7 13th Gen | GPU: NVIDIA RTX 4060 | RAM: 32GB | SSD: 1TB | Display: 15.6-inch FHD."
  },
  {
    "name": "Bose Smart Tech Device 1",
    "price": 2700,
    "originalPrice": 3240,
    "category": "Electronics",
    "image": "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?auto=format&fit=crop&w=800&q=80&sig=prod_unique_101_electronics",
    "images": [
      "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?auto=format&fit=crop&w=800&q=80&sig=prod_unique_101_electronics",
      "https://images.unsplash.com/photo-1600294037681-c80b4cb5b434?auto=format&fit=crop&w=800&q=80&sig=gallery_view1_101",
      "https://images.unsplash.com/photo-1593784991095-a205069470b6?auto=format&fit=crop&w=800&q=80&sig=gallery_view2_101",
      "https://images.unsplash.com/photo-1546868871-7041f2a55e12?auto=format&fit=crop&w=800&q=80&sig=gallery_view3_101"
    ],
    "countInStock": 12,
    "rating": 4.1,
    "numReviews": 45,
    "isFeatured": false,
    "description": "Brand: Bose | Next-gen electronics gadget with high efficiency power rating."
  },
  {
    "name": "JBL Smart Tech Device 2",
    "price": 3900,
    "originalPrice": 4680,
    "category": "Electronics",
    "image": "https://images.unsplash.com/photo-1600294037681-c80b4cb5b434?auto=format&fit=crop&w=800&q=80&sig=prod_unique_102_electronics",
    "images": [
      "https://images.unsplash.com/photo-1600294037681-c80b4cb5b434?auto=format&fit=crop&w=800&q=80&sig=prod_unique_102_electronics",
      "https://images.unsplash.com/photo-1593784991095-a205069470b6?auto=format&fit=crop&w=800&q=80&sig=gallery_view1_102",
      "https://images.unsplash.com/photo-1546868871-7041f2a55e12?auto=format&fit=crop&w=800&q=80&sig=gallery_view2_102",
      "https://images.unsplash.com/photo-1526170375885-4d8ecf77b99f?auto=format&fit=crop&w=800&q=80&sig=gallery_view3_102"
    ],
    "countInStock": 14,
    "rating": 4.2,
    "numReviews": 50,
    "isFeatured": false,
    "description": "Brand: JBL | Next-gen electronics gadget with high efficiency power rating."
  },
  {
    "name": "Sennheiser Smart Tech Device 3",
    "price": 5100,
    "originalPrice": 6120,
    "category": "Electronics",
    "image": "https://images.unsplash.com/photo-1593784991095-a205069470b6?auto=format&fit=crop&w=800&q=80&sig=prod_unique_103_electronics",
    "images": [
      "https://images.unsplash.com/photo-1593784991095-a205069470b6?auto=format&fit=crop&w=800&q=80&sig=prod_unique_103_electronics",
      "https://images.unsplash.com/photo-1546868871-7041f2a55e12?auto=format&fit=crop&w=800&q=80&sig=gallery_view1_103",
      "https://images.unsplash.com/photo-1526170375885-4d8ecf77b99f?auto=format&fit=crop&w=800&q=80&sig=gallery_view2_103",
      "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?auto=format&fit=crop&w=800&q=80&sig=gallery_view3_103"
    ],
    "countInStock": 16,
    "rating": 4.3,
    "numReviews": 55,
    "isFeatured": false,
    "description": "Brand: Sennheiser | Next-gen electronics gadget with high efficiency power rating."
  },
  {
    "name": "LG Smart Tech Device 4",
    "price": 6300,
    "originalPrice": 7560,
    "category": "Electronics",
    "image": "https://images.unsplash.com/photo-1546868871-7041f2a55e12?auto=format&fit=crop&w=800&q=80&sig=prod_unique_104_electronics",
    "images": [
      "https://images.unsplash.com/photo-1546868871-7041f2a55e12?auto=format&fit=crop&w=800&q=80&sig=prod_unique_104_electronics",
      "https://images.unsplash.com/photo-1526170375885-4d8ecf77b99f?auto=format&fit=crop&w=800&q=80&sig=gallery_view1_104",
      "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?auto=format&fit=crop&w=800&q=80&sig=gallery_view2_104",
      "https://images.unsplash.com/photo-1600294037681-c80b4cb5b434?auto=format&fit=crop&w=800&q=80&sig=gallery_view3_104"
    ],
    "countInStock": 18,
    "rating": 4.4,
    "numReviews": 60,
    "isFeatured": false,
    "description": "Brand: LG | Next-gen electronics gadget with high efficiency power rating."
  },
  {
    "name": "Samsung Smart Tech Device 5",
    "price": 7500,
    "originalPrice": 9000,
    "category": "Electronics",
    "image": "https://images.unsplash.com/photo-1526170375885-4d8ecf77b99f?auto=format&fit=crop&w=800&q=80&sig=prod_unique_105_electronics",
    "images": [
      "https://images.unsplash.com/photo-1526170375885-4d8ecf77b99f?auto=format&fit=crop&w=800&q=80&sig=prod_unique_105_electronics",
      "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?auto=format&fit=crop&w=800&q=80&sig=gallery_view1_105",
      "https://images.unsplash.com/photo-1600294037681-c80b4cb5b434?auto=format&fit=crop&w=800&q=80&sig=gallery_view2_105",
      "https://images.unsplash.com/photo-1593784991095-a205069470b6?auto=format&fit=crop&w=800&q=80&sig=gallery_view3_105"
    ],
    "countInStock": 20,
    "rating": 4.5,
    "numReviews": 65,
    "isFeatured": true,
    "description": "Brand: Samsung | Next-gen electronics gadget with high efficiency power rating."
  },
  {
    "name": "Canon Smart Tech Device 6",
    "price": 8700,
    "originalPrice": 10440,
    "category": "Electronics",
    "image": "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?auto=format&fit=crop&w=800&q=80&sig=prod_unique_106_electronics",
    "images": [
      "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?auto=format&fit=crop&w=800&q=80&sig=prod_unique_106_electronics",
      "https://images.unsplash.com/photo-1600294037681-c80b4cb5b434?auto=format&fit=crop&w=800&q=80&sig=gallery_view1_106",
      "https://images.unsplash.com/photo-1593784991095-a205069470b6?auto=format&fit=crop&w=800&q=80&sig=gallery_view2_106",
      "https://images.unsplash.com/photo-1546868871-7041f2a55e12?auto=format&fit=crop&w=800&q=80&sig=gallery_view3_106"
    ],
    "countInStock": 22,
    "rating": 4.6,
    "numReviews": 70,
    "isFeatured": false,
    "description": "Brand: Canon | Next-gen electronics gadget with high efficiency power rating."
  },
  {
    "name": "Nikon Smart Tech Device 7",
    "price": 9900,
    "originalPrice": 11880,
    "category": "Electronics",
    "image": "https://images.unsplash.com/photo-1600294037681-c80b4cb5b434?auto=format&fit=crop&w=800&q=80&sig=prod_unique_107_electronics",
    "images": [
      "https://images.unsplash.com/photo-1600294037681-c80b4cb5b434?auto=format&fit=crop&w=800&q=80&sig=prod_unique_107_electronics",
      "https://images.unsplash.com/photo-1593784991095-a205069470b6?auto=format&fit=crop&w=800&q=80&sig=gallery_view1_107",
      "https://images.unsplash.com/photo-1546868871-7041f2a55e12?auto=format&fit=crop&w=800&q=80&sig=gallery_view2_107",
      "https://images.unsplash.com/photo-1526170375885-4d8ecf77b99f?auto=format&fit=crop&w=800&q=80&sig=gallery_view3_107"
    ],
    "countInStock": 24,
    "rating": 4.7,
    "numReviews": 75,
    "isFeatured": false,
    "description": "Brand: Nikon | Next-gen electronics gadget with high efficiency power rating."
  },
  {
    "name": "Logitech Smart Tech Device 8",
    "price": 11100,
    "originalPrice": 13320,
    "category": "Electronics",
    "image": "https://images.unsplash.com/photo-1593784991095-a205069470b6?auto=format&fit=crop&w=800&q=80&sig=prod_unique_108_electronics",
    "images": [
      "https://images.unsplash.com/photo-1593784991095-a205069470b6?auto=format&fit=crop&w=800&q=80&sig=prod_unique_108_electronics",
      "https://images.unsplash.com/photo-1546868871-7041f2a55e12?auto=format&fit=crop&w=800&q=80&sig=gallery_view1_108",
      "https://images.unsplash.com/photo-1526170375885-4d8ecf77b99f?auto=format&fit=crop&w=800&q=80&sig=gallery_view2_108",
      "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?auto=format&fit=crop&w=800&q=80&sig=gallery_view3_108"
    ],
    "countInStock": 26,
    "rating": 4.8,
    "numReviews": 80,
    "isFeatured": false,
    "description": "Brand: Logitech | Next-gen electronics gadget with high efficiency power rating."
  },
  {
    "name": "Anker Smart Tech Device 9",
    "price": 12300,
    "originalPrice": 14760,
    "category": "Electronics",
    "image": "https://images.unsplash.com/photo-1546868871-7041f2a55e12?auto=format&fit=crop&w=800&q=80&sig=prod_unique_109_electronics",
    "images": [
      "https://images.unsplash.com/photo-1546868871-7041f2a55e12?auto=format&fit=crop&w=800&q=80&sig=prod_unique_109_electronics",
      "https://images.unsplash.com/photo-1526170375885-4d8ecf77b99f?auto=format&fit=crop&w=800&q=80&sig=gallery_view1_109",
      "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?auto=format&fit=crop&w=800&q=80&sig=gallery_view2_109",
      "https://images.unsplash.com/photo-1600294037681-c80b4cb5b434?auto=format&fit=crop&w=800&q=80&sig=gallery_view3_109"
    ],
    "countInStock": 28,
    "rating": 4.9,
    "numReviews": 85,
    "isFeatured": false,
    "description": "Brand: Anker | Next-gen electronics gadget with high efficiency power rating."
  },
  {
    "name": "Sony Smart Tech Device 10",
    "price": 13500,
    "originalPrice": 16200,
    "category": "Electronics",
    "image": "https://images.unsplash.com/photo-1526170375885-4d8ecf77b99f?auto=format&fit=crop&w=800&q=80&sig=prod_unique_110_electronics",
    "images": [
      "https://images.unsplash.com/photo-1526170375885-4d8ecf77b99f?auto=format&fit=crop&w=800&q=80&sig=prod_unique_110_electronics",
      "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?auto=format&fit=crop&w=800&q=80&sig=gallery_view1_110",
      "https://images.unsplash.com/photo-1600294037681-c80b4cb5b434?auto=format&fit=crop&w=800&q=80&sig=gallery_view2_110",
      "https://images.unsplash.com/photo-1593784991095-a205069470b6?auto=format&fit=crop&w=800&q=80&sig=gallery_view3_110"
    ],
    "countInStock": 30,
    "rating": 4,
    "numReviews": 90,
    "isFeatured": true,
    "description": "Brand: Sony | Next-gen electronics gadget with high efficiency power rating."
  },
  {
    "name": "Bose Smart Tech Device 11",
    "price": 14700,
    "originalPrice": 17640,
    "category": "Electronics",
    "image": "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?auto=format&fit=crop&w=800&q=80&sig=prod_unique_111_electronics",
    "images": [
      "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?auto=format&fit=crop&w=800&q=80&sig=prod_unique_111_electronics",
      "https://images.unsplash.com/photo-1600294037681-c80b4cb5b434?auto=format&fit=crop&w=800&q=80&sig=gallery_view1_111",
      "https://images.unsplash.com/photo-1593784991095-a205069470b6?auto=format&fit=crop&w=800&q=80&sig=gallery_view2_111",
      "https://images.unsplash.com/photo-1546868871-7041f2a55e12?auto=format&fit=crop&w=800&q=80&sig=gallery_view3_111"
    ],
    "countInStock": 32,
    "rating": 4.1,
    "numReviews": 95,
    "isFeatured": false,
    "description": "Brand: Bose | Next-gen electronics gadget with high efficiency power rating."
  },
  {
    "name": "JBL Smart Tech Device 12",
    "price": 15900,
    "originalPrice": 19080,
    "category": "Electronics",
    "image": "https://images.unsplash.com/photo-1600294037681-c80b4cb5b434?auto=format&fit=crop&w=800&q=80&sig=prod_unique_112_electronics",
    "images": [
      "https://images.unsplash.com/photo-1600294037681-c80b4cb5b434?auto=format&fit=crop&w=800&q=80&sig=prod_unique_112_electronics",
      "https://images.unsplash.com/photo-1593784991095-a205069470b6?auto=format&fit=crop&w=800&q=80&sig=gallery_view1_112",
      "https://images.unsplash.com/photo-1546868871-7041f2a55e12?auto=format&fit=crop&w=800&q=80&sig=gallery_view2_112",
      "https://images.unsplash.com/photo-1526170375885-4d8ecf77b99f?auto=format&fit=crop&w=800&q=80&sig=gallery_view3_112"
    ],
    "countInStock": 34,
    "rating": 4.2,
    "numReviews": 100,
    "isFeatured": false,
    "description": "Brand: JBL | Next-gen electronics gadget with high efficiency power rating."
  },
  {
    "name": "Sennheiser Smart Tech Device 13",
    "price": 17100,
    "originalPrice": 20520,
    "category": "Electronics",
    "image": "https://images.unsplash.com/photo-1593784991095-a205069470b6?auto=format&fit=crop&w=800&q=80&sig=prod_unique_113_electronics",
    "images": [
      "https://images.unsplash.com/photo-1593784991095-a205069470b6?auto=format&fit=crop&w=800&q=80&sig=prod_unique_113_electronics",
      "https://images.unsplash.com/photo-1546868871-7041f2a55e12?auto=format&fit=crop&w=800&q=80&sig=gallery_view1_113",
      "https://images.unsplash.com/photo-1526170375885-4d8ecf77b99f?auto=format&fit=crop&w=800&q=80&sig=gallery_view2_113",
      "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?auto=format&fit=crop&w=800&q=80&sig=gallery_view3_113"
    ],
    "countInStock": 36,
    "rating": 4.3,
    "numReviews": 105,
    "isFeatured": false,
    "description": "Brand: Sennheiser | Next-gen electronics gadget with high efficiency power rating."
  },
  {
    "name": "LG Smart Tech Device 14",
    "price": 18300,
    "originalPrice": 21960,
    "category": "Electronics",
    "image": "https://images.unsplash.com/photo-1546868871-7041f2a55e12?auto=format&fit=crop&w=800&q=80&sig=prod_unique_114_electronics",
    "images": [
      "https://images.unsplash.com/photo-1546868871-7041f2a55e12?auto=format&fit=crop&w=800&q=80&sig=prod_unique_114_electronics",
      "https://images.unsplash.com/photo-1526170375885-4d8ecf77b99f?auto=format&fit=crop&w=800&q=80&sig=gallery_view1_114",
      "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?auto=format&fit=crop&w=800&q=80&sig=gallery_view2_114",
      "https://images.unsplash.com/photo-1600294037681-c80b4cb5b434?auto=format&fit=crop&w=800&q=80&sig=gallery_view3_114"
    ],
    "countInStock": 38,
    "rating": 4.4,
    "numReviews": 110,
    "isFeatured": false,
    "description": "Brand: LG | Next-gen electronics gadget with high efficiency power rating."
  },
  {
    "name": "Samsung Smart Tech Device 15",
    "price": 19500,
    "originalPrice": 23400,
    "category": "Electronics",
    "image": "https://images.unsplash.com/photo-1526170375885-4d8ecf77b99f?auto=format&fit=crop&w=800&q=80&sig=prod_unique_115_electronics",
    "images": [
      "https://images.unsplash.com/photo-1526170375885-4d8ecf77b99f?auto=format&fit=crop&w=800&q=80&sig=prod_unique_115_electronics",
      "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?auto=format&fit=crop&w=800&q=80&sig=gallery_view1_115",
      "https://images.unsplash.com/photo-1600294037681-c80b4cb5b434?auto=format&fit=crop&w=800&q=80&sig=gallery_view2_115",
      "https://images.unsplash.com/photo-1593784991095-a205069470b6?auto=format&fit=crop&w=800&q=80&sig=gallery_view3_115"
    ],
    "countInStock": 40,
    "rating": 4.5,
    "numReviews": 115,
    "isFeatured": true,
    "description": "Brand: Samsung | Next-gen electronics gadget with high efficiency power rating."
  },
  {
    "name": "Canon Smart Tech Device 16",
    "price": 20700,
    "originalPrice": 24840,
    "category": "Electronics",
    "image": "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?auto=format&fit=crop&w=800&q=80&sig=prod_unique_116_electronics",
    "images": [
      "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?auto=format&fit=crop&w=800&q=80&sig=prod_unique_116_electronics",
      "https://images.unsplash.com/photo-1600294037681-c80b4cb5b434?auto=format&fit=crop&w=800&q=80&sig=gallery_view1_116",
      "https://images.unsplash.com/photo-1593784991095-a205069470b6?auto=format&fit=crop&w=800&q=80&sig=gallery_view2_116",
      "https://images.unsplash.com/photo-1546868871-7041f2a55e12?auto=format&fit=crop&w=800&q=80&sig=gallery_view3_116"
    ],
    "countInStock": 42,
    "rating": 4.6,
    "numReviews": 120,
    "isFeatured": false,
    "description": "Brand: Canon | Next-gen electronics gadget with high efficiency power rating."
  },
  {
    "name": "Nikon Smart Tech Device 17",
    "price": 21900,
    "originalPrice": 26280,
    "category": "Electronics",
    "image": "https://images.unsplash.com/photo-1600294037681-c80b4cb5b434?auto=format&fit=crop&w=800&q=80&sig=prod_unique_117_electronics",
    "images": [
      "https://images.unsplash.com/photo-1600294037681-c80b4cb5b434?auto=format&fit=crop&w=800&q=80&sig=prod_unique_117_electronics",
      "https://images.unsplash.com/photo-1593784991095-a205069470b6?auto=format&fit=crop&w=800&q=80&sig=gallery_view1_117",
      "https://images.unsplash.com/photo-1546868871-7041f2a55e12?auto=format&fit=crop&w=800&q=80&sig=gallery_view2_117",
      "https://images.unsplash.com/photo-1526170375885-4d8ecf77b99f?auto=format&fit=crop&w=800&q=80&sig=gallery_view3_117"
    ],
    "countInStock": 44,
    "rating": 4.7,
    "numReviews": 125,
    "isFeatured": false,
    "description": "Brand: Nikon | Next-gen electronics gadget with high efficiency power rating."
  },
  {
    "name": "Logitech Smart Tech Device 18",
    "price": 23100,
    "originalPrice": 27720,
    "category": "Electronics",
    "image": "https://images.unsplash.com/photo-1593784991095-a205069470b6?auto=format&fit=crop&w=800&q=80&sig=prod_unique_118_electronics",
    "images": [
      "https://images.unsplash.com/photo-1593784991095-a205069470b6?auto=format&fit=crop&w=800&q=80&sig=prod_unique_118_electronics",
      "https://images.unsplash.com/photo-1546868871-7041f2a55e12?auto=format&fit=crop&w=800&q=80&sig=gallery_view1_118",
      "https://images.unsplash.com/photo-1526170375885-4d8ecf77b99f?auto=format&fit=crop&w=800&q=80&sig=gallery_view2_118",
      "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?auto=format&fit=crop&w=800&q=80&sig=gallery_view3_118"
    ],
    "countInStock": 46,
    "rating": 4.8,
    "numReviews": 130,
    "isFeatured": false,
    "description": "Brand: Logitech | Next-gen electronics gadget with high efficiency power rating."
  },
  {
    "name": "Anker Smart Tech Device 19",
    "price": 24300,
    "originalPrice": 29160,
    "category": "Electronics",
    "image": "https://images.unsplash.com/photo-1546868871-7041f2a55e12?auto=format&fit=crop&w=800&q=80&sig=prod_unique_119_electronics",
    "images": [
      "https://images.unsplash.com/photo-1546868871-7041f2a55e12?auto=format&fit=crop&w=800&q=80&sig=prod_unique_119_electronics",
      "https://images.unsplash.com/photo-1526170375885-4d8ecf77b99f?auto=format&fit=crop&w=800&q=80&sig=gallery_view1_119",
      "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?auto=format&fit=crop&w=800&q=80&sig=gallery_view2_119",
      "https://images.unsplash.com/photo-1600294037681-c80b4cb5b434?auto=format&fit=crop&w=800&q=80&sig=gallery_view3_119"
    ],
    "countInStock": 48,
    "rating": 4.9,
    "numReviews": 135,
    "isFeatured": false,
    "description": "Brand: Anker | Next-gen electronics gadget with high efficiency power rating."
  },
  {
    "name": "Sony Smart Tech Device 20",
    "price": 25500,
    "originalPrice": 30600,
    "category": "Electronics",
    "image": "https://images.unsplash.com/photo-1526170375885-4d8ecf77b99f?auto=format&fit=crop&w=800&q=80&sig=prod_unique_120_electronics",
    "images": [
      "https://images.unsplash.com/photo-1526170375885-4d8ecf77b99f?auto=format&fit=crop&w=800&q=80&sig=prod_unique_120_electronics",
      "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?auto=format&fit=crop&w=800&q=80&sig=gallery_view1_120",
      "https://images.unsplash.com/photo-1600294037681-c80b4cb5b434?auto=format&fit=crop&w=800&q=80&sig=gallery_view2_120",
      "https://images.unsplash.com/photo-1593784991095-a205069470b6?auto=format&fit=crop&w=800&q=80&sig=gallery_view3_120"
    ],
    "countInStock": 50,
    "rating": 4,
    "numReviews": 140,
    "isFeatured": true,
    "description": "Brand: Sony | Next-gen electronics gadget with high efficiency power rating."
  },
  {
    "name": "Bose Smart Tech Device 21",
    "price": 26700,
    "originalPrice": 32040,
    "category": "Electronics",
    "image": "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?auto=format&fit=crop&w=800&q=80&sig=prod_unique_121_electronics",
    "images": [
      "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?auto=format&fit=crop&w=800&q=80&sig=prod_unique_121_electronics",
      "https://images.unsplash.com/photo-1600294037681-c80b4cb5b434?auto=format&fit=crop&w=800&q=80&sig=gallery_view1_121",
      "https://images.unsplash.com/photo-1593784991095-a205069470b6?auto=format&fit=crop&w=800&q=80&sig=gallery_view2_121",
      "https://images.unsplash.com/photo-1546868871-7041f2a55e12?auto=format&fit=crop&w=800&q=80&sig=gallery_view3_121"
    ],
    "countInStock": 52,
    "rating": 4.1,
    "numReviews": 145,
    "isFeatured": false,
    "description": "Brand: Bose | Next-gen electronics gadget with high efficiency power rating."
  },
  {
    "name": "JBL Smart Tech Device 22",
    "price": 27900,
    "originalPrice": 33480,
    "category": "Electronics",
    "image": "https://images.unsplash.com/photo-1600294037681-c80b4cb5b434?auto=format&fit=crop&w=800&q=80&sig=prod_unique_122_electronics",
    "images": [
      "https://images.unsplash.com/photo-1600294037681-c80b4cb5b434?auto=format&fit=crop&w=800&q=80&sig=prod_unique_122_electronics",
      "https://images.unsplash.com/photo-1593784991095-a205069470b6?auto=format&fit=crop&w=800&q=80&sig=gallery_view1_122",
      "https://images.unsplash.com/photo-1546868871-7041f2a55e12?auto=format&fit=crop&w=800&q=80&sig=gallery_view2_122",
      "https://images.unsplash.com/photo-1526170375885-4d8ecf77b99f?auto=format&fit=crop&w=800&q=80&sig=gallery_view3_122"
    ],
    "countInStock": 54,
    "rating": 4.2,
    "numReviews": 150,
    "isFeatured": false,
    "description": "Brand: JBL | Next-gen electronics gadget with high efficiency power rating."
  },
  {
    "name": "Sennheiser Smart Tech Device 23",
    "price": 29100,
    "originalPrice": 34920,
    "category": "Electronics",
    "image": "https://images.unsplash.com/photo-1593784991095-a205069470b6?auto=format&fit=crop&w=800&q=80&sig=prod_unique_123_electronics",
    "images": [
      "https://images.unsplash.com/photo-1593784991095-a205069470b6?auto=format&fit=crop&w=800&q=80&sig=prod_unique_123_electronics",
      "https://images.unsplash.com/photo-1546868871-7041f2a55e12?auto=format&fit=crop&w=800&q=80&sig=gallery_view1_123",
      "https://images.unsplash.com/photo-1526170375885-4d8ecf77b99f?auto=format&fit=crop&w=800&q=80&sig=gallery_view2_123",
      "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?auto=format&fit=crop&w=800&q=80&sig=gallery_view3_123"
    ],
    "countInStock": 56,
    "rating": 4.3,
    "numReviews": 155,
    "isFeatured": false,
    "description": "Brand: Sennheiser | Next-gen electronics gadget with high efficiency power rating."
  },
  {
    "name": "LG Smart Tech Device 24",
    "price": 30300,
    "originalPrice": 36360,
    "category": "Electronics",
    "image": "https://images.unsplash.com/photo-1546868871-7041f2a55e12?auto=format&fit=crop&w=800&q=80&sig=prod_unique_124_electronics",
    "images": [
      "https://images.unsplash.com/photo-1546868871-7041f2a55e12?auto=format&fit=crop&w=800&q=80&sig=prod_unique_124_electronics",
      "https://images.unsplash.com/photo-1526170375885-4d8ecf77b99f?auto=format&fit=crop&w=800&q=80&sig=gallery_view1_124",
      "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?auto=format&fit=crop&w=800&q=80&sig=gallery_view2_124",
      "https://images.unsplash.com/photo-1600294037681-c80b4cb5b434?auto=format&fit=crop&w=800&q=80&sig=gallery_view3_124"
    ],
    "countInStock": 58,
    "rating": 4.4,
    "numReviews": 160,
    "isFeatured": false,
    "description": "Brand: LG | Next-gen electronics gadget with high efficiency power rating."
  },
  {
    "name": "Samsung Smart Tech Device 25",
    "price": 31500,
    "originalPrice": 37800,
    "category": "Electronics",
    "image": "https://images.unsplash.com/photo-1526170375885-4d8ecf77b99f?auto=format&fit=crop&w=800&q=80&sig=prod_unique_125_electronics",
    "images": [
      "https://images.unsplash.com/photo-1526170375885-4d8ecf77b99f?auto=format&fit=crop&w=800&q=80&sig=prod_unique_125_electronics",
      "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?auto=format&fit=crop&w=800&q=80&sig=gallery_view1_125",
      "https://images.unsplash.com/photo-1600294037681-c80b4cb5b434?auto=format&fit=crop&w=800&q=80&sig=gallery_view2_125",
      "https://images.unsplash.com/photo-1593784991095-a205069470b6?auto=format&fit=crop&w=800&q=80&sig=gallery_view3_125"
    ],
    "countInStock": 60,
    "rating": 4.5,
    "numReviews": 165,
    "isFeatured": true,
    "description": "Brand: Samsung | Next-gen electronics gadget with high efficiency power rating."
  },
  {
    "name": "Canon Smart Tech Device 26",
    "price": 32700,
    "originalPrice": 39240,
    "category": "Electronics",
    "image": "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?auto=format&fit=crop&w=800&q=80&sig=prod_unique_126_electronics",
    "images": [
      "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?auto=format&fit=crop&w=800&q=80&sig=prod_unique_126_electronics",
      "https://images.unsplash.com/photo-1600294037681-c80b4cb5b434?auto=format&fit=crop&w=800&q=80&sig=gallery_view1_126",
      "https://images.unsplash.com/photo-1593784991095-a205069470b6?auto=format&fit=crop&w=800&q=80&sig=gallery_view2_126",
      "https://images.unsplash.com/photo-1546868871-7041f2a55e12?auto=format&fit=crop&w=800&q=80&sig=gallery_view3_126"
    ],
    "countInStock": 62,
    "rating": 4.6,
    "numReviews": 170,
    "isFeatured": false,
    "description": "Brand: Canon | Next-gen electronics gadget with high efficiency power rating."
  },
  {
    "name": "Nikon Smart Tech Device 27",
    "price": 33900,
    "originalPrice": 40680,
    "category": "Electronics",
    "image": "https://images.unsplash.com/photo-1600294037681-c80b4cb5b434?auto=format&fit=crop&w=800&q=80&sig=prod_unique_127_electronics",
    "images": [
      "https://images.unsplash.com/photo-1600294037681-c80b4cb5b434?auto=format&fit=crop&w=800&q=80&sig=prod_unique_127_electronics",
      "https://images.unsplash.com/photo-1593784991095-a205069470b6?auto=format&fit=crop&w=800&q=80&sig=gallery_view1_127",
      "https://images.unsplash.com/photo-1546868871-7041f2a55e12?auto=format&fit=crop&w=800&q=80&sig=gallery_view2_127",
      "https://images.unsplash.com/photo-1526170375885-4d8ecf77b99f?auto=format&fit=crop&w=800&q=80&sig=gallery_view3_127"
    ],
    "countInStock": 64,
    "rating": 4.7,
    "numReviews": 175,
    "isFeatured": false,
    "description": "Brand: Nikon | Next-gen electronics gadget with high efficiency power rating."
  },
  {
    "name": "Logitech Smart Tech Device 28",
    "price": 35100,
    "originalPrice": 42120,
    "category": "Electronics",
    "image": "https://images.unsplash.com/photo-1593784991095-a205069470b6?auto=format&fit=crop&w=800&q=80&sig=prod_unique_128_electronics",
    "images": [
      "https://images.unsplash.com/photo-1593784991095-a205069470b6?auto=format&fit=crop&w=800&q=80&sig=prod_unique_128_electronics",
      "https://images.unsplash.com/photo-1546868871-7041f2a55e12?auto=format&fit=crop&w=800&q=80&sig=gallery_view1_128",
      "https://images.unsplash.com/photo-1526170375885-4d8ecf77b99f?auto=format&fit=crop&w=800&q=80&sig=gallery_view2_128",
      "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?auto=format&fit=crop&w=800&q=80&sig=gallery_view3_128"
    ],
    "countInStock": 66,
    "rating": 4.8,
    "numReviews": 180,
    "isFeatured": false,
    "description": "Brand: Logitech | Next-gen electronics gadget with high efficiency power rating."
  },
  {
    "name": "Anker Smart Tech Device 29",
    "price": 36300,
    "originalPrice": 43560,
    "category": "Electronics",
    "image": "https://images.unsplash.com/photo-1546868871-7041f2a55e12?auto=format&fit=crop&w=800&q=80&sig=prod_unique_129_electronics",
    "images": [
      "https://images.unsplash.com/photo-1546868871-7041f2a55e12?auto=format&fit=crop&w=800&q=80&sig=prod_unique_129_electronics",
      "https://images.unsplash.com/photo-1526170375885-4d8ecf77b99f?auto=format&fit=crop&w=800&q=80&sig=gallery_view1_129",
      "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?auto=format&fit=crop&w=800&q=80&sig=gallery_view2_129",
      "https://images.unsplash.com/photo-1600294037681-c80b4cb5b434?auto=format&fit=crop&w=800&q=80&sig=gallery_view3_129"
    ],
    "countInStock": 68,
    "rating": 4.9,
    "numReviews": 185,
    "isFeatured": false,
    "description": "Brand: Anker | Next-gen electronics gadget with high efficiency power rating."
  },
  {
    "name": "Sony Smart Tech Device 30",
    "price": 37500,
    "originalPrice": 45000,
    "category": "Electronics",
    "image": "https://images.unsplash.com/photo-1526170375885-4d8ecf77b99f?auto=format&fit=crop&w=800&q=80&sig=prod_unique_130_electronics",
    "images": [
      "https://images.unsplash.com/photo-1526170375885-4d8ecf77b99f?auto=format&fit=crop&w=800&q=80&sig=prod_unique_130_electronics",
      "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?auto=format&fit=crop&w=800&q=80&sig=gallery_view1_130",
      "https://images.unsplash.com/photo-1600294037681-c80b4cb5b434?auto=format&fit=crop&w=800&q=80&sig=gallery_view2_130",
      "https://images.unsplash.com/photo-1593784991095-a205069470b6?auto=format&fit=crop&w=800&q=80&sig=gallery_view3_130"
    ],
    "countInStock": 70,
    "rating": 4,
    "numReviews": 190,
    "isFeatured": true,
    "description": "Brand: Sony | Next-gen electronics gadget with high efficiency power rating."
  },
  {
    "name": "Bose Smart Tech Device 31",
    "price": 38700,
    "originalPrice": 46440,
    "category": "Electronics",
    "image": "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?auto=format&fit=crop&w=800&q=80&sig=prod_unique_131_electronics",
    "images": [
      "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?auto=format&fit=crop&w=800&q=80&sig=prod_unique_131_electronics",
      "https://images.unsplash.com/photo-1600294037681-c80b4cb5b434?auto=format&fit=crop&w=800&q=80&sig=gallery_view1_131",
      "https://images.unsplash.com/photo-1593784991095-a205069470b6?auto=format&fit=crop&w=800&q=80&sig=gallery_view2_131",
      "https://images.unsplash.com/photo-1546868871-7041f2a55e12?auto=format&fit=crop&w=800&q=80&sig=gallery_view3_131"
    ],
    "countInStock": 72,
    "rating": 4.1,
    "numReviews": 195,
    "isFeatured": false,
    "description": "Brand: Bose | Next-gen electronics gadget with high efficiency power rating."
  },
  {
    "name": "JBL Smart Tech Device 32",
    "price": 39900,
    "originalPrice": 47880,
    "category": "Electronics",
    "image": "https://images.unsplash.com/photo-1600294037681-c80b4cb5b434?auto=format&fit=crop&w=800&q=80&sig=prod_unique_132_electronics",
    "images": [
      "https://images.unsplash.com/photo-1600294037681-c80b4cb5b434?auto=format&fit=crop&w=800&q=80&sig=prod_unique_132_electronics",
      "https://images.unsplash.com/photo-1593784991095-a205069470b6?auto=format&fit=crop&w=800&q=80&sig=gallery_view1_132",
      "https://images.unsplash.com/photo-1546868871-7041f2a55e12?auto=format&fit=crop&w=800&q=80&sig=gallery_view2_132",
      "https://images.unsplash.com/photo-1526170375885-4d8ecf77b99f?auto=format&fit=crop&w=800&q=80&sig=gallery_view3_132"
    ],
    "countInStock": 74,
    "rating": 4.2,
    "numReviews": 200,
    "isFeatured": false,
    "description": "Brand: JBL | Next-gen electronics gadget with high efficiency power rating."
  },
  {
    "name": "Sennheiser Smart Tech Device 33",
    "price": 41100,
    "originalPrice": 49320,
    "category": "Electronics",
    "image": "https://images.unsplash.com/photo-1593784991095-a205069470b6?auto=format&fit=crop&w=800&q=80&sig=prod_unique_133_electronics",
    "images": [
      "https://images.unsplash.com/photo-1593784991095-a205069470b6?auto=format&fit=crop&w=800&q=80&sig=prod_unique_133_electronics",
      "https://images.unsplash.com/photo-1546868871-7041f2a55e12?auto=format&fit=crop&w=800&q=80&sig=gallery_view1_133",
      "https://images.unsplash.com/photo-1526170375885-4d8ecf77b99f?auto=format&fit=crop&w=800&q=80&sig=gallery_view2_133",
      "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?auto=format&fit=crop&w=800&q=80&sig=gallery_view3_133"
    ],
    "countInStock": 76,
    "rating": 4.3,
    "numReviews": 205,
    "isFeatured": false,
    "description": "Brand: Sennheiser | Next-gen electronics gadget with high efficiency power rating."
  },
  {
    "name": "LG Smart Tech Device 34",
    "price": 42300,
    "originalPrice": 50760,
    "category": "Electronics",
    "image": "https://images.unsplash.com/photo-1546868871-7041f2a55e12?auto=format&fit=crop&w=800&q=80&sig=prod_unique_134_electronics",
    "images": [
      "https://images.unsplash.com/photo-1546868871-7041f2a55e12?auto=format&fit=crop&w=800&q=80&sig=prod_unique_134_electronics",
      "https://images.unsplash.com/photo-1526170375885-4d8ecf77b99f?auto=format&fit=crop&w=800&q=80&sig=gallery_view1_134",
      "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?auto=format&fit=crop&w=800&q=80&sig=gallery_view2_134",
      "https://images.unsplash.com/photo-1600294037681-c80b4cb5b434?auto=format&fit=crop&w=800&q=80&sig=gallery_view3_134"
    ],
    "countInStock": 78,
    "rating": 4.4,
    "numReviews": 210,
    "isFeatured": false,
    "description": "Brand: LG | Next-gen electronics gadget with high efficiency power rating."
  },
  {
    "name": "Samsung Smart Tech Device 35",
    "price": 43500,
    "originalPrice": 52200,
    "category": "Electronics",
    "image": "https://images.unsplash.com/photo-1526170375885-4d8ecf77b99f?auto=format&fit=crop&w=800&q=80&sig=prod_unique_135_electronics",
    "images": [
      "https://images.unsplash.com/photo-1526170375885-4d8ecf77b99f?auto=format&fit=crop&w=800&q=80&sig=prod_unique_135_electronics",
      "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?auto=format&fit=crop&w=800&q=80&sig=gallery_view1_135",
      "https://images.unsplash.com/photo-1600294037681-c80b4cb5b434?auto=format&fit=crop&w=800&q=80&sig=gallery_view2_135",
      "https://images.unsplash.com/photo-1593784991095-a205069470b6?auto=format&fit=crop&w=800&q=80&sig=gallery_view3_135"
    ],
    "countInStock": 80,
    "rating": 4.5,
    "numReviews": 215,
    "isFeatured": true,
    "description": "Brand: Samsung | Next-gen electronics gadget with high efficiency power rating."
  },
  {
    "name": "Canon Smart Tech Device 36",
    "price": 44700,
    "originalPrice": 53640,
    "category": "Electronics",
    "image": "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?auto=format&fit=crop&w=800&q=80&sig=prod_unique_136_electronics",
    "images": [
      "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?auto=format&fit=crop&w=800&q=80&sig=prod_unique_136_electronics",
      "https://images.unsplash.com/photo-1600294037681-c80b4cb5b434?auto=format&fit=crop&w=800&q=80&sig=gallery_view1_136",
      "https://images.unsplash.com/photo-1593784991095-a205069470b6?auto=format&fit=crop&w=800&q=80&sig=gallery_view2_136",
      "https://images.unsplash.com/photo-1546868871-7041f2a55e12?auto=format&fit=crop&w=800&q=80&sig=gallery_view3_136"
    ],
    "countInStock": 82,
    "rating": 4.6,
    "numReviews": 220,
    "isFeatured": false,
    "description": "Brand: Canon | Next-gen electronics gadget with high efficiency power rating."
  },
  {
    "name": "Nikon Smart Tech Device 37",
    "price": 45900,
    "originalPrice": 55080,
    "category": "Electronics",
    "image": "https://images.unsplash.com/photo-1600294037681-c80b4cb5b434?auto=format&fit=crop&w=800&q=80&sig=prod_unique_137_electronics",
    "images": [
      "https://images.unsplash.com/photo-1600294037681-c80b4cb5b434?auto=format&fit=crop&w=800&q=80&sig=prod_unique_137_electronics",
      "https://images.unsplash.com/photo-1593784991095-a205069470b6?auto=format&fit=crop&w=800&q=80&sig=gallery_view1_137",
      "https://images.unsplash.com/photo-1546868871-7041f2a55e12?auto=format&fit=crop&w=800&q=80&sig=gallery_view2_137",
      "https://images.unsplash.com/photo-1526170375885-4d8ecf77b99f?auto=format&fit=crop&w=800&q=80&sig=gallery_view3_137"
    ],
    "countInStock": 84,
    "rating": 4.7,
    "numReviews": 225,
    "isFeatured": false,
    "description": "Brand: Nikon | Next-gen electronics gadget with high efficiency power rating."
  },
  {
    "name": "Logitech Smart Tech Device 38",
    "price": 47100,
    "originalPrice": 56520,
    "category": "Electronics",
    "image": "https://images.unsplash.com/photo-1593784991095-a205069470b6?auto=format&fit=crop&w=800&q=80&sig=prod_unique_138_electronics",
    "images": [
      "https://images.unsplash.com/photo-1593784991095-a205069470b6?auto=format&fit=crop&w=800&q=80&sig=prod_unique_138_electronics",
      "https://images.unsplash.com/photo-1546868871-7041f2a55e12?auto=format&fit=crop&w=800&q=80&sig=gallery_view1_138",
      "https://images.unsplash.com/photo-1526170375885-4d8ecf77b99f?auto=format&fit=crop&w=800&q=80&sig=gallery_view2_138",
      "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?auto=format&fit=crop&w=800&q=80&sig=gallery_view3_138"
    ],
    "countInStock": 86,
    "rating": 4.8,
    "numReviews": 230,
    "isFeatured": false,
    "description": "Brand: Logitech | Next-gen electronics gadget with high efficiency power rating."
  },
  {
    "name": "Anker Smart Tech Device 39",
    "price": 48300,
    "originalPrice": 57960,
    "category": "Electronics",
    "image": "https://images.unsplash.com/photo-1546868871-7041f2a55e12?auto=format&fit=crop&w=800&q=80&sig=prod_unique_139_electronics",
    "images": [
      "https://images.unsplash.com/photo-1546868871-7041f2a55e12?auto=format&fit=crop&w=800&q=80&sig=prod_unique_139_electronics",
      "https://images.unsplash.com/photo-1526170375885-4d8ecf77b99f?auto=format&fit=crop&w=800&q=80&sig=gallery_view1_139",
      "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?auto=format&fit=crop&w=800&q=80&sig=gallery_view2_139",
      "https://images.unsplash.com/photo-1600294037681-c80b4cb5b434?auto=format&fit=crop&w=800&q=80&sig=gallery_view3_139"
    ],
    "countInStock": 88,
    "rating": 4.9,
    "numReviews": 235,
    "isFeatured": false,
    "description": "Brand: Anker | Next-gen electronics gadget with high efficiency power rating."
  },
  {
    "name": "Sony Smart Tech Device 40",
    "price": 49500,
    "originalPrice": 59400,
    "category": "Electronics",
    "image": "https://images.unsplash.com/photo-1526170375885-4d8ecf77b99f?auto=format&fit=crop&w=800&q=80&sig=prod_unique_140_electronics",
    "images": [
      "https://images.unsplash.com/photo-1526170375885-4d8ecf77b99f?auto=format&fit=crop&w=800&q=80&sig=prod_unique_140_electronics",
      "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?auto=format&fit=crop&w=800&q=80&sig=gallery_view1_140",
      "https://images.unsplash.com/photo-1600294037681-c80b4cb5b434?auto=format&fit=crop&w=800&q=80&sig=gallery_view2_140",
      "https://images.unsplash.com/photo-1593784991095-a205069470b6?auto=format&fit=crop&w=800&q=80&sig=gallery_view3_140"
    ],
    "countInStock": 90,
    "rating": 4,
    "numReviews": 240,
    "isFeatured": true,
    "description": "Brand: Sony | Next-gen electronics gadget with high efficiency power rating."
  },
  {
    "name": "Bose Smart Tech Device 41",
    "price": 50700,
    "originalPrice": 60840,
    "category": "Electronics",
    "image": "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?auto=format&fit=crop&w=800&q=80&sig=prod_unique_141_electronics",
    "images": [
      "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?auto=format&fit=crop&w=800&q=80&sig=prod_unique_141_electronics",
      "https://images.unsplash.com/photo-1600294037681-c80b4cb5b434?auto=format&fit=crop&w=800&q=80&sig=gallery_view1_141",
      "https://images.unsplash.com/photo-1593784991095-a205069470b6?auto=format&fit=crop&w=800&q=80&sig=gallery_view2_141",
      "https://images.unsplash.com/photo-1546868871-7041f2a55e12?auto=format&fit=crop&w=800&q=80&sig=gallery_view3_141"
    ],
    "countInStock": 92,
    "rating": 4.1,
    "numReviews": 245,
    "isFeatured": false,
    "description": "Brand: Bose | Next-gen electronics gadget with high efficiency power rating."
  },
  {
    "name": "JBL Smart Tech Device 42",
    "price": 51900,
    "originalPrice": 62280,
    "category": "Electronics",
    "image": "https://images.unsplash.com/photo-1600294037681-c80b4cb5b434?auto=format&fit=crop&w=800&q=80&sig=prod_unique_142_electronics",
    "images": [
      "https://images.unsplash.com/photo-1600294037681-c80b4cb5b434?auto=format&fit=crop&w=800&q=80&sig=prod_unique_142_electronics",
      "https://images.unsplash.com/photo-1593784991095-a205069470b6?auto=format&fit=crop&w=800&q=80&sig=gallery_view1_142",
      "https://images.unsplash.com/photo-1546868871-7041f2a55e12?auto=format&fit=crop&w=800&q=80&sig=gallery_view2_142",
      "https://images.unsplash.com/photo-1526170375885-4d8ecf77b99f?auto=format&fit=crop&w=800&q=80&sig=gallery_view3_142"
    ],
    "countInStock": 94,
    "rating": 4.2,
    "numReviews": 250,
    "isFeatured": false,
    "description": "Brand: JBL | Next-gen electronics gadget with high efficiency power rating."
  },
  {
    "name": "Sennheiser Smart Tech Device 43",
    "price": 53100,
    "originalPrice": 63720,
    "category": "Electronics",
    "image": "https://images.unsplash.com/photo-1593784991095-a205069470b6?auto=format&fit=crop&w=800&q=80&sig=prod_unique_143_electronics",
    "images": [
      "https://images.unsplash.com/photo-1593784991095-a205069470b6?auto=format&fit=crop&w=800&q=80&sig=prod_unique_143_electronics",
      "https://images.unsplash.com/photo-1546868871-7041f2a55e12?auto=format&fit=crop&w=800&q=80&sig=gallery_view1_143",
      "https://images.unsplash.com/photo-1526170375885-4d8ecf77b99f?auto=format&fit=crop&w=800&q=80&sig=gallery_view2_143",
      "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?auto=format&fit=crop&w=800&q=80&sig=gallery_view3_143"
    ],
    "countInStock": 96,
    "rating": 4.3,
    "numReviews": 255,
    "isFeatured": false,
    "description": "Brand: Sennheiser | Next-gen electronics gadget with high efficiency power rating."
  },
  {
    "name": "LG Smart Tech Device 44",
    "price": 54300,
    "originalPrice": 65160,
    "category": "Electronics",
    "image": "https://images.unsplash.com/photo-1546868871-7041f2a55e12?auto=format&fit=crop&w=800&q=80&sig=prod_unique_144_electronics",
    "images": [
      "https://images.unsplash.com/photo-1546868871-7041f2a55e12?auto=format&fit=crop&w=800&q=80&sig=prod_unique_144_electronics",
      "https://images.unsplash.com/photo-1526170375885-4d8ecf77b99f?auto=format&fit=crop&w=800&q=80&sig=gallery_view1_144",
      "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?auto=format&fit=crop&w=800&q=80&sig=gallery_view2_144",
      "https://images.unsplash.com/photo-1600294037681-c80b4cb5b434?auto=format&fit=crop&w=800&q=80&sig=gallery_view3_144"
    ],
    "countInStock": 98,
    "rating": 4.4,
    "numReviews": 260,
    "isFeatured": false,
    "description": "Brand: LG | Next-gen electronics gadget with high efficiency power rating."
  },
  {
    "name": "Samsung Smart Tech Device 45",
    "price": 55500,
    "originalPrice": 66600,
    "category": "Electronics",
    "image": "https://images.unsplash.com/photo-1526170375885-4d8ecf77b99f?auto=format&fit=crop&w=800&q=80&sig=prod_unique_145_electronics",
    "images": [
      "https://images.unsplash.com/photo-1526170375885-4d8ecf77b99f?auto=format&fit=crop&w=800&q=80&sig=prod_unique_145_electronics",
      "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?auto=format&fit=crop&w=800&q=80&sig=gallery_view1_145",
      "https://images.unsplash.com/photo-1600294037681-c80b4cb5b434?auto=format&fit=crop&w=800&q=80&sig=gallery_view2_145",
      "https://images.unsplash.com/photo-1593784991095-a205069470b6?auto=format&fit=crop&w=800&q=80&sig=gallery_view3_145"
    ],
    "countInStock": 100,
    "rating": 4.5,
    "numReviews": 265,
    "isFeatured": true,
    "description": "Brand: Samsung | Next-gen electronics gadget with high efficiency power rating."
  },
  {
    "name": "Canon Smart Tech Device 46",
    "price": 56700,
    "originalPrice": 68040,
    "category": "Electronics",
    "image": "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?auto=format&fit=crop&w=800&q=80&sig=prod_unique_146_electronics",
    "images": [
      "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?auto=format&fit=crop&w=800&q=80&sig=prod_unique_146_electronics",
      "https://images.unsplash.com/photo-1600294037681-c80b4cb5b434?auto=format&fit=crop&w=800&q=80&sig=gallery_view1_146",
      "https://images.unsplash.com/photo-1593784991095-a205069470b6?auto=format&fit=crop&w=800&q=80&sig=gallery_view2_146",
      "https://images.unsplash.com/photo-1546868871-7041f2a55e12?auto=format&fit=crop&w=800&q=80&sig=gallery_view3_146"
    ],
    "countInStock": 102,
    "rating": 4.6,
    "numReviews": 270,
    "isFeatured": false,
    "description": "Brand: Canon | Next-gen electronics gadget with high efficiency power rating."
  },
  {
    "name": "Nikon Smart Tech Device 47",
    "price": 57900,
    "originalPrice": 69480,
    "category": "Electronics",
    "image": "https://images.unsplash.com/photo-1600294037681-c80b4cb5b434?auto=format&fit=crop&w=800&q=80&sig=prod_unique_147_electronics",
    "images": [
      "https://images.unsplash.com/photo-1600294037681-c80b4cb5b434?auto=format&fit=crop&w=800&q=80&sig=prod_unique_147_electronics",
      "https://images.unsplash.com/photo-1593784991095-a205069470b6?auto=format&fit=crop&w=800&q=80&sig=gallery_view1_147",
      "https://images.unsplash.com/photo-1546868871-7041f2a55e12?auto=format&fit=crop&w=800&q=80&sig=gallery_view2_147",
      "https://images.unsplash.com/photo-1526170375885-4d8ecf77b99f?auto=format&fit=crop&w=800&q=80&sig=gallery_view3_147"
    ],
    "countInStock": 104,
    "rating": 4.7,
    "numReviews": 275,
    "isFeatured": false,
    "description": "Brand: Nikon | Next-gen electronics gadget with high efficiency power rating."
  },
  {
    "name": "Logitech Smart Tech Device 48",
    "price": 59100,
    "originalPrice": 70920,
    "category": "Electronics",
    "image": "https://images.unsplash.com/photo-1593784991095-a205069470b6?auto=format&fit=crop&w=800&q=80&sig=prod_unique_148_electronics",
    "images": [
      "https://images.unsplash.com/photo-1593784991095-a205069470b6?auto=format&fit=crop&w=800&q=80&sig=prod_unique_148_electronics",
      "https://images.unsplash.com/photo-1546868871-7041f2a55e12?auto=format&fit=crop&w=800&q=80&sig=gallery_view1_148",
      "https://images.unsplash.com/photo-1526170375885-4d8ecf77b99f?auto=format&fit=crop&w=800&q=80&sig=gallery_view2_148",
      "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?auto=format&fit=crop&w=800&q=80&sig=gallery_view3_148"
    ],
    "countInStock": 106,
    "rating": 4.8,
    "numReviews": 280,
    "isFeatured": false,
    "description": "Brand: Logitech | Next-gen electronics gadget with high efficiency power rating."
  },
  {
    "name": "Anker Smart Tech Device 49",
    "price": 60300,
    "originalPrice": 72360,
    "category": "Electronics",
    "image": "https://images.unsplash.com/photo-1546868871-7041f2a55e12?auto=format&fit=crop&w=800&q=80&sig=prod_unique_149_electronics",
    "images": [
      "https://images.unsplash.com/photo-1546868871-7041f2a55e12?auto=format&fit=crop&w=800&q=80&sig=prod_unique_149_electronics",
      "https://images.unsplash.com/photo-1526170375885-4d8ecf77b99f?auto=format&fit=crop&w=800&q=80&sig=gallery_view1_149",
      "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?auto=format&fit=crop&w=800&q=80&sig=gallery_view2_149",
      "https://images.unsplash.com/photo-1600294037681-c80b4cb5b434?auto=format&fit=crop&w=800&q=80&sig=gallery_view3_149"
    ],
    "countInStock": 108,
    "rating": 4.9,
    "numReviews": 285,
    "isFeatured": false,
    "description": "Brand: Anker | Next-gen electronics gadget with high efficiency power rating."
  },
  {
    "name": "Sony Smart Tech Device 50",
    "price": 61500,
    "originalPrice": 73800,
    "category": "Electronics",
    "image": "https://images.unsplash.com/photo-1526170375885-4d8ecf77b99f?auto=format&fit=crop&w=800&q=80&sig=prod_unique_150_electronics",
    "images": [
      "https://images.unsplash.com/photo-1526170375885-4d8ecf77b99f?auto=format&fit=crop&w=800&q=80&sig=prod_unique_150_electronics",
      "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?auto=format&fit=crop&w=800&q=80&sig=gallery_view1_150",
      "https://images.unsplash.com/photo-1600294037681-c80b4cb5b434?auto=format&fit=crop&w=800&q=80&sig=gallery_view2_150",
      "https://images.unsplash.com/photo-1593784991095-a205069470b6?auto=format&fit=crop&w=800&q=80&sig=gallery_view3_150"
    ],
    "countInStock": 110,
    "rating": 4,
    "numReviews": 290,
    "isFeatured": true,
    "description": "Brand: Sony | Next-gen electronics gadget with high efficiency power rating."
  },
  {
    "name": "Bose Smart Tech Device 51",
    "price": 62700,
    "originalPrice": 75240,
    "category": "Electronics",
    "image": "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?auto=format&fit=crop&w=800&q=80&sig=prod_unique_151_electronics",
    "images": [
      "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?auto=format&fit=crop&w=800&q=80&sig=prod_unique_151_electronics",
      "https://images.unsplash.com/photo-1600294037681-c80b4cb5b434?auto=format&fit=crop&w=800&q=80&sig=gallery_view1_151",
      "https://images.unsplash.com/photo-1593784991095-a205069470b6?auto=format&fit=crop&w=800&q=80&sig=gallery_view2_151",
      "https://images.unsplash.com/photo-1546868871-7041f2a55e12?auto=format&fit=crop&w=800&q=80&sig=gallery_view3_151"
    ],
    "countInStock": 112,
    "rating": 4.1,
    "numReviews": 295,
    "isFeatured": false,
    "description": "Brand: Bose | Next-gen electronics gadget with high efficiency power rating."
  },
  {
    "name": "JBL Smart Tech Device 52",
    "price": 63900,
    "originalPrice": 76680,
    "category": "Electronics",
    "image": "https://images.unsplash.com/photo-1600294037681-c80b4cb5b434?auto=format&fit=crop&w=800&q=80&sig=prod_unique_152_electronics",
    "images": [
      "https://images.unsplash.com/photo-1600294037681-c80b4cb5b434?auto=format&fit=crop&w=800&q=80&sig=prod_unique_152_electronics",
      "https://images.unsplash.com/photo-1593784991095-a205069470b6?auto=format&fit=crop&w=800&q=80&sig=gallery_view1_152",
      "https://images.unsplash.com/photo-1546868871-7041f2a55e12?auto=format&fit=crop&w=800&q=80&sig=gallery_view2_152",
      "https://images.unsplash.com/photo-1526170375885-4d8ecf77b99f?auto=format&fit=crop&w=800&q=80&sig=gallery_view3_152"
    ],
    "countInStock": 114,
    "rating": 4.2,
    "numReviews": 300,
    "isFeatured": false,
    "description": "Brand: JBL | Next-gen electronics gadget with high efficiency power rating."
  },
  {
    "name": "Sennheiser Smart Tech Device 53",
    "price": 65100,
    "originalPrice": 78120,
    "category": "Electronics",
    "image": "https://images.unsplash.com/photo-1593784991095-a205069470b6?auto=format&fit=crop&w=800&q=80&sig=prod_unique_153_electronics",
    "images": [
      "https://images.unsplash.com/photo-1593784991095-a205069470b6?auto=format&fit=crop&w=800&q=80&sig=prod_unique_153_electronics",
      "https://images.unsplash.com/photo-1546868871-7041f2a55e12?auto=format&fit=crop&w=800&q=80&sig=gallery_view1_153",
      "https://images.unsplash.com/photo-1526170375885-4d8ecf77b99f?auto=format&fit=crop&w=800&q=80&sig=gallery_view2_153",
      "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?auto=format&fit=crop&w=800&q=80&sig=gallery_view3_153"
    ],
    "countInStock": 116,
    "rating": 4.3,
    "numReviews": 305,
    "isFeatured": false,
    "description": "Brand: Sennheiser | Next-gen electronics gadget with high efficiency power rating."
  },
  {
    "name": "LG Smart Tech Device 54",
    "price": 66300,
    "originalPrice": 79560,
    "category": "Electronics",
    "image": "https://images.unsplash.com/photo-1546868871-7041f2a55e12?auto=format&fit=crop&w=800&q=80&sig=prod_unique_154_electronics",
    "images": [
      "https://images.unsplash.com/photo-1546868871-7041f2a55e12?auto=format&fit=crop&w=800&q=80&sig=prod_unique_154_electronics",
      "https://images.unsplash.com/photo-1526170375885-4d8ecf77b99f?auto=format&fit=crop&w=800&q=80&sig=gallery_view1_154",
      "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?auto=format&fit=crop&w=800&q=80&sig=gallery_view2_154",
      "https://images.unsplash.com/photo-1600294037681-c80b4cb5b434?auto=format&fit=crop&w=800&q=80&sig=gallery_view3_154"
    ],
    "countInStock": 118,
    "rating": 4.4,
    "numReviews": 310,
    "isFeatured": false,
    "description": "Brand: LG | Next-gen electronics gadget with high efficiency power rating."
  },
  {
    "name": "Samsung Smart Tech Device 55",
    "price": 67500,
    "originalPrice": 81000,
    "category": "Electronics",
    "image": "https://images.unsplash.com/photo-1526170375885-4d8ecf77b99f?auto=format&fit=crop&w=800&q=80&sig=prod_unique_155_electronics",
    "images": [
      "https://images.unsplash.com/photo-1526170375885-4d8ecf77b99f?auto=format&fit=crop&w=800&q=80&sig=prod_unique_155_electronics",
      "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?auto=format&fit=crop&w=800&q=80&sig=gallery_view1_155",
      "https://images.unsplash.com/photo-1600294037681-c80b4cb5b434?auto=format&fit=crop&w=800&q=80&sig=gallery_view2_155",
      "https://images.unsplash.com/photo-1593784991095-a205069470b6?auto=format&fit=crop&w=800&q=80&sig=gallery_view3_155"
    ],
    "countInStock": 120,
    "rating": 4.5,
    "numReviews": 315,
    "isFeatured": true,
    "description": "Brand: Samsung | Next-gen electronics gadget with high efficiency power rating."
  },
  {
    "name": "Canon Smart Tech Device 56",
    "price": 68700,
    "originalPrice": 82440,
    "category": "Electronics",
    "image": "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?auto=format&fit=crop&w=800&q=80&sig=prod_unique_156_electronics",
    "images": [
      "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?auto=format&fit=crop&w=800&q=80&sig=prod_unique_156_electronics",
      "https://images.unsplash.com/photo-1600294037681-c80b4cb5b434?auto=format&fit=crop&w=800&q=80&sig=gallery_view1_156",
      "https://images.unsplash.com/photo-1593784991095-a205069470b6?auto=format&fit=crop&w=800&q=80&sig=gallery_view2_156",
      "https://images.unsplash.com/photo-1546868871-7041f2a55e12?auto=format&fit=crop&w=800&q=80&sig=gallery_view3_156"
    ],
    "countInStock": 122,
    "rating": 4.6,
    "numReviews": 320,
    "isFeatured": false,
    "description": "Brand: Canon | Next-gen electronics gadget with high efficiency power rating."
  },
  {
    "name": "Nikon Smart Tech Device 57",
    "price": 69900,
    "originalPrice": 83880,
    "category": "Electronics",
    "image": "https://images.unsplash.com/photo-1600294037681-c80b4cb5b434?auto=format&fit=crop&w=800&q=80&sig=prod_unique_157_electronics",
    "images": [
      "https://images.unsplash.com/photo-1600294037681-c80b4cb5b434?auto=format&fit=crop&w=800&q=80&sig=prod_unique_157_electronics",
      "https://images.unsplash.com/photo-1593784991095-a205069470b6?auto=format&fit=crop&w=800&q=80&sig=gallery_view1_157",
      "https://images.unsplash.com/photo-1546868871-7041f2a55e12?auto=format&fit=crop&w=800&q=80&sig=gallery_view2_157",
      "https://images.unsplash.com/photo-1526170375885-4d8ecf77b99f?auto=format&fit=crop&w=800&q=80&sig=gallery_view3_157"
    ],
    "countInStock": 124,
    "rating": 4.7,
    "numReviews": 325,
    "isFeatured": false,
    "description": "Brand: Nikon | Next-gen electronics gadget with high efficiency power rating."
  },
  {
    "name": "Logitech Smart Tech Device 58",
    "price": 71100,
    "originalPrice": 85320,
    "category": "Electronics",
    "image": "https://images.unsplash.com/photo-1593784991095-a205069470b6?auto=format&fit=crop&w=800&q=80&sig=prod_unique_158_electronics",
    "images": [
      "https://images.unsplash.com/photo-1593784991095-a205069470b6?auto=format&fit=crop&w=800&q=80&sig=prod_unique_158_electronics",
      "https://images.unsplash.com/photo-1546868871-7041f2a55e12?auto=format&fit=crop&w=800&q=80&sig=gallery_view1_158",
      "https://images.unsplash.com/photo-1526170375885-4d8ecf77b99f?auto=format&fit=crop&w=800&q=80&sig=gallery_view2_158",
      "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?auto=format&fit=crop&w=800&q=80&sig=gallery_view3_158"
    ],
    "countInStock": 126,
    "rating": 4.8,
    "numReviews": 330,
    "isFeatured": false,
    "description": "Brand: Logitech | Next-gen electronics gadget with high efficiency power rating."
  },
  {
    "name": "Anker Smart Tech Device 59",
    "price": 72300,
    "originalPrice": 86760,
    "category": "Electronics",
    "image": "https://images.unsplash.com/photo-1546868871-7041f2a55e12?auto=format&fit=crop&w=800&q=80&sig=prod_unique_159_electronics",
    "images": [
      "https://images.unsplash.com/photo-1546868871-7041f2a55e12?auto=format&fit=crop&w=800&q=80&sig=prod_unique_159_electronics",
      "https://images.unsplash.com/photo-1526170375885-4d8ecf77b99f?auto=format&fit=crop&w=800&q=80&sig=gallery_view1_159",
      "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?auto=format&fit=crop&w=800&q=80&sig=gallery_view2_159",
      "https://images.unsplash.com/photo-1600294037681-c80b4cb5b434?auto=format&fit=crop&w=800&q=80&sig=gallery_view3_159"
    ],
    "countInStock": 128,
    "rating": 4.9,
    "numReviews": 335,
    "isFeatured": false,
    "description": "Brand: Anker | Next-gen electronics gadget with high efficiency power rating."
  },
  {
    "name": "Sony Smart Tech Device 60",
    "price": 73500,
    "originalPrice": 88200,
    "category": "Electronics",
    "image": "https://images.unsplash.com/photo-1526170375885-4d8ecf77b99f?auto=format&fit=crop&w=800&q=80&sig=prod_unique_160_electronics",
    "images": [
      "https://images.unsplash.com/photo-1526170375885-4d8ecf77b99f?auto=format&fit=crop&w=800&q=80&sig=prod_unique_160_electronics",
      "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?auto=format&fit=crop&w=800&q=80&sig=gallery_view1_160",
      "https://images.unsplash.com/photo-1600294037681-c80b4cb5b434?auto=format&fit=crop&w=800&q=80&sig=gallery_view2_160",
      "https://images.unsplash.com/photo-1593784991095-a205069470b6?auto=format&fit=crop&w=800&q=80&sig=gallery_view3_160"
    ],
    "countInStock": 130,
    "rating": 4,
    "numReviews": 340,
    "isFeatured": true,
    "description": "Brand: Sony | Next-gen electronics gadget with high efficiency power rating."
  },
  {
    "name": "Bose Smart Tech Device 61",
    "price": 74700,
    "originalPrice": 89640,
    "category": "Electronics",
    "image": "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?auto=format&fit=crop&w=800&q=80&sig=prod_unique_161_electronics",
    "images": [
      "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?auto=format&fit=crop&w=800&q=80&sig=prod_unique_161_electronics",
      "https://images.unsplash.com/photo-1600294037681-c80b4cb5b434?auto=format&fit=crop&w=800&q=80&sig=gallery_view1_161",
      "https://images.unsplash.com/photo-1593784991095-a205069470b6?auto=format&fit=crop&w=800&q=80&sig=gallery_view2_161",
      "https://images.unsplash.com/photo-1546868871-7041f2a55e12?auto=format&fit=crop&w=800&q=80&sig=gallery_view3_161"
    ],
    "countInStock": 132,
    "rating": 4.1,
    "numReviews": 345,
    "isFeatured": false,
    "description": "Brand: Bose | Next-gen electronics gadget with high efficiency power rating."
  },
  {
    "name": "JBL Smart Tech Device 62",
    "price": 75900,
    "originalPrice": 91080,
    "category": "Electronics",
    "image": "https://images.unsplash.com/photo-1600294037681-c80b4cb5b434?auto=format&fit=crop&w=800&q=80&sig=prod_unique_162_electronics",
    "images": [
      "https://images.unsplash.com/photo-1600294037681-c80b4cb5b434?auto=format&fit=crop&w=800&q=80&sig=prod_unique_162_electronics",
      "https://images.unsplash.com/photo-1593784991095-a205069470b6?auto=format&fit=crop&w=800&q=80&sig=gallery_view1_162",
      "https://images.unsplash.com/photo-1546868871-7041f2a55e12?auto=format&fit=crop&w=800&q=80&sig=gallery_view2_162",
      "https://images.unsplash.com/photo-1526170375885-4d8ecf77b99f?auto=format&fit=crop&w=800&q=80&sig=gallery_view3_162"
    ],
    "countInStock": 134,
    "rating": 4.2,
    "numReviews": 350,
    "isFeatured": false,
    "description": "Brand: JBL | Next-gen electronics gadget with high efficiency power rating."
  },
  {
    "name": "Sennheiser Smart Tech Device 63",
    "price": 77100,
    "originalPrice": 92520,
    "category": "Electronics",
    "image": "https://images.unsplash.com/photo-1593784991095-a205069470b6?auto=format&fit=crop&w=800&q=80&sig=prod_unique_163_electronics",
    "images": [
      "https://images.unsplash.com/photo-1593784991095-a205069470b6?auto=format&fit=crop&w=800&q=80&sig=prod_unique_163_electronics",
      "https://images.unsplash.com/photo-1546868871-7041f2a55e12?auto=format&fit=crop&w=800&q=80&sig=gallery_view1_163",
      "https://images.unsplash.com/photo-1526170375885-4d8ecf77b99f?auto=format&fit=crop&w=800&q=80&sig=gallery_view2_163",
      "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?auto=format&fit=crop&w=800&q=80&sig=gallery_view3_163"
    ],
    "countInStock": 136,
    "rating": 4.3,
    "numReviews": 355,
    "isFeatured": false,
    "description": "Brand: Sennheiser | Next-gen electronics gadget with high efficiency power rating."
  },
  {
    "name": "LG Smart Tech Device 64",
    "price": 78300,
    "originalPrice": 93960,
    "category": "Electronics",
    "image": "https://images.unsplash.com/photo-1546868871-7041f2a55e12?auto=format&fit=crop&w=800&q=80&sig=prod_unique_164_electronics",
    "images": [
      "https://images.unsplash.com/photo-1546868871-7041f2a55e12?auto=format&fit=crop&w=800&q=80&sig=prod_unique_164_electronics",
      "https://images.unsplash.com/photo-1526170375885-4d8ecf77b99f?auto=format&fit=crop&w=800&q=80&sig=gallery_view1_164",
      "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?auto=format&fit=crop&w=800&q=80&sig=gallery_view2_164",
      "https://images.unsplash.com/photo-1600294037681-c80b4cb5b434?auto=format&fit=crop&w=800&q=80&sig=gallery_view3_164"
    ],
    "countInStock": 138,
    "rating": 4.4,
    "numReviews": 360,
    "isFeatured": false,
    "description": "Brand: LG | Next-gen electronics gadget with high efficiency power rating."
  },
  {
    "name": "Samsung Smart Tech Device 65",
    "price": 79500,
    "originalPrice": 95400,
    "category": "Electronics",
    "image": "https://images.unsplash.com/photo-1526170375885-4d8ecf77b99f?auto=format&fit=crop&w=800&q=80&sig=prod_unique_165_electronics",
    "images": [
      "https://images.unsplash.com/photo-1526170375885-4d8ecf77b99f?auto=format&fit=crop&w=800&q=80&sig=prod_unique_165_electronics",
      "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?auto=format&fit=crop&w=800&q=80&sig=gallery_view1_165",
      "https://images.unsplash.com/photo-1600294037681-c80b4cb5b434?auto=format&fit=crop&w=800&q=80&sig=gallery_view2_165",
      "https://images.unsplash.com/photo-1593784991095-a205069470b6?auto=format&fit=crop&w=800&q=80&sig=gallery_view3_165"
    ],
    "countInStock": 140,
    "rating": 4.5,
    "numReviews": 365,
    "isFeatured": true,
    "description": "Brand: Samsung | Next-gen electronics gadget with high efficiency power rating."
  },
  {
    "name": "Belkin Premium Accessories Model 11",
    "price": 500,
    "originalPrice": 600,
    "category": "Accessories",
    "image": "https://images.unsplash.com/photo-1602143407151-7111542de6e8?auto=format&fit=crop&w=800&q=80&sig=prod_unique_166_accessories",
    "images": [
      "https://images.unsplash.com/photo-1602143407151-7111542de6e8?auto=format&fit=crop&w=800&q=80&sig=prod_unique_166_accessories",
      "https://images.unsplash.com/photo-1583394838336-acd977736f90?auto=format&fit=crop&w=800&q=80&sig=gallery_view1_166",
      "https://images.unsplash.com/photo-1616440347437-b1c73416efc2?auto=format&fit=crop&w=800&q=80&sig=gallery_view2_166",
      "https://images.unsplash.com/photo-1602143407151-7111542de6e8?auto=format&fit=crop&w=800&q=80&sig=gallery_view3_166"
    ],
    "countInStock": 12,
    "rating": 4.1,
    "numReviews": 45,
    "isFeatured": false,
    "description": "Brand: Belkin | High quality accessories product designed for durability and daily performance."
  },
  {
    "name": "Spigen Premium Accessories Model 12",
    "price": 500,
    "originalPrice": 600,
    "category": "Accessories",
    "image": "https://images.unsplash.com/photo-1583394838336-acd977736f90?auto=format&fit=crop&w=800&q=80&sig=prod_unique_167_accessories",
    "images": [
      "https://images.unsplash.com/photo-1583394838336-acd977736f90?auto=format&fit=crop&w=800&q=80&sig=prod_unique_167_accessories",
      "https://images.unsplash.com/photo-1616440347437-b1c73416efc2?auto=format&fit=crop&w=800&q=80&sig=gallery_view1_167",
      "https://images.unsplash.com/photo-1602143407151-7111542de6e8?auto=format&fit=crop&w=800&q=80&sig=gallery_view2_167",
      "https://images.unsplash.com/photo-1583394838336-acd977736f90?auto=format&fit=crop&w=800&q=80&sig=gallery_view3_167"
    ],
    "countInStock": 14,
    "rating": 4.2,
    "numReviews": 50,
    "isFeatured": false,
    "description": "Brand: Spigen | High quality accessories product designed for durability and daily performance."
  },
  {
    "name": "UGREEN Premium Accessories Model 13",
    "price": 500,
    "originalPrice": 600,
    "category": "Accessories",
    "image": "https://images.unsplash.com/photo-1616440347437-b1c73416efc2?auto=format&fit=crop&w=800&q=80&sig=prod_unique_168_accessories",
    "images": [
      "https://images.unsplash.com/photo-1616440347437-b1c73416efc2?auto=format&fit=crop&w=800&q=80&sig=prod_unique_168_accessories",
      "https://images.unsplash.com/photo-1602143407151-7111542de6e8?auto=format&fit=crop&w=800&q=80&sig=gallery_view1_168",
      "https://images.unsplash.com/photo-1583394838336-acd977736f90?auto=format&fit=crop&w=800&q=80&sig=gallery_view2_168",
      "https://images.unsplash.com/photo-1616440347437-b1c73416efc2?auto=format&fit=crop&w=800&q=80&sig=gallery_view3_168"
    ],
    "countInStock": 16,
    "rating": 4.3,
    "numReviews": 55,
    "isFeatured": false,
    "description": "Brand: UGREEN | High quality accessories product designed for durability and daily performance."
  },
  {
    "name": "SanDisk Premium Accessories Model 14",
    "price": 500,
    "originalPrice": 600,
    "category": "Accessories",
    "image": "https://images.unsplash.com/photo-1602143407151-7111542de6e8?auto=format&fit=crop&w=800&q=80&sig=prod_unique_169_accessories",
    "images": [
      "https://images.unsplash.com/photo-1602143407151-7111542de6e8?auto=format&fit=crop&w=800&q=80&sig=prod_unique_169_accessories",
      "https://images.unsplash.com/photo-1583394838336-acd977736f90?auto=format&fit=crop&w=800&q=80&sig=gallery_view1_169",
      "https://images.unsplash.com/photo-1616440347437-b1c73416efc2?auto=format&fit=crop&w=800&q=80&sig=gallery_view2_169",
      "https://images.unsplash.com/photo-1602143407151-7111542de6e8?auto=format&fit=crop&w=800&q=80&sig=gallery_view3_169"
    ],
    "countInStock": 18,
    "rating": 4.4,
    "numReviews": 60,
    "isFeatured": false,
    "description": "Brand: SanDisk | High quality accessories product designed for durability and daily performance."
  },
  {
    "name": "Samsung Premium Accessories Model 15",
    "price": 500,
    "originalPrice": 600,
    "category": "Accessories",
    "image": "https://images.unsplash.com/photo-1583394838336-acd977736f90?auto=format&fit=crop&w=800&q=80&sig=prod_unique_170_accessories",
    "images": [
      "https://images.unsplash.com/photo-1583394838336-acd977736f90?auto=format&fit=crop&w=800&q=80&sig=prod_unique_170_accessories",
      "https://images.unsplash.com/photo-1616440347437-b1c73416efc2?auto=format&fit=crop&w=800&q=80&sig=gallery_view1_170",
      "https://images.unsplash.com/photo-1602143407151-7111542de6e8?auto=format&fit=crop&w=800&q=80&sig=gallery_view2_170",
      "https://images.unsplash.com/photo-1583394838336-acd977736f90?auto=format&fit=crop&w=800&q=80&sig=gallery_view3_170"
    ],
    "countInStock": 20,
    "rating": 4.5,
    "numReviews": 65,
    "isFeatured": true,
    "description": "Brand: Samsung | High quality accessories product designed for durability and daily performance."
  },
  {
    "name": "Apple Premium Accessories Model 16",
    "price": 500,
    "originalPrice": 600,
    "category": "Accessories",
    "image": "https://images.unsplash.com/photo-1616440347437-b1c73416efc2?auto=format&fit=crop&w=800&q=80&sig=prod_unique_171_accessories",
    "images": [
      "https://images.unsplash.com/photo-1616440347437-b1c73416efc2?auto=format&fit=crop&w=800&q=80&sig=prod_unique_171_accessories",
      "https://images.unsplash.com/photo-1602143407151-7111542de6e8?auto=format&fit=crop&w=800&q=80&sig=gallery_view1_171",
      "https://images.unsplash.com/photo-1583394838336-acd977736f90?auto=format&fit=crop&w=800&q=80&sig=gallery_view2_171",
      "https://images.unsplash.com/photo-1616440347437-b1c73416efc2?auto=format&fit=crop&w=800&q=80&sig=gallery_view3_171"
    ],
    "countInStock": 22,
    "rating": 4.6,
    "numReviews": 70,
    "isFeatured": false,
    "description": "Brand: Apple | High quality accessories product designed for durability and daily performance."
  },
  {
    "name": "Baseus Premium Accessories Model 17",
    "price": 500,
    "originalPrice": 600,
    "category": "Accessories",
    "image": "https://images.unsplash.com/photo-1602143407151-7111542de6e8?auto=format&fit=crop&w=800&q=80&sig=prod_unique_172_accessories",
    "images": [
      "https://images.unsplash.com/photo-1602143407151-7111542de6e8?auto=format&fit=crop&w=800&q=80&sig=prod_unique_172_accessories",
      "https://images.unsplash.com/photo-1583394838336-acd977736f90?auto=format&fit=crop&w=800&q=80&sig=gallery_view1_172",
      "https://images.unsplash.com/photo-1616440347437-b1c73416efc2?auto=format&fit=crop&w=800&q=80&sig=gallery_view2_172",
      "https://images.unsplash.com/photo-1602143407151-7111542de6e8?auto=format&fit=crop&w=800&q=80&sig=gallery_view3_172"
    ],
    "countInStock": 24,
    "rating": 4.7,
    "numReviews": 75,
    "isFeatured": false,
    "description": "Brand: Baseus | High quality accessories product designed for durability and daily performance."
  },
  {
    "name": "Anker Premium Accessories Model 18",
    "price": 500,
    "originalPrice": 600,
    "category": "Accessories",
    "image": "https://images.unsplash.com/photo-1583394838336-acd977736f90?auto=format&fit=crop&w=800&q=80&sig=prod_unique_173_accessories",
    "images": [
      "https://images.unsplash.com/photo-1583394838336-acd977736f90?auto=format&fit=crop&w=800&q=80&sig=prod_unique_173_accessories",
      "https://images.unsplash.com/photo-1616440347437-b1c73416efc2?auto=format&fit=crop&w=800&q=80&sig=gallery_view1_173",
      "https://images.unsplash.com/photo-1602143407151-7111542de6e8?auto=format&fit=crop&w=800&q=80&sig=gallery_view2_173",
      "https://images.unsplash.com/photo-1583394838336-acd977736f90?auto=format&fit=crop&w=800&q=80&sig=gallery_view3_173"
    ],
    "countInStock": 26,
    "rating": 4.8,
    "numReviews": 80,
    "isFeatured": false,
    "description": "Brand: Anker | High quality accessories product designed for durability and daily performance."
  },
  {
    "name": "Belkin Premium Accessories Model 19",
    "price": 500,
    "originalPrice": 600,
    "category": "Accessories",
    "image": "https://images.unsplash.com/photo-1616440347437-b1c73416efc2?auto=format&fit=crop&w=800&q=80&sig=prod_unique_174_accessories",
    "images": [
      "https://images.unsplash.com/photo-1616440347437-b1c73416efc2?auto=format&fit=crop&w=800&q=80&sig=prod_unique_174_accessories",
      "https://images.unsplash.com/photo-1602143407151-7111542de6e8?auto=format&fit=crop&w=800&q=80&sig=gallery_view1_174",
      "https://images.unsplash.com/photo-1583394838336-acd977736f90?auto=format&fit=crop&w=800&q=80&sig=gallery_view2_174",
      "https://images.unsplash.com/photo-1616440347437-b1c73416efc2?auto=format&fit=crop&w=800&q=80&sig=gallery_view3_174"
    ],
    "countInStock": 28,
    "rating": 4.9,
    "numReviews": 85,
    "isFeatured": false,
    "description": "Brand: Belkin | High quality accessories product designed for durability and daily performance."
  },
  {
    "name": "Spigen Premium Accessories Model 20",
    "price": 500,
    "originalPrice": 600,
    "category": "Accessories",
    "image": "https://images.unsplash.com/photo-1602143407151-7111542de6e8?auto=format&fit=crop&w=800&q=80&sig=prod_unique_175_accessories",
    "images": [
      "https://images.unsplash.com/photo-1602143407151-7111542de6e8?auto=format&fit=crop&w=800&q=80&sig=prod_unique_175_accessories",
      "https://images.unsplash.com/photo-1583394838336-acd977736f90?auto=format&fit=crop&w=800&q=80&sig=gallery_view1_175",
      "https://images.unsplash.com/photo-1616440347437-b1c73416efc2?auto=format&fit=crop&w=800&q=80&sig=gallery_view2_175",
      "https://images.unsplash.com/photo-1602143407151-7111542de6e8?auto=format&fit=crop&w=800&q=80&sig=gallery_view3_175"
    ],
    "countInStock": 30,
    "rating": 4,
    "numReviews": 90,
    "isFeatured": true,
    "description": "Brand: Spigen | High quality accessories product designed for durability and daily performance."
  },
  {
    "name": "UGREEN Premium Accessories Model 21",
    "price": 500,
    "originalPrice": 600,
    "category": "Accessories",
    "image": "https://images.unsplash.com/photo-1583394838336-acd977736f90?auto=format&fit=crop&w=800&q=80&sig=prod_unique_176_accessories",
    "images": [
      "https://images.unsplash.com/photo-1583394838336-acd977736f90?auto=format&fit=crop&w=800&q=80&sig=prod_unique_176_accessories",
      "https://images.unsplash.com/photo-1616440347437-b1c73416efc2?auto=format&fit=crop&w=800&q=80&sig=gallery_view1_176",
      "https://images.unsplash.com/photo-1602143407151-7111542de6e8?auto=format&fit=crop&w=800&q=80&sig=gallery_view2_176",
      "https://images.unsplash.com/photo-1583394838336-acd977736f90?auto=format&fit=crop&w=800&q=80&sig=gallery_view3_176"
    ],
    "countInStock": 32,
    "rating": 4.1,
    "numReviews": 95,
    "isFeatured": false,
    "description": "Brand: UGREEN | High quality accessories product designed for durability and daily performance."
  },
  {
    "name": "SanDisk Premium Accessories Model 22",
    "price": 500,
    "originalPrice": 600,
    "category": "Accessories",
    "image": "https://images.unsplash.com/photo-1616440347437-b1c73416efc2?auto=format&fit=crop&w=800&q=80&sig=prod_unique_177_accessories",
    "images": [
      "https://images.unsplash.com/photo-1616440347437-b1c73416efc2?auto=format&fit=crop&w=800&q=80&sig=prod_unique_177_accessories",
      "https://images.unsplash.com/photo-1602143407151-7111542de6e8?auto=format&fit=crop&w=800&q=80&sig=gallery_view1_177",
      "https://images.unsplash.com/photo-1583394838336-acd977736f90?auto=format&fit=crop&w=800&q=80&sig=gallery_view2_177",
      "https://images.unsplash.com/photo-1616440347437-b1c73416efc2?auto=format&fit=crop&w=800&q=80&sig=gallery_view3_177"
    ],
    "countInStock": 34,
    "rating": 4.2,
    "numReviews": 100,
    "isFeatured": false,
    "description": "Brand: SanDisk | High quality accessories product designed for durability and daily performance."
  },
  {
    "name": "Samsung Premium Accessories Model 23",
    "price": 500,
    "originalPrice": 600,
    "category": "Accessories",
    "image": "https://images.unsplash.com/photo-1602143407151-7111542de6e8?auto=format&fit=crop&w=800&q=80&sig=prod_unique_178_accessories",
    "images": [
      "https://images.unsplash.com/photo-1602143407151-7111542de6e8?auto=format&fit=crop&w=800&q=80&sig=prod_unique_178_accessories",
      "https://images.unsplash.com/photo-1583394838336-acd977736f90?auto=format&fit=crop&w=800&q=80&sig=gallery_view1_178",
      "https://images.unsplash.com/photo-1616440347437-b1c73416efc2?auto=format&fit=crop&w=800&q=80&sig=gallery_view2_178",
      "https://images.unsplash.com/photo-1602143407151-7111542de6e8?auto=format&fit=crop&w=800&q=80&sig=gallery_view3_178"
    ],
    "countInStock": 36,
    "rating": 4.3,
    "numReviews": 105,
    "isFeatured": false,
    "description": "Brand: Samsung | High quality accessories product designed for durability and daily performance."
  },
  {
    "name": "Apple Premium Accessories Model 24",
    "price": 500,
    "originalPrice": 600,
    "category": "Accessories",
    "image": "https://images.unsplash.com/photo-1583394838336-acd977736f90?auto=format&fit=crop&w=800&q=80&sig=prod_unique_179_accessories",
    "images": [
      "https://images.unsplash.com/photo-1583394838336-acd977736f90?auto=format&fit=crop&w=800&q=80&sig=prod_unique_179_accessories",
      "https://images.unsplash.com/photo-1616440347437-b1c73416efc2?auto=format&fit=crop&w=800&q=80&sig=gallery_view1_179",
      "https://images.unsplash.com/photo-1602143407151-7111542de6e8?auto=format&fit=crop&w=800&q=80&sig=gallery_view2_179",
      "https://images.unsplash.com/photo-1583394838336-acd977736f90?auto=format&fit=crop&w=800&q=80&sig=gallery_view3_179"
    ],
    "countInStock": 38,
    "rating": 4.4,
    "numReviews": 110,
    "isFeatured": false,
    "description": "Brand: Apple | High quality accessories product designed for durability and daily performance."
  },
  {
    "name": "Baseus Premium Accessories Model 25",
    "price": 500,
    "originalPrice": 600,
    "category": "Accessories",
    "image": "https://images.unsplash.com/photo-1616440347437-b1c73416efc2?auto=format&fit=crop&w=800&q=80&sig=prod_unique_180_accessories",
    "images": [
      "https://images.unsplash.com/photo-1616440347437-b1c73416efc2?auto=format&fit=crop&w=800&q=80&sig=prod_unique_180_accessories",
      "https://images.unsplash.com/photo-1602143407151-7111542de6e8?auto=format&fit=crop&w=800&q=80&sig=gallery_view1_180",
      "https://images.unsplash.com/photo-1583394838336-acd977736f90?auto=format&fit=crop&w=800&q=80&sig=gallery_view2_180",
      "https://images.unsplash.com/photo-1616440347437-b1c73416efc2?auto=format&fit=crop&w=800&q=80&sig=gallery_view3_180"
    ],
    "countInStock": 40,
    "rating": 4.5,
    "numReviews": 115,
    "isFeatured": true,
    "description": "Brand: Baseus | High quality accessories product designed for durability and daily performance."
  },
  {
    "name": "Anker Premium Accessories Model 26",
    "price": 500,
    "originalPrice": 600,
    "category": "Accessories",
    "image": "https://images.unsplash.com/photo-1602143407151-7111542de6e8?auto=format&fit=crop&w=800&q=80&sig=prod_unique_181_accessories",
    "images": [
      "https://images.unsplash.com/photo-1602143407151-7111542de6e8?auto=format&fit=crop&w=800&q=80&sig=prod_unique_181_accessories",
      "https://images.unsplash.com/photo-1583394838336-acd977736f90?auto=format&fit=crop&w=800&q=80&sig=gallery_view1_181",
      "https://images.unsplash.com/photo-1616440347437-b1c73416efc2?auto=format&fit=crop&w=800&q=80&sig=gallery_view2_181",
      "https://images.unsplash.com/photo-1602143407151-7111542de6e8?auto=format&fit=crop&w=800&q=80&sig=gallery_view3_181"
    ],
    "countInStock": 42,
    "rating": 4.6,
    "numReviews": 120,
    "isFeatured": false,
    "description": "Brand: Anker | High quality accessories product designed for durability and daily performance."
  },
  {
    "name": "Belkin Premium Accessories Model 27",
    "price": 500,
    "originalPrice": 600,
    "category": "Accessories",
    "image": "https://images.unsplash.com/photo-1583394838336-acd977736f90?auto=format&fit=crop&w=800&q=80&sig=prod_unique_182_accessories",
    "images": [
      "https://images.unsplash.com/photo-1583394838336-acd977736f90?auto=format&fit=crop&w=800&q=80&sig=prod_unique_182_accessories",
      "https://images.unsplash.com/photo-1616440347437-b1c73416efc2?auto=format&fit=crop&w=800&q=80&sig=gallery_view1_182",
      "https://images.unsplash.com/photo-1602143407151-7111542de6e8?auto=format&fit=crop&w=800&q=80&sig=gallery_view2_182",
      "https://images.unsplash.com/photo-1583394838336-acd977736f90?auto=format&fit=crop&w=800&q=80&sig=gallery_view3_182"
    ],
    "countInStock": 44,
    "rating": 4.7,
    "numReviews": 125,
    "isFeatured": false,
    "description": "Brand: Belkin | High quality accessories product designed for durability and daily performance."
  },
  {
    "name": "Spigen Premium Accessories Model 28",
    "price": 500,
    "originalPrice": 600,
    "category": "Accessories",
    "image": "https://images.unsplash.com/photo-1616440347437-b1c73416efc2?auto=format&fit=crop&w=800&q=80&sig=prod_unique_183_accessories",
    "images": [
      "https://images.unsplash.com/photo-1616440347437-b1c73416efc2?auto=format&fit=crop&w=800&q=80&sig=prod_unique_183_accessories",
      "https://images.unsplash.com/photo-1602143407151-7111542de6e8?auto=format&fit=crop&w=800&q=80&sig=gallery_view1_183",
      "https://images.unsplash.com/photo-1583394838336-acd977736f90?auto=format&fit=crop&w=800&q=80&sig=gallery_view2_183",
      "https://images.unsplash.com/photo-1616440347437-b1c73416efc2?auto=format&fit=crop&w=800&q=80&sig=gallery_view3_183"
    ],
    "countInStock": 46,
    "rating": 4.8,
    "numReviews": 130,
    "isFeatured": false,
    "description": "Brand: Spigen | High quality accessories product designed for durability and daily performance."
  },
  {
    "name": "UGREEN Premium Accessories Model 29",
    "price": 500,
    "originalPrice": 600,
    "category": "Accessories",
    "image": "https://images.unsplash.com/photo-1602143407151-7111542de6e8?auto=format&fit=crop&w=800&q=80&sig=prod_unique_184_accessories",
    "images": [
      "https://images.unsplash.com/photo-1602143407151-7111542de6e8?auto=format&fit=crop&w=800&q=80&sig=prod_unique_184_accessories",
      "https://images.unsplash.com/photo-1583394838336-acd977736f90?auto=format&fit=crop&w=800&q=80&sig=gallery_view1_184",
      "https://images.unsplash.com/photo-1616440347437-b1c73416efc2?auto=format&fit=crop&w=800&q=80&sig=gallery_view2_184",
      "https://images.unsplash.com/photo-1602143407151-7111542de6e8?auto=format&fit=crop&w=800&q=80&sig=gallery_view3_184"
    ],
    "countInStock": 48,
    "rating": 4.9,
    "numReviews": 135,
    "isFeatured": false,
    "description": "Brand: UGREEN | High quality accessories product designed for durability and daily performance."
  },
  {
    "name": "SanDisk Premium Accessories Model 30",
    "price": 500,
    "originalPrice": 600,
    "category": "Accessories",
    "image": "https://images.unsplash.com/photo-1583394838336-acd977736f90?auto=format&fit=crop&w=800&q=80&sig=prod_unique_185_accessories",
    "images": [
      "https://images.unsplash.com/photo-1583394838336-acd977736f90?auto=format&fit=crop&w=800&q=80&sig=prod_unique_185_accessories",
      "https://images.unsplash.com/photo-1616440347437-b1c73416efc2?auto=format&fit=crop&w=800&q=80&sig=gallery_view1_185",
      "https://images.unsplash.com/photo-1602143407151-7111542de6e8?auto=format&fit=crop&w=800&q=80&sig=gallery_view2_185",
      "https://images.unsplash.com/photo-1583394838336-acd977736f90?auto=format&fit=crop&w=800&q=80&sig=gallery_view3_185"
    ],
    "countInStock": 50,
    "rating": 4,
    "numReviews": 140,
    "isFeatured": true,
    "description": "Brand: SanDisk | High quality accessories product designed for durability and daily performance."
  },
  {
    "name": "Samsung Premium Accessories Model 31",
    "price": 500,
    "originalPrice": 600,
    "category": "Accessories",
    "image": "https://images.unsplash.com/photo-1616440347437-b1c73416efc2?auto=format&fit=crop&w=800&q=80&sig=prod_unique_186_accessories",
    "images": [
      "https://images.unsplash.com/photo-1616440347437-b1c73416efc2?auto=format&fit=crop&w=800&q=80&sig=prod_unique_186_accessories",
      "https://images.unsplash.com/photo-1602143407151-7111542de6e8?auto=format&fit=crop&w=800&q=80&sig=gallery_view1_186",
      "https://images.unsplash.com/photo-1583394838336-acd977736f90?auto=format&fit=crop&w=800&q=80&sig=gallery_view2_186",
      "https://images.unsplash.com/photo-1616440347437-b1c73416efc2?auto=format&fit=crop&w=800&q=80&sig=gallery_view3_186"
    ],
    "countInStock": 52,
    "rating": 4.1,
    "numReviews": 145,
    "isFeatured": false,
    "description": "Brand: Samsung | High quality accessories product designed for durability and daily performance."
  },
  {
    "name": "Apple Premium Accessories Model 32",
    "price": 500,
    "originalPrice": 600,
    "category": "Accessories",
    "image": "https://images.unsplash.com/photo-1602143407151-7111542de6e8?auto=format&fit=crop&w=800&q=80&sig=prod_unique_187_accessories",
    "images": [
      "https://images.unsplash.com/photo-1602143407151-7111542de6e8?auto=format&fit=crop&w=800&q=80&sig=prod_unique_187_accessories",
      "https://images.unsplash.com/photo-1583394838336-acd977736f90?auto=format&fit=crop&w=800&q=80&sig=gallery_view1_187",
      "https://images.unsplash.com/photo-1616440347437-b1c73416efc2?auto=format&fit=crop&w=800&q=80&sig=gallery_view2_187",
      "https://images.unsplash.com/photo-1602143407151-7111542de6e8?auto=format&fit=crop&w=800&q=80&sig=gallery_view3_187"
    ],
    "countInStock": 54,
    "rating": 4.2,
    "numReviews": 150,
    "isFeatured": false,
    "description": "Brand: Apple | High quality accessories product designed for durability and daily performance."
  },
  {
    "name": "Baseus Premium Accessories Model 33",
    "price": 500,
    "originalPrice": 600,
    "category": "Accessories",
    "image": "https://images.unsplash.com/photo-1583394838336-acd977736f90?auto=format&fit=crop&w=800&q=80&sig=prod_unique_188_accessories",
    "images": [
      "https://images.unsplash.com/photo-1583394838336-acd977736f90?auto=format&fit=crop&w=800&q=80&sig=prod_unique_188_accessories",
      "https://images.unsplash.com/photo-1616440347437-b1c73416efc2?auto=format&fit=crop&w=800&q=80&sig=gallery_view1_188",
      "https://images.unsplash.com/photo-1602143407151-7111542de6e8?auto=format&fit=crop&w=800&q=80&sig=gallery_view2_188",
      "https://images.unsplash.com/photo-1583394838336-acd977736f90?auto=format&fit=crop&w=800&q=80&sig=gallery_view3_188"
    ],
    "countInStock": 56,
    "rating": 4.3,
    "numReviews": 155,
    "isFeatured": false,
    "description": "Brand: Baseus | High quality accessories product designed for durability and daily performance."
  },
  {
    "name": "Anker Premium Accessories Model 34",
    "price": 500,
    "originalPrice": 600,
    "category": "Accessories",
    "image": "https://images.unsplash.com/photo-1616440347437-b1c73416efc2?auto=format&fit=crop&w=800&q=80&sig=prod_unique_189_accessories",
    "images": [
      "https://images.unsplash.com/photo-1616440347437-b1c73416efc2?auto=format&fit=crop&w=800&q=80&sig=prod_unique_189_accessories",
      "https://images.unsplash.com/photo-1602143407151-7111542de6e8?auto=format&fit=crop&w=800&q=80&sig=gallery_view1_189",
      "https://images.unsplash.com/photo-1583394838336-acd977736f90?auto=format&fit=crop&w=800&q=80&sig=gallery_view2_189",
      "https://images.unsplash.com/photo-1616440347437-b1c73416efc2?auto=format&fit=crop&w=800&q=80&sig=gallery_view3_189"
    ],
    "countInStock": 58,
    "rating": 4.4,
    "numReviews": 160,
    "isFeatured": false,
    "description": "Brand: Anker | High quality accessories product designed for durability and daily performance."
  },
  {
    "name": "Belkin Premium Accessories Model 35",
    "price": 500,
    "originalPrice": 600,
    "category": "Accessories",
    "image": "https://images.unsplash.com/photo-1602143407151-7111542de6e8?auto=format&fit=crop&w=800&q=80&sig=prod_unique_190_accessories",
    "images": [
      "https://images.unsplash.com/photo-1602143407151-7111542de6e8?auto=format&fit=crop&w=800&q=80&sig=prod_unique_190_accessories",
      "https://images.unsplash.com/photo-1583394838336-acd977736f90?auto=format&fit=crop&w=800&q=80&sig=gallery_view1_190",
      "https://images.unsplash.com/photo-1616440347437-b1c73416efc2?auto=format&fit=crop&w=800&q=80&sig=gallery_view2_190",
      "https://images.unsplash.com/photo-1602143407151-7111542de6e8?auto=format&fit=crop&w=800&q=80&sig=gallery_view3_190"
    ],
    "countInStock": 60,
    "rating": 4.5,
    "numReviews": 165,
    "isFeatured": true,
    "description": "Brand: Belkin | High quality accessories product designed for durability and daily performance."
  },
  {
    "name": "Spigen Premium Accessories Model 36",
    "price": 500,
    "originalPrice": 600,
    "category": "Accessories",
    "image": "https://images.unsplash.com/photo-1583394838336-acd977736f90?auto=format&fit=crop&w=800&q=80&sig=prod_unique_191_accessories",
    "images": [
      "https://images.unsplash.com/photo-1583394838336-acd977736f90?auto=format&fit=crop&w=800&q=80&sig=prod_unique_191_accessories",
      "https://images.unsplash.com/photo-1616440347437-b1c73416efc2?auto=format&fit=crop&w=800&q=80&sig=gallery_view1_191",
      "https://images.unsplash.com/photo-1602143407151-7111542de6e8?auto=format&fit=crop&w=800&q=80&sig=gallery_view2_191",
      "https://images.unsplash.com/photo-1583394838336-acd977736f90?auto=format&fit=crop&w=800&q=80&sig=gallery_view3_191"
    ],
    "countInStock": 62,
    "rating": 4.6,
    "numReviews": 170,
    "isFeatured": false,
    "description": "Brand: Spigen | High quality accessories product designed for durability and daily performance."
  },
  {
    "name": "UGREEN Premium Accessories Model 37",
    "price": 500,
    "originalPrice": 600,
    "category": "Accessories",
    "image": "https://images.unsplash.com/photo-1616440347437-b1c73416efc2?auto=format&fit=crop&w=800&q=80&sig=prod_unique_192_accessories",
    "images": [
      "https://images.unsplash.com/photo-1616440347437-b1c73416efc2?auto=format&fit=crop&w=800&q=80&sig=prod_unique_192_accessories",
      "https://images.unsplash.com/photo-1602143407151-7111542de6e8?auto=format&fit=crop&w=800&q=80&sig=gallery_view1_192",
      "https://images.unsplash.com/photo-1583394838336-acd977736f90?auto=format&fit=crop&w=800&q=80&sig=gallery_view2_192",
      "https://images.unsplash.com/photo-1616440347437-b1c73416efc2?auto=format&fit=crop&w=800&q=80&sig=gallery_view3_192"
    ],
    "countInStock": 64,
    "rating": 4.7,
    "numReviews": 175,
    "isFeatured": false,
    "description": "Brand: UGREEN | High quality accessories product designed for durability and daily performance."
  },
  {
    "name": "SanDisk Premium Accessories Model 38",
    "price": 500,
    "originalPrice": 600,
    "category": "Accessories",
    "image": "https://images.unsplash.com/photo-1602143407151-7111542de6e8?auto=format&fit=crop&w=800&q=80&sig=prod_unique_193_accessories",
    "images": [
      "https://images.unsplash.com/photo-1602143407151-7111542de6e8?auto=format&fit=crop&w=800&q=80&sig=prod_unique_193_accessories",
      "https://images.unsplash.com/photo-1583394838336-acd977736f90?auto=format&fit=crop&w=800&q=80&sig=gallery_view1_193",
      "https://images.unsplash.com/photo-1616440347437-b1c73416efc2?auto=format&fit=crop&w=800&q=80&sig=gallery_view2_193",
      "https://images.unsplash.com/photo-1602143407151-7111542de6e8?auto=format&fit=crop&w=800&q=80&sig=gallery_view3_193"
    ],
    "countInStock": 66,
    "rating": 4.8,
    "numReviews": 180,
    "isFeatured": false,
    "description": "Brand: SanDisk | High quality accessories product designed for durability and daily performance."
  },
  {
    "name": "Samsung Premium Accessories Model 39",
    "price": 500,
    "originalPrice": 600,
    "category": "Accessories",
    "image": "https://images.unsplash.com/photo-1583394838336-acd977736f90?auto=format&fit=crop&w=800&q=80&sig=prod_unique_194_accessories",
    "images": [
      "https://images.unsplash.com/photo-1583394838336-acd977736f90?auto=format&fit=crop&w=800&q=80&sig=prod_unique_194_accessories",
      "https://images.unsplash.com/photo-1616440347437-b1c73416efc2?auto=format&fit=crop&w=800&q=80&sig=gallery_view1_194",
      "https://images.unsplash.com/photo-1602143407151-7111542de6e8?auto=format&fit=crop&w=800&q=80&sig=gallery_view2_194",
      "https://images.unsplash.com/photo-1583394838336-acd977736f90?auto=format&fit=crop&w=800&q=80&sig=gallery_view3_194"
    ],
    "countInStock": 68,
    "rating": 4.9,
    "numReviews": 185,
    "isFeatured": false,
    "description": "Brand: Samsung | High quality accessories product designed for durability and daily performance."
  },
  {
    "name": "Apple Premium Accessories Model 40",
    "price": 500,
    "originalPrice": 600,
    "category": "Accessories",
    "image": "https://images.unsplash.com/photo-1616440347437-b1c73416efc2?auto=format&fit=crop&w=800&q=80&sig=prod_unique_195_accessories",
    "images": [
      "https://images.unsplash.com/photo-1616440347437-b1c73416efc2?auto=format&fit=crop&w=800&q=80&sig=prod_unique_195_accessories",
      "https://images.unsplash.com/photo-1602143407151-7111542de6e8?auto=format&fit=crop&w=800&q=80&sig=gallery_view1_195",
      "https://images.unsplash.com/photo-1583394838336-acd977736f90?auto=format&fit=crop&w=800&q=80&sig=gallery_view2_195",
      "https://images.unsplash.com/photo-1616440347437-b1c73416efc2?auto=format&fit=crop&w=800&q=80&sig=gallery_view3_195"
    ],
    "countInStock": 70,
    "rating": 4,
    "numReviews": 190,
    "isFeatured": true,
    "description": "Brand: Apple | High quality accessories product designed for durability and daily performance."
  },
  {
    "name": "Baseus Premium Accessories Model 41",
    "price": 500,
    "originalPrice": 600,
    "category": "Accessories",
    "image": "https://images.unsplash.com/photo-1602143407151-7111542de6e8?auto=format&fit=crop&w=800&q=80&sig=prod_unique_196_accessories",
    "images": [
      "https://images.unsplash.com/photo-1602143407151-7111542de6e8?auto=format&fit=crop&w=800&q=80&sig=prod_unique_196_accessories",
      "https://images.unsplash.com/photo-1583394838336-acd977736f90?auto=format&fit=crop&w=800&q=80&sig=gallery_view1_196",
      "https://images.unsplash.com/photo-1616440347437-b1c73416efc2?auto=format&fit=crop&w=800&q=80&sig=gallery_view2_196",
      "https://images.unsplash.com/photo-1602143407151-7111542de6e8?auto=format&fit=crop&w=800&q=80&sig=gallery_view3_196"
    ],
    "countInStock": 72,
    "rating": 4.1,
    "numReviews": 195,
    "isFeatured": false,
    "description": "Brand: Baseus | High quality accessories product designed for durability and daily performance."
  },
  {
    "name": "Anker Premium Accessories Model 42",
    "price": 500,
    "originalPrice": 600,
    "category": "Accessories",
    "image": "https://images.unsplash.com/photo-1583394838336-acd977736f90?auto=format&fit=crop&w=800&q=80&sig=prod_unique_197_accessories",
    "images": [
      "https://images.unsplash.com/photo-1583394838336-acd977736f90?auto=format&fit=crop&w=800&q=80&sig=prod_unique_197_accessories",
      "https://images.unsplash.com/photo-1616440347437-b1c73416efc2?auto=format&fit=crop&w=800&q=80&sig=gallery_view1_197",
      "https://images.unsplash.com/photo-1602143407151-7111542de6e8?auto=format&fit=crop&w=800&q=80&sig=gallery_view2_197",
      "https://images.unsplash.com/photo-1583394838336-acd977736f90?auto=format&fit=crop&w=800&q=80&sig=gallery_view3_197"
    ],
    "countInStock": 74,
    "rating": 4.2,
    "numReviews": 200,
    "isFeatured": false,
    "description": "Brand: Anker | High quality accessories product designed for durability and daily performance."
  },
  {
    "name": "Belkin Premium Accessories Model 43",
    "price": 500,
    "originalPrice": 600,
    "category": "Accessories",
    "image": "https://images.unsplash.com/photo-1616440347437-b1c73416efc2?auto=format&fit=crop&w=800&q=80&sig=prod_unique_198_accessories",
    "images": [
      "https://images.unsplash.com/photo-1616440347437-b1c73416efc2?auto=format&fit=crop&w=800&q=80&sig=prod_unique_198_accessories",
      "https://images.unsplash.com/photo-1602143407151-7111542de6e8?auto=format&fit=crop&w=800&q=80&sig=gallery_view1_198",
      "https://images.unsplash.com/photo-1583394838336-acd977736f90?auto=format&fit=crop&w=800&q=80&sig=gallery_view2_198",
      "https://images.unsplash.com/photo-1616440347437-b1c73416efc2?auto=format&fit=crop&w=800&q=80&sig=gallery_view3_198"
    ],
    "countInStock": 76,
    "rating": 4.3,
    "numReviews": 205,
    "isFeatured": false,
    "description": "Brand: Belkin | High quality accessories product designed for durability and daily performance."
  },
  {
    "name": "Spigen Premium Accessories Model 44",
    "price": 500,
    "originalPrice": 600,
    "category": "Accessories",
    "image": "https://images.unsplash.com/photo-1602143407151-7111542de6e8?auto=format&fit=crop&w=800&q=80&sig=prod_unique_199_accessories",
    "images": [
      "https://images.unsplash.com/photo-1602143407151-7111542de6e8?auto=format&fit=crop&w=800&q=80&sig=prod_unique_199_accessories",
      "https://images.unsplash.com/photo-1583394838336-acd977736f90?auto=format&fit=crop&w=800&q=80&sig=gallery_view1_199",
      "https://images.unsplash.com/photo-1616440347437-b1c73416efc2?auto=format&fit=crop&w=800&q=80&sig=gallery_view2_199",
      "https://images.unsplash.com/photo-1602143407151-7111542de6e8?auto=format&fit=crop&w=800&q=80&sig=gallery_view3_199"
    ],
    "countInStock": 78,
    "rating": 4.4,
    "numReviews": 210,
    "isFeatured": false,
    "description": "Brand: Spigen | High quality accessories product designed for durability and daily performance."
  },
  {
    "name": "UGREEN Premium Accessories Model 45",
    "price": 500,
    "originalPrice": 600,
    "category": "Accessories",
    "image": "https://images.unsplash.com/photo-1583394838336-acd977736f90?auto=format&fit=crop&w=800&q=80&sig=prod_unique_200_accessories",
    "images": [
      "https://images.unsplash.com/photo-1583394838336-acd977736f90?auto=format&fit=crop&w=800&q=80&sig=prod_unique_200_accessories",
      "https://images.unsplash.com/photo-1616440347437-b1c73416efc2?auto=format&fit=crop&w=800&q=80&sig=gallery_view1_200",
      "https://images.unsplash.com/photo-1602143407151-7111542de6e8?auto=format&fit=crop&w=800&q=80&sig=gallery_view2_200",
      "https://images.unsplash.com/photo-1583394838336-acd977736f90?auto=format&fit=crop&w=800&q=80&sig=gallery_view3_200"
    ],
    "countInStock": 80,
    "rating": 4.5,
    "numReviews": 215,
    "isFeatured": true,
    "description": "Brand: UGREEN | High quality accessories product designed for durability and daily performance."
  },
  {
    "name": "SanDisk Premium Accessories Model 46",
    "price": 500,
    "originalPrice": 600,
    "category": "Accessories",
    "image": "https://images.unsplash.com/photo-1616440347437-b1c73416efc2?auto=format&fit=crop&w=800&q=80&sig=prod_unique_201_accessories",
    "images": [
      "https://images.unsplash.com/photo-1616440347437-b1c73416efc2?auto=format&fit=crop&w=800&q=80&sig=prod_unique_201_accessories",
      "https://images.unsplash.com/photo-1602143407151-7111542de6e8?auto=format&fit=crop&w=800&q=80&sig=gallery_view1_201",
      "https://images.unsplash.com/photo-1583394838336-acd977736f90?auto=format&fit=crop&w=800&q=80&sig=gallery_view2_201",
      "https://images.unsplash.com/photo-1616440347437-b1c73416efc2?auto=format&fit=crop&w=800&q=80&sig=gallery_view3_201"
    ],
    "countInStock": 82,
    "rating": 4.6,
    "numReviews": 220,
    "isFeatured": false,
    "description": "Brand: SanDisk | High quality accessories product designed for durability and daily performance."
  },
  {
    "name": "Samsung Premium Accessories Model 47",
    "price": 500,
    "originalPrice": 600,
    "category": "Accessories",
    "image": "https://images.unsplash.com/photo-1602143407151-7111542de6e8?auto=format&fit=crop&w=800&q=80&sig=prod_unique_202_accessories",
    "images": [
      "https://images.unsplash.com/photo-1602143407151-7111542de6e8?auto=format&fit=crop&w=800&q=80&sig=prod_unique_202_accessories",
      "https://images.unsplash.com/photo-1583394838336-acd977736f90?auto=format&fit=crop&w=800&q=80&sig=gallery_view1_202",
      "https://images.unsplash.com/photo-1616440347437-b1c73416efc2?auto=format&fit=crop&w=800&q=80&sig=gallery_view2_202",
      "https://images.unsplash.com/photo-1602143407151-7111542de6e8?auto=format&fit=crop&w=800&q=80&sig=gallery_view3_202"
    ],
    "countInStock": 84,
    "rating": 4.7,
    "numReviews": 225,
    "isFeatured": false,
    "description": "Brand: Samsung | High quality accessories product designed for durability and daily performance."
  },
  {
    "name": "Apple Premium Accessories Model 48",
    "price": 500,
    "originalPrice": 600,
    "category": "Accessories",
    "image": "https://images.unsplash.com/photo-1583394838336-acd977736f90?auto=format&fit=crop&w=800&q=80&sig=prod_unique_203_accessories",
    "images": [
      "https://images.unsplash.com/photo-1583394838336-acd977736f90?auto=format&fit=crop&w=800&q=80&sig=prod_unique_203_accessories",
      "https://images.unsplash.com/photo-1616440347437-b1c73416efc2?auto=format&fit=crop&w=800&q=80&sig=gallery_view1_203",
      "https://images.unsplash.com/photo-1602143407151-7111542de6e8?auto=format&fit=crop&w=800&q=80&sig=gallery_view2_203",
      "https://images.unsplash.com/photo-1583394838336-acd977736f90?auto=format&fit=crop&w=800&q=80&sig=gallery_view3_203"
    ],
    "countInStock": 86,
    "rating": 4.8,
    "numReviews": 230,
    "isFeatured": false,
    "description": "Brand: Apple | High quality accessories product designed for durability and daily performance."
  },
  {
    "name": "Baseus Premium Accessories Model 49",
    "price": 500,
    "originalPrice": 600,
    "category": "Accessories",
    "image": "https://images.unsplash.com/photo-1616440347437-b1c73416efc2?auto=format&fit=crop&w=800&q=80&sig=prod_unique_204_accessories",
    "images": [
      "https://images.unsplash.com/photo-1616440347437-b1c73416efc2?auto=format&fit=crop&w=800&q=80&sig=prod_unique_204_accessories",
      "https://images.unsplash.com/photo-1602143407151-7111542de6e8?auto=format&fit=crop&w=800&q=80&sig=gallery_view1_204",
      "https://images.unsplash.com/photo-1583394838336-acd977736f90?auto=format&fit=crop&w=800&q=80&sig=gallery_view2_204",
      "https://images.unsplash.com/photo-1616440347437-b1c73416efc2?auto=format&fit=crop&w=800&q=80&sig=gallery_view3_204"
    ],
    "countInStock": 88,
    "rating": 4.9,
    "numReviews": 235,
    "isFeatured": false,
    "description": "Brand: Baseus | High quality accessories product designed for durability and daily performance."
  },
  {
    "name": "Anker Premium Accessories Model 50",
    "price": 500,
    "originalPrice": 600,
    "category": "Accessories",
    "image": "https://images.unsplash.com/photo-1602143407151-7111542de6e8?auto=format&fit=crop&w=800&q=80&sig=prod_unique_205_accessories",
    "images": [
      "https://images.unsplash.com/photo-1602143407151-7111542de6e8?auto=format&fit=crop&w=800&q=80&sig=prod_unique_205_accessories",
      "https://images.unsplash.com/photo-1583394838336-acd977736f90?auto=format&fit=crop&w=800&q=80&sig=gallery_view1_205",
      "https://images.unsplash.com/photo-1616440347437-b1c73416efc2?auto=format&fit=crop&w=800&q=80&sig=gallery_view2_205",
      "https://images.unsplash.com/photo-1602143407151-7111542de6e8?auto=format&fit=crop&w=800&q=80&sig=gallery_view3_205"
    ],
    "countInStock": 90,
    "rating": 4,
    "numReviews": 240,
    "isFeatured": true,
    "description": "Brand: Anker | High quality accessories product designed for durability and daily performance."
  },
  {
    "name": "Belkin Premium Accessories Model 51",
    "price": 500,
    "originalPrice": 600,
    "category": "Accessories",
    "image": "https://images.unsplash.com/photo-1583394838336-acd977736f90?auto=format&fit=crop&w=800&q=80&sig=prod_unique_206_accessories",
    "images": [
      "https://images.unsplash.com/photo-1583394838336-acd977736f90?auto=format&fit=crop&w=800&q=80&sig=prod_unique_206_accessories",
      "https://images.unsplash.com/photo-1616440347437-b1c73416efc2?auto=format&fit=crop&w=800&q=80&sig=gallery_view1_206",
      "https://images.unsplash.com/photo-1602143407151-7111542de6e8?auto=format&fit=crop&w=800&q=80&sig=gallery_view2_206",
      "https://images.unsplash.com/photo-1583394838336-acd977736f90?auto=format&fit=crop&w=800&q=80&sig=gallery_view3_206"
    ],
    "countInStock": 92,
    "rating": 4.1,
    "numReviews": 245,
    "isFeatured": false,
    "description": "Brand: Belkin | High quality accessories product designed for durability and daily performance."
  },
  {
    "name": "Spigen Premium Accessories Model 52",
    "price": 500,
    "originalPrice": 600,
    "category": "Accessories",
    "image": "https://images.unsplash.com/photo-1616440347437-b1c73416efc2?auto=format&fit=crop&w=800&q=80&sig=prod_unique_207_accessories",
    "images": [
      "https://images.unsplash.com/photo-1616440347437-b1c73416efc2?auto=format&fit=crop&w=800&q=80&sig=prod_unique_207_accessories",
      "https://images.unsplash.com/photo-1602143407151-7111542de6e8?auto=format&fit=crop&w=800&q=80&sig=gallery_view1_207",
      "https://images.unsplash.com/photo-1583394838336-acd977736f90?auto=format&fit=crop&w=800&q=80&sig=gallery_view2_207",
      "https://images.unsplash.com/photo-1616440347437-b1c73416efc2?auto=format&fit=crop&w=800&q=80&sig=gallery_view3_207"
    ],
    "countInStock": 94,
    "rating": 4.2,
    "numReviews": 250,
    "isFeatured": false,
    "description": "Brand: Spigen | High quality accessories product designed for durability and daily performance."
  },
  {
    "name": "UGREEN Premium Accessories Model 53",
    "price": 500,
    "originalPrice": 600,
    "category": "Accessories",
    "image": "https://images.unsplash.com/photo-1602143407151-7111542de6e8?auto=format&fit=crop&w=800&q=80&sig=prod_unique_208_accessories",
    "images": [
      "https://images.unsplash.com/photo-1602143407151-7111542de6e8?auto=format&fit=crop&w=800&q=80&sig=prod_unique_208_accessories",
      "https://images.unsplash.com/photo-1583394838336-acd977736f90?auto=format&fit=crop&w=800&q=80&sig=gallery_view1_208",
      "https://images.unsplash.com/photo-1616440347437-b1c73416efc2?auto=format&fit=crop&w=800&q=80&sig=gallery_view2_208",
      "https://images.unsplash.com/photo-1602143407151-7111542de6e8?auto=format&fit=crop&w=800&q=80&sig=gallery_view3_208"
    ],
    "countInStock": 96,
    "rating": 4.3,
    "numReviews": 255,
    "isFeatured": false,
    "description": "Brand: UGREEN | High quality accessories product designed for durability and daily performance."
  },
  {
    "name": "SanDisk Premium Accessories Model 54",
    "price": 500,
    "originalPrice": 600,
    "category": "Accessories",
    "image": "https://images.unsplash.com/photo-1583394838336-acd977736f90?auto=format&fit=crop&w=800&q=80&sig=prod_unique_209_accessories",
    "images": [
      "https://images.unsplash.com/photo-1583394838336-acd977736f90?auto=format&fit=crop&w=800&q=80&sig=prod_unique_209_accessories",
      "https://images.unsplash.com/photo-1616440347437-b1c73416efc2?auto=format&fit=crop&w=800&q=80&sig=gallery_view1_209",
      "https://images.unsplash.com/photo-1602143407151-7111542de6e8?auto=format&fit=crop&w=800&q=80&sig=gallery_view2_209",
      "https://images.unsplash.com/photo-1583394838336-acd977736f90?auto=format&fit=crop&w=800&q=80&sig=gallery_view3_209"
    ],
    "countInStock": 98,
    "rating": 4.4,
    "numReviews": 260,
    "isFeatured": false,
    "description": "Brand: SanDisk | High quality accessories product designed for durability and daily performance."
  },
  {
    "name": "Samsung Premium Accessories Model 55",
    "price": 500,
    "originalPrice": 600,
    "category": "Accessories",
    "image": "https://images.unsplash.com/photo-1616440347437-b1c73416efc2?auto=format&fit=crop&w=800&q=80&sig=prod_unique_210_accessories",
    "images": [
      "https://images.unsplash.com/photo-1616440347437-b1c73416efc2?auto=format&fit=crop&w=800&q=80&sig=prod_unique_210_accessories",
      "https://images.unsplash.com/photo-1602143407151-7111542de6e8?auto=format&fit=crop&w=800&q=80&sig=gallery_view1_210",
      "https://images.unsplash.com/photo-1583394838336-acd977736f90?auto=format&fit=crop&w=800&q=80&sig=gallery_view2_210",
      "https://images.unsplash.com/photo-1616440347437-b1c73416efc2?auto=format&fit=crop&w=800&q=80&sig=gallery_view3_210"
    ],
    "countInStock": 100,
    "rating": 4.5,
    "numReviews": 265,
    "isFeatured": true,
    "description": "Brand: Samsung | High quality accessories product designed for durability and daily performance."
  },
  {
    "name": "Microsoft Xbox Pro Gaming Gear 1",
    "price": 4300,
    "originalPrice": 5160,
    "category": "Gaming",
    "image": "https://images.unsplash.com/photo-1603302576837-37561b2e2302?auto=format&fit=crop&w=800&q=80&sig=prod_unique_211_gaming",
    "images": [
      "https://images.unsplash.com/photo-1603302576837-37561b2e2302?auto=format&fit=crop&w=800&q=80&sig=prod_unique_211_gaming",
      "https://images.unsplash.com/photo-1612287230202-1ff1d85d1bdf?auto=format&fit=crop&w=800&q=80&sig=gallery_view1_211",
      "https://images.unsplash.com/photo-1550745165-9bc0b252726f?auto=format&fit=crop&w=800&q=80&sig=gallery_view2_211",
      "https://images.unsplash.com/photo-1603302576837-37561b2e2302?auto=format&fit=crop&w=800&q=80&sig=gallery_view3_211"
    ],
    "countInStock": 12,
    "rating": 4.1,
    "numReviews": 45,
    "isFeatured": false,
    "description": "Brand: Microsoft Xbox | High-speed response latency and RGB lighting customization."
  },
  {
    "name": "Nintendo Pro Gaming Gear 2",
    "price": 6100,
    "originalPrice": 7320,
    "category": "Gaming",
    "image": "https://images.unsplash.com/photo-1612287230202-1ff1d85d1bdf?auto=format&fit=crop&w=800&q=80&sig=prod_unique_212_gaming",
    "images": [
      "https://images.unsplash.com/photo-1612287230202-1ff1d85d1bdf?auto=format&fit=crop&w=800&q=80&sig=prod_unique_212_gaming",
      "https://images.unsplash.com/photo-1550745165-9bc0b252726f?auto=format&fit=crop&w=800&q=80&sig=gallery_view1_212",
      "https://images.unsplash.com/photo-1603302576837-37561b2e2302?auto=format&fit=crop&w=800&q=80&sig=gallery_view2_212",
      "https://images.unsplash.com/photo-1612287230202-1ff1d85d1bdf?auto=format&fit=crop&w=800&q=80&sig=gallery_view3_212"
    ],
    "countInStock": 14,
    "rating": 4.2,
    "numReviews": 50,
    "isFeatured": false,
    "description": "Brand: Nintendo | High-speed response latency and RGB lighting customization."
  },
  {
    "name": "Razer Pro Gaming Gear 3",
    "price": 7900,
    "originalPrice": 9480,
    "category": "Gaming",
    "image": "https://images.unsplash.com/photo-1550745165-9bc0b252726f?auto=format&fit=crop&w=800&q=80&sig=prod_unique_213_gaming",
    "images": [
      "https://images.unsplash.com/photo-1550745165-9bc0b252726f?auto=format&fit=crop&w=800&q=80&sig=prod_unique_213_gaming",
      "https://images.unsplash.com/photo-1603302576837-37561b2e2302?auto=format&fit=crop&w=800&q=80&sig=gallery_view1_213",
      "https://images.unsplash.com/photo-1612287230202-1ff1d85d1bdf?auto=format&fit=crop&w=800&q=80&sig=gallery_view2_213",
      "https://images.unsplash.com/photo-1550745165-9bc0b252726f?auto=format&fit=crop&w=800&q=80&sig=gallery_view3_213"
    ],
    "countInStock": 16,
    "rating": 4.3,
    "numReviews": 55,
    "isFeatured": false,
    "description": "Brand: Razer | High-speed response latency and RGB lighting customization."
  },
  {
    "name": "Logitech G Pro Gaming Gear 4",
    "price": 9700,
    "originalPrice": 11640,
    "category": "Gaming",
    "image": "https://images.unsplash.com/photo-1603302576837-37561b2e2302?auto=format&fit=crop&w=800&q=80&sig=prod_unique_214_gaming",
    "images": [
      "https://images.unsplash.com/photo-1603302576837-37561b2e2302?auto=format&fit=crop&w=800&q=80&sig=prod_unique_214_gaming",
      "https://images.unsplash.com/photo-1612287230202-1ff1d85d1bdf?auto=format&fit=crop&w=800&q=80&sig=gallery_view1_214",
      "https://images.unsplash.com/photo-1550745165-9bc0b252726f?auto=format&fit=crop&w=800&q=80&sig=gallery_view2_214",
      "https://images.unsplash.com/photo-1603302576837-37561b2e2302?auto=format&fit=crop&w=800&q=80&sig=gallery_view3_214"
    ],
    "countInStock": 18,
    "rating": 4.4,
    "numReviews": 60,
    "isFeatured": false,
    "description": "Brand: Logitech G | High-speed response latency and RGB lighting customization."
  },
  {
    "name": "SteelSeries Pro Gaming Gear 5",
    "price": 11500,
    "originalPrice": 13800,
    "category": "Gaming",
    "image": "https://images.unsplash.com/photo-1612287230202-1ff1d85d1bdf?auto=format&fit=crop&w=800&q=80&sig=prod_unique_215_gaming",
    "images": [
      "https://images.unsplash.com/photo-1612287230202-1ff1d85d1bdf?auto=format&fit=crop&w=800&q=80&sig=prod_unique_215_gaming",
      "https://images.unsplash.com/photo-1550745165-9bc0b252726f?auto=format&fit=crop&w=800&q=80&sig=gallery_view1_215",
      "https://images.unsplash.com/photo-1603302576837-37561b2e2302?auto=format&fit=crop&w=800&q=80&sig=gallery_view2_215",
      "https://images.unsplash.com/photo-1612287230202-1ff1d85d1bdf?auto=format&fit=crop&w=800&q=80&sig=gallery_view3_215"
    ],
    "countInStock": 20,
    "rating": 4.5,
    "numReviews": 65,
    "isFeatured": true,
    "description": "Brand: SteelSeries | High-speed response latency and RGB lighting customization."
  },
  {
    "name": "Corsair Pro Gaming Gear 6",
    "price": 13300,
    "originalPrice": 15960,
    "category": "Gaming",
    "image": "https://images.unsplash.com/photo-1550745165-9bc0b252726f?auto=format&fit=crop&w=800&q=80&sig=prod_unique_216_gaming",
    "images": [
      "https://images.unsplash.com/photo-1550745165-9bc0b252726f?auto=format&fit=crop&w=800&q=80&sig=prod_unique_216_gaming",
      "https://images.unsplash.com/photo-1603302576837-37561b2e2302?auto=format&fit=crop&w=800&q=80&sig=gallery_view1_216",
      "https://images.unsplash.com/photo-1612287230202-1ff1d85d1bdf?auto=format&fit=crop&w=800&q=80&sig=gallery_view2_216",
      "https://images.unsplash.com/photo-1550745165-9bc0b252726f?auto=format&fit=crop&w=800&q=80&sig=gallery_view3_216"
    ],
    "countInStock": 22,
    "rating": 4.6,
    "numReviews": 70,
    "isFeatured": false,
    "description": "Brand: Corsair | High-speed response latency and RGB lighting customization."
  },
  {
    "name": "ASUS ROG Pro Gaming Gear 7",
    "price": 15100,
    "originalPrice": 18120,
    "category": "Gaming",
    "image": "https://images.unsplash.com/photo-1603302576837-37561b2e2302?auto=format&fit=crop&w=800&q=80&sig=prod_unique_217_gaming",
    "images": [
      "https://images.unsplash.com/photo-1603302576837-37561b2e2302?auto=format&fit=crop&w=800&q=80&sig=prod_unique_217_gaming",
      "https://images.unsplash.com/photo-1612287230202-1ff1d85d1bdf?auto=format&fit=crop&w=800&q=80&sig=gallery_view1_217",
      "https://images.unsplash.com/photo-1550745165-9bc0b252726f?auto=format&fit=crop&w=800&q=80&sig=gallery_view2_217",
      "https://images.unsplash.com/photo-1603302576837-37561b2e2302?auto=format&fit=crop&w=800&q=80&sig=gallery_view3_217"
    ],
    "countInStock": 24,
    "rating": 4.7,
    "numReviews": 75,
    "isFeatured": false,
    "description": "Brand: ASUS ROG | High-speed response latency and RGB lighting customization."
  },
  {
    "name": "Sony PlayStation Pro Gaming Gear 8",
    "price": 16900,
    "originalPrice": 20280,
    "category": "Gaming",
    "image": "https://images.unsplash.com/photo-1612287230202-1ff1d85d1bdf?auto=format&fit=crop&w=800&q=80&sig=prod_unique_218_gaming",
    "images": [
      "https://images.unsplash.com/photo-1612287230202-1ff1d85d1bdf?auto=format&fit=crop&w=800&q=80&sig=prod_unique_218_gaming",
      "https://images.unsplash.com/photo-1550745165-9bc0b252726f?auto=format&fit=crop&w=800&q=80&sig=gallery_view1_218",
      "https://images.unsplash.com/photo-1603302576837-37561b2e2302?auto=format&fit=crop&w=800&q=80&sig=gallery_view2_218",
      "https://images.unsplash.com/photo-1612287230202-1ff1d85d1bdf?auto=format&fit=crop&w=800&q=80&sig=gallery_view3_218"
    ],
    "countInStock": 26,
    "rating": 4.8,
    "numReviews": 80,
    "isFeatured": false,
    "description": "Brand: Sony PlayStation | High-speed response latency and RGB lighting customization."
  },
  {
    "name": "Microsoft Xbox Pro Gaming Gear 9",
    "price": 18700,
    "originalPrice": 22440,
    "category": "Gaming",
    "image": "https://images.unsplash.com/photo-1550745165-9bc0b252726f?auto=format&fit=crop&w=800&q=80&sig=prod_unique_219_gaming",
    "images": [
      "https://images.unsplash.com/photo-1550745165-9bc0b252726f?auto=format&fit=crop&w=800&q=80&sig=prod_unique_219_gaming",
      "https://images.unsplash.com/photo-1603302576837-37561b2e2302?auto=format&fit=crop&w=800&q=80&sig=gallery_view1_219",
      "https://images.unsplash.com/photo-1612287230202-1ff1d85d1bdf?auto=format&fit=crop&w=800&q=80&sig=gallery_view2_219",
      "https://images.unsplash.com/photo-1550745165-9bc0b252726f?auto=format&fit=crop&w=800&q=80&sig=gallery_view3_219"
    ],
    "countInStock": 28,
    "rating": 4.9,
    "numReviews": 85,
    "isFeatured": false,
    "description": "Brand: Microsoft Xbox | High-speed response latency and RGB lighting customization."
  },
  {
    "name": "Nintendo Pro Gaming Gear 10",
    "price": 20500,
    "originalPrice": 24600,
    "category": "Gaming",
    "image": "https://images.unsplash.com/photo-1603302576837-37561b2e2302?auto=format&fit=crop&w=800&q=80&sig=prod_unique_220_gaming",
    "images": [
      "https://images.unsplash.com/photo-1603302576837-37561b2e2302?auto=format&fit=crop&w=800&q=80&sig=prod_unique_220_gaming",
      "https://images.unsplash.com/photo-1612287230202-1ff1d85d1bdf?auto=format&fit=crop&w=800&q=80&sig=gallery_view1_220",
      "https://images.unsplash.com/photo-1550745165-9bc0b252726f?auto=format&fit=crop&w=800&q=80&sig=gallery_view2_220",
      "https://images.unsplash.com/photo-1603302576837-37561b2e2302?auto=format&fit=crop&w=800&q=80&sig=gallery_view3_220"
    ],
    "countInStock": 30,
    "rating": 4,
    "numReviews": 90,
    "isFeatured": true,
    "description": "Brand: Nintendo | High-speed response latency and RGB lighting customization."
  },
  {
    "name": "Razer Pro Gaming Gear 11",
    "price": 22300,
    "originalPrice": 26760,
    "category": "Gaming",
    "image": "https://images.unsplash.com/photo-1612287230202-1ff1d85d1bdf?auto=format&fit=crop&w=800&q=80&sig=prod_unique_221_gaming",
    "images": [
      "https://images.unsplash.com/photo-1612287230202-1ff1d85d1bdf?auto=format&fit=crop&w=800&q=80&sig=prod_unique_221_gaming",
      "https://images.unsplash.com/photo-1550745165-9bc0b252726f?auto=format&fit=crop&w=800&q=80&sig=gallery_view1_221",
      "https://images.unsplash.com/photo-1603302576837-37561b2e2302?auto=format&fit=crop&w=800&q=80&sig=gallery_view2_221",
      "https://images.unsplash.com/photo-1612287230202-1ff1d85d1bdf?auto=format&fit=crop&w=800&q=80&sig=gallery_view3_221"
    ],
    "countInStock": 32,
    "rating": 4.1,
    "numReviews": 95,
    "isFeatured": false,
    "description": "Brand: Razer | High-speed response latency and RGB lighting customization."
  },
  {
    "name": "Logitech G Pro Gaming Gear 12",
    "price": 24100,
    "originalPrice": 28920,
    "category": "Gaming",
    "image": "https://images.unsplash.com/photo-1550745165-9bc0b252726f?auto=format&fit=crop&w=800&q=80&sig=prod_unique_222_gaming",
    "images": [
      "https://images.unsplash.com/photo-1550745165-9bc0b252726f?auto=format&fit=crop&w=800&q=80&sig=prod_unique_222_gaming",
      "https://images.unsplash.com/photo-1603302576837-37561b2e2302?auto=format&fit=crop&w=800&q=80&sig=gallery_view1_222",
      "https://images.unsplash.com/photo-1612287230202-1ff1d85d1bdf?auto=format&fit=crop&w=800&q=80&sig=gallery_view2_222",
      "https://images.unsplash.com/photo-1550745165-9bc0b252726f?auto=format&fit=crop&w=800&q=80&sig=gallery_view3_222"
    ],
    "countInStock": 34,
    "rating": 4.2,
    "numReviews": 100,
    "isFeatured": false,
    "description": "Brand: Logitech G | High-speed response latency and RGB lighting customization."
  },
  {
    "name": "SteelSeries Pro Gaming Gear 13",
    "price": 25900,
    "originalPrice": 31080,
    "category": "Gaming",
    "image": "https://images.unsplash.com/photo-1603302576837-37561b2e2302?auto=format&fit=crop&w=800&q=80&sig=prod_unique_223_gaming",
    "images": [
      "https://images.unsplash.com/photo-1603302576837-37561b2e2302?auto=format&fit=crop&w=800&q=80&sig=prod_unique_223_gaming",
      "https://images.unsplash.com/photo-1612287230202-1ff1d85d1bdf?auto=format&fit=crop&w=800&q=80&sig=gallery_view1_223",
      "https://images.unsplash.com/photo-1550745165-9bc0b252726f?auto=format&fit=crop&w=800&q=80&sig=gallery_view2_223",
      "https://images.unsplash.com/photo-1603302576837-37561b2e2302?auto=format&fit=crop&w=800&q=80&sig=gallery_view3_223"
    ],
    "countInStock": 36,
    "rating": 4.3,
    "numReviews": 105,
    "isFeatured": false,
    "description": "Brand: SteelSeries | High-speed response latency and RGB lighting customization."
  },
  {
    "name": "Corsair Pro Gaming Gear 14",
    "price": 27700,
    "originalPrice": 33240,
    "category": "Gaming",
    "image": "https://images.unsplash.com/photo-1612287230202-1ff1d85d1bdf?auto=format&fit=crop&w=800&q=80&sig=prod_unique_224_gaming",
    "images": [
      "https://images.unsplash.com/photo-1612287230202-1ff1d85d1bdf?auto=format&fit=crop&w=800&q=80&sig=prod_unique_224_gaming",
      "https://images.unsplash.com/photo-1550745165-9bc0b252726f?auto=format&fit=crop&w=800&q=80&sig=gallery_view1_224",
      "https://images.unsplash.com/photo-1603302576837-37561b2e2302?auto=format&fit=crop&w=800&q=80&sig=gallery_view2_224",
      "https://images.unsplash.com/photo-1612287230202-1ff1d85d1bdf?auto=format&fit=crop&w=800&q=80&sig=gallery_view3_224"
    ],
    "countInStock": 38,
    "rating": 4.4,
    "numReviews": 110,
    "isFeatured": false,
    "description": "Brand: Corsair | High-speed response latency and RGB lighting customization."
  },
  {
    "name": "ASUS ROG Pro Gaming Gear 15",
    "price": 29500,
    "originalPrice": 35400,
    "category": "Gaming",
    "image": "https://images.unsplash.com/photo-1550745165-9bc0b252726f?auto=format&fit=crop&w=800&q=80&sig=prod_unique_225_gaming",
    "images": [
      "https://images.unsplash.com/photo-1550745165-9bc0b252726f?auto=format&fit=crop&w=800&q=80&sig=prod_unique_225_gaming",
      "https://images.unsplash.com/photo-1603302576837-37561b2e2302?auto=format&fit=crop&w=800&q=80&sig=gallery_view1_225",
      "https://images.unsplash.com/photo-1612287230202-1ff1d85d1bdf?auto=format&fit=crop&w=800&q=80&sig=gallery_view2_225",
      "https://images.unsplash.com/photo-1550745165-9bc0b252726f?auto=format&fit=crop&w=800&q=80&sig=gallery_view3_225"
    ],
    "countInStock": 40,
    "rating": 4.5,
    "numReviews": 115,
    "isFeatured": true,
    "description": "Brand: ASUS ROG | High-speed response latency and RGB lighting customization."
  },
  {
    "name": "Sony PlayStation Pro Gaming Gear 16",
    "price": 31300,
    "originalPrice": 37560,
    "category": "Gaming",
    "image": "https://images.unsplash.com/photo-1603302576837-37561b2e2302?auto=format&fit=crop&w=800&q=80&sig=prod_unique_226_gaming",
    "images": [
      "https://images.unsplash.com/photo-1603302576837-37561b2e2302?auto=format&fit=crop&w=800&q=80&sig=prod_unique_226_gaming",
      "https://images.unsplash.com/photo-1612287230202-1ff1d85d1bdf?auto=format&fit=crop&w=800&q=80&sig=gallery_view1_226",
      "https://images.unsplash.com/photo-1550745165-9bc0b252726f?auto=format&fit=crop&w=800&q=80&sig=gallery_view2_226",
      "https://images.unsplash.com/photo-1603302576837-37561b2e2302?auto=format&fit=crop&w=800&q=80&sig=gallery_view3_226"
    ],
    "countInStock": 42,
    "rating": 4.6,
    "numReviews": 120,
    "isFeatured": false,
    "description": "Brand: Sony PlayStation | High-speed response latency and RGB lighting customization."
  },
  {
    "name": "Microsoft Xbox Pro Gaming Gear 17",
    "price": 33100,
    "originalPrice": 39720,
    "category": "Gaming",
    "image": "https://images.unsplash.com/photo-1612287230202-1ff1d85d1bdf?auto=format&fit=crop&w=800&q=80&sig=prod_unique_227_gaming",
    "images": [
      "https://images.unsplash.com/photo-1612287230202-1ff1d85d1bdf?auto=format&fit=crop&w=800&q=80&sig=prod_unique_227_gaming",
      "https://images.unsplash.com/photo-1550745165-9bc0b252726f?auto=format&fit=crop&w=800&q=80&sig=gallery_view1_227",
      "https://images.unsplash.com/photo-1603302576837-37561b2e2302?auto=format&fit=crop&w=800&q=80&sig=gallery_view2_227",
      "https://images.unsplash.com/photo-1612287230202-1ff1d85d1bdf?auto=format&fit=crop&w=800&q=80&sig=gallery_view3_227"
    ],
    "countInStock": 44,
    "rating": 4.7,
    "numReviews": 125,
    "isFeatured": false,
    "description": "Brand: Microsoft Xbox | High-speed response latency and RGB lighting customization."
  },
  {
    "name": "Nintendo Pro Gaming Gear 18",
    "price": 34900,
    "originalPrice": 41880,
    "category": "Gaming",
    "image": "https://images.unsplash.com/photo-1550745165-9bc0b252726f?auto=format&fit=crop&w=800&q=80&sig=prod_unique_228_gaming",
    "images": [
      "https://images.unsplash.com/photo-1550745165-9bc0b252726f?auto=format&fit=crop&w=800&q=80&sig=prod_unique_228_gaming",
      "https://images.unsplash.com/photo-1603302576837-37561b2e2302?auto=format&fit=crop&w=800&q=80&sig=gallery_view1_228",
      "https://images.unsplash.com/photo-1612287230202-1ff1d85d1bdf?auto=format&fit=crop&w=800&q=80&sig=gallery_view2_228",
      "https://images.unsplash.com/photo-1550745165-9bc0b252726f?auto=format&fit=crop&w=800&q=80&sig=gallery_view3_228"
    ],
    "countInStock": 46,
    "rating": 4.8,
    "numReviews": 130,
    "isFeatured": false,
    "description": "Brand: Nintendo | High-speed response latency and RGB lighting customization."
  },
  {
    "name": "Razer Pro Gaming Gear 19",
    "price": 36700,
    "originalPrice": 44040,
    "category": "Gaming",
    "image": "https://images.unsplash.com/photo-1603302576837-37561b2e2302?auto=format&fit=crop&w=800&q=80&sig=prod_unique_229_gaming",
    "images": [
      "https://images.unsplash.com/photo-1603302576837-37561b2e2302?auto=format&fit=crop&w=800&q=80&sig=prod_unique_229_gaming",
      "https://images.unsplash.com/photo-1612287230202-1ff1d85d1bdf?auto=format&fit=crop&w=800&q=80&sig=gallery_view1_229",
      "https://images.unsplash.com/photo-1550745165-9bc0b252726f?auto=format&fit=crop&w=800&q=80&sig=gallery_view2_229",
      "https://images.unsplash.com/photo-1603302576837-37561b2e2302?auto=format&fit=crop&w=800&q=80&sig=gallery_view3_229"
    ],
    "countInStock": 48,
    "rating": 4.9,
    "numReviews": 135,
    "isFeatured": false,
    "description": "Brand: Razer | High-speed response latency and RGB lighting customization."
  },
  {
    "name": "Logitech G Pro Gaming Gear 20",
    "price": 38500,
    "originalPrice": 46200,
    "category": "Gaming",
    "image": "https://images.unsplash.com/photo-1612287230202-1ff1d85d1bdf?auto=format&fit=crop&w=800&q=80&sig=prod_unique_230_gaming",
    "images": [
      "https://images.unsplash.com/photo-1612287230202-1ff1d85d1bdf?auto=format&fit=crop&w=800&q=80&sig=prod_unique_230_gaming",
      "https://images.unsplash.com/photo-1550745165-9bc0b252726f?auto=format&fit=crop&w=800&q=80&sig=gallery_view1_230",
      "https://images.unsplash.com/photo-1603302576837-37561b2e2302?auto=format&fit=crop&w=800&q=80&sig=gallery_view2_230",
      "https://images.unsplash.com/photo-1612287230202-1ff1d85d1bdf?auto=format&fit=crop&w=800&q=80&sig=gallery_view3_230"
    ],
    "countInStock": 50,
    "rating": 4,
    "numReviews": 140,
    "isFeatured": true,
    "description": "Brand: Logitech G | High-speed response latency and RGB lighting customization."
  },
  {
    "name": "SteelSeries Pro Gaming Gear 21",
    "price": 40300,
    "originalPrice": 48360,
    "category": "Gaming",
    "image": "https://images.unsplash.com/photo-1550745165-9bc0b252726f?auto=format&fit=crop&w=800&q=80&sig=prod_unique_231_gaming",
    "images": [
      "https://images.unsplash.com/photo-1550745165-9bc0b252726f?auto=format&fit=crop&w=800&q=80&sig=prod_unique_231_gaming",
      "https://images.unsplash.com/photo-1603302576837-37561b2e2302?auto=format&fit=crop&w=800&q=80&sig=gallery_view1_231",
      "https://images.unsplash.com/photo-1612287230202-1ff1d85d1bdf?auto=format&fit=crop&w=800&q=80&sig=gallery_view2_231",
      "https://images.unsplash.com/photo-1550745165-9bc0b252726f?auto=format&fit=crop&w=800&q=80&sig=gallery_view3_231"
    ],
    "countInStock": 52,
    "rating": 4.1,
    "numReviews": 145,
    "isFeatured": false,
    "description": "Brand: SteelSeries | High-speed response latency and RGB lighting customization."
  },
  {
    "name": "Corsair Pro Gaming Gear 22",
    "price": 42100,
    "originalPrice": 50520,
    "category": "Gaming",
    "image": "https://images.unsplash.com/photo-1603302576837-37561b2e2302?auto=format&fit=crop&w=800&q=80&sig=prod_unique_232_gaming",
    "images": [
      "https://images.unsplash.com/photo-1603302576837-37561b2e2302?auto=format&fit=crop&w=800&q=80&sig=prod_unique_232_gaming",
      "https://images.unsplash.com/photo-1612287230202-1ff1d85d1bdf?auto=format&fit=crop&w=800&q=80&sig=gallery_view1_232",
      "https://images.unsplash.com/photo-1550745165-9bc0b252726f?auto=format&fit=crop&w=800&q=80&sig=gallery_view2_232",
      "https://images.unsplash.com/photo-1603302576837-37561b2e2302?auto=format&fit=crop&w=800&q=80&sig=gallery_view3_232"
    ],
    "countInStock": 54,
    "rating": 4.2,
    "numReviews": 150,
    "isFeatured": false,
    "description": "Brand: Corsair | High-speed response latency and RGB lighting customization."
  },
  {
    "name": "ASUS ROG Pro Gaming Gear 23",
    "price": 43900,
    "originalPrice": 52680,
    "category": "Gaming",
    "image": "https://images.unsplash.com/photo-1612287230202-1ff1d85d1bdf?auto=format&fit=crop&w=800&q=80&sig=prod_unique_233_gaming",
    "images": [
      "https://images.unsplash.com/photo-1612287230202-1ff1d85d1bdf?auto=format&fit=crop&w=800&q=80&sig=prod_unique_233_gaming",
      "https://images.unsplash.com/photo-1550745165-9bc0b252726f?auto=format&fit=crop&w=800&q=80&sig=gallery_view1_233",
      "https://images.unsplash.com/photo-1603302576837-37561b2e2302?auto=format&fit=crop&w=800&q=80&sig=gallery_view2_233",
      "https://images.unsplash.com/photo-1612287230202-1ff1d85d1bdf?auto=format&fit=crop&w=800&q=80&sig=gallery_view3_233"
    ],
    "countInStock": 56,
    "rating": 4.3,
    "numReviews": 155,
    "isFeatured": false,
    "description": "Brand: ASUS ROG | High-speed response latency and RGB lighting customization."
  },
  {
    "name": "Sony PlayStation Pro Gaming Gear 24",
    "price": 45700,
    "originalPrice": 54840,
    "category": "Gaming",
    "image": "https://images.unsplash.com/photo-1550745165-9bc0b252726f?auto=format&fit=crop&w=800&q=80&sig=prod_unique_234_gaming",
    "images": [
      "https://images.unsplash.com/photo-1550745165-9bc0b252726f?auto=format&fit=crop&w=800&q=80&sig=prod_unique_234_gaming",
      "https://images.unsplash.com/photo-1603302576837-37561b2e2302?auto=format&fit=crop&w=800&q=80&sig=gallery_view1_234",
      "https://images.unsplash.com/photo-1612287230202-1ff1d85d1bdf?auto=format&fit=crop&w=800&q=80&sig=gallery_view2_234",
      "https://images.unsplash.com/photo-1550745165-9bc0b252726f?auto=format&fit=crop&w=800&q=80&sig=gallery_view3_234"
    ],
    "countInStock": 58,
    "rating": 4.4,
    "numReviews": 160,
    "isFeatured": false,
    "description": "Brand: Sony PlayStation | High-speed response latency and RGB lighting customization."
  },
  {
    "name": "Microsoft Xbox Pro Gaming Gear 25",
    "price": 47500,
    "originalPrice": 57000,
    "category": "Gaming",
    "image": "https://images.unsplash.com/photo-1603302576837-37561b2e2302?auto=format&fit=crop&w=800&q=80&sig=prod_unique_235_gaming",
    "images": [
      "https://images.unsplash.com/photo-1603302576837-37561b2e2302?auto=format&fit=crop&w=800&q=80&sig=prod_unique_235_gaming",
      "https://images.unsplash.com/photo-1612287230202-1ff1d85d1bdf?auto=format&fit=crop&w=800&q=80&sig=gallery_view1_235",
      "https://images.unsplash.com/photo-1550745165-9bc0b252726f?auto=format&fit=crop&w=800&q=80&sig=gallery_view2_235",
      "https://images.unsplash.com/photo-1603302576837-37561b2e2302?auto=format&fit=crop&w=800&q=80&sig=gallery_view3_235"
    ],
    "countInStock": 60,
    "rating": 4.5,
    "numReviews": 165,
    "isFeatured": true,
    "description": "Brand: Microsoft Xbox | High-speed response latency and RGB lighting customization."
  },
  {
    "name": "Nintendo Pro Gaming Gear 26",
    "price": 49300,
    "originalPrice": 59160,
    "category": "Gaming",
    "image": "https://images.unsplash.com/photo-1612287230202-1ff1d85d1bdf?auto=format&fit=crop&w=800&q=80&sig=prod_unique_236_gaming",
    "images": [
      "https://images.unsplash.com/photo-1612287230202-1ff1d85d1bdf?auto=format&fit=crop&w=800&q=80&sig=prod_unique_236_gaming",
      "https://images.unsplash.com/photo-1550745165-9bc0b252726f?auto=format&fit=crop&w=800&q=80&sig=gallery_view1_236",
      "https://images.unsplash.com/photo-1603302576837-37561b2e2302?auto=format&fit=crop&w=800&q=80&sig=gallery_view2_236",
      "https://images.unsplash.com/photo-1612287230202-1ff1d85d1bdf?auto=format&fit=crop&w=800&q=80&sig=gallery_view3_236"
    ],
    "countInStock": 62,
    "rating": 4.6,
    "numReviews": 170,
    "isFeatured": false,
    "description": "Brand: Nintendo | High-speed response latency and RGB lighting customization."
  },
  {
    "name": "Razer Pro Gaming Gear 27",
    "price": 51100,
    "originalPrice": 61320,
    "category": "Gaming",
    "image": "https://images.unsplash.com/photo-1550745165-9bc0b252726f?auto=format&fit=crop&w=800&q=80&sig=prod_unique_237_gaming",
    "images": [
      "https://images.unsplash.com/photo-1550745165-9bc0b252726f?auto=format&fit=crop&w=800&q=80&sig=prod_unique_237_gaming",
      "https://images.unsplash.com/photo-1603302576837-37561b2e2302?auto=format&fit=crop&w=800&q=80&sig=gallery_view1_237",
      "https://images.unsplash.com/photo-1612287230202-1ff1d85d1bdf?auto=format&fit=crop&w=800&q=80&sig=gallery_view2_237",
      "https://images.unsplash.com/photo-1550745165-9bc0b252726f?auto=format&fit=crop&w=800&q=80&sig=gallery_view3_237"
    ],
    "countInStock": 64,
    "rating": 4.7,
    "numReviews": 175,
    "isFeatured": false,
    "description": "Brand: Razer | High-speed response latency and RGB lighting customization."
  },
  {
    "name": "Logitech G Pro Gaming Gear 28",
    "price": 52900,
    "originalPrice": 63480,
    "category": "Gaming",
    "image": "https://images.unsplash.com/photo-1603302576837-37561b2e2302?auto=format&fit=crop&w=800&q=80&sig=prod_unique_238_gaming",
    "images": [
      "https://images.unsplash.com/photo-1603302576837-37561b2e2302?auto=format&fit=crop&w=800&q=80&sig=prod_unique_238_gaming",
      "https://images.unsplash.com/photo-1612287230202-1ff1d85d1bdf?auto=format&fit=crop&w=800&q=80&sig=gallery_view1_238",
      "https://images.unsplash.com/photo-1550745165-9bc0b252726f?auto=format&fit=crop&w=800&q=80&sig=gallery_view2_238",
      "https://images.unsplash.com/photo-1603302576837-37561b2e2302?auto=format&fit=crop&w=800&q=80&sig=gallery_view3_238"
    ],
    "countInStock": 66,
    "rating": 4.8,
    "numReviews": 180,
    "isFeatured": false,
    "description": "Brand: Logitech G | High-speed response latency and RGB lighting customization."
  },
  {
    "name": "SteelSeries Pro Gaming Gear 29",
    "price": 54700,
    "originalPrice": 65640,
    "category": "Gaming",
    "image": "https://images.unsplash.com/photo-1612287230202-1ff1d85d1bdf?auto=format&fit=crop&w=800&q=80&sig=prod_unique_239_gaming",
    "images": [
      "https://images.unsplash.com/photo-1612287230202-1ff1d85d1bdf?auto=format&fit=crop&w=800&q=80&sig=prod_unique_239_gaming",
      "https://images.unsplash.com/photo-1550745165-9bc0b252726f?auto=format&fit=crop&w=800&q=80&sig=gallery_view1_239",
      "https://images.unsplash.com/photo-1603302576837-37561b2e2302?auto=format&fit=crop&w=800&q=80&sig=gallery_view2_239",
      "https://images.unsplash.com/photo-1612287230202-1ff1d85d1bdf?auto=format&fit=crop&w=800&q=80&sig=gallery_view3_239"
    ],
    "countInStock": 68,
    "rating": 4.9,
    "numReviews": 185,
    "isFeatured": false,
    "description": "Brand: SteelSeries | High-speed response latency and RGB lighting customization."
  },
  {
    "name": "Corsair Pro Gaming Gear 30",
    "price": 56500,
    "originalPrice": 67800,
    "category": "Gaming",
    "image": "https://images.unsplash.com/photo-1550745165-9bc0b252726f?auto=format&fit=crop&w=800&q=80&sig=prod_unique_240_gaming",
    "images": [
      "https://images.unsplash.com/photo-1550745165-9bc0b252726f?auto=format&fit=crop&w=800&q=80&sig=prod_unique_240_gaming",
      "https://images.unsplash.com/photo-1603302576837-37561b2e2302?auto=format&fit=crop&w=800&q=80&sig=gallery_view1_240",
      "https://images.unsplash.com/photo-1612287230202-1ff1d85d1bdf?auto=format&fit=crop&w=800&q=80&sig=gallery_view2_240",
      "https://images.unsplash.com/photo-1550745165-9bc0b252726f?auto=format&fit=crop&w=800&q=80&sig=gallery_view3_240"
    ],
    "countInStock": 70,
    "rating": 4,
    "numReviews": 190,
    "isFeatured": true,
    "description": "Brand: Corsair | High-speed response latency and RGB lighting customization."
  },
  {
    "name": "ASUS ROG Pro Gaming Gear 31",
    "price": 58300,
    "originalPrice": 69960,
    "category": "Gaming",
    "image": "https://images.unsplash.com/photo-1603302576837-37561b2e2302?auto=format&fit=crop&w=800&q=80&sig=prod_unique_241_gaming",
    "images": [
      "https://images.unsplash.com/photo-1603302576837-37561b2e2302?auto=format&fit=crop&w=800&q=80&sig=prod_unique_241_gaming",
      "https://images.unsplash.com/photo-1612287230202-1ff1d85d1bdf?auto=format&fit=crop&w=800&q=80&sig=gallery_view1_241",
      "https://images.unsplash.com/photo-1550745165-9bc0b252726f?auto=format&fit=crop&w=800&q=80&sig=gallery_view2_241",
      "https://images.unsplash.com/photo-1603302576837-37561b2e2302?auto=format&fit=crop&w=800&q=80&sig=gallery_view3_241"
    ],
    "countInStock": 72,
    "rating": 4.1,
    "numReviews": 195,
    "isFeatured": false,
    "description": "Brand: ASUS ROG | High-speed response latency and RGB lighting customization."
  },
  {
    "name": "Sony PlayStation Pro Gaming Gear 32",
    "price": 60100,
    "originalPrice": 72120,
    "category": "Gaming",
    "image": "https://images.unsplash.com/photo-1612287230202-1ff1d85d1bdf?auto=format&fit=crop&w=800&q=80&sig=prod_unique_242_gaming",
    "images": [
      "https://images.unsplash.com/photo-1612287230202-1ff1d85d1bdf?auto=format&fit=crop&w=800&q=80&sig=prod_unique_242_gaming",
      "https://images.unsplash.com/photo-1550745165-9bc0b252726f?auto=format&fit=crop&w=800&q=80&sig=gallery_view1_242",
      "https://images.unsplash.com/photo-1603302576837-37561b2e2302?auto=format&fit=crop&w=800&q=80&sig=gallery_view2_242",
      "https://images.unsplash.com/photo-1612287230202-1ff1d85d1bdf?auto=format&fit=crop&w=800&q=80&sig=gallery_view3_242"
    ],
    "countInStock": 74,
    "rating": 4.2,
    "numReviews": 200,
    "isFeatured": false,
    "description": "Brand: Sony PlayStation | High-speed response latency and RGB lighting customization."
  },
  {
    "name": "Microsoft Xbox Pro Gaming Gear 33",
    "price": 61900,
    "originalPrice": 74280,
    "category": "Gaming",
    "image": "https://images.unsplash.com/photo-1550745165-9bc0b252726f?auto=format&fit=crop&w=800&q=80&sig=prod_unique_243_gaming",
    "images": [
      "https://images.unsplash.com/photo-1550745165-9bc0b252726f?auto=format&fit=crop&w=800&q=80&sig=prod_unique_243_gaming",
      "https://images.unsplash.com/photo-1603302576837-37561b2e2302?auto=format&fit=crop&w=800&q=80&sig=gallery_view1_243",
      "https://images.unsplash.com/photo-1612287230202-1ff1d85d1bdf?auto=format&fit=crop&w=800&q=80&sig=gallery_view2_243",
      "https://images.unsplash.com/photo-1550745165-9bc0b252726f?auto=format&fit=crop&w=800&q=80&sig=gallery_view3_243"
    ],
    "countInStock": 76,
    "rating": 4.3,
    "numReviews": 205,
    "isFeatured": false,
    "description": "Brand: Microsoft Xbox | High-speed response latency and RGB lighting customization."
  },
  {
    "name": "Nintendo Pro Gaming Gear 34",
    "price": 63700,
    "originalPrice": 76440,
    "category": "Gaming",
    "image": "https://images.unsplash.com/photo-1603302576837-37561b2e2302?auto=format&fit=crop&w=800&q=80&sig=prod_unique_244_gaming",
    "images": [
      "https://images.unsplash.com/photo-1603302576837-37561b2e2302?auto=format&fit=crop&w=800&q=80&sig=prod_unique_244_gaming",
      "https://images.unsplash.com/photo-1612287230202-1ff1d85d1bdf?auto=format&fit=crop&w=800&q=80&sig=gallery_view1_244",
      "https://images.unsplash.com/photo-1550745165-9bc0b252726f?auto=format&fit=crop&w=800&q=80&sig=gallery_view2_244",
      "https://images.unsplash.com/photo-1603302576837-37561b2e2302?auto=format&fit=crop&w=800&q=80&sig=gallery_view3_244"
    ],
    "countInStock": 78,
    "rating": 4.4,
    "numReviews": 210,
    "isFeatured": false,
    "description": "Brand: Nintendo | High-speed response latency and RGB lighting customization."
  },
  {
    "name": "Razer Pro Gaming Gear 35",
    "price": 65500,
    "originalPrice": 78600,
    "category": "Gaming",
    "image": "https://images.unsplash.com/photo-1612287230202-1ff1d85d1bdf?auto=format&fit=crop&w=800&q=80&sig=prod_unique_245_gaming",
    "images": [
      "https://images.unsplash.com/photo-1612287230202-1ff1d85d1bdf?auto=format&fit=crop&w=800&q=80&sig=prod_unique_245_gaming",
      "https://images.unsplash.com/photo-1550745165-9bc0b252726f?auto=format&fit=crop&w=800&q=80&sig=gallery_view1_245",
      "https://images.unsplash.com/photo-1603302576837-37561b2e2302?auto=format&fit=crop&w=800&q=80&sig=gallery_view2_245",
      "https://images.unsplash.com/photo-1612287230202-1ff1d85d1bdf?auto=format&fit=crop&w=800&q=80&sig=gallery_view3_245"
    ],
    "countInStock": 80,
    "rating": 4.5,
    "numReviews": 215,
    "isFeatured": true,
    "description": "Brand: Razer | High-speed response latency and RGB lighting customization."
  },
  {
    "name": "Fortune Organic Pantry Item #1",
    "price": 80,
    "originalPrice": 96,
    "category": "Groceries",
    "image": "https://images.unsplash.com/photo-1498557850523-fd3d118b962e?auto=format&fit=crop&w=800&q=80&sig=prod_unique_246_groceries",
    "images": [
      "https://images.unsplash.com/photo-1498557850523-fd3d118b962e?auto=format&fit=crop&w=800&q=80&sig=prod_unique_246_groceries",
      "https://images.unsplash.com/photo-1556881286-fc6915169721?auto=format&fit=crop&w=800&q=80&sig=gallery_view1_246",
      "https://images.unsplash.com/photo-1586201375761-83865001e31c?auto=format&fit=crop&w=800&q=80&sig=gallery_view2_246",
      "https://images.unsplash.com/photo-1523049673857-eb18f1d7b578?auto=format&fit=crop&w=800&q=80&sig=gallery_view3_246"
    ],
    "countInStock": 12,
    "rating": 4.1,
    "numReviews": 45,
    "isFeatured": false,
    "description": "Brand: Fortune | Fresh organic grocery product harvested under natural farming standards."
  },
  {
    "name": "Amul Organic Pantry Item #2",
    "price": 115,
    "originalPrice": 138,
    "category": "Groceries",
    "image": "https://images.unsplash.com/photo-1556881286-fc6915169721?auto=format&fit=crop&w=800&q=80&sig=prod_unique_247_groceries",
    "images": [
      "https://images.unsplash.com/photo-1556881286-fc6915169721?auto=format&fit=crop&w=800&q=80&sig=prod_unique_247_groceries",
      "https://images.unsplash.com/photo-1586201375761-83865001e31c?auto=format&fit=crop&w=800&q=80&sig=gallery_view1_247",
      "https://images.unsplash.com/photo-1523049673857-eb18f1d7b578?auto=format&fit=crop&w=800&q=80&sig=gallery_view2_247",
      "https://images.unsplash.com/photo-1498557850523-fd3d118b962e?auto=format&fit=crop&w=800&q=80&sig=gallery_view3_247"
    ],
    "countInStock": 14,
    "rating": 4.2,
    "numReviews": 50,
    "isFeatured": false,
    "description": "Brand: Amul | Fresh organic grocery product harvested under natural farming standards."
  },
  {
    "name": "Organic India Organic Pantry Item #3",
    "price": 150,
    "originalPrice": 180,
    "category": "Groceries",
    "image": "https://images.unsplash.com/photo-1586201375761-83865001e31c?auto=format&fit=crop&w=800&q=80&sig=prod_unique_248_groceries",
    "images": [
      "https://images.unsplash.com/photo-1586201375761-83865001e31c?auto=format&fit=crop&w=800&q=80&sig=prod_unique_248_groceries",
      "https://images.unsplash.com/photo-1523049673857-eb18f1d7b578?auto=format&fit=crop&w=800&q=80&sig=gallery_view1_248",
      "https://images.unsplash.com/photo-1498557850523-fd3d118b962e?auto=format&fit=crop&w=800&q=80&sig=gallery_view2_248",
      "https://images.unsplash.com/photo-1556881286-fc6915169721?auto=format&fit=crop&w=800&q=80&sig=gallery_view3_248"
    ],
    "countInStock": 16,
    "rating": 4.3,
    "numReviews": 55,
    "isFeatured": false,
    "description": "Brand: Organic India | Fresh organic grocery product harvested under natural farming standards."
  },
  {
    "name": "Tata Simply Better Organic Pantry Item #4",
    "price": 185,
    "originalPrice": 222,
    "category": "Groceries",
    "image": "https://images.unsplash.com/photo-1523049673857-eb18f1d7b578?auto=format&fit=crop&w=800&q=80&sig=prod_unique_249_groceries",
    "images": [
      "https://images.unsplash.com/photo-1523049673857-eb18f1d7b578?auto=format&fit=crop&w=800&q=80&sig=prod_unique_249_groceries",
      "https://images.unsplash.com/photo-1498557850523-fd3d118b962e?auto=format&fit=crop&w=800&q=80&sig=gallery_view1_249",
      "https://images.unsplash.com/photo-1556881286-fc6915169721?auto=format&fit=crop&w=800&q=80&sig=gallery_view2_249",
      "https://images.unsplash.com/photo-1586201375761-83865001e31c?auto=format&fit=crop&w=800&q=80&sig=gallery_view3_249"
    ],
    "countInStock": 18,
    "rating": 4.4,
    "numReviews": 60,
    "isFeatured": false,
    "description": "Brand: Tata Simply Better | Fresh organic grocery product harvested under natural farming standards."
  },
  {
    "name": "Nestle Organic Pantry Item #5",
    "price": 220,
    "originalPrice": 264,
    "category": "Groceries",
    "image": "https://images.unsplash.com/photo-1498557850523-fd3d118b962e?auto=format&fit=crop&w=800&q=80&sig=prod_unique_250_groceries",
    "images": [
      "https://images.unsplash.com/photo-1498557850523-fd3d118b962e?auto=format&fit=crop&w=800&q=80&sig=prod_unique_250_groceries",
      "https://images.unsplash.com/photo-1556881286-fc6915169721?auto=format&fit=crop&w=800&q=80&sig=gallery_view1_250",
      "https://images.unsplash.com/photo-1586201375761-83865001e31c?auto=format&fit=crop&w=800&q=80&sig=gallery_view2_250",
      "https://images.unsplash.com/photo-1523049673857-eb18f1d7b578?auto=format&fit=crop&w=800&q=80&sig=gallery_view3_250"
    ],
    "countInStock": 20,
    "rating": 4.5,
    "numReviews": 65,
    "isFeatured": true,
    "description": "Brand: Nestle | Fresh organic grocery product harvested under natural farming standards."
  },
  {
    "name": "Quaker Organic Pantry Item #6",
    "price": 255,
    "originalPrice": 306,
    "category": "Groceries",
    "image": "https://images.unsplash.com/photo-1556881286-fc6915169721?auto=format&fit=crop&w=800&q=80&sig=prod_unique_251_groceries",
    "images": [
      "https://images.unsplash.com/photo-1556881286-fc6915169721?auto=format&fit=crop&w=800&q=80&sig=prod_unique_251_groceries",
      "https://images.unsplash.com/photo-1586201375761-83865001e31c?auto=format&fit=crop&w=800&q=80&sig=gallery_view1_251",
      "https://images.unsplash.com/photo-1523049673857-eb18f1d7b578?auto=format&fit=crop&w=800&q=80&sig=gallery_view2_251",
      "https://images.unsplash.com/photo-1498557850523-fd3d118b962e?auto=format&fit=crop&w=800&q=80&sig=gallery_view3_251"
    ],
    "countInStock": 22,
    "rating": 4.6,
    "numReviews": 70,
    "isFeatured": false,
    "description": "Brand: Quaker | Fresh organic grocery product harvested under natural farming standards."
  },
  {
    "name": "Kellanova Organic Pantry Item #7",
    "price": 290,
    "originalPrice": 348,
    "category": "Groceries",
    "image": "https://images.unsplash.com/photo-1586201375761-83865001e31c?auto=format&fit=crop&w=800&q=80&sig=prod_unique_252_groceries",
    "images": [
      "https://images.unsplash.com/photo-1586201375761-83865001e31c?auto=format&fit=crop&w=800&q=80&sig=prod_unique_252_groceries",
      "https://images.unsplash.com/photo-1523049673857-eb18f1d7b578?auto=format&fit=crop&w=800&q=80&sig=gallery_view1_252",
      "https://images.unsplash.com/photo-1498557850523-fd3d118b962e?auto=format&fit=crop&w=800&q=80&sig=gallery_view2_252",
      "https://images.unsplash.com/photo-1556881286-fc6915169721?auto=format&fit=crop&w=800&q=80&sig=gallery_view3_252"
    ],
    "countInStock": 24,
    "rating": 4.7,
    "numReviews": 75,
    "isFeatured": false,
    "description": "Brand: Kellanova | Fresh organic grocery product harvested under natural farming standards."
  },
  {
    "name": "Tropico Organic Pantry Item #8",
    "price": 325,
    "originalPrice": 390,
    "category": "Groceries",
    "image": "https://images.unsplash.com/photo-1523049673857-eb18f1d7b578?auto=format&fit=crop&w=800&q=80&sig=prod_unique_253_groceries",
    "images": [
      "https://images.unsplash.com/photo-1523049673857-eb18f1d7b578?auto=format&fit=crop&w=800&q=80&sig=prod_unique_253_groceries",
      "https://images.unsplash.com/photo-1498557850523-fd3d118b962e?auto=format&fit=crop&w=800&q=80&sig=gallery_view1_253",
      "https://images.unsplash.com/photo-1556881286-fc6915169721?auto=format&fit=crop&w=800&q=80&sig=gallery_view2_253",
      "https://images.unsplash.com/photo-1586201375761-83865001e31c?auto=format&fit=crop&w=800&q=80&sig=gallery_view3_253"
    ],
    "countInStock": 26,
    "rating": 4.8,
    "numReviews": 80,
    "isFeatured": false,
    "description": "Brand: Tropico | Fresh organic grocery product harvested under natural farming standards."
  },
  {
    "name": "Nature Fresh Organic Pantry Item #9",
    "price": 360,
    "originalPrice": 432,
    "category": "Groceries",
    "image": "https://images.unsplash.com/photo-1498557850523-fd3d118b962e?auto=format&fit=crop&w=800&q=80&sig=prod_unique_254_groceries",
    "images": [
      "https://images.unsplash.com/photo-1498557850523-fd3d118b962e?auto=format&fit=crop&w=800&q=80&sig=prod_unique_254_groceries",
      "https://images.unsplash.com/photo-1556881286-fc6915169721?auto=format&fit=crop&w=800&q=80&sig=gallery_view1_254",
      "https://images.unsplash.com/photo-1586201375761-83865001e31c?auto=format&fit=crop&w=800&q=80&sig=gallery_view2_254",
      "https://images.unsplash.com/photo-1523049673857-eb18f1d7b578?auto=format&fit=crop&w=800&q=80&sig=gallery_view3_254"
    ],
    "countInStock": 28,
    "rating": 4.9,
    "numReviews": 85,
    "isFeatured": false,
    "description": "Brand: Nature Fresh | Fresh organic grocery product harvested under natural farming standards."
  },
  {
    "name": "Daawat Organic Pantry Item #10",
    "price": 395,
    "originalPrice": 474,
    "category": "Groceries",
    "image": "https://images.unsplash.com/photo-1556881286-fc6915169721?auto=format&fit=crop&w=800&q=80&sig=prod_unique_255_groceries",
    "images": [
      "https://images.unsplash.com/photo-1556881286-fc6915169721?auto=format&fit=crop&w=800&q=80&sig=prod_unique_255_groceries",
      "https://images.unsplash.com/photo-1586201375761-83865001e31c?auto=format&fit=crop&w=800&q=80&sig=gallery_view1_255",
      "https://images.unsplash.com/photo-1523049673857-eb18f1d7b578?auto=format&fit=crop&w=800&q=80&sig=gallery_view2_255",
      "https://images.unsplash.com/photo-1498557850523-fd3d118b962e?auto=format&fit=crop&w=800&q=80&sig=gallery_view3_255"
    ],
    "countInStock": 30,
    "rating": 4,
    "numReviews": 90,
    "isFeatured": true,
    "description": "Brand: Daawat | Fresh organic grocery product harvested under natural farming standards."
  },
  {
    "name": "Fortune Organic Pantry Item #11",
    "price": 430,
    "originalPrice": 516,
    "category": "Groceries",
    "image": "https://images.unsplash.com/photo-1586201375761-83865001e31c?auto=format&fit=crop&w=800&q=80&sig=prod_unique_256_groceries",
    "images": [
      "https://images.unsplash.com/photo-1586201375761-83865001e31c?auto=format&fit=crop&w=800&q=80&sig=prod_unique_256_groceries",
      "https://images.unsplash.com/photo-1523049673857-eb18f1d7b578?auto=format&fit=crop&w=800&q=80&sig=gallery_view1_256",
      "https://images.unsplash.com/photo-1498557850523-fd3d118b962e?auto=format&fit=crop&w=800&q=80&sig=gallery_view2_256",
      "https://images.unsplash.com/photo-1556881286-fc6915169721?auto=format&fit=crop&w=800&q=80&sig=gallery_view3_256"
    ],
    "countInStock": 32,
    "rating": 4.1,
    "numReviews": 95,
    "isFeatured": false,
    "description": "Brand: Fortune | Fresh organic grocery product harvested under natural farming standards."
  },
  {
    "name": "Amul Organic Pantry Item #12",
    "price": 465,
    "originalPrice": 558,
    "category": "Groceries",
    "image": "https://images.unsplash.com/photo-1523049673857-eb18f1d7b578?auto=format&fit=crop&w=800&q=80&sig=prod_unique_257_groceries",
    "images": [
      "https://images.unsplash.com/photo-1523049673857-eb18f1d7b578?auto=format&fit=crop&w=800&q=80&sig=prod_unique_257_groceries",
      "https://images.unsplash.com/photo-1498557850523-fd3d118b962e?auto=format&fit=crop&w=800&q=80&sig=gallery_view1_257",
      "https://images.unsplash.com/photo-1556881286-fc6915169721?auto=format&fit=crop&w=800&q=80&sig=gallery_view2_257",
      "https://images.unsplash.com/photo-1586201375761-83865001e31c?auto=format&fit=crop&w=800&q=80&sig=gallery_view3_257"
    ],
    "countInStock": 34,
    "rating": 4.2,
    "numReviews": 100,
    "isFeatured": false,
    "description": "Brand: Amul | Fresh organic grocery product harvested under natural farming standards."
  },
  {
    "name": "Organic India Organic Pantry Item #13",
    "price": 500,
    "originalPrice": 600,
    "category": "Groceries",
    "image": "https://images.unsplash.com/photo-1498557850523-fd3d118b962e?auto=format&fit=crop&w=800&q=80&sig=prod_unique_258_groceries",
    "images": [
      "https://images.unsplash.com/photo-1498557850523-fd3d118b962e?auto=format&fit=crop&w=800&q=80&sig=prod_unique_258_groceries",
      "https://images.unsplash.com/photo-1556881286-fc6915169721?auto=format&fit=crop&w=800&q=80&sig=gallery_view1_258",
      "https://images.unsplash.com/photo-1586201375761-83865001e31c?auto=format&fit=crop&w=800&q=80&sig=gallery_view2_258",
      "https://images.unsplash.com/photo-1523049673857-eb18f1d7b578?auto=format&fit=crop&w=800&q=80&sig=gallery_view3_258"
    ],
    "countInStock": 36,
    "rating": 4.3,
    "numReviews": 105,
    "isFeatured": false,
    "description": "Brand: Organic India | Fresh organic grocery product harvested under natural farming standards."
  },
  {
    "name": "Tata Simply Better Organic Pantry Item #14",
    "price": 535,
    "originalPrice": 642,
    "category": "Groceries",
    "image": "https://images.unsplash.com/photo-1556881286-fc6915169721?auto=format&fit=crop&w=800&q=80&sig=prod_unique_259_groceries",
    "images": [
      "https://images.unsplash.com/photo-1556881286-fc6915169721?auto=format&fit=crop&w=800&q=80&sig=prod_unique_259_groceries",
      "https://images.unsplash.com/photo-1586201375761-83865001e31c?auto=format&fit=crop&w=800&q=80&sig=gallery_view1_259",
      "https://images.unsplash.com/photo-1523049673857-eb18f1d7b578?auto=format&fit=crop&w=800&q=80&sig=gallery_view2_259",
      "https://images.unsplash.com/photo-1498557850523-fd3d118b962e?auto=format&fit=crop&w=800&q=80&sig=gallery_view3_259"
    ],
    "countInStock": 38,
    "rating": 4.4,
    "numReviews": 110,
    "isFeatured": false,
    "description": "Brand: Tata Simply Better | Fresh organic grocery product harvested under natural farming standards."
  },
  {
    "name": "Nestle Organic Pantry Item #15",
    "price": 570,
    "originalPrice": 684,
    "category": "Groceries",
    "image": "https://images.unsplash.com/photo-1586201375761-83865001e31c?auto=format&fit=crop&w=800&q=80&sig=prod_unique_260_groceries",
    "images": [
      "https://images.unsplash.com/photo-1586201375761-83865001e31c?auto=format&fit=crop&w=800&q=80&sig=prod_unique_260_groceries",
      "https://images.unsplash.com/photo-1523049673857-eb18f1d7b578?auto=format&fit=crop&w=800&q=80&sig=gallery_view1_260",
      "https://images.unsplash.com/photo-1498557850523-fd3d118b962e?auto=format&fit=crop&w=800&q=80&sig=gallery_view2_260",
      "https://images.unsplash.com/photo-1556881286-fc6915169721?auto=format&fit=crop&w=800&q=80&sig=gallery_view3_260"
    ],
    "countInStock": 40,
    "rating": 4.5,
    "numReviews": 115,
    "isFeatured": true,
    "description": "Brand: Nestle | Fresh organic grocery product harvested under natural farming standards."
  },
  {
    "name": "Quaker Organic Pantry Item #16",
    "price": 605,
    "originalPrice": 726,
    "category": "Groceries",
    "image": "https://images.unsplash.com/photo-1523049673857-eb18f1d7b578?auto=format&fit=crop&w=800&q=80&sig=prod_unique_261_groceries",
    "images": [
      "https://images.unsplash.com/photo-1523049673857-eb18f1d7b578?auto=format&fit=crop&w=800&q=80&sig=prod_unique_261_groceries",
      "https://images.unsplash.com/photo-1498557850523-fd3d118b962e?auto=format&fit=crop&w=800&q=80&sig=gallery_view1_261",
      "https://images.unsplash.com/photo-1556881286-fc6915169721?auto=format&fit=crop&w=800&q=80&sig=gallery_view2_261",
      "https://images.unsplash.com/photo-1586201375761-83865001e31c?auto=format&fit=crop&w=800&q=80&sig=gallery_view3_261"
    ],
    "countInStock": 42,
    "rating": 4.6,
    "numReviews": 120,
    "isFeatured": false,
    "description": "Brand: Quaker | Fresh organic grocery product harvested under natural farming standards."
  },
  {
    "name": "Kellanova Organic Pantry Item #17",
    "price": 640,
    "originalPrice": 768,
    "category": "Groceries",
    "image": "https://images.unsplash.com/photo-1498557850523-fd3d118b962e?auto=format&fit=crop&w=800&q=80&sig=prod_unique_262_groceries",
    "images": [
      "https://images.unsplash.com/photo-1498557850523-fd3d118b962e?auto=format&fit=crop&w=800&q=80&sig=prod_unique_262_groceries",
      "https://images.unsplash.com/photo-1556881286-fc6915169721?auto=format&fit=crop&w=800&q=80&sig=gallery_view1_262",
      "https://images.unsplash.com/photo-1586201375761-83865001e31c?auto=format&fit=crop&w=800&q=80&sig=gallery_view2_262",
      "https://images.unsplash.com/photo-1523049673857-eb18f1d7b578?auto=format&fit=crop&w=800&q=80&sig=gallery_view3_262"
    ],
    "countInStock": 44,
    "rating": 4.7,
    "numReviews": 125,
    "isFeatured": false,
    "description": "Brand: Kellanova | Fresh organic grocery product harvested under natural farming standards."
  },
  {
    "name": "Tropico Organic Pantry Item #18",
    "price": 675,
    "originalPrice": 810,
    "category": "Groceries",
    "image": "https://images.unsplash.com/photo-1556881286-fc6915169721?auto=format&fit=crop&w=800&q=80&sig=prod_unique_263_groceries",
    "images": [
      "https://images.unsplash.com/photo-1556881286-fc6915169721?auto=format&fit=crop&w=800&q=80&sig=prod_unique_263_groceries",
      "https://images.unsplash.com/photo-1586201375761-83865001e31c?auto=format&fit=crop&w=800&q=80&sig=gallery_view1_263",
      "https://images.unsplash.com/photo-1523049673857-eb18f1d7b578?auto=format&fit=crop&w=800&q=80&sig=gallery_view2_263",
      "https://images.unsplash.com/photo-1498557850523-fd3d118b962e?auto=format&fit=crop&w=800&q=80&sig=gallery_view3_263"
    ],
    "countInStock": 46,
    "rating": 4.8,
    "numReviews": 130,
    "isFeatured": false,
    "description": "Brand: Tropico | Fresh organic grocery product harvested under natural farming standards."
  },
  {
    "name": "Nature Fresh Organic Pantry Item #19",
    "price": 710,
    "originalPrice": 852,
    "category": "Groceries",
    "image": "https://images.unsplash.com/photo-1586201375761-83865001e31c?auto=format&fit=crop&w=800&q=80&sig=prod_unique_264_groceries",
    "images": [
      "https://images.unsplash.com/photo-1586201375761-83865001e31c?auto=format&fit=crop&w=800&q=80&sig=prod_unique_264_groceries",
      "https://images.unsplash.com/photo-1523049673857-eb18f1d7b578?auto=format&fit=crop&w=800&q=80&sig=gallery_view1_264",
      "https://images.unsplash.com/photo-1498557850523-fd3d118b962e?auto=format&fit=crop&w=800&q=80&sig=gallery_view2_264",
      "https://images.unsplash.com/photo-1556881286-fc6915169721?auto=format&fit=crop&w=800&q=80&sig=gallery_view3_264"
    ],
    "countInStock": 48,
    "rating": 4.9,
    "numReviews": 135,
    "isFeatured": false,
    "description": "Brand: Nature Fresh | Fresh organic grocery product harvested under natural farming standards."
  },
  {
    "name": "Daawat Organic Pantry Item #20",
    "price": 745,
    "originalPrice": 894,
    "category": "Groceries",
    "image": "https://images.unsplash.com/photo-1523049673857-eb18f1d7b578?auto=format&fit=crop&w=800&q=80&sig=prod_unique_265_groceries",
    "images": [
      "https://images.unsplash.com/photo-1523049673857-eb18f1d7b578?auto=format&fit=crop&w=800&q=80&sig=prod_unique_265_groceries",
      "https://images.unsplash.com/photo-1498557850523-fd3d118b962e?auto=format&fit=crop&w=800&q=80&sig=gallery_view1_265",
      "https://images.unsplash.com/photo-1556881286-fc6915169721?auto=format&fit=crop&w=800&q=80&sig=gallery_view2_265",
      "https://images.unsplash.com/photo-1586201375761-83865001e31c?auto=format&fit=crop&w=800&q=80&sig=gallery_view3_265"
    ],
    "countInStock": 50,
    "rating": 4,
    "numReviews": 140,
    "isFeatured": true,
    "description": "Brand: Daawat | Fresh organic grocery product harvested under natural farming standards."
  },
  {
    "name": "Fortune Organic Pantry Item #21",
    "price": 780,
    "originalPrice": 936,
    "category": "Groceries",
    "image": "https://images.unsplash.com/photo-1498557850523-fd3d118b962e?auto=format&fit=crop&w=800&q=80&sig=prod_unique_266_groceries",
    "images": [
      "https://images.unsplash.com/photo-1498557850523-fd3d118b962e?auto=format&fit=crop&w=800&q=80&sig=prod_unique_266_groceries",
      "https://images.unsplash.com/photo-1556881286-fc6915169721?auto=format&fit=crop&w=800&q=80&sig=gallery_view1_266",
      "https://images.unsplash.com/photo-1586201375761-83865001e31c?auto=format&fit=crop&w=800&q=80&sig=gallery_view2_266",
      "https://images.unsplash.com/photo-1523049673857-eb18f1d7b578?auto=format&fit=crop&w=800&q=80&sig=gallery_view3_266"
    ],
    "countInStock": 52,
    "rating": 4.1,
    "numReviews": 145,
    "isFeatured": false,
    "description": "Brand: Fortune | Fresh organic grocery product harvested under natural farming standards."
  },
  {
    "name": "Amul Organic Pantry Item #22",
    "price": 815,
    "originalPrice": 978,
    "category": "Groceries",
    "image": "https://images.unsplash.com/photo-1556881286-fc6915169721?auto=format&fit=crop&w=800&q=80&sig=prod_unique_267_groceries",
    "images": [
      "https://images.unsplash.com/photo-1556881286-fc6915169721?auto=format&fit=crop&w=800&q=80&sig=prod_unique_267_groceries",
      "https://images.unsplash.com/photo-1586201375761-83865001e31c?auto=format&fit=crop&w=800&q=80&sig=gallery_view1_267",
      "https://images.unsplash.com/photo-1523049673857-eb18f1d7b578?auto=format&fit=crop&w=800&q=80&sig=gallery_view2_267",
      "https://images.unsplash.com/photo-1498557850523-fd3d118b962e?auto=format&fit=crop&w=800&q=80&sig=gallery_view3_267"
    ],
    "countInStock": 54,
    "rating": 4.2,
    "numReviews": 150,
    "isFeatured": false,
    "description": "Brand: Amul | Fresh organic grocery product harvested under natural farming standards."
  },
  {
    "name": "Organic India Organic Pantry Item #23",
    "price": 850,
    "originalPrice": 1020,
    "category": "Groceries",
    "image": "https://images.unsplash.com/photo-1586201375761-83865001e31c?auto=format&fit=crop&w=800&q=80&sig=prod_unique_268_groceries",
    "images": [
      "https://images.unsplash.com/photo-1586201375761-83865001e31c?auto=format&fit=crop&w=800&q=80&sig=prod_unique_268_groceries",
      "https://images.unsplash.com/photo-1523049673857-eb18f1d7b578?auto=format&fit=crop&w=800&q=80&sig=gallery_view1_268",
      "https://images.unsplash.com/photo-1498557850523-fd3d118b962e?auto=format&fit=crop&w=800&q=80&sig=gallery_view2_268",
      "https://images.unsplash.com/photo-1556881286-fc6915169721?auto=format&fit=crop&w=800&q=80&sig=gallery_view3_268"
    ],
    "countInStock": 56,
    "rating": 4.3,
    "numReviews": 155,
    "isFeatured": false,
    "description": "Brand: Organic India | Fresh organic grocery product harvested under natural farming standards."
  },
  {
    "name": "Tata Simply Better Organic Pantry Item #24",
    "price": 885,
    "originalPrice": 1062,
    "category": "Groceries",
    "image": "https://images.unsplash.com/photo-1523049673857-eb18f1d7b578?auto=format&fit=crop&w=800&q=80&sig=prod_unique_269_groceries",
    "images": [
      "https://images.unsplash.com/photo-1523049673857-eb18f1d7b578?auto=format&fit=crop&w=800&q=80&sig=prod_unique_269_groceries",
      "https://images.unsplash.com/photo-1498557850523-fd3d118b962e?auto=format&fit=crop&w=800&q=80&sig=gallery_view1_269",
      "https://images.unsplash.com/photo-1556881286-fc6915169721?auto=format&fit=crop&w=800&q=80&sig=gallery_view2_269",
      "https://images.unsplash.com/photo-1586201375761-83865001e31c?auto=format&fit=crop&w=800&q=80&sig=gallery_view3_269"
    ],
    "countInStock": 58,
    "rating": 4.4,
    "numReviews": 160,
    "isFeatured": false,
    "description": "Brand: Tata Simply Better | Fresh organic grocery product harvested under natural farming standards."
  },
  {
    "name": "Nestle Organic Pantry Item #25",
    "price": 920,
    "originalPrice": 1104,
    "category": "Groceries",
    "image": "https://images.unsplash.com/photo-1498557850523-fd3d118b962e?auto=format&fit=crop&w=800&q=80&sig=prod_unique_270_groceries",
    "images": [
      "https://images.unsplash.com/photo-1498557850523-fd3d118b962e?auto=format&fit=crop&w=800&q=80&sig=prod_unique_270_groceries",
      "https://images.unsplash.com/photo-1556881286-fc6915169721?auto=format&fit=crop&w=800&q=80&sig=gallery_view1_270",
      "https://images.unsplash.com/photo-1586201375761-83865001e31c?auto=format&fit=crop&w=800&q=80&sig=gallery_view2_270",
      "https://images.unsplash.com/photo-1523049673857-eb18f1d7b578?auto=format&fit=crop&w=800&q=80&sig=gallery_view3_270"
    ],
    "countInStock": 60,
    "rating": 4.5,
    "numReviews": 165,
    "isFeatured": true,
    "description": "Brand: Nestle | Fresh organic grocery product harvested under natural farming standards."
  },
  {
    "name": "Quaker Organic Pantry Item #26",
    "price": 955,
    "originalPrice": 1146,
    "category": "Groceries",
    "image": "https://images.unsplash.com/photo-1556881286-fc6915169721?auto=format&fit=crop&w=800&q=80&sig=prod_unique_271_groceries",
    "images": [
      "https://images.unsplash.com/photo-1556881286-fc6915169721?auto=format&fit=crop&w=800&q=80&sig=prod_unique_271_groceries",
      "https://images.unsplash.com/photo-1586201375761-83865001e31c?auto=format&fit=crop&w=800&q=80&sig=gallery_view1_271",
      "https://images.unsplash.com/photo-1523049673857-eb18f1d7b578?auto=format&fit=crop&w=800&q=80&sig=gallery_view2_271",
      "https://images.unsplash.com/photo-1498557850523-fd3d118b962e?auto=format&fit=crop&w=800&q=80&sig=gallery_view3_271"
    ],
    "countInStock": 62,
    "rating": 4.6,
    "numReviews": 170,
    "isFeatured": false,
    "description": "Brand: Quaker | Fresh organic grocery product harvested under natural farming standards."
  },
  {
    "name": "Kellanova Organic Pantry Item #27",
    "price": 990,
    "originalPrice": 1188,
    "category": "Groceries",
    "image": "https://images.unsplash.com/photo-1586201375761-83865001e31c?auto=format&fit=crop&w=800&q=80&sig=prod_unique_272_groceries",
    "images": [
      "https://images.unsplash.com/photo-1586201375761-83865001e31c?auto=format&fit=crop&w=800&q=80&sig=prod_unique_272_groceries",
      "https://images.unsplash.com/photo-1523049673857-eb18f1d7b578?auto=format&fit=crop&w=800&q=80&sig=gallery_view1_272",
      "https://images.unsplash.com/photo-1498557850523-fd3d118b962e?auto=format&fit=crop&w=800&q=80&sig=gallery_view2_272",
      "https://images.unsplash.com/photo-1556881286-fc6915169721?auto=format&fit=crop&w=800&q=80&sig=gallery_view3_272"
    ],
    "countInStock": 64,
    "rating": 4.7,
    "numReviews": 175,
    "isFeatured": false,
    "description": "Brand: Kellanova | Fresh organic grocery product harvested under natural farming standards."
  },
  {
    "name": "Tropico Organic Pantry Item #28",
    "price": 1025,
    "originalPrice": 1230,
    "category": "Groceries",
    "image": "https://images.unsplash.com/photo-1523049673857-eb18f1d7b578?auto=format&fit=crop&w=800&q=80&sig=prod_unique_273_groceries",
    "images": [
      "https://images.unsplash.com/photo-1523049673857-eb18f1d7b578?auto=format&fit=crop&w=800&q=80&sig=prod_unique_273_groceries",
      "https://images.unsplash.com/photo-1498557850523-fd3d118b962e?auto=format&fit=crop&w=800&q=80&sig=gallery_view1_273",
      "https://images.unsplash.com/photo-1556881286-fc6915169721?auto=format&fit=crop&w=800&q=80&sig=gallery_view2_273",
      "https://images.unsplash.com/photo-1586201375761-83865001e31c?auto=format&fit=crop&w=800&q=80&sig=gallery_view3_273"
    ],
    "countInStock": 66,
    "rating": 4.8,
    "numReviews": 180,
    "isFeatured": false,
    "description": "Brand: Tropico | Fresh organic grocery product harvested under natural farming standards."
  },
  {
    "name": "Nature Fresh Organic Pantry Item #29",
    "price": 1060,
    "originalPrice": 1272,
    "category": "Groceries",
    "image": "https://images.unsplash.com/photo-1498557850523-fd3d118b962e?auto=format&fit=crop&w=800&q=80&sig=prod_unique_274_groceries",
    "images": [
      "https://images.unsplash.com/photo-1498557850523-fd3d118b962e?auto=format&fit=crop&w=800&q=80&sig=prod_unique_274_groceries",
      "https://images.unsplash.com/photo-1556881286-fc6915169721?auto=format&fit=crop&w=800&q=80&sig=gallery_view1_274",
      "https://images.unsplash.com/photo-1586201375761-83865001e31c?auto=format&fit=crop&w=800&q=80&sig=gallery_view2_274",
      "https://images.unsplash.com/photo-1523049673857-eb18f1d7b578?auto=format&fit=crop&w=800&q=80&sig=gallery_view3_274"
    ],
    "countInStock": 68,
    "rating": 4.9,
    "numReviews": 185,
    "isFeatured": false,
    "description": "Brand: Nature Fresh | Fresh organic grocery product harvested under natural farming standards."
  },
  {
    "name": "Daawat Organic Pantry Item #30",
    "price": 1095,
    "originalPrice": 1314,
    "category": "Groceries",
    "image": "https://images.unsplash.com/photo-1556881286-fc6915169721?auto=format&fit=crop&w=800&q=80&sig=prod_unique_275_groceries",
    "images": [
      "https://images.unsplash.com/photo-1556881286-fc6915169721?auto=format&fit=crop&w=800&q=80&sig=prod_unique_275_groceries",
      "https://images.unsplash.com/photo-1586201375761-83865001e31c?auto=format&fit=crop&w=800&q=80&sig=gallery_view1_275",
      "https://images.unsplash.com/photo-1523049673857-eb18f1d7b578?auto=format&fit=crop&w=800&q=80&sig=gallery_view2_275",
      "https://images.unsplash.com/photo-1498557850523-fd3d118b962e?auto=format&fit=crop&w=800&q=80&sig=gallery_view3_275"
    ],
    "countInStock": 70,
    "rating": 4,
    "numReviews": 190,
    "isFeatured": true,
    "description": "Brand: Daawat | Fresh organic grocery product harvested under natural farming standards."
  },
  {
    "name": "Fortune Organic Pantry Item #31",
    "price": 1130,
    "originalPrice": 1356,
    "category": "Groceries",
    "image": "https://images.unsplash.com/photo-1586201375761-83865001e31c?auto=format&fit=crop&w=800&q=80&sig=prod_unique_276_groceries",
    "images": [
      "https://images.unsplash.com/photo-1586201375761-83865001e31c?auto=format&fit=crop&w=800&q=80&sig=prod_unique_276_groceries",
      "https://images.unsplash.com/photo-1523049673857-eb18f1d7b578?auto=format&fit=crop&w=800&q=80&sig=gallery_view1_276",
      "https://images.unsplash.com/photo-1498557850523-fd3d118b962e?auto=format&fit=crop&w=800&q=80&sig=gallery_view2_276",
      "https://images.unsplash.com/photo-1556881286-fc6915169721?auto=format&fit=crop&w=800&q=80&sig=gallery_view3_276"
    ],
    "countInStock": 72,
    "rating": 4.1,
    "numReviews": 195,
    "isFeatured": false,
    "description": "Brand: Fortune | Fresh organic grocery product harvested under natural farming standards."
  },
  {
    "name": "Amul Organic Pantry Item #32",
    "price": 1165,
    "originalPrice": 1398,
    "category": "Groceries",
    "image": "https://images.unsplash.com/photo-1523049673857-eb18f1d7b578?auto=format&fit=crop&w=800&q=80&sig=prod_unique_277_groceries",
    "images": [
      "https://images.unsplash.com/photo-1523049673857-eb18f1d7b578?auto=format&fit=crop&w=800&q=80&sig=prod_unique_277_groceries",
      "https://images.unsplash.com/photo-1498557850523-fd3d118b962e?auto=format&fit=crop&w=800&q=80&sig=gallery_view1_277",
      "https://images.unsplash.com/photo-1556881286-fc6915169721?auto=format&fit=crop&w=800&q=80&sig=gallery_view2_277",
      "https://images.unsplash.com/photo-1586201375761-83865001e31c?auto=format&fit=crop&w=800&q=80&sig=gallery_view3_277"
    ],
    "countInStock": 74,
    "rating": 4.2,
    "numReviews": 200,
    "isFeatured": false,
    "description": "Brand: Amul | Fresh organic grocery product harvested under natural farming standards."
  },
  {
    "name": "Organic India Organic Pantry Item #33",
    "price": 1200,
    "originalPrice": 1440,
    "category": "Groceries",
    "image": "https://images.unsplash.com/photo-1498557850523-fd3d118b962e?auto=format&fit=crop&w=800&q=80&sig=prod_unique_278_groceries",
    "images": [
      "https://images.unsplash.com/photo-1498557850523-fd3d118b962e?auto=format&fit=crop&w=800&q=80&sig=prod_unique_278_groceries",
      "https://images.unsplash.com/photo-1556881286-fc6915169721?auto=format&fit=crop&w=800&q=80&sig=gallery_view1_278",
      "https://images.unsplash.com/photo-1586201375761-83865001e31c?auto=format&fit=crop&w=800&q=80&sig=gallery_view2_278",
      "https://images.unsplash.com/photo-1523049673857-eb18f1d7b578?auto=format&fit=crop&w=800&q=80&sig=gallery_view3_278"
    ],
    "countInStock": 76,
    "rating": 4.3,
    "numReviews": 205,
    "isFeatured": false,
    "description": "Brand: Organic India | Fresh organic grocery product harvested under natural farming standards."
  },
  {
    "name": "Tata Simply Better Organic Pantry Item #34",
    "price": 1235,
    "originalPrice": 1482,
    "category": "Groceries",
    "image": "https://images.unsplash.com/photo-1556881286-fc6915169721?auto=format&fit=crop&w=800&q=80&sig=prod_unique_279_groceries",
    "images": [
      "https://images.unsplash.com/photo-1556881286-fc6915169721?auto=format&fit=crop&w=800&q=80&sig=prod_unique_279_groceries",
      "https://images.unsplash.com/photo-1586201375761-83865001e31c?auto=format&fit=crop&w=800&q=80&sig=gallery_view1_279",
      "https://images.unsplash.com/photo-1523049673857-eb18f1d7b578?auto=format&fit=crop&w=800&q=80&sig=gallery_view2_279",
      "https://images.unsplash.com/photo-1498557850523-fd3d118b962e?auto=format&fit=crop&w=800&q=80&sig=gallery_view3_279"
    ],
    "countInStock": 78,
    "rating": 4.4,
    "numReviews": 210,
    "isFeatured": false,
    "description": "Brand: Tata Simply Better | Fresh organic grocery product harvested under natural farming standards."
  },
  {
    "name": "Nestle Organic Pantry Item #35",
    "price": 1270,
    "originalPrice": 1524,
    "category": "Groceries",
    "image": "https://images.unsplash.com/photo-1586201375761-83865001e31c?auto=format&fit=crop&w=800&q=80&sig=prod_unique_280_groceries",
    "images": [
      "https://images.unsplash.com/photo-1586201375761-83865001e31c?auto=format&fit=crop&w=800&q=80&sig=prod_unique_280_groceries",
      "https://images.unsplash.com/photo-1523049673857-eb18f1d7b578?auto=format&fit=crop&w=800&q=80&sig=gallery_view1_280",
      "https://images.unsplash.com/photo-1498557850523-fd3d118b962e?auto=format&fit=crop&w=800&q=80&sig=gallery_view2_280",
      "https://images.unsplash.com/photo-1556881286-fc6915169721?auto=format&fit=crop&w=800&q=80&sig=gallery_view3_280"
    ],
    "countInStock": 80,
    "rating": 4.5,
    "numReviews": 215,
    "isFeatured": true,
    "description": "Brand: Nestle | Fresh organic grocery product harvested under natural farming standards."
  },
  {
    "name": "Quaker Organic Pantry Item #36",
    "price": 1305,
    "originalPrice": 1566,
    "category": "Groceries",
    "image": "https://images.unsplash.com/photo-1523049673857-eb18f1d7b578?auto=format&fit=crop&w=800&q=80&sig=prod_unique_281_groceries",
    "images": [
      "https://images.unsplash.com/photo-1523049673857-eb18f1d7b578?auto=format&fit=crop&w=800&q=80&sig=prod_unique_281_groceries",
      "https://images.unsplash.com/photo-1498557850523-fd3d118b962e?auto=format&fit=crop&w=800&q=80&sig=gallery_view1_281",
      "https://images.unsplash.com/photo-1556881286-fc6915169721?auto=format&fit=crop&w=800&q=80&sig=gallery_view2_281",
      "https://images.unsplash.com/photo-1586201375761-83865001e31c?auto=format&fit=crop&w=800&q=80&sig=gallery_view3_281"
    ],
    "countInStock": 82,
    "rating": 4.6,
    "numReviews": 220,
    "isFeatured": false,
    "description": "Brand: Quaker | Fresh organic grocery product harvested under natural farming standards."
  },
  {
    "name": "Kellanova Organic Pantry Item #37",
    "price": 1340,
    "originalPrice": 1608,
    "category": "Groceries",
    "image": "https://images.unsplash.com/photo-1498557850523-fd3d118b962e?auto=format&fit=crop&w=800&q=80&sig=prod_unique_282_groceries",
    "images": [
      "https://images.unsplash.com/photo-1498557850523-fd3d118b962e?auto=format&fit=crop&w=800&q=80&sig=prod_unique_282_groceries",
      "https://images.unsplash.com/photo-1556881286-fc6915169721?auto=format&fit=crop&w=800&q=80&sig=gallery_view1_282",
      "https://images.unsplash.com/photo-1586201375761-83865001e31c?auto=format&fit=crop&w=800&q=80&sig=gallery_view2_282",
      "https://images.unsplash.com/photo-1523049673857-eb18f1d7b578?auto=format&fit=crop&w=800&q=80&sig=gallery_view3_282"
    ],
    "countInStock": 84,
    "rating": 4.7,
    "numReviews": 225,
    "isFeatured": false,
    "description": "Brand: Kellanova | Fresh organic grocery product harvested under natural farming standards."
  },
  {
    "name": "Tropico Organic Pantry Item #38",
    "price": 1375,
    "originalPrice": 1650,
    "category": "Groceries",
    "image": "https://images.unsplash.com/photo-1556881286-fc6915169721?auto=format&fit=crop&w=800&q=80&sig=prod_unique_283_groceries",
    "images": [
      "https://images.unsplash.com/photo-1556881286-fc6915169721?auto=format&fit=crop&w=800&q=80&sig=prod_unique_283_groceries",
      "https://images.unsplash.com/photo-1586201375761-83865001e31c?auto=format&fit=crop&w=800&q=80&sig=gallery_view1_283",
      "https://images.unsplash.com/photo-1523049673857-eb18f1d7b578?auto=format&fit=crop&w=800&q=80&sig=gallery_view2_283",
      "https://images.unsplash.com/photo-1498557850523-fd3d118b962e?auto=format&fit=crop&w=800&q=80&sig=gallery_view3_283"
    ],
    "countInStock": 86,
    "rating": 4.8,
    "numReviews": 230,
    "isFeatured": false,
    "description": "Brand: Tropico | Fresh organic grocery product harvested under natural farming standards."
  },
  {
    "name": "Nature Fresh Organic Pantry Item #39",
    "price": 1410,
    "originalPrice": 1692,
    "category": "Groceries",
    "image": "https://images.unsplash.com/photo-1586201375761-83865001e31c?auto=format&fit=crop&w=800&q=80&sig=prod_unique_284_groceries",
    "images": [
      "https://images.unsplash.com/photo-1586201375761-83865001e31c?auto=format&fit=crop&w=800&q=80&sig=prod_unique_284_groceries",
      "https://images.unsplash.com/photo-1523049673857-eb18f1d7b578?auto=format&fit=crop&w=800&q=80&sig=gallery_view1_284",
      "https://images.unsplash.com/photo-1498557850523-fd3d118b962e?auto=format&fit=crop&w=800&q=80&sig=gallery_view2_284",
      "https://images.unsplash.com/photo-1556881286-fc6915169721?auto=format&fit=crop&w=800&q=80&sig=gallery_view3_284"
    ],
    "countInStock": 88,
    "rating": 4.9,
    "numReviews": 235,
    "isFeatured": false,
    "description": "Brand: Nature Fresh | Fresh organic grocery product harvested under natural farming standards."
  },
  {
    "name": "Daawat Organic Pantry Item #40",
    "price": 1445,
    "originalPrice": 1734,
    "category": "Groceries",
    "image": "https://images.unsplash.com/photo-1523049673857-eb18f1d7b578?auto=format&fit=crop&w=800&q=80&sig=prod_unique_285_groceries",
    "images": [
      "https://images.unsplash.com/photo-1523049673857-eb18f1d7b578?auto=format&fit=crop&w=800&q=80&sig=prod_unique_285_groceries",
      "https://images.unsplash.com/photo-1498557850523-fd3d118b962e?auto=format&fit=crop&w=800&q=80&sig=gallery_view1_285",
      "https://images.unsplash.com/photo-1556881286-fc6915169721?auto=format&fit=crop&w=800&q=80&sig=gallery_view2_285",
      "https://images.unsplash.com/photo-1586201375761-83865001e31c?auto=format&fit=crop&w=800&q=80&sig=gallery_view3_285"
    ],
    "countInStock": 90,
    "rating": 4,
    "numReviews": 240,
    "isFeatured": true,
    "description": "Brand: Daawat | Fresh organic grocery product harvested under natural farming standards."
  },
  {
    "name": "Fortune Organic Pantry Item #41",
    "price": 1480,
    "originalPrice": 1776,
    "category": "Groceries",
    "image": "https://images.unsplash.com/photo-1498557850523-fd3d118b962e?auto=format&fit=crop&w=800&q=80&sig=prod_unique_286_groceries",
    "images": [
      "https://images.unsplash.com/photo-1498557850523-fd3d118b962e?auto=format&fit=crop&w=800&q=80&sig=prod_unique_286_groceries",
      "https://images.unsplash.com/photo-1556881286-fc6915169721?auto=format&fit=crop&w=800&q=80&sig=gallery_view1_286",
      "https://images.unsplash.com/photo-1586201375761-83865001e31c?auto=format&fit=crop&w=800&q=80&sig=gallery_view2_286",
      "https://images.unsplash.com/photo-1523049673857-eb18f1d7b578?auto=format&fit=crop&w=800&q=80&sig=gallery_view3_286"
    ],
    "countInStock": 92,
    "rating": 4.1,
    "numReviews": 245,
    "isFeatured": false,
    "description": "Brand: Fortune | Fresh organic grocery product harvested under natural farming standards."
  },
  {
    "name": "Amul Organic Pantry Item #42",
    "price": 1515,
    "originalPrice": 1818,
    "category": "Groceries",
    "image": "https://images.unsplash.com/photo-1556881286-fc6915169721?auto=format&fit=crop&w=800&q=80&sig=prod_unique_287_groceries",
    "images": [
      "https://images.unsplash.com/photo-1556881286-fc6915169721?auto=format&fit=crop&w=800&q=80&sig=prod_unique_287_groceries",
      "https://images.unsplash.com/photo-1586201375761-83865001e31c?auto=format&fit=crop&w=800&q=80&sig=gallery_view1_287",
      "https://images.unsplash.com/photo-1523049673857-eb18f1d7b578?auto=format&fit=crop&w=800&q=80&sig=gallery_view2_287",
      "https://images.unsplash.com/photo-1498557850523-fd3d118b962e?auto=format&fit=crop&w=800&q=80&sig=gallery_view3_287"
    ],
    "countInStock": 94,
    "rating": 4.2,
    "numReviews": 250,
    "isFeatured": false,
    "description": "Brand: Amul | Fresh organic grocery product harvested under natural farming standards."
  },
  {
    "name": "Organic India Organic Pantry Item #43",
    "price": 1550,
    "originalPrice": 1860,
    "category": "Groceries",
    "image": "https://images.unsplash.com/photo-1586201375761-83865001e31c?auto=format&fit=crop&w=800&q=80&sig=prod_unique_288_groceries",
    "images": [
      "https://images.unsplash.com/photo-1586201375761-83865001e31c?auto=format&fit=crop&w=800&q=80&sig=prod_unique_288_groceries",
      "https://images.unsplash.com/photo-1523049673857-eb18f1d7b578?auto=format&fit=crop&w=800&q=80&sig=gallery_view1_288",
      "https://images.unsplash.com/photo-1498557850523-fd3d118b962e?auto=format&fit=crop&w=800&q=80&sig=gallery_view2_288",
      "https://images.unsplash.com/photo-1556881286-fc6915169721?auto=format&fit=crop&w=800&q=80&sig=gallery_view3_288"
    ],
    "countInStock": 96,
    "rating": 4.3,
    "numReviews": 255,
    "isFeatured": false,
    "description": "Brand: Organic India | Fresh organic grocery product harvested under natural farming standards."
  },
  {
    "name": "Tata Simply Better Organic Pantry Item #44",
    "price": 1585,
    "originalPrice": 1902,
    "category": "Groceries",
    "image": "https://images.unsplash.com/photo-1523049673857-eb18f1d7b578?auto=format&fit=crop&w=800&q=80&sig=prod_unique_289_groceries",
    "images": [
      "https://images.unsplash.com/photo-1523049673857-eb18f1d7b578?auto=format&fit=crop&w=800&q=80&sig=prod_unique_289_groceries",
      "https://images.unsplash.com/photo-1498557850523-fd3d118b962e?auto=format&fit=crop&w=800&q=80&sig=gallery_view1_289",
      "https://images.unsplash.com/photo-1556881286-fc6915169721?auto=format&fit=crop&w=800&q=80&sig=gallery_view2_289",
      "https://images.unsplash.com/photo-1586201375761-83865001e31c?auto=format&fit=crop&w=800&q=80&sig=gallery_view3_289"
    ],
    "countInStock": 98,
    "rating": 4.4,
    "numReviews": 260,
    "isFeatured": false,
    "description": "Brand: Tata Simply Better | Fresh organic grocery product harvested under natural farming standards."
  },
  {
    "name": "Nestle Organic Pantry Item #45",
    "price": 1620,
    "originalPrice": 1944,
    "category": "Groceries",
    "image": "https://images.unsplash.com/photo-1498557850523-fd3d118b962e?auto=format&fit=crop&w=800&q=80&sig=prod_unique_290_groceries",
    "images": [
      "https://images.unsplash.com/photo-1498557850523-fd3d118b962e?auto=format&fit=crop&w=800&q=80&sig=prod_unique_290_groceries",
      "https://images.unsplash.com/photo-1556881286-fc6915169721?auto=format&fit=crop&w=800&q=80&sig=gallery_view1_290",
      "https://images.unsplash.com/photo-1586201375761-83865001e31c?auto=format&fit=crop&w=800&q=80&sig=gallery_view2_290",
      "https://images.unsplash.com/photo-1523049673857-eb18f1d7b578?auto=format&fit=crop&w=800&q=80&sig=gallery_view3_290"
    ],
    "countInStock": 100,
    "rating": 4.5,
    "numReviews": 265,
    "isFeatured": true,
    "description": "Brand: Nestle | Fresh organic grocery product harvested under natural farming standards."
  },
  {
    "name": "Quaker Organic Pantry Item #46",
    "price": 1655,
    "originalPrice": 1986,
    "category": "Groceries",
    "image": "https://images.unsplash.com/photo-1556881286-fc6915169721?auto=format&fit=crop&w=800&q=80&sig=prod_unique_291_groceries",
    "images": [
      "https://images.unsplash.com/photo-1556881286-fc6915169721?auto=format&fit=crop&w=800&q=80&sig=prod_unique_291_groceries",
      "https://images.unsplash.com/photo-1586201375761-83865001e31c?auto=format&fit=crop&w=800&q=80&sig=gallery_view1_291",
      "https://images.unsplash.com/photo-1523049673857-eb18f1d7b578?auto=format&fit=crop&w=800&q=80&sig=gallery_view2_291",
      "https://images.unsplash.com/photo-1498557850523-fd3d118b962e?auto=format&fit=crop&w=800&q=80&sig=gallery_view3_291"
    ],
    "countInStock": 102,
    "rating": 4.6,
    "numReviews": 270,
    "isFeatured": false,
    "description": "Brand: Quaker | Fresh organic grocery product harvested under natural farming standards."
  },
  {
    "name": "Kellanova Organic Pantry Item #47",
    "price": 1690,
    "originalPrice": 2028,
    "category": "Groceries",
    "image": "https://images.unsplash.com/photo-1586201375761-83865001e31c?auto=format&fit=crop&w=800&q=80&sig=prod_unique_292_groceries",
    "images": [
      "https://images.unsplash.com/photo-1586201375761-83865001e31c?auto=format&fit=crop&w=800&q=80&sig=prod_unique_292_groceries",
      "https://images.unsplash.com/photo-1523049673857-eb18f1d7b578?auto=format&fit=crop&w=800&q=80&sig=gallery_view1_292",
      "https://images.unsplash.com/photo-1498557850523-fd3d118b962e?auto=format&fit=crop&w=800&q=80&sig=gallery_view2_292",
      "https://images.unsplash.com/photo-1556881286-fc6915169721?auto=format&fit=crop&w=800&q=80&sig=gallery_view3_292"
    ],
    "countInStock": 104,
    "rating": 4.7,
    "numReviews": 275,
    "isFeatured": false,
    "description": "Brand: Kellanova | Fresh organic grocery product harvested under natural farming standards."
  },
  {
    "name": "Tropico Organic Pantry Item #48",
    "price": 1725,
    "originalPrice": 2070,
    "category": "Groceries",
    "image": "https://images.unsplash.com/photo-1523049673857-eb18f1d7b578?auto=format&fit=crop&w=800&q=80&sig=prod_unique_293_groceries",
    "images": [
      "https://images.unsplash.com/photo-1523049673857-eb18f1d7b578?auto=format&fit=crop&w=800&q=80&sig=prod_unique_293_groceries",
      "https://images.unsplash.com/photo-1498557850523-fd3d118b962e?auto=format&fit=crop&w=800&q=80&sig=gallery_view1_293",
      "https://images.unsplash.com/photo-1556881286-fc6915169721?auto=format&fit=crop&w=800&q=80&sig=gallery_view2_293",
      "https://images.unsplash.com/photo-1586201375761-83865001e31c?auto=format&fit=crop&w=800&q=80&sig=gallery_view3_293"
    ],
    "countInStock": 106,
    "rating": 4.8,
    "numReviews": 280,
    "isFeatured": false,
    "description": "Brand: Tropico | Fresh organic grocery product harvested under natural farming standards."
  },
  {
    "name": "Nature Fresh Organic Pantry Item #49",
    "price": 1760,
    "originalPrice": 2112,
    "category": "Groceries",
    "image": "https://images.unsplash.com/photo-1498557850523-fd3d118b962e?auto=format&fit=crop&w=800&q=80&sig=prod_unique_294_groceries",
    "images": [
      "https://images.unsplash.com/photo-1498557850523-fd3d118b962e?auto=format&fit=crop&w=800&q=80&sig=prod_unique_294_groceries",
      "https://images.unsplash.com/photo-1556881286-fc6915169721?auto=format&fit=crop&w=800&q=80&sig=gallery_view1_294",
      "https://images.unsplash.com/photo-1586201375761-83865001e31c?auto=format&fit=crop&w=800&q=80&sig=gallery_view2_294",
      "https://images.unsplash.com/photo-1523049673857-eb18f1d7b578?auto=format&fit=crop&w=800&q=80&sig=gallery_view3_294"
    ],
    "countInStock": 108,
    "rating": 4.9,
    "numReviews": 285,
    "isFeatured": false,
    "description": "Brand: Nature Fresh | Fresh organic grocery product harvested under natural farming standards."
  },
  {
    "name": "Daawat Organic Pantry Item #50",
    "price": 1795,
    "originalPrice": 2154,
    "category": "Groceries",
    "image": "https://images.unsplash.com/photo-1556881286-fc6915169721?auto=format&fit=crop&w=800&q=80&sig=prod_unique_295_groceries",
    "images": [
      "https://images.unsplash.com/photo-1556881286-fc6915169721?auto=format&fit=crop&w=800&q=80&sig=prod_unique_295_groceries",
      "https://images.unsplash.com/photo-1586201375761-83865001e31c?auto=format&fit=crop&w=800&q=80&sig=gallery_view1_295",
      "https://images.unsplash.com/photo-1523049673857-eb18f1d7b578?auto=format&fit=crop&w=800&q=80&sig=gallery_view2_295",
      "https://images.unsplash.com/photo-1498557850523-fd3d118b962e?auto=format&fit=crop&w=800&q=80&sig=gallery_view3_295"
    ],
    "countInStock": 110,
    "rating": 4,
    "numReviews": 290,
    "isFeatured": true,
    "description": "Brand: Daawat | Fresh organic grocery product harvested under natural farming standards."
  },
  {
    "name": "Fortune Organic Pantry Item #51",
    "price": 1830,
    "originalPrice": 2196,
    "category": "Groceries",
    "image": "https://images.unsplash.com/photo-1586201375761-83865001e31c?auto=format&fit=crop&w=800&q=80&sig=prod_unique_296_groceries",
    "images": [
      "https://images.unsplash.com/photo-1586201375761-83865001e31c?auto=format&fit=crop&w=800&q=80&sig=prod_unique_296_groceries",
      "https://images.unsplash.com/photo-1523049673857-eb18f1d7b578?auto=format&fit=crop&w=800&q=80&sig=gallery_view1_296",
      "https://images.unsplash.com/photo-1498557850523-fd3d118b962e?auto=format&fit=crop&w=800&q=80&sig=gallery_view2_296",
      "https://images.unsplash.com/photo-1556881286-fc6915169721?auto=format&fit=crop&w=800&q=80&sig=gallery_view3_296"
    ],
    "countInStock": 112,
    "rating": 4.1,
    "numReviews": 295,
    "isFeatured": false,
    "description": "Brand: Fortune | Fresh organic grocery product harvested under natural farming standards."
  },
  {
    "name": "Amul Organic Pantry Item #52",
    "price": 1865,
    "originalPrice": 2238,
    "category": "Groceries",
    "image": "https://images.unsplash.com/photo-1523049673857-eb18f1d7b578?auto=format&fit=crop&w=800&q=80&sig=prod_unique_297_groceries",
    "images": [
      "https://images.unsplash.com/photo-1523049673857-eb18f1d7b578?auto=format&fit=crop&w=800&q=80&sig=prod_unique_297_groceries",
      "https://images.unsplash.com/photo-1498557850523-fd3d118b962e?auto=format&fit=crop&w=800&q=80&sig=gallery_view1_297",
      "https://images.unsplash.com/photo-1556881286-fc6915169721?auto=format&fit=crop&w=800&q=80&sig=gallery_view2_297",
      "https://images.unsplash.com/photo-1586201375761-83865001e31c?auto=format&fit=crop&w=800&q=80&sig=gallery_view3_297"
    ],
    "countInStock": 114,
    "rating": 4.2,
    "numReviews": 300,
    "isFeatured": false,
    "description": "Brand: Amul | Fresh organic grocery product harvested under natural farming standards."
  },
  {
    "name": "Organic India Organic Pantry Item #53",
    "price": 1900,
    "originalPrice": 2280,
    "category": "Groceries",
    "image": "https://images.unsplash.com/photo-1498557850523-fd3d118b962e?auto=format&fit=crop&w=800&q=80&sig=prod_unique_298_groceries",
    "images": [
      "https://images.unsplash.com/photo-1498557850523-fd3d118b962e?auto=format&fit=crop&w=800&q=80&sig=prod_unique_298_groceries",
      "https://images.unsplash.com/photo-1556881286-fc6915169721?auto=format&fit=crop&w=800&q=80&sig=gallery_view1_298",
      "https://images.unsplash.com/photo-1586201375761-83865001e31c?auto=format&fit=crop&w=800&q=80&sig=gallery_view2_298",
      "https://images.unsplash.com/photo-1523049673857-eb18f1d7b578?auto=format&fit=crop&w=800&q=80&sig=gallery_view3_298"
    ],
    "countInStock": 116,
    "rating": 4.3,
    "numReviews": 305,
    "isFeatured": false,
    "description": "Brand: Organic India | Fresh organic grocery product harvested under natural farming standards."
  },
  {
    "name": "Tata Simply Better Organic Pantry Item #54",
    "price": 1935,
    "originalPrice": 2322,
    "category": "Groceries",
    "image": "https://images.unsplash.com/photo-1556881286-fc6915169721?auto=format&fit=crop&w=800&q=80&sig=prod_unique_299_groceries",
    "images": [
      "https://images.unsplash.com/photo-1556881286-fc6915169721?auto=format&fit=crop&w=800&q=80&sig=prod_unique_299_groceries",
      "https://images.unsplash.com/photo-1586201375761-83865001e31c?auto=format&fit=crop&w=800&q=80&sig=gallery_view1_299",
      "https://images.unsplash.com/photo-1523049673857-eb18f1d7b578?auto=format&fit=crop&w=800&q=80&sig=gallery_view2_299",
      "https://images.unsplash.com/photo-1498557850523-fd3d118b962e?auto=format&fit=crop&w=800&q=80&sig=gallery_view3_299"
    ],
    "countInStock": 118,
    "rating": 4.4,
    "numReviews": 310,
    "isFeatured": false,
    "description": "Brand: Tata Simply Better | Fresh organic grocery product harvested under natural farming standards."
  },
  {
    "name": "Nestle Organic Pantry Item #55",
    "price": 1970,
    "originalPrice": 2364,
    "category": "Groceries",
    "image": "https://images.unsplash.com/photo-1586201375761-83865001e31c?auto=format&fit=crop&w=800&q=80&sig=prod_unique_300_groceries",
    "images": [
      "https://images.unsplash.com/photo-1586201375761-83865001e31c?auto=format&fit=crop&w=800&q=80&sig=prod_unique_300_groceries",
      "https://images.unsplash.com/photo-1523049673857-eb18f1d7b578?auto=format&fit=crop&w=800&q=80&sig=gallery_view1_300",
      "https://images.unsplash.com/photo-1498557850523-fd3d118b962e?auto=format&fit=crop&w=800&q=80&sig=gallery_view2_300",
      "https://images.unsplash.com/photo-1556881286-fc6915169721?auto=format&fit=crop&w=800&q=80&sig=gallery_view3_300"
    ],
    "countInStock": 120,
    "rating": 4.5,
    "numReviews": 315,
    "isFeatured": true,
    "description": "Brand: Nestle | Fresh organic grocery product harvested under natural farming standards."
  },
  {
    "name": "Quaker Organic Pantry Item #56",
    "price": 2005,
    "originalPrice": 2406,
    "category": "Groceries",
    "image": "https://images.unsplash.com/photo-1523049673857-eb18f1d7b578?auto=format&fit=crop&w=800&q=80&sig=prod_unique_301_groceries",
    "images": [
      "https://images.unsplash.com/photo-1523049673857-eb18f1d7b578?auto=format&fit=crop&w=800&q=80&sig=prod_unique_301_groceries",
      "https://images.unsplash.com/photo-1498557850523-fd3d118b962e?auto=format&fit=crop&w=800&q=80&sig=gallery_view1_301",
      "https://images.unsplash.com/photo-1556881286-fc6915169721?auto=format&fit=crop&w=800&q=80&sig=gallery_view2_301",
      "https://images.unsplash.com/photo-1586201375761-83865001e31c?auto=format&fit=crop&w=800&q=80&sig=gallery_view3_301"
    ],
    "countInStock": 122,
    "rating": 4.6,
    "numReviews": 320,
    "isFeatured": false,
    "description": "Brand: Quaker | Fresh organic grocery product harvested under natural farming standards."
  },
  {
    "name": "Kellanova Organic Pantry Item #57",
    "price": 2040,
    "originalPrice": 2448,
    "category": "Groceries",
    "image": "https://images.unsplash.com/photo-1498557850523-fd3d118b962e?auto=format&fit=crop&w=800&q=80&sig=prod_unique_302_groceries",
    "images": [
      "https://images.unsplash.com/photo-1498557850523-fd3d118b962e?auto=format&fit=crop&w=800&q=80&sig=prod_unique_302_groceries",
      "https://images.unsplash.com/photo-1556881286-fc6915169721?auto=format&fit=crop&w=800&q=80&sig=gallery_view1_302",
      "https://images.unsplash.com/photo-1586201375761-83865001e31c?auto=format&fit=crop&w=800&q=80&sig=gallery_view2_302",
      "https://images.unsplash.com/photo-1523049673857-eb18f1d7b578?auto=format&fit=crop&w=800&q=80&sig=gallery_view3_302"
    ],
    "countInStock": 124,
    "rating": 4.7,
    "numReviews": 325,
    "isFeatured": false,
    "description": "Brand: Kellanova | Fresh organic grocery product harvested under natural farming standards."
  },
  {
    "name": "Tropico Organic Pantry Item #58",
    "price": 2075,
    "originalPrice": 2490,
    "category": "Groceries",
    "image": "https://images.unsplash.com/photo-1556881286-fc6915169721?auto=format&fit=crop&w=800&q=80&sig=prod_unique_303_groceries",
    "images": [
      "https://images.unsplash.com/photo-1556881286-fc6915169721?auto=format&fit=crop&w=800&q=80&sig=prod_unique_303_groceries",
      "https://images.unsplash.com/photo-1586201375761-83865001e31c?auto=format&fit=crop&w=800&q=80&sig=gallery_view1_303",
      "https://images.unsplash.com/photo-1523049673857-eb18f1d7b578?auto=format&fit=crop&w=800&q=80&sig=gallery_view2_303",
      "https://images.unsplash.com/photo-1498557850523-fd3d118b962e?auto=format&fit=crop&w=800&q=80&sig=gallery_view3_303"
    ],
    "countInStock": 126,
    "rating": 4.8,
    "numReviews": 330,
    "isFeatured": false,
    "description": "Brand: Tropico | Fresh organic grocery product harvested under natural farming standards."
  },
  {
    "name": "Nature Fresh Organic Pantry Item #59",
    "price": 2110,
    "originalPrice": 2532,
    "category": "Groceries",
    "image": "https://images.unsplash.com/photo-1586201375761-83865001e31c?auto=format&fit=crop&w=800&q=80&sig=prod_unique_304_groceries",
    "images": [
      "https://images.unsplash.com/photo-1586201375761-83865001e31c?auto=format&fit=crop&w=800&q=80&sig=prod_unique_304_groceries",
      "https://images.unsplash.com/photo-1523049673857-eb18f1d7b578?auto=format&fit=crop&w=800&q=80&sig=gallery_view1_304",
      "https://images.unsplash.com/photo-1498557850523-fd3d118b962e?auto=format&fit=crop&w=800&q=80&sig=gallery_view2_304",
      "https://images.unsplash.com/photo-1556881286-fc6915169721?auto=format&fit=crop&w=800&q=80&sig=gallery_view3_304"
    ],
    "countInStock": 128,
    "rating": 4.9,
    "numReviews": 335,
    "isFeatured": false,
    "description": "Brand: Nature Fresh | Fresh organic grocery product harvested under natural farming standards."
  },
  {
    "name": "Daawat Organic Pantry Item #60",
    "price": 2145,
    "originalPrice": 2574,
    "category": "Groceries",
    "image": "https://images.unsplash.com/photo-1523049673857-eb18f1d7b578?auto=format&fit=crop&w=800&q=80&sig=prod_unique_305_groceries",
    "images": [
      "https://images.unsplash.com/photo-1523049673857-eb18f1d7b578?auto=format&fit=crop&w=800&q=80&sig=prod_unique_305_groceries",
      "https://images.unsplash.com/photo-1498557850523-fd3d118b962e?auto=format&fit=crop&w=800&q=80&sig=gallery_view1_305",
      "https://images.unsplash.com/photo-1556881286-fc6915169721?auto=format&fit=crop&w=800&q=80&sig=gallery_view2_305",
      "https://images.unsplash.com/photo-1586201375761-83865001e31c?auto=format&fit=crop&w=800&q=80&sig=gallery_view3_305"
    ],
    "countInStock": 130,
    "rating": 4,
    "numReviews": 340,
    "isFeatured": true,
    "description": "Brand: Daawat | Fresh organic grocery product harvested under natural farming standards."
  },
  {
    "name": "Fortune Organic Pantry Item #61",
    "price": 2180,
    "originalPrice": 2616,
    "category": "Groceries",
    "image": "https://images.unsplash.com/photo-1498557850523-fd3d118b962e?auto=format&fit=crop&w=800&q=80&sig=prod_unique_306_groceries",
    "images": [
      "https://images.unsplash.com/photo-1498557850523-fd3d118b962e?auto=format&fit=crop&w=800&q=80&sig=prod_unique_306_groceries",
      "https://images.unsplash.com/photo-1556881286-fc6915169721?auto=format&fit=crop&w=800&q=80&sig=gallery_view1_306",
      "https://images.unsplash.com/photo-1586201375761-83865001e31c?auto=format&fit=crop&w=800&q=80&sig=gallery_view2_306",
      "https://images.unsplash.com/photo-1523049673857-eb18f1d7b578?auto=format&fit=crop&w=800&q=80&sig=gallery_view3_306"
    ],
    "countInStock": 132,
    "rating": 4.1,
    "numReviews": 345,
    "isFeatured": false,
    "description": "Brand: Fortune | Fresh organic grocery product harvested under natural farming standards."
  },
  {
    "name": "Amul Organic Pantry Item #62",
    "price": 2215,
    "originalPrice": 2658,
    "category": "Groceries",
    "image": "https://images.unsplash.com/photo-1556881286-fc6915169721?auto=format&fit=crop&w=800&q=80&sig=prod_unique_307_groceries",
    "images": [
      "https://images.unsplash.com/photo-1556881286-fc6915169721?auto=format&fit=crop&w=800&q=80&sig=prod_unique_307_groceries",
      "https://images.unsplash.com/photo-1586201375761-83865001e31c?auto=format&fit=crop&w=800&q=80&sig=gallery_view1_307",
      "https://images.unsplash.com/photo-1523049673857-eb18f1d7b578?auto=format&fit=crop&w=800&q=80&sig=gallery_view2_307",
      "https://images.unsplash.com/photo-1498557850523-fd3d118b962e?auto=format&fit=crop&w=800&q=80&sig=gallery_view3_307"
    ],
    "countInStock": 134,
    "rating": 4.2,
    "numReviews": 350,
    "isFeatured": false,
    "description": "Brand: Amul | Fresh organic grocery product harvested under natural farming standards."
  },
  {
    "name": "Organic India Organic Pantry Item #63",
    "price": 2250,
    "originalPrice": 2700,
    "category": "Groceries",
    "image": "https://images.unsplash.com/photo-1586201375761-83865001e31c?auto=format&fit=crop&w=800&q=80&sig=prod_unique_308_groceries",
    "images": [
      "https://images.unsplash.com/photo-1586201375761-83865001e31c?auto=format&fit=crop&w=800&q=80&sig=prod_unique_308_groceries",
      "https://images.unsplash.com/photo-1523049673857-eb18f1d7b578?auto=format&fit=crop&w=800&q=80&sig=gallery_view1_308",
      "https://images.unsplash.com/photo-1498557850523-fd3d118b962e?auto=format&fit=crop&w=800&q=80&sig=gallery_view2_308",
      "https://images.unsplash.com/photo-1556881286-fc6915169721?auto=format&fit=crop&w=800&q=80&sig=gallery_view3_308"
    ],
    "countInStock": 136,
    "rating": 4.3,
    "numReviews": 355,
    "isFeatured": false,
    "description": "Brand: Organic India | Fresh organic grocery product harvested under natural farming standards."
  },
  {
    "name": "Tata Simply Better Organic Pantry Item #64",
    "price": 2285,
    "originalPrice": 2742,
    "category": "Groceries",
    "image": "https://images.unsplash.com/photo-1523049673857-eb18f1d7b578?auto=format&fit=crop&w=800&q=80&sig=prod_unique_309_groceries",
    "images": [
      "https://images.unsplash.com/photo-1523049673857-eb18f1d7b578?auto=format&fit=crop&w=800&q=80&sig=prod_unique_309_groceries",
      "https://images.unsplash.com/photo-1498557850523-fd3d118b962e?auto=format&fit=crop&w=800&q=80&sig=gallery_view1_309",
      "https://images.unsplash.com/photo-1556881286-fc6915169721?auto=format&fit=crop&w=800&q=80&sig=gallery_view2_309",
      "https://images.unsplash.com/photo-1586201375761-83865001e31c?auto=format&fit=crop&w=800&q=80&sig=gallery_view3_309"
    ],
    "countInStock": 138,
    "rating": 4.4,
    "numReviews": 360,
    "isFeatured": false,
    "description": "Brand: Tata Simply Better | Fresh organic grocery product harvested under natural farming standards."
  },
  {
    "name": "Nestle Organic Pantry Item #65",
    "price": 2320,
    "originalPrice": 2784,
    "category": "Groceries",
    "image": "https://images.unsplash.com/photo-1498557850523-fd3d118b962e?auto=format&fit=crop&w=800&q=80&sig=prod_unique_310_groceries",
    "images": [
      "https://images.unsplash.com/photo-1498557850523-fd3d118b962e?auto=format&fit=crop&w=800&q=80&sig=prod_unique_310_groceries",
      "https://images.unsplash.com/photo-1556881286-fc6915169721?auto=format&fit=crop&w=800&q=80&sig=gallery_view1_310",
      "https://images.unsplash.com/photo-1586201375761-83865001e31c?auto=format&fit=crop&w=800&q=80&sig=gallery_view2_310",
      "https://images.unsplash.com/photo-1523049673857-eb18f1d7b578?auto=format&fit=crop&w=800&q=80&sig=gallery_view3_310"
    ],
    "countInStock": 140,
    "rating": 4.5,
    "numReviews": 365,
    "isFeatured": true,
    "description": "Brand: Nestle | Fresh organic grocery product harvested under natural farming standards."
  },
  {
    "name": "Quaker Organic Pantry Item #66",
    "price": 2355,
    "originalPrice": 2826,
    "category": "Groceries",
    "image": "https://images.unsplash.com/photo-1556881286-fc6915169721?auto=format&fit=crop&w=800&q=80&sig=prod_unique_311_groceries",
    "images": [
      "https://images.unsplash.com/photo-1556881286-fc6915169721?auto=format&fit=crop&w=800&q=80&sig=prod_unique_311_groceries",
      "https://images.unsplash.com/photo-1586201375761-83865001e31c?auto=format&fit=crop&w=800&q=80&sig=gallery_view1_311",
      "https://images.unsplash.com/photo-1523049673857-eb18f1d7b578?auto=format&fit=crop&w=800&q=80&sig=gallery_view2_311",
      "https://images.unsplash.com/photo-1498557850523-fd3d118b962e?auto=format&fit=crop&w=800&q=80&sig=gallery_view3_311"
    ],
    "countInStock": 142,
    "rating": 4.6,
    "numReviews": 370,
    "isFeatured": false,
    "description": "Brand: Quaker | Fresh organic grocery product harvested under natural farming standards."
  },
  {
    "name": "Kellanova Organic Pantry Item #67",
    "price": 2390,
    "originalPrice": 2868,
    "category": "Groceries",
    "image": "https://images.unsplash.com/photo-1586201375761-83865001e31c?auto=format&fit=crop&w=800&q=80&sig=prod_unique_312_groceries",
    "images": [
      "https://images.unsplash.com/photo-1586201375761-83865001e31c?auto=format&fit=crop&w=800&q=80&sig=prod_unique_312_groceries",
      "https://images.unsplash.com/photo-1523049673857-eb18f1d7b578?auto=format&fit=crop&w=800&q=80&sig=gallery_view1_312",
      "https://images.unsplash.com/photo-1498557850523-fd3d118b962e?auto=format&fit=crop&w=800&q=80&sig=gallery_view2_312",
      "https://images.unsplash.com/photo-1556881286-fc6915169721?auto=format&fit=crop&w=800&q=80&sig=gallery_view3_312"
    ],
    "countInStock": 144,
    "rating": 4.7,
    "numReviews": 375,
    "isFeatured": false,
    "description": "Brand: Kellanova | Fresh organic grocery product harvested under natural farming standards."
  },
  {
    "name": "Tropico Organic Pantry Item #68",
    "price": 2425,
    "originalPrice": 2910,
    "category": "Groceries",
    "image": "https://images.unsplash.com/photo-1523049673857-eb18f1d7b578?auto=format&fit=crop&w=800&q=80&sig=prod_unique_313_groceries",
    "images": [
      "https://images.unsplash.com/photo-1523049673857-eb18f1d7b578?auto=format&fit=crop&w=800&q=80&sig=prod_unique_313_groceries",
      "https://images.unsplash.com/photo-1498557850523-fd3d118b962e?auto=format&fit=crop&w=800&q=80&sig=gallery_view1_313",
      "https://images.unsplash.com/photo-1556881286-fc6915169721?auto=format&fit=crop&w=800&q=80&sig=gallery_view2_313",
      "https://images.unsplash.com/photo-1586201375761-83865001e31c?auto=format&fit=crop&w=800&q=80&sig=gallery_view3_313"
    ],
    "countInStock": 146,
    "rating": 4.8,
    "numReviews": 380,
    "isFeatured": false,
    "description": "Brand: Tropico | Fresh organic grocery product harvested under natural farming standards."
  },
  {
    "name": "Nature Fresh Organic Pantry Item #69",
    "price": 2460,
    "originalPrice": 2952,
    "category": "Groceries",
    "image": "https://images.unsplash.com/photo-1498557850523-fd3d118b962e?auto=format&fit=crop&w=800&q=80&sig=prod_unique_314_groceries",
    "images": [
      "https://images.unsplash.com/photo-1498557850523-fd3d118b962e?auto=format&fit=crop&w=800&q=80&sig=prod_unique_314_groceries",
      "https://images.unsplash.com/photo-1556881286-fc6915169721?auto=format&fit=crop&w=800&q=80&sig=gallery_view1_314",
      "https://images.unsplash.com/photo-1586201375761-83865001e31c?auto=format&fit=crop&w=800&q=80&sig=gallery_view2_314",
      "https://images.unsplash.com/photo-1523049673857-eb18f1d7b578?auto=format&fit=crop&w=800&q=80&sig=gallery_view3_314"
    ],
    "countInStock": 148,
    "rating": 4.9,
    "numReviews": 385,
    "isFeatured": false,
    "description": "Brand: Nature Fresh | Fresh organic grocery product harvested under natural farming standards."
  },
  {
    "name": "Daawat Organic Pantry Item #70",
    "price": 2495,
    "originalPrice": 2994,
    "category": "Groceries",
    "image": "https://images.unsplash.com/photo-1556881286-fc6915169721?auto=format&fit=crop&w=800&q=80&sig=prod_unique_315_groceries",
    "images": [
      "https://images.unsplash.com/photo-1556881286-fc6915169721?auto=format&fit=crop&w=800&q=80&sig=prod_unique_315_groceries",
      "https://images.unsplash.com/photo-1586201375761-83865001e31c?auto=format&fit=crop&w=800&q=80&sig=gallery_view1_315",
      "https://images.unsplash.com/photo-1523049673857-eb18f1d7b578?auto=format&fit=crop&w=800&q=80&sig=gallery_view2_315",
      "https://images.unsplash.com/photo-1498557850523-fd3d118b962e?auto=format&fit=crop&w=800&q=80&sig=gallery_view3_315"
    ],
    "countInStock": 150,
    "rating": 4,
    "numReviews": 390,
    "isFeatured": true,
    "description": "Brand: Daawat | Fresh organic grocery product harvested under natural farming standards."
  },
  {
    "name": "Fortune Organic Pantry Item #71",
    "price": 2530,
    "originalPrice": 3036,
    "category": "Groceries",
    "image": "https://images.unsplash.com/photo-1586201375761-83865001e31c?auto=format&fit=crop&w=800&q=80&sig=prod_unique_316_groceries",
    "images": [
      "https://images.unsplash.com/photo-1586201375761-83865001e31c?auto=format&fit=crop&w=800&q=80&sig=prod_unique_316_groceries",
      "https://images.unsplash.com/photo-1523049673857-eb18f1d7b578?auto=format&fit=crop&w=800&q=80&sig=gallery_view1_316",
      "https://images.unsplash.com/photo-1498557850523-fd3d118b962e?auto=format&fit=crop&w=800&q=80&sig=gallery_view2_316",
      "https://images.unsplash.com/photo-1556881286-fc6915169721?auto=format&fit=crop&w=800&q=80&sig=gallery_view3_316"
    ],
    "countInStock": 152,
    "rating": 4.1,
    "numReviews": 395,
    "isFeatured": false,
    "description": "Brand: Fortune | Fresh organic grocery product harvested under natural farming standards."
  },
  {
    "name": "Amul Organic Pantry Item #72",
    "price": 2565,
    "originalPrice": 3078,
    "category": "Groceries",
    "image": "https://images.unsplash.com/photo-1523049673857-eb18f1d7b578?auto=format&fit=crop&w=800&q=80&sig=prod_unique_317_groceries",
    "images": [
      "https://images.unsplash.com/photo-1523049673857-eb18f1d7b578?auto=format&fit=crop&w=800&q=80&sig=prod_unique_317_groceries",
      "https://images.unsplash.com/photo-1498557850523-fd3d118b962e?auto=format&fit=crop&w=800&q=80&sig=gallery_view1_317",
      "https://images.unsplash.com/photo-1556881286-fc6915169721?auto=format&fit=crop&w=800&q=80&sig=gallery_view2_317",
      "https://images.unsplash.com/photo-1586201375761-83865001e31c?auto=format&fit=crop&w=800&q=80&sig=gallery_view3_317"
    ],
    "countInStock": 154,
    "rating": 4.2,
    "numReviews": 400,
    "isFeatured": false,
    "description": "Brand: Amul | Fresh organic grocery product harvested under natural farming standards."
  },
  {
    "name": "Organic India Organic Pantry Item #73",
    "price": 2600,
    "originalPrice": 3120,
    "category": "Groceries",
    "image": "https://images.unsplash.com/photo-1498557850523-fd3d118b962e?auto=format&fit=crop&w=800&q=80&sig=prod_unique_318_groceries",
    "images": [
      "https://images.unsplash.com/photo-1498557850523-fd3d118b962e?auto=format&fit=crop&w=800&q=80&sig=prod_unique_318_groceries",
      "https://images.unsplash.com/photo-1556881286-fc6915169721?auto=format&fit=crop&w=800&q=80&sig=gallery_view1_318",
      "https://images.unsplash.com/photo-1586201375761-83865001e31c?auto=format&fit=crop&w=800&q=80&sig=gallery_view2_318",
      "https://images.unsplash.com/photo-1523049673857-eb18f1d7b578?auto=format&fit=crop&w=800&q=80&sig=gallery_view3_318"
    ],
    "countInStock": 156,
    "rating": 4.3,
    "numReviews": 405,
    "isFeatured": false,
    "description": "Brand: Organic India | Fresh organic grocery product harvested under natural farming standards."
  },
  {
    "name": "Tata Simply Better Organic Pantry Item #74",
    "price": 2635,
    "originalPrice": 3162,
    "category": "Groceries",
    "image": "https://images.unsplash.com/photo-1556881286-fc6915169721?auto=format&fit=crop&w=800&q=80&sig=prod_unique_319_groceries",
    "images": [
      "https://images.unsplash.com/photo-1556881286-fc6915169721?auto=format&fit=crop&w=800&q=80&sig=prod_unique_319_groceries",
      "https://images.unsplash.com/photo-1586201375761-83865001e31c?auto=format&fit=crop&w=800&q=80&sig=gallery_view1_319",
      "https://images.unsplash.com/photo-1523049673857-eb18f1d7b578?auto=format&fit=crop&w=800&q=80&sig=gallery_view2_319",
      "https://images.unsplash.com/photo-1498557850523-fd3d118b962e?auto=format&fit=crop&w=800&q=80&sig=gallery_view3_319"
    ],
    "countInStock": 158,
    "rating": 4.4,
    "numReviews": 410,
    "isFeatured": false,
    "description": "Brand: Tata Simply Better | Fresh organic grocery product harvested under natural farming standards."
  },
  {
    "name": "Nestle Organic Pantry Item #75",
    "price": 2670,
    "originalPrice": 3204,
    "category": "Groceries",
    "image": "https://images.unsplash.com/photo-1586201375761-83865001e31c?auto=format&fit=crop&w=800&q=80&sig=prod_unique_320_groceries",
    "images": [
      "https://images.unsplash.com/photo-1586201375761-83865001e31c?auto=format&fit=crop&w=800&q=80&sig=prod_unique_320_groceries",
      "https://images.unsplash.com/photo-1523049673857-eb18f1d7b578?auto=format&fit=crop&w=800&q=80&sig=gallery_view1_320",
      "https://images.unsplash.com/photo-1498557850523-fd3d118b962e?auto=format&fit=crop&w=800&q=80&sig=gallery_view2_320",
      "https://images.unsplash.com/photo-1556881286-fc6915169721?auto=format&fit=crop&w=800&q=80&sig=gallery_view3_320"
    ],
    "countInStock": 160,
    "rating": 4.5,
    "numReviews": 415,
    "isFeatured": true,
    "description": "Brand: Nestle | Fresh organic grocery product harvested under natural farming standards."
  },
  {
    "name": "Quaker Organic Pantry Item #76",
    "price": 2705,
    "originalPrice": 3246,
    "category": "Groceries",
    "image": "https://images.unsplash.com/photo-1523049673857-eb18f1d7b578?auto=format&fit=crop&w=800&q=80&sig=prod_unique_321_groceries",
    "images": [
      "https://images.unsplash.com/photo-1523049673857-eb18f1d7b578?auto=format&fit=crop&w=800&q=80&sig=prod_unique_321_groceries",
      "https://images.unsplash.com/photo-1498557850523-fd3d118b962e?auto=format&fit=crop&w=800&q=80&sig=gallery_view1_321",
      "https://images.unsplash.com/photo-1556881286-fc6915169721?auto=format&fit=crop&w=800&q=80&sig=gallery_view2_321",
      "https://images.unsplash.com/photo-1586201375761-83865001e31c?auto=format&fit=crop&w=800&q=80&sig=gallery_view3_321"
    ],
    "countInStock": 162,
    "rating": 4.6,
    "numReviews": 420,
    "isFeatured": false,
    "description": "Brand: Quaker | Fresh organic grocery product harvested under natural farming standards."
  },
  {
    "name": "Kellanova Organic Pantry Item #77",
    "price": 2740,
    "originalPrice": 3288,
    "category": "Groceries",
    "image": "https://images.unsplash.com/photo-1498557850523-fd3d118b962e?auto=format&fit=crop&w=800&q=80&sig=prod_unique_322_groceries",
    "images": [
      "https://images.unsplash.com/photo-1498557850523-fd3d118b962e?auto=format&fit=crop&w=800&q=80&sig=prod_unique_322_groceries",
      "https://images.unsplash.com/photo-1556881286-fc6915169721?auto=format&fit=crop&w=800&q=80&sig=gallery_view1_322",
      "https://images.unsplash.com/photo-1586201375761-83865001e31c?auto=format&fit=crop&w=800&q=80&sig=gallery_view2_322",
      "https://images.unsplash.com/photo-1523049673857-eb18f1d7b578?auto=format&fit=crop&w=800&q=80&sig=gallery_view3_322"
    ],
    "countInStock": 164,
    "rating": 4.7,
    "numReviews": 425,
    "isFeatured": false,
    "description": "Brand: Kellanova | Fresh organic grocery product harvested under natural farming standards."
  },
  {
    "name": "Tropico Organic Pantry Item #78",
    "price": 2775,
    "originalPrice": 3330,
    "category": "Groceries",
    "image": "https://images.unsplash.com/photo-1556881286-fc6915169721?auto=format&fit=crop&w=800&q=80&sig=prod_unique_323_groceries",
    "images": [
      "https://images.unsplash.com/photo-1556881286-fc6915169721?auto=format&fit=crop&w=800&q=80&sig=prod_unique_323_groceries",
      "https://images.unsplash.com/photo-1586201375761-83865001e31c?auto=format&fit=crop&w=800&q=80&sig=gallery_view1_323",
      "https://images.unsplash.com/photo-1523049673857-eb18f1d7b578?auto=format&fit=crop&w=800&q=80&sig=gallery_view2_323",
      "https://images.unsplash.com/photo-1498557850523-fd3d118b962e?auto=format&fit=crop&w=800&q=80&sig=gallery_view3_323"
    ],
    "countInStock": 166,
    "rating": 4.8,
    "numReviews": 430,
    "isFeatured": false,
    "description": "Brand: Tropico | Fresh organic grocery product harvested under natural farming standards."
  },
  {
    "name": "Nature Fresh Organic Pantry Item #79",
    "price": 2810,
    "originalPrice": 3372,
    "category": "Groceries",
    "image": "https://images.unsplash.com/photo-1586201375761-83865001e31c?auto=format&fit=crop&w=800&q=80&sig=prod_unique_324_groceries",
    "images": [
      "https://images.unsplash.com/photo-1586201375761-83865001e31c?auto=format&fit=crop&w=800&q=80&sig=prod_unique_324_groceries",
      "https://images.unsplash.com/photo-1523049673857-eb18f1d7b578?auto=format&fit=crop&w=800&q=80&sig=gallery_view1_324",
      "https://images.unsplash.com/photo-1498557850523-fd3d118b962e?auto=format&fit=crop&w=800&q=80&sig=gallery_view2_324",
      "https://images.unsplash.com/photo-1556881286-fc6915169721?auto=format&fit=crop&w=800&q=80&sig=gallery_view3_324"
    ],
    "countInStock": 168,
    "rating": 4.9,
    "numReviews": 435,
    "isFeatured": false,
    "description": "Brand: Nature Fresh | Fresh organic grocery product harvested under natural farming standards."
  },
  {
    "name": "Daawat Organic Pantry Item #80",
    "price": 2845,
    "originalPrice": 3414,
    "category": "Groceries",
    "image": "https://images.unsplash.com/photo-1523049673857-eb18f1d7b578?auto=format&fit=crop&w=800&q=80&sig=prod_unique_325_groceries",
    "images": [
      "https://images.unsplash.com/photo-1523049673857-eb18f1d7b578?auto=format&fit=crop&w=800&q=80&sig=prod_unique_325_groceries",
      "https://images.unsplash.com/photo-1498557850523-fd3d118b962e?auto=format&fit=crop&w=800&q=80&sig=gallery_view1_325",
      "https://images.unsplash.com/photo-1556881286-fc6915169721?auto=format&fit=crop&w=800&q=80&sig=gallery_view2_325",
      "https://images.unsplash.com/photo-1586201375761-83865001e31c?auto=format&fit=crop&w=800&q=80&sig=gallery_view3_325"
    ],
    "countInStock": 170,
    "rating": 4,
    "numReviews": 440,
    "isFeatured": true,
    "description": "Brand: Daawat | Fresh organic grocery product harvested under natural farming standards."
  },
  {
    "name": "Fortune Organic Pantry Item #81",
    "price": 2880,
    "originalPrice": 3456,
    "category": "Groceries",
    "image": "https://images.unsplash.com/photo-1498557850523-fd3d118b962e?auto=format&fit=crop&w=800&q=80&sig=prod_unique_326_groceries",
    "images": [
      "https://images.unsplash.com/photo-1498557850523-fd3d118b962e?auto=format&fit=crop&w=800&q=80&sig=prod_unique_326_groceries",
      "https://images.unsplash.com/photo-1556881286-fc6915169721?auto=format&fit=crop&w=800&q=80&sig=gallery_view1_326",
      "https://images.unsplash.com/photo-1586201375761-83865001e31c?auto=format&fit=crop&w=800&q=80&sig=gallery_view2_326",
      "https://images.unsplash.com/photo-1523049673857-eb18f1d7b578?auto=format&fit=crop&w=800&q=80&sig=gallery_view3_326"
    ],
    "countInStock": 172,
    "rating": 4.1,
    "numReviews": 445,
    "isFeatured": false,
    "description": "Brand: Fortune | Fresh organic grocery product harvested under natural farming standards."
  },
  {
    "name": "Amul Organic Pantry Item #82",
    "price": 2915,
    "originalPrice": 3498,
    "category": "Groceries",
    "image": "https://images.unsplash.com/photo-1556881286-fc6915169721?auto=format&fit=crop&w=800&q=80&sig=prod_unique_327_groceries",
    "images": [
      "https://images.unsplash.com/photo-1556881286-fc6915169721?auto=format&fit=crop&w=800&q=80&sig=prod_unique_327_groceries",
      "https://images.unsplash.com/photo-1586201375761-83865001e31c?auto=format&fit=crop&w=800&q=80&sig=gallery_view1_327",
      "https://images.unsplash.com/photo-1523049673857-eb18f1d7b578?auto=format&fit=crop&w=800&q=80&sig=gallery_view2_327",
      "https://images.unsplash.com/photo-1498557850523-fd3d118b962e?auto=format&fit=crop&w=800&q=80&sig=gallery_view3_327"
    ],
    "countInStock": 174,
    "rating": 4.2,
    "numReviews": 450,
    "isFeatured": false,
    "description": "Brand: Amul | Fresh organic grocery product harvested under natural farming standards."
  },
  {
    "name": "Organic India Organic Pantry Item #83",
    "price": 2950,
    "originalPrice": 3540,
    "category": "Groceries",
    "image": "https://images.unsplash.com/photo-1586201375761-83865001e31c?auto=format&fit=crop&w=800&q=80&sig=prod_unique_328_groceries",
    "images": [
      "https://images.unsplash.com/photo-1586201375761-83865001e31c?auto=format&fit=crop&w=800&q=80&sig=prod_unique_328_groceries",
      "https://images.unsplash.com/photo-1523049673857-eb18f1d7b578?auto=format&fit=crop&w=800&q=80&sig=gallery_view1_328",
      "https://images.unsplash.com/photo-1498557850523-fd3d118b962e?auto=format&fit=crop&w=800&q=80&sig=gallery_view2_328",
      "https://images.unsplash.com/photo-1556881286-fc6915169721?auto=format&fit=crop&w=800&q=80&sig=gallery_view3_328"
    ],
    "countInStock": 176,
    "rating": 4.3,
    "numReviews": 455,
    "isFeatured": false,
    "description": "Brand: Organic India | Fresh organic grocery product harvested under natural farming standards."
  },
  {
    "name": "Tata Simply Better Organic Pantry Item #84",
    "price": 2985,
    "originalPrice": 3582,
    "category": "Groceries",
    "image": "https://images.unsplash.com/photo-1523049673857-eb18f1d7b578?auto=format&fit=crop&w=800&q=80&sig=prod_unique_329_groceries",
    "images": [
      "https://images.unsplash.com/photo-1523049673857-eb18f1d7b578?auto=format&fit=crop&w=800&q=80&sig=prod_unique_329_groceries",
      "https://images.unsplash.com/photo-1498557850523-fd3d118b962e?auto=format&fit=crop&w=800&q=80&sig=gallery_view1_329",
      "https://images.unsplash.com/photo-1556881286-fc6915169721?auto=format&fit=crop&w=800&q=80&sig=gallery_view2_329",
      "https://images.unsplash.com/photo-1586201375761-83865001e31c?auto=format&fit=crop&w=800&q=80&sig=gallery_view3_329"
    ],
    "countInStock": 178,
    "rating": 4.4,
    "numReviews": 460,
    "isFeatured": false,
    "description": "Brand: Tata Simply Better | Fresh organic grocery product harvested under natural farming standards."
  },
  {
    "name": "Nestle Organic Pantry Item #85",
    "price": 3020,
    "originalPrice": 3624,
    "category": "Groceries",
    "image": "https://images.unsplash.com/photo-1498557850523-fd3d118b962e?auto=format&fit=crop&w=800&q=80&sig=prod_unique_330_groceries",
    "images": [
      "https://images.unsplash.com/photo-1498557850523-fd3d118b962e?auto=format&fit=crop&w=800&q=80&sig=prod_unique_330_groceries",
      "https://images.unsplash.com/photo-1556881286-fc6915169721?auto=format&fit=crop&w=800&q=80&sig=gallery_view1_330",
      "https://images.unsplash.com/photo-1586201375761-83865001e31c?auto=format&fit=crop&w=800&q=80&sig=gallery_view2_330",
      "https://images.unsplash.com/photo-1523049673857-eb18f1d7b578?auto=format&fit=crop&w=800&q=80&sig=gallery_view3_330"
    ],
    "countInStock": 180,
    "rating": 4.5,
    "numReviews": 465,
    "isFeatured": true,
    "description": "Brand: Nestle | Fresh organic grocery product harvested under natural farming standards."
  },
  {
    "name": "Adidas Classic Wear Item #1",
    "price": 1150,
    "originalPrice": 1380,
    "category": "Fashion",
    "image": "https://images.unsplash.com/photo-1542291026-7eec264c27ff?auto=format&fit=crop&w=800&q=80&sig=prod_unique_331_fashion",
    "images": [
      "https://images.unsplash.com/photo-1542291026-7eec264c27ff?auto=format&fit=crop&w=800&q=80&sig=prod_unique_331_fashion",
      "https://images.unsplash.com/photo-1553062407-98eeb64c6a62?auto=format&fit=crop&w=800&q=80&sig=gallery_view1_331",
      "https://images.unsplash.com/photo-1542272604-780c36856842?auto=format&fit=crop&w=800&q=80&sig=gallery_view2_331",
      "https://images.unsplash.com/photo-1542291026-7eec264c27ff?auto=format&fit=crop&w=800&q=80&sig=gallery_view3_331"
    ],
    "countInStock": 12,
    "rating": 4.1,
    "numReviews": 45,
    "isFeatured": false,
    "description": "Brand: Adidas | Premium tailored fashion product crafted from soft durable material."
  },
  {
    "name": "Puma Classic Wear Item #2",
    "price": 1500,
    "originalPrice": 1800,
    "category": "Fashion",
    "image": "https://images.unsplash.com/photo-1553062407-98eeb64c6a62?auto=format&fit=crop&w=800&q=80&sig=prod_unique_332_fashion",
    "images": [
      "https://images.unsplash.com/photo-1553062407-98eeb64c6a62?auto=format&fit=crop&w=800&q=80&sig=prod_unique_332_fashion",
      "https://images.unsplash.com/photo-1542272604-780c36856842?auto=format&fit=crop&w=800&q=80&sig=gallery_view1_332",
      "https://images.unsplash.com/photo-1542291026-7eec264c27ff?auto=format&fit=crop&w=800&q=80&sig=gallery_view2_332",
      "https://images.unsplash.com/photo-1553062407-98eeb64c6a62?auto=format&fit=crop&w=800&q=80&sig=gallery_view3_332"
    ],
    "countInStock": 14,
    "rating": 4.2,
    "numReviews": 50,
    "isFeatured": false,
    "description": "Brand: Puma | Premium tailored fashion product crafted from soft durable material."
  },
  {
    "name": "Levi's Classic Wear Item #3",
    "price": 1850,
    "originalPrice": 2220,
    "category": "Fashion",
    "image": "https://images.unsplash.com/photo-1542272604-780c36856842?auto=format&fit=crop&w=800&q=80&sig=prod_unique_333_fashion",
    "images": [
      "https://images.unsplash.com/photo-1542272604-780c36856842?auto=format&fit=crop&w=800&q=80&sig=prod_unique_333_fashion",
      "https://images.unsplash.com/photo-1542291026-7eec264c27ff?auto=format&fit=crop&w=800&q=80&sig=gallery_view1_333",
      "https://images.unsplash.com/photo-1553062407-98eeb64c6a62?auto=format&fit=crop&w=800&q=80&sig=gallery_view2_333",
      "https://images.unsplash.com/photo-1542272604-780c36856842?auto=format&fit=crop&w=800&q=80&sig=gallery_view3_333"
    ],
    "countInStock": 16,
    "rating": 4.3,
    "numReviews": 55,
    "isFeatured": false,
    "description": "Brand: Levi's | Premium tailored fashion product crafted from soft durable material."
  },
  {
    "name": "Zara Classic Wear Item #4",
    "price": 2200,
    "originalPrice": 2640,
    "category": "Fashion",
    "image": "https://images.unsplash.com/photo-1542291026-7eec264c27ff?auto=format&fit=crop&w=800&q=80&sig=prod_unique_334_fashion",
    "images": [
      "https://images.unsplash.com/photo-1542291026-7eec264c27ff?auto=format&fit=crop&w=800&q=80&sig=prod_unique_334_fashion",
      "https://images.unsplash.com/photo-1553062407-98eeb64c6a62?auto=format&fit=crop&w=800&q=80&sig=gallery_view1_334",
      "https://images.unsplash.com/photo-1542272604-780c36856842?auto=format&fit=crop&w=800&q=80&sig=gallery_view2_334",
      "https://images.unsplash.com/photo-1542291026-7eec264c27ff?auto=format&fit=crop&w=800&q=80&sig=gallery_view3_334"
    ],
    "countInStock": 18,
    "rating": 4.4,
    "numReviews": 60,
    "isFeatured": false,
    "description": "Brand: Zara | Premium tailored fashion product crafted from soft durable material."
  },
  {
    "name": "H&M Classic Wear Item #5",
    "price": 2550,
    "originalPrice": 3060,
    "category": "Fashion",
    "image": "https://images.unsplash.com/photo-1553062407-98eeb64c6a62?auto=format&fit=crop&w=800&q=80&sig=prod_unique_335_fashion",
    "images": [
      "https://images.unsplash.com/photo-1553062407-98eeb64c6a62?auto=format&fit=crop&w=800&q=80&sig=prod_unique_335_fashion",
      "https://images.unsplash.com/photo-1542272604-780c36856842?auto=format&fit=crop&w=800&q=80&sig=gallery_view1_335",
      "https://images.unsplash.com/photo-1542291026-7eec264c27ff?auto=format&fit=crop&w=800&q=80&sig=gallery_view2_335",
      "https://images.unsplash.com/photo-1553062407-98eeb64c6a62?auto=format&fit=crop&w=800&q=80&sig=gallery_view3_335"
    ],
    "countInStock": 20,
    "rating": 4.5,
    "numReviews": 65,
    "isFeatured": true,
    "description": "Brand: H&M | Premium tailored fashion product crafted from soft durable material."
  },
  {
    "name": "Tommy Hilfiger Classic Wear Item #6",
    "price": 2900,
    "originalPrice": 3480,
    "category": "Fashion",
    "image": "https://images.unsplash.com/photo-1542272604-780c36856842?auto=format&fit=crop&w=800&q=80&sig=prod_unique_336_fashion",
    "images": [
      "https://images.unsplash.com/photo-1542272604-780c36856842?auto=format&fit=crop&w=800&q=80&sig=prod_unique_336_fashion",
      "https://images.unsplash.com/photo-1542291026-7eec264c27ff?auto=format&fit=crop&w=800&q=80&sig=gallery_view1_336",
      "https://images.unsplash.com/photo-1553062407-98eeb64c6a62?auto=format&fit=crop&w=800&q=80&sig=gallery_view2_336",
      "https://images.unsplash.com/photo-1542272604-780c36856842?auto=format&fit=crop&w=800&q=80&sig=gallery_view3_336"
    ],
    "countInStock": 22,
    "rating": 4.6,
    "numReviews": 70,
    "isFeatured": false,
    "description": "Brand: Tommy Hilfiger | Premium tailored fashion product crafted from soft durable material."
  },
  {
    "name": "Calvin Klein Classic Wear Item #7",
    "price": 3250,
    "originalPrice": 3900,
    "category": "Fashion",
    "image": "https://images.unsplash.com/photo-1542291026-7eec264c27ff?auto=format&fit=crop&w=800&q=80&sig=prod_unique_337_fashion",
    "images": [
      "https://images.unsplash.com/photo-1542291026-7eec264c27ff?auto=format&fit=crop&w=800&q=80&sig=prod_unique_337_fashion",
      "https://images.unsplash.com/photo-1553062407-98eeb64c6a62?auto=format&fit=crop&w=800&q=80&sig=gallery_view1_337",
      "https://images.unsplash.com/photo-1542272604-780c36856842?auto=format&fit=crop&w=800&q=80&sig=gallery_view2_337",
      "https://images.unsplash.com/photo-1542291026-7eec264c27ff?auto=format&fit=crop&w=800&q=80&sig=gallery_view3_337"
    ],
    "countInStock": 24,
    "rating": 4.7,
    "numReviews": 75,
    "isFeatured": false,
    "description": "Brand: Calvin Klein | Premium tailored fashion product crafted from soft durable material."
  },
  {
    "name": "Ray-Ban Classic Wear Item #8",
    "price": 3600,
    "originalPrice": 4320,
    "category": "Fashion",
    "image": "https://images.unsplash.com/photo-1553062407-98eeb64c6a62?auto=format&fit=crop&w=800&q=80&sig=prod_unique_338_fashion",
    "images": [
      "https://images.unsplash.com/photo-1553062407-98eeb64c6a62?auto=format&fit=crop&w=800&q=80&sig=prod_unique_338_fashion",
      "https://images.unsplash.com/photo-1542272604-780c36856842?auto=format&fit=crop&w=800&q=80&sig=gallery_view1_338",
      "https://images.unsplash.com/photo-1542291026-7eec264c27ff?auto=format&fit=crop&w=800&q=80&sig=gallery_view2_338",
      "https://images.unsplash.com/photo-1553062407-98eeb64c6a62?auto=format&fit=crop&w=800&q=80&sig=gallery_view3_338"
    ],
    "countInStock": 26,
    "rating": 4.8,
    "numReviews": 80,
    "isFeatured": false,
    "description": "Brand: Ray-Ban | Premium tailored fashion product crafted from soft durable material."
  },
  {
    "name": "Fossil Classic Wear Item #9",
    "price": 3950,
    "originalPrice": 4740,
    "category": "Fashion",
    "image": "https://images.unsplash.com/photo-1542272604-780c36856842?auto=format&fit=crop&w=800&q=80&sig=prod_unique_339_fashion",
    "images": [
      "https://images.unsplash.com/photo-1542272604-780c36856842?auto=format&fit=crop&w=800&q=80&sig=prod_unique_339_fashion",
      "https://images.unsplash.com/photo-1542291026-7eec264c27ff?auto=format&fit=crop&w=800&q=80&sig=gallery_view1_339",
      "https://images.unsplash.com/photo-1553062407-98eeb64c6a62?auto=format&fit=crop&w=800&q=80&sig=gallery_view2_339",
      "https://images.unsplash.com/photo-1542272604-780c36856842?auto=format&fit=crop&w=800&q=80&sig=gallery_view3_339"
    ],
    "countInStock": 28,
    "rating": 4.9,
    "numReviews": 85,
    "isFeatured": false,
    "description": "Brand: Fossil | Premium tailored fashion product crafted from soft durable material."
  },
  {
    "name": "Nike Classic Wear Item #10",
    "price": 4300,
    "originalPrice": 5160,
    "category": "Fashion",
    "image": "https://images.unsplash.com/photo-1542291026-7eec264c27ff?auto=format&fit=crop&w=800&q=80&sig=prod_unique_340_fashion",
    "images": [
      "https://images.unsplash.com/photo-1542291026-7eec264c27ff?auto=format&fit=crop&w=800&q=80&sig=prod_unique_340_fashion",
      "https://images.unsplash.com/photo-1553062407-98eeb64c6a62?auto=format&fit=crop&w=800&q=80&sig=gallery_view1_340",
      "https://images.unsplash.com/photo-1542272604-780c36856842?auto=format&fit=crop&w=800&q=80&sig=gallery_view2_340",
      "https://images.unsplash.com/photo-1542291026-7eec264c27ff?auto=format&fit=crop&w=800&q=80&sig=gallery_view3_340"
    ],
    "countInStock": 30,
    "rating": 4,
    "numReviews": 90,
    "isFeatured": true,
    "description": "Brand: Nike | Premium tailored fashion product crafted from soft durable material."
  },
  {
    "name": "Adidas Classic Wear Item #11",
    "price": 4650,
    "originalPrice": 5580,
    "category": "Fashion",
    "image": "https://images.unsplash.com/photo-1553062407-98eeb64c6a62?auto=format&fit=crop&w=800&q=80&sig=prod_unique_341_fashion",
    "images": [
      "https://images.unsplash.com/photo-1553062407-98eeb64c6a62?auto=format&fit=crop&w=800&q=80&sig=prod_unique_341_fashion",
      "https://images.unsplash.com/photo-1542272604-780c36856842?auto=format&fit=crop&w=800&q=80&sig=gallery_view1_341",
      "https://images.unsplash.com/photo-1542291026-7eec264c27ff?auto=format&fit=crop&w=800&q=80&sig=gallery_view2_341",
      "https://images.unsplash.com/photo-1553062407-98eeb64c6a62?auto=format&fit=crop&w=800&q=80&sig=gallery_view3_341"
    ],
    "countInStock": 32,
    "rating": 4.1,
    "numReviews": 95,
    "isFeatured": false,
    "description": "Brand: Adidas | Premium tailored fashion product crafted from soft durable material."
  },
  {
    "name": "Puma Classic Wear Item #12",
    "price": 5000,
    "originalPrice": 6000,
    "category": "Fashion",
    "image": "https://images.unsplash.com/photo-1542272604-780c36856842?auto=format&fit=crop&w=800&q=80&sig=prod_unique_342_fashion",
    "images": [
      "https://images.unsplash.com/photo-1542272604-780c36856842?auto=format&fit=crop&w=800&q=80&sig=prod_unique_342_fashion",
      "https://images.unsplash.com/photo-1542291026-7eec264c27ff?auto=format&fit=crop&w=800&q=80&sig=gallery_view1_342",
      "https://images.unsplash.com/photo-1553062407-98eeb64c6a62?auto=format&fit=crop&w=800&q=80&sig=gallery_view2_342",
      "https://images.unsplash.com/photo-1542272604-780c36856842?auto=format&fit=crop&w=800&q=80&sig=gallery_view3_342"
    ],
    "countInStock": 34,
    "rating": 4.2,
    "numReviews": 100,
    "isFeatured": false,
    "description": "Brand: Puma | Premium tailored fashion product crafted from soft durable material."
  },
  {
    "name": "Levi's Classic Wear Item #13",
    "price": 5350,
    "originalPrice": 6420,
    "category": "Fashion",
    "image": "https://images.unsplash.com/photo-1542291026-7eec264c27ff?auto=format&fit=crop&w=800&q=80&sig=prod_unique_343_fashion",
    "images": [
      "https://images.unsplash.com/photo-1542291026-7eec264c27ff?auto=format&fit=crop&w=800&q=80&sig=prod_unique_343_fashion",
      "https://images.unsplash.com/photo-1553062407-98eeb64c6a62?auto=format&fit=crop&w=800&q=80&sig=gallery_view1_343",
      "https://images.unsplash.com/photo-1542272604-780c36856842?auto=format&fit=crop&w=800&q=80&sig=gallery_view2_343",
      "https://images.unsplash.com/photo-1542291026-7eec264c27ff?auto=format&fit=crop&w=800&q=80&sig=gallery_view3_343"
    ],
    "countInStock": 36,
    "rating": 4.3,
    "numReviews": 105,
    "isFeatured": false,
    "description": "Brand: Levi's | Premium tailored fashion product crafted from soft durable material."
  },
  {
    "name": "Zara Classic Wear Item #14",
    "price": 5700,
    "originalPrice": 6840,
    "category": "Fashion",
    "image": "https://images.unsplash.com/photo-1553062407-98eeb64c6a62?auto=format&fit=crop&w=800&q=80&sig=prod_unique_344_fashion",
    "images": [
      "https://images.unsplash.com/photo-1553062407-98eeb64c6a62?auto=format&fit=crop&w=800&q=80&sig=prod_unique_344_fashion",
      "https://images.unsplash.com/photo-1542272604-780c36856842?auto=format&fit=crop&w=800&q=80&sig=gallery_view1_344",
      "https://images.unsplash.com/photo-1542291026-7eec264c27ff?auto=format&fit=crop&w=800&q=80&sig=gallery_view2_344",
      "https://images.unsplash.com/photo-1553062407-98eeb64c6a62?auto=format&fit=crop&w=800&q=80&sig=gallery_view3_344"
    ],
    "countInStock": 38,
    "rating": 4.4,
    "numReviews": 110,
    "isFeatured": false,
    "description": "Brand: Zara | Premium tailored fashion product crafted from soft durable material."
  },
  {
    "name": "H&M Classic Wear Item #15",
    "price": 6050,
    "originalPrice": 7260,
    "category": "Fashion",
    "image": "https://images.unsplash.com/photo-1542272604-780c36856842?auto=format&fit=crop&w=800&q=80&sig=prod_unique_345_fashion",
    "images": [
      "https://images.unsplash.com/photo-1542272604-780c36856842?auto=format&fit=crop&w=800&q=80&sig=prod_unique_345_fashion",
      "https://images.unsplash.com/photo-1542291026-7eec264c27ff?auto=format&fit=crop&w=800&q=80&sig=gallery_view1_345",
      "https://images.unsplash.com/photo-1553062407-98eeb64c6a62?auto=format&fit=crop&w=800&q=80&sig=gallery_view2_345",
      "https://images.unsplash.com/photo-1542272604-780c36856842?auto=format&fit=crop&w=800&q=80&sig=gallery_view3_345"
    ],
    "countInStock": 40,
    "rating": 4.5,
    "numReviews": 115,
    "isFeatured": true,
    "description": "Brand: H&M | Premium tailored fashion product crafted from soft durable material."
  },
  {
    "name": "Tommy Hilfiger Classic Wear Item #16",
    "price": 6400,
    "originalPrice": 7680,
    "category": "Fashion",
    "image": "https://images.unsplash.com/photo-1542291026-7eec264c27ff?auto=format&fit=crop&w=800&q=80&sig=prod_unique_346_fashion",
    "images": [
      "https://images.unsplash.com/photo-1542291026-7eec264c27ff?auto=format&fit=crop&w=800&q=80&sig=prod_unique_346_fashion",
      "https://images.unsplash.com/photo-1553062407-98eeb64c6a62?auto=format&fit=crop&w=800&q=80&sig=gallery_view1_346",
      "https://images.unsplash.com/photo-1542272604-780c36856842?auto=format&fit=crop&w=800&q=80&sig=gallery_view2_346",
      "https://images.unsplash.com/photo-1542291026-7eec264c27ff?auto=format&fit=crop&w=800&q=80&sig=gallery_view3_346"
    ],
    "countInStock": 42,
    "rating": 4.6,
    "numReviews": 120,
    "isFeatured": false,
    "description": "Brand: Tommy Hilfiger | Premium tailored fashion product crafted from soft durable material."
  },
  {
    "name": "Calvin Klein Classic Wear Item #17",
    "price": 6750,
    "originalPrice": 8100,
    "category": "Fashion",
    "image": "https://images.unsplash.com/photo-1553062407-98eeb64c6a62?auto=format&fit=crop&w=800&q=80&sig=prod_unique_347_fashion",
    "images": [
      "https://images.unsplash.com/photo-1553062407-98eeb64c6a62?auto=format&fit=crop&w=800&q=80&sig=prod_unique_347_fashion",
      "https://images.unsplash.com/photo-1542272604-780c36856842?auto=format&fit=crop&w=800&q=80&sig=gallery_view1_347",
      "https://images.unsplash.com/photo-1542291026-7eec264c27ff?auto=format&fit=crop&w=800&q=80&sig=gallery_view2_347",
      "https://images.unsplash.com/photo-1553062407-98eeb64c6a62?auto=format&fit=crop&w=800&q=80&sig=gallery_view3_347"
    ],
    "countInStock": 44,
    "rating": 4.7,
    "numReviews": 125,
    "isFeatured": false,
    "description": "Brand: Calvin Klein | Premium tailored fashion product crafted from soft durable material."
  },
  {
    "name": "Ray-Ban Classic Wear Item #18",
    "price": 7100,
    "originalPrice": 8520,
    "category": "Fashion",
    "image": "https://images.unsplash.com/photo-1542272604-780c36856842?auto=format&fit=crop&w=800&q=80&sig=prod_unique_348_fashion",
    "images": [
      "https://images.unsplash.com/photo-1542272604-780c36856842?auto=format&fit=crop&w=800&q=80&sig=prod_unique_348_fashion",
      "https://images.unsplash.com/photo-1542291026-7eec264c27ff?auto=format&fit=crop&w=800&q=80&sig=gallery_view1_348",
      "https://images.unsplash.com/photo-1553062407-98eeb64c6a62?auto=format&fit=crop&w=800&q=80&sig=gallery_view2_348",
      "https://images.unsplash.com/photo-1542272604-780c36856842?auto=format&fit=crop&w=800&q=80&sig=gallery_view3_348"
    ],
    "countInStock": 46,
    "rating": 4.8,
    "numReviews": 130,
    "isFeatured": false,
    "description": "Brand: Ray-Ban | Premium tailored fashion product crafted from soft durable material."
  },
  {
    "name": "Fossil Classic Wear Item #19",
    "price": 7450,
    "originalPrice": 8940,
    "category": "Fashion",
    "image": "https://images.unsplash.com/photo-1542291026-7eec264c27ff?auto=format&fit=crop&w=800&q=80&sig=prod_unique_349_fashion",
    "images": [
      "https://images.unsplash.com/photo-1542291026-7eec264c27ff?auto=format&fit=crop&w=800&q=80&sig=prod_unique_349_fashion",
      "https://images.unsplash.com/photo-1553062407-98eeb64c6a62?auto=format&fit=crop&w=800&q=80&sig=gallery_view1_349",
      "https://images.unsplash.com/photo-1542272604-780c36856842?auto=format&fit=crop&w=800&q=80&sig=gallery_view2_349",
      "https://images.unsplash.com/photo-1542291026-7eec264c27ff?auto=format&fit=crop&w=800&q=80&sig=gallery_view3_349"
    ],
    "countInStock": 48,
    "rating": 4.9,
    "numReviews": 135,
    "isFeatured": false,
    "description": "Brand: Fossil | Premium tailored fashion product crafted from soft durable material."
  },
  {
    "name": "Nike Classic Wear Item #20",
    "price": 7800,
    "originalPrice": 9360,
    "category": "Fashion",
    "image": "https://images.unsplash.com/photo-1553062407-98eeb64c6a62?auto=format&fit=crop&w=800&q=80&sig=prod_unique_350_fashion",
    "images": [
      "https://images.unsplash.com/photo-1553062407-98eeb64c6a62?auto=format&fit=crop&w=800&q=80&sig=prod_unique_350_fashion",
      "https://images.unsplash.com/photo-1542272604-780c36856842?auto=format&fit=crop&w=800&q=80&sig=gallery_view1_350",
      "https://images.unsplash.com/photo-1542291026-7eec264c27ff?auto=format&fit=crop&w=800&q=80&sig=gallery_view2_350",
      "https://images.unsplash.com/photo-1553062407-98eeb64c6a62?auto=format&fit=crop&w=800&q=80&sig=gallery_view3_350"
    ],
    "countInStock": 50,
    "rating": 4,
    "numReviews": 140,
    "isFeatured": true,
    "description": "Brand: Nike | Premium tailored fashion product crafted from soft durable material."
  },
  {
    "name": "Adidas Classic Wear Item #21",
    "price": 8150,
    "originalPrice": 9780,
    "category": "Fashion",
    "image": "https://images.unsplash.com/photo-1542272604-780c36856842?auto=format&fit=crop&w=800&q=80&sig=prod_unique_351_fashion",
    "images": [
      "https://images.unsplash.com/photo-1542272604-780c36856842?auto=format&fit=crop&w=800&q=80&sig=prod_unique_351_fashion",
      "https://images.unsplash.com/photo-1542291026-7eec264c27ff?auto=format&fit=crop&w=800&q=80&sig=gallery_view1_351",
      "https://images.unsplash.com/photo-1553062407-98eeb64c6a62?auto=format&fit=crop&w=800&q=80&sig=gallery_view2_351",
      "https://images.unsplash.com/photo-1542272604-780c36856842?auto=format&fit=crop&w=800&q=80&sig=gallery_view3_351"
    ],
    "countInStock": 52,
    "rating": 4.1,
    "numReviews": 145,
    "isFeatured": false,
    "description": "Brand: Adidas | Premium tailored fashion product crafted from soft durable material."
  },
  {
    "name": "Puma Classic Wear Item #22",
    "price": 8500,
    "originalPrice": 10200,
    "category": "Fashion",
    "image": "https://images.unsplash.com/photo-1542291026-7eec264c27ff?auto=format&fit=crop&w=800&q=80&sig=prod_unique_352_fashion",
    "images": [
      "https://images.unsplash.com/photo-1542291026-7eec264c27ff?auto=format&fit=crop&w=800&q=80&sig=prod_unique_352_fashion",
      "https://images.unsplash.com/photo-1553062407-98eeb64c6a62?auto=format&fit=crop&w=800&q=80&sig=gallery_view1_352",
      "https://images.unsplash.com/photo-1542272604-780c36856842?auto=format&fit=crop&w=800&q=80&sig=gallery_view2_352",
      "https://images.unsplash.com/photo-1542291026-7eec264c27ff?auto=format&fit=crop&w=800&q=80&sig=gallery_view3_352"
    ],
    "countInStock": 54,
    "rating": 4.2,
    "numReviews": 150,
    "isFeatured": false,
    "description": "Brand: Puma | Premium tailored fashion product crafted from soft durable material."
  },
  {
    "name": "Levi's Classic Wear Item #23",
    "price": 8850,
    "originalPrice": 10620,
    "category": "Fashion",
    "image": "https://images.unsplash.com/photo-1553062407-98eeb64c6a62?auto=format&fit=crop&w=800&q=80&sig=prod_unique_353_fashion",
    "images": [
      "https://images.unsplash.com/photo-1553062407-98eeb64c6a62?auto=format&fit=crop&w=800&q=80&sig=prod_unique_353_fashion",
      "https://images.unsplash.com/photo-1542272604-780c36856842?auto=format&fit=crop&w=800&q=80&sig=gallery_view1_353",
      "https://images.unsplash.com/photo-1542291026-7eec264c27ff?auto=format&fit=crop&w=800&q=80&sig=gallery_view2_353",
      "https://images.unsplash.com/photo-1553062407-98eeb64c6a62?auto=format&fit=crop&w=800&q=80&sig=gallery_view3_353"
    ],
    "countInStock": 56,
    "rating": 4.3,
    "numReviews": 155,
    "isFeatured": false,
    "description": "Brand: Levi's | Premium tailored fashion product crafted from soft durable material."
  },
  {
    "name": "Zara Classic Wear Item #24",
    "price": 9200,
    "originalPrice": 11040,
    "category": "Fashion",
    "image": "https://images.unsplash.com/photo-1542272604-780c36856842?auto=format&fit=crop&w=800&q=80&sig=prod_unique_354_fashion",
    "images": [
      "https://images.unsplash.com/photo-1542272604-780c36856842?auto=format&fit=crop&w=800&q=80&sig=prod_unique_354_fashion",
      "https://images.unsplash.com/photo-1542291026-7eec264c27ff?auto=format&fit=crop&w=800&q=80&sig=gallery_view1_354",
      "https://images.unsplash.com/photo-1553062407-98eeb64c6a62?auto=format&fit=crop&w=800&q=80&sig=gallery_view2_354",
      "https://images.unsplash.com/photo-1542272604-780c36856842?auto=format&fit=crop&w=800&q=80&sig=gallery_view3_354"
    ],
    "countInStock": 58,
    "rating": 4.4,
    "numReviews": 160,
    "isFeatured": false,
    "description": "Brand: Zara | Premium tailored fashion product crafted from soft durable material."
  },
  {
    "name": "H&M Classic Wear Item #25",
    "price": 9550,
    "originalPrice": 11460,
    "category": "Fashion",
    "image": "https://images.unsplash.com/photo-1542291026-7eec264c27ff?auto=format&fit=crop&w=800&q=80&sig=prod_unique_355_fashion",
    "images": [
      "https://images.unsplash.com/photo-1542291026-7eec264c27ff?auto=format&fit=crop&w=800&q=80&sig=prod_unique_355_fashion",
      "https://images.unsplash.com/photo-1553062407-98eeb64c6a62?auto=format&fit=crop&w=800&q=80&sig=gallery_view1_355",
      "https://images.unsplash.com/photo-1542272604-780c36856842?auto=format&fit=crop&w=800&q=80&sig=gallery_view2_355",
      "https://images.unsplash.com/photo-1542291026-7eec264c27ff?auto=format&fit=crop&w=800&q=80&sig=gallery_view3_355"
    ],
    "countInStock": 60,
    "rating": 4.5,
    "numReviews": 165,
    "isFeatured": true,
    "description": "Brand: H&M | Premium tailored fashion product crafted from soft durable material."
  },
  {
    "name": "Tommy Hilfiger Classic Wear Item #26",
    "price": 9900,
    "originalPrice": 11880,
    "category": "Fashion",
    "image": "https://images.unsplash.com/photo-1553062407-98eeb64c6a62?auto=format&fit=crop&w=800&q=80&sig=prod_unique_356_fashion",
    "images": [
      "https://images.unsplash.com/photo-1553062407-98eeb64c6a62?auto=format&fit=crop&w=800&q=80&sig=prod_unique_356_fashion",
      "https://images.unsplash.com/photo-1542272604-780c36856842?auto=format&fit=crop&w=800&q=80&sig=gallery_view1_356",
      "https://images.unsplash.com/photo-1542291026-7eec264c27ff?auto=format&fit=crop&w=800&q=80&sig=gallery_view2_356",
      "https://images.unsplash.com/photo-1553062407-98eeb64c6a62?auto=format&fit=crop&w=800&q=80&sig=gallery_view3_356"
    ],
    "countInStock": 62,
    "rating": 4.6,
    "numReviews": 170,
    "isFeatured": false,
    "description": "Brand: Tommy Hilfiger | Premium tailored fashion product crafted from soft durable material."
  },
  {
    "name": "Calvin Klein Classic Wear Item #27",
    "price": 10250,
    "originalPrice": 12300,
    "category": "Fashion",
    "image": "https://images.unsplash.com/photo-1542272604-780c36856842?auto=format&fit=crop&w=800&q=80&sig=prod_unique_357_fashion",
    "images": [
      "https://images.unsplash.com/photo-1542272604-780c36856842?auto=format&fit=crop&w=800&q=80&sig=prod_unique_357_fashion",
      "https://images.unsplash.com/photo-1542291026-7eec264c27ff?auto=format&fit=crop&w=800&q=80&sig=gallery_view1_357",
      "https://images.unsplash.com/photo-1553062407-98eeb64c6a62?auto=format&fit=crop&w=800&q=80&sig=gallery_view2_357",
      "https://images.unsplash.com/photo-1542272604-780c36856842?auto=format&fit=crop&w=800&q=80&sig=gallery_view3_357"
    ],
    "countInStock": 64,
    "rating": 4.7,
    "numReviews": 175,
    "isFeatured": false,
    "description": "Brand: Calvin Klein | Premium tailored fashion product crafted from soft durable material."
  },
  {
    "name": "Ray-Ban Classic Wear Item #28",
    "price": 10600,
    "originalPrice": 12720,
    "category": "Fashion",
    "image": "https://images.unsplash.com/photo-1542291026-7eec264c27ff?auto=format&fit=crop&w=800&q=80&sig=prod_unique_358_fashion",
    "images": [
      "https://images.unsplash.com/photo-1542291026-7eec264c27ff?auto=format&fit=crop&w=800&q=80&sig=prod_unique_358_fashion",
      "https://images.unsplash.com/photo-1553062407-98eeb64c6a62?auto=format&fit=crop&w=800&q=80&sig=gallery_view1_358",
      "https://images.unsplash.com/photo-1542272604-780c36856842?auto=format&fit=crop&w=800&q=80&sig=gallery_view2_358",
      "https://images.unsplash.com/photo-1542291026-7eec264c27ff?auto=format&fit=crop&w=800&q=80&sig=gallery_view3_358"
    ],
    "countInStock": 66,
    "rating": 4.8,
    "numReviews": 180,
    "isFeatured": false,
    "description": "Brand: Ray-Ban | Premium tailored fashion product crafted from soft durable material."
  },
  {
    "name": "Fossil Classic Wear Item #29",
    "price": 10950,
    "originalPrice": 13140,
    "category": "Fashion",
    "image": "https://images.unsplash.com/photo-1553062407-98eeb64c6a62?auto=format&fit=crop&w=800&q=80&sig=prod_unique_359_fashion",
    "images": [
      "https://images.unsplash.com/photo-1553062407-98eeb64c6a62?auto=format&fit=crop&w=800&q=80&sig=prod_unique_359_fashion",
      "https://images.unsplash.com/photo-1542272604-780c36856842?auto=format&fit=crop&w=800&q=80&sig=gallery_view1_359",
      "https://images.unsplash.com/photo-1542291026-7eec264c27ff?auto=format&fit=crop&w=800&q=80&sig=gallery_view2_359",
      "https://images.unsplash.com/photo-1553062407-98eeb64c6a62?auto=format&fit=crop&w=800&q=80&sig=gallery_view3_359"
    ],
    "countInStock": 68,
    "rating": 4.9,
    "numReviews": 185,
    "isFeatured": false,
    "description": "Brand: Fossil | Premium tailored fashion product crafted from soft durable material."
  },
  {
    "name": "Nike Classic Wear Item #30",
    "price": 11300,
    "originalPrice": 13560,
    "category": "Fashion",
    "image": "https://images.unsplash.com/photo-1542272604-780c36856842?auto=format&fit=crop&w=800&q=80&sig=prod_unique_360_fashion",
    "images": [
      "https://images.unsplash.com/photo-1542272604-780c36856842?auto=format&fit=crop&w=800&q=80&sig=prod_unique_360_fashion",
      "https://images.unsplash.com/photo-1542291026-7eec264c27ff?auto=format&fit=crop&w=800&q=80&sig=gallery_view1_360",
      "https://images.unsplash.com/photo-1553062407-98eeb64c6a62?auto=format&fit=crop&w=800&q=80&sig=gallery_view2_360",
      "https://images.unsplash.com/photo-1542272604-780c36856842?auto=format&fit=crop&w=800&q=80&sig=gallery_view3_360"
    ],
    "countInStock": 70,
    "rating": 4,
    "numReviews": 190,
    "isFeatured": true,
    "description": "Brand: Nike | Premium tailored fashion product crafted from soft durable material."
  },
  {
    "name": "Adidas Classic Wear Item #31",
    "price": 11650,
    "originalPrice": 13980,
    "category": "Fashion",
    "image": "https://images.unsplash.com/photo-1542291026-7eec264c27ff?auto=format&fit=crop&w=800&q=80&sig=prod_unique_361_fashion",
    "images": [
      "https://images.unsplash.com/photo-1542291026-7eec264c27ff?auto=format&fit=crop&w=800&q=80&sig=prod_unique_361_fashion",
      "https://images.unsplash.com/photo-1553062407-98eeb64c6a62?auto=format&fit=crop&w=800&q=80&sig=gallery_view1_361",
      "https://images.unsplash.com/photo-1542272604-780c36856842?auto=format&fit=crop&w=800&q=80&sig=gallery_view2_361",
      "https://images.unsplash.com/photo-1542291026-7eec264c27ff?auto=format&fit=crop&w=800&q=80&sig=gallery_view3_361"
    ],
    "countInStock": 72,
    "rating": 4.1,
    "numReviews": 195,
    "isFeatured": false,
    "description": "Brand: Adidas | Premium tailored fashion product crafted from soft durable material."
  },
  {
    "name": "Puma Classic Wear Item #32",
    "price": 12000,
    "originalPrice": 14400,
    "category": "Fashion",
    "image": "https://images.unsplash.com/photo-1553062407-98eeb64c6a62?auto=format&fit=crop&w=800&q=80&sig=prod_unique_362_fashion",
    "images": [
      "https://images.unsplash.com/photo-1553062407-98eeb64c6a62?auto=format&fit=crop&w=800&q=80&sig=prod_unique_362_fashion",
      "https://images.unsplash.com/photo-1542272604-780c36856842?auto=format&fit=crop&w=800&q=80&sig=gallery_view1_362",
      "https://images.unsplash.com/photo-1542291026-7eec264c27ff?auto=format&fit=crop&w=800&q=80&sig=gallery_view2_362",
      "https://images.unsplash.com/photo-1553062407-98eeb64c6a62?auto=format&fit=crop&w=800&q=80&sig=gallery_view3_362"
    ],
    "countInStock": 74,
    "rating": 4.2,
    "numReviews": 200,
    "isFeatured": false,
    "description": "Brand: Puma | Premium tailored fashion product crafted from soft durable material."
  },
  {
    "name": "Levi's Classic Wear Item #33",
    "price": 12350,
    "originalPrice": 14820,
    "category": "Fashion",
    "image": "https://images.unsplash.com/photo-1542272604-780c36856842?auto=format&fit=crop&w=800&q=80&sig=prod_unique_363_fashion",
    "images": [
      "https://images.unsplash.com/photo-1542272604-780c36856842?auto=format&fit=crop&w=800&q=80&sig=prod_unique_363_fashion",
      "https://images.unsplash.com/photo-1542291026-7eec264c27ff?auto=format&fit=crop&w=800&q=80&sig=gallery_view1_363",
      "https://images.unsplash.com/photo-1553062407-98eeb64c6a62?auto=format&fit=crop&w=800&q=80&sig=gallery_view2_363",
      "https://images.unsplash.com/photo-1542272604-780c36856842?auto=format&fit=crop&w=800&q=80&sig=gallery_view3_363"
    ],
    "countInStock": 76,
    "rating": 4.3,
    "numReviews": 205,
    "isFeatured": false,
    "description": "Brand: Levi's | Premium tailored fashion product crafted from soft durable material."
  },
  {
    "name": "Zara Classic Wear Item #34",
    "price": 12700,
    "originalPrice": 15240,
    "category": "Fashion",
    "image": "https://images.unsplash.com/photo-1542291026-7eec264c27ff?auto=format&fit=crop&w=800&q=80&sig=prod_unique_364_fashion",
    "images": [
      "https://images.unsplash.com/photo-1542291026-7eec264c27ff?auto=format&fit=crop&w=800&q=80&sig=prod_unique_364_fashion",
      "https://images.unsplash.com/photo-1553062407-98eeb64c6a62?auto=format&fit=crop&w=800&q=80&sig=gallery_view1_364",
      "https://images.unsplash.com/photo-1542272604-780c36856842?auto=format&fit=crop&w=800&q=80&sig=gallery_view2_364",
      "https://images.unsplash.com/photo-1542291026-7eec264c27ff?auto=format&fit=crop&w=800&q=80&sig=gallery_view3_364"
    ],
    "countInStock": 78,
    "rating": 4.4,
    "numReviews": 210,
    "isFeatured": false,
    "description": "Brand: Zara | Premium tailored fashion product crafted from soft durable material."
  },
  {
    "name": "H&M Classic Wear Item #35",
    "price": 13050,
    "originalPrice": 15660,
    "category": "Fashion",
    "image": "https://images.unsplash.com/photo-1553062407-98eeb64c6a62?auto=format&fit=crop&w=800&q=80&sig=prod_unique_365_fashion",
    "images": [
      "https://images.unsplash.com/photo-1553062407-98eeb64c6a62?auto=format&fit=crop&w=800&q=80&sig=prod_unique_365_fashion",
      "https://images.unsplash.com/photo-1542272604-780c36856842?auto=format&fit=crop&w=800&q=80&sig=gallery_view1_365",
      "https://images.unsplash.com/photo-1542291026-7eec264c27ff?auto=format&fit=crop&w=800&q=80&sig=gallery_view2_365",
      "https://images.unsplash.com/photo-1553062407-98eeb64c6a62?auto=format&fit=crop&w=800&q=80&sig=gallery_view3_365"
    ],
    "countInStock": 80,
    "rating": 4.5,
    "numReviews": 215,
    "isFeatured": true,
    "description": "Brand: H&M | Premium tailored fashion product crafted from soft durable material."
  },
  {
    "name": "Tommy Hilfiger Classic Wear Item #36",
    "price": 13400,
    "originalPrice": 16080,
    "category": "Fashion",
    "image": "https://images.unsplash.com/photo-1542272604-780c36856842?auto=format&fit=crop&w=800&q=80&sig=prod_unique_366_fashion",
    "images": [
      "https://images.unsplash.com/photo-1542272604-780c36856842?auto=format&fit=crop&w=800&q=80&sig=prod_unique_366_fashion",
      "https://images.unsplash.com/photo-1542291026-7eec264c27ff?auto=format&fit=crop&w=800&q=80&sig=gallery_view1_366",
      "https://images.unsplash.com/photo-1553062407-98eeb64c6a62?auto=format&fit=crop&w=800&q=80&sig=gallery_view2_366",
      "https://images.unsplash.com/photo-1542272604-780c36856842?auto=format&fit=crop&w=800&q=80&sig=gallery_view3_366"
    ],
    "countInStock": 82,
    "rating": 4.6,
    "numReviews": 220,
    "isFeatured": false,
    "description": "Brand: Tommy Hilfiger | Premium tailored fashion product crafted from soft durable material."
  },
  {
    "name": "Calvin Klein Classic Wear Item #37",
    "price": 13750,
    "originalPrice": 16500,
    "category": "Fashion",
    "image": "https://images.unsplash.com/photo-1542291026-7eec264c27ff?auto=format&fit=crop&w=800&q=80&sig=prod_unique_367_fashion",
    "images": [
      "https://images.unsplash.com/photo-1542291026-7eec264c27ff?auto=format&fit=crop&w=800&q=80&sig=prod_unique_367_fashion",
      "https://images.unsplash.com/photo-1553062407-98eeb64c6a62?auto=format&fit=crop&w=800&q=80&sig=gallery_view1_367",
      "https://images.unsplash.com/photo-1542272604-780c36856842?auto=format&fit=crop&w=800&q=80&sig=gallery_view2_367",
      "https://images.unsplash.com/photo-1542291026-7eec264c27ff?auto=format&fit=crop&w=800&q=80&sig=gallery_view3_367"
    ],
    "countInStock": 84,
    "rating": 4.7,
    "numReviews": 225,
    "isFeatured": false,
    "description": "Brand: Calvin Klein | Premium tailored fashion product crafted from soft durable material."
  },
  {
    "name": "Ray-Ban Classic Wear Item #38",
    "price": 14100,
    "originalPrice": 16920,
    "category": "Fashion",
    "image": "https://images.unsplash.com/photo-1553062407-98eeb64c6a62?auto=format&fit=crop&w=800&q=80&sig=prod_unique_368_fashion",
    "images": [
      "https://images.unsplash.com/photo-1553062407-98eeb64c6a62?auto=format&fit=crop&w=800&q=80&sig=prod_unique_368_fashion",
      "https://images.unsplash.com/photo-1542272604-780c36856842?auto=format&fit=crop&w=800&q=80&sig=gallery_view1_368",
      "https://images.unsplash.com/photo-1542291026-7eec264c27ff?auto=format&fit=crop&w=800&q=80&sig=gallery_view2_368",
      "https://images.unsplash.com/photo-1553062407-98eeb64c6a62?auto=format&fit=crop&w=800&q=80&sig=gallery_view3_368"
    ],
    "countInStock": 86,
    "rating": 4.8,
    "numReviews": 230,
    "isFeatured": false,
    "description": "Brand: Ray-Ban | Premium tailored fashion product crafted from soft durable material."
  },
  {
    "name": "Fossil Classic Wear Item #39",
    "price": 14450,
    "originalPrice": 17340,
    "category": "Fashion",
    "image": "https://images.unsplash.com/photo-1542272604-780c36856842?auto=format&fit=crop&w=800&q=80&sig=prod_unique_369_fashion",
    "images": [
      "https://images.unsplash.com/photo-1542272604-780c36856842?auto=format&fit=crop&w=800&q=80&sig=prod_unique_369_fashion",
      "https://images.unsplash.com/photo-1542291026-7eec264c27ff?auto=format&fit=crop&w=800&q=80&sig=gallery_view1_369",
      "https://images.unsplash.com/photo-1553062407-98eeb64c6a62?auto=format&fit=crop&w=800&q=80&sig=gallery_view2_369",
      "https://images.unsplash.com/photo-1542272604-780c36856842?auto=format&fit=crop&w=800&q=80&sig=gallery_view3_369"
    ],
    "countInStock": 88,
    "rating": 4.9,
    "numReviews": 235,
    "isFeatured": false,
    "description": "Brand: Fossil | Premium tailored fashion product crafted from soft durable material."
  },
  {
    "name": "Nike Classic Wear Item #40",
    "price": 14800,
    "originalPrice": 17760,
    "category": "Fashion",
    "image": "https://images.unsplash.com/photo-1542291026-7eec264c27ff?auto=format&fit=crop&w=800&q=80&sig=prod_unique_370_fashion",
    "images": [
      "https://images.unsplash.com/photo-1542291026-7eec264c27ff?auto=format&fit=crop&w=800&q=80&sig=prod_unique_370_fashion",
      "https://images.unsplash.com/photo-1553062407-98eeb64c6a62?auto=format&fit=crop&w=800&q=80&sig=gallery_view1_370",
      "https://images.unsplash.com/photo-1542272604-780c36856842?auto=format&fit=crop&w=800&q=80&sig=gallery_view2_370",
      "https://images.unsplash.com/photo-1542291026-7eec264c27ff?auto=format&fit=crop&w=800&q=80&sig=gallery_view3_370"
    ],
    "countInStock": 90,
    "rating": 4,
    "numReviews": 240,
    "isFeatured": true,
    "description": "Brand: Nike | Premium tailored fashion product crafted from soft durable material."
  },
  {
    "name": "Adidas Classic Wear Item #41",
    "price": 15150,
    "originalPrice": 18180,
    "category": "Fashion",
    "image": "https://images.unsplash.com/photo-1553062407-98eeb64c6a62?auto=format&fit=crop&w=800&q=80&sig=prod_unique_371_fashion",
    "images": [
      "https://images.unsplash.com/photo-1553062407-98eeb64c6a62?auto=format&fit=crop&w=800&q=80&sig=prod_unique_371_fashion",
      "https://images.unsplash.com/photo-1542272604-780c36856842?auto=format&fit=crop&w=800&q=80&sig=gallery_view1_371",
      "https://images.unsplash.com/photo-1542291026-7eec264c27ff?auto=format&fit=crop&w=800&q=80&sig=gallery_view2_371",
      "https://images.unsplash.com/photo-1553062407-98eeb64c6a62?auto=format&fit=crop&w=800&q=80&sig=gallery_view3_371"
    ],
    "countInStock": 92,
    "rating": 4.1,
    "numReviews": 245,
    "isFeatured": false,
    "description": "Brand: Adidas | Premium tailored fashion product crafted from soft durable material."
  },
  {
    "name": "Puma Classic Wear Item #42",
    "price": 15500,
    "originalPrice": 18600,
    "category": "Fashion",
    "image": "https://images.unsplash.com/photo-1542272604-780c36856842?auto=format&fit=crop&w=800&q=80&sig=prod_unique_372_fashion",
    "images": [
      "https://images.unsplash.com/photo-1542272604-780c36856842?auto=format&fit=crop&w=800&q=80&sig=prod_unique_372_fashion",
      "https://images.unsplash.com/photo-1542291026-7eec264c27ff?auto=format&fit=crop&w=800&q=80&sig=gallery_view1_372",
      "https://images.unsplash.com/photo-1553062407-98eeb64c6a62?auto=format&fit=crop&w=800&q=80&sig=gallery_view2_372",
      "https://images.unsplash.com/photo-1542272604-780c36856842?auto=format&fit=crop&w=800&q=80&sig=gallery_view3_372"
    ],
    "countInStock": 94,
    "rating": 4.2,
    "numReviews": 250,
    "isFeatured": false,
    "description": "Brand: Puma | Premium tailored fashion product crafted from soft durable material."
  },
  {
    "name": "Levi's Classic Wear Item #43",
    "price": 15850,
    "originalPrice": 19020,
    "category": "Fashion",
    "image": "https://images.unsplash.com/photo-1542291026-7eec264c27ff?auto=format&fit=crop&w=800&q=80&sig=prod_unique_373_fashion",
    "images": [
      "https://images.unsplash.com/photo-1542291026-7eec264c27ff?auto=format&fit=crop&w=800&q=80&sig=prod_unique_373_fashion",
      "https://images.unsplash.com/photo-1553062407-98eeb64c6a62?auto=format&fit=crop&w=800&q=80&sig=gallery_view1_373",
      "https://images.unsplash.com/photo-1542272604-780c36856842?auto=format&fit=crop&w=800&q=80&sig=gallery_view2_373",
      "https://images.unsplash.com/photo-1542291026-7eec264c27ff?auto=format&fit=crop&w=800&q=80&sig=gallery_view3_373"
    ],
    "countInStock": 96,
    "rating": 4.3,
    "numReviews": 255,
    "isFeatured": false,
    "description": "Brand: Levi's | Premium tailored fashion product crafted from soft durable material."
  },
  {
    "name": "Zara Classic Wear Item #44",
    "price": 16200,
    "originalPrice": 19440,
    "category": "Fashion",
    "image": "https://images.unsplash.com/photo-1553062407-98eeb64c6a62?auto=format&fit=crop&w=800&q=80&sig=prod_unique_374_fashion",
    "images": [
      "https://images.unsplash.com/photo-1553062407-98eeb64c6a62?auto=format&fit=crop&w=800&q=80&sig=prod_unique_374_fashion",
      "https://images.unsplash.com/photo-1542272604-780c36856842?auto=format&fit=crop&w=800&q=80&sig=gallery_view1_374",
      "https://images.unsplash.com/photo-1542291026-7eec264c27ff?auto=format&fit=crop&w=800&q=80&sig=gallery_view2_374",
      "https://images.unsplash.com/photo-1553062407-98eeb64c6a62?auto=format&fit=crop&w=800&q=80&sig=gallery_view3_374"
    ],
    "countInStock": 98,
    "rating": 4.4,
    "numReviews": 260,
    "isFeatured": false,
    "description": "Brand: Zara | Premium tailored fashion product crafted from soft durable material."
  },
  {
    "name": "H&M Classic Wear Item #45",
    "price": 16550,
    "originalPrice": 19860,
    "category": "Fashion",
    "image": "https://images.unsplash.com/photo-1542272604-780c36856842?auto=format&fit=crop&w=800&q=80&sig=prod_unique_375_fashion",
    "images": [
      "https://images.unsplash.com/photo-1542272604-780c36856842?auto=format&fit=crop&w=800&q=80&sig=prod_unique_375_fashion",
      "https://images.unsplash.com/photo-1542291026-7eec264c27ff?auto=format&fit=crop&w=800&q=80&sig=gallery_view1_375",
      "https://images.unsplash.com/photo-1553062407-98eeb64c6a62?auto=format&fit=crop&w=800&q=80&sig=gallery_view2_375",
      "https://images.unsplash.com/photo-1542272604-780c36856842?auto=format&fit=crop&w=800&q=80&sig=gallery_view3_375"
    ],
    "countInStock": 100,
    "rating": 4.5,
    "numReviews": 265,
    "isFeatured": true,
    "description": "Brand: H&M | Premium tailored fashion product crafted from soft durable material."
  },
  {
    "name": "Tommy Hilfiger Classic Wear Item #46",
    "price": 16900,
    "originalPrice": 20280,
    "category": "Fashion",
    "image": "https://images.unsplash.com/photo-1542291026-7eec264c27ff?auto=format&fit=crop&w=800&q=80&sig=prod_unique_376_fashion",
    "images": [
      "https://images.unsplash.com/photo-1542291026-7eec264c27ff?auto=format&fit=crop&w=800&q=80&sig=prod_unique_376_fashion",
      "https://images.unsplash.com/photo-1553062407-98eeb64c6a62?auto=format&fit=crop&w=800&q=80&sig=gallery_view1_376",
      "https://images.unsplash.com/photo-1542272604-780c36856842?auto=format&fit=crop&w=800&q=80&sig=gallery_view2_376",
      "https://images.unsplash.com/photo-1542291026-7eec264c27ff?auto=format&fit=crop&w=800&q=80&sig=gallery_view3_376"
    ],
    "countInStock": 102,
    "rating": 4.6,
    "numReviews": 270,
    "isFeatured": false,
    "description": "Brand: Tommy Hilfiger | Premium tailored fashion product crafted from soft durable material."
  },
  {
    "name": "Calvin Klein Classic Wear Item #47",
    "price": 17250,
    "originalPrice": 20700,
    "category": "Fashion",
    "image": "https://images.unsplash.com/photo-1553062407-98eeb64c6a62?auto=format&fit=crop&w=800&q=80&sig=prod_unique_377_fashion",
    "images": [
      "https://images.unsplash.com/photo-1553062407-98eeb64c6a62?auto=format&fit=crop&w=800&q=80&sig=prod_unique_377_fashion",
      "https://images.unsplash.com/photo-1542272604-780c36856842?auto=format&fit=crop&w=800&q=80&sig=gallery_view1_377",
      "https://images.unsplash.com/photo-1542291026-7eec264c27ff?auto=format&fit=crop&w=800&q=80&sig=gallery_view2_377",
      "https://images.unsplash.com/photo-1553062407-98eeb64c6a62?auto=format&fit=crop&w=800&q=80&sig=gallery_view3_377"
    ],
    "countInStock": 104,
    "rating": 4.7,
    "numReviews": 275,
    "isFeatured": false,
    "description": "Brand: Calvin Klein | Premium tailored fashion product crafted from soft durable material."
  },
  {
    "name": "Ray-Ban Classic Wear Item #48",
    "price": 17600,
    "originalPrice": 21120,
    "category": "Fashion",
    "image": "https://images.unsplash.com/photo-1542272604-780c36856842?auto=format&fit=crop&w=800&q=80&sig=prod_unique_378_fashion",
    "images": [
      "https://images.unsplash.com/photo-1542272604-780c36856842?auto=format&fit=crop&w=800&q=80&sig=prod_unique_378_fashion",
      "https://images.unsplash.com/photo-1542291026-7eec264c27ff?auto=format&fit=crop&w=800&q=80&sig=gallery_view1_378",
      "https://images.unsplash.com/photo-1553062407-98eeb64c6a62?auto=format&fit=crop&w=800&q=80&sig=gallery_view2_378",
      "https://images.unsplash.com/photo-1542272604-780c36856842?auto=format&fit=crop&w=800&q=80&sig=gallery_view3_378"
    ],
    "countInStock": 106,
    "rating": 4.8,
    "numReviews": 280,
    "isFeatured": false,
    "description": "Brand: Ray-Ban | Premium tailored fashion product crafted from soft durable material."
  },
  {
    "name": "Fossil Classic Wear Item #49",
    "price": 17950,
    "originalPrice": 21540,
    "category": "Fashion",
    "image": "https://images.unsplash.com/photo-1542291026-7eec264c27ff?auto=format&fit=crop&w=800&q=80&sig=prod_unique_379_fashion",
    "images": [
      "https://images.unsplash.com/photo-1542291026-7eec264c27ff?auto=format&fit=crop&w=800&q=80&sig=prod_unique_379_fashion",
      "https://images.unsplash.com/photo-1553062407-98eeb64c6a62?auto=format&fit=crop&w=800&q=80&sig=gallery_view1_379",
      "https://images.unsplash.com/photo-1542272604-780c36856842?auto=format&fit=crop&w=800&q=80&sig=gallery_view2_379",
      "https://images.unsplash.com/photo-1542291026-7eec264c27ff?auto=format&fit=crop&w=800&q=80&sig=gallery_view3_379"
    ],
    "countInStock": 108,
    "rating": 4.9,
    "numReviews": 285,
    "isFeatured": false,
    "description": "Brand: Fossil | Premium tailored fashion product crafted from soft durable material."
  },
  {
    "name": "Nike Classic Wear Item #50",
    "price": 18300,
    "originalPrice": 21960,
    "category": "Fashion",
    "image": "https://images.unsplash.com/photo-1553062407-98eeb64c6a62?auto=format&fit=crop&w=800&q=80&sig=prod_unique_380_fashion",
    "images": [
      "https://images.unsplash.com/photo-1553062407-98eeb64c6a62?auto=format&fit=crop&w=800&q=80&sig=prod_unique_380_fashion",
      "https://images.unsplash.com/photo-1542272604-780c36856842?auto=format&fit=crop&w=800&q=80&sig=gallery_view1_380",
      "https://images.unsplash.com/photo-1542291026-7eec264c27ff?auto=format&fit=crop&w=800&q=80&sig=gallery_view2_380",
      "https://images.unsplash.com/photo-1553062407-98eeb64c6a62?auto=format&fit=crop&w=800&q=80&sig=gallery_view3_380"
    ],
    "countInStock": 110,
    "rating": 4,
    "numReviews": 290,
    "isFeatured": true,
    "description": "Brand: Nike | Premium tailored fashion product crafted from soft durable material."
  },
  {
    "name": "Adidas Classic Wear Item #51",
    "price": 18650,
    "originalPrice": 22380,
    "category": "Fashion",
    "image": "https://images.unsplash.com/photo-1542272604-780c36856842?auto=format&fit=crop&w=800&q=80&sig=prod_unique_381_fashion",
    "images": [
      "https://images.unsplash.com/photo-1542272604-780c36856842?auto=format&fit=crop&w=800&q=80&sig=prod_unique_381_fashion",
      "https://images.unsplash.com/photo-1542291026-7eec264c27ff?auto=format&fit=crop&w=800&q=80&sig=gallery_view1_381",
      "https://images.unsplash.com/photo-1553062407-98eeb64c6a62?auto=format&fit=crop&w=800&q=80&sig=gallery_view2_381",
      "https://images.unsplash.com/photo-1542272604-780c36856842?auto=format&fit=crop&w=800&q=80&sig=gallery_view3_381"
    ],
    "countInStock": 112,
    "rating": 4.1,
    "numReviews": 295,
    "isFeatured": false,
    "description": "Brand: Adidas | Premium tailored fashion product crafted from soft durable material."
  },
  {
    "name": "Puma Classic Wear Item #52",
    "price": 19000,
    "originalPrice": 22800,
    "category": "Fashion",
    "image": "https://images.unsplash.com/photo-1542291026-7eec264c27ff?auto=format&fit=crop&w=800&q=80&sig=prod_unique_382_fashion",
    "images": [
      "https://images.unsplash.com/photo-1542291026-7eec264c27ff?auto=format&fit=crop&w=800&q=80&sig=prod_unique_382_fashion",
      "https://images.unsplash.com/photo-1553062407-98eeb64c6a62?auto=format&fit=crop&w=800&q=80&sig=gallery_view1_382",
      "https://images.unsplash.com/photo-1542272604-780c36856842?auto=format&fit=crop&w=800&q=80&sig=gallery_view2_382",
      "https://images.unsplash.com/photo-1542291026-7eec264c27ff?auto=format&fit=crop&w=800&q=80&sig=gallery_view3_382"
    ],
    "countInStock": 114,
    "rating": 4.2,
    "numReviews": 300,
    "isFeatured": false,
    "description": "Brand: Puma | Premium tailored fashion product crafted from soft durable material."
  },
  {
    "name": "Levi's Classic Wear Item #53",
    "price": 19350,
    "originalPrice": 23220,
    "category": "Fashion",
    "image": "https://images.unsplash.com/photo-1553062407-98eeb64c6a62?auto=format&fit=crop&w=800&q=80&sig=prod_unique_383_fashion",
    "images": [
      "https://images.unsplash.com/photo-1553062407-98eeb64c6a62?auto=format&fit=crop&w=800&q=80&sig=prod_unique_383_fashion",
      "https://images.unsplash.com/photo-1542272604-780c36856842?auto=format&fit=crop&w=800&q=80&sig=gallery_view1_383",
      "https://images.unsplash.com/photo-1542291026-7eec264c27ff?auto=format&fit=crop&w=800&q=80&sig=gallery_view2_383",
      "https://images.unsplash.com/photo-1553062407-98eeb64c6a62?auto=format&fit=crop&w=800&q=80&sig=gallery_view3_383"
    ],
    "countInStock": 116,
    "rating": 4.3,
    "numReviews": 305,
    "isFeatured": false,
    "description": "Brand: Levi's | Premium tailored fashion product crafted from soft durable material."
  },
  {
    "name": "Zara Classic Wear Item #54",
    "price": 19700,
    "originalPrice": 23640,
    "category": "Fashion",
    "image": "https://images.unsplash.com/photo-1542272604-780c36856842?auto=format&fit=crop&w=800&q=80&sig=prod_unique_384_fashion",
    "images": [
      "https://images.unsplash.com/photo-1542272604-780c36856842?auto=format&fit=crop&w=800&q=80&sig=prod_unique_384_fashion",
      "https://images.unsplash.com/photo-1542291026-7eec264c27ff?auto=format&fit=crop&w=800&q=80&sig=gallery_view1_384",
      "https://images.unsplash.com/photo-1553062407-98eeb64c6a62?auto=format&fit=crop&w=800&q=80&sig=gallery_view2_384",
      "https://images.unsplash.com/photo-1542272604-780c36856842?auto=format&fit=crop&w=800&q=80&sig=gallery_view3_384"
    ],
    "countInStock": 118,
    "rating": 4.4,
    "numReviews": 310,
    "isFeatured": false,
    "description": "Brand: Zara | Premium tailored fashion product crafted from soft durable material."
  },
  {
    "name": "H&M Classic Wear Item #55",
    "price": 20050,
    "originalPrice": 24060,
    "category": "Fashion",
    "image": "https://images.unsplash.com/photo-1542291026-7eec264c27ff?auto=format&fit=crop&w=800&q=80&sig=prod_unique_385_fashion",
    "images": [
      "https://images.unsplash.com/photo-1542291026-7eec264c27ff?auto=format&fit=crop&w=800&q=80&sig=prod_unique_385_fashion",
      "https://images.unsplash.com/photo-1553062407-98eeb64c6a62?auto=format&fit=crop&w=800&q=80&sig=gallery_view1_385",
      "https://images.unsplash.com/photo-1542272604-780c36856842?auto=format&fit=crop&w=800&q=80&sig=gallery_view2_385",
      "https://images.unsplash.com/photo-1542291026-7eec264c27ff?auto=format&fit=crop&w=800&q=80&sig=gallery_view3_385"
    ],
    "countInStock": 120,
    "rating": 4.5,
    "numReviews": 315,
    "isFeatured": true,
    "description": "Brand: H&M | Premium tailored fashion product crafted from soft durable material."
  },
  {
    "name": "Green Soul Premium Home & Office Model 11",
    "price": 500,
    "originalPrice": 600,
    "category": "Home & Office",
    "image": "https://images.unsplash.com/photo-1507473885765-e6ed057f782c?auto=format&fit=crop&w=800&q=80&sig=prod_unique_386_homeoffice",
    "images": [
      "https://images.unsplash.com/photo-1507473885765-e6ed057f782c?auto=format&fit=crop&w=800&q=80&sig=prod_unique_386_homeoffice",
      "https://images.unsplash.com/photo-1567538096630-e0c55bd6374c?auto=format&fit=crop&w=800&q=80&sig=gallery_view1_386",
      "https://images.unsplash.com/photo-1507473885765-e6ed057f782c?auto=format&fit=crop&w=800&q=80&sig=gallery_view2_386",
      "https://images.unsplash.com/photo-1567538096630-e0c55bd6374c?auto=format&fit=crop&w=800&q=80&sig=gallery_view3_386"
    ],
    "countInStock": 12,
    "rating": 4.1,
    "numReviews": 45,
    "isFeatured": false,
    "description": "Brand: Green Soul | High quality home & office product designed for durability and daily performance."
  },
  {
    "name": "Wipro Premium Home & Office Model 12",
    "price": 500,
    "originalPrice": 600,
    "category": "Home & Office",
    "image": "https://images.unsplash.com/photo-1567538096630-e0c55bd6374c?auto=format&fit=crop&w=800&q=80&sig=prod_unique_387_homeoffice",
    "images": [
      "https://images.unsplash.com/photo-1567538096630-e0c55bd6374c?auto=format&fit=crop&w=800&q=80&sig=prod_unique_387_homeoffice",
      "https://images.unsplash.com/photo-1507473885765-e6ed057f782c?auto=format&fit=crop&w=800&q=80&sig=gallery_view1_387",
      "https://images.unsplash.com/photo-1567538096630-e0c55bd6374c?auto=format&fit=crop&w=800&q=80&sig=gallery_view2_387",
      "https://images.unsplash.com/photo-1507473885765-e6ed057f782c?auto=format&fit=crop&w=800&q=80&sig=gallery_view3_387"
    ],
    "countInStock": 14,
    "rating": 4.2,
    "numReviews": 50,
    "isFeatured": false,
    "description": "Brand: Wipro | High quality home & office product designed for durability and daily performance."
  },
  {
    "name": "Philips Premium Home & Office Model 13",
    "price": 500,
    "originalPrice": 600,
    "category": "Home & Office",
    "image": "https://images.unsplash.com/photo-1507473885765-e6ed057f782c?auto=format&fit=crop&w=800&q=80&sig=prod_unique_388_homeoffice",
    "images": [
      "https://images.unsplash.com/photo-1507473885765-e6ed057f782c?auto=format&fit=crop&w=800&q=80&sig=prod_unique_388_homeoffice",
      "https://images.unsplash.com/photo-1567538096630-e0c55bd6374c?auto=format&fit=crop&w=800&q=80&sig=gallery_view1_388",
      "https://images.unsplash.com/photo-1507473885765-e6ed057f782c?auto=format&fit=crop&w=800&q=80&sig=gallery_view2_388",
      "https://images.unsplash.com/photo-1567538096630-e0c55bd6374c?auto=format&fit=crop&w=800&q=80&sig=gallery_view3_388"
    ],
    "countInStock": 16,
    "rating": 4.3,
    "numReviews": 55,
    "isFeatured": false,
    "description": "Brand: Philips | High quality home & office product designed for durability and daily performance."
  },
  {
    "name": "IKEA Premium Home & Office Model 14",
    "price": 500,
    "originalPrice": 600,
    "category": "Home & Office",
    "image": "https://images.unsplash.com/photo-1567538096630-e0c55bd6374c?auto=format&fit=crop&w=800&q=80&sig=prod_unique_389_homeoffice",
    "images": [
      "https://images.unsplash.com/photo-1567538096630-e0c55bd6374c?auto=format&fit=crop&w=800&q=80&sig=prod_unique_389_homeoffice",
      "https://images.unsplash.com/photo-1507473885765-e6ed057f782c?auto=format&fit=crop&w=800&q=80&sig=gallery_view1_389",
      "https://images.unsplash.com/photo-1567538096630-e0c55bd6374c?auto=format&fit=crop&w=800&q=80&sig=gallery_view2_389",
      "https://images.unsplash.com/photo-1507473885765-e6ed057f782c?auto=format&fit=crop&w=800&q=80&sig=gallery_view3_389"
    ],
    "countInStock": 18,
    "rating": 4.4,
    "numReviews": 60,
    "isFeatured": false,
    "description": "Brand: IKEA | High quality home & office product designed for durability and daily performance."
  },
  {
    "name": "Haworth Premium Home & Office Model 15",
    "price": 500,
    "originalPrice": 600,
    "category": "Home & Office",
    "image": "https://images.unsplash.com/photo-1507473885765-e6ed057f782c?auto=format&fit=crop&w=800&q=80&sig=prod_unique_390_homeoffice",
    "images": [
      "https://images.unsplash.com/photo-1507473885765-e6ed057f782c?auto=format&fit=crop&w=800&q=80&sig=prod_unique_390_homeoffice",
      "https://images.unsplash.com/photo-1567538096630-e0c55bd6374c?auto=format&fit=crop&w=800&q=80&sig=gallery_view1_390",
      "https://images.unsplash.com/photo-1507473885765-e6ed057f782c?auto=format&fit=crop&w=800&q=80&sig=gallery_view2_390",
      "https://images.unsplash.com/photo-1567538096630-e0c55bd6374c?auto=format&fit=crop&w=800&q=80&sig=gallery_view3_390"
    ],
    "countInStock": 20,
    "rating": 4.5,
    "numReviews": 65,
    "isFeatured": true,
    "description": "Brand: Haworth | High quality home & office product designed for durability and daily performance."
  },
  {
    "name": "Steelcase Premium Home & Office Model 16",
    "price": 500,
    "originalPrice": 600,
    "category": "Home & Office",
    "image": "https://images.unsplash.com/photo-1567538096630-e0c55bd6374c?auto=format&fit=crop&w=800&q=80&sig=prod_unique_391_homeoffice",
    "images": [
      "https://images.unsplash.com/photo-1567538096630-e0c55bd6374c?auto=format&fit=crop&w=800&q=80&sig=prod_unique_391_homeoffice",
      "https://images.unsplash.com/photo-1507473885765-e6ed057f782c?auto=format&fit=crop&w=800&q=80&sig=gallery_view1_391",
      "https://images.unsplash.com/photo-1567538096630-e0c55bd6374c?auto=format&fit=crop&w=800&q=80&sig=gallery_view2_391",
      "https://images.unsplash.com/photo-1507473885765-e6ed057f782c?auto=format&fit=crop&w=800&q=80&sig=gallery_view3_391"
    ],
    "countInStock": 22,
    "rating": 4.6,
    "numReviews": 70,
    "isFeatured": false,
    "description": "Brand: Steelcase | High quality home & office product designed for durability and daily performance."
  },
  {
    "name": "Godrej Interio Premium Home & Office Model 17",
    "price": 500,
    "originalPrice": 600,
    "category": "Home & Office",
    "image": "https://images.unsplash.com/photo-1507473885765-e6ed057f782c?auto=format&fit=crop&w=800&q=80&sig=prod_unique_392_homeoffice",
    "images": [
      "https://images.unsplash.com/photo-1507473885765-e6ed057f782c?auto=format&fit=crop&w=800&q=80&sig=prod_unique_392_homeoffice",
      "https://images.unsplash.com/photo-1567538096630-e0c55bd6374c?auto=format&fit=crop&w=800&q=80&sig=gallery_view1_392",
      "https://images.unsplash.com/photo-1507473885765-e6ed057f782c?auto=format&fit=crop&w=800&q=80&sig=gallery_view2_392",
      "https://images.unsplash.com/photo-1567538096630-e0c55bd6374c?auto=format&fit=crop&w=800&q=80&sig=gallery_view3_392"
    ],
    "countInStock": 24,
    "rating": 4.7,
    "numReviews": 75,
    "isFeatured": false,
    "description": "Brand: Godrej Interio | High quality home & office product designed for durability and daily performance."
  },
  {
    "name": "Green Soul Premium Home & Office Model 18",
    "price": 500,
    "originalPrice": 600,
    "category": "Home & Office",
    "image": "https://images.unsplash.com/photo-1567538096630-e0c55bd6374c?auto=format&fit=crop&w=800&q=80&sig=prod_unique_393_homeoffice",
    "images": [
      "https://images.unsplash.com/photo-1567538096630-e0c55bd6374c?auto=format&fit=crop&w=800&q=80&sig=prod_unique_393_homeoffice",
      "https://images.unsplash.com/photo-1507473885765-e6ed057f782c?auto=format&fit=crop&w=800&q=80&sig=gallery_view1_393",
      "https://images.unsplash.com/photo-1567538096630-e0c55bd6374c?auto=format&fit=crop&w=800&q=80&sig=gallery_view2_393",
      "https://images.unsplash.com/photo-1507473885765-e6ed057f782c?auto=format&fit=crop&w=800&q=80&sig=gallery_view3_393"
    ],
    "countInStock": 26,
    "rating": 4.8,
    "numReviews": 80,
    "isFeatured": false,
    "description": "Brand: Green Soul | High quality home & office product designed for durability and daily performance."
  },
  {
    "name": "Wipro Premium Home & Office Model 19",
    "price": 500,
    "originalPrice": 600,
    "category": "Home & Office",
    "image": "https://images.unsplash.com/photo-1507473885765-e6ed057f782c?auto=format&fit=crop&w=800&q=80&sig=prod_unique_394_homeoffice",
    "images": [
      "https://images.unsplash.com/photo-1507473885765-e6ed057f782c?auto=format&fit=crop&w=800&q=80&sig=prod_unique_394_homeoffice",
      "https://images.unsplash.com/photo-1567538096630-e0c55bd6374c?auto=format&fit=crop&w=800&q=80&sig=gallery_view1_394",
      "https://images.unsplash.com/photo-1507473885765-e6ed057f782c?auto=format&fit=crop&w=800&q=80&sig=gallery_view2_394",
      "https://images.unsplash.com/photo-1567538096630-e0c55bd6374c?auto=format&fit=crop&w=800&q=80&sig=gallery_view3_394"
    ],
    "countInStock": 28,
    "rating": 4.9,
    "numReviews": 85,
    "isFeatured": false,
    "description": "Brand: Wipro | High quality home & office product designed for durability and daily performance."
  },
  {
    "name": "Philips Premium Home & Office Model 20",
    "price": 500,
    "originalPrice": 600,
    "category": "Home & Office",
    "image": "https://images.unsplash.com/photo-1567538096630-e0c55bd6374c?auto=format&fit=crop&w=800&q=80&sig=prod_unique_395_homeoffice",
    "images": [
      "https://images.unsplash.com/photo-1567538096630-e0c55bd6374c?auto=format&fit=crop&w=800&q=80&sig=prod_unique_395_homeoffice",
      "https://images.unsplash.com/photo-1507473885765-e6ed057f782c?auto=format&fit=crop&w=800&q=80&sig=gallery_view1_395",
      "https://images.unsplash.com/photo-1567538096630-e0c55bd6374c?auto=format&fit=crop&w=800&q=80&sig=gallery_view2_395",
      "https://images.unsplash.com/photo-1507473885765-e6ed057f782c?auto=format&fit=crop&w=800&q=80&sig=gallery_view3_395"
    ],
    "countInStock": 30,
    "rating": 4,
    "numReviews": 90,
    "isFeatured": true,
    "description": "Brand: Philips | High quality home & office product designed for durability and daily performance."
  },
  {
    "name": "IKEA Premium Home & Office Model 21",
    "price": 500,
    "originalPrice": 600,
    "category": "Home & Office",
    "image": "https://images.unsplash.com/photo-1507473885765-e6ed057f782c?auto=format&fit=crop&w=800&q=80&sig=prod_unique_396_homeoffice",
    "images": [
      "https://images.unsplash.com/photo-1507473885765-e6ed057f782c?auto=format&fit=crop&w=800&q=80&sig=prod_unique_396_homeoffice",
      "https://images.unsplash.com/photo-1567538096630-e0c55bd6374c?auto=format&fit=crop&w=800&q=80&sig=gallery_view1_396",
      "https://images.unsplash.com/photo-1507473885765-e6ed057f782c?auto=format&fit=crop&w=800&q=80&sig=gallery_view2_396",
      "https://images.unsplash.com/photo-1567538096630-e0c55bd6374c?auto=format&fit=crop&w=800&q=80&sig=gallery_view3_396"
    ],
    "countInStock": 32,
    "rating": 4.1,
    "numReviews": 95,
    "isFeatured": false,
    "description": "Brand: IKEA | High quality home & office product designed for durability and daily performance."
  },
  {
    "name": "Haworth Premium Home & Office Model 22",
    "price": 500,
    "originalPrice": 600,
    "category": "Home & Office",
    "image": "https://images.unsplash.com/photo-1567538096630-e0c55bd6374c?auto=format&fit=crop&w=800&q=80&sig=prod_unique_397_homeoffice",
    "images": [
      "https://images.unsplash.com/photo-1567538096630-e0c55bd6374c?auto=format&fit=crop&w=800&q=80&sig=prod_unique_397_homeoffice",
      "https://images.unsplash.com/photo-1507473885765-e6ed057f782c?auto=format&fit=crop&w=800&q=80&sig=gallery_view1_397",
      "https://images.unsplash.com/photo-1567538096630-e0c55bd6374c?auto=format&fit=crop&w=800&q=80&sig=gallery_view2_397",
      "https://images.unsplash.com/photo-1507473885765-e6ed057f782c?auto=format&fit=crop&w=800&q=80&sig=gallery_view3_397"
    ],
    "countInStock": 34,
    "rating": 4.2,
    "numReviews": 100,
    "isFeatured": false,
    "description": "Brand: Haworth | High quality home & office product designed for durability and daily performance."
  },
  {
    "name": "Steelcase Premium Home & Office Model 23",
    "price": 500,
    "originalPrice": 600,
    "category": "Home & Office",
    "image": "https://images.unsplash.com/photo-1507473885765-e6ed057f782c?auto=format&fit=crop&w=800&q=80&sig=prod_unique_398_homeoffice",
    "images": [
      "https://images.unsplash.com/photo-1507473885765-e6ed057f782c?auto=format&fit=crop&w=800&q=80&sig=prod_unique_398_homeoffice",
      "https://images.unsplash.com/photo-1567538096630-e0c55bd6374c?auto=format&fit=crop&w=800&q=80&sig=gallery_view1_398",
      "https://images.unsplash.com/photo-1507473885765-e6ed057f782c?auto=format&fit=crop&w=800&q=80&sig=gallery_view2_398",
      "https://images.unsplash.com/photo-1567538096630-e0c55bd6374c?auto=format&fit=crop&w=800&q=80&sig=gallery_view3_398"
    ],
    "countInStock": 36,
    "rating": 4.3,
    "numReviews": 105,
    "isFeatured": false,
    "description": "Brand: Steelcase | High quality home & office product designed for durability and daily performance."
  },
  {
    "name": "Godrej Interio Premium Home & Office Model 24",
    "price": 500,
    "originalPrice": 600,
    "category": "Home & Office",
    "image": "https://images.unsplash.com/photo-1567538096630-e0c55bd6374c?auto=format&fit=crop&w=800&q=80&sig=prod_unique_399_homeoffice",
    "images": [
      "https://images.unsplash.com/photo-1567538096630-e0c55bd6374c?auto=format&fit=crop&w=800&q=80&sig=prod_unique_399_homeoffice",
      "https://images.unsplash.com/photo-1507473885765-e6ed057f782c?auto=format&fit=crop&w=800&q=80&sig=gallery_view1_399",
      "https://images.unsplash.com/photo-1567538096630-e0c55bd6374c?auto=format&fit=crop&w=800&q=80&sig=gallery_view2_399",
      "https://images.unsplash.com/photo-1507473885765-e6ed057f782c?auto=format&fit=crop&w=800&q=80&sig=gallery_view3_399"
    ],
    "countInStock": 38,
    "rating": 4.4,
    "numReviews": 110,
    "isFeatured": false,
    "description": "Brand: Godrej Interio | High quality home & office product designed for durability and daily performance."
  },
  {
    "name": "Green Soul Premium Home & Office Model 25",
    "price": 500,
    "originalPrice": 600,
    "category": "Home & Office",
    "image": "https://images.unsplash.com/photo-1507473885765-e6ed057f782c?auto=format&fit=crop&w=800&q=80&sig=prod_unique_400_homeoffice",
    "images": [
      "https://images.unsplash.com/photo-1507473885765-e6ed057f782c?auto=format&fit=crop&w=800&q=80&sig=prod_unique_400_homeoffice",
      "https://images.unsplash.com/photo-1567538096630-e0c55bd6374c?auto=format&fit=crop&w=800&q=80&sig=gallery_view1_400",
      "https://images.unsplash.com/photo-1507473885765-e6ed057f782c?auto=format&fit=crop&w=800&q=80&sig=gallery_view2_400",
      "https://images.unsplash.com/photo-1567538096630-e0c55bd6374c?auto=format&fit=crop&w=800&q=80&sig=gallery_view3_400"
    ],
    "countInStock": 40,
    "rating": 4.5,
    "numReviews": 115,
    "isFeatured": true,
    "description": "Brand: Green Soul | High quality home & office product designed for durability and daily performance."
  },
  {
    "name": "Wipro Premium Home & Office Model 26",
    "price": 500,
    "originalPrice": 600,
    "category": "Home & Office",
    "image": "https://images.unsplash.com/photo-1567538096630-e0c55bd6374c?auto=format&fit=crop&w=800&q=80&sig=prod_unique_401_homeoffice",
    "images": [
      "https://images.unsplash.com/photo-1567538096630-e0c55bd6374c?auto=format&fit=crop&w=800&q=80&sig=prod_unique_401_homeoffice",
      "https://images.unsplash.com/photo-1507473885765-e6ed057f782c?auto=format&fit=crop&w=800&q=80&sig=gallery_view1_401",
      "https://images.unsplash.com/photo-1567538096630-e0c55bd6374c?auto=format&fit=crop&w=800&q=80&sig=gallery_view2_401",
      "https://images.unsplash.com/photo-1507473885765-e6ed057f782c?auto=format&fit=crop&w=800&q=80&sig=gallery_view3_401"
    ],
    "countInStock": 42,
    "rating": 4.6,
    "numReviews": 120,
    "isFeatured": false,
    "description": "Brand: Wipro | High quality home & office product designed for durability and daily performance."
  },
  {
    "name": "Philips Premium Home & Office Model 27",
    "price": 500,
    "originalPrice": 600,
    "category": "Home & Office",
    "image": "https://images.unsplash.com/photo-1507473885765-e6ed057f782c?auto=format&fit=crop&w=800&q=80&sig=prod_unique_402_homeoffice",
    "images": [
      "https://images.unsplash.com/photo-1507473885765-e6ed057f782c?auto=format&fit=crop&w=800&q=80&sig=prod_unique_402_homeoffice",
      "https://images.unsplash.com/photo-1567538096630-e0c55bd6374c?auto=format&fit=crop&w=800&q=80&sig=gallery_view1_402",
      "https://images.unsplash.com/photo-1507473885765-e6ed057f782c?auto=format&fit=crop&w=800&q=80&sig=gallery_view2_402",
      "https://images.unsplash.com/photo-1567538096630-e0c55bd6374c?auto=format&fit=crop&w=800&q=80&sig=gallery_view3_402"
    ],
    "countInStock": 44,
    "rating": 4.7,
    "numReviews": 125,
    "isFeatured": false,
    "description": "Brand: Philips | High quality home & office product designed for durability and daily performance."
  },
  {
    "name": "IKEA Premium Home & Office Model 28",
    "price": 500,
    "originalPrice": 600,
    "category": "Home & Office",
    "image": "https://images.unsplash.com/photo-1567538096630-e0c55bd6374c?auto=format&fit=crop&w=800&q=80&sig=prod_unique_403_homeoffice",
    "images": [
      "https://images.unsplash.com/photo-1567538096630-e0c55bd6374c?auto=format&fit=crop&w=800&q=80&sig=prod_unique_403_homeoffice",
      "https://images.unsplash.com/photo-1507473885765-e6ed057f782c?auto=format&fit=crop&w=800&q=80&sig=gallery_view1_403",
      "https://images.unsplash.com/photo-1567538096630-e0c55bd6374c?auto=format&fit=crop&w=800&q=80&sig=gallery_view2_403",
      "https://images.unsplash.com/photo-1507473885765-e6ed057f782c?auto=format&fit=crop&w=800&q=80&sig=gallery_view3_403"
    ],
    "countInStock": 46,
    "rating": 4.8,
    "numReviews": 130,
    "isFeatured": false,
    "description": "Brand: IKEA | High quality home & office product designed for durability and daily performance."
  },
  {
    "name": "Haworth Premium Home & Office Model 29",
    "price": 500,
    "originalPrice": 600,
    "category": "Home & Office",
    "image": "https://images.unsplash.com/photo-1507473885765-e6ed057f782c?auto=format&fit=crop&w=800&q=80&sig=prod_unique_404_homeoffice",
    "images": [
      "https://images.unsplash.com/photo-1507473885765-e6ed057f782c?auto=format&fit=crop&w=800&q=80&sig=prod_unique_404_homeoffice",
      "https://images.unsplash.com/photo-1567538096630-e0c55bd6374c?auto=format&fit=crop&w=800&q=80&sig=gallery_view1_404",
      "https://images.unsplash.com/photo-1507473885765-e6ed057f782c?auto=format&fit=crop&w=800&q=80&sig=gallery_view2_404",
      "https://images.unsplash.com/photo-1567538096630-e0c55bd6374c?auto=format&fit=crop&w=800&q=80&sig=gallery_view3_404"
    ],
    "countInStock": 48,
    "rating": 4.9,
    "numReviews": 135,
    "isFeatured": false,
    "description": "Brand: Haworth | High quality home & office product designed for durability and daily performance."
  },
  {
    "name": "Steelcase Premium Home & Office Model 30",
    "price": 500,
    "originalPrice": 600,
    "category": "Home & Office",
    "image": "https://images.unsplash.com/photo-1567538096630-e0c55bd6374c?auto=format&fit=crop&w=800&q=80&sig=prod_unique_405_homeoffice",
    "images": [
      "https://images.unsplash.com/photo-1567538096630-e0c55bd6374c?auto=format&fit=crop&w=800&q=80&sig=prod_unique_405_homeoffice",
      "https://images.unsplash.com/photo-1507473885765-e6ed057f782c?auto=format&fit=crop&w=800&q=80&sig=gallery_view1_405",
      "https://images.unsplash.com/photo-1567538096630-e0c55bd6374c?auto=format&fit=crop&w=800&q=80&sig=gallery_view2_405",
      "https://images.unsplash.com/photo-1507473885765-e6ed057f782c?auto=format&fit=crop&w=800&q=80&sig=gallery_view3_405"
    ],
    "countInStock": 50,
    "rating": 4,
    "numReviews": 140,
    "isFeatured": true,
    "description": "Brand: Steelcase | High quality home & office product designed for durability and daily performance."
  },
  {
    "name": "Godrej Interio Premium Home & Office Model 31",
    "price": 500,
    "originalPrice": 600,
    "category": "Home & Office",
    "image": "https://images.unsplash.com/photo-1507473885765-e6ed057f782c?auto=format&fit=crop&w=800&q=80&sig=prod_unique_406_homeoffice",
    "images": [
      "https://images.unsplash.com/photo-1507473885765-e6ed057f782c?auto=format&fit=crop&w=800&q=80&sig=prod_unique_406_homeoffice",
      "https://images.unsplash.com/photo-1567538096630-e0c55bd6374c?auto=format&fit=crop&w=800&q=80&sig=gallery_view1_406",
      "https://images.unsplash.com/photo-1507473885765-e6ed057f782c?auto=format&fit=crop&w=800&q=80&sig=gallery_view2_406",
      "https://images.unsplash.com/photo-1567538096630-e0c55bd6374c?auto=format&fit=crop&w=800&q=80&sig=gallery_view3_406"
    ],
    "countInStock": 52,
    "rating": 4.1,
    "numReviews": 145,
    "isFeatured": false,
    "description": "Brand: Godrej Interio | High quality home & office product designed for durability and daily performance."
  },
  {
    "name": "Green Soul Premium Home & Office Model 32",
    "price": 500,
    "originalPrice": 600,
    "category": "Home & Office",
    "image": "https://images.unsplash.com/photo-1567538096630-e0c55bd6374c?auto=format&fit=crop&w=800&q=80&sig=prod_unique_407_homeoffice",
    "images": [
      "https://images.unsplash.com/photo-1567538096630-e0c55bd6374c?auto=format&fit=crop&w=800&q=80&sig=prod_unique_407_homeoffice",
      "https://images.unsplash.com/photo-1507473885765-e6ed057f782c?auto=format&fit=crop&w=800&q=80&sig=gallery_view1_407",
      "https://images.unsplash.com/photo-1567538096630-e0c55bd6374c?auto=format&fit=crop&w=800&q=80&sig=gallery_view2_407",
      "https://images.unsplash.com/photo-1507473885765-e6ed057f782c?auto=format&fit=crop&w=800&q=80&sig=gallery_view3_407"
    ],
    "countInStock": 54,
    "rating": 4.2,
    "numReviews": 150,
    "isFeatured": false,
    "description": "Brand: Green Soul | High quality home & office product designed for durability and daily performance."
  },
  {
    "name": "Wipro Premium Home & Office Model 33",
    "price": 500,
    "originalPrice": 600,
    "category": "Home & Office",
    "image": "https://images.unsplash.com/photo-1507473885765-e6ed057f782c?auto=format&fit=crop&w=800&q=80&sig=prod_unique_408_homeoffice",
    "images": [
      "https://images.unsplash.com/photo-1507473885765-e6ed057f782c?auto=format&fit=crop&w=800&q=80&sig=prod_unique_408_homeoffice",
      "https://images.unsplash.com/photo-1567538096630-e0c55bd6374c?auto=format&fit=crop&w=800&q=80&sig=gallery_view1_408",
      "https://images.unsplash.com/photo-1507473885765-e6ed057f782c?auto=format&fit=crop&w=800&q=80&sig=gallery_view2_408",
      "https://images.unsplash.com/photo-1567538096630-e0c55bd6374c?auto=format&fit=crop&w=800&q=80&sig=gallery_view3_408"
    ],
    "countInStock": 56,
    "rating": 4.3,
    "numReviews": 155,
    "isFeatured": false,
    "description": "Brand: Wipro | High quality home & office product designed for durability and daily performance."
  },
  {
    "name": "Philips Premium Home & Office Model 34",
    "price": 500,
    "originalPrice": 600,
    "category": "Home & Office",
    "image": "https://images.unsplash.com/photo-1567538096630-e0c55bd6374c?auto=format&fit=crop&w=800&q=80&sig=prod_unique_409_homeoffice",
    "images": [
      "https://images.unsplash.com/photo-1567538096630-e0c55bd6374c?auto=format&fit=crop&w=800&q=80&sig=prod_unique_409_homeoffice",
      "https://images.unsplash.com/photo-1507473885765-e6ed057f782c?auto=format&fit=crop&w=800&q=80&sig=gallery_view1_409",
      "https://images.unsplash.com/photo-1567538096630-e0c55bd6374c?auto=format&fit=crop&w=800&q=80&sig=gallery_view2_409",
      "https://images.unsplash.com/photo-1507473885765-e6ed057f782c?auto=format&fit=crop&w=800&q=80&sig=gallery_view3_409"
    ],
    "countInStock": 58,
    "rating": 4.4,
    "numReviews": 160,
    "isFeatured": false,
    "description": "Brand: Philips | High quality home & office product designed for durability and daily performance."
  },
  {
    "name": "IKEA Premium Home & Office Model 35",
    "price": 500,
    "originalPrice": 600,
    "category": "Home & Office",
    "image": "https://images.unsplash.com/photo-1507473885765-e6ed057f782c?auto=format&fit=crop&w=800&q=80&sig=prod_unique_410_homeoffice",
    "images": [
      "https://images.unsplash.com/photo-1507473885765-e6ed057f782c?auto=format&fit=crop&w=800&q=80&sig=prod_unique_410_homeoffice",
      "https://images.unsplash.com/photo-1567538096630-e0c55bd6374c?auto=format&fit=crop&w=800&q=80&sig=gallery_view1_410",
      "https://images.unsplash.com/photo-1507473885765-e6ed057f782c?auto=format&fit=crop&w=800&q=80&sig=gallery_view2_410",
      "https://images.unsplash.com/photo-1567538096630-e0c55bd6374c?auto=format&fit=crop&w=800&q=80&sig=gallery_view3_410"
    ],
    "countInStock": 60,
    "rating": 4.5,
    "numReviews": 165,
    "isFeatured": true,
    "description": "Brand: IKEA | High quality home & office product designed for durability and daily performance."
  },
  {
    "name": "Haworth Premium Home & Office Model 36",
    "price": 500,
    "originalPrice": 600,
    "category": "Home & Office",
    "image": "https://images.unsplash.com/photo-1567538096630-e0c55bd6374c?auto=format&fit=crop&w=800&q=80&sig=prod_unique_411_homeoffice",
    "images": [
      "https://images.unsplash.com/photo-1567538096630-e0c55bd6374c?auto=format&fit=crop&w=800&q=80&sig=prod_unique_411_homeoffice",
      "https://images.unsplash.com/photo-1507473885765-e6ed057f782c?auto=format&fit=crop&w=800&q=80&sig=gallery_view1_411",
      "https://images.unsplash.com/photo-1567538096630-e0c55bd6374c?auto=format&fit=crop&w=800&q=80&sig=gallery_view2_411",
      "https://images.unsplash.com/photo-1507473885765-e6ed057f782c?auto=format&fit=crop&w=800&q=80&sig=gallery_view3_411"
    ],
    "countInStock": 62,
    "rating": 4.6,
    "numReviews": 170,
    "isFeatured": false,
    "description": "Brand: Haworth | High quality home & office product designed for durability and daily performance."
  },
  {
    "name": "Steelcase Premium Home & Office Model 37",
    "price": 500,
    "originalPrice": 600,
    "category": "Home & Office",
    "image": "https://images.unsplash.com/photo-1507473885765-e6ed057f782c?auto=format&fit=crop&w=800&q=80&sig=prod_unique_412_homeoffice",
    "images": [
      "https://images.unsplash.com/photo-1507473885765-e6ed057f782c?auto=format&fit=crop&w=800&q=80&sig=prod_unique_412_homeoffice",
      "https://images.unsplash.com/photo-1567538096630-e0c55bd6374c?auto=format&fit=crop&w=800&q=80&sig=gallery_view1_412",
      "https://images.unsplash.com/photo-1507473885765-e6ed057f782c?auto=format&fit=crop&w=800&q=80&sig=gallery_view2_412",
      "https://images.unsplash.com/photo-1567538096630-e0c55bd6374c?auto=format&fit=crop&w=800&q=80&sig=gallery_view3_412"
    ],
    "countInStock": 64,
    "rating": 4.7,
    "numReviews": 175,
    "isFeatured": false,
    "description": "Brand: Steelcase | High quality home & office product designed for durability and daily performance."
  },
  {
    "name": "Godrej Interio Premium Home & Office Model 38",
    "price": 500,
    "originalPrice": 600,
    "category": "Home & Office",
    "image": "https://images.unsplash.com/photo-1567538096630-e0c55bd6374c?auto=format&fit=crop&w=800&q=80&sig=prod_unique_413_homeoffice",
    "images": [
      "https://images.unsplash.com/photo-1567538096630-e0c55bd6374c?auto=format&fit=crop&w=800&q=80&sig=prod_unique_413_homeoffice",
      "https://images.unsplash.com/photo-1507473885765-e6ed057f782c?auto=format&fit=crop&w=800&q=80&sig=gallery_view1_413",
      "https://images.unsplash.com/photo-1567538096630-e0c55bd6374c?auto=format&fit=crop&w=800&q=80&sig=gallery_view2_413",
      "https://images.unsplash.com/photo-1507473885765-e6ed057f782c?auto=format&fit=crop&w=800&q=80&sig=gallery_view3_413"
    ],
    "countInStock": 66,
    "rating": 4.8,
    "numReviews": 180,
    "isFeatured": false,
    "description": "Brand: Godrej Interio | High quality home & office product designed for durability and daily performance."
  },
  {
    "name": "Green Soul Premium Home & Office Model 39",
    "price": 500,
    "originalPrice": 600,
    "category": "Home & Office",
    "image": "https://images.unsplash.com/photo-1507473885765-e6ed057f782c?auto=format&fit=crop&w=800&q=80&sig=prod_unique_414_homeoffice",
    "images": [
      "https://images.unsplash.com/photo-1507473885765-e6ed057f782c?auto=format&fit=crop&w=800&q=80&sig=prod_unique_414_homeoffice",
      "https://images.unsplash.com/photo-1567538096630-e0c55bd6374c?auto=format&fit=crop&w=800&q=80&sig=gallery_view1_414",
      "https://images.unsplash.com/photo-1507473885765-e6ed057f782c?auto=format&fit=crop&w=800&q=80&sig=gallery_view2_414",
      "https://images.unsplash.com/photo-1567538096630-e0c55bd6374c?auto=format&fit=crop&w=800&q=80&sig=gallery_view3_414"
    ],
    "countInStock": 68,
    "rating": 4.9,
    "numReviews": 185,
    "isFeatured": false,
    "description": "Brand: Green Soul | High quality home & office product designed for durability and daily performance."
  },
  {
    "name": "Wipro Premium Home & Office Model 40",
    "price": 500,
    "originalPrice": 600,
    "category": "Home & Office",
    "image": "https://images.unsplash.com/photo-1567538096630-e0c55bd6374c?auto=format&fit=crop&w=800&q=80&sig=prod_unique_415_homeoffice",
    "images": [
      "https://images.unsplash.com/photo-1567538096630-e0c55bd6374c?auto=format&fit=crop&w=800&q=80&sig=prod_unique_415_homeoffice",
      "https://images.unsplash.com/photo-1507473885765-e6ed057f782c?auto=format&fit=crop&w=800&q=80&sig=gallery_view1_415",
      "https://images.unsplash.com/photo-1567538096630-e0c55bd6374c?auto=format&fit=crop&w=800&q=80&sig=gallery_view2_415",
      "https://images.unsplash.com/photo-1507473885765-e6ed057f782c?auto=format&fit=crop&w=800&q=80&sig=gallery_view3_415"
    ],
    "countInStock": 70,
    "rating": 4,
    "numReviews": 190,
    "isFeatured": true,
    "description": "Brand: Wipro | High quality home & office product designed for durability and daily performance."
  },
  {
    "name": "Philips Premium Home & Office Model 41",
    "price": 500,
    "originalPrice": 600,
    "category": "Home & Office",
    "image": "https://images.unsplash.com/photo-1507473885765-e6ed057f782c?auto=format&fit=crop&w=800&q=80&sig=prod_unique_416_homeoffice",
    "images": [
      "https://images.unsplash.com/photo-1507473885765-e6ed057f782c?auto=format&fit=crop&w=800&q=80&sig=prod_unique_416_homeoffice",
      "https://images.unsplash.com/photo-1567538096630-e0c55bd6374c?auto=format&fit=crop&w=800&q=80&sig=gallery_view1_416",
      "https://images.unsplash.com/photo-1507473885765-e6ed057f782c?auto=format&fit=crop&w=800&q=80&sig=gallery_view2_416",
      "https://images.unsplash.com/photo-1567538096630-e0c55bd6374c?auto=format&fit=crop&w=800&q=80&sig=gallery_view3_416"
    ],
    "countInStock": 72,
    "rating": 4.1,
    "numReviews": 195,
    "isFeatured": false,
    "description": "Brand: Philips | High quality home & office product designed for durability and daily performance."
  },
  {
    "name": "IKEA Premium Home & Office Model 42",
    "price": 500,
    "originalPrice": 600,
    "category": "Home & Office",
    "image": "https://images.unsplash.com/photo-1567538096630-e0c55bd6374c?auto=format&fit=crop&w=800&q=80&sig=prod_unique_417_homeoffice",
    "images": [
      "https://images.unsplash.com/photo-1567538096630-e0c55bd6374c?auto=format&fit=crop&w=800&q=80&sig=prod_unique_417_homeoffice",
      "https://images.unsplash.com/photo-1507473885765-e6ed057f782c?auto=format&fit=crop&w=800&q=80&sig=gallery_view1_417",
      "https://images.unsplash.com/photo-1567538096630-e0c55bd6374c?auto=format&fit=crop&w=800&q=80&sig=gallery_view2_417",
      "https://images.unsplash.com/photo-1507473885765-e6ed057f782c?auto=format&fit=crop&w=800&q=80&sig=gallery_view3_417"
    ],
    "countInStock": 74,
    "rating": 4.2,
    "numReviews": 200,
    "isFeatured": false,
    "description": "Brand: IKEA | High quality home & office product designed for durability and daily performance."
  },
  {
    "name": "Haworth Premium Home & Office Model 43",
    "price": 500,
    "originalPrice": 600,
    "category": "Home & Office",
    "image": "https://images.unsplash.com/photo-1507473885765-e6ed057f782c?auto=format&fit=crop&w=800&q=80&sig=prod_unique_418_homeoffice",
    "images": [
      "https://images.unsplash.com/photo-1507473885765-e6ed057f782c?auto=format&fit=crop&w=800&q=80&sig=prod_unique_418_homeoffice",
      "https://images.unsplash.com/photo-1567538096630-e0c55bd6374c?auto=format&fit=crop&w=800&q=80&sig=gallery_view1_418",
      "https://images.unsplash.com/photo-1507473885765-e6ed057f782c?auto=format&fit=crop&w=800&q=80&sig=gallery_view2_418",
      "https://images.unsplash.com/photo-1567538096630-e0c55bd6374c?auto=format&fit=crop&w=800&q=80&sig=gallery_view3_418"
    ],
    "countInStock": 76,
    "rating": 4.3,
    "numReviews": 205,
    "isFeatured": false,
    "description": "Brand: Haworth | High quality home & office product designed for durability and daily performance."
  },
  {
    "name": "Steelcase Premium Home & Office Model 44",
    "price": 500,
    "originalPrice": 600,
    "category": "Home & Office",
    "image": "https://images.unsplash.com/photo-1567538096630-e0c55bd6374c?auto=format&fit=crop&w=800&q=80&sig=prod_unique_419_homeoffice",
    "images": [
      "https://images.unsplash.com/photo-1567538096630-e0c55bd6374c?auto=format&fit=crop&w=800&q=80&sig=prod_unique_419_homeoffice",
      "https://images.unsplash.com/photo-1507473885765-e6ed057f782c?auto=format&fit=crop&w=800&q=80&sig=gallery_view1_419",
      "https://images.unsplash.com/photo-1567538096630-e0c55bd6374c?auto=format&fit=crop&w=800&q=80&sig=gallery_view2_419",
      "https://images.unsplash.com/photo-1507473885765-e6ed057f782c?auto=format&fit=crop&w=800&q=80&sig=gallery_view3_419"
    ],
    "countInStock": 78,
    "rating": 4.4,
    "numReviews": 210,
    "isFeatured": false,
    "description": "Brand: Steelcase | High quality home & office product designed for durability and daily performance."
  },
  {
    "name": "Godrej Interio Premium Home & Office Model 45",
    "price": 500,
    "originalPrice": 600,
    "category": "Home & Office",
    "image": "https://images.unsplash.com/photo-1507473885765-e6ed057f782c?auto=format&fit=crop&w=800&q=80&sig=prod_unique_420_homeoffice",
    "images": [
      "https://images.unsplash.com/photo-1507473885765-e6ed057f782c?auto=format&fit=crop&w=800&q=80&sig=prod_unique_420_homeoffice",
      "https://images.unsplash.com/photo-1567538096630-e0c55bd6374c?auto=format&fit=crop&w=800&q=80&sig=gallery_view1_420",
      "https://images.unsplash.com/photo-1507473885765-e6ed057f782c?auto=format&fit=crop&w=800&q=80&sig=gallery_view2_420",
      "https://images.unsplash.com/photo-1567538096630-e0c55bd6374c?auto=format&fit=crop&w=800&q=80&sig=gallery_view3_420"
    ],
    "countInStock": 80,
    "rating": 4.5,
    "numReviews": 215,
    "isFeatured": true,
    "description": "Brand: Godrej Interio | High quality home & office product designed for durability and daily performance."
  },
  {
    "name": "Green Soul Premium Home & Office Model 46",
    "price": 500,
    "originalPrice": 600,
    "category": "Home & Office",
    "image": "https://images.unsplash.com/photo-1567538096630-e0c55bd6374c?auto=format&fit=crop&w=800&q=80&sig=prod_unique_421_homeoffice",
    "images": [
      "https://images.unsplash.com/photo-1567538096630-e0c55bd6374c?auto=format&fit=crop&w=800&q=80&sig=prod_unique_421_homeoffice",
      "https://images.unsplash.com/photo-1507473885765-e6ed057f782c?auto=format&fit=crop&w=800&q=80&sig=gallery_view1_421",
      "https://images.unsplash.com/photo-1567538096630-e0c55bd6374c?auto=format&fit=crop&w=800&q=80&sig=gallery_view2_421",
      "https://images.unsplash.com/photo-1507473885765-e6ed057f782c?auto=format&fit=crop&w=800&q=80&sig=gallery_view3_421"
    ],
    "countInStock": 82,
    "rating": 4.6,
    "numReviews": 220,
    "isFeatured": false,
    "description": "Brand: Green Soul | High quality home & office product designed for durability and daily performance."
  },
  {
    "name": "Wipro Premium Home & Office Model 47",
    "price": 500,
    "originalPrice": 600,
    "category": "Home & Office",
    "image": "https://images.unsplash.com/photo-1507473885765-e6ed057f782c?auto=format&fit=crop&w=800&q=80&sig=prod_unique_422_homeoffice",
    "images": [
      "https://images.unsplash.com/photo-1507473885765-e6ed057f782c?auto=format&fit=crop&w=800&q=80&sig=prod_unique_422_homeoffice",
      "https://images.unsplash.com/photo-1567538096630-e0c55bd6374c?auto=format&fit=crop&w=800&q=80&sig=gallery_view1_422",
      "https://images.unsplash.com/photo-1507473885765-e6ed057f782c?auto=format&fit=crop&w=800&q=80&sig=gallery_view2_422",
      "https://images.unsplash.com/photo-1567538096630-e0c55bd6374c?auto=format&fit=crop&w=800&q=80&sig=gallery_view3_422"
    ],
    "countInStock": 84,
    "rating": 4.7,
    "numReviews": 225,
    "isFeatured": false,
    "description": "Brand: Wipro | High quality home & office product designed for durability and daily performance."
  },
  {
    "name": "Philips Premium Home & Office Model 48",
    "price": 500,
    "originalPrice": 600,
    "category": "Home & Office",
    "image": "https://images.unsplash.com/photo-1567538096630-e0c55bd6374c?auto=format&fit=crop&w=800&q=80&sig=prod_unique_423_homeoffice",
    "images": [
      "https://images.unsplash.com/photo-1567538096630-e0c55bd6374c?auto=format&fit=crop&w=800&q=80&sig=prod_unique_423_homeoffice",
      "https://images.unsplash.com/photo-1507473885765-e6ed057f782c?auto=format&fit=crop&w=800&q=80&sig=gallery_view1_423",
      "https://images.unsplash.com/photo-1567538096630-e0c55bd6374c?auto=format&fit=crop&w=800&q=80&sig=gallery_view2_423",
      "https://images.unsplash.com/photo-1507473885765-e6ed057f782c?auto=format&fit=crop&w=800&q=80&sig=gallery_view3_423"
    ],
    "countInStock": 86,
    "rating": 4.8,
    "numReviews": 230,
    "isFeatured": false,
    "description": "Brand: Philips | High quality home & office product designed for durability and daily performance."
  },
  {
    "name": "IKEA Premium Home & Office Model 49",
    "price": 500,
    "originalPrice": 600,
    "category": "Home & Office",
    "image": "https://images.unsplash.com/photo-1507473885765-e6ed057f782c?auto=format&fit=crop&w=800&q=80&sig=prod_unique_424_homeoffice",
    "images": [
      "https://images.unsplash.com/photo-1507473885765-e6ed057f782c?auto=format&fit=crop&w=800&q=80&sig=prod_unique_424_homeoffice",
      "https://images.unsplash.com/photo-1567538096630-e0c55bd6374c?auto=format&fit=crop&w=800&q=80&sig=gallery_view1_424",
      "https://images.unsplash.com/photo-1507473885765-e6ed057f782c?auto=format&fit=crop&w=800&q=80&sig=gallery_view2_424",
      "https://images.unsplash.com/photo-1567538096630-e0c55bd6374c?auto=format&fit=crop&w=800&q=80&sig=gallery_view3_424"
    ],
    "countInStock": 88,
    "rating": 4.9,
    "numReviews": 235,
    "isFeatured": false,
    "description": "Brand: IKEA | High quality home & office product designed for durability and daily performance."
  },
  {
    "name": "Haworth Premium Home & Office Model 50",
    "price": 500,
    "originalPrice": 600,
    "category": "Home & Office",
    "image": "https://images.unsplash.com/photo-1567538096630-e0c55bd6374c?auto=format&fit=crop&w=800&q=80&sig=prod_unique_425_homeoffice",
    "images": [
      "https://images.unsplash.com/photo-1567538096630-e0c55bd6374c?auto=format&fit=crop&w=800&q=80&sig=prod_unique_425_homeoffice",
      "https://images.unsplash.com/photo-1507473885765-e6ed057f782c?auto=format&fit=crop&w=800&q=80&sig=gallery_view1_425",
      "https://images.unsplash.com/photo-1567538096630-e0c55bd6374c?auto=format&fit=crop&w=800&q=80&sig=gallery_view2_425",
      "https://images.unsplash.com/photo-1507473885765-e6ed057f782c?auto=format&fit=crop&w=800&q=80&sig=gallery_view3_425"
    ],
    "countInStock": 90,
    "rating": 4,
    "numReviews": 240,
    "isFeatured": true,
    "description": "Brand: Haworth | High quality home & office product designed for durability and daily performance."
  },
  {
    "name": "Steelcase Premium Home & Office Model 51",
    "price": 500,
    "originalPrice": 600,
    "category": "Home & Office",
    "image": "https://images.unsplash.com/photo-1507473885765-e6ed057f782c?auto=format&fit=crop&w=800&q=80&sig=prod_unique_426_homeoffice",
    "images": [
      "https://images.unsplash.com/photo-1507473885765-e6ed057f782c?auto=format&fit=crop&w=800&q=80&sig=prod_unique_426_homeoffice",
      "https://images.unsplash.com/photo-1567538096630-e0c55bd6374c?auto=format&fit=crop&w=800&q=80&sig=gallery_view1_426",
      "https://images.unsplash.com/photo-1507473885765-e6ed057f782c?auto=format&fit=crop&w=800&q=80&sig=gallery_view2_426",
      "https://images.unsplash.com/photo-1567538096630-e0c55bd6374c?auto=format&fit=crop&w=800&q=80&sig=gallery_view3_426"
    ],
    "countInStock": 92,
    "rating": 4.1,
    "numReviews": 245,
    "isFeatured": false,
    "description": "Brand: Steelcase | High quality home & office product designed for durability and daily performance."
  },
  {
    "name": "Godrej Interio Premium Home & Office Model 52",
    "price": 500,
    "originalPrice": 600,
    "category": "Home & Office",
    "image": "https://images.unsplash.com/photo-1567538096630-e0c55bd6374c?auto=format&fit=crop&w=800&q=80&sig=prod_unique_427_homeoffice",
    "images": [
      "https://images.unsplash.com/photo-1567538096630-e0c55bd6374c?auto=format&fit=crop&w=800&q=80&sig=prod_unique_427_homeoffice",
      "https://images.unsplash.com/photo-1507473885765-e6ed057f782c?auto=format&fit=crop&w=800&q=80&sig=gallery_view1_427",
      "https://images.unsplash.com/photo-1567538096630-e0c55bd6374c?auto=format&fit=crop&w=800&q=80&sig=gallery_view2_427",
      "https://images.unsplash.com/photo-1507473885765-e6ed057f782c?auto=format&fit=crop&w=800&q=80&sig=gallery_view3_427"
    ],
    "countInStock": 94,
    "rating": 4.2,
    "numReviews": 250,
    "isFeatured": false,
    "description": "Brand: Godrej Interio | High quality home & office product designed for durability and daily performance."
  },
  {
    "name": "Green Soul Premium Home & Office Model 53",
    "price": 500,
    "originalPrice": 600,
    "category": "Home & Office",
    "image": "https://images.unsplash.com/photo-1507473885765-e6ed057f782c?auto=format&fit=crop&w=800&q=80&sig=prod_unique_428_homeoffice",
    "images": [
      "https://images.unsplash.com/photo-1507473885765-e6ed057f782c?auto=format&fit=crop&w=800&q=80&sig=prod_unique_428_homeoffice",
      "https://images.unsplash.com/photo-1567538096630-e0c55bd6374c?auto=format&fit=crop&w=800&q=80&sig=gallery_view1_428",
      "https://images.unsplash.com/photo-1507473885765-e6ed057f782c?auto=format&fit=crop&w=800&q=80&sig=gallery_view2_428",
      "https://images.unsplash.com/photo-1567538096630-e0c55bd6374c?auto=format&fit=crop&w=800&q=80&sig=gallery_view3_428"
    ],
    "countInStock": 96,
    "rating": 4.3,
    "numReviews": 255,
    "isFeatured": false,
    "description": "Brand: Green Soul | High quality home & office product designed for durability and daily performance."
  },
  {
    "name": "Wipro Premium Home & Office Model 54",
    "price": 500,
    "originalPrice": 600,
    "category": "Home & Office",
    "image": "https://images.unsplash.com/photo-1567538096630-e0c55bd6374c?auto=format&fit=crop&w=800&q=80&sig=prod_unique_429_homeoffice",
    "images": [
      "https://images.unsplash.com/photo-1567538096630-e0c55bd6374c?auto=format&fit=crop&w=800&q=80&sig=prod_unique_429_homeoffice",
      "https://images.unsplash.com/photo-1507473885765-e6ed057f782c?auto=format&fit=crop&w=800&q=80&sig=gallery_view1_429",
      "https://images.unsplash.com/photo-1567538096630-e0c55bd6374c?auto=format&fit=crop&w=800&q=80&sig=gallery_view2_429",
      "https://images.unsplash.com/photo-1507473885765-e6ed057f782c?auto=format&fit=crop&w=800&q=80&sig=gallery_view3_429"
    ],
    "countInStock": 98,
    "rating": 4.4,
    "numReviews": 260,
    "isFeatured": false,
    "description": "Brand: Wipro | High quality home & office product designed for durability and daily performance."
  },
  {
    "name": "Philips Premium Home & Office Model 55",
    "price": 500,
    "originalPrice": 600,
    "category": "Home & Office",
    "image": "https://images.unsplash.com/photo-1507473885765-e6ed057f782c?auto=format&fit=crop&w=800&q=80&sig=prod_unique_430_homeoffice",
    "images": [
      "https://images.unsplash.com/photo-1507473885765-e6ed057f782c?auto=format&fit=crop&w=800&q=80&sig=prod_unique_430_homeoffice",
      "https://images.unsplash.com/photo-1567538096630-e0c55bd6374c?auto=format&fit=crop&w=800&q=80&sig=gallery_view1_430",
      "https://images.unsplash.com/photo-1507473885765-e6ed057f782c?auto=format&fit=crop&w=800&q=80&sig=gallery_view2_430",
      "https://images.unsplash.com/photo-1567538096630-e0c55bd6374c?auto=format&fit=crop&w=800&q=80&sig=gallery_view3_430"
    ],
    "countInStock": 100,
    "rating": 4.5,
    "numReviews": 265,
    "isFeatured": true,
    "description": "Brand: Philips | High quality home & office product designed for durability and daily performance."
  },
  {
    "name": "Urban Ladder Premium Furniture Model 11",
    "price": 500,
    "originalPrice": 600,
    "category": "Furniture",
    "image": "https://images.unsplash.com/photo-1555041469-a586c61ea9bc?auto=format&fit=crop&w=800&q=80&sig=prod_unique_431_furniture",
    "images": [
      "https://images.unsplash.com/photo-1555041469-a586c61ea9bc?auto=format&fit=crop&w=800&q=80&sig=prod_unique_431_furniture",
      "https://images.unsplash.com/photo-1586023492125-27b2c045efd7?auto=format&fit=crop&w=800&q=80&sig=gallery_view1_431",
      "https://images.unsplash.com/photo-1555041469-a586c61ea9bc?auto=format&fit=crop&w=800&q=80&sig=gallery_view2_431",
      "https://images.unsplash.com/photo-1586023492125-27b2c045efd7?auto=format&fit=crop&w=800&q=80&sig=gallery_view3_431"
    ],
    "countInStock": 12,
    "rating": 4.1,
    "numReviews": 45,
    "isFeatured": false,
    "description": "Brand: Urban Ladder | High quality furniture product designed for durability and daily performance."
  },
  {
    "name": "Pepperfry Premium Furniture Model 12",
    "price": 500,
    "originalPrice": 600,
    "category": "Furniture",
    "image": "https://images.unsplash.com/photo-1586023492125-27b2c045efd7?auto=format&fit=crop&w=800&q=80&sig=prod_unique_432_furniture",
    "images": [
      "https://images.unsplash.com/photo-1586023492125-27b2c045efd7?auto=format&fit=crop&w=800&q=80&sig=prod_unique_432_furniture",
      "https://images.unsplash.com/photo-1555041469-a586c61ea9bc?auto=format&fit=crop&w=800&q=80&sig=gallery_view1_432",
      "https://images.unsplash.com/photo-1586023492125-27b2c045efd7?auto=format&fit=crop&w=800&q=80&sig=gallery_view2_432",
      "https://images.unsplash.com/photo-1555041469-a586c61ea9bc?auto=format&fit=crop&w=800&q=80&sig=gallery_view3_432"
    ],
    "countInStock": 14,
    "rating": 4.2,
    "numReviews": 50,
    "isFeatured": false,
    "description": "Brand: Pepperfry | High quality furniture product designed for durability and daily performance."
  },
  {
    "name": "Godrej Interio Premium Furniture Model 13",
    "price": 500,
    "originalPrice": 600,
    "category": "Furniture",
    "image": "https://images.unsplash.com/photo-1555041469-a586c61ea9bc?auto=format&fit=crop&w=800&q=80&sig=prod_unique_433_furniture",
    "images": [
      "https://images.unsplash.com/photo-1555041469-a586c61ea9bc?auto=format&fit=crop&w=800&q=80&sig=prod_unique_433_furniture",
      "https://images.unsplash.com/photo-1586023492125-27b2c045efd7?auto=format&fit=crop&w=800&q=80&sig=gallery_view1_433",
      "https://images.unsplash.com/photo-1555041469-a586c61ea9bc?auto=format&fit=crop&w=800&q=80&sig=gallery_view2_433",
      "https://images.unsplash.com/photo-1586023492125-27b2c045efd7?auto=format&fit=crop&w=800&q=80&sig=gallery_view3_433"
    ],
    "countInStock": 16,
    "rating": 4.3,
    "numReviews": 55,
    "isFeatured": false,
    "description": "Brand: Godrej Interio | High quality furniture product designed for durability and daily performance."
  },
  {
    "name": "Wakefit Premium Furniture Model 14",
    "price": 500,
    "originalPrice": 600,
    "category": "Furniture",
    "image": "https://images.unsplash.com/photo-1586023492125-27b2c045efd7?auto=format&fit=crop&w=800&q=80&sig=prod_unique_434_furniture",
    "images": [
      "https://images.unsplash.com/photo-1586023492125-27b2c045efd7?auto=format&fit=crop&w=800&q=80&sig=prod_unique_434_furniture",
      "https://images.unsplash.com/photo-1555041469-a586c61ea9bc?auto=format&fit=crop&w=800&q=80&sig=gallery_view1_434",
      "https://images.unsplash.com/photo-1586023492125-27b2c045efd7?auto=format&fit=crop&w=800&q=80&sig=gallery_view2_434",
      "https://images.unsplash.com/photo-1555041469-a586c61ea9bc?auto=format&fit=crop&w=800&q=80&sig=gallery_view3_434"
    ],
    "countInStock": 18,
    "rating": 4.4,
    "numReviews": 60,
    "isFeatured": false,
    "description": "Brand: Wakefit | High quality furniture product designed for durability and daily performance."
  },
  {
    "name": "Durian Premium Furniture Model 15",
    "price": 500,
    "originalPrice": 600,
    "category": "Furniture",
    "image": "https://images.unsplash.com/photo-1555041469-a586c61ea9bc?auto=format&fit=crop&w=800&q=80&sig=prod_unique_435_furniture",
    "images": [
      "https://images.unsplash.com/photo-1555041469-a586c61ea9bc?auto=format&fit=crop&w=800&q=80&sig=prod_unique_435_furniture",
      "https://images.unsplash.com/photo-1586023492125-27b2c045efd7?auto=format&fit=crop&w=800&q=80&sig=gallery_view1_435",
      "https://images.unsplash.com/photo-1555041469-a586c61ea9bc?auto=format&fit=crop&w=800&q=80&sig=gallery_view2_435",
      "https://images.unsplash.com/photo-1586023492125-27b2c045efd7?auto=format&fit=crop&w=800&q=80&sig=gallery_view3_435"
    ],
    "countInStock": 20,
    "rating": 4.5,
    "numReviews": 65,
    "isFeatured": true,
    "description": "Brand: Durian | High quality furniture product designed for durability and daily performance."
  },
  {
    "name": "IKEA Premium Furniture Model 16",
    "price": 500,
    "originalPrice": 600,
    "category": "Furniture",
    "image": "https://images.unsplash.com/photo-1586023492125-27b2c045efd7?auto=format&fit=crop&w=800&q=80&sig=prod_unique_436_furniture",
    "images": [
      "https://images.unsplash.com/photo-1586023492125-27b2c045efd7?auto=format&fit=crop&w=800&q=80&sig=prod_unique_436_furniture",
      "https://images.unsplash.com/photo-1555041469-a586c61ea9bc?auto=format&fit=crop&w=800&q=80&sig=gallery_view1_436",
      "https://images.unsplash.com/photo-1586023492125-27b2c045efd7?auto=format&fit=crop&w=800&q=80&sig=gallery_view2_436",
      "https://images.unsplash.com/photo-1555041469-a586c61ea9bc?auto=format&fit=crop&w=800&q=80&sig=gallery_view3_436"
    ],
    "countInStock": 22,
    "rating": 4.6,
    "numReviews": 70,
    "isFeatured": false,
    "description": "Brand: IKEA | High quality furniture product designed for durability and daily performance."
  },
  {
    "name": "Urban Ladder Premium Furniture Model 17",
    "price": 500,
    "originalPrice": 600,
    "category": "Furniture",
    "image": "https://images.unsplash.com/photo-1555041469-a586c61ea9bc?auto=format&fit=crop&w=800&q=80&sig=prod_unique_437_furniture",
    "images": [
      "https://images.unsplash.com/photo-1555041469-a586c61ea9bc?auto=format&fit=crop&w=800&q=80&sig=prod_unique_437_furniture",
      "https://images.unsplash.com/photo-1586023492125-27b2c045efd7?auto=format&fit=crop&w=800&q=80&sig=gallery_view1_437",
      "https://images.unsplash.com/photo-1555041469-a586c61ea9bc?auto=format&fit=crop&w=800&q=80&sig=gallery_view2_437",
      "https://images.unsplash.com/photo-1586023492125-27b2c045efd7?auto=format&fit=crop&w=800&q=80&sig=gallery_view3_437"
    ],
    "countInStock": 24,
    "rating": 4.7,
    "numReviews": 75,
    "isFeatured": false,
    "description": "Brand: Urban Ladder | High quality furniture product designed for durability and daily performance."
  },
  {
    "name": "Pepperfry Premium Furniture Model 18",
    "price": 500,
    "originalPrice": 600,
    "category": "Furniture",
    "image": "https://images.unsplash.com/photo-1586023492125-27b2c045efd7?auto=format&fit=crop&w=800&q=80&sig=prod_unique_438_furniture",
    "images": [
      "https://images.unsplash.com/photo-1586023492125-27b2c045efd7?auto=format&fit=crop&w=800&q=80&sig=prod_unique_438_furniture",
      "https://images.unsplash.com/photo-1555041469-a586c61ea9bc?auto=format&fit=crop&w=800&q=80&sig=gallery_view1_438",
      "https://images.unsplash.com/photo-1586023492125-27b2c045efd7?auto=format&fit=crop&w=800&q=80&sig=gallery_view2_438",
      "https://images.unsplash.com/photo-1555041469-a586c61ea9bc?auto=format&fit=crop&w=800&q=80&sig=gallery_view3_438"
    ],
    "countInStock": 26,
    "rating": 4.8,
    "numReviews": 80,
    "isFeatured": false,
    "description": "Brand: Pepperfry | High quality furniture product designed for durability and daily performance."
  },
  {
    "name": "Godrej Interio Premium Furniture Model 19",
    "price": 500,
    "originalPrice": 600,
    "category": "Furniture",
    "image": "https://images.unsplash.com/photo-1555041469-a586c61ea9bc?auto=format&fit=crop&w=800&q=80&sig=prod_unique_439_furniture",
    "images": [
      "https://images.unsplash.com/photo-1555041469-a586c61ea9bc?auto=format&fit=crop&w=800&q=80&sig=prod_unique_439_furniture",
      "https://images.unsplash.com/photo-1586023492125-27b2c045efd7?auto=format&fit=crop&w=800&q=80&sig=gallery_view1_439",
      "https://images.unsplash.com/photo-1555041469-a586c61ea9bc?auto=format&fit=crop&w=800&q=80&sig=gallery_view2_439",
      "https://images.unsplash.com/photo-1586023492125-27b2c045efd7?auto=format&fit=crop&w=800&q=80&sig=gallery_view3_439"
    ],
    "countInStock": 28,
    "rating": 4.9,
    "numReviews": 85,
    "isFeatured": false,
    "description": "Brand: Godrej Interio | High quality furniture product designed for durability and daily performance."
  },
  {
    "name": "Wakefit Premium Furniture Model 20",
    "price": 500,
    "originalPrice": 600,
    "category": "Furniture",
    "image": "https://images.unsplash.com/photo-1586023492125-27b2c045efd7?auto=format&fit=crop&w=800&q=80&sig=prod_unique_440_furniture",
    "images": [
      "https://images.unsplash.com/photo-1586023492125-27b2c045efd7?auto=format&fit=crop&w=800&q=80&sig=prod_unique_440_furniture",
      "https://images.unsplash.com/photo-1555041469-a586c61ea9bc?auto=format&fit=crop&w=800&q=80&sig=gallery_view1_440",
      "https://images.unsplash.com/photo-1586023492125-27b2c045efd7?auto=format&fit=crop&w=800&q=80&sig=gallery_view2_440",
      "https://images.unsplash.com/photo-1555041469-a586c61ea9bc?auto=format&fit=crop&w=800&q=80&sig=gallery_view3_440"
    ],
    "countInStock": 30,
    "rating": 4,
    "numReviews": 90,
    "isFeatured": true,
    "description": "Brand: Wakefit | High quality furniture product designed for durability and daily performance."
  },
  {
    "name": "Durian Premium Furniture Model 21",
    "price": 500,
    "originalPrice": 600,
    "category": "Furniture",
    "image": "https://images.unsplash.com/photo-1555041469-a586c61ea9bc?auto=format&fit=crop&w=800&q=80&sig=prod_unique_441_furniture",
    "images": [
      "https://images.unsplash.com/photo-1555041469-a586c61ea9bc?auto=format&fit=crop&w=800&q=80&sig=prod_unique_441_furniture",
      "https://images.unsplash.com/photo-1586023492125-27b2c045efd7?auto=format&fit=crop&w=800&q=80&sig=gallery_view1_441",
      "https://images.unsplash.com/photo-1555041469-a586c61ea9bc?auto=format&fit=crop&w=800&q=80&sig=gallery_view2_441",
      "https://images.unsplash.com/photo-1586023492125-27b2c045efd7?auto=format&fit=crop&w=800&q=80&sig=gallery_view3_441"
    ],
    "countInStock": 32,
    "rating": 4.1,
    "numReviews": 95,
    "isFeatured": false,
    "description": "Brand: Durian | High quality furniture product designed for durability and daily performance."
  },
  {
    "name": "IKEA Premium Furniture Model 22",
    "price": 500,
    "originalPrice": 600,
    "category": "Furniture",
    "image": "https://images.unsplash.com/photo-1586023492125-27b2c045efd7?auto=format&fit=crop&w=800&q=80&sig=prod_unique_442_furniture",
    "images": [
      "https://images.unsplash.com/photo-1586023492125-27b2c045efd7?auto=format&fit=crop&w=800&q=80&sig=prod_unique_442_furniture",
      "https://images.unsplash.com/photo-1555041469-a586c61ea9bc?auto=format&fit=crop&w=800&q=80&sig=gallery_view1_442",
      "https://images.unsplash.com/photo-1586023492125-27b2c045efd7?auto=format&fit=crop&w=800&q=80&sig=gallery_view2_442",
      "https://images.unsplash.com/photo-1555041469-a586c61ea9bc?auto=format&fit=crop&w=800&q=80&sig=gallery_view3_442"
    ],
    "countInStock": 34,
    "rating": 4.2,
    "numReviews": 100,
    "isFeatured": false,
    "description": "Brand: IKEA | High quality furniture product designed for durability and daily performance."
  },
  {
    "name": "Urban Ladder Premium Furniture Model 23",
    "price": 500,
    "originalPrice": 600,
    "category": "Furniture",
    "image": "https://images.unsplash.com/photo-1555041469-a586c61ea9bc?auto=format&fit=crop&w=800&q=80&sig=prod_unique_443_furniture",
    "images": [
      "https://images.unsplash.com/photo-1555041469-a586c61ea9bc?auto=format&fit=crop&w=800&q=80&sig=prod_unique_443_furniture",
      "https://images.unsplash.com/photo-1586023492125-27b2c045efd7?auto=format&fit=crop&w=800&q=80&sig=gallery_view1_443",
      "https://images.unsplash.com/photo-1555041469-a586c61ea9bc?auto=format&fit=crop&w=800&q=80&sig=gallery_view2_443",
      "https://images.unsplash.com/photo-1586023492125-27b2c045efd7?auto=format&fit=crop&w=800&q=80&sig=gallery_view3_443"
    ],
    "countInStock": 36,
    "rating": 4.3,
    "numReviews": 105,
    "isFeatured": false,
    "description": "Brand: Urban Ladder | High quality furniture product designed for durability and daily performance."
  },
  {
    "name": "Pepperfry Premium Furniture Model 24",
    "price": 500,
    "originalPrice": 600,
    "category": "Furniture",
    "image": "https://images.unsplash.com/photo-1586023492125-27b2c045efd7?auto=format&fit=crop&w=800&q=80&sig=prod_unique_444_furniture",
    "images": [
      "https://images.unsplash.com/photo-1586023492125-27b2c045efd7?auto=format&fit=crop&w=800&q=80&sig=prod_unique_444_furniture",
      "https://images.unsplash.com/photo-1555041469-a586c61ea9bc?auto=format&fit=crop&w=800&q=80&sig=gallery_view1_444",
      "https://images.unsplash.com/photo-1586023492125-27b2c045efd7?auto=format&fit=crop&w=800&q=80&sig=gallery_view2_444",
      "https://images.unsplash.com/photo-1555041469-a586c61ea9bc?auto=format&fit=crop&w=800&q=80&sig=gallery_view3_444"
    ],
    "countInStock": 38,
    "rating": 4.4,
    "numReviews": 110,
    "isFeatured": false,
    "description": "Brand: Pepperfry | High quality furniture product designed for durability and daily performance."
  },
  {
    "name": "Godrej Interio Premium Furniture Model 25",
    "price": 500,
    "originalPrice": 600,
    "category": "Furniture",
    "image": "https://images.unsplash.com/photo-1555041469-a586c61ea9bc?auto=format&fit=crop&w=800&q=80&sig=prod_unique_445_furniture",
    "images": [
      "https://images.unsplash.com/photo-1555041469-a586c61ea9bc?auto=format&fit=crop&w=800&q=80&sig=prod_unique_445_furniture",
      "https://images.unsplash.com/photo-1586023492125-27b2c045efd7?auto=format&fit=crop&w=800&q=80&sig=gallery_view1_445",
      "https://images.unsplash.com/photo-1555041469-a586c61ea9bc?auto=format&fit=crop&w=800&q=80&sig=gallery_view2_445",
      "https://images.unsplash.com/photo-1586023492125-27b2c045efd7?auto=format&fit=crop&w=800&q=80&sig=gallery_view3_445"
    ],
    "countInStock": 40,
    "rating": 4.5,
    "numReviews": 115,
    "isFeatured": true,
    "description": "Brand: Godrej Interio | High quality furniture product designed for durability and daily performance."
  },
  {
    "name": "Wakefit Premium Furniture Model 26",
    "price": 500,
    "originalPrice": 600,
    "category": "Furniture",
    "image": "https://images.unsplash.com/photo-1586023492125-27b2c045efd7?auto=format&fit=crop&w=800&q=80&sig=prod_unique_446_furniture",
    "images": [
      "https://images.unsplash.com/photo-1586023492125-27b2c045efd7?auto=format&fit=crop&w=800&q=80&sig=prod_unique_446_furniture",
      "https://images.unsplash.com/photo-1555041469-a586c61ea9bc?auto=format&fit=crop&w=800&q=80&sig=gallery_view1_446",
      "https://images.unsplash.com/photo-1586023492125-27b2c045efd7?auto=format&fit=crop&w=800&q=80&sig=gallery_view2_446",
      "https://images.unsplash.com/photo-1555041469-a586c61ea9bc?auto=format&fit=crop&w=800&q=80&sig=gallery_view3_446"
    ],
    "countInStock": 42,
    "rating": 4.6,
    "numReviews": 120,
    "isFeatured": false,
    "description": "Brand: Wakefit | High quality furniture product designed for durability and daily performance."
  },
  {
    "name": "Durian Premium Furniture Model 27",
    "price": 500,
    "originalPrice": 600,
    "category": "Furniture",
    "image": "https://images.unsplash.com/photo-1555041469-a586c61ea9bc?auto=format&fit=crop&w=800&q=80&sig=prod_unique_447_furniture",
    "images": [
      "https://images.unsplash.com/photo-1555041469-a586c61ea9bc?auto=format&fit=crop&w=800&q=80&sig=prod_unique_447_furniture",
      "https://images.unsplash.com/photo-1586023492125-27b2c045efd7?auto=format&fit=crop&w=800&q=80&sig=gallery_view1_447",
      "https://images.unsplash.com/photo-1555041469-a586c61ea9bc?auto=format&fit=crop&w=800&q=80&sig=gallery_view2_447",
      "https://images.unsplash.com/photo-1586023492125-27b2c045efd7?auto=format&fit=crop&w=800&q=80&sig=gallery_view3_447"
    ],
    "countInStock": 44,
    "rating": 4.7,
    "numReviews": 125,
    "isFeatured": false,
    "description": "Brand: Durian | High quality furniture product designed for durability and daily performance."
  },
  {
    "name": "IKEA Premium Furniture Model 28",
    "price": 500,
    "originalPrice": 600,
    "category": "Furniture",
    "image": "https://images.unsplash.com/photo-1586023492125-27b2c045efd7?auto=format&fit=crop&w=800&q=80&sig=prod_unique_448_furniture",
    "images": [
      "https://images.unsplash.com/photo-1586023492125-27b2c045efd7?auto=format&fit=crop&w=800&q=80&sig=prod_unique_448_furniture",
      "https://images.unsplash.com/photo-1555041469-a586c61ea9bc?auto=format&fit=crop&w=800&q=80&sig=gallery_view1_448",
      "https://images.unsplash.com/photo-1586023492125-27b2c045efd7?auto=format&fit=crop&w=800&q=80&sig=gallery_view2_448",
      "https://images.unsplash.com/photo-1555041469-a586c61ea9bc?auto=format&fit=crop&w=800&q=80&sig=gallery_view3_448"
    ],
    "countInStock": 46,
    "rating": 4.8,
    "numReviews": 130,
    "isFeatured": false,
    "description": "Brand: IKEA | High quality furniture product designed for durability and daily performance."
  },
  {
    "name": "Urban Ladder Premium Furniture Model 29",
    "price": 500,
    "originalPrice": 600,
    "category": "Furniture",
    "image": "https://images.unsplash.com/photo-1555041469-a586c61ea9bc?auto=format&fit=crop&w=800&q=80&sig=prod_unique_449_furniture",
    "images": [
      "https://images.unsplash.com/photo-1555041469-a586c61ea9bc?auto=format&fit=crop&w=800&q=80&sig=prod_unique_449_furniture",
      "https://images.unsplash.com/photo-1586023492125-27b2c045efd7?auto=format&fit=crop&w=800&q=80&sig=gallery_view1_449",
      "https://images.unsplash.com/photo-1555041469-a586c61ea9bc?auto=format&fit=crop&w=800&q=80&sig=gallery_view2_449",
      "https://images.unsplash.com/photo-1586023492125-27b2c045efd7?auto=format&fit=crop&w=800&q=80&sig=gallery_view3_449"
    ],
    "countInStock": 48,
    "rating": 4.9,
    "numReviews": 135,
    "isFeatured": false,
    "description": "Brand: Urban Ladder | High quality furniture product designed for durability and daily performance."
  },
  {
    "name": "Pepperfry Premium Furniture Model 30",
    "price": 500,
    "originalPrice": 600,
    "category": "Furniture",
    "image": "https://images.unsplash.com/photo-1586023492125-27b2c045efd7?auto=format&fit=crop&w=800&q=80&sig=prod_unique_450_furniture",
    "images": [
      "https://images.unsplash.com/photo-1586023492125-27b2c045efd7?auto=format&fit=crop&w=800&q=80&sig=prod_unique_450_furniture",
      "https://images.unsplash.com/photo-1555041469-a586c61ea9bc?auto=format&fit=crop&w=800&q=80&sig=gallery_view1_450",
      "https://images.unsplash.com/photo-1586023492125-27b2c045efd7?auto=format&fit=crop&w=800&q=80&sig=gallery_view2_450",
      "https://images.unsplash.com/photo-1555041469-a586c61ea9bc?auto=format&fit=crop&w=800&q=80&sig=gallery_view3_450"
    ],
    "countInStock": 50,
    "rating": 4,
    "numReviews": 140,
    "isFeatured": true,
    "description": "Brand: Pepperfry | High quality furniture product designed for durability and daily performance."
  },
  {
    "name": "Godrej Interio Premium Furniture Model 31",
    "price": 500,
    "originalPrice": 600,
    "category": "Furniture",
    "image": "https://images.unsplash.com/photo-1555041469-a586c61ea9bc?auto=format&fit=crop&w=800&q=80&sig=prod_unique_451_furniture",
    "images": [
      "https://images.unsplash.com/photo-1555041469-a586c61ea9bc?auto=format&fit=crop&w=800&q=80&sig=prod_unique_451_furniture",
      "https://images.unsplash.com/photo-1586023492125-27b2c045efd7?auto=format&fit=crop&w=800&q=80&sig=gallery_view1_451",
      "https://images.unsplash.com/photo-1555041469-a586c61ea9bc?auto=format&fit=crop&w=800&q=80&sig=gallery_view2_451",
      "https://images.unsplash.com/photo-1586023492125-27b2c045efd7?auto=format&fit=crop&w=800&q=80&sig=gallery_view3_451"
    ],
    "countInStock": 52,
    "rating": 4.1,
    "numReviews": 145,
    "isFeatured": false,
    "description": "Brand: Godrej Interio | High quality furniture product designed for durability and daily performance."
  },
  {
    "name": "Wakefit Premium Furniture Model 32",
    "price": 500,
    "originalPrice": 600,
    "category": "Furniture",
    "image": "https://images.unsplash.com/photo-1586023492125-27b2c045efd7?auto=format&fit=crop&w=800&q=80&sig=prod_unique_452_furniture",
    "images": [
      "https://images.unsplash.com/photo-1586023492125-27b2c045efd7?auto=format&fit=crop&w=800&q=80&sig=prod_unique_452_furniture",
      "https://images.unsplash.com/photo-1555041469-a586c61ea9bc?auto=format&fit=crop&w=800&q=80&sig=gallery_view1_452",
      "https://images.unsplash.com/photo-1586023492125-27b2c045efd7?auto=format&fit=crop&w=800&q=80&sig=gallery_view2_452",
      "https://images.unsplash.com/photo-1555041469-a586c61ea9bc?auto=format&fit=crop&w=800&q=80&sig=gallery_view3_452"
    ],
    "countInStock": 54,
    "rating": 4.2,
    "numReviews": 150,
    "isFeatured": false,
    "description": "Brand: Wakefit | High quality furniture product designed for durability and daily performance."
  },
  {
    "name": "Durian Premium Furniture Model 33",
    "price": 500,
    "originalPrice": 600,
    "category": "Furniture",
    "image": "https://images.unsplash.com/photo-1555041469-a586c61ea9bc?auto=format&fit=crop&w=800&q=80&sig=prod_unique_453_furniture",
    "images": [
      "https://images.unsplash.com/photo-1555041469-a586c61ea9bc?auto=format&fit=crop&w=800&q=80&sig=prod_unique_453_furniture",
      "https://images.unsplash.com/photo-1586023492125-27b2c045efd7?auto=format&fit=crop&w=800&q=80&sig=gallery_view1_453",
      "https://images.unsplash.com/photo-1555041469-a586c61ea9bc?auto=format&fit=crop&w=800&q=80&sig=gallery_view2_453",
      "https://images.unsplash.com/photo-1586023492125-27b2c045efd7?auto=format&fit=crop&w=800&q=80&sig=gallery_view3_453"
    ],
    "countInStock": 56,
    "rating": 4.3,
    "numReviews": 155,
    "isFeatured": false,
    "description": "Brand: Durian | High quality furniture product designed for durability and daily performance."
  },
  {
    "name": "IKEA Premium Furniture Model 34",
    "price": 500,
    "originalPrice": 600,
    "category": "Furniture",
    "image": "https://images.unsplash.com/photo-1586023492125-27b2c045efd7?auto=format&fit=crop&w=800&q=80&sig=prod_unique_454_furniture",
    "images": [
      "https://images.unsplash.com/photo-1586023492125-27b2c045efd7?auto=format&fit=crop&w=800&q=80&sig=prod_unique_454_furniture",
      "https://images.unsplash.com/photo-1555041469-a586c61ea9bc?auto=format&fit=crop&w=800&q=80&sig=gallery_view1_454",
      "https://images.unsplash.com/photo-1586023492125-27b2c045efd7?auto=format&fit=crop&w=800&q=80&sig=gallery_view2_454",
      "https://images.unsplash.com/photo-1555041469-a586c61ea9bc?auto=format&fit=crop&w=800&q=80&sig=gallery_view3_454"
    ],
    "countInStock": 58,
    "rating": 4.4,
    "numReviews": 160,
    "isFeatured": false,
    "description": "Brand: IKEA | High quality furniture product designed for durability and daily performance."
  },
  {
    "name": "Urban Ladder Premium Furniture Model 35",
    "price": 500,
    "originalPrice": 600,
    "category": "Furniture",
    "image": "https://images.unsplash.com/photo-1555041469-a586c61ea9bc?auto=format&fit=crop&w=800&q=80&sig=prod_unique_455_furniture",
    "images": [
      "https://images.unsplash.com/photo-1555041469-a586c61ea9bc?auto=format&fit=crop&w=800&q=80&sig=prod_unique_455_furniture",
      "https://images.unsplash.com/photo-1586023492125-27b2c045efd7?auto=format&fit=crop&w=800&q=80&sig=gallery_view1_455",
      "https://images.unsplash.com/photo-1555041469-a586c61ea9bc?auto=format&fit=crop&w=800&q=80&sig=gallery_view2_455",
      "https://images.unsplash.com/photo-1586023492125-27b2c045efd7?auto=format&fit=crop&w=800&q=80&sig=gallery_view3_455"
    ],
    "countInStock": 60,
    "rating": 4.5,
    "numReviews": 165,
    "isFeatured": true,
    "description": "Brand: Urban Ladder | High quality furniture product designed for durability and daily performance."
  },
  {
    "name": "Pepperfry Premium Furniture Model 36",
    "price": 500,
    "originalPrice": 600,
    "category": "Furniture",
    "image": "https://images.unsplash.com/photo-1586023492125-27b2c045efd7?auto=format&fit=crop&w=800&q=80&sig=prod_unique_456_furniture",
    "images": [
      "https://images.unsplash.com/photo-1586023492125-27b2c045efd7?auto=format&fit=crop&w=800&q=80&sig=prod_unique_456_furniture",
      "https://images.unsplash.com/photo-1555041469-a586c61ea9bc?auto=format&fit=crop&w=800&q=80&sig=gallery_view1_456",
      "https://images.unsplash.com/photo-1586023492125-27b2c045efd7?auto=format&fit=crop&w=800&q=80&sig=gallery_view2_456",
      "https://images.unsplash.com/photo-1555041469-a586c61ea9bc?auto=format&fit=crop&w=800&q=80&sig=gallery_view3_456"
    ],
    "countInStock": 62,
    "rating": 4.6,
    "numReviews": 170,
    "isFeatured": false,
    "description": "Brand: Pepperfry | High quality furniture product designed for durability and daily performance."
  },
  {
    "name": "Godrej Interio Premium Furniture Model 37",
    "price": 500,
    "originalPrice": 600,
    "category": "Furniture",
    "image": "https://images.unsplash.com/photo-1555041469-a586c61ea9bc?auto=format&fit=crop&w=800&q=80&sig=prod_unique_457_furniture",
    "images": [
      "https://images.unsplash.com/photo-1555041469-a586c61ea9bc?auto=format&fit=crop&w=800&q=80&sig=prod_unique_457_furniture",
      "https://images.unsplash.com/photo-1586023492125-27b2c045efd7?auto=format&fit=crop&w=800&q=80&sig=gallery_view1_457",
      "https://images.unsplash.com/photo-1555041469-a586c61ea9bc?auto=format&fit=crop&w=800&q=80&sig=gallery_view2_457",
      "https://images.unsplash.com/photo-1586023492125-27b2c045efd7?auto=format&fit=crop&w=800&q=80&sig=gallery_view3_457"
    ],
    "countInStock": 64,
    "rating": 4.7,
    "numReviews": 175,
    "isFeatured": false,
    "description": "Brand: Godrej Interio | High quality furniture product designed for durability and daily performance."
  },
  {
    "name": "Wakefit Premium Furniture Model 38",
    "price": 500,
    "originalPrice": 600,
    "category": "Furniture",
    "image": "https://images.unsplash.com/photo-1586023492125-27b2c045efd7?auto=format&fit=crop&w=800&q=80&sig=prod_unique_458_furniture",
    "images": [
      "https://images.unsplash.com/photo-1586023492125-27b2c045efd7?auto=format&fit=crop&w=800&q=80&sig=prod_unique_458_furniture",
      "https://images.unsplash.com/photo-1555041469-a586c61ea9bc?auto=format&fit=crop&w=800&q=80&sig=gallery_view1_458",
      "https://images.unsplash.com/photo-1586023492125-27b2c045efd7?auto=format&fit=crop&w=800&q=80&sig=gallery_view2_458",
      "https://images.unsplash.com/photo-1555041469-a586c61ea9bc?auto=format&fit=crop&w=800&q=80&sig=gallery_view3_458"
    ],
    "countInStock": 66,
    "rating": 4.8,
    "numReviews": 180,
    "isFeatured": false,
    "description": "Brand: Wakefit | High quality furniture product designed for durability and daily performance."
  },
  {
    "name": "Durian Premium Furniture Model 39",
    "price": 500,
    "originalPrice": 600,
    "category": "Furniture",
    "image": "https://images.unsplash.com/photo-1555041469-a586c61ea9bc?auto=format&fit=crop&w=800&q=80&sig=prod_unique_459_furniture",
    "images": [
      "https://images.unsplash.com/photo-1555041469-a586c61ea9bc?auto=format&fit=crop&w=800&q=80&sig=prod_unique_459_furniture",
      "https://images.unsplash.com/photo-1586023492125-27b2c045efd7?auto=format&fit=crop&w=800&q=80&sig=gallery_view1_459",
      "https://images.unsplash.com/photo-1555041469-a586c61ea9bc?auto=format&fit=crop&w=800&q=80&sig=gallery_view2_459",
      "https://images.unsplash.com/photo-1586023492125-27b2c045efd7?auto=format&fit=crop&w=800&q=80&sig=gallery_view3_459"
    ],
    "countInStock": 68,
    "rating": 4.9,
    "numReviews": 185,
    "isFeatured": false,
    "description": "Brand: Durian | High quality furniture product designed for durability and daily performance."
  },
  {
    "name": "IKEA Premium Furniture Model 40",
    "price": 500,
    "originalPrice": 600,
    "category": "Furniture",
    "image": "https://images.unsplash.com/photo-1586023492125-27b2c045efd7?auto=format&fit=crop&w=800&q=80&sig=prod_unique_460_furniture",
    "images": [
      "https://images.unsplash.com/photo-1586023492125-27b2c045efd7?auto=format&fit=crop&w=800&q=80&sig=prod_unique_460_furniture",
      "https://images.unsplash.com/photo-1555041469-a586c61ea9bc?auto=format&fit=crop&w=800&q=80&sig=gallery_view1_460",
      "https://images.unsplash.com/photo-1586023492125-27b2c045efd7?auto=format&fit=crop&w=800&q=80&sig=gallery_view2_460",
      "https://images.unsplash.com/photo-1555041469-a586c61ea9bc?auto=format&fit=crop&w=800&q=80&sig=gallery_view3_460"
    ],
    "countInStock": 70,
    "rating": 4,
    "numReviews": 190,
    "isFeatured": true,
    "description": "Brand: IKEA | High quality furniture product designed for durability and daily performance."
  },
  {
    "name": "Urban Ladder Premium Furniture Model 41",
    "price": 500,
    "originalPrice": 600,
    "category": "Furniture",
    "image": "https://images.unsplash.com/photo-1555041469-a586c61ea9bc?auto=format&fit=crop&w=800&q=80&sig=prod_unique_461_furniture",
    "images": [
      "https://images.unsplash.com/photo-1555041469-a586c61ea9bc?auto=format&fit=crop&w=800&q=80&sig=prod_unique_461_furniture",
      "https://images.unsplash.com/photo-1586023492125-27b2c045efd7?auto=format&fit=crop&w=800&q=80&sig=gallery_view1_461",
      "https://images.unsplash.com/photo-1555041469-a586c61ea9bc?auto=format&fit=crop&w=800&q=80&sig=gallery_view2_461",
      "https://images.unsplash.com/photo-1586023492125-27b2c045efd7?auto=format&fit=crop&w=800&q=80&sig=gallery_view3_461"
    ],
    "countInStock": 72,
    "rating": 4.1,
    "numReviews": 195,
    "isFeatured": false,
    "description": "Brand: Urban Ladder | High quality furniture product designed for durability and daily performance."
  },
  {
    "name": "Pepperfry Premium Furniture Model 42",
    "price": 500,
    "originalPrice": 600,
    "category": "Furniture",
    "image": "https://images.unsplash.com/photo-1586023492125-27b2c045efd7?auto=format&fit=crop&w=800&q=80&sig=prod_unique_462_furniture",
    "images": [
      "https://images.unsplash.com/photo-1586023492125-27b2c045efd7?auto=format&fit=crop&w=800&q=80&sig=prod_unique_462_furniture",
      "https://images.unsplash.com/photo-1555041469-a586c61ea9bc?auto=format&fit=crop&w=800&q=80&sig=gallery_view1_462",
      "https://images.unsplash.com/photo-1586023492125-27b2c045efd7?auto=format&fit=crop&w=800&q=80&sig=gallery_view2_462",
      "https://images.unsplash.com/photo-1555041469-a586c61ea9bc?auto=format&fit=crop&w=800&q=80&sig=gallery_view3_462"
    ],
    "countInStock": 74,
    "rating": 4.2,
    "numReviews": 200,
    "isFeatured": false,
    "description": "Brand: Pepperfry | High quality furniture product designed for durability and daily performance."
  },
  {
    "name": "Godrej Interio Premium Furniture Model 43",
    "price": 500,
    "originalPrice": 600,
    "category": "Furniture",
    "image": "https://images.unsplash.com/photo-1555041469-a586c61ea9bc?auto=format&fit=crop&w=800&q=80&sig=prod_unique_463_furniture",
    "images": [
      "https://images.unsplash.com/photo-1555041469-a586c61ea9bc?auto=format&fit=crop&w=800&q=80&sig=prod_unique_463_furniture",
      "https://images.unsplash.com/photo-1586023492125-27b2c045efd7?auto=format&fit=crop&w=800&q=80&sig=gallery_view1_463",
      "https://images.unsplash.com/photo-1555041469-a586c61ea9bc?auto=format&fit=crop&w=800&q=80&sig=gallery_view2_463",
      "https://images.unsplash.com/photo-1586023492125-27b2c045efd7?auto=format&fit=crop&w=800&q=80&sig=gallery_view3_463"
    ],
    "countInStock": 76,
    "rating": 4.3,
    "numReviews": 205,
    "isFeatured": false,
    "description": "Brand: Godrej Interio | High quality furniture product designed for durability and daily performance."
  },
  {
    "name": "Wakefit Premium Furniture Model 44",
    "price": 500,
    "originalPrice": 600,
    "category": "Furniture",
    "image": "https://images.unsplash.com/photo-1586023492125-27b2c045efd7?auto=format&fit=crop&w=800&q=80&sig=prod_unique_464_furniture",
    "images": [
      "https://images.unsplash.com/photo-1586023492125-27b2c045efd7?auto=format&fit=crop&w=800&q=80&sig=prod_unique_464_furniture",
      "https://images.unsplash.com/photo-1555041469-a586c61ea9bc?auto=format&fit=crop&w=800&q=80&sig=gallery_view1_464",
      "https://images.unsplash.com/photo-1586023492125-27b2c045efd7?auto=format&fit=crop&w=800&q=80&sig=gallery_view2_464",
      "https://images.unsplash.com/photo-1555041469-a586c61ea9bc?auto=format&fit=crop&w=800&q=80&sig=gallery_view3_464"
    ],
    "countInStock": 78,
    "rating": 4.4,
    "numReviews": 210,
    "isFeatured": false,
    "description": "Brand: Wakefit | High quality furniture product designed for durability and daily performance."
  },
  {
    "name": "Durian Premium Furniture Model 45",
    "price": 500,
    "originalPrice": 600,
    "category": "Furniture",
    "image": "https://images.unsplash.com/photo-1555041469-a586c61ea9bc?auto=format&fit=crop&w=800&q=80&sig=prod_unique_465_furniture",
    "images": [
      "https://images.unsplash.com/photo-1555041469-a586c61ea9bc?auto=format&fit=crop&w=800&q=80&sig=prod_unique_465_furniture",
      "https://images.unsplash.com/photo-1586023492125-27b2c045efd7?auto=format&fit=crop&w=800&q=80&sig=gallery_view1_465",
      "https://images.unsplash.com/photo-1555041469-a586c61ea9bc?auto=format&fit=crop&w=800&q=80&sig=gallery_view2_465",
      "https://images.unsplash.com/photo-1586023492125-27b2c045efd7?auto=format&fit=crop&w=800&q=80&sig=gallery_view3_465"
    ],
    "countInStock": 80,
    "rating": 4.5,
    "numReviews": 215,
    "isFeatured": true,
    "description": "Brand: Durian | High quality furniture product designed for durability and daily performance."
  },
  {
    "name": "Prestige Premium Kitchen Model 11",
    "price": 500,
    "originalPrice": 600,
    "category": "Kitchen",
    "image": "https://images.unsplash.com/photo-1584269600464-37b1b58a9fe7?auto=format&fit=crop&w=800&q=80&sig=prod_unique_466_kitchen",
    "images": [
      "https://images.unsplash.com/photo-1584269600464-37b1b58a9fe7?auto=format&fit=crop&w=800&q=80&sig=prod_unique_466_kitchen",
      "https://images.unsplash.com/photo-1556911220-e15b29be8c8f?auto=format&fit=crop&w=800&q=80&sig=gallery_view1_466",
      "https://images.unsplash.com/photo-1584269600464-37b1b58a9fe7?auto=format&fit=crop&w=800&q=80&sig=gallery_view2_466",
      "https://images.unsplash.com/photo-1556911220-e15b29be8c8f?auto=format&fit=crop&w=800&q=80&sig=gallery_view3_466"
    ],
    "countInStock": 12,
    "rating": 4.1,
    "numReviews": 45,
    "isFeatured": false,
    "description": "Brand: Prestige | High quality kitchen product designed for durability and daily performance."
  },
  {
    "name": "Wonderchef Premium Kitchen Model 12",
    "price": 500,
    "originalPrice": 600,
    "category": "Kitchen",
    "image": "https://images.unsplash.com/photo-1556911220-e15b29be8c8f?auto=format&fit=crop&w=800&q=80&sig=prod_unique_467_kitchen",
    "images": [
      "https://images.unsplash.com/photo-1556911220-e15b29be8c8f?auto=format&fit=crop&w=800&q=80&sig=prod_unique_467_kitchen",
      "https://images.unsplash.com/photo-1584269600464-37b1b58a9fe7?auto=format&fit=crop&w=800&q=80&sig=gallery_view1_467",
      "https://images.unsplash.com/photo-1556911220-e15b29be8c8f?auto=format&fit=crop&w=800&q=80&sig=gallery_view2_467",
      "https://images.unsplash.com/photo-1584269600464-37b1b58a9fe7?auto=format&fit=crop&w=800&q=80&sig=gallery_view3_467"
    ],
    "countInStock": 14,
    "rating": 4.2,
    "numReviews": 50,
    "isFeatured": false,
    "description": "Brand: Wonderchef | High quality kitchen product designed for durability and daily performance."
  },
  {
    "name": "Morphy Richards Premium Kitchen Model 13",
    "price": 500,
    "originalPrice": 600,
    "category": "Kitchen",
    "image": "https://images.unsplash.com/photo-1584269600464-37b1b58a9fe7?auto=format&fit=crop&w=800&q=80&sig=prod_unique_468_kitchen",
    "images": [
      "https://images.unsplash.com/photo-1584269600464-37b1b58a9fe7?auto=format&fit=crop&w=800&q=80&sig=prod_unique_468_kitchen",
      "https://images.unsplash.com/photo-1556911220-e15b29be8c8f?auto=format&fit=crop&w=800&q=80&sig=gallery_view1_468",
      "https://images.unsplash.com/photo-1584269600464-37b1b58a9fe7?auto=format&fit=crop&w=800&q=80&sig=gallery_view2_468",
      "https://images.unsplash.com/photo-1556911220-e15b29be8c8f?auto=format&fit=crop&w=800&q=80&sig=gallery_view3_468"
    ],
    "countInStock": 16,
    "rating": 4.3,
    "numReviews": 55,
    "isFeatured": false,
    "description": "Brand: Morphy Richards | High quality kitchen product designed for durability and daily performance."
  },
  {
    "name": "Instant Pot Premium Kitchen Model 14",
    "price": 500,
    "originalPrice": 600,
    "category": "Kitchen",
    "image": "https://images.unsplash.com/photo-1556911220-e15b29be8c8f?auto=format&fit=crop&w=800&q=80&sig=prod_unique_469_kitchen",
    "images": [
      "https://images.unsplash.com/photo-1556911220-e15b29be8c8f?auto=format&fit=crop&w=800&q=80&sig=prod_unique_469_kitchen",
      "https://images.unsplash.com/photo-1584269600464-37b1b58a9fe7?auto=format&fit=crop&w=800&q=80&sig=gallery_view1_469",
      "https://images.unsplash.com/photo-1556911220-e15b29be8c8f?auto=format&fit=crop&w=800&q=80&sig=gallery_view2_469",
      "https://images.unsplash.com/photo-1584269600464-37b1b58a9fe7?auto=format&fit=crop&w=800&q=80&sig=gallery_view3_469"
    ],
    "countInStock": 18,
    "rating": 4.4,
    "numReviews": 60,
    "isFeatured": false,
    "description": "Brand: Instant Pot | High quality kitchen product designed for durability and daily performance."
  },
  {
    "name": "Ninja Premium Kitchen Model 15",
    "price": 500,
    "originalPrice": 600,
    "category": "Kitchen",
    "image": "https://images.unsplash.com/photo-1584269600464-37b1b58a9fe7?auto=format&fit=crop&w=800&q=80&sig=prod_unique_470_kitchen",
    "images": [
      "https://images.unsplash.com/photo-1584269600464-37b1b58a9fe7?auto=format&fit=crop&w=800&q=80&sig=prod_unique_470_kitchen",
      "https://images.unsplash.com/photo-1556911220-e15b29be8c8f?auto=format&fit=crop&w=800&q=80&sig=gallery_view1_470",
      "https://images.unsplash.com/photo-1584269600464-37b1b58a9fe7?auto=format&fit=crop&w=800&q=80&sig=gallery_view2_470",
      "https://images.unsplash.com/photo-1556911220-e15b29be8c8f?auto=format&fit=crop&w=800&q=80&sig=gallery_view3_470"
    ],
    "countInStock": 20,
    "rating": 4.5,
    "numReviews": 65,
    "isFeatured": true,
    "description": "Brand: Ninja | High quality kitchen product designed for durability and daily performance."
  },
  {
    "name": "Cuisinart Premium Kitchen Model 16",
    "price": 500,
    "originalPrice": 600,
    "category": "Kitchen",
    "image": "https://images.unsplash.com/photo-1556911220-e15b29be8c8f?auto=format&fit=crop&w=800&q=80&sig=prod_unique_471_kitchen",
    "images": [
      "https://images.unsplash.com/photo-1556911220-e15b29be8c8f?auto=format&fit=crop&w=800&q=80&sig=prod_unique_471_kitchen",
      "https://images.unsplash.com/photo-1584269600464-37b1b58a9fe7?auto=format&fit=crop&w=800&q=80&sig=gallery_view1_471",
      "https://images.unsplash.com/photo-1556911220-e15b29be8c8f?auto=format&fit=crop&w=800&q=80&sig=gallery_view2_471",
      "https://images.unsplash.com/photo-1584269600464-37b1b58a9fe7?auto=format&fit=crop&w=800&q=80&sig=gallery_view3_471"
    ],
    "countInStock": 22,
    "rating": 4.6,
    "numReviews": 70,
    "isFeatured": false,
    "description": "Brand: Cuisinart | High quality kitchen product designed for durability and daily performance."
  },
  {
    "name": "Philips Premium Kitchen Model 17",
    "price": 500,
    "originalPrice": 600,
    "category": "Kitchen",
    "image": "https://images.unsplash.com/photo-1584269600464-37b1b58a9fe7?auto=format&fit=crop&w=800&q=80&sig=prod_unique_472_kitchen",
    "images": [
      "https://images.unsplash.com/photo-1584269600464-37b1b58a9fe7?auto=format&fit=crop&w=800&q=80&sig=prod_unique_472_kitchen",
      "https://images.unsplash.com/photo-1556911220-e15b29be8c8f?auto=format&fit=crop&w=800&q=80&sig=gallery_view1_472",
      "https://images.unsplash.com/photo-1584269600464-37b1b58a9fe7?auto=format&fit=crop&w=800&q=80&sig=gallery_view2_472",
      "https://images.unsplash.com/photo-1556911220-e15b29be8c8f?auto=format&fit=crop&w=800&q=80&sig=gallery_view3_472"
    ],
    "countInStock": 24,
    "rating": 4.7,
    "numReviews": 75,
    "isFeatured": false,
    "description": "Brand: Philips | High quality kitchen product designed for durability and daily performance."
  },
  {
    "name": "Prestige Premium Kitchen Model 18",
    "price": 500,
    "originalPrice": 600,
    "category": "Kitchen",
    "image": "https://images.unsplash.com/photo-1556911220-e15b29be8c8f?auto=format&fit=crop&w=800&q=80&sig=prod_unique_473_kitchen",
    "images": [
      "https://images.unsplash.com/photo-1556911220-e15b29be8c8f?auto=format&fit=crop&w=800&q=80&sig=prod_unique_473_kitchen",
      "https://images.unsplash.com/photo-1584269600464-37b1b58a9fe7?auto=format&fit=crop&w=800&q=80&sig=gallery_view1_473",
      "https://images.unsplash.com/photo-1556911220-e15b29be8c8f?auto=format&fit=crop&w=800&q=80&sig=gallery_view2_473",
      "https://images.unsplash.com/photo-1584269600464-37b1b58a9fe7?auto=format&fit=crop&w=800&q=80&sig=gallery_view3_473"
    ],
    "countInStock": 26,
    "rating": 4.8,
    "numReviews": 80,
    "isFeatured": false,
    "description": "Brand: Prestige | High quality kitchen product designed for durability and daily performance."
  },
  {
    "name": "Wonderchef Premium Kitchen Model 19",
    "price": 500,
    "originalPrice": 600,
    "category": "Kitchen",
    "image": "https://images.unsplash.com/photo-1584269600464-37b1b58a9fe7?auto=format&fit=crop&w=800&q=80&sig=prod_unique_474_kitchen",
    "images": [
      "https://images.unsplash.com/photo-1584269600464-37b1b58a9fe7?auto=format&fit=crop&w=800&q=80&sig=prod_unique_474_kitchen",
      "https://images.unsplash.com/photo-1556911220-e15b29be8c8f?auto=format&fit=crop&w=800&q=80&sig=gallery_view1_474",
      "https://images.unsplash.com/photo-1584269600464-37b1b58a9fe7?auto=format&fit=crop&w=800&q=80&sig=gallery_view2_474",
      "https://images.unsplash.com/photo-1556911220-e15b29be8c8f?auto=format&fit=crop&w=800&q=80&sig=gallery_view3_474"
    ],
    "countInStock": 28,
    "rating": 4.9,
    "numReviews": 85,
    "isFeatured": false,
    "description": "Brand: Wonderchef | High quality kitchen product designed for durability and daily performance."
  },
  {
    "name": "Morphy Richards Premium Kitchen Model 20",
    "price": 500,
    "originalPrice": 600,
    "category": "Kitchen",
    "image": "https://images.unsplash.com/photo-1556911220-e15b29be8c8f?auto=format&fit=crop&w=800&q=80&sig=prod_unique_475_kitchen",
    "images": [
      "https://images.unsplash.com/photo-1556911220-e15b29be8c8f?auto=format&fit=crop&w=800&q=80&sig=prod_unique_475_kitchen",
      "https://images.unsplash.com/photo-1584269600464-37b1b58a9fe7?auto=format&fit=crop&w=800&q=80&sig=gallery_view1_475",
      "https://images.unsplash.com/photo-1556911220-e15b29be8c8f?auto=format&fit=crop&w=800&q=80&sig=gallery_view2_475",
      "https://images.unsplash.com/photo-1584269600464-37b1b58a9fe7?auto=format&fit=crop&w=800&q=80&sig=gallery_view3_475"
    ],
    "countInStock": 30,
    "rating": 4,
    "numReviews": 90,
    "isFeatured": true,
    "description": "Brand: Morphy Richards | High quality kitchen product designed for durability and daily performance."
  },
  {
    "name": "Instant Pot Premium Kitchen Model 21",
    "price": 500,
    "originalPrice": 600,
    "category": "Kitchen",
    "image": "https://images.unsplash.com/photo-1584269600464-37b1b58a9fe7?auto=format&fit=crop&w=800&q=80&sig=prod_unique_476_kitchen",
    "images": [
      "https://images.unsplash.com/photo-1584269600464-37b1b58a9fe7?auto=format&fit=crop&w=800&q=80&sig=prod_unique_476_kitchen",
      "https://images.unsplash.com/photo-1556911220-e15b29be8c8f?auto=format&fit=crop&w=800&q=80&sig=gallery_view1_476",
      "https://images.unsplash.com/photo-1584269600464-37b1b58a9fe7?auto=format&fit=crop&w=800&q=80&sig=gallery_view2_476",
      "https://images.unsplash.com/photo-1556911220-e15b29be8c8f?auto=format&fit=crop&w=800&q=80&sig=gallery_view3_476"
    ],
    "countInStock": 32,
    "rating": 4.1,
    "numReviews": 95,
    "isFeatured": false,
    "description": "Brand: Instant Pot | High quality kitchen product designed for durability and daily performance."
  },
  {
    "name": "Ninja Premium Kitchen Model 22",
    "price": 500,
    "originalPrice": 600,
    "category": "Kitchen",
    "image": "https://images.unsplash.com/photo-1556911220-e15b29be8c8f?auto=format&fit=crop&w=800&q=80&sig=prod_unique_477_kitchen",
    "images": [
      "https://images.unsplash.com/photo-1556911220-e15b29be8c8f?auto=format&fit=crop&w=800&q=80&sig=prod_unique_477_kitchen",
      "https://images.unsplash.com/photo-1584269600464-37b1b58a9fe7?auto=format&fit=crop&w=800&q=80&sig=gallery_view1_477",
      "https://images.unsplash.com/photo-1556911220-e15b29be8c8f?auto=format&fit=crop&w=800&q=80&sig=gallery_view2_477",
      "https://images.unsplash.com/photo-1584269600464-37b1b58a9fe7?auto=format&fit=crop&w=800&q=80&sig=gallery_view3_477"
    ],
    "countInStock": 34,
    "rating": 4.2,
    "numReviews": 100,
    "isFeatured": false,
    "description": "Brand: Ninja | High quality kitchen product designed for durability and daily performance."
  },
  {
    "name": "Cuisinart Premium Kitchen Model 23",
    "price": 500,
    "originalPrice": 600,
    "category": "Kitchen",
    "image": "https://images.unsplash.com/photo-1584269600464-37b1b58a9fe7?auto=format&fit=crop&w=800&q=80&sig=prod_unique_478_kitchen",
    "images": [
      "https://images.unsplash.com/photo-1584269600464-37b1b58a9fe7?auto=format&fit=crop&w=800&q=80&sig=prod_unique_478_kitchen",
      "https://images.unsplash.com/photo-1556911220-e15b29be8c8f?auto=format&fit=crop&w=800&q=80&sig=gallery_view1_478",
      "https://images.unsplash.com/photo-1584269600464-37b1b58a9fe7?auto=format&fit=crop&w=800&q=80&sig=gallery_view2_478",
      "https://images.unsplash.com/photo-1556911220-e15b29be8c8f?auto=format&fit=crop&w=800&q=80&sig=gallery_view3_478"
    ],
    "countInStock": 36,
    "rating": 4.3,
    "numReviews": 105,
    "isFeatured": false,
    "description": "Brand: Cuisinart | High quality kitchen product designed for durability and daily performance."
  },
  {
    "name": "Philips Premium Kitchen Model 24",
    "price": 500,
    "originalPrice": 600,
    "category": "Kitchen",
    "image": "https://images.unsplash.com/photo-1556911220-e15b29be8c8f?auto=format&fit=crop&w=800&q=80&sig=prod_unique_479_kitchen",
    "images": [
      "https://images.unsplash.com/photo-1556911220-e15b29be8c8f?auto=format&fit=crop&w=800&q=80&sig=prod_unique_479_kitchen",
      "https://images.unsplash.com/photo-1584269600464-37b1b58a9fe7?auto=format&fit=crop&w=800&q=80&sig=gallery_view1_479",
      "https://images.unsplash.com/photo-1556911220-e15b29be8c8f?auto=format&fit=crop&w=800&q=80&sig=gallery_view2_479",
      "https://images.unsplash.com/photo-1584269600464-37b1b58a9fe7?auto=format&fit=crop&w=800&q=80&sig=gallery_view3_479"
    ],
    "countInStock": 38,
    "rating": 4.4,
    "numReviews": 110,
    "isFeatured": false,
    "description": "Brand: Philips | High quality kitchen product designed for durability and daily performance."
  },
  {
    "name": "Prestige Premium Kitchen Model 25",
    "price": 500,
    "originalPrice": 600,
    "category": "Kitchen",
    "image": "https://images.unsplash.com/photo-1584269600464-37b1b58a9fe7?auto=format&fit=crop&w=800&q=80&sig=prod_unique_480_kitchen",
    "images": [
      "https://images.unsplash.com/photo-1584269600464-37b1b58a9fe7?auto=format&fit=crop&w=800&q=80&sig=prod_unique_480_kitchen",
      "https://images.unsplash.com/photo-1556911220-e15b29be8c8f?auto=format&fit=crop&w=800&q=80&sig=gallery_view1_480",
      "https://images.unsplash.com/photo-1584269600464-37b1b58a9fe7?auto=format&fit=crop&w=800&q=80&sig=gallery_view2_480",
      "https://images.unsplash.com/photo-1556911220-e15b29be8c8f?auto=format&fit=crop&w=800&q=80&sig=gallery_view3_480"
    ],
    "countInStock": 40,
    "rating": 4.5,
    "numReviews": 115,
    "isFeatured": true,
    "description": "Brand: Prestige | High quality kitchen product designed for durability and daily performance."
  },
  {
    "name": "Wonderchef Premium Kitchen Model 26",
    "price": 500,
    "originalPrice": 600,
    "category": "Kitchen",
    "image": "https://images.unsplash.com/photo-1556911220-e15b29be8c8f?auto=format&fit=crop&w=800&q=80&sig=prod_unique_481_kitchen",
    "images": [
      "https://images.unsplash.com/photo-1556911220-e15b29be8c8f?auto=format&fit=crop&w=800&q=80&sig=prod_unique_481_kitchen",
      "https://images.unsplash.com/photo-1584269600464-37b1b58a9fe7?auto=format&fit=crop&w=800&q=80&sig=gallery_view1_481",
      "https://images.unsplash.com/photo-1556911220-e15b29be8c8f?auto=format&fit=crop&w=800&q=80&sig=gallery_view2_481",
      "https://images.unsplash.com/photo-1584269600464-37b1b58a9fe7?auto=format&fit=crop&w=800&q=80&sig=gallery_view3_481"
    ],
    "countInStock": 42,
    "rating": 4.6,
    "numReviews": 120,
    "isFeatured": false,
    "description": "Brand: Wonderchef | High quality kitchen product designed for durability and daily performance."
  },
  {
    "name": "Morphy Richards Premium Kitchen Model 27",
    "price": 500,
    "originalPrice": 600,
    "category": "Kitchen",
    "image": "https://images.unsplash.com/photo-1584269600464-37b1b58a9fe7?auto=format&fit=crop&w=800&q=80&sig=prod_unique_482_kitchen",
    "images": [
      "https://images.unsplash.com/photo-1584269600464-37b1b58a9fe7?auto=format&fit=crop&w=800&q=80&sig=prod_unique_482_kitchen",
      "https://images.unsplash.com/photo-1556911220-e15b29be8c8f?auto=format&fit=crop&w=800&q=80&sig=gallery_view1_482",
      "https://images.unsplash.com/photo-1584269600464-37b1b58a9fe7?auto=format&fit=crop&w=800&q=80&sig=gallery_view2_482",
      "https://images.unsplash.com/photo-1556911220-e15b29be8c8f?auto=format&fit=crop&w=800&q=80&sig=gallery_view3_482"
    ],
    "countInStock": 44,
    "rating": 4.7,
    "numReviews": 125,
    "isFeatured": false,
    "description": "Brand: Morphy Richards | High quality kitchen product designed for durability and daily performance."
  },
  {
    "name": "Instant Pot Premium Kitchen Model 28",
    "price": 500,
    "originalPrice": 600,
    "category": "Kitchen",
    "image": "https://images.unsplash.com/photo-1556911220-e15b29be8c8f?auto=format&fit=crop&w=800&q=80&sig=prod_unique_483_kitchen",
    "images": [
      "https://images.unsplash.com/photo-1556911220-e15b29be8c8f?auto=format&fit=crop&w=800&q=80&sig=prod_unique_483_kitchen",
      "https://images.unsplash.com/photo-1584269600464-37b1b58a9fe7?auto=format&fit=crop&w=800&q=80&sig=gallery_view1_483",
      "https://images.unsplash.com/photo-1556911220-e15b29be8c8f?auto=format&fit=crop&w=800&q=80&sig=gallery_view2_483",
      "https://images.unsplash.com/photo-1584269600464-37b1b58a9fe7?auto=format&fit=crop&w=800&q=80&sig=gallery_view3_483"
    ],
    "countInStock": 46,
    "rating": 4.8,
    "numReviews": 130,
    "isFeatured": false,
    "description": "Brand: Instant Pot | High quality kitchen product designed for durability and daily performance."
  },
  {
    "name": "Ninja Premium Kitchen Model 29",
    "price": 500,
    "originalPrice": 600,
    "category": "Kitchen",
    "image": "https://images.unsplash.com/photo-1584269600464-37b1b58a9fe7?auto=format&fit=crop&w=800&q=80&sig=prod_unique_484_kitchen",
    "images": [
      "https://images.unsplash.com/photo-1584269600464-37b1b58a9fe7?auto=format&fit=crop&w=800&q=80&sig=prod_unique_484_kitchen",
      "https://images.unsplash.com/photo-1556911220-e15b29be8c8f?auto=format&fit=crop&w=800&q=80&sig=gallery_view1_484",
      "https://images.unsplash.com/photo-1584269600464-37b1b58a9fe7?auto=format&fit=crop&w=800&q=80&sig=gallery_view2_484",
      "https://images.unsplash.com/photo-1556911220-e15b29be8c8f?auto=format&fit=crop&w=800&q=80&sig=gallery_view3_484"
    ],
    "countInStock": 48,
    "rating": 4.9,
    "numReviews": 135,
    "isFeatured": false,
    "description": "Brand: Ninja | High quality kitchen product designed for durability and daily performance."
  },
  {
    "name": "Cuisinart Premium Kitchen Model 30",
    "price": 500,
    "originalPrice": 600,
    "category": "Kitchen",
    "image": "https://images.unsplash.com/photo-1556911220-e15b29be8c8f?auto=format&fit=crop&w=800&q=80&sig=prod_unique_485_kitchen",
    "images": [
      "https://images.unsplash.com/photo-1556911220-e15b29be8c8f?auto=format&fit=crop&w=800&q=80&sig=prod_unique_485_kitchen",
      "https://images.unsplash.com/photo-1584269600464-37b1b58a9fe7?auto=format&fit=crop&w=800&q=80&sig=gallery_view1_485",
      "https://images.unsplash.com/photo-1556911220-e15b29be8c8f?auto=format&fit=crop&w=800&q=80&sig=gallery_view2_485",
      "https://images.unsplash.com/photo-1584269600464-37b1b58a9fe7?auto=format&fit=crop&w=800&q=80&sig=gallery_view3_485"
    ],
    "countInStock": 50,
    "rating": 4,
    "numReviews": 140,
    "isFeatured": true,
    "description": "Brand: Cuisinart | High quality kitchen product designed for durability and daily performance."
  },
  {
    "name": "Philips Premium Kitchen Model 31",
    "price": 500,
    "originalPrice": 600,
    "category": "Kitchen",
    "image": "https://images.unsplash.com/photo-1584269600464-37b1b58a9fe7?auto=format&fit=crop&w=800&q=80&sig=prod_unique_486_kitchen",
    "images": [
      "https://images.unsplash.com/photo-1584269600464-37b1b58a9fe7?auto=format&fit=crop&w=800&q=80&sig=prod_unique_486_kitchen",
      "https://images.unsplash.com/photo-1556911220-e15b29be8c8f?auto=format&fit=crop&w=800&q=80&sig=gallery_view1_486",
      "https://images.unsplash.com/photo-1584269600464-37b1b58a9fe7?auto=format&fit=crop&w=800&q=80&sig=gallery_view2_486",
      "https://images.unsplash.com/photo-1556911220-e15b29be8c8f?auto=format&fit=crop&w=800&q=80&sig=gallery_view3_486"
    ],
    "countInStock": 52,
    "rating": 4.1,
    "numReviews": 145,
    "isFeatured": false,
    "description": "Brand: Philips | High quality kitchen product designed for durability and daily performance."
  },
  {
    "name": "Prestige Premium Kitchen Model 32",
    "price": 500,
    "originalPrice": 600,
    "category": "Kitchen",
    "image": "https://images.unsplash.com/photo-1556911220-e15b29be8c8f?auto=format&fit=crop&w=800&q=80&sig=prod_unique_487_kitchen",
    "images": [
      "https://images.unsplash.com/photo-1556911220-e15b29be8c8f?auto=format&fit=crop&w=800&q=80&sig=prod_unique_487_kitchen",
      "https://images.unsplash.com/photo-1584269600464-37b1b58a9fe7?auto=format&fit=crop&w=800&q=80&sig=gallery_view1_487",
      "https://images.unsplash.com/photo-1556911220-e15b29be8c8f?auto=format&fit=crop&w=800&q=80&sig=gallery_view2_487",
      "https://images.unsplash.com/photo-1584269600464-37b1b58a9fe7?auto=format&fit=crop&w=800&q=80&sig=gallery_view3_487"
    ],
    "countInStock": 54,
    "rating": 4.2,
    "numReviews": 150,
    "isFeatured": false,
    "description": "Brand: Prestige | High quality kitchen product designed for durability and daily performance."
  },
  {
    "name": "Wonderchef Premium Kitchen Model 33",
    "price": 500,
    "originalPrice": 600,
    "category": "Kitchen",
    "image": "https://images.unsplash.com/photo-1584269600464-37b1b58a9fe7?auto=format&fit=crop&w=800&q=80&sig=prod_unique_488_kitchen",
    "images": [
      "https://images.unsplash.com/photo-1584269600464-37b1b58a9fe7?auto=format&fit=crop&w=800&q=80&sig=prod_unique_488_kitchen",
      "https://images.unsplash.com/photo-1556911220-e15b29be8c8f?auto=format&fit=crop&w=800&q=80&sig=gallery_view1_488",
      "https://images.unsplash.com/photo-1584269600464-37b1b58a9fe7?auto=format&fit=crop&w=800&q=80&sig=gallery_view2_488",
      "https://images.unsplash.com/photo-1556911220-e15b29be8c8f?auto=format&fit=crop&w=800&q=80&sig=gallery_view3_488"
    ],
    "countInStock": 56,
    "rating": 4.3,
    "numReviews": 155,
    "isFeatured": false,
    "description": "Brand: Wonderchef | High quality kitchen product designed for durability and daily performance."
  },
  {
    "name": "Morphy Richards Premium Kitchen Model 34",
    "price": 500,
    "originalPrice": 600,
    "category": "Kitchen",
    "image": "https://images.unsplash.com/photo-1556911220-e15b29be8c8f?auto=format&fit=crop&w=800&q=80&sig=prod_unique_489_kitchen",
    "images": [
      "https://images.unsplash.com/photo-1556911220-e15b29be8c8f?auto=format&fit=crop&w=800&q=80&sig=prod_unique_489_kitchen",
      "https://images.unsplash.com/photo-1584269600464-37b1b58a9fe7?auto=format&fit=crop&w=800&q=80&sig=gallery_view1_489",
      "https://images.unsplash.com/photo-1556911220-e15b29be8c8f?auto=format&fit=crop&w=800&q=80&sig=gallery_view2_489",
      "https://images.unsplash.com/photo-1584269600464-37b1b58a9fe7?auto=format&fit=crop&w=800&q=80&sig=gallery_view3_489"
    ],
    "countInStock": 58,
    "rating": 4.4,
    "numReviews": 160,
    "isFeatured": false,
    "description": "Brand: Morphy Richards | High quality kitchen product designed for durability and daily performance."
  },
  {
    "name": "Instant Pot Premium Kitchen Model 35",
    "price": 500,
    "originalPrice": 600,
    "category": "Kitchen",
    "image": "https://images.unsplash.com/photo-1584269600464-37b1b58a9fe7?auto=format&fit=crop&w=800&q=80&sig=prod_unique_490_kitchen",
    "images": [
      "https://images.unsplash.com/photo-1584269600464-37b1b58a9fe7?auto=format&fit=crop&w=800&q=80&sig=prod_unique_490_kitchen",
      "https://images.unsplash.com/photo-1556911220-e15b29be8c8f?auto=format&fit=crop&w=800&q=80&sig=gallery_view1_490",
      "https://images.unsplash.com/photo-1584269600464-37b1b58a9fe7?auto=format&fit=crop&w=800&q=80&sig=gallery_view2_490",
      "https://images.unsplash.com/photo-1556911220-e15b29be8c8f?auto=format&fit=crop&w=800&q=80&sig=gallery_view3_490"
    ],
    "countInStock": 60,
    "rating": 4.5,
    "numReviews": 165,
    "isFeatured": true,
    "description": "Brand: Instant Pot | High quality kitchen product designed for durability and daily performance."
  },
  {
    "name": "Ninja Premium Kitchen Model 36",
    "price": 500,
    "originalPrice": 600,
    "category": "Kitchen",
    "image": "https://images.unsplash.com/photo-1556911220-e15b29be8c8f?auto=format&fit=crop&w=800&q=80&sig=prod_unique_491_kitchen",
    "images": [
      "https://images.unsplash.com/photo-1556911220-e15b29be8c8f?auto=format&fit=crop&w=800&q=80&sig=prod_unique_491_kitchen",
      "https://images.unsplash.com/photo-1584269600464-37b1b58a9fe7?auto=format&fit=crop&w=800&q=80&sig=gallery_view1_491",
      "https://images.unsplash.com/photo-1556911220-e15b29be8c8f?auto=format&fit=crop&w=800&q=80&sig=gallery_view2_491",
      "https://images.unsplash.com/photo-1584269600464-37b1b58a9fe7?auto=format&fit=crop&w=800&q=80&sig=gallery_view3_491"
    ],
    "countInStock": 62,
    "rating": 4.6,
    "numReviews": 170,
    "isFeatured": false,
    "description": "Brand: Ninja | High quality kitchen product designed for durability and daily performance."
  },
  {
    "name": "Cuisinart Premium Kitchen Model 37",
    "price": 500,
    "originalPrice": 600,
    "category": "Kitchen",
    "image": "https://images.unsplash.com/photo-1584269600464-37b1b58a9fe7?auto=format&fit=crop&w=800&q=80&sig=prod_unique_492_kitchen",
    "images": [
      "https://images.unsplash.com/photo-1584269600464-37b1b58a9fe7?auto=format&fit=crop&w=800&q=80&sig=prod_unique_492_kitchen",
      "https://images.unsplash.com/photo-1556911220-e15b29be8c8f?auto=format&fit=crop&w=800&q=80&sig=gallery_view1_492",
      "https://images.unsplash.com/photo-1584269600464-37b1b58a9fe7?auto=format&fit=crop&w=800&q=80&sig=gallery_view2_492",
      "https://images.unsplash.com/photo-1556911220-e15b29be8c8f?auto=format&fit=crop&w=800&q=80&sig=gallery_view3_492"
    ],
    "countInStock": 64,
    "rating": 4.7,
    "numReviews": 175,
    "isFeatured": false,
    "description": "Brand: Cuisinart | High quality kitchen product designed for durability and daily performance."
  },
  {
    "name": "Philips Premium Kitchen Model 38",
    "price": 500,
    "originalPrice": 600,
    "category": "Kitchen",
    "image": "https://images.unsplash.com/photo-1556911220-e15b29be8c8f?auto=format&fit=crop&w=800&q=80&sig=prod_unique_493_kitchen",
    "images": [
      "https://images.unsplash.com/photo-1556911220-e15b29be8c8f?auto=format&fit=crop&w=800&q=80&sig=prod_unique_493_kitchen",
      "https://images.unsplash.com/photo-1584269600464-37b1b58a9fe7?auto=format&fit=crop&w=800&q=80&sig=gallery_view1_493",
      "https://images.unsplash.com/photo-1556911220-e15b29be8c8f?auto=format&fit=crop&w=800&q=80&sig=gallery_view2_493",
      "https://images.unsplash.com/photo-1584269600464-37b1b58a9fe7?auto=format&fit=crop&w=800&q=80&sig=gallery_view3_493"
    ],
    "countInStock": 66,
    "rating": 4.8,
    "numReviews": 180,
    "isFeatured": false,
    "description": "Brand: Philips | High quality kitchen product designed for durability and daily performance."
  },
  {
    "name": "Prestige Premium Kitchen Model 39",
    "price": 500,
    "originalPrice": 600,
    "category": "Kitchen",
    "image": "https://images.unsplash.com/photo-1584269600464-37b1b58a9fe7?auto=format&fit=crop&w=800&q=80&sig=prod_unique_494_kitchen",
    "images": [
      "https://images.unsplash.com/photo-1584269600464-37b1b58a9fe7?auto=format&fit=crop&w=800&q=80&sig=prod_unique_494_kitchen",
      "https://images.unsplash.com/photo-1556911220-e15b29be8c8f?auto=format&fit=crop&w=800&q=80&sig=gallery_view1_494",
      "https://images.unsplash.com/photo-1584269600464-37b1b58a9fe7?auto=format&fit=crop&w=800&q=80&sig=gallery_view2_494",
      "https://images.unsplash.com/photo-1556911220-e15b29be8c8f?auto=format&fit=crop&w=800&q=80&sig=gallery_view3_494"
    ],
    "countInStock": 68,
    "rating": 4.9,
    "numReviews": 185,
    "isFeatured": false,
    "description": "Brand: Prestige | High quality kitchen product designed for durability and daily performance."
  },
  {
    "name": "Wonderchef Premium Kitchen Model 40",
    "price": 500,
    "originalPrice": 600,
    "category": "Kitchen",
    "image": "https://images.unsplash.com/photo-1556911220-e15b29be8c8f?auto=format&fit=crop&w=800&q=80&sig=prod_unique_495_kitchen",
    "images": [
      "https://images.unsplash.com/photo-1556911220-e15b29be8c8f?auto=format&fit=crop&w=800&q=80&sig=prod_unique_495_kitchen",
      "https://images.unsplash.com/photo-1584269600464-37b1b58a9fe7?auto=format&fit=crop&w=800&q=80&sig=gallery_view1_495",
      "https://images.unsplash.com/photo-1556911220-e15b29be8c8f?auto=format&fit=crop&w=800&q=80&sig=gallery_view2_495",
      "https://images.unsplash.com/photo-1584269600464-37b1b58a9fe7?auto=format&fit=crop&w=800&q=80&sig=gallery_view3_495"
    ],
    "countInStock": 70,
    "rating": 4,
    "numReviews": 190,
    "isFeatured": true,
    "description": "Brand: Wonderchef | High quality kitchen product designed for durability and daily performance."
  },
  {
    "name": "Morphy Richards Premium Kitchen Model 41",
    "price": 500,
    "originalPrice": 600,
    "category": "Kitchen",
    "image": "https://images.unsplash.com/photo-1584269600464-37b1b58a9fe7?auto=format&fit=crop&w=800&q=80&sig=prod_unique_496_kitchen",
    "images": [
      "https://images.unsplash.com/photo-1584269600464-37b1b58a9fe7?auto=format&fit=crop&w=800&q=80&sig=prod_unique_496_kitchen",
      "https://images.unsplash.com/photo-1556911220-e15b29be8c8f?auto=format&fit=crop&w=800&q=80&sig=gallery_view1_496",
      "https://images.unsplash.com/photo-1584269600464-37b1b58a9fe7?auto=format&fit=crop&w=800&q=80&sig=gallery_view2_496",
      "https://images.unsplash.com/photo-1556911220-e15b29be8c8f?auto=format&fit=crop&w=800&q=80&sig=gallery_view3_496"
    ],
    "countInStock": 72,
    "rating": 4.1,
    "numReviews": 195,
    "isFeatured": false,
    "description": "Brand: Morphy Richards | High quality kitchen product designed for durability and daily performance."
  },
  {
    "name": "Instant Pot Premium Kitchen Model 42",
    "price": 500,
    "originalPrice": 600,
    "category": "Kitchen",
    "image": "https://images.unsplash.com/photo-1556911220-e15b29be8c8f?auto=format&fit=crop&w=800&q=80&sig=prod_unique_497_kitchen",
    "images": [
      "https://images.unsplash.com/photo-1556911220-e15b29be8c8f?auto=format&fit=crop&w=800&q=80&sig=prod_unique_497_kitchen",
      "https://images.unsplash.com/photo-1584269600464-37b1b58a9fe7?auto=format&fit=crop&w=800&q=80&sig=gallery_view1_497",
      "https://images.unsplash.com/photo-1556911220-e15b29be8c8f?auto=format&fit=crop&w=800&q=80&sig=gallery_view2_497",
      "https://images.unsplash.com/photo-1584269600464-37b1b58a9fe7?auto=format&fit=crop&w=800&q=80&sig=gallery_view3_497"
    ],
    "countInStock": 74,
    "rating": 4.2,
    "numReviews": 200,
    "isFeatured": false,
    "description": "Brand: Instant Pot | High quality kitchen product designed for durability and daily performance."
  },
  {
    "name": "Ninja Premium Kitchen Model 43",
    "price": 500,
    "originalPrice": 600,
    "category": "Kitchen",
    "image": "https://images.unsplash.com/photo-1584269600464-37b1b58a9fe7?auto=format&fit=crop&w=800&q=80&sig=prod_unique_498_kitchen",
    "images": [
      "https://images.unsplash.com/photo-1584269600464-37b1b58a9fe7?auto=format&fit=crop&w=800&q=80&sig=prod_unique_498_kitchen",
      "https://images.unsplash.com/photo-1556911220-e15b29be8c8f?auto=format&fit=crop&w=800&q=80&sig=gallery_view1_498",
      "https://images.unsplash.com/photo-1584269600464-37b1b58a9fe7?auto=format&fit=crop&w=800&q=80&sig=gallery_view2_498",
      "https://images.unsplash.com/photo-1556911220-e15b29be8c8f?auto=format&fit=crop&w=800&q=80&sig=gallery_view3_498"
    ],
    "countInStock": 76,
    "rating": 4.3,
    "numReviews": 205,
    "isFeatured": false,
    "description": "Brand: Ninja | High quality kitchen product designed for durability and daily performance."
  },
  {
    "name": "Cuisinart Premium Kitchen Model 44",
    "price": 500,
    "originalPrice": 600,
    "category": "Kitchen",
    "image": "https://images.unsplash.com/photo-1556911220-e15b29be8c8f?auto=format&fit=crop&w=800&q=80&sig=prod_unique_499_kitchen",
    "images": [
      "https://images.unsplash.com/photo-1556911220-e15b29be8c8f?auto=format&fit=crop&w=800&q=80&sig=prod_unique_499_kitchen",
      "https://images.unsplash.com/photo-1584269600464-37b1b58a9fe7?auto=format&fit=crop&w=800&q=80&sig=gallery_view1_499",
      "https://images.unsplash.com/photo-1556911220-e15b29be8c8f?auto=format&fit=crop&w=800&q=80&sig=gallery_view2_499",
      "https://images.unsplash.com/photo-1584269600464-37b1b58a9fe7?auto=format&fit=crop&w=800&q=80&sig=gallery_view3_499"
    ],
    "countInStock": 78,
    "rating": 4.4,
    "numReviews": 210,
    "isFeatured": false,
    "description": "Brand: Cuisinart | High quality kitchen product designed for durability and daily performance."
  },
  {
    "name": "Philips Premium Kitchen Model 45",
    "price": 500,
    "originalPrice": 600,
    "category": "Kitchen",
    "image": "https://images.unsplash.com/photo-1584269600464-37b1b58a9fe7?auto=format&fit=crop&w=800&q=80&sig=prod_unique_500_kitchen",
    "images": [
      "https://images.unsplash.com/photo-1584269600464-37b1b58a9fe7?auto=format&fit=crop&w=800&q=80&sig=prod_unique_500_kitchen",
      "https://images.unsplash.com/photo-1556911220-e15b29be8c8f?auto=format&fit=crop&w=800&q=80&sig=gallery_view1_500",
      "https://images.unsplash.com/photo-1584269600464-37b1b58a9fe7?auto=format&fit=crop&w=800&q=80&sig=gallery_view2_500",
      "https://images.unsplash.com/photo-1556911220-e15b29be8c8f?auto=format&fit=crop&w=800&q=80&sig=gallery_view3_500"
    ],
    "countInStock": 80,
    "rating": 4.5,
    "numReviews": 215,
    "isFeatured": true,
    "description": "Brand: Philips | High quality kitchen product designed for durability and daily performance."
  },
  {
    "name": "The Ordinary Premium Beauty Model 11",
    "price": 500,
    "originalPrice": 600,
    "category": "Beauty",
    "image": "https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?auto=format&fit=crop&w=800&q=80&sig=prod_unique_501_beauty",
    "images": [
      "https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?auto=format&fit=crop&w=800&q=80&sig=prod_unique_501_beauty",
      "https://images.unsplash.com/photo-1598440947619-2c35fc9aa908?auto=format&fit=crop&w=800&q=80&sig=gallery_view1_501",
      "https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?auto=format&fit=crop&w=800&q=80&sig=gallery_view2_501",
      "https://images.unsplash.com/photo-1598440947619-2c35fc9aa908?auto=format&fit=crop&w=800&q=80&sig=gallery_view3_501"
    ],
    "countInStock": 12,
    "rating": 4.1,
    "numReviews": 45,
    "isFeatured": false,
    "description": "Brand: The Ordinary | High quality beauty product designed for durability and daily performance."
  },
  {
    "name": "CeraVe Premium Beauty Model 12",
    "price": 500,
    "originalPrice": 600,
    "category": "Beauty",
    "image": "https://images.unsplash.com/photo-1598440947619-2c35fc9aa908?auto=format&fit=crop&w=800&q=80&sig=prod_unique_502_beauty",
    "images": [
      "https://images.unsplash.com/photo-1598440947619-2c35fc9aa908?auto=format&fit=crop&w=800&q=80&sig=prod_unique_502_beauty",
      "https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?auto=format&fit=crop&w=800&q=80&sig=gallery_view1_502",
      "https://images.unsplash.com/photo-1598440947619-2c35fc9aa908?auto=format&fit=crop&w=800&q=80&sig=gallery_view2_502",
      "https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?auto=format&fit=crop&w=800&q=80&sig=gallery_view3_502"
    ],
    "countInStock": 14,
    "rating": 4.2,
    "numReviews": 50,
    "isFeatured": false,
    "description": "Brand: CeraVe | High quality beauty product designed for durability and daily performance."
  },
  {
    "name": "Neutrogena Premium Beauty Model 13",
    "price": 500,
    "originalPrice": 600,
    "category": "Beauty",
    "image": "https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?auto=format&fit=crop&w=800&q=80&sig=prod_unique_503_beauty",
    "images": [
      "https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?auto=format&fit=crop&w=800&q=80&sig=prod_unique_503_beauty",
      "https://images.unsplash.com/photo-1598440947619-2c35fc9aa908?auto=format&fit=crop&w=800&q=80&sig=gallery_view1_503",
      "https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?auto=format&fit=crop&w=800&q=80&sig=gallery_view2_503",
      "https://images.unsplash.com/photo-1598440947619-2c35fc9aa908?auto=format&fit=crop&w=800&q=80&sig=gallery_view3_503"
    ],
    "countInStock": 16,
    "rating": 4.3,
    "numReviews": 55,
    "isFeatured": false,
    "description": "Brand: Neutrogena | High quality beauty product designed for durability and daily performance."
  },
  {
    "name": "Maybelline Premium Beauty Model 14",
    "price": 500,
    "originalPrice": 600,
    "category": "Beauty",
    "image": "https://images.unsplash.com/photo-1598440947619-2c35fc9aa908?auto=format&fit=crop&w=800&q=80&sig=prod_unique_504_beauty",
    "images": [
      "https://images.unsplash.com/photo-1598440947619-2c35fc9aa908?auto=format&fit=crop&w=800&q=80&sig=prod_unique_504_beauty",
      "https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?auto=format&fit=crop&w=800&q=80&sig=gallery_view1_504",
      "https://images.unsplash.com/photo-1598440947619-2c35fc9aa908?auto=format&fit=crop&w=800&q=80&sig=gallery_view2_504",
      "https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?auto=format&fit=crop&w=800&q=80&sig=gallery_view3_504"
    ],
    "countInStock": 18,
    "rating": 4.4,
    "numReviews": 60,
    "isFeatured": false,
    "description": "Brand: Maybelline | High quality beauty product designed for durability and daily performance."
  },
  {
    "name": "Nivea Premium Beauty Model 15",
    "price": 500,
    "originalPrice": 600,
    "category": "Beauty",
    "image": "https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?auto=format&fit=crop&w=800&q=80&sig=prod_unique_505_beauty",
    "images": [
      "https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?auto=format&fit=crop&w=800&q=80&sig=prod_unique_505_beauty",
      "https://images.unsplash.com/photo-1598440947619-2c35fc9aa908?auto=format&fit=crop&w=800&q=80&sig=gallery_view1_505",
      "https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?auto=format&fit=crop&w=800&q=80&sig=gallery_view2_505",
      "https://images.unsplash.com/photo-1598440947619-2c35fc9aa908?auto=format&fit=crop&w=800&q=80&sig=gallery_view3_505"
    ],
    "countInStock": 20,
    "rating": 4.5,
    "numReviews": 65,
    "isFeatured": true,
    "description": "Brand: Nivea | High quality beauty product designed for durability and daily performance."
  },
  {
    "name": "Plum Premium Beauty Model 16",
    "price": 500,
    "originalPrice": 600,
    "category": "Beauty",
    "image": "https://images.unsplash.com/photo-1598440947619-2c35fc9aa908?auto=format&fit=crop&w=800&q=80&sig=prod_unique_506_beauty",
    "images": [
      "https://images.unsplash.com/photo-1598440947619-2c35fc9aa908?auto=format&fit=crop&w=800&q=80&sig=prod_unique_506_beauty",
      "https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?auto=format&fit=crop&w=800&q=80&sig=gallery_view1_506",
      "https://images.unsplash.com/photo-1598440947619-2c35fc9aa908?auto=format&fit=crop&w=800&q=80&sig=gallery_view2_506",
      "https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?auto=format&fit=crop&w=800&q=80&sig=gallery_view3_506"
    ],
    "countInStock": 22,
    "rating": 4.6,
    "numReviews": 70,
    "isFeatured": false,
    "description": "Brand: Plum | High quality beauty product designed for durability and daily performance."
  },
  {
    "name": "Minimalist Premium Beauty Model 17",
    "price": 500,
    "originalPrice": 600,
    "category": "Beauty",
    "image": "https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?auto=format&fit=crop&w=800&q=80&sig=prod_unique_507_beauty",
    "images": [
      "https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?auto=format&fit=crop&w=800&q=80&sig=prod_unique_507_beauty",
      "https://images.unsplash.com/photo-1598440947619-2c35fc9aa908?auto=format&fit=crop&w=800&q=80&sig=gallery_view1_507",
      "https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?auto=format&fit=crop&w=800&q=80&sig=gallery_view2_507",
      "https://images.unsplash.com/photo-1598440947619-2c35fc9aa908?auto=format&fit=crop&w=800&q=80&sig=gallery_view3_507"
    ],
    "countInStock": 24,
    "rating": 4.7,
    "numReviews": 75,
    "isFeatured": false,
    "description": "Brand: Minimalist | High quality beauty product designed for durability and daily performance."
  },
  {
    "name": "L'Oreal Paris Premium Beauty Model 18",
    "price": 500,
    "originalPrice": 600,
    "category": "Beauty",
    "image": "https://images.unsplash.com/photo-1598440947619-2c35fc9aa908?auto=format&fit=crop&w=800&q=80&sig=prod_unique_508_beauty",
    "images": [
      "https://images.unsplash.com/photo-1598440947619-2c35fc9aa908?auto=format&fit=crop&w=800&q=80&sig=prod_unique_508_beauty",
      "https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?auto=format&fit=crop&w=800&q=80&sig=gallery_view1_508",
      "https://images.unsplash.com/photo-1598440947619-2c35fc9aa908?auto=format&fit=crop&w=800&q=80&sig=gallery_view2_508",
      "https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?auto=format&fit=crop&w=800&q=80&sig=gallery_view3_508"
    ],
    "countInStock": 26,
    "rating": 4.8,
    "numReviews": 80,
    "isFeatured": false,
    "description": "Brand: L'Oreal Paris | High quality beauty product designed for durability and daily performance."
  },
  {
    "name": "The Ordinary Premium Beauty Model 19",
    "price": 500,
    "originalPrice": 600,
    "category": "Beauty",
    "image": "https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?auto=format&fit=crop&w=800&q=80&sig=prod_unique_509_beauty",
    "images": [
      "https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?auto=format&fit=crop&w=800&q=80&sig=prod_unique_509_beauty",
      "https://images.unsplash.com/photo-1598440947619-2c35fc9aa908?auto=format&fit=crop&w=800&q=80&sig=gallery_view1_509",
      "https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?auto=format&fit=crop&w=800&q=80&sig=gallery_view2_509",
      "https://images.unsplash.com/photo-1598440947619-2c35fc9aa908?auto=format&fit=crop&w=800&q=80&sig=gallery_view3_509"
    ],
    "countInStock": 28,
    "rating": 4.9,
    "numReviews": 85,
    "isFeatured": false,
    "description": "Brand: The Ordinary | High quality beauty product designed for durability and daily performance."
  },
  {
    "name": "CeraVe Premium Beauty Model 20",
    "price": 500,
    "originalPrice": 600,
    "category": "Beauty",
    "image": "https://images.unsplash.com/photo-1598440947619-2c35fc9aa908?auto=format&fit=crop&w=800&q=80&sig=prod_unique_510_beauty",
    "images": [
      "https://images.unsplash.com/photo-1598440947619-2c35fc9aa908?auto=format&fit=crop&w=800&q=80&sig=prod_unique_510_beauty",
      "https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?auto=format&fit=crop&w=800&q=80&sig=gallery_view1_510",
      "https://images.unsplash.com/photo-1598440947619-2c35fc9aa908?auto=format&fit=crop&w=800&q=80&sig=gallery_view2_510",
      "https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?auto=format&fit=crop&w=800&q=80&sig=gallery_view3_510"
    ],
    "countInStock": 30,
    "rating": 4,
    "numReviews": 90,
    "isFeatured": true,
    "description": "Brand: CeraVe | High quality beauty product designed for durability and daily performance."
  },
  {
    "name": "Neutrogena Premium Beauty Model 21",
    "price": 500,
    "originalPrice": 600,
    "category": "Beauty",
    "image": "https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?auto=format&fit=crop&w=800&q=80&sig=prod_unique_511_beauty",
    "images": [
      "https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?auto=format&fit=crop&w=800&q=80&sig=prod_unique_511_beauty",
      "https://images.unsplash.com/photo-1598440947619-2c35fc9aa908?auto=format&fit=crop&w=800&q=80&sig=gallery_view1_511",
      "https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?auto=format&fit=crop&w=800&q=80&sig=gallery_view2_511",
      "https://images.unsplash.com/photo-1598440947619-2c35fc9aa908?auto=format&fit=crop&w=800&q=80&sig=gallery_view3_511"
    ],
    "countInStock": 32,
    "rating": 4.1,
    "numReviews": 95,
    "isFeatured": false,
    "description": "Brand: Neutrogena | High quality beauty product designed for durability and daily performance."
  },
  {
    "name": "Maybelline Premium Beauty Model 22",
    "price": 500,
    "originalPrice": 600,
    "category": "Beauty",
    "image": "https://images.unsplash.com/photo-1598440947619-2c35fc9aa908?auto=format&fit=crop&w=800&q=80&sig=prod_unique_512_beauty",
    "images": [
      "https://images.unsplash.com/photo-1598440947619-2c35fc9aa908?auto=format&fit=crop&w=800&q=80&sig=prod_unique_512_beauty",
      "https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?auto=format&fit=crop&w=800&q=80&sig=gallery_view1_512",
      "https://images.unsplash.com/photo-1598440947619-2c35fc9aa908?auto=format&fit=crop&w=800&q=80&sig=gallery_view2_512",
      "https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?auto=format&fit=crop&w=800&q=80&sig=gallery_view3_512"
    ],
    "countInStock": 34,
    "rating": 4.2,
    "numReviews": 100,
    "isFeatured": false,
    "description": "Brand: Maybelline | High quality beauty product designed for durability and daily performance."
  },
  {
    "name": "Nivea Premium Beauty Model 23",
    "price": 500,
    "originalPrice": 600,
    "category": "Beauty",
    "image": "https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?auto=format&fit=crop&w=800&q=80&sig=prod_unique_513_beauty",
    "images": [
      "https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?auto=format&fit=crop&w=800&q=80&sig=prod_unique_513_beauty",
      "https://images.unsplash.com/photo-1598440947619-2c35fc9aa908?auto=format&fit=crop&w=800&q=80&sig=gallery_view1_513",
      "https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?auto=format&fit=crop&w=800&q=80&sig=gallery_view2_513",
      "https://images.unsplash.com/photo-1598440947619-2c35fc9aa908?auto=format&fit=crop&w=800&q=80&sig=gallery_view3_513"
    ],
    "countInStock": 36,
    "rating": 4.3,
    "numReviews": 105,
    "isFeatured": false,
    "description": "Brand: Nivea | High quality beauty product designed for durability and daily performance."
  },
  {
    "name": "Plum Premium Beauty Model 24",
    "price": 500,
    "originalPrice": 600,
    "category": "Beauty",
    "image": "https://images.unsplash.com/photo-1598440947619-2c35fc9aa908?auto=format&fit=crop&w=800&q=80&sig=prod_unique_514_beauty",
    "images": [
      "https://images.unsplash.com/photo-1598440947619-2c35fc9aa908?auto=format&fit=crop&w=800&q=80&sig=prod_unique_514_beauty",
      "https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?auto=format&fit=crop&w=800&q=80&sig=gallery_view1_514",
      "https://images.unsplash.com/photo-1598440947619-2c35fc9aa908?auto=format&fit=crop&w=800&q=80&sig=gallery_view2_514",
      "https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?auto=format&fit=crop&w=800&q=80&sig=gallery_view3_514"
    ],
    "countInStock": 38,
    "rating": 4.4,
    "numReviews": 110,
    "isFeatured": false,
    "description": "Brand: Plum | High quality beauty product designed for durability and daily performance."
  },
  {
    "name": "Minimalist Premium Beauty Model 25",
    "price": 500,
    "originalPrice": 600,
    "category": "Beauty",
    "image": "https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?auto=format&fit=crop&w=800&q=80&sig=prod_unique_515_beauty",
    "images": [
      "https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?auto=format&fit=crop&w=800&q=80&sig=prod_unique_515_beauty",
      "https://images.unsplash.com/photo-1598440947619-2c35fc9aa908?auto=format&fit=crop&w=800&q=80&sig=gallery_view1_515",
      "https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?auto=format&fit=crop&w=800&q=80&sig=gallery_view2_515",
      "https://images.unsplash.com/photo-1598440947619-2c35fc9aa908?auto=format&fit=crop&w=800&q=80&sig=gallery_view3_515"
    ],
    "countInStock": 40,
    "rating": 4.5,
    "numReviews": 115,
    "isFeatured": true,
    "description": "Brand: Minimalist | High quality beauty product designed for durability and daily performance."
  },
  {
    "name": "L'Oreal Paris Premium Beauty Model 26",
    "price": 500,
    "originalPrice": 600,
    "category": "Beauty",
    "image": "https://images.unsplash.com/photo-1598440947619-2c35fc9aa908?auto=format&fit=crop&w=800&q=80&sig=prod_unique_516_beauty",
    "images": [
      "https://images.unsplash.com/photo-1598440947619-2c35fc9aa908?auto=format&fit=crop&w=800&q=80&sig=prod_unique_516_beauty",
      "https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?auto=format&fit=crop&w=800&q=80&sig=gallery_view1_516",
      "https://images.unsplash.com/photo-1598440947619-2c35fc9aa908?auto=format&fit=crop&w=800&q=80&sig=gallery_view2_516",
      "https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?auto=format&fit=crop&w=800&q=80&sig=gallery_view3_516"
    ],
    "countInStock": 42,
    "rating": 4.6,
    "numReviews": 120,
    "isFeatured": false,
    "description": "Brand: L'Oreal Paris | High quality beauty product designed for durability and daily performance."
  },
  {
    "name": "The Ordinary Premium Beauty Model 27",
    "price": 500,
    "originalPrice": 600,
    "category": "Beauty",
    "image": "https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?auto=format&fit=crop&w=800&q=80&sig=prod_unique_517_beauty",
    "images": [
      "https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?auto=format&fit=crop&w=800&q=80&sig=prod_unique_517_beauty",
      "https://images.unsplash.com/photo-1598440947619-2c35fc9aa908?auto=format&fit=crop&w=800&q=80&sig=gallery_view1_517",
      "https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?auto=format&fit=crop&w=800&q=80&sig=gallery_view2_517",
      "https://images.unsplash.com/photo-1598440947619-2c35fc9aa908?auto=format&fit=crop&w=800&q=80&sig=gallery_view3_517"
    ],
    "countInStock": 44,
    "rating": 4.7,
    "numReviews": 125,
    "isFeatured": false,
    "description": "Brand: The Ordinary | High quality beauty product designed for durability and daily performance."
  },
  {
    "name": "CeraVe Premium Beauty Model 28",
    "price": 500,
    "originalPrice": 600,
    "category": "Beauty",
    "image": "https://images.unsplash.com/photo-1598440947619-2c35fc9aa908?auto=format&fit=crop&w=800&q=80&sig=prod_unique_518_beauty",
    "images": [
      "https://images.unsplash.com/photo-1598440947619-2c35fc9aa908?auto=format&fit=crop&w=800&q=80&sig=prod_unique_518_beauty",
      "https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?auto=format&fit=crop&w=800&q=80&sig=gallery_view1_518",
      "https://images.unsplash.com/photo-1598440947619-2c35fc9aa908?auto=format&fit=crop&w=800&q=80&sig=gallery_view2_518",
      "https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?auto=format&fit=crop&w=800&q=80&sig=gallery_view3_518"
    ],
    "countInStock": 46,
    "rating": 4.8,
    "numReviews": 130,
    "isFeatured": false,
    "description": "Brand: CeraVe | High quality beauty product designed for durability and daily performance."
  },
  {
    "name": "Neutrogena Premium Beauty Model 29",
    "price": 500,
    "originalPrice": 600,
    "category": "Beauty",
    "image": "https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?auto=format&fit=crop&w=800&q=80&sig=prod_unique_519_beauty",
    "images": [
      "https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?auto=format&fit=crop&w=800&q=80&sig=prod_unique_519_beauty",
      "https://images.unsplash.com/photo-1598440947619-2c35fc9aa908?auto=format&fit=crop&w=800&q=80&sig=gallery_view1_519",
      "https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?auto=format&fit=crop&w=800&q=80&sig=gallery_view2_519",
      "https://images.unsplash.com/photo-1598440947619-2c35fc9aa908?auto=format&fit=crop&w=800&q=80&sig=gallery_view3_519"
    ],
    "countInStock": 48,
    "rating": 4.9,
    "numReviews": 135,
    "isFeatured": false,
    "description": "Brand: Neutrogena | High quality beauty product designed for durability and daily performance."
  },
  {
    "name": "Maybelline Premium Beauty Model 30",
    "price": 500,
    "originalPrice": 600,
    "category": "Beauty",
    "image": "https://images.unsplash.com/photo-1598440947619-2c35fc9aa908?auto=format&fit=crop&w=800&q=80&sig=prod_unique_520_beauty",
    "images": [
      "https://images.unsplash.com/photo-1598440947619-2c35fc9aa908?auto=format&fit=crop&w=800&q=80&sig=prod_unique_520_beauty",
      "https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?auto=format&fit=crop&w=800&q=80&sig=gallery_view1_520",
      "https://images.unsplash.com/photo-1598440947619-2c35fc9aa908?auto=format&fit=crop&w=800&q=80&sig=gallery_view2_520",
      "https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?auto=format&fit=crop&w=800&q=80&sig=gallery_view3_520"
    ],
    "countInStock": 50,
    "rating": 4,
    "numReviews": 140,
    "isFeatured": true,
    "description": "Brand: Maybelline | High quality beauty product designed for durability and daily performance."
  },
  {
    "name": "Nivea Premium Beauty Model 31",
    "price": 500,
    "originalPrice": 600,
    "category": "Beauty",
    "image": "https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?auto=format&fit=crop&w=800&q=80&sig=prod_unique_521_beauty",
    "images": [
      "https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?auto=format&fit=crop&w=800&q=80&sig=prod_unique_521_beauty",
      "https://images.unsplash.com/photo-1598440947619-2c35fc9aa908?auto=format&fit=crop&w=800&q=80&sig=gallery_view1_521",
      "https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?auto=format&fit=crop&w=800&q=80&sig=gallery_view2_521",
      "https://images.unsplash.com/photo-1598440947619-2c35fc9aa908?auto=format&fit=crop&w=800&q=80&sig=gallery_view3_521"
    ],
    "countInStock": 52,
    "rating": 4.1,
    "numReviews": 145,
    "isFeatured": false,
    "description": "Brand: Nivea | High quality beauty product designed for durability and daily performance."
  },
  {
    "name": "Plum Premium Beauty Model 32",
    "price": 500,
    "originalPrice": 600,
    "category": "Beauty",
    "image": "https://images.unsplash.com/photo-1598440947619-2c35fc9aa908?auto=format&fit=crop&w=800&q=80&sig=prod_unique_522_beauty",
    "images": [
      "https://images.unsplash.com/photo-1598440947619-2c35fc9aa908?auto=format&fit=crop&w=800&q=80&sig=prod_unique_522_beauty",
      "https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?auto=format&fit=crop&w=800&q=80&sig=gallery_view1_522",
      "https://images.unsplash.com/photo-1598440947619-2c35fc9aa908?auto=format&fit=crop&w=800&q=80&sig=gallery_view2_522",
      "https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?auto=format&fit=crop&w=800&q=80&sig=gallery_view3_522"
    ],
    "countInStock": 54,
    "rating": 4.2,
    "numReviews": 150,
    "isFeatured": false,
    "description": "Brand: Plum | High quality beauty product designed for durability and daily performance."
  },
  {
    "name": "Minimalist Premium Beauty Model 33",
    "price": 500,
    "originalPrice": 600,
    "category": "Beauty",
    "image": "https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?auto=format&fit=crop&w=800&q=80&sig=prod_unique_523_beauty",
    "images": [
      "https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?auto=format&fit=crop&w=800&q=80&sig=prod_unique_523_beauty",
      "https://images.unsplash.com/photo-1598440947619-2c35fc9aa908?auto=format&fit=crop&w=800&q=80&sig=gallery_view1_523",
      "https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?auto=format&fit=crop&w=800&q=80&sig=gallery_view2_523",
      "https://images.unsplash.com/photo-1598440947619-2c35fc9aa908?auto=format&fit=crop&w=800&q=80&sig=gallery_view3_523"
    ],
    "countInStock": 56,
    "rating": 4.3,
    "numReviews": 155,
    "isFeatured": false,
    "description": "Brand: Minimalist | High quality beauty product designed for durability and daily performance."
  },
  {
    "name": "L'Oreal Paris Premium Beauty Model 34",
    "price": 500,
    "originalPrice": 600,
    "category": "Beauty",
    "image": "https://images.unsplash.com/photo-1598440947619-2c35fc9aa908?auto=format&fit=crop&w=800&q=80&sig=prod_unique_524_beauty",
    "images": [
      "https://images.unsplash.com/photo-1598440947619-2c35fc9aa908?auto=format&fit=crop&w=800&q=80&sig=prod_unique_524_beauty",
      "https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?auto=format&fit=crop&w=800&q=80&sig=gallery_view1_524",
      "https://images.unsplash.com/photo-1598440947619-2c35fc9aa908?auto=format&fit=crop&w=800&q=80&sig=gallery_view2_524",
      "https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?auto=format&fit=crop&w=800&q=80&sig=gallery_view3_524"
    ],
    "countInStock": 58,
    "rating": 4.4,
    "numReviews": 160,
    "isFeatured": false,
    "description": "Brand: L'Oreal Paris | High quality beauty product designed for durability and daily performance."
  },
  {
    "name": "The Ordinary Premium Beauty Model 35",
    "price": 500,
    "originalPrice": 600,
    "category": "Beauty",
    "image": "https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?auto=format&fit=crop&w=800&q=80&sig=prod_unique_525_beauty",
    "images": [
      "https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?auto=format&fit=crop&w=800&q=80&sig=prod_unique_525_beauty",
      "https://images.unsplash.com/photo-1598440947619-2c35fc9aa908?auto=format&fit=crop&w=800&q=80&sig=gallery_view1_525",
      "https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?auto=format&fit=crop&w=800&q=80&sig=gallery_view2_525",
      "https://images.unsplash.com/photo-1598440947619-2c35fc9aa908?auto=format&fit=crop&w=800&q=80&sig=gallery_view3_525"
    ],
    "countInStock": 60,
    "rating": 4.5,
    "numReviews": 165,
    "isFeatured": true,
    "description": "Brand: The Ordinary | High quality beauty product designed for durability and daily performance."
  },
  {
    "name": "CeraVe Premium Beauty Model 36",
    "price": 500,
    "originalPrice": 600,
    "category": "Beauty",
    "image": "https://images.unsplash.com/photo-1598440947619-2c35fc9aa908?auto=format&fit=crop&w=800&q=80&sig=prod_unique_526_beauty",
    "images": [
      "https://images.unsplash.com/photo-1598440947619-2c35fc9aa908?auto=format&fit=crop&w=800&q=80&sig=prod_unique_526_beauty",
      "https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?auto=format&fit=crop&w=800&q=80&sig=gallery_view1_526",
      "https://images.unsplash.com/photo-1598440947619-2c35fc9aa908?auto=format&fit=crop&w=800&q=80&sig=gallery_view2_526",
      "https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?auto=format&fit=crop&w=800&q=80&sig=gallery_view3_526"
    ],
    "countInStock": 62,
    "rating": 4.6,
    "numReviews": 170,
    "isFeatured": false,
    "description": "Brand: CeraVe | High quality beauty product designed for durability and daily performance."
  },
  {
    "name": "Neutrogena Premium Beauty Model 37",
    "price": 500,
    "originalPrice": 600,
    "category": "Beauty",
    "image": "https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?auto=format&fit=crop&w=800&q=80&sig=prod_unique_527_beauty",
    "images": [
      "https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?auto=format&fit=crop&w=800&q=80&sig=prod_unique_527_beauty",
      "https://images.unsplash.com/photo-1598440947619-2c35fc9aa908?auto=format&fit=crop&w=800&q=80&sig=gallery_view1_527",
      "https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?auto=format&fit=crop&w=800&q=80&sig=gallery_view2_527",
      "https://images.unsplash.com/photo-1598440947619-2c35fc9aa908?auto=format&fit=crop&w=800&q=80&sig=gallery_view3_527"
    ],
    "countInStock": 64,
    "rating": 4.7,
    "numReviews": 175,
    "isFeatured": false,
    "description": "Brand: Neutrogena | High quality beauty product designed for durability and daily performance."
  },
  {
    "name": "Maybelline Premium Beauty Model 38",
    "price": 500,
    "originalPrice": 600,
    "category": "Beauty",
    "image": "https://images.unsplash.com/photo-1598440947619-2c35fc9aa908?auto=format&fit=crop&w=800&q=80&sig=prod_unique_528_beauty",
    "images": [
      "https://images.unsplash.com/photo-1598440947619-2c35fc9aa908?auto=format&fit=crop&w=800&q=80&sig=prod_unique_528_beauty",
      "https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?auto=format&fit=crop&w=800&q=80&sig=gallery_view1_528",
      "https://images.unsplash.com/photo-1598440947619-2c35fc9aa908?auto=format&fit=crop&w=800&q=80&sig=gallery_view2_528",
      "https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?auto=format&fit=crop&w=800&q=80&sig=gallery_view3_528"
    ],
    "countInStock": 66,
    "rating": 4.8,
    "numReviews": 180,
    "isFeatured": false,
    "description": "Brand: Maybelline | High quality beauty product designed for durability and daily performance."
  },
  {
    "name": "Nivea Premium Beauty Model 39",
    "price": 500,
    "originalPrice": 600,
    "category": "Beauty",
    "image": "https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?auto=format&fit=crop&w=800&q=80&sig=prod_unique_529_beauty",
    "images": [
      "https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?auto=format&fit=crop&w=800&q=80&sig=prod_unique_529_beauty",
      "https://images.unsplash.com/photo-1598440947619-2c35fc9aa908?auto=format&fit=crop&w=800&q=80&sig=gallery_view1_529",
      "https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?auto=format&fit=crop&w=800&q=80&sig=gallery_view2_529",
      "https://images.unsplash.com/photo-1598440947619-2c35fc9aa908?auto=format&fit=crop&w=800&q=80&sig=gallery_view3_529"
    ],
    "countInStock": 68,
    "rating": 4.9,
    "numReviews": 185,
    "isFeatured": false,
    "description": "Brand: Nivea | High quality beauty product designed for durability and daily performance."
  },
  {
    "name": "Plum Premium Beauty Model 40",
    "price": 500,
    "originalPrice": 600,
    "category": "Beauty",
    "image": "https://images.unsplash.com/photo-1598440947619-2c35fc9aa908?auto=format&fit=crop&w=800&q=80&sig=prod_unique_530_beauty",
    "images": [
      "https://images.unsplash.com/photo-1598440947619-2c35fc9aa908?auto=format&fit=crop&w=800&q=80&sig=prod_unique_530_beauty",
      "https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?auto=format&fit=crop&w=800&q=80&sig=gallery_view1_530",
      "https://images.unsplash.com/photo-1598440947619-2c35fc9aa908?auto=format&fit=crop&w=800&q=80&sig=gallery_view2_530",
      "https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?auto=format&fit=crop&w=800&q=80&sig=gallery_view3_530"
    ],
    "countInStock": 70,
    "rating": 4,
    "numReviews": 190,
    "isFeatured": true,
    "description": "Brand: Plum | High quality beauty product designed for durability and daily performance."
  },
  {
    "name": "Minimalist Premium Beauty Model 41",
    "price": 500,
    "originalPrice": 600,
    "category": "Beauty",
    "image": "https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?auto=format&fit=crop&w=800&q=80&sig=prod_unique_531_beauty",
    "images": [
      "https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?auto=format&fit=crop&w=800&q=80&sig=prod_unique_531_beauty",
      "https://images.unsplash.com/photo-1598440947619-2c35fc9aa908?auto=format&fit=crop&w=800&q=80&sig=gallery_view1_531",
      "https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?auto=format&fit=crop&w=800&q=80&sig=gallery_view2_531",
      "https://images.unsplash.com/photo-1598440947619-2c35fc9aa908?auto=format&fit=crop&w=800&q=80&sig=gallery_view3_531"
    ],
    "countInStock": 72,
    "rating": 4.1,
    "numReviews": 195,
    "isFeatured": false,
    "description": "Brand: Minimalist | High quality beauty product designed for durability and daily performance."
  },
  {
    "name": "L'Oreal Paris Premium Beauty Model 42",
    "price": 500,
    "originalPrice": 600,
    "category": "Beauty",
    "image": "https://images.unsplash.com/photo-1598440947619-2c35fc9aa908?auto=format&fit=crop&w=800&q=80&sig=prod_unique_532_beauty",
    "images": [
      "https://images.unsplash.com/photo-1598440947619-2c35fc9aa908?auto=format&fit=crop&w=800&q=80&sig=prod_unique_532_beauty",
      "https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?auto=format&fit=crop&w=800&q=80&sig=gallery_view1_532",
      "https://images.unsplash.com/photo-1598440947619-2c35fc9aa908?auto=format&fit=crop&w=800&q=80&sig=gallery_view2_532",
      "https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?auto=format&fit=crop&w=800&q=80&sig=gallery_view3_532"
    ],
    "countInStock": 74,
    "rating": 4.2,
    "numReviews": 200,
    "isFeatured": false,
    "description": "Brand: L'Oreal Paris | High quality beauty product designed for durability and daily performance."
  },
  {
    "name": "The Ordinary Premium Beauty Model 43",
    "price": 500,
    "originalPrice": 600,
    "category": "Beauty",
    "image": "https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?auto=format&fit=crop&w=800&q=80&sig=prod_unique_533_beauty",
    "images": [
      "https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?auto=format&fit=crop&w=800&q=80&sig=prod_unique_533_beauty",
      "https://images.unsplash.com/photo-1598440947619-2c35fc9aa908?auto=format&fit=crop&w=800&q=80&sig=gallery_view1_533",
      "https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?auto=format&fit=crop&w=800&q=80&sig=gallery_view2_533",
      "https://images.unsplash.com/photo-1598440947619-2c35fc9aa908?auto=format&fit=crop&w=800&q=80&sig=gallery_view3_533"
    ],
    "countInStock": 76,
    "rating": 4.3,
    "numReviews": 205,
    "isFeatured": false,
    "description": "Brand: The Ordinary | High quality beauty product designed for durability and daily performance."
  },
  {
    "name": "CeraVe Premium Beauty Model 44",
    "price": 500,
    "originalPrice": 600,
    "category": "Beauty",
    "image": "https://images.unsplash.com/photo-1598440947619-2c35fc9aa908?auto=format&fit=crop&w=800&q=80&sig=prod_unique_534_beauty",
    "images": [
      "https://images.unsplash.com/photo-1598440947619-2c35fc9aa908?auto=format&fit=crop&w=800&q=80&sig=prod_unique_534_beauty",
      "https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?auto=format&fit=crop&w=800&q=80&sig=gallery_view1_534",
      "https://images.unsplash.com/photo-1598440947619-2c35fc9aa908?auto=format&fit=crop&w=800&q=80&sig=gallery_view2_534",
      "https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?auto=format&fit=crop&w=800&q=80&sig=gallery_view3_534"
    ],
    "countInStock": 78,
    "rating": 4.4,
    "numReviews": 210,
    "isFeatured": false,
    "description": "Brand: CeraVe | High quality beauty product designed for durability and daily performance."
  },
  {
    "name": "Neutrogena Premium Beauty Model 45",
    "price": 500,
    "originalPrice": 600,
    "category": "Beauty",
    "image": "https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?auto=format&fit=crop&w=800&q=80&sig=prod_unique_535_beauty",
    "images": [
      "https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?auto=format&fit=crop&w=800&q=80&sig=prod_unique_535_beauty",
      "https://images.unsplash.com/photo-1598440947619-2c35fc9aa908?auto=format&fit=crop&w=800&q=80&sig=gallery_view1_535",
      "https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?auto=format&fit=crop&w=800&q=80&sig=gallery_view2_535",
      "https://images.unsplash.com/photo-1598440947619-2c35fc9aa908?auto=format&fit=crop&w=800&q=80&sig=gallery_view3_535"
    ],
    "countInStock": 80,
    "rating": 4.5,
    "numReviews": 215,
    "isFeatured": true,
    "description": "Brand: Neutrogena | High quality beauty product designed for durability and daily performance."
  },
  {
    "name": "Nivia Premium Sports Model 11",
    "price": 500,
    "originalPrice": 600,
    "category": "Sports",
    "image": "https://images.unsplash.com/photo-1584735935682-2f2b69dff9d2?auto=format&fit=crop&w=800&q=80&sig=prod_unique_536_sports",
    "images": [
      "https://images.unsplash.com/photo-1584735935682-2f2b69dff9d2?auto=format&fit=crop&w=800&q=80&sig=prod_unique_536_sports",
      "https://images.unsplash.com/photo-1517838277536-f5f99be501cd?auto=format&fit=crop&w=800&q=80&sig=gallery_view1_536",
      "https://images.unsplash.com/photo-1584735935682-2f2b69dff9d2?auto=format&fit=crop&w=800&q=80&sig=gallery_view2_536",
      "https://images.unsplash.com/photo-1517838277536-f5f99be501cd?auto=format&fit=crop&w=800&q=80&sig=gallery_view3_536"
    ],
    "countInStock": 12,
    "rating": 4.1,
    "numReviews": 45,
    "isFeatured": false,
    "description": "Brand: Nivia | High quality sports product designed for durability and daily performance."
  },
  {
    "name": "Yonex Premium Sports Model 12",
    "price": 500,
    "originalPrice": 600,
    "category": "Sports",
    "image": "https://images.unsplash.com/photo-1517838277536-f5f99be501cd?auto=format&fit=crop&w=800&q=80&sig=prod_unique_537_sports",
    "images": [
      "https://images.unsplash.com/photo-1517838277536-f5f99be501cd?auto=format&fit=crop&w=800&q=80&sig=prod_unique_537_sports",
      "https://images.unsplash.com/photo-1584735935682-2f2b69dff9d2?auto=format&fit=crop&w=800&q=80&sig=gallery_view1_537",
      "https://images.unsplash.com/photo-1517838277536-f5f99be501cd?auto=format&fit=crop&w=800&q=80&sig=gallery_view2_537",
      "https://images.unsplash.com/photo-1584735935682-2f2b69dff9d2?auto=format&fit=crop&w=800&q=80&sig=gallery_view3_537"
    ],
    "countInStock": 14,
    "rating": 4.2,
    "numReviews": 50,
    "isFeatured": false,
    "description": "Brand: Yonex | High quality sports product designed for durability and daily performance."
  },
  {
    "name": "Cosco Premium Sports Model 13",
    "price": 500,
    "originalPrice": 600,
    "category": "Sports",
    "image": "https://images.unsplash.com/photo-1584735935682-2f2b69dff9d2?auto=format&fit=crop&w=800&q=80&sig=prod_unique_538_sports",
    "images": [
      "https://images.unsplash.com/photo-1584735935682-2f2b69dff9d2?auto=format&fit=crop&w=800&q=80&sig=prod_unique_538_sports",
      "https://images.unsplash.com/photo-1517838277536-f5f99be501cd?auto=format&fit=crop&w=800&q=80&sig=gallery_view1_538",
      "https://images.unsplash.com/photo-1584735935682-2f2b69dff9d2?auto=format&fit=crop&w=800&q=80&sig=gallery_view2_538",
      "https://images.unsplash.com/photo-1517838277536-f5f99be501cd?auto=format&fit=crop&w=800&q=80&sig=gallery_view3_538"
    ],
    "countInStock": 16,
    "rating": 4.3,
    "numReviews": 55,
    "isFeatured": false,
    "description": "Brand: Cosco | High quality sports product designed for durability and daily performance."
  },
  {
    "name": "Boldfit Premium Sports Model 14",
    "price": 500,
    "originalPrice": 600,
    "category": "Sports",
    "image": "https://images.unsplash.com/photo-1517838277536-f5f99be501cd?auto=format&fit=crop&w=800&q=80&sig=prod_unique_539_sports",
    "images": [
      "https://images.unsplash.com/photo-1517838277536-f5f99be501cd?auto=format&fit=crop&w=800&q=80&sig=prod_unique_539_sports",
      "https://images.unsplash.com/photo-1584735935682-2f2b69dff9d2?auto=format&fit=crop&w=800&q=80&sig=gallery_view1_539",
      "https://images.unsplash.com/photo-1517838277536-f5f99be501cd?auto=format&fit=crop&w=800&q=80&sig=gallery_view2_539",
      "https://images.unsplash.com/photo-1584735935682-2f2b69dff9d2?auto=format&fit=crop&w=800&q=80&sig=gallery_view3_539"
    ],
    "countInStock": 18,
    "rating": 4.4,
    "numReviews": 60,
    "isFeatured": false,
    "description": "Brand: Boldfit | High quality sports product designed for durability and daily performance."
  },
  {
    "name": "Strauss Premium Sports Model 15",
    "price": 500,
    "originalPrice": 600,
    "category": "Sports",
    "image": "https://images.unsplash.com/photo-1584735935682-2f2b69dff9d2?auto=format&fit=crop&w=800&q=80&sig=prod_unique_540_sports",
    "images": [
      "https://images.unsplash.com/photo-1584735935682-2f2b69dff9d2?auto=format&fit=crop&w=800&q=80&sig=prod_unique_540_sports",
      "https://images.unsplash.com/photo-1517838277536-f5f99be501cd?auto=format&fit=crop&w=800&q=80&sig=gallery_view1_540",
      "https://images.unsplash.com/photo-1584735935682-2f2b69dff9d2?auto=format&fit=crop&w=800&q=80&sig=gallery_view2_540",
      "https://images.unsplash.com/photo-1517838277536-f5f99be501cd?auto=format&fit=crop&w=800&q=80&sig=gallery_view3_540"
    ],
    "countInStock": 20,
    "rating": 4.5,
    "numReviews": 65,
    "isFeatured": true,
    "description": "Brand: Strauss | High quality sports product designed for durability and daily performance."
  },
  {
    "name": "Flexnest Premium Sports Model 16",
    "price": 500,
    "originalPrice": 600,
    "category": "Sports",
    "image": "https://images.unsplash.com/photo-1517838277536-f5f99be501cd?auto=format&fit=crop&w=800&q=80&sig=prod_unique_541_sports",
    "images": [
      "https://images.unsplash.com/photo-1517838277536-f5f99be501cd?auto=format&fit=crop&w=800&q=80&sig=prod_unique_541_sports",
      "https://images.unsplash.com/photo-1584735935682-2f2b69dff9d2?auto=format&fit=crop&w=800&q=80&sig=gallery_view1_541",
      "https://images.unsplash.com/photo-1517838277536-f5f99be501cd?auto=format&fit=crop&w=800&q=80&sig=gallery_view2_541",
      "https://images.unsplash.com/photo-1584735935682-2f2b69dff9d2?auto=format&fit=crop&w=800&q=80&sig=gallery_view3_541"
    ],
    "countInStock": 22,
    "rating": 4.6,
    "numReviews": 70,
    "isFeatured": false,
    "description": "Brand: Flexnest | High quality sports product designed for durability and daily performance."
  },
  {
    "name": "Decathlon Premium Sports Model 17",
    "price": 500,
    "originalPrice": 600,
    "category": "Sports",
    "image": "https://images.unsplash.com/photo-1584735935682-2f2b69dff9d2?auto=format&fit=crop&w=800&q=80&sig=prod_unique_542_sports",
    "images": [
      "https://images.unsplash.com/photo-1584735935682-2f2b69dff9d2?auto=format&fit=crop&w=800&q=80&sig=prod_unique_542_sports",
      "https://images.unsplash.com/photo-1517838277536-f5f99be501cd?auto=format&fit=crop&w=800&q=80&sig=gallery_view1_542",
      "https://images.unsplash.com/photo-1584735935682-2f2b69dff9d2?auto=format&fit=crop&w=800&q=80&sig=gallery_view2_542",
      "https://images.unsplash.com/photo-1517838277536-f5f99be501cd?auto=format&fit=crop&w=800&q=80&sig=gallery_view3_542"
    ],
    "countInStock": 24,
    "rating": 4.7,
    "numReviews": 75,
    "isFeatured": false,
    "description": "Brand: Decathlon | High quality sports product designed for durability and daily performance."
  },
  {
    "name": "Nivia Premium Sports Model 18",
    "price": 500,
    "originalPrice": 600,
    "category": "Sports",
    "image": "https://images.unsplash.com/photo-1517838277536-f5f99be501cd?auto=format&fit=crop&w=800&q=80&sig=prod_unique_543_sports",
    "images": [
      "https://images.unsplash.com/photo-1517838277536-f5f99be501cd?auto=format&fit=crop&w=800&q=80&sig=prod_unique_543_sports",
      "https://images.unsplash.com/photo-1584735935682-2f2b69dff9d2?auto=format&fit=crop&w=800&q=80&sig=gallery_view1_543",
      "https://images.unsplash.com/photo-1517838277536-f5f99be501cd?auto=format&fit=crop&w=800&q=80&sig=gallery_view2_543",
      "https://images.unsplash.com/photo-1584735935682-2f2b69dff9d2?auto=format&fit=crop&w=800&q=80&sig=gallery_view3_543"
    ],
    "countInStock": 26,
    "rating": 4.8,
    "numReviews": 80,
    "isFeatured": false,
    "description": "Brand: Nivia | High quality sports product designed for durability and daily performance."
  },
  {
    "name": "Yonex Premium Sports Model 19",
    "price": 500,
    "originalPrice": 600,
    "category": "Sports",
    "image": "https://images.unsplash.com/photo-1584735935682-2f2b69dff9d2?auto=format&fit=crop&w=800&q=80&sig=prod_unique_544_sports",
    "images": [
      "https://images.unsplash.com/photo-1584735935682-2f2b69dff9d2?auto=format&fit=crop&w=800&q=80&sig=prod_unique_544_sports",
      "https://images.unsplash.com/photo-1517838277536-f5f99be501cd?auto=format&fit=crop&w=800&q=80&sig=gallery_view1_544",
      "https://images.unsplash.com/photo-1584735935682-2f2b69dff9d2?auto=format&fit=crop&w=800&q=80&sig=gallery_view2_544",
      "https://images.unsplash.com/photo-1517838277536-f5f99be501cd?auto=format&fit=crop&w=800&q=80&sig=gallery_view3_544"
    ],
    "countInStock": 28,
    "rating": 4.9,
    "numReviews": 85,
    "isFeatured": false,
    "description": "Brand: Yonex | High quality sports product designed for durability and daily performance."
  },
  {
    "name": "Cosco Premium Sports Model 20",
    "price": 500,
    "originalPrice": 600,
    "category": "Sports",
    "image": "https://images.unsplash.com/photo-1517838277536-f5f99be501cd?auto=format&fit=crop&w=800&q=80&sig=prod_unique_545_sports",
    "images": [
      "https://images.unsplash.com/photo-1517838277536-f5f99be501cd?auto=format&fit=crop&w=800&q=80&sig=prod_unique_545_sports",
      "https://images.unsplash.com/photo-1584735935682-2f2b69dff9d2?auto=format&fit=crop&w=800&q=80&sig=gallery_view1_545",
      "https://images.unsplash.com/photo-1517838277536-f5f99be501cd?auto=format&fit=crop&w=800&q=80&sig=gallery_view2_545",
      "https://images.unsplash.com/photo-1584735935682-2f2b69dff9d2?auto=format&fit=crop&w=800&q=80&sig=gallery_view3_545"
    ],
    "countInStock": 30,
    "rating": 4,
    "numReviews": 90,
    "isFeatured": true,
    "description": "Brand: Cosco | High quality sports product designed for durability and daily performance."
  },
  {
    "name": "Boldfit Premium Sports Model 21",
    "price": 500,
    "originalPrice": 600,
    "category": "Sports",
    "image": "https://images.unsplash.com/photo-1584735935682-2f2b69dff9d2?auto=format&fit=crop&w=800&q=80&sig=prod_unique_546_sports",
    "images": [
      "https://images.unsplash.com/photo-1584735935682-2f2b69dff9d2?auto=format&fit=crop&w=800&q=80&sig=prod_unique_546_sports",
      "https://images.unsplash.com/photo-1517838277536-f5f99be501cd?auto=format&fit=crop&w=800&q=80&sig=gallery_view1_546",
      "https://images.unsplash.com/photo-1584735935682-2f2b69dff9d2?auto=format&fit=crop&w=800&q=80&sig=gallery_view2_546",
      "https://images.unsplash.com/photo-1517838277536-f5f99be501cd?auto=format&fit=crop&w=800&q=80&sig=gallery_view3_546"
    ],
    "countInStock": 32,
    "rating": 4.1,
    "numReviews": 95,
    "isFeatured": false,
    "description": "Brand: Boldfit | High quality sports product designed for durability and daily performance."
  },
  {
    "name": "Strauss Premium Sports Model 22",
    "price": 500,
    "originalPrice": 600,
    "category": "Sports",
    "image": "https://images.unsplash.com/photo-1517838277536-f5f99be501cd?auto=format&fit=crop&w=800&q=80&sig=prod_unique_547_sports",
    "images": [
      "https://images.unsplash.com/photo-1517838277536-f5f99be501cd?auto=format&fit=crop&w=800&q=80&sig=prod_unique_547_sports",
      "https://images.unsplash.com/photo-1584735935682-2f2b69dff9d2?auto=format&fit=crop&w=800&q=80&sig=gallery_view1_547",
      "https://images.unsplash.com/photo-1517838277536-f5f99be501cd?auto=format&fit=crop&w=800&q=80&sig=gallery_view2_547",
      "https://images.unsplash.com/photo-1584735935682-2f2b69dff9d2?auto=format&fit=crop&w=800&q=80&sig=gallery_view3_547"
    ],
    "countInStock": 34,
    "rating": 4.2,
    "numReviews": 100,
    "isFeatured": false,
    "description": "Brand: Strauss | High quality sports product designed for durability and daily performance."
  },
  {
    "name": "Flexnest Premium Sports Model 23",
    "price": 500,
    "originalPrice": 600,
    "category": "Sports",
    "image": "https://images.unsplash.com/photo-1584735935682-2f2b69dff9d2?auto=format&fit=crop&w=800&q=80&sig=prod_unique_548_sports",
    "images": [
      "https://images.unsplash.com/photo-1584735935682-2f2b69dff9d2?auto=format&fit=crop&w=800&q=80&sig=prod_unique_548_sports",
      "https://images.unsplash.com/photo-1517838277536-f5f99be501cd?auto=format&fit=crop&w=800&q=80&sig=gallery_view1_548",
      "https://images.unsplash.com/photo-1584735935682-2f2b69dff9d2?auto=format&fit=crop&w=800&q=80&sig=gallery_view2_548",
      "https://images.unsplash.com/photo-1517838277536-f5f99be501cd?auto=format&fit=crop&w=800&q=80&sig=gallery_view3_548"
    ],
    "countInStock": 36,
    "rating": 4.3,
    "numReviews": 105,
    "isFeatured": false,
    "description": "Brand: Flexnest | High quality sports product designed for durability and daily performance."
  },
  {
    "name": "Decathlon Premium Sports Model 24",
    "price": 500,
    "originalPrice": 600,
    "category": "Sports",
    "image": "https://images.unsplash.com/photo-1517838277536-f5f99be501cd?auto=format&fit=crop&w=800&q=80&sig=prod_unique_549_sports",
    "images": [
      "https://images.unsplash.com/photo-1517838277536-f5f99be501cd?auto=format&fit=crop&w=800&q=80&sig=prod_unique_549_sports",
      "https://images.unsplash.com/photo-1584735935682-2f2b69dff9d2?auto=format&fit=crop&w=800&q=80&sig=gallery_view1_549",
      "https://images.unsplash.com/photo-1517838277536-f5f99be501cd?auto=format&fit=crop&w=800&q=80&sig=gallery_view2_549",
      "https://images.unsplash.com/photo-1584735935682-2f2b69dff9d2?auto=format&fit=crop&w=800&q=80&sig=gallery_view3_549"
    ],
    "countInStock": 38,
    "rating": 4.4,
    "numReviews": 110,
    "isFeatured": false,
    "description": "Brand: Decathlon | High quality sports product designed for durability and daily performance."
  },
  {
    "name": "Nivia Premium Sports Model 25",
    "price": 500,
    "originalPrice": 600,
    "category": "Sports",
    "image": "https://images.unsplash.com/photo-1584735935682-2f2b69dff9d2?auto=format&fit=crop&w=800&q=80&sig=prod_unique_550_sports",
    "images": [
      "https://images.unsplash.com/photo-1584735935682-2f2b69dff9d2?auto=format&fit=crop&w=800&q=80&sig=prod_unique_550_sports",
      "https://images.unsplash.com/photo-1517838277536-f5f99be501cd?auto=format&fit=crop&w=800&q=80&sig=gallery_view1_550",
      "https://images.unsplash.com/photo-1584735935682-2f2b69dff9d2?auto=format&fit=crop&w=800&q=80&sig=gallery_view2_550",
      "https://images.unsplash.com/photo-1517838277536-f5f99be501cd?auto=format&fit=crop&w=800&q=80&sig=gallery_view3_550"
    ],
    "countInStock": 40,
    "rating": 4.5,
    "numReviews": 115,
    "isFeatured": true,
    "description": "Brand: Nivia | High quality sports product designed for durability and daily performance."
  },
  {
    "name": "Yonex Premium Sports Model 26",
    "price": 500,
    "originalPrice": 600,
    "category": "Sports",
    "image": "https://images.unsplash.com/photo-1517838277536-f5f99be501cd?auto=format&fit=crop&w=800&q=80&sig=prod_unique_551_sports",
    "images": [
      "https://images.unsplash.com/photo-1517838277536-f5f99be501cd?auto=format&fit=crop&w=800&q=80&sig=prod_unique_551_sports",
      "https://images.unsplash.com/photo-1584735935682-2f2b69dff9d2?auto=format&fit=crop&w=800&q=80&sig=gallery_view1_551",
      "https://images.unsplash.com/photo-1517838277536-f5f99be501cd?auto=format&fit=crop&w=800&q=80&sig=gallery_view2_551",
      "https://images.unsplash.com/photo-1584735935682-2f2b69dff9d2?auto=format&fit=crop&w=800&q=80&sig=gallery_view3_551"
    ],
    "countInStock": 42,
    "rating": 4.6,
    "numReviews": 120,
    "isFeatured": false,
    "description": "Brand: Yonex | High quality sports product designed for durability and daily performance."
  },
  {
    "name": "Cosco Premium Sports Model 27",
    "price": 500,
    "originalPrice": 600,
    "category": "Sports",
    "image": "https://images.unsplash.com/photo-1584735935682-2f2b69dff9d2?auto=format&fit=crop&w=800&q=80&sig=prod_unique_552_sports",
    "images": [
      "https://images.unsplash.com/photo-1584735935682-2f2b69dff9d2?auto=format&fit=crop&w=800&q=80&sig=prod_unique_552_sports",
      "https://images.unsplash.com/photo-1517838277536-f5f99be501cd?auto=format&fit=crop&w=800&q=80&sig=gallery_view1_552",
      "https://images.unsplash.com/photo-1584735935682-2f2b69dff9d2?auto=format&fit=crop&w=800&q=80&sig=gallery_view2_552",
      "https://images.unsplash.com/photo-1517838277536-f5f99be501cd?auto=format&fit=crop&w=800&q=80&sig=gallery_view3_552"
    ],
    "countInStock": 44,
    "rating": 4.7,
    "numReviews": 125,
    "isFeatured": false,
    "description": "Brand: Cosco | High quality sports product designed for durability and daily performance."
  },
  {
    "name": "Boldfit Premium Sports Model 28",
    "price": 500,
    "originalPrice": 600,
    "category": "Sports",
    "image": "https://images.unsplash.com/photo-1517838277536-f5f99be501cd?auto=format&fit=crop&w=800&q=80&sig=prod_unique_553_sports",
    "images": [
      "https://images.unsplash.com/photo-1517838277536-f5f99be501cd?auto=format&fit=crop&w=800&q=80&sig=prod_unique_553_sports",
      "https://images.unsplash.com/photo-1584735935682-2f2b69dff9d2?auto=format&fit=crop&w=800&q=80&sig=gallery_view1_553",
      "https://images.unsplash.com/photo-1517838277536-f5f99be501cd?auto=format&fit=crop&w=800&q=80&sig=gallery_view2_553",
      "https://images.unsplash.com/photo-1584735935682-2f2b69dff9d2?auto=format&fit=crop&w=800&q=80&sig=gallery_view3_553"
    ],
    "countInStock": 46,
    "rating": 4.8,
    "numReviews": 130,
    "isFeatured": false,
    "description": "Brand: Boldfit | High quality sports product designed for durability and daily performance."
  },
  {
    "name": "Strauss Premium Sports Model 29",
    "price": 500,
    "originalPrice": 600,
    "category": "Sports",
    "image": "https://images.unsplash.com/photo-1584735935682-2f2b69dff9d2?auto=format&fit=crop&w=800&q=80&sig=prod_unique_554_sports",
    "images": [
      "https://images.unsplash.com/photo-1584735935682-2f2b69dff9d2?auto=format&fit=crop&w=800&q=80&sig=prod_unique_554_sports",
      "https://images.unsplash.com/photo-1517838277536-f5f99be501cd?auto=format&fit=crop&w=800&q=80&sig=gallery_view1_554",
      "https://images.unsplash.com/photo-1584735935682-2f2b69dff9d2?auto=format&fit=crop&w=800&q=80&sig=gallery_view2_554",
      "https://images.unsplash.com/photo-1517838277536-f5f99be501cd?auto=format&fit=crop&w=800&q=80&sig=gallery_view3_554"
    ],
    "countInStock": 48,
    "rating": 4.9,
    "numReviews": 135,
    "isFeatured": false,
    "description": "Brand: Strauss | High quality sports product designed for durability and daily performance."
  },
  {
    "name": "Flexnest Premium Sports Model 30",
    "price": 500,
    "originalPrice": 600,
    "category": "Sports",
    "image": "https://images.unsplash.com/photo-1517838277536-f5f99be501cd?auto=format&fit=crop&w=800&q=80&sig=prod_unique_555_sports",
    "images": [
      "https://images.unsplash.com/photo-1517838277536-f5f99be501cd?auto=format&fit=crop&w=800&q=80&sig=prod_unique_555_sports",
      "https://images.unsplash.com/photo-1584735935682-2f2b69dff9d2?auto=format&fit=crop&w=800&q=80&sig=gallery_view1_555",
      "https://images.unsplash.com/photo-1517838277536-f5f99be501cd?auto=format&fit=crop&w=800&q=80&sig=gallery_view2_555",
      "https://images.unsplash.com/photo-1584735935682-2f2b69dff9d2?auto=format&fit=crop&w=800&q=80&sig=gallery_view3_555"
    ],
    "countInStock": 50,
    "rating": 4,
    "numReviews": 140,
    "isFeatured": true,
    "description": "Brand: Flexnest | High quality sports product designed for durability and daily performance."
  },
  {
    "name": "Decathlon Premium Sports Model 31",
    "price": 500,
    "originalPrice": 600,
    "category": "Sports",
    "image": "https://images.unsplash.com/photo-1584735935682-2f2b69dff9d2?auto=format&fit=crop&w=800&q=80&sig=prod_unique_556_sports",
    "images": [
      "https://images.unsplash.com/photo-1584735935682-2f2b69dff9d2?auto=format&fit=crop&w=800&q=80&sig=prod_unique_556_sports",
      "https://images.unsplash.com/photo-1517838277536-f5f99be501cd?auto=format&fit=crop&w=800&q=80&sig=gallery_view1_556",
      "https://images.unsplash.com/photo-1584735935682-2f2b69dff9d2?auto=format&fit=crop&w=800&q=80&sig=gallery_view2_556",
      "https://images.unsplash.com/photo-1517838277536-f5f99be501cd?auto=format&fit=crop&w=800&q=80&sig=gallery_view3_556"
    ],
    "countInStock": 52,
    "rating": 4.1,
    "numReviews": 145,
    "isFeatured": false,
    "description": "Brand: Decathlon | High quality sports product designed for durability and daily performance."
  },
  {
    "name": "Nivia Premium Sports Model 32",
    "price": 500,
    "originalPrice": 600,
    "category": "Sports",
    "image": "https://images.unsplash.com/photo-1517838277536-f5f99be501cd?auto=format&fit=crop&w=800&q=80&sig=prod_unique_557_sports",
    "images": [
      "https://images.unsplash.com/photo-1517838277536-f5f99be501cd?auto=format&fit=crop&w=800&q=80&sig=prod_unique_557_sports",
      "https://images.unsplash.com/photo-1584735935682-2f2b69dff9d2?auto=format&fit=crop&w=800&q=80&sig=gallery_view1_557",
      "https://images.unsplash.com/photo-1517838277536-f5f99be501cd?auto=format&fit=crop&w=800&q=80&sig=gallery_view2_557",
      "https://images.unsplash.com/photo-1584735935682-2f2b69dff9d2?auto=format&fit=crop&w=800&q=80&sig=gallery_view3_557"
    ],
    "countInStock": 54,
    "rating": 4.2,
    "numReviews": 150,
    "isFeatured": false,
    "description": "Brand: Nivia | High quality sports product designed for durability and daily performance."
  },
  {
    "name": "Yonex Premium Sports Model 33",
    "price": 500,
    "originalPrice": 600,
    "category": "Sports",
    "image": "https://images.unsplash.com/photo-1584735935682-2f2b69dff9d2?auto=format&fit=crop&w=800&q=80&sig=prod_unique_558_sports",
    "images": [
      "https://images.unsplash.com/photo-1584735935682-2f2b69dff9d2?auto=format&fit=crop&w=800&q=80&sig=prod_unique_558_sports",
      "https://images.unsplash.com/photo-1517838277536-f5f99be501cd?auto=format&fit=crop&w=800&q=80&sig=gallery_view1_558",
      "https://images.unsplash.com/photo-1584735935682-2f2b69dff9d2?auto=format&fit=crop&w=800&q=80&sig=gallery_view2_558",
      "https://images.unsplash.com/photo-1517838277536-f5f99be501cd?auto=format&fit=crop&w=800&q=80&sig=gallery_view3_558"
    ],
    "countInStock": 56,
    "rating": 4.3,
    "numReviews": 155,
    "isFeatured": false,
    "description": "Brand: Yonex | High quality sports product designed for durability and daily performance."
  },
  {
    "name": "Cosco Premium Sports Model 34",
    "price": 500,
    "originalPrice": 600,
    "category": "Sports",
    "image": "https://images.unsplash.com/photo-1517838277536-f5f99be501cd?auto=format&fit=crop&w=800&q=80&sig=prod_unique_559_sports",
    "images": [
      "https://images.unsplash.com/photo-1517838277536-f5f99be501cd?auto=format&fit=crop&w=800&q=80&sig=prod_unique_559_sports",
      "https://images.unsplash.com/photo-1584735935682-2f2b69dff9d2?auto=format&fit=crop&w=800&q=80&sig=gallery_view1_559",
      "https://images.unsplash.com/photo-1517838277536-f5f99be501cd?auto=format&fit=crop&w=800&q=80&sig=gallery_view2_559",
      "https://images.unsplash.com/photo-1584735935682-2f2b69dff9d2?auto=format&fit=crop&w=800&q=80&sig=gallery_view3_559"
    ],
    "countInStock": 58,
    "rating": 4.4,
    "numReviews": 160,
    "isFeatured": false,
    "description": "Brand: Cosco | High quality sports product designed for durability and daily performance."
  },
  {
    "name": "Boldfit Premium Sports Model 35",
    "price": 500,
    "originalPrice": 600,
    "category": "Sports",
    "image": "https://images.unsplash.com/photo-1584735935682-2f2b69dff9d2?auto=format&fit=crop&w=800&q=80&sig=prod_unique_560_sports",
    "images": [
      "https://images.unsplash.com/photo-1584735935682-2f2b69dff9d2?auto=format&fit=crop&w=800&q=80&sig=prod_unique_560_sports",
      "https://images.unsplash.com/photo-1517838277536-f5f99be501cd?auto=format&fit=crop&w=800&q=80&sig=gallery_view1_560",
      "https://images.unsplash.com/photo-1584735935682-2f2b69dff9d2?auto=format&fit=crop&w=800&q=80&sig=gallery_view2_560",
      "https://images.unsplash.com/photo-1517838277536-f5f99be501cd?auto=format&fit=crop&w=800&q=80&sig=gallery_view3_560"
    ],
    "countInStock": 60,
    "rating": 4.5,
    "numReviews": 165,
    "isFeatured": true,
    "description": "Brand: Boldfit | High quality sports product designed for durability and daily performance."
  },
  {
    "name": "Strauss Premium Sports Model 36",
    "price": 500,
    "originalPrice": 600,
    "category": "Sports",
    "image": "https://images.unsplash.com/photo-1517838277536-f5f99be501cd?auto=format&fit=crop&w=800&q=80&sig=prod_unique_561_sports",
    "images": [
      "https://images.unsplash.com/photo-1517838277536-f5f99be501cd?auto=format&fit=crop&w=800&q=80&sig=prod_unique_561_sports",
      "https://images.unsplash.com/photo-1584735935682-2f2b69dff9d2?auto=format&fit=crop&w=800&q=80&sig=gallery_view1_561",
      "https://images.unsplash.com/photo-1517838277536-f5f99be501cd?auto=format&fit=crop&w=800&q=80&sig=gallery_view2_561",
      "https://images.unsplash.com/photo-1584735935682-2f2b69dff9d2?auto=format&fit=crop&w=800&q=80&sig=gallery_view3_561"
    ],
    "countInStock": 62,
    "rating": 4.6,
    "numReviews": 170,
    "isFeatured": false,
    "description": "Brand: Strauss | High quality sports product designed for durability and daily performance."
  },
  {
    "name": "Flexnest Premium Sports Model 37",
    "price": 500,
    "originalPrice": 600,
    "category": "Sports",
    "image": "https://images.unsplash.com/photo-1584735935682-2f2b69dff9d2?auto=format&fit=crop&w=800&q=80&sig=prod_unique_562_sports",
    "images": [
      "https://images.unsplash.com/photo-1584735935682-2f2b69dff9d2?auto=format&fit=crop&w=800&q=80&sig=prod_unique_562_sports",
      "https://images.unsplash.com/photo-1517838277536-f5f99be501cd?auto=format&fit=crop&w=800&q=80&sig=gallery_view1_562",
      "https://images.unsplash.com/photo-1584735935682-2f2b69dff9d2?auto=format&fit=crop&w=800&q=80&sig=gallery_view2_562",
      "https://images.unsplash.com/photo-1517838277536-f5f99be501cd?auto=format&fit=crop&w=800&q=80&sig=gallery_view3_562"
    ],
    "countInStock": 64,
    "rating": 4.7,
    "numReviews": 175,
    "isFeatured": false,
    "description": "Brand: Flexnest | High quality sports product designed for durability and daily performance."
  },
  {
    "name": "Decathlon Premium Sports Model 38",
    "price": 500,
    "originalPrice": 600,
    "category": "Sports",
    "image": "https://images.unsplash.com/photo-1517838277536-f5f99be501cd?auto=format&fit=crop&w=800&q=80&sig=prod_unique_563_sports",
    "images": [
      "https://images.unsplash.com/photo-1517838277536-f5f99be501cd?auto=format&fit=crop&w=800&q=80&sig=prod_unique_563_sports",
      "https://images.unsplash.com/photo-1584735935682-2f2b69dff9d2?auto=format&fit=crop&w=800&q=80&sig=gallery_view1_563",
      "https://images.unsplash.com/photo-1517838277536-f5f99be501cd?auto=format&fit=crop&w=800&q=80&sig=gallery_view2_563",
      "https://images.unsplash.com/photo-1584735935682-2f2b69dff9d2?auto=format&fit=crop&w=800&q=80&sig=gallery_view3_563"
    ],
    "countInStock": 66,
    "rating": 4.8,
    "numReviews": 180,
    "isFeatured": false,
    "description": "Brand: Decathlon | High quality sports product designed for durability and daily performance."
  },
  {
    "name": "Nivia Premium Sports Model 39",
    "price": 500,
    "originalPrice": 600,
    "category": "Sports",
    "image": "https://images.unsplash.com/photo-1584735935682-2f2b69dff9d2?auto=format&fit=crop&w=800&q=80&sig=prod_unique_564_sports",
    "images": [
      "https://images.unsplash.com/photo-1584735935682-2f2b69dff9d2?auto=format&fit=crop&w=800&q=80&sig=prod_unique_564_sports",
      "https://images.unsplash.com/photo-1517838277536-f5f99be501cd?auto=format&fit=crop&w=800&q=80&sig=gallery_view1_564",
      "https://images.unsplash.com/photo-1584735935682-2f2b69dff9d2?auto=format&fit=crop&w=800&q=80&sig=gallery_view2_564",
      "https://images.unsplash.com/photo-1517838277536-f5f99be501cd?auto=format&fit=crop&w=800&q=80&sig=gallery_view3_564"
    ],
    "countInStock": 68,
    "rating": 4.9,
    "numReviews": 185,
    "isFeatured": false,
    "description": "Brand: Nivia | High quality sports product designed for durability and daily performance."
  },
  {
    "name": "Yonex Premium Sports Model 40",
    "price": 500,
    "originalPrice": 600,
    "category": "Sports",
    "image": "https://images.unsplash.com/photo-1517838277536-f5f99be501cd?auto=format&fit=crop&w=800&q=80&sig=prod_unique_565_sports",
    "images": [
      "https://images.unsplash.com/photo-1517838277536-f5f99be501cd?auto=format&fit=crop&w=800&q=80&sig=prod_unique_565_sports",
      "https://images.unsplash.com/photo-1584735935682-2f2b69dff9d2?auto=format&fit=crop&w=800&q=80&sig=gallery_view1_565",
      "https://images.unsplash.com/photo-1517838277536-f5f99be501cd?auto=format&fit=crop&w=800&q=80&sig=gallery_view2_565",
      "https://images.unsplash.com/photo-1584735935682-2f2b69dff9d2?auto=format&fit=crop&w=800&q=80&sig=gallery_view3_565"
    ],
    "countInStock": 70,
    "rating": 4,
    "numReviews": 190,
    "isFeatured": true,
    "description": "Brand: Yonex | High quality sports product designed for durability and daily performance."
  },
  {
    "name": "Cosco Premium Sports Model 41",
    "price": 500,
    "originalPrice": 600,
    "category": "Sports",
    "image": "https://images.unsplash.com/photo-1584735935682-2f2b69dff9d2?auto=format&fit=crop&w=800&q=80&sig=prod_unique_566_sports",
    "images": [
      "https://images.unsplash.com/photo-1584735935682-2f2b69dff9d2?auto=format&fit=crop&w=800&q=80&sig=prod_unique_566_sports",
      "https://images.unsplash.com/photo-1517838277536-f5f99be501cd?auto=format&fit=crop&w=800&q=80&sig=gallery_view1_566",
      "https://images.unsplash.com/photo-1584735935682-2f2b69dff9d2?auto=format&fit=crop&w=800&q=80&sig=gallery_view2_566",
      "https://images.unsplash.com/photo-1517838277536-f5f99be501cd?auto=format&fit=crop&w=800&q=80&sig=gallery_view3_566"
    ],
    "countInStock": 72,
    "rating": 4.1,
    "numReviews": 195,
    "isFeatured": false,
    "description": "Brand: Cosco | High quality sports product designed for durability and daily performance."
  },
  {
    "name": "Boldfit Premium Sports Model 42",
    "price": 500,
    "originalPrice": 600,
    "category": "Sports",
    "image": "https://images.unsplash.com/photo-1517838277536-f5f99be501cd?auto=format&fit=crop&w=800&q=80&sig=prod_unique_567_sports",
    "images": [
      "https://images.unsplash.com/photo-1517838277536-f5f99be501cd?auto=format&fit=crop&w=800&q=80&sig=prod_unique_567_sports",
      "https://images.unsplash.com/photo-1584735935682-2f2b69dff9d2?auto=format&fit=crop&w=800&q=80&sig=gallery_view1_567",
      "https://images.unsplash.com/photo-1517838277536-f5f99be501cd?auto=format&fit=crop&w=800&q=80&sig=gallery_view2_567",
      "https://images.unsplash.com/photo-1584735935682-2f2b69dff9d2?auto=format&fit=crop&w=800&q=80&sig=gallery_view3_567"
    ],
    "countInStock": 74,
    "rating": 4.2,
    "numReviews": 200,
    "isFeatured": false,
    "description": "Brand: Boldfit | High quality sports product designed for durability and daily performance."
  },
  {
    "name": "Strauss Premium Sports Model 43",
    "price": 500,
    "originalPrice": 600,
    "category": "Sports",
    "image": "https://images.unsplash.com/photo-1584735935682-2f2b69dff9d2?auto=format&fit=crop&w=800&q=80&sig=prod_unique_568_sports",
    "images": [
      "https://images.unsplash.com/photo-1584735935682-2f2b69dff9d2?auto=format&fit=crop&w=800&q=80&sig=prod_unique_568_sports",
      "https://images.unsplash.com/photo-1517838277536-f5f99be501cd?auto=format&fit=crop&w=800&q=80&sig=gallery_view1_568",
      "https://images.unsplash.com/photo-1584735935682-2f2b69dff9d2?auto=format&fit=crop&w=800&q=80&sig=gallery_view2_568",
      "https://images.unsplash.com/photo-1517838277536-f5f99be501cd?auto=format&fit=crop&w=800&q=80&sig=gallery_view3_568"
    ],
    "countInStock": 76,
    "rating": 4.3,
    "numReviews": 205,
    "isFeatured": false,
    "description": "Brand: Strauss | High quality sports product designed for durability and daily performance."
  },
  {
    "name": "Flexnest Premium Sports Model 44",
    "price": 500,
    "originalPrice": 600,
    "category": "Sports",
    "image": "https://images.unsplash.com/photo-1517838277536-f5f99be501cd?auto=format&fit=crop&w=800&q=80&sig=prod_unique_569_sports",
    "images": [
      "https://images.unsplash.com/photo-1517838277536-f5f99be501cd?auto=format&fit=crop&w=800&q=80&sig=prod_unique_569_sports",
      "https://images.unsplash.com/photo-1584735935682-2f2b69dff9d2?auto=format&fit=crop&w=800&q=80&sig=gallery_view1_569",
      "https://images.unsplash.com/photo-1517838277536-f5f99be501cd?auto=format&fit=crop&w=800&q=80&sig=gallery_view2_569",
      "https://images.unsplash.com/photo-1584735935682-2f2b69dff9d2?auto=format&fit=crop&w=800&q=80&sig=gallery_view3_569"
    ],
    "countInStock": 78,
    "rating": 4.4,
    "numReviews": 210,
    "isFeatured": false,
    "description": "Brand: Flexnest | High quality sports product designed for durability and daily performance."
  },
  {
    "name": "Decathlon Premium Sports Model 45",
    "price": 500,
    "originalPrice": 600,
    "category": "Sports",
    "image": "https://images.unsplash.com/photo-1584735935682-2f2b69dff9d2?auto=format&fit=crop&w=800&q=80&sig=prod_unique_570_sports",
    "images": [
      "https://images.unsplash.com/photo-1584735935682-2f2b69dff9d2?auto=format&fit=crop&w=800&q=80&sig=prod_unique_570_sports",
      "https://images.unsplash.com/photo-1517838277536-f5f99be501cd?auto=format&fit=crop&w=800&q=80&sig=gallery_view1_570",
      "https://images.unsplash.com/photo-1584735935682-2f2b69dff9d2?auto=format&fit=crop&w=800&q=80&sig=gallery_view2_570",
      "https://images.unsplash.com/photo-1517838277536-f5f99be501cd?auto=format&fit=crop&w=800&q=80&sig=gallery_view3_570"
    ],
    "countInStock": 80,
    "rating": 4.5,
    "numReviews": 215,
    "isFeatured": true,
    "description": "Brand: Decathlon | High quality sports product designed for durability and daily performance."
  },
  {
    "name": "HarperCollins Premium Books Model 11",
    "price": 500,
    "originalPrice": 600,
    "category": "Books",
    "image": "https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?auto=format&fit=crop&w=800&q=80&sig=prod_unique_571_books",
    "images": [
      "https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?auto=format&fit=crop&w=800&q=80&sig=prod_unique_571_books",
      "https://images.unsplash.com/photo-1512820790803-83ca734da794?auto=format&fit=crop&w=800&q=80&sig=gallery_view1_571",
      "https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?auto=format&fit=crop&w=800&q=80&sig=gallery_view2_571",
      "https://images.unsplash.com/photo-1512820790803-83ca734da794?auto=format&fit=crop&w=800&q=80&sig=gallery_view3_571"
    ],
    "countInStock": 12,
    "rating": 4.1,
    "numReviews": 45,
    "isFeatured": false,
    "description": "Brand: HarperCollins | High quality books product designed for durability and daily performance."
  },
  {
    "name": "Simon & Schuster Premium Books Model 12",
    "price": 500,
    "originalPrice": 600,
    "category": "Books",
    "image": "https://images.unsplash.com/photo-1512820790803-83ca734da794?auto=format&fit=crop&w=800&q=80&sig=prod_unique_572_books",
    "images": [
      "https://images.unsplash.com/photo-1512820790803-83ca734da794?auto=format&fit=crop&w=800&q=80&sig=prod_unique_572_books",
      "https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?auto=format&fit=crop&w=800&q=80&sig=gallery_view1_572",
      "https://images.unsplash.com/photo-1512820790803-83ca734da794?auto=format&fit=crop&w=800&q=80&sig=gallery_view2_572",
      "https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?auto=format&fit=crop&w=800&q=80&sig=gallery_view3_572"
    ],
    "countInStock": 14,
    "rating": 4.2,
    "numReviews": 50,
    "isFeatured": false,
    "description": "Brand: Simon & Schuster | High quality books product designed for durability and daily performance."
  },
  {
    "name": "O'Reilly Media Premium Books Model 13",
    "price": 500,
    "originalPrice": 600,
    "category": "Books",
    "image": "https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?auto=format&fit=crop&w=800&q=80&sig=prod_unique_573_books",
    "images": [
      "https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?auto=format&fit=crop&w=800&q=80&sig=prod_unique_573_books",
      "https://images.unsplash.com/photo-1512820790803-83ca734da794?auto=format&fit=crop&w=800&q=80&sig=gallery_view1_573",
      "https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?auto=format&fit=crop&w=800&q=80&sig=gallery_view2_573",
      "https://images.unsplash.com/photo-1512820790803-83ca734da794?auto=format&fit=crop&w=800&q=80&sig=gallery_view3_573"
    ],
    "countInStock": 16,
    "rating": 4.3,
    "numReviews": 55,
    "isFeatured": false,
    "description": "Brand: O'Reilly Media | High quality books product designed for durability and daily performance."
  },
  {
    "name": "Bloomsbury Premium Books Model 14",
    "price": 500,
    "originalPrice": 600,
    "category": "Books",
    "image": "https://images.unsplash.com/photo-1512820790803-83ca734da794?auto=format&fit=crop&w=800&q=80&sig=prod_unique_574_books",
    "images": [
      "https://images.unsplash.com/photo-1512820790803-83ca734da794?auto=format&fit=crop&w=800&q=80&sig=prod_unique_574_books",
      "https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?auto=format&fit=crop&w=800&q=80&sig=gallery_view1_574",
      "https://images.unsplash.com/photo-1512820790803-83ca734da794?auto=format&fit=crop&w=800&q=80&sig=gallery_view2_574",
      "https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?auto=format&fit=crop&w=800&q=80&sig=gallery_view3_574"
    ],
    "countInStock": 18,
    "rating": 4.4,
    "numReviews": 60,
    "isFeatured": false,
    "description": "Brand: Bloomsbury | High quality books product designed for durability and daily performance."
  },
  {
    "name": "Penguin Random House Premium Books Model 15",
    "price": 500,
    "originalPrice": 600,
    "category": "Books",
    "image": "https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?auto=format&fit=crop&w=800&q=80&sig=prod_unique_575_books",
    "images": [
      "https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?auto=format&fit=crop&w=800&q=80&sig=prod_unique_575_books",
      "https://images.unsplash.com/photo-1512820790803-83ca734da794?auto=format&fit=crop&w=800&q=80&sig=gallery_view1_575",
      "https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?auto=format&fit=crop&w=800&q=80&sig=gallery_view2_575",
      "https://images.unsplash.com/photo-1512820790803-83ca734da794?auto=format&fit=crop&w=800&q=80&sig=gallery_view3_575"
    ],
    "countInStock": 20,
    "rating": 4.5,
    "numReviews": 65,
    "isFeatured": true,
    "description": "Brand: Penguin Random House | High quality books product designed for durability and daily performance."
  },
  {
    "name": "HarperCollins Premium Books Model 16",
    "price": 500,
    "originalPrice": 600,
    "category": "Books",
    "image": "https://images.unsplash.com/photo-1512820790803-83ca734da794?auto=format&fit=crop&w=800&q=80&sig=prod_unique_576_books",
    "images": [
      "https://images.unsplash.com/photo-1512820790803-83ca734da794?auto=format&fit=crop&w=800&q=80&sig=prod_unique_576_books",
      "https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?auto=format&fit=crop&w=800&q=80&sig=gallery_view1_576",
      "https://images.unsplash.com/photo-1512820790803-83ca734da794?auto=format&fit=crop&w=800&q=80&sig=gallery_view2_576",
      "https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?auto=format&fit=crop&w=800&q=80&sig=gallery_view3_576"
    ],
    "countInStock": 22,
    "rating": 4.6,
    "numReviews": 70,
    "isFeatured": false,
    "description": "Brand: HarperCollins | High quality books product designed for durability and daily performance."
  },
  {
    "name": "Simon & Schuster Premium Books Model 17",
    "price": 500,
    "originalPrice": 600,
    "category": "Books",
    "image": "https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?auto=format&fit=crop&w=800&q=80&sig=prod_unique_577_books",
    "images": [
      "https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?auto=format&fit=crop&w=800&q=80&sig=prod_unique_577_books",
      "https://images.unsplash.com/photo-1512820790803-83ca734da794?auto=format&fit=crop&w=800&q=80&sig=gallery_view1_577",
      "https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?auto=format&fit=crop&w=800&q=80&sig=gallery_view2_577",
      "https://images.unsplash.com/photo-1512820790803-83ca734da794?auto=format&fit=crop&w=800&q=80&sig=gallery_view3_577"
    ],
    "countInStock": 24,
    "rating": 4.7,
    "numReviews": 75,
    "isFeatured": false,
    "description": "Brand: Simon & Schuster | High quality books product designed for durability and daily performance."
  },
  {
    "name": "O'Reilly Media Premium Books Model 18",
    "price": 500,
    "originalPrice": 600,
    "category": "Books",
    "image": "https://images.unsplash.com/photo-1512820790803-83ca734da794?auto=format&fit=crop&w=800&q=80&sig=prod_unique_578_books",
    "images": [
      "https://images.unsplash.com/photo-1512820790803-83ca734da794?auto=format&fit=crop&w=800&q=80&sig=prod_unique_578_books",
      "https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?auto=format&fit=crop&w=800&q=80&sig=gallery_view1_578",
      "https://images.unsplash.com/photo-1512820790803-83ca734da794?auto=format&fit=crop&w=800&q=80&sig=gallery_view2_578",
      "https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?auto=format&fit=crop&w=800&q=80&sig=gallery_view3_578"
    ],
    "countInStock": 26,
    "rating": 4.8,
    "numReviews": 80,
    "isFeatured": false,
    "description": "Brand: O'Reilly Media | High quality books product designed for durability and daily performance."
  },
  {
    "name": "Bloomsbury Premium Books Model 19",
    "price": 500,
    "originalPrice": 600,
    "category": "Books",
    "image": "https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?auto=format&fit=crop&w=800&q=80&sig=prod_unique_579_books",
    "images": [
      "https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?auto=format&fit=crop&w=800&q=80&sig=prod_unique_579_books",
      "https://images.unsplash.com/photo-1512820790803-83ca734da794?auto=format&fit=crop&w=800&q=80&sig=gallery_view1_579",
      "https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?auto=format&fit=crop&w=800&q=80&sig=gallery_view2_579",
      "https://images.unsplash.com/photo-1512820790803-83ca734da794?auto=format&fit=crop&w=800&q=80&sig=gallery_view3_579"
    ],
    "countInStock": 28,
    "rating": 4.9,
    "numReviews": 85,
    "isFeatured": false,
    "description": "Brand: Bloomsbury | High quality books product designed for durability and daily performance."
  },
  {
    "name": "Penguin Random House Premium Books Model 20",
    "price": 500,
    "originalPrice": 600,
    "category": "Books",
    "image": "https://images.unsplash.com/photo-1512820790803-83ca734da794?auto=format&fit=crop&w=800&q=80&sig=prod_unique_580_books",
    "images": [
      "https://images.unsplash.com/photo-1512820790803-83ca734da794?auto=format&fit=crop&w=800&q=80&sig=prod_unique_580_books",
      "https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?auto=format&fit=crop&w=800&q=80&sig=gallery_view1_580",
      "https://images.unsplash.com/photo-1512820790803-83ca734da794?auto=format&fit=crop&w=800&q=80&sig=gallery_view2_580",
      "https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?auto=format&fit=crop&w=800&q=80&sig=gallery_view3_580"
    ],
    "countInStock": 30,
    "rating": 4,
    "numReviews": 90,
    "isFeatured": true,
    "description": "Brand: Penguin Random House | High quality books product designed for durability and daily performance."
  },
  {
    "name": "HarperCollins Premium Books Model 21",
    "price": 500,
    "originalPrice": 600,
    "category": "Books",
    "image": "https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?auto=format&fit=crop&w=800&q=80&sig=prod_unique_581_books",
    "images": [
      "https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?auto=format&fit=crop&w=800&q=80&sig=prod_unique_581_books",
      "https://images.unsplash.com/photo-1512820790803-83ca734da794?auto=format&fit=crop&w=800&q=80&sig=gallery_view1_581",
      "https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?auto=format&fit=crop&w=800&q=80&sig=gallery_view2_581",
      "https://images.unsplash.com/photo-1512820790803-83ca734da794?auto=format&fit=crop&w=800&q=80&sig=gallery_view3_581"
    ],
    "countInStock": 32,
    "rating": 4.1,
    "numReviews": 95,
    "isFeatured": false,
    "description": "Brand: HarperCollins | High quality books product designed for durability and daily performance."
  },
  {
    "name": "Simon & Schuster Premium Books Model 22",
    "price": 500,
    "originalPrice": 600,
    "category": "Books",
    "image": "https://images.unsplash.com/photo-1512820790803-83ca734da794?auto=format&fit=crop&w=800&q=80&sig=prod_unique_582_books",
    "images": [
      "https://images.unsplash.com/photo-1512820790803-83ca734da794?auto=format&fit=crop&w=800&q=80&sig=prod_unique_582_books",
      "https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?auto=format&fit=crop&w=800&q=80&sig=gallery_view1_582",
      "https://images.unsplash.com/photo-1512820790803-83ca734da794?auto=format&fit=crop&w=800&q=80&sig=gallery_view2_582",
      "https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?auto=format&fit=crop&w=800&q=80&sig=gallery_view3_582"
    ],
    "countInStock": 34,
    "rating": 4.2,
    "numReviews": 100,
    "isFeatured": false,
    "description": "Brand: Simon & Schuster | High quality books product designed for durability and daily performance."
  },
  {
    "name": "O'Reilly Media Premium Books Model 23",
    "price": 500,
    "originalPrice": 600,
    "category": "Books",
    "image": "https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?auto=format&fit=crop&w=800&q=80&sig=prod_unique_583_books",
    "images": [
      "https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?auto=format&fit=crop&w=800&q=80&sig=prod_unique_583_books",
      "https://images.unsplash.com/photo-1512820790803-83ca734da794?auto=format&fit=crop&w=800&q=80&sig=gallery_view1_583",
      "https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?auto=format&fit=crop&w=800&q=80&sig=gallery_view2_583",
      "https://images.unsplash.com/photo-1512820790803-83ca734da794?auto=format&fit=crop&w=800&q=80&sig=gallery_view3_583"
    ],
    "countInStock": 36,
    "rating": 4.3,
    "numReviews": 105,
    "isFeatured": false,
    "description": "Brand: O'Reilly Media | High quality books product designed for durability and daily performance."
  },
  {
    "name": "Bloomsbury Premium Books Model 24",
    "price": 500,
    "originalPrice": 600,
    "category": "Books",
    "image": "https://images.unsplash.com/photo-1512820790803-83ca734da794?auto=format&fit=crop&w=800&q=80&sig=prod_unique_584_books",
    "images": [
      "https://images.unsplash.com/photo-1512820790803-83ca734da794?auto=format&fit=crop&w=800&q=80&sig=prod_unique_584_books",
      "https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?auto=format&fit=crop&w=800&q=80&sig=gallery_view1_584",
      "https://images.unsplash.com/photo-1512820790803-83ca734da794?auto=format&fit=crop&w=800&q=80&sig=gallery_view2_584",
      "https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?auto=format&fit=crop&w=800&q=80&sig=gallery_view3_584"
    ],
    "countInStock": 38,
    "rating": 4.4,
    "numReviews": 110,
    "isFeatured": false,
    "description": "Brand: Bloomsbury | High quality books product designed for durability and daily performance."
  },
  {
    "name": "Penguin Random House Premium Books Model 25",
    "price": 500,
    "originalPrice": 600,
    "category": "Books",
    "image": "https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?auto=format&fit=crop&w=800&q=80&sig=prod_unique_585_books",
    "images": [
      "https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?auto=format&fit=crop&w=800&q=80&sig=prod_unique_585_books",
      "https://images.unsplash.com/photo-1512820790803-83ca734da794?auto=format&fit=crop&w=800&q=80&sig=gallery_view1_585",
      "https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?auto=format&fit=crop&w=800&q=80&sig=gallery_view2_585",
      "https://images.unsplash.com/photo-1512820790803-83ca734da794?auto=format&fit=crop&w=800&q=80&sig=gallery_view3_585"
    ],
    "countInStock": 40,
    "rating": 4.5,
    "numReviews": 115,
    "isFeatured": true,
    "description": "Brand: Penguin Random House | High quality books product designed for durability and daily performance."
  },
  {
    "name": "HarperCollins Premium Books Model 26",
    "price": 500,
    "originalPrice": 600,
    "category": "Books",
    "image": "https://images.unsplash.com/photo-1512820790803-83ca734da794?auto=format&fit=crop&w=800&q=80&sig=prod_unique_586_books",
    "images": [
      "https://images.unsplash.com/photo-1512820790803-83ca734da794?auto=format&fit=crop&w=800&q=80&sig=prod_unique_586_books",
      "https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?auto=format&fit=crop&w=800&q=80&sig=gallery_view1_586",
      "https://images.unsplash.com/photo-1512820790803-83ca734da794?auto=format&fit=crop&w=800&q=80&sig=gallery_view2_586",
      "https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?auto=format&fit=crop&w=800&q=80&sig=gallery_view3_586"
    ],
    "countInStock": 42,
    "rating": 4.6,
    "numReviews": 120,
    "isFeatured": false,
    "description": "Brand: HarperCollins | High quality books product designed for durability and daily performance."
  },
  {
    "name": "Simon & Schuster Premium Books Model 27",
    "price": 500,
    "originalPrice": 600,
    "category": "Books",
    "image": "https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?auto=format&fit=crop&w=800&q=80&sig=prod_unique_587_books",
    "images": [
      "https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?auto=format&fit=crop&w=800&q=80&sig=prod_unique_587_books",
      "https://images.unsplash.com/photo-1512820790803-83ca734da794?auto=format&fit=crop&w=800&q=80&sig=gallery_view1_587",
      "https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?auto=format&fit=crop&w=800&q=80&sig=gallery_view2_587",
      "https://images.unsplash.com/photo-1512820790803-83ca734da794?auto=format&fit=crop&w=800&q=80&sig=gallery_view3_587"
    ],
    "countInStock": 44,
    "rating": 4.7,
    "numReviews": 125,
    "isFeatured": false,
    "description": "Brand: Simon & Schuster | High quality books product designed for durability and daily performance."
  },
  {
    "name": "O'Reilly Media Premium Books Model 28",
    "price": 500,
    "originalPrice": 600,
    "category": "Books",
    "image": "https://images.unsplash.com/photo-1512820790803-83ca734da794?auto=format&fit=crop&w=800&q=80&sig=prod_unique_588_books",
    "images": [
      "https://images.unsplash.com/photo-1512820790803-83ca734da794?auto=format&fit=crop&w=800&q=80&sig=prod_unique_588_books",
      "https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?auto=format&fit=crop&w=800&q=80&sig=gallery_view1_588",
      "https://images.unsplash.com/photo-1512820790803-83ca734da794?auto=format&fit=crop&w=800&q=80&sig=gallery_view2_588",
      "https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?auto=format&fit=crop&w=800&q=80&sig=gallery_view3_588"
    ],
    "countInStock": 46,
    "rating": 4.8,
    "numReviews": 130,
    "isFeatured": false,
    "description": "Brand: O'Reilly Media | High quality books product designed for durability and daily performance."
  },
  {
    "name": "Bloomsbury Premium Books Model 29",
    "price": 500,
    "originalPrice": 600,
    "category": "Books",
    "image": "https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?auto=format&fit=crop&w=800&q=80&sig=prod_unique_589_books",
    "images": [
      "https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?auto=format&fit=crop&w=800&q=80&sig=prod_unique_589_books",
      "https://images.unsplash.com/photo-1512820790803-83ca734da794?auto=format&fit=crop&w=800&q=80&sig=gallery_view1_589",
      "https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?auto=format&fit=crop&w=800&q=80&sig=gallery_view2_589",
      "https://images.unsplash.com/photo-1512820790803-83ca734da794?auto=format&fit=crop&w=800&q=80&sig=gallery_view3_589"
    ],
    "countInStock": 48,
    "rating": 4.9,
    "numReviews": 135,
    "isFeatured": false,
    "description": "Brand: Bloomsbury | High quality books product designed for durability and daily performance."
  },
  {
    "name": "Penguin Random House Premium Books Model 30",
    "price": 500,
    "originalPrice": 600,
    "category": "Books",
    "image": "https://images.unsplash.com/photo-1512820790803-83ca734da794?auto=format&fit=crop&w=800&q=80&sig=prod_unique_590_books",
    "images": [
      "https://images.unsplash.com/photo-1512820790803-83ca734da794?auto=format&fit=crop&w=800&q=80&sig=prod_unique_590_books",
      "https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?auto=format&fit=crop&w=800&q=80&sig=gallery_view1_590",
      "https://images.unsplash.com/photo-1512820790803-83ca734da794?auto=format&fit=crop&w=800&q=80&sig=gallery_view2_590",
      "https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?auto=format&fit=crop&w=800&q=80&sig=gallery_view3_590"
    ],
    "countInStock": 50,
    "rating": 4,
    "numReviews": 140,
    "isFeatured": true,
    "description": "Brand: Penguin Random House | High quality books product designed for durability and daily performance."
  },
  {
    "name": "HarperCollins Premium Books Model 31",
    "price": 500,
    "originalPrice": 600,
    "category": "Books",
    "image": "https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?auto=format&fit=crop&w=800&q=80&sig=prod_unique_591_books",
    "images": [
      "https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?auto=format&fit=crop&w=800&q=80&sig=prod_unique_591_books",
      "https://images.unsplash.com/photo-1512820790803-83ca734da794?auto=format&fit=crop&w=800&q=80&sig=gallery_view1_591",
      "https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?auto=format&fit=crop&w=800&q=80&sig=gallery_view2_591",
      "https://images.unsplash.com/photo-1512820790803-83ca734da794?auto=format&fit=crop&w=800&q=80&sig=gallery_view3_591"
    ],
    "countInStock": 52,
    "rating": 4.1,
    "numReviews": 145,
    "isFeatured": false,
    "description": "Brand: HarperCollins | High quality books product designed for durability and daily performance."
  },
  {
    "name": "Simon & Schuster Premium Books Model 32",
    "price": 500,
    "originalPrice": 600,
    "category": "Books",
    "image": "https://images.unsplash.com/photo-1512820790803-83ca734da794?auto=format&fit=crop&w=800&q=80&sig=prod_unique_592_books",
    "images": [
      "https://images.unsplash.com/photo-1512820790803-83ca734da794?auto=format&fit=crop&w=800&q=80&sig=prod_unique_592_books",
      "https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?auto=format&fit=crop&w=800&q=80&sig=gallery_view1_592",
      "https://images.unsplash.com/photo-1512820790803-83ca734da794?auto=format&fit=crop&w=800&q=80&sig=gallery_view2_592",
      "https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?auto=format&fit=crop&w=800&q=80&sig=gallery_view3_592"
    ],
    "countInStock": 54,
    "rating": 4.2,
    "numReviews": 150,
    "isFeatured": false,
    "description": "Brand: Simon & Schuster | High quality books product designed for durability and daily performance."
  },
  {
    "name": "O'Reilly Media Premium Books Model 33",
    "price": 500,
    "originalPrice": 600,
    "category": "Books",
    "image": "https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?auto=format&fit=crop&w=800&q=80&sig=prod_unique_593_books",
    "images": [
      "https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?auto=format&fit=crop&w=800&q=80&sig=prod_unique_593_books",
      "https://images.unsplash.com/photo-1512820790803-83ca734da794?auto=format&fit=crop&w=800&q=80&sig=gallery_view1_593",
      "https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?auto=format&fit=crop&w=800&q=80&sig=gallery_view2_593",
      "https://images.unsplash.com/photo-1512820790803-83ca734da794?auto=format&fit=crop&w=800&q=80&sig=gallery_view3_593"
    ],
    "countInStock": 56,
    "rating": 4.3,
    "numReviews": 155,
    "isFeatured": false,
    "description": "Brand: O'Reilly Media | High quality books product designed for durability and daily performance."
  },
  {
    "name": "Bloomsbury Premium Books Model 34",
    "price": 500,
    "originalPrice": 600,
    "category": "Books",
    "image": "https://images.unsplash.com/photo-1512820790803-83ca734da794?auto=format&fit=crop&w=800&q=80&sig=prod_unique_594_books",
    "images": [
      "https://images.unsplash.com/photo-1512820790803-83ca734da794?auto=format&fit=crop&w=800&q=80&sig=prod_unique_594_books",
      "https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?auto=format&fit=crop&w=800&q=80&sig=gallery_view1_594",
      "https://images.unsplash.com/photo-1512820790803-83ca734da794?auto=format&fit=crop&w=800&q=80&sig=gallery_view2_594",
      "https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?auto=format&fit=crop&w=800&q=80&sig=gallery_view3_594"
    ],
    "countInStock": 58,
    "rating": 4.4,
    "numReviews": 160,
    "isFeatured": false,
    "description": "Brand: Bloomsbury | High quality books product designed for durability and daily performance."
  },
  {
    "name": "Penguin Random House Premium Books Model 35",
    "price": 500,
    "originalPrice": 600,
    "category": "Books",
    "image": "https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?auto=format&fit=crop&w=800&q=80&sig=prod_unique_595_books",
    "images": [
      "https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?auto=format&fit=crop&w=800&q=80&sig=prod_unique_595_books",
      "https://images.unsplash.com/photo-1512820790803-83ca734da794?auto=format&fit=crop&w=800&q=80&sig=gallery_view1_595",
      "https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?auto=format&fit=crop&w=800&q=80&sig=gallery_view2_595",
      "https://images.unsplash.com/photo-1512820790803-83ca734da794?auto=format&fit=crop&w=800&q=80&sig=gallery_view3_595"
    ],
    "countInStock": 60,
    "rating": 4.5,
    "numReviews": 165,
    "isFeatured": true,
    "description": "Brand: Penguin Random House | High quality books product designed for durability and daily performance."
  }
];

const autoSeed = async () => {
  try {
    const count = await Product.countDocuments();
    if (count < 500) {
      console.log(`Product database contains ${count} products. Seeding comprehensive 595+ item catalog...`);
      await Product.deleteMany({});
      await Product.insertMany(sampleProducts);
      console.log('Seeding 595+ unique products completed successfully!');
    } else {
      console.log(`Product database contains ${count} products. Skipping auto-seed.`);
    }
  } catch (error) {
    console.error('Error during auto-seeding:', error.message);
  }
};

module.exports = autoSeed;
