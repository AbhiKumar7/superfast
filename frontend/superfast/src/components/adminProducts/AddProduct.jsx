import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getAllCategoryApi } from "../../apiMiddleware/categoryMiddleware";
import { getAllSubCategoryApi } from "../../apiMiddleware/subcategoryMiddleware";
import { filterProduct } from "../../productSlice/productSlice";
import {
  addproductApi,
  updateProductApi,
} from "../../apiMiddleware/productMiddleware";
import { RippleRingLoader } from "react-loaderkit";
const AddProduct = ({
  fetchAllProduct,
  setisEditProduct,
  productId,
  isEditProduct,
  handleAddProductForm,
}) => {
  const dispatch = useDispatch();
  const [productName, setproductName] = useState("");
  const [imagePreviews, setImagePreviews] = useState([]);
  const [selectedCategoryId, setSelectedCategoryId] = useState("");
  const [selectedSubCategoryId, setSelectedSubCategoryId] = useState("");
  const [productUnit, setproductUnit] = useState("");
  const [productImages, setProductImages] = useState([]);
  const [productPrice, setproductPrice] = useState("");
  const [productDiscount, setproductDiscount] = useState("");
  const [productDescription, setproductDescription] = useState("");
  const [categoryData, setcategoryData] = useState([]);
  const [subCategoryData, setsubCategoryData] = useState([]);
  const [productError, setproductError] = useState("");
  const { isLoading, selectedproduct } = useSelector((state) => state.product);
  console.log(isEditProduct);

  useEffect(() => {
    if (isEditProduct && productId) {
      dispatch(filterProduct({ productId }));
    }
  }, [isEditProduct, productId, dispatch]);

  useEffect(() => {
    if (isEditProduct && selectedproduct) {
      setproductName(selectedproduct.name || "");
      setproductDiscount(selectedproduct.discount || "");
      setproductPrice(selectedproduct.price || "");
      setproductDescription(selectedproduct.description || "");
      setproductUnit(selectedproduct.unit || "");

      setImagePreviews(selectedproduct.image || []);
    }
  }, [isEditProduct, selectedproduct]);

  // get all category
  useEffect(() => {
    dispatch(getAllCategoryApi()).then((data) => {
      const cateData = data?.payload?.category;
      if (data?.payload?.status) {
        setcategoryData(cateData);
      }
    });
  }, [dispatch]);

  // get all SubCategory
  useEffect(() => {
    dispatch(getAllSubCategoryApi()).then((data) => {
      const subCateData = data?.payload?.subCategory;

      if (data?.payload?.status) {
        setsubCategoryData(subCateData);
      }
    });
  }, [dispatch]);

  const handleAddImageProduct = (e) => {
    const files = Array.from(e.target.files);

    const validFiles = files.filter((file) => file.size <= 2 * 1024 * 1024);

    if (validFiles.length !== files.length) {
      setproductError("Each image must be ≤ 2MB.");
      return;
    }

    const totalImages = productImages.length + validFiles.length;
    if (totalImages > 5) {
      setproductError("You can upload a maximum of 5 images.");
      return;
    }

    setproductError("");

    setProductImages((prev) => [...prev, ...validFiles]);
    setImagePreviews((prev) => [
      ...prev,
      ...validFiles.map((file) => URL.createObjectURL(file)),
    ]);
  };
  const handleSubmit = (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append("name", productName);
    formData.append("unit", productUnit);
    formData.append("price", productPrice);
    formData.append("discount", productDiscount);
    formData.append("description", productDescription);

    productImages.forEach((file) => {
      formData.append("images", file);
    });
    if (isEditProduct) {
      dispatch(updateProductApi({ formData, productId })).then((data) => {
        if (data?.payload?.status) {
          fetchAllProduct();
          handleAddProductForm();
          setisEditProduct(false);
        }
      });
    } else {
      try {
        dispatch(
          addproductApi({
            formData,
            categoryId: selectedCategoryId,
            subCategoryId: selectedSubCategoryId,
          })
        ).then((data) => {
          if (data?.payload?.status) {
            setproductDescription("");
            setproductDescription("");
            setproductName("");
            setproductUnit("");
            setproductPrice("");
            setproductError("");
            setImagePreviews([]);
            fetchAllProduct();
          }
        });
      } catch (err) {
        console.error("❌ Error adding product:", err);
      }
    }
  };

  return (
    <div className="px-4 sm:px-8 lg:px-16 py-10 max-w-5xl mx-auto">
      <h1 className="text-2xl font-semibold mb-6">Add New Product</h1>

      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Product Name */}
        <div>
          <label className="block text-sm font-medium mb-1">Product Name</label>
          <input
            type="text"
            value={productName}
            onChange={(e) => setproductName(e.target.value)}
            placeholder="Enter product name"
            className="w-full border border-gray-300 rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        {/* Upload Product Image */}

        <div className="border-2 border-dashed border-gray-300 p-6 text-center rounded-md">
          <p className="font-semibold mb-2">Upload Product Images</p>
          <p className="text-sm text-gray-500 mb-4">
            Drag and drop or click to upload
          </p>

          <label
            htmlFor="product-images"
            className="inline-block cursor-pointer px-4 py-2 text-sm bg-gray-100 border rounded-md hover:bg-gray-200"
          >
            Upload Images
          </label>
          <input
            type="file"
            id="product-images"
            className="hidden"
            multiple
            accept="image/*"
            onChange={handleAddImageProduct}
          />

          {/* Static Multiple Image Previews */}
          <div className="mt-6 grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-4">
            {imagePreviews.map((url, index) => (
              <img
                key={index}
                src={url}
                alt={`Preview ${index}`}
                className="w-full h-28 object-cover rounded-md shadow"
              />
            ))}
          </div>
        </div>
        {productError && (
          <p className="text-center text-red-500 text-xl">{productError}</p>
        )}

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 ">
          {/* Category */}
          <div>
            <label className="block text-sm font-medium mb-1">Category</label>
            <select
              value={selectedCategoryId}
              onChange={(e) => setSelectedCategoryId(e.target.value)}
              className="w-full border border-gray-300 rounded-md px-4 py-2 focus:outline-none"
            >
              {categoryData.map((cate) => (
                <option key={cate._id} value={cate._id}>
                  {cate.name}
                </option>
              ))}
            </select>
          </div>

          {/* Subcategory */}
          <div>
            <label className="block text-sm font-medium mb-1">
              Subcategory
            </label>
            <select
              value={selectedSubCategoryId}
              onChange={(e) => setSelectedSubCategoryId(e.target.value)}
              className="w-full border border-gray-300 rounded-md px-4 py-2 focus:outline-none"
            >
              {subCategoryData.map((subCate) => (
                <option value={subCate._id} key={subCate._id}>
                  {subCate.name}
                </option>
              ))}
            </select>
          </div>

          {/* Unit */}
          <div>
            <label className="block text-sm font-medium mb-1">Unit</label>
            <input
              type="text"
              placeholder="e.g., kg, piece"
              value={productUnit}
              onChange={(e) => setproductUnit(e.target.value)}
              className="w-full border border-gray-300 rounded-md px-4 py-2 focus:outline-none"
            />
          </div>

          {/* Price */}
          <div>
            <label className="block text-sm font-medium mb-1">Price</label>
            <input
              type="number"
              placeholder="Enter price"
              value={productPrice}
              onChange={(e) => setproductPrice(e.target.value)}
              className="w-full border border-gray-300 rounded-md px-4 py-2 focus:outline-none"
            />
          </div>

          {/* Discount */}
          <div>
            <label className="block text-sm font-medium mb-1">Discount</label>
            <input
              type="number"
              placeholder="Enter discount"
              value={productDiscount}
              onChange={(e) => setproductDiscount(e.target.value)}
              className="w-full border border-gray-300 rounded-md px-4 py-2 focus:outline-none"
            />
          </div>

          {/* Description */}
          <div className="md:col-span-2">
            <label className="block text-sm font-medium mb-1">
              Description
            </label>
            <textarea
              rows="4"
              value={productDescription}
              onChange={(e) => setproductDescription(e.target.value)}
              placeholder="Enter product description"
              className="w-full border border-gray-300 rounded-md px-4 py-2 focus:outline-none"
            ></textarea>
          </div>
        </div>

        {/* Submit Button */}
        {isLoading ? (
          <div className="flex justify-center  ">
            <RippleRingLoader size={43} color="#8B5CF6" speed={2} />
          </div>
        ) : (
          <div className="pt-6">
            <button
              type="submit"
              className="w-full bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 rounded-md"
            >
              Add Product
            </button>
          </div>
        )}
      </form>
    </div>
  );
};

export default AddProduct;
