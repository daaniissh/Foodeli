import express from "express"
import { addProduct, getFoodById, getFoodItems } from "../controllers/Food.js"

const router = express.Router()

router.post("/add",addProduct)
router.get("/",getFoodItems)
router.get("/:id",getFoodById)
export default router