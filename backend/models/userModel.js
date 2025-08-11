import mongoose from "mongoose";


const userSchema = mongoose.Schema(
    {
        name: {
            type: String,
            required: true  
        },
        email: {
            type: String,
            required: true,
        },
        password: {
            type: String,
            required: true
        },  
        role: {
            type: String,
            enum: ['manager', 'admin', 'member'],
            default: 'member'
        },
        country: {
            type: String,
            enum: ['India', 'America'],
        }
    }, {
        timestamps: true,
        collection: 'users_v2'  // Specify the collection name explicitly        
    }
)


export const User = mongoose.model("User", userSchema);