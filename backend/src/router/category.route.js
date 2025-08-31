import { Router } from "express";
import { upload } from "../middleware/multer.middleware.js";
import {
  addCategory,
  deleteCategory,
  getAllCategory,
  updateCategory,
} from "../controller/category.controller.js";
import { adminCheck, verifyuser } from "../middleware/authuser.js";

const router = Router();
router
  .route("/addcategory")
  .post(upload.single("image"), verifyuser, adminCheck, addCategory);

router.route("/getallcategory").get( getAllCategory);

router
  .route("/updatecategory/:categoryId")
  .patch(upload.single("image"), verifyuser, adminCheck, updateCategory);

router.route("/deletecategory/:categoryId").delete(verifyuser, adminCheck, deleteCategory);


export default router;
