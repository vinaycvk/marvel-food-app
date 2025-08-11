import { Menu } from "../models/menuModel.js";
import { Restaurant } from "../models/restaurantModel.js";


const getAllMenus = async (req, res) => {
    try {
        // Fetch all menus with restaurant details
        // Populate the restaurantId field with restaurant details
        const menus = await Menu.find();
        res.status(200).json(menus);
    } catch (error) {
        res.status(500).json({
            message: "Error fetching menus", error: error.message
        });
    }
}

const getMenuById = async (req, res) => {
    try {
        // Fetch a single menu by ID with restaurant details
        const menuId = req.params.id;
        if (!menuId) {
            return res.status(400).json({ message: "Restaurant ID is required" });
        }
        // Find the menu by ID and populate the restaurantId field
        const menu = await Menu.findById(menuId);
        if (!menu) {
            return res.status(404).json({ message: "Menu not found" });
        }
        res.status(200).json(menu);
    } catch (error) {
        res.status(500).json({ message: "Error fetching menu", error: error.message });
    }
}

const createMenu = async (req, res) => {
    try {
        // Create a new menu item
        const { name, description, price, restaurantId } = req.body;
        if (!name || !description || !price || !restaurantId) {
            return res.status(400).json({ message: "All fields are required" });
        }

        // Check if the restaurant exists
        const restaurantExists = await Restaurant.findById(restaurantId);
        if (!restaurantExists) {
            return res.status(404).json({ message: "Restaurant not found" });
        }

        const newMenu = new Menu({
            name,
            description,
            price,
            restaurantId
        });

        const savedMenu = await newMenu.save();
        res.status(201).json(savedMenu);
    } catch (error) {
        res.status(500).json({ message: "Error creating menu", error: error.message });
    }
}

const getMenuByRestuarantId = async (req, res) => {
    try {
        // Fetch all menus for a specific restaurant
        const restaurantId = req.params.restaurantId;
        if (!restaurantId) {
            return res.status(400).json({ message: "Restaurant ID is required" });
        }
        // Find menus by restaurantId and populate the restaurant details
        const menus = await Menu.find({ restaurantId });
        if (menus.length === 0) {
            return res.status(404).json({ message: "No menus found for this restaurant" });
        }
        const response = {
            menus: menus.map(menu => ({
                id: menu._id,
                name: menu.name,
                description: menu.description,
                price: menu.price,
                restaurantId: menu.restaurantId
            }))
        }
        res.status(200).json(response);
    } catch (error) {
        res.status(500).json({ message: "Error fetching menus for restaurant", error: error.message });
    }
}



export { getAllMenus,getMenuById, getMenuByRestuarantId, createMenu };