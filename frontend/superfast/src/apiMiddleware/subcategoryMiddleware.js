import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const addSubCategoryApi = createAsyncThunk(
  "subcategory/addSubCategoryApi",
  async ({ formData, selectedCategory }, { rejectWithValue }) => {
    try {
      const response = await axios.post(
        `/subcategoryapi/addsubcategory/${selectedCategory}`,
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

export const getAllSubCategoryApi = createAsyncThunk(
  "subcategory/getAllSubCategoryApi",
  async (item = "", { rejectWithValue }) => {
    try {
      const response = await axios.get(
        `/subcategoryapi/getallsubcategory?search=${item}`,
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

export const deleteSubCategoryApi = createAsyncThunk(
  "subcategory/deleteSubCategoryApi",
  async (subcategoryId, { rejectWithValue }) => {
    try {
      const response = await axios.delete(
        `/subcategoryapi/deletesubcategory/${subcategoryId}`,
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

export const updateSubCategoryApi = createAsyncThunk(
  "subcategory/updateSubCategoryApi",
  async ({ formData, subCategoryId }, { rejectWithValue }) => {
    try {
      const response = await axios.patch(
        `/subcategoryapi/updatesubcategory/${subCategoryId}`,
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