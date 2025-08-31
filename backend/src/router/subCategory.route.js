import { Router } from "express";

import { adminCheck, verifyuser } from "../middleware/authuser.js";
import { upload } from "../middleware/multer.middleware.js";
import { addSubCategory, deleteSubcategory, getAllSubCategory, updatesubcategory } from "../controller/subCategory.controller.js";

const router = Router();

router.route("/addsubcategory/:categoryId").post(upload.single("image"),verifyuser,adminCheck,addSubCategory)
router.route("/getallsubcategory").get(getAllSubCategory)
router.route("/updatesubcategory/:subCategoryId").patch(upload.single("image"),verifyuser,adminCheck,updatesubcategory)
router.route("/deletesubcategory/:subCategoryId").delete(verifyuser,adminCheck,deleteSubcategory)


export default router;
