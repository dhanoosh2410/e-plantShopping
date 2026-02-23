import { createSlice } from '@reduxjs/toolkit';

export const CartSlice = createSlice({
  name: 'cart',
  initialState: {
    items: [], // { name, image, description, cost, quantity }
  },
  reducers: {
    addItem: (state, action) => {
      const product = action.payload;
      if (!product || !product.name) return;

      const existing = state.items.find((i) => i.name === product.name);
      const cost = typeof product.cost === 'string'
        ? Number(String(product.cost).replace('$', ''))
        : Number(product.cost);

      if (existing) {
        existing.quantity = (existing.quantity ?? 1) + 1;
      } else {
        state.items.push({
          ...product,
          cost: Number.isFinite(cost) ? cost : 0,
          quantity: 1,
        });
      }
    },

    removeItem: (state, action) => {
      const payload = action.payload;
      const name = typeof payload === 'string' ? payload : payload?.name;
      if (!name) return;
      state.items = state.items.filter((i) => i.name !== name);
    },

    updateQuantity: (state, action) => {
      const payload = action.payload;
      if (!payload) return;

      const name = payload.name ?? payload.productName ?? payload.id;
      if (!name) return;

      const item = state.items.find((i) => i.name === name);
      if (!item) return;

      if (payload.delta !== undefined) {
        item.quantity = (item.quantity ?? 1) + Number(payload.delta);
      } else if (payload.quantity !== undefined) {
        item.quantity = Number(payload.quantity);
      }

      if (!item.quantity || item.quantity <= 0) {
        state.items = state.items.filter((i) => i.name !== name);
      }
    },
  },
});

export const { addItem, removeItem, updateQuantity } = CartSlice.actions;
export default CartSlice.reducer;
