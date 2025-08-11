import express from "express";
import authMiddleware from "../middlewares/auth.js"; // Assuming you have an auth middleware for authentication
import {
    createOrder,
    getOrder,
    getAllOrders,
    checkOutOrder,
    cancelOrder,
    updatePaymentMethod
} from "../controllers/order.controller.js";
import { verifyRoles } from "../middlewares/roles.js";


const router = express.Router();


router.get("/:id", authMiddleware, getOrder);
router.get("/", authMiddleware, getAllOrders);
router.post("/", authMiddleware, createOrder);
router.patch("/:id/checkout", authMiddleware, verifyRoles("admin", "manager"), checkOutOrder);
router.patch("/:id/cancel", authMiddleware, verifyRoles("admin", "manager"), cancelOrder);
router.patch("/:id/payment-method", authMiddleware, verifyRoles("admin"), updatePaymentMethod);

export default router;