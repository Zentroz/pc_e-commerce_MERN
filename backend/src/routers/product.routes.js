import { Router } from "express";
import verifyAuth from "../middlewares/verifyAuth.middleware.js";
import isSeller from "../middlewares/seller.middleware.js";
import { upload } from "../middlewares/multer.middleware.js";
import { addProduct, editProduct, getUserProducts, removeProduct, searchProduct, getProductById } from "../controllers/product.controller.js";

const router = Router()

router.route("/add-product").post(verifyAuth, isSeller, upload.array("productImages", 8), addProduct)
router.route("/remove-product").delete(verifyAuth, isSeller, removeProduct)
router.route("/edit-product").patch(verifyAuth, isSeller, editProduct)
router.route("/get-user-products").get(verifyAuth, getUserProducts)
router.route("/search/:content").get(searchProduct)
router.route("/:prodid").get(getProductById)


export default router