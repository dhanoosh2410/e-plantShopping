import { createSlice } from '@reduxjs/toolkit';

export const CartSlice = createSlice({
  name: 'cart',
  initialState: {
    items: [], // { name, image, description, cost: "$15", quantity }
  },
  reducers: {
    // Called from ProductList.jsx when user clicks Add to Cart
    addItem: (state, action) => {
      const product = action.payload;
      if (!product || !product.name) return;

      const existing = state.items.find((i) => i.name === product.name);

      if (existing) {
        existing.quantity = (existing.quantity || 1) + 1;
      } else {
        state.items.push({
          ...product,
          quantity: 1,
        });
      }
    },

    // Removes item by name (called from CartItem.jsx Delete / when qty drops to 0)
    removeItem: (state, action) => {
      const payload = action.payload;
      const name = typeof payload === 'string' ? payload : payload?.name;
      if (!name) return;

      state.items = state.items.filter((i) => i.name !== name);
    },

    // Updates quantity to a NEW amount (payload: { name, amount })
    updateQuantity: (state, action) => {
      const { name, amount } = action.payload || {};
      if (!name) return;

      const item = state.items.find((i) => i.name === name);
      if (!item) return;

      item.quantity = Number(amount);

      // If quantity becomes 0 or less, remove item
      if (!item.quantity || item.quantity <= 0) {
        state.items = state.items.filter((i) => i.name !== name);
      }
    },
  },
});

export const { addItem, removeItem, updateQuantity } = CartSlice.actions;

export default CartSlice.reducer;
