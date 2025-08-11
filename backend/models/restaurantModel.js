import mongoose from "mongoose";

const restaurantSchema = mongoose.Schema(
    {
        name: {
            type: String,
            required: true          
        },
        country: {
            type: String,          
            required: true
        }, image: {
            type: String,
            required: true
        }
    }, {
        timestamps: true    
    }
)


export const Restaurant = mongoose.model("Restaurant", restaurantSchema);