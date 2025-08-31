import { createSlice } from "@reduxjs/toolkit";

import {
  addproductApi,
  deleteProductApi,
  getAllProductApi,
  getProductByIdApi,
  updateProductApi,
} from "../apiMiddleware/productMiddleware";

const initialState = {
  name: null,
  images: null,
  unit: null,
  price: null,
  discount: null,
  description: null,
  moreDetails: null,
  product: [],
  isError: false,
  isLoading: false,
  selectedproduct: null,
};

const productSlice = createSlice({
  name: "product",
  initialState,
  reducers: {
    filterProduct: (state, action) => {
      const { productId } = action.payload;
      const findProduct = state.product.find((pro) => pro._id === productId);

      state.selectedproduct = findProduct || null;
      
      
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(addproductApi.pending, (state) => {
        state.isLoading = true;
        state.isError = false;
      })
      .addCase(addproductApi.fulfilled, (state, action) => {
        state.product = action.payload;
        state.isLoading = false;
        state.isError = false;
      })
      .addCase(addproductApi.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
      })
      .addCase(getAllProductApi.pending, (state) => {
        state.isLoading = true;
        state.isError = false;
      })
      .addCase(getAllProductApi.fulfilled, (state, action) => {
        state.product = action.payload.product;
        state.isLoading = false;
        state.isError = false;
      })
      .addCase(getAllProductApi.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
      })

      .addCase(getProductByIdApi.pending, (state) => {
        state.isLoading = true;
        state.isError = false;
      })
      .addCase(getProductByIdApi.fulfilled, (state, action) => {
        state.product = action.payload.product;
        state.isLoading = false;
        state.isError = false;
      })
      .addCase(getProductByIdApi.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
      })
      .addCase(deleteProductApi.pending, (state) => {
        state.isLoading = true;
        state.isError = false;
      })
      .addCase(deleteProductApi.fulfilled, (state, action) => {
        state.product = action.payload;
        state.isLoading = false;
        state.isError = false;
      })
      .addCase(deleteProductApi.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
      })
       .addCase(updateProductApi.pending, (state) => {
        state.isLoading = true;
        state.isError = false;
      })
      .addCase(updateProductApi.fulfilled, (state, action) => {
        state.product = action.payload;
        state.isLoading = false;
        state.isError = false;
      })
      .addCase(updateProductApi.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
      })
      ;
  },
});
export const { filterProduct } = productSlice.actions;
export const productreducer = productSlice.reducer;
