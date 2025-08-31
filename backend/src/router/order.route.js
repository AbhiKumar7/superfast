import { Router } from "express";
import { verifyuser } from "../middleware/authuser.js";
import { ChangeOrderStatus, createNewOrder, getAllOrder, getAllOrdersByAdmin } from "../controller/order.controller.js";


const router = Router();
router.route("/createneworder/:delivery_address").post(verifyuser, createNewOrder)
router.route("/getallorders").get(verifyuser, getAllOrder)
router.route("/getallordersbyadmin").get(verifyuser, getAllOrdersByAdmin)
router.route("/changeorderstatus/:orderId").post(verifyuser, ChangeOrderStatus)

export default router;
