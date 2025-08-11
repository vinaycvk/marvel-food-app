import { Order } from '../models/orderModel.js'; // Importing the Order model
import { Menu } from '../models/menuModel.js';


const createOrder = async (req, res) => {
    // Logic to create an order
    try {
        const orderData = req.body;

        const userId = req.user.id; // Assuming user ID is available in req.user
        // Validate order data
        if (!orderData || !orderData.items || orderData.items.length === 0) {
            return res.status(400).json({ error: 'Invalid order data' });
        }

        const menuItems = await Menu.find({ _id: { $in: orderData.items.map(item => item.menuItemId) } });

        if (menuItems.length !== orderData.items.length) {
            return res.status(400).json({ error: 'Some menu items are not valid', result: menuItems });
        }

        const totalAmount = orderData.items.reduce((total, item) => {
            const menuItem = menuItems.find(m => m._id.toString() === item.menuItemId);
            return total + (menuItem.price * item.quantity);
        }, 0);

        const newOrder = new Order({
            userId: userId,
            userName: orderData.userName, // Assuming user ID is available in req.user
            items: orderData.items,
            status: orderData.status || 'Created',
            paymentMethod: orderData.paymentMethod || 'Cash on Delivery',
            totalAmount: totalAmount || 0, // Default to 0 if not provided
        });

        await newOrder.save();

        res.status(201).json({ message: 'Order created successfully' });

    } catch (error) {
        console.error('Error creating order:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
}


const getOrder = async (req, res) => {
    // Logic to get an order by ID
    try {
        const userId = req.params.id;
        const order = await Order.find({userId});
        if (!order) {
            return res.status(404).json({ error: 'Order not found' });
        }
        res.status(200).json(order);
    } catch (error) {
        console.error('Error fetching order:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
}

const getAllOrders = async (req, res) => {
    // Logic to get all orders
    try {
        const orders = await Order.find();

        res.status(200).json(orders);
    } catch (error) {
        console.error('Error fetching orders:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
}

const checkOutOrder = async (req, res) => {
    // Logic to check the status of an order
    try {
        const order = await Order.findById(req.params.id);

        if (!order) return res.status(404).json({ message: 'Order not found' });

        order.status = 'Confirmed'; // Assuming 'Confirmed' is the status for a successful checkout

        await order.save();

        res.json({ message: 'Order paid', order });
    }
    catch (error) {
        console.error('Error checking order:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
}

const cancelOrder = async (req, res) => {
    // Logic to cancel an order
    try {
        const order = await Order.findById(req.params.id);

        if (!order) return res.status(404).json({ message: 'Order not found' });

        order.status = 'Cancelled';
        await order.save();

        res.json({ message: 'Order cancelled successfully', order });
    } catch (error) {
        console.error('Error cancelling order:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
}


const updatePaymentMethod = async (req, res) => {
    // Logic to update the payment method of an order
    try {
        const orderId = req.params.id;
        const { paymentMethod } = req.body;

        const order = await Order.findById(orderId);
        if (!order) {
            return res.status(404).json({ message: 'Order not found' });
        }

        order.paymentMethod = paymentMethod;
        await order.save();
        res.status(200).json({ message: 'Payment method updated successfully', order });
    } catch (error) {
        console.error('Error updating payment method:', error);
        res.status(500).json({ message: 'Internal server error', error: error.message });
    }
}

export { createOrder, getOrder, getAllOrders, checkOutOrder, cancelOrder, updatePaymentMethod };