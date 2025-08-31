import { createSlice } from "@reduxjs/toolkit";
import {
  addCategoryApi,
  deleteCategoryApi,
  getAllCategoryApi,
  upateCategoryApi,
} from "../apiMiddleware/categoryMiddleware";

const initialState = {
  name: null,
  image: null,
  isLoading: false,
  isError: false,
  category: [],
  selectedCategory: null,
};

const categorySlicer = createSlice({
  name: "category",
  initialState,
  reducers: {
    filtercategory: (state, action) => {
      const { cateId } = action.payload;
      const category = state.category.find((cate) => cate._id === cateId);
      
      state.selectedCategory = category || null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(addCategoryApi.pending, (state) => {
        (state.isLoading = true), (state.isError = false);
      })
      .addCase(addCategoryApi.fulfilled, (state, action) => {
        (state.isLoading = false),
          (state.isError = false),
          (state.image = action.payload),
          (state.name = action.payload);
      })
      .addCase(addCategoryApi.rejected, (state) => {
        (state.isLoading = true),
          (state.isError = true),
          (state.image = null),
          (state.name = null);
      })
      .addCase(getAllCategoryApi.pending, (state) => {
        (state.isLoading = true), (state.isError = true);
      })
      .addCase(getAllCategoryApi.fulfilled, (state, action) => {
        (state.isLoading = false),
          (state.isError = false),
          (state.category = action.payload.category);
      })
      .addCase(getAllCategoryApi.rejected, (state) => {
        (state.isLoading = true),
          (state.isError = true),
          (state.category = null);
      })
      .addCase(deleteCategoryApi.pending, (state) => {
        (state.isLoading = true), (state.isError = true);
      })
      .addCase(deleteCategoryApi.fulfilled, (state, action) => {
        (state.isLoading = false), (state.isError = false);
      })
      .addCase(deleteCategoryApi.rejected, (state) => {
        (state.isLoading = true), (state.isError = true);
      })
      .addCase(upateCategoryApi.pending, (state) => {
        (state.isLoading = true), (state.isError = true);
      })
      .addCase(upateCategoryApi.fulfilled, (state, action) => {
        (state.isLoading = false),
          (state.isError = false),
          (state.category = action.payload);
      })
      .addCase(upateCategoryApi.rejected, (state) => {
        (state.isLoading = true), (state.isError = true);
      });
  },
});
export const { filtercategory } = categorySlicer.actions;

export const categorySlice = categorySlicer.reducer;
