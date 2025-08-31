import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const addproductApi = createAsyncThunk(
  "product/addproductApi",
  async ({ formData, categoryId, subCategoryId }, { rejectWithValue }) => {
    try {
      const response = await axios.post(
        `/productapi/addproduct/${categoryId}/${subCategoryId}`,
        formData,
        {
          withCredentials: true,
          headers: { "Content-Type": "multipart/form-data" },
        }
      );

      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data || error.message);
    }
  }
);
export const getAllProductApi = createAsyncThunk(
  "product/getAllProductApi",
  async (item = "", { rejectWithValue }) => {
    try {
      const response = await axios.get(
        `/productapi/getallproduct?search=${item}`,
        item,
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
export const deleteProductApi = createAsyncThunk(
  "product/deleteProductApi",
  async (id, { rejectWithValue }) => {
    try {
      const response = await axios.delete(
        `/productapi/deleteproduct/${id}`,

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
export const getProductByIdApi = createAsyncThunk(
  "product/getProductByIdApi",
  async (productId, { rejectWithValue }) => {
    try {
      const response = await axios.get(
        `/productapi/getproductbyid/${productId}`,

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
export const updateProductApi = createAsyncThunk(
  "product/updateProductApi",
  async ({ formData, productId }, { rejectWithValue }) => {
    try {
      const response = await axios.patch(
        `/productapi/updateproduct/${productId}`,
        formData,
        {
          withCredentials: true,
          headers: { "Content-Type": "multipart/form-data" },
        }
      );

      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data || error.message);
    }
  }
);
