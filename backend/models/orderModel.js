import mongoose from "mongoose";



const orderSchema = mongoose.Schema(
    {
        userId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User',
            required: true
        },
        userName: {
            type: String,
            required: true
        },
        items: [
            {
                menuItemId: {
                    type: mongoose.Schema.Types.ObjectId,
                    ref: 'MenuItem',
                    required: true
                },
                menuItemName: {
                    type: String,
                    required: true
                },
                quantity: {
                    type: Number,
                    required: true,
                    min: 1
                }
            }
        ],
        status: {
            type: String,
            enum: ['Created', 'Confirmed', 'Cancelled'],
            default: 'Created',
            required: true
        },
        paymentMethod: {
            type: String,
            enum: ['Credit Card', 'Debit Card', 'PayPal', 'Cash on Delivery', 'UPI'],
            default: 'Cash on Delivery',
            required: true
        },
        totalAmount: {
            type: Number,
            required: true
        },
    },
    {
        timestamps: true
    }
)


export const Order = mongoose.model("Order", orderSchema);