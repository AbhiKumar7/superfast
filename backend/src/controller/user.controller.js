import AddressModel from "../models/addressModel/address.Model.js";
import CartProductModel from "../models/cartmodel/cart.model.js";
import OrderModel from "../models/orderModel/order.Model.js";
import UserModel from "../models/userModel/user.model.js";
import { generateOTP } from "../utils/generateOtp.js";
import { generateToken } from "../utils/generateToken.js";

export const registerNewUser = async (req, res) => {
  try {
    const { mobile, role } = req.body;
    if (!mobile) {
      return res.status(400).json({ message: "Enter mobile" });
    }
    if (!role) {
      return res.status(400).json({ message: "Select role" });
    }
    const mobileExit = await UserModel.findOne({ mobile });
    if (mobileExit) {
      return res
        .status(400)
        .json({ message: " This mobile number already registered" });
    }
    const otp = generateOTP();
    const otpExpiry = new Date(Date.now() + 5 * 60 * 1000);
    if (mobileExit) {
      (mobileExit.otp = otp), (mobileExit.otp_expiry = otpExpiry);
    } else {
      await UserModel.create({
        otp,
        mobile,
        role,
        otp_expiry: otpExpiry,
      });
    }
    res.cookie("mobile", mobile, {
      httpOnly: true,
      secure: true,
      sameSite: "None",
      maxAge: 5 * 60 * 1000, // 5 min
    });
    return res.status(200).json({
      status: true,
      otp: otp,
      message: "OTP sent successfully",
    });
  } catch (error) {
    return res
      .status(500)
      .json({ status: false, message: "Server error", error: error.message });
  }
};

export const verifyOtp = async (req, res) => {
  try {
    const { otp } = req.body;
    const mobile = req.cookies.mobile;
    if (!mobile) {
      return res
        .status(400)
        .json({ message: "Session expired. Please try again." });
    }
    const user = await UserModel.findOne({ mobile });

    if (!user || user.otp !== otp || user.otp_expiry < new Date()) {
      return res.status(400).json({ message: "Invalid or expired OTP" });
    }
    user.otp = null;
    user.otp_expiry = null;
    await user.save();

    let { refreshToken, accessToken } = await generateToken(user?._id);

    let options = {
      httpOnly: true,
      secure: true,
      sameSite: "None",
    };

    res.cookie("accesstoken", accessToken, options);
    res.cookie("refreshToken", refreshToken, options);
    res.clearCookie("mobile");
    return res.status(200).json({
      status: true,
      message: "OTP verified and login successful",
      accessToken,
      refreshToken,
      user: {
        _id: user._id,
        mobile: user.mobile,
        role: user.role,
      },
    });
  } catch (error) {
    return res.status(500).json({
      status: false,
      message: "Server error",
      error: error.message,
    });
  }
};

export const loginUser = async (req, res) => {
  try {
    const { mobile } = req.body;

    if (!mobile) {
      return res.status(400).json({ message: "Enter mobile number" });
    }

    const user = await UserModel.findOne({ mobile });
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    const otp = generateOTP();
    const otpExpiry = new Date(Date.now() + 5 * 60 * 1000); // 5 minutes

    user.otp = otp;
    user.otp_expiry = otpExpiry;
    await user.save();

    res.cookie("mobile", mobile, {
      httpOnly: true,
      secure: true,
      sameSite: "None",
      maxAge: 5 * 60 * 1000, // 5 min
    });

    return res.status(200).json({
      status: true,
      otp: otp,
      message: "OTP sent to your mobile number",
    });
  } catch (error) {
    return res.status(500).json({
      status: false,
      message: "Server error",
      error: error.message,
    });
  }
};

export const logoutUser = async (req, res) => {
  try {
    await UserModel.findByIdAndUpdate(req.user?._id, {
      refresh_token: "",
    });
    const options = {
      httpOnly: true,
      secure: true,
      sameSite: "None",
    };
    return res
      .status(201)
      .clearCookie("accesstoken", options)
      .clearCookie("refreshToken", options)
      .json({ status: true, message: "logout successfully" });
  } catch (error) {
    return res.status(500).json({
      status: false,
      message: "Server error",
      error: error.message,
    });
  }
};

export const getUserDetails = async (req, res) => {
  try {
    // ✅ Find user details
    const user = await UserModel.findById(req.user._id).select(
      "-password -refreshToken"
    );

    if (!user) {
      return res.status(404).json({
        status: false,
        message: "User not found",
      });
    }

    const orders = await CartProductModel.find({
      userId: req.user._id,
    }).populate("productId");
    if (!orders) {
      return res.status(404).json({
        status: false,
        message: "cart not found",
      });
    }
    const address = await AddressModel.find({ userId: req.user._id });
    if (!address) {
      return res.status(404).json({
        status: false,
        message: "address not found",
      });
    }
    return res.status(200).json({
      status: true,
      user,
      orders,
      address,
      message: "Fetched user details successfully",
    });
  } catch (error) {
    return res.status(500).json({
      status: false,
      message: "Server error",
      error: error.message,
    });
  }
};
