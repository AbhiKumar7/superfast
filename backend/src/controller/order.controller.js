import AddressModel from "../models/addressModel/address.Model.js";
import CartProductModel from "../models/cartmodel/cart.model.js";
import OrderModel from "../models/orderModel/order.Model.js";
import UserModel from "../models/userModel/user.model.js";
import { orderNumber } from "../utils/generateOtp.js";

export const createNewOrder = async (req, res) => {
  try {
    const { delivery_address } = req.params;

    const userAddress = await AddressModel.findById(delivery_address);
    if (!userAddress) {
      return res.status(404).json({
        status: false,
        message: "Delivery address not found",
      });
    }

    const cartProducts = await CartProductModel.find({
      userId: req.user._id,
    }).populate("productId");

    if (!cartProducts || cartProducts.length === 0) {
      return res.status(400).json({
        status: false,
        message: "Cart is empty",
      });
    }

    const productDetails = cartProducts.map((pro) => ({
      name: pro?.productId?.name,
      image: pro?.productId?.image,
      price: pro?.productId?.price,
      quantity: pro.quantity,
      subtotal: pro.quantity * pro?.productId?.price,
    }));

    const totalAmt = productDetails.reduce(
      (acc, item) => acc + item.subtotal,
      0
    );

    const order = await OrderModel.create({
      orderId: orderNumber(),
      delivery_address,
      product_details: productDetails,
      totalAmt,
      subTotalAmt: totalAmt,
      userId: req.user?._id,
    });

    const newOrder = await OrderModel.findById(order._id).populate(
      "delivery_address"
    );

    const updateuser = await UserModel.findById(req.user._id);
    updateuser.orderHistory.push(order?._id);
    await updateuser.save();

    return res.status(201).json({
      status: true,
      message: "Order created successfully",
      newOrder,
    });
  } catch (error) {}
};

export const getAllOrder = async (req, res) => {
  try {
    const orders = await OrderModel.find({ userId: req.user?._id }).sort({
      createdAt: -1,
    });

    if (orders.length === 0) {
      return res.status(404).json({
        status: false,
        message: "No orders found for this user",
        orders: [],
      });
    }

    return res.status(200).json({
      status: true,
      message: "Orders fetched successfully",
      orders,
    });
  } catch (error) {
    return res.status(500).json({
      status: false,
      message: "Server error",
      error: error.message,
    });
  }
};

export const getAllOrdersByAdmin = async (req, res) => {
  try {
    const orders = await OrderModel.find({}).sort({
      createdAt: -1,
    }).populate("delivery_address");

    if (orders.length === 0) {
      return res.status(404).json({
        status: false,
        message: "No orders found for this user",
        orders: [],
      });
    }

    return res.status(200).json({
      status: true,
      message: "Orders fetched successfully",
      orders,
    });
  } catch (error) {
    return res.status(500).json({
      status: false,
      message: "Server error",
      error: error.message,
    });
  }
};

export const ChangeOrderStatus = async (req, res) => {
  try {
    const { orderId } = req.params;
    const { status } = req.body;

    // Find order by ID
    const order = await OrderModel.findById(orderId);

    if (!order) {
      return res.status(404).json({
        status: false,
        message: "Order not found",
      });
    }

    // Update payment status
    order.payment_status = status;
    await order.save();

    return res.status(200).json({
      status: true,
      message: `Order status updated to '${status}' successfully`,
      order,
    });
  } catch (error) {
    return res.status(500).json({
      status: false,
      message: "Server error",
      error: error.message,
    });
  }
};
