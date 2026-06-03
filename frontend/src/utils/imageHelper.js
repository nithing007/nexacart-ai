export const getFallbackImage = (category, name) => {
  const normalizedCategory = (category || '').toLowerCase();
  const normalizedName = (name || '').toLowerCase();
  
  if (normalizedCategory.includes('elect') || normalizedCategory.includes('gadget') || normalizedCategory.includes('tech')) {
    if (normalizedName.includes('phone') || normalizedName.includes('mobile') || normalizedName.includes('iphone') || normalizedName.includes('samsung')) {
      return 'https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?auto=format&fit=crop&w=500&q=80'; // Phone
    }
    if (normalizedName.includes('headphone') || normalizedName.includes('earbud') || normalizedName.includes('audio') || normalizedName.includes('sony')) {
      return 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?auto=format&fit=crop&w=500&q=80'; // Headphone
    }
    if (normalizedName.includes('ipad') || normalizedName.includes('tablet')) {
      return 'https://images.unsplash.com/photo-1544244015-0df4b3ffc6b0?auto=format&fit=crop&w=500&q=80'; // Tablet
    }
    return 'https://images.unsplash.com/photo-1496181130204-755241544e3f?auto=format&fit=crop&w=500&q=80'; // Laptop/General Tech
  }
  
  if (normalizedCategory.includes('fash') || normalizedCategory.includes('cloth') || normalizedCategory.includes('shoe') || normalizedCategory.includes('apparel')) {
    if (normalizedName.includes('shoe') || normalizedName.includes('sneaker') || normalizedName.includes('nike')) {
      return 'https://images.unsplash.com/photo-1542291026-7eec264c27ff?auto=format&fit=crop&w=500&q=80'; // Sneakers
    }
    if (normalizedName.includes('backpack') || normalizedName.includes('bag') || normalizedName.includes('leather')) {
      return 'https://images.unsplash.com/photo-1553062407-98eeb64c6a62?auto=format&fit=crop&w=500&q=80'; // Backpack
    }
    if (normalizedName.includes('jacket') || normalizedName.includes('windbreaker') || normalizedName.includes('coat')) {
      return 'https://images.unsplash.com/photo-1548883354-7622d03aca27?auto=format&fit=crop&w=500&q=80'; // Jacket
    }
    return 'https://images.unsplash.com/photo-1521572267360-ee0c2909d518?auto=format&fit=crop&w=500&q=80'; // General Fashion
  }
  
  if (normalizedCategory.includes('groc') || normalizedCategory.includes('food') || normalizedCategory.includes('organic') || normalizedCategory.includes('beverage')) {
    if (normalizedName.includes('avocado')) {
      return 'https://images.unsplash.com/photo-1523049673857-eb18f1d7b578?auto=format&fit=crop&w=500&q=80'; // Avocado
    }
    if (normalizedName.includes('blueberry') || normalizedName.includes('blueberries') || normalizedName.includes('berry')) {
      return 'https://images.unsplash.com/photo-1498557850523-fd3d118b962e?auto=format&fit=crop&w=500&q=80'; // Blueberry
    }
    if (normalizedName.includes('almond') || normalizedName.includes('milk') || normalizedName.includes('dairy')) {
      return 'https://images.unsplash.com/photo-1556881286-fc6915169721?auto=format&fit=crop&w=500&q=80'; // Almond Milk
    }
    return 'https://images.unsplash.com/photo-1560806887-1e4cd0b6cbd6?auto=format&fit=crop&w=500&q=80'; // General Grocery (Apples)
  }
  
  if (normalizedCategory.includes('home') || normalizedCategory.includes('office') || normalizedCategory.includes('furniture') || normalizedCategory.includes('decor')) {
    if (normalizedName.includes('chair') || normalizedName.includes('furniture')) {
      return 'https://images.unsplash.com/photo-1567538096630-e0c55bd6374c?auto=format&fit=crop&w=500&q=80'; // Chair
    }
    if (normalizedName.includes('lamp') || normalizedName.includes('led') || normalizedName.includes('light')) {
      return 'https://images.unsplash.com/photo-1507473885765-e6ed057f782c?auto=format&fit=crop&w=500&q=80'; // Lamp
    }
    if (normalizedName.includes('bottle') || normalizedName.includes('flask')) {
      return 'https://images.unsplash.com/photo-1602143407151-7111542de6e8?auto=format&fit=crop&w=500&q=80'; // Water Bottle
    }
    return 'https://images.unsplash.com/photo-1517256064527-09c53b2d0bc6?auto=format&fit=crop&w=500&q=80'; // General Office (Coffee Maker)
  }

  // Default fallback (Premium watch image)
  return 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?auto=format&fit=crop&w=500&q=80';
};
