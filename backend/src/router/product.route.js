import { Router } from "express";
import { adminCheck, verifyuser } from "../middleware/authuser.js";
import {
  addProduct,
  deleteProduct,
  getAllProduct,
  getProductById,
  updateProduct,
} from "../controller/product.controller.js";
import { upload } from "../middleware/multer.middleware.js";

const router = Router();
router
  .route("/addproduct/:categoryId/:subCategoryId")
  .post(upload.array("images", 5), verifyuser, adminCheck, addProduct);

router
  .route("/deleteproduct/:productId")
  .delete(verifyuser, adminCheck, deleteProduct);

router.route("/getallproduct").get(getAllProduct);
router.route("/getproductbyid/:productId").get(getProductById);

router
  .route("/updateproduct/:productId")
  .patch(upload.array("images", 5), verifyuser, adminCheck, updateProduct);
export default router;
