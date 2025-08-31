import CartProductModel from "../models/cartmodel/cart.model.js";
import ProductModel from "../models/productModel/product.model.js";
import UserModel from "../models/userModel/user.model.js";

export const addToCartItem = async (req, res) => {
  try {
    const { productId } = req.params;
    const { quantity } = req.body;

    if (!quantity || typeof quantity !== "number") {
      return res
        .status(400)
        .json({ message: "Please provide a valid quantity" });
    }

    const product = await ProductModel.findById(productId);
    if (!product) {
      return res.status(404).json({ message: "Product not found" });
    }

    const existingCartItem = await CartProductModel.findOne({
      productId,
         userId: req?.user?._id,
    });

    if (existingCartItem) {
      existingCartItem.quantity += quantity;

      if (existingCartItem.quantity <= 0) {
        await existingCartItem.remove();
        return res.status(200).json({
          message: "Product removed from cart (quantity <= 0)",
        });
      }

      // Optional: prevent over-ordering
      if (product.unit < quantity) {
        return res.status(400).json({ message: "Not enough stock available" });
      }

      await existingCartItem.save();

      product.unit -= quantity;
      await product.save();

      return res.status(200).json({
        message: "Cart updated",
        item: existingCartItem,
      });
    }

    // New item
    if (quantity <= 0) {
      return res
        .status(400)
        .json({ message: "Quantity must be greater than 0" });
    }

    if (product.unit < quantity) {
      return res.status(400).json({ message: "Not enough stock available" });
    }

    let newCartItem = await CartProductModel.create({
      productId,
      userId: req?.user?._id,

      quantity,
    });

    product.unit -= quantity;
    await product.save();

    newCartItem = await CartProductModel.findById(newCartItem._id).populate(
      "productId"
    );

    return res.status(201).json({
      message: "Product added to cart successfully",
      item: newCartItem,
    });
  } catch (error) {
    console.error("Add to Cart Error:", error);
    return res.status(500).json({
      message: "Server error",
      error: error.message,
    });
  }
};

export const getAllCartItem = async (req, res) => {
  try {
    
    const cartItems = await CartProductModel.find({ userId: req.user._id })
      .populate("productId");

    if (!cartItems || cartItems.length === 0) {
      return res.status(404).json({ message: "No cart items found" });
    }

    return res.status(200).json({
      status: true,
      message: "Fetched all cart items successfully",
      cartItems,
    });
  } catch (error) {
    return res.status(500).json({
      status: false,
      message: "Server error",
      error: error.message,
    });
  }
};


export const updateCartItem = async (req, res) => {
  try {
    const { cartItemId } = req.params;
    const { quantity } = req.body;

    if (quantity == null || isNaN(quantity) || quantity <= 0) {
      return res
        .status(400)
        .json({ message: "Please provide a valid quantity (greater than 0)" });
    }

    const cartItem = await CartProductModel.findById(cartItemId);
    if (!cartItem) {
      return res.status(404).json({ message: "Cart item not found" });
    }

    const product = await ProductModel.findById(cartItem.productId);
    if (!product) {
      return res.status(404).json({ message: "Associated product not found" });
    }

    const previousQuantity = cartItem.quantity;
    const quantityDifference = quantity - previousQuantity;

    if (quantityDifference > 0) {
      if (product.unit < quantityDifference) {
        return res.status(400).json({ message: "Not enough stock available" });
      }
      product.unit -= quantityDifference;
    } else if (quantityDifference < 0) {
      product.unit += Math.abs(quantityDifference);
    }

    // Save updated product and cart item
    await product.save();

    cartItem.quantity = quantity;
    await cartItem.save();

    const updatedCartItem = await CartProductModel.findById(
      cartItem._id
    ).populate("productId");

    return res.status(200).json({
      status: true,
      message: "Cart item updated successfully",
      cartItem: updatedCartItem,
    });
  } catch (error) {
    return res.status(500).json({
      status: false,
      message: "Server error",
      error: error.message,
    });
  }
};

export const deleteCartItem = async (req, res) => {
  try {
    const { productId } = req.params;

    const cartItem = await CartProductModel.findOne({
      userId: req.user?.id,
      productId,
    });

    if (!cartItem) {
      return res.status(400).json({ message: "Cart item not found" });
    }

    // Remove item from user's shopping_cart array
    const userCart = await UserModel.findById(req.user?.id);
    if (userCart) {
      userCart.shopping_cart = userCart.shopping_cart.filter(
        (pro) => pro.toString() !== productId.toString()
      );
      await userCart.save();
    }

    // Update product stock (optional)
    const product = await ProductModel.findById(cartItem.productId);
    if (!product) {
      return res.status(400).json({ message: "Product not found" });
    }

    if (cartItem.quantity) {
      product.unit += cartItem.quantity;
      await product.save();
    }

    // Delete cart item
    await CartProductModel.findByIdAndDelete(cartItem._id);

    return res.status(200).json({
      status: true,
      message: "Product deleted from cart successfully",
      cartItem,
    });
  } catch (error) {
    return res.status(500).json({
      status: false,
      message: "Server error",
      error: error.message,
    });
  }
};

export const decreaseCartQuantity = async (req, res) => {
  try {
    const { productId } = req.params;

    const cartItem = await CartProductModel.findOne({
      userId: req.user?._id, // use _id (same as addToCartItem)
      productId,
    });

    if (!cartItem) {
      return res.status(400).json({ message: "Cart item not found" });
    }

    // Always increase stock by 1 when decreasing cart
    const product = await ProductModel.findById(productId);
    if (product) {
      product.unit += 1;
      await product.save();
    }

    cartItem.quantity -= 1;

    if (cartItem.quantity <= 0) {
      // Remove item from cart if quantity becomes 0
      await CartProductModel.findByIdAndDelete(cartItem._id);

      // Also remove from user's shopping_cart array
      const userCart = await UserModel.findById(req.user?._id);
      if (userCart) {
        userCart.shopping_cart = userCart.shopping_cart.filter(
          (pro) => pro.toString() !== productId.toString()
        );
        await userCart.save();
      }

      return res.status(200).json({
        status: true,
        message: "Product removed from cart",
      });
    }

    await cartItem.save();

    return res.status(200).json({
      status: true,
      message: "Quantity decreased successfully",
      cartItem,
    });
  } catch (error) {
    return res.status(500).json({
      status: false,
      message: "Server error",
      error: error.message,
    });
  }
};
