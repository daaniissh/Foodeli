import express from "express";
import {
  ProfileUpdate,
  UserLogin,
  UserRegister,
  addToCart,
  addToFavourites,
  getAllCartItems,
  getAllFavourites,
  getAllOrders,
  placeOrder,
  removeFromCart,
  removeFromFavourites,
} from "../controllers/User.js";
import { verifyToken } from "../middleware/verifyUser.js";

const router = express.Router();

router.post("/signup", UserRegister);
router.post("/signin", UserLogin);

router.post("/cart", verifyToken, addToCart);
router.get("/cart", verifyToken, getAllCartItems);
router.patch("/cart", verifyToken, removeFromCart);

router.post("/favourite", verifyToken, addToFavourites);
router.get("/favourite", verifyToken, getAllFavourites);
router.patch("/favourite", verifyToken, removeFromFavourites);

router.post("/order", verifyToken, placeOrder);
router.get("/order", verifyToken, getAllOrders);
router.put("/profile", verifyToken, ProfileUpdate);

export default router;
