import { createSlice, PayloadAction } from "@reduxjs/toolkit";

type CartItem = {
  id: number;
  name: string;
  title: string;
  price: number;
  image: string;
  description: string;
  quantity: number;
};

interface CartState {
  items: CartItem[];
}

const initialState: CartState = {
  items: [],
};

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addToCart: (state: any, action: PayloadAction<CartItem>) => {
      state.items.push(action.payload);
    },
    resetCart: (state: any, action: PayloadAction<CartItem>) => {
      state.items = [];
    }

  },
});

export const { addToCart, resetCart } = cartSlice.actions;
export default cartSlice.reducer;
