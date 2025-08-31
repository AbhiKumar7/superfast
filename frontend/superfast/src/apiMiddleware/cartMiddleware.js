import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const addToCartApi = createAsyncThunk(
  "cart/addToCartApi",
  async ({ productId, quantity }, { rejectWithValue }) => {
    try {
      const response = await axios.post(
        `/cartapi/addtocart/${productId}`,
        { quantity }, // send productId in body
        {
          withCredentials: true,
        }
      );

      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data || error.message);
    }
  }
);

export const getAllCartProductApi = createAsyncThunk(
  "cart/getAllCartProductApi",
  async (_, { rejectWithValue }) => {
    try {
      const response = await axios.get(
        "/cartapi/getallitem",
        {},
        {
          withCredentials: true,
        }
      );

      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data || error.message);
    }
  }
);



export const deleteItemFromCart = createAsyncThunk(
  "cart/deleteItemFromCart",
  async (cartProductId, { rejectWithValue }) => {
    try {
      const response = await axios.delete(
        `/cartapi/deletefromcart/${cartProductId}`,

        {
          withCredentials: true,
        }
      );

      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data || error.message);
    }
  }
);

export const updateCartItemApi = createAsyncThunk(
  "cart/updateCartItemApi",
  async ({ productId, quantity }, { rejectWithValue }) => {
    try {
      const response = await axios.patch(
        `/cartapi/updatecart/${productId}`,
        { quantity },
        { withCredentials: true }
      );
      return response.data.cartItem;
    } catch (error) {
      return rejectWithValue(error.response?.data || error.message);
    }
  }
);
