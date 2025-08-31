import { createSlice } from "@reduxjs/toolkit";
import { chageOrderStatusAdminApi, getAllOrderAdminApi, getAllOrderApi, newOrderApi } from "../apiMiddleware/orderMiddleware";

const initialState = {
  isLoading: false,
  error: null,
};

const orderSlicer = createSlice({
  name: "order",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder

      // new order api
      .addCase(newOrderApi.pending, (state) => {
        state.isLoading = true;
        state.error = true;
      })
      .addCase(newOrderApi.fulfilled, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      })
      .addCase(newOrderApi.rejected, (state) => {
        state.error = true;
      })
      // get all order api
      .addCase(getAllOrderApi.pending, (state) => {
        state.isLoading = true;
        state.error = true;
      })
      .addCase(getAllOrderApi.fulfilled, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      })
      .addCase(getAllOrderApi.rejected, (state) => {
        state.error = true;
      })
       // get all order for admin api
      .addCase(getAllOrderAdminApi.pending, (state) => {
        state.isLoading = true;
        state.error = true;
      })
      .addCase(getAllOrderAdminApi.fulfilled, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      })
      .addCase(getAllOrderAdminApi.rejected, (state) => {
        state.error = true;
      })
        // change order status for admin api
      .addCase(chageOrderStatusAdminApi.pending, (state) => {
        state.isLoading = true;
        state.error = true;
      })
      .addCase(chageOrderStatusAdminApi.fulfilled, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      })
      .addCase(chageOrderStatusAdminApi.rejected, (state) => {
        state.error = true;
      });;
  },
});
export const orderReducer = orderSlicer.reducer;
