import express from "express";
import { getAllMenus, getMenuByRestuarantId, getMenuById, createMenu } from "../controllers/menu.controller.js";
import authMiddleware from "../middlewares/auth.js"; // Assuming you have an auth middleware for authentication
import { verifyRoles } from "../middlewares/roles.js";

const router = express.Router();


router.get("/", authMiddleware, getAllMenus);
router.get("/:id", authMiddleware, getMenuById);
router.get("/restaurant/:restaurantId", getMenuByRestuarantId);
router.post("/", authMiddleware, verifyRoles("admin"), createMenu);


export default router;