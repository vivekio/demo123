import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";

// Define the Product type
interface Product {
  id: number;
  title: string;
  image: string;
  description: string;
  price: number;
  category: string;
  rating: {
    rate: number;
    count: number;
  };
}

// Define the state type
interface ProductState {
  product: Product | null;
  loading: boolean;
  error: string | null;
}

// Initial state
const initialState: ProductState = {
  product: null,
  loading: false,
  error: null,
};

// Async thunk for fetching product data
export const fetchProduct = createAsyncThunk<Product, string, { rejectValue: string }>(
  "product/fetchProduct",
  async (id, { rejectWithValue }) => {
    try {
      const response = await fetch(`https://fakestoreapi.com/products/${id}`);
      if (!response.ok) throw new Error("Failed to fetch product");
      return (await response.json()) as Product;
    } catch (error: any) {
      return rejectWithValue(error.message);
    }
  }
);

// Create the slice
const productDetailSlice = createSlice({
  name: "product",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchProduct.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchProduct.fulfilled, (state, action: PayloadAction<Product>) => {
        state.loading = false;
        state.product = action.payload;
      })
      .addCase(fetchProduct.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || "An error occurred";
      });
  },
});

export default productDetailSlice.reducer;
