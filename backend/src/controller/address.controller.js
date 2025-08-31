import AddressModel from "../models/addressModel/address.Model.js";
import UserModel from "../models/userModel/user.model.js";

export const addNewAddress = async (req, res) => {
  try {
    const { house_no, city, state, pincode, nearby, name } = req.body;

    // 🔹 Validate required fields
    if (!house_no || !city || !state || !pincode || !nearby || !name) {
      let missingFields = [];
      if (!house_no) missingFields.push("house_no");
      if (!city) missingFields.push("city");
      if (!state) missingFields.push("state");
      if (!pincode) missingFields.push("pincode");
      if (!nearby) missingFields.push("nearby");
      if (!name) missingFields.push("name");

      return res.status(400).json({
        status: false,
        error: "failed in adding address",
        message: `${missingFields.join(", ")} field is required`,
      });
    }

    // 🔹 Check if address already exists
    let existingAddress = await AddressModel.findOne({
      house_no,
      userId: req.user?._id, // make sure it's per-user
    });

    if (existingAddress) {
      return res
        .status(400)
        .json({ status: false, message: "Address already exists" });
    }

    // 🔹 Create new address
    let newAddress = await AddressModel.create({
      house_no,
      city,
      state,
      pincode,
      nearby,
      name,
      userId: req.user?._id,
    });

    if (!newAddress) {
      return res.status(400).json({
        status: false,
        message: "Something went wrong while creating new address",
      });
    }

    // 🔹 Save reference in user collection
    const user = await UserModel.findById(req.user?._id);
    if (!user) {
      return res.status(404).json({ status: false, message: "User not found" });
    }

    user.address_details.push(newAddress._id); // store reference
    await user.save();

    return res.status(201).json({
      status: true,
      message: "Address created successfully",
      data: newAddress,
    });
  } catch (error) {
    return res.status(500).json({
      status: false,
      message: error.message,
    });
  }
};


export const updateAddress = async (req, res) => {
  try {
    const { addressId } = req.params;
    const { house_no, city, state, pincode, nearby, name } = req.body;
    if (!house_no || !city || !state || !pincode || !nearby || !name) {
      let missingFields = [];
      if (!house_no) missingFields.push("house_no");
      if (!city) missingFields.push("city");
      if (!state) missingFields.push("state");
      if (!pincode) missingFields.push("pincode");
      if (!nearby) missingFields.push("nearby");
      if (!name) missingFields.push("name");

      return res.status(400).json({
        status: false,
        error: "failed in adding product",
        message: `${missingFields.join(",")} product field is required`,
      });
    }

    const address = await AddressModel.findById(addressId);
    if (!address) {
      return res.status(404).json({
        status: false,
        message: "Address not found",
      });
    }
    address.house_no = house_no;
    address.city = city;
    address.state = state;
    address.pincode = pincode;
    address.nearby = nearby;
    address.name = name;

    await address.save();
    return res.status(200).json({
      status: true,
      message: "Address updated successfully",
      address,
    });
  } catch (error) {
    return res.status(500).json({
      status: false,
      message: "Server error",
      error: error.message,
    });
  }
};

export const getUserAddress = async (req, res) => {
  try {
    const address = await AddressModel.find({ userId: req.user._id });
    if (!address) {
      return res.status(404).json({
        status: false,
        message: "Address not found",
      });
    }
    return res.status(200).json({
      status: true,
      message: "fetch all user address successfully",
      address,
    });
  } catch (error) {
    return res.status(500).json({
      status: false,
      message: "Server error",
      error: error.message,
    });
  }
};

export const getUserAddressByAddressId = async (req, res) => {
  try {
    const {addressId} = req.params
    const address = await AddressModel.findById(addressId);
    if (!address) {
      return res.status(404).json({
        status: false,
        message: "Address not found",
      });
    }
    return res.status(200).json({
      status: true,
      message: "fetch user address successfully",
      address,
    });
  } catch (error) {
    return res.status(500).json({
      status: false,
      message: "Server error",
      error: error.message,
    });
  }
};
export const deleteAddress = async (req, res) => {
  try {
    const { addressId } = req.params;

   
    const address = await AddressModel.findById(addressId);
    if (!address) {
      return res.status(404).json({
        status: false,
        message: "Address not found",
      });
    }

  
    if (address.userId.toString() !== req.user._id.toString()) {
      return res.status(403).json({
        status: false,
        message: "Not authorized to delete this address",
      });
    }

   
    await address.deleteOne();

    
    await UserModel.findByIdAndUpdate(req.user._id, {
      $pull: { address_details: address._id },
    });

    return res.status(200).json({
      status: true,
      message: "Address deleted successfully",
      address,
    });
  } catch (error) {
    return res.status(500).json({
      status: false,
      message: "Server error",
      error: error.message,
    });
  }
};

