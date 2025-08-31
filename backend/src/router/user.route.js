import { Router } from "express";
import { getUserDetails, loginUser, logoutUser, registerNewUser, verifyOtp } from "../controller/user.controller.js";
import { verifyuser } from "../middleware/authuser.js";

const router = Router()

router.route("/registeruser").post(registerNewUser)
router.route("/verifyotp").post(verifyOtp)
router.route("/login").post(loginUser)
router.route("/logout").post(verifyuser,logoutUser)
router.route("/getuserdetils").get(verifyuser,getUserDetails)

export default router