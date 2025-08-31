import { createSlice } from "@reduxjs/toolkit";
import {
  addSubCategoryApi,
  deleteSubCategoryApi,
  getAllSubCategoryApi,
  updateSubCategoryApi,
} from "../apiMiddleware/subcategoryMiddleware";

const initialState = {
  name: null,
  image: null,
  isLoading: false,
  isError: false,
  subCategory: [],
  selectedSubCategory: null,
};

const subCategorySlice = createSlice({
  name: "subcategory",
  initialState,
  reducers: {
    filterSubCategory: (state, action) => {
      const { subCategoryId } = action.payload;
        const findsubCategory = state.subCategory.find((subcate) => subcate._id === subCategoryId)
        state.selectedSubCategory = findsubCategory || null;
      
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(addSubCategoryApi.pending, (state, action) => {
        state.name = null;
        state.image = null;
        state.isError = true;
        state.isLoading = true;
      })
      .addCase(addSubCategoryApi.fulfilled, (state, action) => {
        state.image = action.payload;
        state.name = action.payload;
        state.isError = false;
        state.isLoading = false;
      })
      .addCase(addSubCategoryApi.rejected, (state, action) => {
        state.image = null;
        state.name = null;
        state.isLoading = true;

        state.isError = true;
      })
      .addCase(getAllSubCategoryApi.pending, (state, action) => {
        state.name = null;
        state.image = null;
        state.isError = true;
        state.isLoading = true;
      })
      .addCase(getAllSubCategoryApi.fulfilled, (state, action) => {
   
        
        state.subCategory = action.payload.subCategory;
        state.isError = false;
        state.isLoading = false;
      })
      .addCase(getAllSubCategoryApi.rejected, (state, action) => {
        state.image = null;
        state.name = null;
        state.isLoading = true;
        state.isError = true;
      })
      .addCase(deleteSubCategoryApi.pending, (state) => {
        state.name = null;
        state.image = null;
        state.isError = true;
        state.isLoading = true;
      })
      .addCase(deleteSubCategoryApi.fulfilled, (state, action) => {
        state.image = action.payload;
        state.name = action.payload;
        state.isError = false;
        state.isLoading = false;
      })
      .addCase(deleteSubCategoryApi.rejected, (state) => {
        state.image = null;
        state.name = null;
        state.isLoading = true;
        state.isError = true;
      })
        .addCase(updateSubCategoryApi.pending, (state) => {
        state.name = null;
        state.image = null;
        state.isError = true;
        state.isLoading = true;
      })
      .addCase(updateSubCategoryApi.fulfilled, (state, action) => {
        state.image = action.payload;
        state.name = action.payload;
        state.isError = false;
        state.isLoading = false;
      })
      .addCase(updateSubCategoryApi.rejected, (state) => {
        state.image = null;
        state.name = null;
        state.isLoading = true;
        state.isError = true;
      });
  },
});
export const { filterSubCategory } = subCategorySlice.actions;
export const subCategory = subCategorySlice.reducer;
