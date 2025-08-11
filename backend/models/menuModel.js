import mongoose from "mongoose";

const menuSchema = mongoose.Schema(
    {
        name: {
            type: String,
            required: true 
        },
        description: {
            type: String,
            required: true
        },
        price: {
            type: Number,
            required: true
        },
        restaurantId: {
            type: mongoose.Schema.Types.ObjectId,   
            ref: 'Restaurant',
            required: true
        }  
    }, {
     timestamps: true
    }
)

export const Menu = mongoose.model("Menu", menuSchema);