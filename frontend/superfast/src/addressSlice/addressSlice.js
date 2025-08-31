import { createSlice } from "@reduxjs/toolkit";
import {
  addNewAddressApi,
  deleteAddressApi,
  getAllAddressApi,
  updateAddressApi,
} from "../apiMiddleware/addressMiddleware";

const initialState = {
  isLoading: false,
  addresses: [],
};

const addressSlicer = createSlice({
  name: "address",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    //add Address api
    builder
      .addCase(addNewAddressApi.pending, (state, action) => {
        state.isLoading = true;
      })
      .addCase(addNewAddressApi.fulfilled, (state, action) => {
        state.isLoading = false;
        state.addresses = action.payload;
      })
      .addCase(addNewAddressApi.rejected, (state, action) => {
        state.isLoading = true;
      })

      //get All Address api

      .addCase(getAllAddressApi.pending, (state, action) => {
        state.isLoading = true;
      })
      .addCase(getAllAddressApi.fulfilled, (state, action) => {
        state.isLoading = false;
        state.addresses = action.payload;
      })
      .addCase(getAllAddressApi.rejected, (state, action) => {
        state.isLoading = true;
      })
      //get All Address api

      .addCase(deleteAddressApi.pending, (state, action) => {
        state.isLoading = true;
      })
      .addCase(deleteAddressApi.fulfilled, (state, action) => {
        state.isLoading = false;
        state.addresses = action.payload;
      })
      .addCase(deleteAddressApi.rejected, (state, action) => {
        state.isLoading = true;
      })
      //update Address api

      .addCase(updateAddressApi.pending, (state, action) => {
        state.isLoading = true;
      })
      .addCase(updateAddressApi.fulfilled, (state, action) => {
        state.isLoading = false;
        state.addresses = action.payload;
      })
      .addCase(updateAddressApi.rejected, (state, action) => {
        state.isLoading = true;
      });
  },
});
export const addressReducer = addressSlicer.reducer;
