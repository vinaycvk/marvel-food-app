import { Restaurant } from "../models/restaurantModel.js";


const getAllRestaurants = async (req, res) => {
    try {
        // Fetch all restaurants
        const query = {};

        if (req.user.role !== 'admin') {
            if (!req.user.country) {
                return res.status(403).json({ message: "Access denied: Country not specified" });
            }
            query.country = req.user.country; // Filter by user's country if not admin  
        }

        const restaurants = await Restaurant.find(query);
        if (restaurants.length === 0) { 
            return res.status(404).json({ message: "No restaurants found" });
        }
        // Format the response
        res.status(200).json(restaurants);
    } catch (error) {
        res.status(500).json({ message: "Error fetching restaurants", error: error.message });
    }
}


const getRestaurantById = async (req, res) => {
    try {
        // Fetch a single restaurant by ID
        const { country, role } = req.user; // Get user's country from the request
        
        const query = {}

        if (role !== 'admin') {
            if (!country) {
                return res.status(403).json({ message: "Access denied: Country not specified" });
            }
            query.country = country; // Filter by user's country if not admin
        }

        const restaurantId = req.params.id;
        if (!restaurantId) {
            return res.status(400).json({ message: "Restaurant ID is required" });
        }
        // Find the restaurant by ID and apply country filter if not admin
        const restaurant = await Restaurant.findOne({ _id: restaurantId, ...query });
        if (!restaurant) {
            return res.status(404).json({ message: "Restaurant not found" });
        }
        res.status(200).json(restaurant);
     
    } catch (error) {
        res.status(500).json({ message: "Error fetching restaurant", error: error.message });
    }
}

const createRestaurant = async (req, res) => {
    try {
        // Create a new restaurant
        const { name, country, image } = req.body;
        if (!name || !country || image) {
            return res.status(400).json({ message: "All fields are required" });
        }

        const newRestaurant = new Restaurant({
            name,
            country,
            image
        });

        const savedRestaurant = await newRestaurant.save();
        res.status(201).json(savedRestaurant);
    } catch (error) {
        res.status(500).json({ message: "Error creating restaurant", error: error.message });
    }
}


const editRestaurant = async (req, res) => {
    try {
        // Edit an existing restaurant
        const restaurantId = req.params.id;
        const { name, country } = req.body;

        if (!restaurantId) {
            return res.status(400).json({ message: "Restaurant ID is required" });
        }
        
        const updatedRestaurant = await Restaurant.findByIdAndUpdate(restaurantId, { name, country }, { new: true });
        if (!updatedRestaurant) {
            return res.status(404).json({ message: "Restaurant not found" });
        }
        res.status(200).json(updatedRestaurant);
    } catch (error) {
        res.status(500).json({ message: "Error updating restaurant", error: error.message });
    }
}


const deleteRestaurant = async (req, res) => {
    try {
        // Delete a restaurant
        const restaurantId = req.params.id;

        if (!restaurantId) {
            return res.status(400).json({ message: "Restaurant ID is required" });
        }

        const deletedRestaurant = await Restaurant.findByIdAndDelete(restaurantId);
        if (!deletedRestaurant) {
            return res.status(404).json({ message: "Restaurant not found" });
        }
        res.status(200).json({ message: "Restaurant deleted successfully" });
    } catch (error) {
        res.status(500).json({ message: "Error deleting restaurant", error: error.message });
    }
}


export { getAllRestaurants, getRestaurantById, createRestaurant, editRestaurant, deleteRestaurant };