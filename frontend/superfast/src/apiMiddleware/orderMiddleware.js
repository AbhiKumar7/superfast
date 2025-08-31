import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const newOrderApi = createAsyncThunk(
  "order/newOrderApi",
  async (addressId, { rejectWithValue }) => {
    try {
      const response = await axios.post(
        `/orderapi/createneworder/${addressId}`,
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
export const getAllOrderApi = createAsyncThunk(
  "order/getAllOrderApi",
  async (_, { rejectWithValue }) => {
    try {
      const response = await axios.get(
        `/orderapi/getallorders`,

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

export const getAllOrderAdminApi = createAsyncThunk(
  "order/getAllOrderAdminApi",
  async (_, { rejectWithValue }) => {
    try {
      const response = await axios.get(
        `/orderapi/getallordersbyadmin`,

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
export const chageOrderStatusAdminApi = createAsyncThunk(
  "order/chageOrderStatusAdminApi",
  async ({orderId,status}, { rejectWithValue }) => {
    try {
      const response = await axios.post(
        `/orderapi/changeorderstatus/${orderId}`,
        {status},
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
