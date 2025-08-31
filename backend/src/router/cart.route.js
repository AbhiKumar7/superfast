import { Router } from "express";
import {
  addToCartItem,
  decreaseCartQuantity,
  deleteCartItem,
  getAllCartItem,
} from "../controller/cart.controller.js";
import { adminCheck, verifyuser } from "../middleware/authuser.js";

const router = Router();

router.route("/addtocart/:productId").post(verifyuser, addToCartItem);

router.route("/deletefromcart/:productId").delete(verifyuser,deleteCartItem);

router.route("/updatecart/:productId").patch(verifyuser, decreaseCartQuantity);

router.route("/getallitem").get(verifyuser,getAllCartItem);

export default router;
