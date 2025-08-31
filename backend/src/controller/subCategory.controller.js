import CategoryModel from "../models/categoryModel/category.model.js";
import SubCategoryModel from "../models/subCategoryModel/subCategory.model.js";
import { uploadImageOnCloudinary } from "../utils/uploadOnCloudinary.js";

export const addSubCategory = async (req, res) => {
  try {
    const { categoryId } = req.params;
    const { name } = req.body;
    const file = req.file;
    if (!name || !file) {
      return res.status(400).json({ message: "All fields must be filled" });
    }
    const category = await CategoryModel.findById(categoryId);
    if (!category) {
      return res.status(400).json({ message: "Category not found" });
    }

    const SubcategoryExists = await SubCategoryModel.findOne({ name });
    if (SubcategoryExists) {
      return res
        .status(400)
        .json({ message: "SubCategory name already taken" });
    }
    const uploadedImage = await uploadImageOnCloudinary(file);

    let newSubCategory = await SubCategoryModel.create({
      category: categoryId,
      name,
      image: uploadedImage.secure_url,
    });
    newSubCategory = await SubCategoryModel.findById(
      newSubCategory._id
    ).populate("category");
    return res.status(201).json({
      status: true,
      message: "SubCategory added successfully",
      newSubCategory,
    });
  } catch (error) {
    return res.status(500).json({
      status: false,
      message: "Server error",
      error: error.message,
    });
  }
};
export const getAllSubCategory = async (req, res) => {
  try {
    const search = req.query.search;
    const filter = search
      ? {
          $or: [{ name: { $regex: search, $options: "i" } }],
        }
      : {};
    const subCategory = await SubCategoryModel.find(filter).populate("category");


    if (!subCategory) {
      return res
        .status(400)
        .json({ message: "Not able to fetch all subcategory" });
    }
    return res.status(201).json({
      status: true,
      message: "Category fetch successfully",
      subCategory,
    });
  } catch (error) {
    return res.status(500).json({
      status: false,
      message: "Server error",
      error: error.message,
    });
  }
};

export const updatesubcategory = async (req, res) => {
  try {
    const { subCategoryId } = req.params;
    const { name } = req.body;
 

    const file = req.file;
    if (!name && !file) {
      return res.status(400).json({
        status: false,
        message: "Nothing to update. Provide at least a name or image.",
      });
    }
    const subCategory = await SubCategoryModel.findById(subCategoryId).populate("category");
    if (!subCategory) {
      return res.status(404).json({ message: "SubCategory not found" });
    }

    if (name) {
      subCategory.name = name;
    }
    if (file) {
      const uploadedImage = await uploadImageOnCloudinary(file);
      subCategory.image = uploadedImage.secure_url;
    }

    await subCategory.save();
    return res.status(201).json({
      status: true,
      message: "SubCategory update successfully",
      subCategory,
    });
  } catch (error) {
    return res.status(500).json({
      status: false,
      message: "Server error",
      error: error.message,
    });
  }
};

export const deleteSubcategory = async (req, res) => {
  try {
    const { subCategoryId } = req.params;

    const subCategory = await SubCategoryModel.findByIdAndDelete(subCategoryId);
    if (!subCategory) {
      return res.status(404).json({ message: "Sub category not found" });
    }

     return res.status(201).json({
      status: true,
      message: "sub category deleted successfully",
      subCategory,
    });
  } catch (error) {
      return res.status(500).json({
      status: false,
      message: "Server error",
      error: error.message,
    });
  }
};