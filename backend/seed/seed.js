import mongoose from "mongoose";
import dbconnect from "../config/db.js";
import { Menu } from "../models/menuModel.js";
import { Restaurant } from "../models/restaurantModel.js";
import { User } from "../models/userModel.js";
import bcrypt from "bcrypt";



dbconnect();

const seedData = async () => {
    try {
        // Clear existing data
        await Restaurant.deleteMany({});
        await Menu.deleteMany({});
        await User.deleteMany({});

        // Create sample users
        // Hash the password for security
        const setPassword = async (name) => {
            let password = name.toLowerCase().replace(/\s+/g, '');
            password = `${password}123`; // Example password format
            console.log("Setting password for:", name, "Password:", password);
            return await bcrypt.hash(password, 10); // Hash the password with bcrypt
        }

        const users = [
            { name: "Nick Fury", role: "admin", country: "India", email: "nick@example.com" },
            { name: "Captain Marvel", role: "manager", country: "India", email: "marvel@example.com" },
            { name: "Captain America", role: "manager", country: "America", email: "america@example.com" },
            { name: "Thanos", role: "member", country: "India", email: "thanos@example.com" },
            { name: "Thor", role: "member", country: "India", email: "thor@example.com" },
            { name: "Travis", role: "member", country: "America", email: "travis@example.com" },
        ];

        const hashedUsers = await Promise.all(
            users.map(async user => {
                const hashedPassword = await setPassword(user.name);
                return {
                    ...user,
                    password: hashedPassword,
                };
            })
        );

        console.log("Hashed Users:", hashedUsers);
        // Insert users into the databas
        const savedUsers = await User.insertMany(hashedUsers);

        // Create sample restaurants
        const restaurants = [
            // India
            { name: "Indian Spice", country: "India", image: "https://cdn.pixabay.com/photo/2016/06/20/07/02/hot-1468148_1280.png" },
            { name: "Tandoori Tales", country: "India", image: "https://images.pexels.com/photos/106343/pexels-photo-106343.jpeg" },
            { name: "Curry Mahal", country: "India", image: "https://cdn.prod.website-files.com/63f3d769ea1c3e62c42a4c7b/63f778323a274752b565701c_mahal-brand-identity.jpg" },
            { name: "Spice Route", country: "India", image: "https://s3-ap-southeast-1.amazonaws.com/assets.limetray.com/assets/user_images/logos/original/1505988285_Logo.png" },
            { name: "Bombay Biryani House", country: "India", image: "https://img.cdn4dd.com/cdn-cgi/image/fit=contain,width=3000,height=500,format=auto/https://doordash-static.s3.amazonaws.com/media/restaurant/cover_square/b8cf1ebf-7640-4469-9829-d6286ee9d6ee.jpg" },

            // America (USA)
            { name: "Burger Town", country: "America", image: "https://cdn.pixabay.com/photo/2017/01/31/18/56/burger-2026410_1280.png" },
            { name: "Steak House Grill", country: "America", image: "https://cdn.pixabay.com/photo/2018/02/08/15/02/meat-3139641_1280.jpg" },
            { name: "Pancake Paradise", country: "America", image: "https://images.pexels.com/photos/376464/pexels-photo-376464.jpeg" },
            { name: "Smokey BBQ Shack", country: "America", image: "https://cdn.pixabay.com/photo/2015/02/16/17/48/meat-638644_1280.jpg" },
            { name: "Cheesy Pizza Hub", country: "America", image: "https://cdn.pixabay.com/photo/2017/12/09/08/18/pizza-3007395_1280.jpg" }
        ];


        const savedRestaurants = await Restaurant.insertMany(restaurants);

        // Create sample menus
        // Assuming savedRestaurants[0] to savedRestaurants[4] are Indian
        // and savedRestaurants[5] to savedRestaurants[9] are American

        const menuItems = [
            // ---------- Indian Restaurants ----------
            // Indian Spice
            {
                name: "Butter Chicken",
                description: "Creamy and rich butter chicken with aromatic spices",
                price: 12.99,
                restaurantId: savedRestaurants[0]._id
            },
            {
                name: "Paneer Tikka",
                description: "Grilled paneer cubes marinated in yogurt and spices",
                price: 10.99,
                restaurantId: savedRestaurants[0]._id
            },
            {
                name: "Tandoori Chicken",
                description: "Spicy grilled chicken marinated in yogurt and spices",
                price: 11.99,
                restaurantId: savedRestaurants[0]._id
            },
            {
                name: "Garlic Naan",
                description: "Freshly baked naan bread topped with garlic butter",
                price: 2.99,
                restaurantId: savedRestaurants[0]._id
            },

            // Tandoori Tales
            {
                name: "Chicken Biryani",
                description: "Fragrant basmati rice cooked with chicken and spices",
                price: 13.49,
                restaurantId: savedRestaurants[1]._id
            },
            {
                name: "Veg Samosa",
                description: "Crispy pastry filled with spiced potatoes and peas",
                price: 4.99,
                restaurantId: savedRestaurants[1]._id
            },
            {
                name: "Dal Makhani",
                description: "Slow-cooked black lentils in a creamy tomato sauce",
                price: 9.99,
                restaurantId: savedRestaurants[1]._id
            },

            // Curry Mahal
            {
                name: "Rogan Josh",
                description: "Tender lamb cooked in aromatic curry sauce",
                price: 14.99,
                restaurantId: savedRestaurants[2]._id
            },
            {
                name: "Prawn Masala",
                description: "Prawns cooked in spiced tomato-based sauce",
                price: 15.99,
                restaurantId: savedRestaurants[2]._id
            },
            {
                name: "Aloo Gobi",
                description: "Cauliflower and potatoes cooked with turmeric and spices",
                price: 8.49,
                restaurantId: savedRestaurants[2]._id
            },

            // Spice Route
            {
                name: "Mutton Korma",
                description: "Slow-cooked mutton in a rich nut-based curry",
                price: 16.49,
                restaurantId: savedRestaurants[3]._id
            },
            {
                name: "Chole Bhature",
                description: "Spiced chickpeas served with fluffy fried bread",
                price: 7.99,
                restaurantId: savedRestaurants[3]._id
            },
            {
                name: "Fish Curry",
                description: "Fresh fish cooked in a tangy coconut-based sauce",
                price: 12.99,
                restaurantId: savedRestaurants[3]._id
            },

            // Bombay Biryani House
            {
                name: "Hyderabadi Biryani",
                description: "Authentic biryani with saffron-infused rice and spices",
                price: 14.99,
                restaurantId: savedRestaurants[4]._id
            },
            {
                name: "Chicken Kebab",
                description: "Juicy skewered chicken grilled to perfection",
                price: 9.99,
                restaurantId: savedRestaurants[4]._id
            },
            {
                name: "Raita",
                description: "Cool yogurt sauce with cucumber and spices",
                price: 3.49,
                restaurantId: savedRestaurants[4]._id
            },

            // ---------- American Restaurants ----------
            // Burger Town
            {
                name: "Cheeseburger",
                description: "Juicy beef patty with cheese, lettuce, and tomato",
                price: 9.99,
                restaurantId: savedRestaurants[5]._id
            },
            {
                name: "French Fries",
                description: "Crispy golden fries",
                price: 3.99,
                restaurantId: savedRestaurants[5]._id
            },
            {
                name: "Onion Rings",
                description: "Crispy battered onion rings served with dip",
                price: 4.49,
                restaurantId: savedRestaurants[5]._id
            },

            // Steak House Grill
            {
                name: "Ribeye Steak",
                description: "Tender ribeye steak grilled to your liking",
                price: 24.99,
                restaurantId: savedRestaurants[6]._id
            },
            {
                name: "Mashed Potatoes",
                description: "Creamy buttery mashed potatoes",
                price: 5.99,
                restaurantId: savedRestaurants[6]._id
            },
            {
                name: "Caesar Salad",
                description: "Fresh romaine lettuce with Caesar dressing and croutons",
                price: 7.99,
                restaurantId: savedRestaurants[6]._id
            },

            // Pancake Paradise
            {
                name: "Blueberry Pancakes",
                description: "Fluffy pancakes topped with fresh blueberries and syrup",
                price: 8.99,
                restaurantId: savedRestaurants[7]._id
            },
            {
                name: "Maple Syrup Waffles",
                description: "Golden waffles drizzled with maple syrup",
                price: 7.49,
                restaurantId: savedRestaurants[7]._id
            },
            {
                name: "Scrambled Eggs",
                description: "Creamy scrambled eggs with herbs",
                price: 4.99,
                restaurantId: savedRestaurants[7]._id
            },

            // Smokey BBQ Shack
            {
                name: "BBQ Ribs",
                description: "Slow-cooked pork ribs with smoky BBQ sauce",
                price: 19.99,
                restaurantId: savedRestaurants[8]._id
            },
            {
                name: "Coleslaw",
                description: "Fresh shredded cabbage salad with creamy dressing",
                price: 3.99,
                restaurantId: savedRestaurants[8]._id
            },
            {
                name: "Cornbread",
                description: "Moist cornbread baked to golden perfection",
                price: 4.49,
                restaurantId: savedRestaurants[8]._id
            },

            // Cheesy Pizza Hub
            {
                name: "Pepperoni Pizza",
                description: "Thin crust pizza topped with cheese and pepperoni",
                price: 12.49,
                restaurantId: savedRestaurants[9]._id
            },
            {
                name: "Garlic Bread",
                description: "Crispy bread slices with garlic butter",
                price: 4.49,
                restaurantId: savedRestaurants[9]._id
            },
            {
                name: "Mozzarella Sticks",
                description: "Deep-fried mozzarella sticks served with marinara sauce",
                price: 6.99,
                restaurantId: savedRestaurants[9]._id
            }
        ];

        await Menu.insertMany(menuItems);

        console.log("Database seeded successfully!");
        process.exit(0);
    } catch (error) {
        console.error("Error seeding database:", error);
    }
}

seedData()