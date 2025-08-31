import CategoryModel from "../models/categoryModel/category.model.js";
import ProductModel from "../models/productModel/product.model.js";
import SubCategoryModel from "../models/subCategoryModel/subCategory.model.js";
import { uploadImageOnCloudinary } from "../utils/uploadOnCloudinary.js";

export const addProduct = async (req, res) => {
  try {
    const { categoryId } = req.params;
    const { subCategoryId } = req.params;
    const { name, unit, price, discount, description, more_details } = req.body;
    const files = req.files;
    const imageUrls = [];
    if (!name || !unit || !price || !discount || !description) {
      let missingFields = [];
      if (!name) missingFields.push("name");
      if (!unit) missingFields.push("unit");
      if (!price) missingFields.push("price");
      if (!discount) missingFields.push("discount");
      if (!description) missingFields.push("description");

      return res.status(400).json({
        status: false,
        error: "failed in adding product",
        message: `${missingFields.join(",")} product field is required`,
      });
    }
    let existingProduct = await ProductModel.findOne({
      $or: [{ name }, { description }],
    });

    if (existingProduct) {
      return res.status(400).json({ message: "product already exist" });
    }

    const category = await CategoryModel.findById(categoryId);

    if (!category) {
      return res.status(400).json({ message: "Category not found" });
    }

    const subCategory = await SubCategoryModel.findById(subCategoryId);
    if (!subCategory) {
      return res.status(400).json({ message: "subCategory not found" });
    }

    for (const file of files) {
      const upload = await uploadImageOnCloudinary(file);
      imageUrls.push(upload.secure_url);
    }

    let newProduct = await ProductModel.create({
      name,
      category,
      image: imageUrls,
      subCategory,
      unit,
      price,
      discount,
      description,
      more_details: JSON.parse(more_details || "{}"),
    });

    newProduct = await ProductModel.findById(newProduct._id)
      .populate("category")
      .populate("subCategory");

    return res.status(201).json({
      status: true,
      message: "Product created successfully",
      data: newProduct,
    });
  } catch (error) {
    return res.status(500).json({
      status: false,
      message: error.message,
    });
  }
};

export const deleteProduct = async (req, res) => {
  try {
    const { productId } = req.params;
    const product = await ProductModel.findByIdAndDelete(productId);
    if (!product) {
      return res.status(400).json({ message: "Product not found" });
    }
    return res.status(201).json({
      status: true,
      message: "Product delete successfully",
    });
  } catch (error) {
    return res.status(500).json({
      status: false,
      message: error.message,
    });
  }
};

export const getAllProduct = async (req, res) => {
  try {
    const search = req.query.search;
    const filter = search
      ? {
          $or: [{ name: { $regex: search, $options: "i" } }],
        }
      : {};

    const product = await ProductModel.find(filter)
      .populate("category")
      .populate("subCategory");
    if (!product) {
      return res.status(400).json({ message: "Product not found" });
    }

    return res.status(201).json({
      status: true,
      message: "fetch all product successfully",
      product,
    });
  } catch (error) {
    return res.status(500).json({
      status: false,
      message: error.message,
    });
  }
};

export const updateProduct = async (req, res) => {
  try {
    const { productId } = req.params;
    const { name, unit, price, discount, description, more_details } = req.body;

    
    const files = req.files;

    const product = await ProductModel.findById(productId);
    if (!product) {
      return res.status(404).json({ message: "Product not found" });
    }

    // Optional updates
    if (name) product.name = name;
    if (unit) product.unit = unit;
    if (price) product.price = price;
    if (discount) product.discount = discount;
    if (description) product.description = description;

    if (more_details) {
      try {
        product.more_details = JSON.parse(more_details);
      } catch (err) {
        return res.status(400).json({
          status: false,
          message: "Invalid JSON in more_details",
        });
      }
    }

    // Replace images (or use .push for append)
    if (files && files.length > 0) {
      const imageUrls = [];
      for (const file of files) {
        const upload = await uploadImageOnCloudinary(file);
        imageUrls.push(upload.secure_url);
      }
      product.image = imageUrls;
    }

    const updatedProduct = await product.save();

    res.status(200).json({
      status: true,
      message: "Product updated successfully",
      data: updatedProduct,
    });
  } catch (error) {
    res.status(500).json({
      status: false,
      message: error.message,
    });
  }
};

export const getProductById = async (req, res) => {
  try {
    const { productId } = req.params;

    const product = await ProductModel.findById(productId);
    if (!product) {
      return res.status(400).json({ message: "Product not found" });
    }
    return res.status(200).json({
      status: true,
      message: "Product fetch successfully",
      product,
    });
  } catch (error) {
    return res.status(500).json({
      status: false,
      message: "Server error",
      error: error.message,
    });
  }
};
