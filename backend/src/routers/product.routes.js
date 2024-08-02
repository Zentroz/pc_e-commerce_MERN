import { Router } from "express";
import verifyAuth from "../middlewares/verifyAuth.middleware.js";
import isSeller from "../middlewares/seller.middleware.js";
import { upload } from "../middlewares/multer.middleware.js";
import { addProduct, editProduct, removeProduct } from "../controllers/product.controller.js";

const router = Router()

router.route("/add-product").post(verifyAuth, isSeller, upload.array("productImages", 8), addProduct)
router.route("/remove-product").delete(verifyAuth, isSeller, removeProduct)
router.route("/edit-product").patch(verifyAuth, isSeller, editProduct)


export default router