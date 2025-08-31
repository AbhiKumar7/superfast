import mongoose from "mongoose";
import jwt from "jsonwebtoken";
const userSchema = new mongoose.Schema(
  {
    mobile: {
      type: String,
      required: true,
      unique: true,
      match: [/^\d{10}$/, "Mobile number must be exactly 10 digits"],
    },

    refresh_token: {
      type: String,
      default: "",
    },

    last_login_date: {
      type: Date,
      default: "",
    },
    status: {
      type: String,
      enum: ["Active", "Inactive", "Suspended"],
      default: "Active",
    },
    address_details: [
      {
        type: mongoose.Schema.ObjectId,
        ref: "Address",
      },
    ],
    shopping_cart: [
      {
        type: mongoose.Schema.ObjectId,
        ref: "CartProduct",
      },
    ],
    orderHistory: [
      {
        type: mongoose.Schema.ObjectId,
        ref: "Order",
      },
    ],
    otp: {
      type: String,
      default: null,
    },
    otp_expiry: {
      type: Date,
      default: null,
    },
    role: {
      type: String,
      enum: ["ADMIN", "USER"],
      default: "USER",
    },
  },
  {
    timestamps: true,
  }
);

userSchema.methods.generateRefreshToken = async function () {
  let refreshToken = jwt.sign(
    {
      _id: this._id,
      mobile: this.mobile,
      role: this.role,
    },
    process.env.REFRESH_TOKEN,
    { expiresIn: process.env.REFRESH_TOKEN_EXPIRY }
  );

  return refreshToken;
};

userSchema.methods.generateAccessToken = async function () {
  let accessToken = jwt.sign(
    {
      _id: this._id,
    },
    process.env.ACCESS_TOKEN,
    { expiresIn: process.env.ACCESS_TOKEN_EXPIRY }
  );

  return accessToken;
};
const UserModel = mongoose.model("User", userSchema);

export default UserModel;
