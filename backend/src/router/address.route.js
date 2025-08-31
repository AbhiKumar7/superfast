import { Router } from "express";
import { verifyuser } from "../middleware/authuser.js";
import { addNewAddress, deleteAddress, getUserAddress, getUserAddressByAddressId, updateAddress } from "../controller/address.controller.js";


const router = Router();

router.route("/addnewaddress").post(verifyuser, addNewAddress);
router.route("/updateaddress/:addressId").patch(verifyuser, updateAddress);
router.route("/getuseraddress").get(verifyuser, getUserAddress);
router.route("/getuseraddressbyaddressid/:addressId").get(verifyuser, getUserAddressByAddressId);
router.route("/deleteaddress/:addressId").delete(verifyuser, deleteAddress);

export default router;
