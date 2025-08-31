import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const addNewAddressApi = createAsyncThunk(
  "address/addNewAddressApi",
  async (addressData, { rejectWithValue }) => {
    try {
      const response = await axios.post(
        "/addressapi/addnewaddress",
        addressData,
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

export const getAllAddressApi = createAsyncThunk(
  "address/getAllAddressApi",
  async (_, { rejectWithValue }) => {
    try {
      const response = await axios.get(
        "/addressapi/getuseraddress",
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

export const getAddressByAddressIdApi = createAsyncThunk(
  "address/getAddressByAddressIdApi",
  async (addressId, { rejectWithValue }) => {
    try {
      const response = await axios.get(
        `/addressapi/getuseraddressbyaddressid/${addressId}`,

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

export const deleteAddressApi = createAsyncThunk(
  "address/deleteAddressApi",
  async (addressId, { rejectWithValue }) => {
    try {
      const response = await axios.delete(
        `/addressapi/deleteaddress/${addressId}`,

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

export const updateAddressApi = createAsyncThunk(
  "address/updateAddressApi",
  async ({addressId,addressData}, { rejectWithValue }) => {
   
    
    try {
      const response = await axios.patch(
        `/addressapi/updateaddress/${addressId}`,
         addressData,
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