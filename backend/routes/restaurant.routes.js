import express from "express"
import authMiddleware from "../middlewares/auth.js";
import { verifyRoles } from "../middlewares/roles.js";
import {
    getAllRestaurants,
    getRestaurantById,
    createRestaurant,
    editRestaurant,
    deleteRestaurant
} from "../controllers/restaurant.controller.js"


const router = express.Router()


router.get("/", authMiddleware, getAllRestaurants);
router.get("/:id", authMiddleware, getRestaurantById);

router.post("/", authMiddleware, verifyRoles("admin"), createRestaurant);
router.put("/:id", authMiddleware, verifyRoles("admin"), editRestaurant);
router.delete("/:id", authMiddleware, verifyRoles("admin"), deleteRestaurant);

export default router;