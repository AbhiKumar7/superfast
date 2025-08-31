import CategoryModel from "../models/categoryModel/category.model.js";
import { uploadImageOnCloudinary } from "../utils/uploadOnCloudinary.js";

export const addCategory = async (req, res) => {
  try {
    const { name } = req.body;
    const file = req.file;

    if (!name || !file) {
      return res.status(400).json({ message: "All fields must be filled" });
    }

    const categoryExists = await CategoryModel.findOne({ name });
    if (categoryExists) {
      return res.status(400).json({ message: "Category name already taken" });
    }

    const uploadedImage = await uploadImageOnCloudinary(file);

    const newCategory = await CategoryModel.create({
      name,
      image: uploadedImage.secure_url,
    });

    return res.status(201).json({
      status: true,
      message: "Category added successfully",
      category: newCategory,
    });
  } catch (error) {
    return res.status(500).json({
      status: false,
      message: "Server error",
      error: error.message,
    });
  }
};
export const getAllCategory = async (req, res) => {
  try {
    const search = req.query.search;
    const filter = search
      ? {
          $or: [{ name: { $regex: search, $options: "i" } }],
        }
      : {};
    const category = await CategoryModel.find(filter);
    if (!category) {
      return res
        .status(400)
        .json({ message: "Not able to fetch all category" });
    }
    return res.status(201).json({
      status: true,
      message: "Category fetch successfully",
      category,
    });
  } catch (error) {
    return res.status(500).json({
      status: false,
      message: "Server error",
      error: error.message,
    });
  }
};

export const updateCategory = async (req, res) => {
  try {
    const { categoryId } = req.params;
    const { name } = req.body;
    const file = req.file;

    const category = await CategoryModel.findById(categoryId);
    if (!category) {
      return res.status(404).json({ message: "Category not found" });
    }

    if (name) {
      category.name = name;
    }
    if (file) {
      const uploadedImage = await uploadImageOnCloudinary(file);
      category.image = uploadedImage.secure_url;
    }

    await category.save();
    return res.status(201).json({
      status: true,
      message: "Category update successfully",
      category,
    });
  } catch (error) {
    return res.status(500).json({
      status: false,
      message: "Server error",
      error: error.message,
    });
  }
};

export const deleteCategory = async (req, res) => {
  try {
    const { categoryId } = req.params;

    const category = await CategoryModel.findByIdAndDelete(categoryId);
    if (!category) {
      return res.status(404).json({ message: "Category not found" });
    }

     return res.status(201).json({
      status: true,
      message: "Category deleted successfully",
      category,
    });
  } catch (error) {
      return res.status(500).json({
      status: false,
      message: "Server error",
      error: error.message,
    });
  }
};
