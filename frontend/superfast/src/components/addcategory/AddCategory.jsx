import React, { useEffect, useState } from "react";
import { validateImage } from "../../utils/validation";
import { useDispatch, useSelector } from "react-redux";
import {
  addCategoryApi,
  upateCategoryApi,
} from "../../apiMiddleware/categoryMiddleware";

import { filtercategory } from "../../categorySlice/categorySlice";
function AddCategory({
  handleTogglePopUp,
  fetchData,
  setIsEdit,
  IsEdit,
  categoryId,
}) {

  
  const [categoryName, setCategoryName] = useState("");
  const [categoryImage, setCategoryImage] = useState("");
 
  const { isLoading, selectedCategory } = useSelector(
    (state) => state.category
  );


  const [categoryError, setcategoryError] = useState("");
  const [previewUrl, setPreviewUrl] = useState(null);
  const dispatch = useDispatch();

  useEffect(() => {
    if (IsEdit && categoryId) {
      dispatch(filtercategory({ cateId: categoryId }));
    }
  }, [IsEdit, categoryId, dispatch]);

  useEffect(() => {
    if (IsEdit && selectedCategory) {
      setPreviewUrl(selectedCategory.image || null);
      setCategoryName(selectedCategory.name || "");
    }
  }, [IsEdit, selectedCategory]);

  const handleImage = (e) => {
    const imageFile = e.target.files[0];
    const fileSize = imageFile.size;
    const sizeError = validateImage(fileSize);
    if (sizeError) {
      setcategoryError(sizeError);
    } else {
      setcategoryError("");
      const preview = URL.createObjectURL(imageFile);
      setCategoryImage(imageFile);
      setPreviewUrl(preview);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if ((!IsEdit && !categoryImage) || !categoryName.trim()) {
      setcategoryError("Please fill  both field");
      return;
    }
    const formdata = new FormData();
    formdata.append("name", categoryName);
    formdata.append("image", categoryImage);

    if (IsEdit) {
      dispatch(upateCategoryApi({ formData: formdata, categoryId })).then(
        (data) => {
       
          if (data.payload?.status) {
            fetchData();
            handleTogglePopUp();
            setIsEdit(false);
            resetForm();
          }
        }
      );
    } else {
      dispatch(addCategoryApi(formdata)).then((data) => {
        if (data.payload?.status) {
        }
        handleTogglePopUp();
        fetchData();
        resetForm();
      });
    }
  };
  const resetForm = () => {
    setCategoryName("");
    setCategoryImage("");
    setPreviewUrl(null);
    setcategoryError("");
  };
  return (
    <div className="relative bg-white w-full  h-auto sm:h-[420px] p-6 rounded-lg shadow-lg overflow-y-auto">
      {/* Close Button */}
      <button
        className="absolute top-2 right-2 text-gray-600 hover:text-red-600 text-xl cursor-pointer"
        onClick={() => {
          handleTogglePopUp();
          setIsEdit(false);
        }}
      >
        ✕
      </button>

      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Name */}
        <div className="flex flex-col">
          <label
            htmlFor="categoryName"
            className="mb-2 text-gray-700 font-medium text-sm sm:text-base"
          >
            Name
          </label>
          <input
            id="categoryName"
            type="text"
            value={categoryName}
            onChange={(e) => setCategoryName(e.target.value)}
            placeholder="Enter category name"
            className="border border-gray-300 rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-fuchsia-500 focus:border-fuchsia-500 transition text-sm sm:text-base"
          />
        </div>

        {/* Image Upload */}
        <div className="flex flex-col space-y-2">
          <label
            htmlFor="categoryImage"
            className="text-gray-700 font-medium text-sm sm:text-base"
          >
            Image
          </label>

          {/* Static image name placeholder */}
          <p className="text-sm text-gray-600 font-medium">
            selected-image.jpg
          </p>

          <div className="flex flex-col sm:flex-row sm:items-center sm:space-x-4">
            {/* Image Preview Box */}
            <div className="w-full sm:w-24 h-24 border border-gray-300 rounded-md flex justify-center items-center bg-gray-50 overflow-hidden">
              {previewUrl && (
                <img
                  src={previewUrl}
                  alt="Preview"
                  className="object-cover w-full h-full"
                />
              )}
            </div>

            {/* File Input */}
            <input
              id="categoryImage"
              type="file"
              accept="image/*"
              onChange={handleImage}
              className="text-sm text-gray-600 cursor-pointer sm:flex-1"
            />
          </div>
        </div>
        {/* Submit Button */}
        <button
          type="submit"
          disabled={isLoading}
          className="w-full bg-fuchsia-600 disabled:bg-red-700 disabled:cursor-not-allowed 
             hover:bg-fuchsia-700 text-white font-semibold py-2 rounded-md 
             transition text-sm sm:text-base"
        >
          {isLoading
            ? "Loading....."
            : IsEdit
            ? "Update Category"
            : "Save Category"}
        </button>
        {categoryError && (
          <p className="text-center text-red-600">{categoryError}</p>
        )}
      </form>
     
    </div>
  );
}

export default AddCategory;
