import UserModel from "../models/userModel/user.model.js";
export const generateToken = async (userId) => {
  let user = await UserModel.findById(userId);
  if (!user) {
    return res.status(400).json({ message: "user not found" });
  }

  let refreshToken = await user.generateRefreshToken();
  let accessToken = await user.generateAccessToken();
  user.refresh_token = refreshToken;

  await user.save({ validateBeforeSave: true });
  return { refreshToken, accessToken };
};
