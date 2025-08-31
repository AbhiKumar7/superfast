import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const addCategoryApi = createAsyncThunk(
  "category/addCategoryApi",
  async (formData, { rejectWithValue }) => {
    try {
      const response = await axios.post("/categoryapi/addcategory", formData, {
        withCredentials: true,
        headers: { "Content-Type": "multipart/form-data" },
      });

      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data || error.message);
    }
  }
);
export const getAllCategoryApi = createAsyncThunk(
  "category/getAllCategoryApi",
  async (item = "", { rejectWithValue }) => {
    try {
      const response = await axios.get(
        `/categoryapi/getallcategory?search=${item}`,
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

export const deleteCategoryApi = createAsyncThunk(
  "category/deleteCategoryApi",
  async (categoryId, { rejectWithValue }) => {
    try {
      const response = await axios.delete(
        `/categoryapi/deletecategory/${categoryId}`,
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

export const upateCategoryApi = createAsyncThunk(
  "category/upateCategoryApi",
  async ({formData,categoryId}, { rejectWithValue }) => {
    try {
      const response = await axios.patch(
        `/categoryapi/updatecategory/${categoryId}`,
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
