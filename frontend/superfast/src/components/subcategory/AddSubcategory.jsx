import React, { useEffect, useState } from "react";
import { validateImage } from "../../utils/validation";
import { useDispatch, useSelector } from "react-redux";
import {
  addSubCategoryApi,
  updateSubCategoryApi,
} from "../../apiMiddleware/subcategoryMiddleware";

import { filterSubCategory } from "../../subcategorySlice/Subcategory";

function AddSubcategory({
  handleToggleShowAddSubcategory,
  categoryData,
  fetchSubcatgoryData,
  subCategoryId,
  IsSubEdit,
  setIsSubEdit,
}) {
  const [subcategoryName, setsubcategoryName] = useState("");
  const [subcategoryImage, setsubcategoryImage] = useState("");
  const [selectedCategory, setselectedCategory] = useState("");
  const [subCategoryError, setSubCategoryError] = useState("");
  const [subPreviewUrl, setsubPreviewUrl] = useState(null);
 
  const { selectedSubCategory, isLoading } = useSelector(
    (state) => state.subcategory
  );

  const dispatch = useDispatch();
  const handleSubcategoryImage = (e) => {
    const imageFile = e.target.files[0];
    const fileSize = imageFile.size;
    const sizeError = validateImage(fileSize);
    if (sizeError) {
      setSubCategoryError(sizeError);
    } else {
      setSubCategoryError("");
      const preview = URL.createObjectURL(imageFile);
      setsubcategoryImage(imageFile);
      setsubPreviewUrl(preview);
    }
  };

  useEffect(() => {
    if (IsSubEdit && subCategoryId) {
      dispatch(filterSubCategory({ subCategoryId }));
    }
  }, [IsSubEdit, subCategoryId, dispatch]);

  useEffect(() => {
    if (IsSubEdit && selectedSubCategory) {
      setsubPreviewUrl(selectedSubCategory.image || null);
      setsubcategoryName(selectedSubCategory.name || "");
      selectedSubCategory.category.map((item) => {
        setselectedCategory(item._id || "");
      });
    }
  }, [IsSubEdit, selectedSubCategory]);

  const handleUploadSubcategorydetails = (e) => {
    e.preventDefault();
    if (!subcategoryName.trim() || (!IsSubEdit && !subcategoryName)) {
      setSubCategoryError("All fields are required.");
      return;
    }
    const formdata = new FormData();
    formdata.append("name", subcategoryName);
    formdata.append("image", subcategoryImage);

    if (IsSubEdit) {
      dispatch(
        updateSubCategoryApi({
          formData: formdata,
          subCategoryId,
        })
      ).then((data) => {
        if (data.payload?.status) {
          
          fetchSubcatgoryData();
          handleToggleShowAddSubcategory();
          setIsSubEdit(false);
          resetForm();
        }
      });
    } else {
      dispatch(
        addSubCategoryApi({ formData: formdata, selectedCategory })
      ).then((data) => {
        if (data.payload?.status) {
        
          handleToggleShowAddSubcategory();
          fetchSubcatgoryData();
          resetForm();
        }
      });
    }
  };
  const resetForm = () => {
    setsubcategoryName("");
    setsubcategoryImage("");
    setsubPreviewUrl(null);
    setSubCategoryError("");
  };
  return (
    <div className="min-h-screen ">
      <div className="w-full max-w-md sm:max-w-lg md:max-w-xl lg:max-w-2xl mx-auto bg-white rounded-xl shadow-xl/40  p-6 relative">
        {/* Close Button */}
        <button
          onClick={() => {
            handleToggleShowAddSubcategory();
            setIsSubEdit(false);
          }}
          className="absolute top-2 right-2 text-gray-500 hover:text-red-600 text-2xl cursor-pointer"
        >
          ✕
        </button>

        <h2 className="text-xl font-semibold text-gray-800 mb-6 text-center sm:text-left">
          Add Subcategory
        </h2>

        <form onSubmit={handleUploadSubcategorydetails} className="space-y-6">
          {/* Subcategory Name */}
          <div className="flex flex-col">
            <label className="mb-1 text-gray-700 font-medium text-sm">
              Subcategory Name
            </label>
            <input
              id="subcategoryName"
              value={subcategoryName}
              onChange={(e) => setsubcategoryName(e.target.value)}
              type="text"
              placeholder="Enter subcategory name"
              className="border border-gray-300 rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 transition text-sm"
            />
          </div>

          {/* Category Dropdown */}
          <div className="flex flex-col">
            <label className="mb-1 text-gray-700 font-medium text-sm">
              Parent Category
            </label>
            <select
              id="parentCategory"
              value={selectedCategory}
              onChange={(e) => {
                if (!IsSubEdit) {
                  setselectedCategory(e.target.value);
                }
              }}
              className="border border-gray-300 rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 transition text-sm"
            >
              <option value="">Select a category</option>
              {categoryData.map((cate) => (
                <option key={cate._id} value={cate._id}>
                  {cate.name}
                </option>
              ))}
            </select>
          </div>

          {/* Image Upload Section */}
          <div className="flex flex-col space-y-3">
            <label className="text-gray-700 font-medium text-sm">
              Upload Image
            </label>

            {/* Preview & Input - Responsive Row */}
            <div className="flex flex-col sm:flex-row sm:items-center sm:space-x-4 space-y-3 sm:space-y-0">
              {/* Preview Box */}
              <div className="w-full sm:w-24 h-24 border border-gray-300 rounded-md bg-gray-50 flex justify-center items-center overflow-hidden">
                {subPreviewUrl && (
                  <img
                    src={subPreviewUrl}
                    alt="preview"
                    className="object-cover w-full h-full"
                  />
                )}
              </div>

              {/* File Input */}
              <input
                id="subcategoryImage"
                type="file"
                accept="image/*"
                onChange={handleSubcategoryImage}
                className="text-sm text-gray-600"
              />
            </div>
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            disabled={isLoading}
            className="w-full bg-blue-600 text-white font-medium py-2  disabled:bg-red-700 disabled:cursor-not-allowed  rounded-md hover:bg-blue-700 transition"
          >
            {isLoading
              ? "Loading....."
              : IsSubEdit
              ? "Update Sub Category"
              : "Save Category"}
          </button>
        </form>
        {subCategoryError && (
          <p className="text-center text-red-600 mt-4">{subCategoryError}</p>
        )}
      </div>
     
    </div>
  );
}

export default AddSubcategory;
