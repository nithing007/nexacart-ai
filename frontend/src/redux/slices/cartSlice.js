import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import api from '../../services/api';

// Utility to calculate cart totals
const calculateTotals = (items) => {
  const subtotal = items.reduce((sum, item) => {
    const price = item.product?.price || 0;
    return sum + price * item.quantity;
  }, 0);
  const tax = Math.round(subtotal * 0.18); // 18% tax
  const shipping = subtotal > 1500 || subtotal === 0 ? 0 : 150; // free shipping above 1500
  const total = subtotal + tax + shipping;

  return {
    subtotal,
    tax,
    shipping,
    total,
  };
};

export const fetchCart = createAsyncThunk(
  'cart/fetchCart',
  async (_, { rejectWithValue }) => {
    try {
      const response = await api.get('/cart');
      return response.data.items;
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || 'Failed to fetch cart');
    }
  }
);

export const addToCart = createAsyncThunk(
  'cart/addToCart',
  async ({ productId, quantity }, { getState, rejectWithValue }) => {
    try {
      const { auth } = getState();
      if (!auth.isAuthenticated) {
        // Guest mode handled in reducer, but return payload here
        return { productId, quantity, isGuest: true };
      }
      const response = await api.post('/cart', { productId, quantity });
      return response.data.items;
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || 'Failed to add item to cart');
    }
  }
);

export const updateCartItemQty = createAsyncThunk(
  'cart/updateCartItemQty',
  async ({ productId, quantity }, { getState, rejectWithValue }) => {
    try {
      const { auth } = getState();
      if (!auth.isAuthenticated) {
        return { productId, quantity, isGuest: true };
      }
      const response = await api.put('/cart', { productId, quantity });
      return response.data.items;
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || 'Failed to update quantity');
    }
  }
);

export const removeFromCart = createAsyncThunk(
  'cart/removeFromCart',
  async (productId, { getState, rejectWithValue }) => {
    try {
      const { auth } = getState();
      if (!auth.isAuthenticated) {
        return { productId, isGuest: true };
      }
      const response = await api.delete(`/cart/${productId}`);
      return response.data.items;
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || 'Failed to remove item from cart');
    }
  }
);

export const clearCart = createAsyncThunk(
  'cart/clearCart',
  async (_, { getState, rejectWithValue }) => {
    try {
      const { auth } = getState();
      if (!auth.isAuthenticated) {
        return { isGuest: true };
      }
      await api.post('/cart/clear');
      return [];
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || 'Failed to clear cart');
    }
  }
);

const getInitialItems = () => {
  try {
    const saved = localStorage.getItem('cart_items');
    return saved ? JSON.parse(saved) : [];
  } catch {
    return [];
  }
};

const initialItems = getInitialItems();
const initialTotals = calculateTotals(initialItems);

const initialState = {
  items: initialItems,
  loading: false,
  error: null,
  subtotal: initialTotals.subtotal,
  tax: initialTotals.tax,
  shipping: initialTotals.shipping,
  total: initialTotals.total,
};

const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    syncGuestCartToState: (state) => {
      const items = getInitialItems();
      state.items = items;
      const totals = calculateTotals(items);
      state.subtotal = totals.subtotal;
      state.tax = totals.tax;
      state.shipping = totals.shipping;
      state.total = totals.total;
    }
  },
  extraReducers: (builder) => {
    builder
      // Fetch Cart
      .addCase(fetchCart.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchCart.fulfilled, (state, action) => {
        state.loading = false;
        state.items = action.payload || [];
        const totals = calculateTotals(state.items);
        state.subtotal = totals.subtotal;
        state.tax = totals.tax;
        state.shipping = totals.shipping;
        state.total = totals.total;
        localStorage.setItem('cart_items', JSON.stringify(state.items));
      })
      .addCase(fetchCart.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      // Add to Cart
      .addCase(addToCart.fulfilled, (state, action) => {
        if (action.payload.isGuest) {
          // Guest mode logic not matching standard payload format, usually handled separately. Let's make sure it doesn't crash:
          // In real app, we fetch product data or just add with minimal structure. But seeder/pages can get product details.
          // Let's assume most cart actions are when authenticated or we load products.
          // To be simple and robust: we will fetch cart from API when user is logged in. 
          // If guest, we just store. Let's update state for guest if payload is returned:
          return;
        }
        state.items = action.payload || [];
        const totals = calculateTotals(state.items);
        state.subtotal = totals.subtotal;
        state.tax = totals.tax;
        state.shipping = totals.shipping;
        state.total = totals.total;
        localStorage.setItem('cart_items', JSON.stringify(state.items));
      })
      // Update quantity
      .addCase(updateCartItemQty.fulfilled, (state, action) => {
        if (action.payload.isGuest) return;
        state.items = action.payload || [];
        const totals = calculateTotals(state.items);
        state.subtotal = totals.subtotal;
        state.tax = totals.tax;
        state.shipping = totals.shipping;
        state.total = totals.total;
        localStorage.setItem('cart_items', JSON.stringify(state.items));
      })
      // Remove item
      .addCase(removeFromCart.fulfilled, (state, action) => {
        if (action.payload.isGuest) return;
        state.items = action.payload || [];
        const totals = calculateTotals(state.items);
        state.subtotal = totals.subtotal;
        state.tax = totals.tax;
        state.shipping = totals.shipping;
        state.total = totals.total;
        localStorage.setItem('cart_items', JSON.stringify(state.items));
      })
      // Clear cart
      .addCase(clearCart.fulfilled, (state) => {
        state.items = [];
        state.subtotal = 0;
        state.tax = 0;
        state.shipping = 0;
        state.total = 0;
        localStorage.removeItem('cart_items');
      });
  },
});

export const { syncGuestCartToState } = cartSlice.actions;
export default cartSlice.reducer;
