'use client'

import { useState, useEffect} from 'react';
import axios from 'axios';

type OrderItem = {
    menuItemId: string;
    menuItemName: string;
    quantity: number;
    _id: string;
};

type Order = {
    _id: string;
    userId: string;
    userName: string;
    items: OrderItem[];
    totalAmount: number;
    status: 'Created' | 'Confirmed' | 'Cancelled';
    paymentMethod: 'Credit Card' | 'Debit Card' | 'PayPal' | 'Cash on Delivery' | 'UPI';
};

export default function OrdersCard({ propOrders }: { propOrders: Order[] }) {
    const [orders, setOrders] = useState<Order[]>([]);

    useEffect(() => {
        setOrders(propOrders);
    }, [propOrders]);

    if (orders.length === 0) {
        return (
            <div className="min-h-screen bg-gray-100 p-6">
                <h1 className="text-2xl font-bold mb-6 text-center">No Orders Found</h1>
            </div>
        );
    }
    
    const handleStatusChange = (index: number, newStatus: Order['status']) => {
        const updatedOrders = [...orders];

        if (newStatus === 'Cancelled') {
            axios.patch(`${process.env.NEXT_PUBLIC_API_URL}/order/${updatedOrders[index]._id}/cancel`, {}, {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem('token')}`
                }
            }).then((response) => {
                console.log('Order cancelled successfully:', response.data);
                updatedOrders[index].status = newStatus;
                setOrders(updatedOrders);
                alert('Order has been cancelled successfully.');
            }).catch((error) => {
                console.error('Error cancelling order:', error);
                alert(error.response?.data?.message || 'Failed to cancel order. Please try again later.');
            });
            return; // Exit early if the order is cancelled
        }


        if (newStatus === 'Confirmed') {
            axios.patch(`${process.env.NEXT_PUBLIC_API_URL}/${updatedOrders[index]._id}/checkout`, {}, {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem('token')}`
                }
            }).then((response) => {
                console.log('Order confirmed successfully:', response.data);
                updatedOrders[index].status = newStatus;
                setOrders(updatedOrders);
                alert('Order has been confirmed successfully.');
            }).catch((error) => {
                console.error('Error confirming order:', error);
                alert(error.response?.data?.message || 'Failed to confirm order. Please try again later.');
            });
            return; // Exit early if the order is confirmed
        }
    };

    const handlePaymentMethod = (index: number, newMethod: Order['paymentMethod']) => {
        const updatedOrders = [...orders];
        

        axios.patch(`${process.env.NEXT_PUBLIC_API_URL}/${updatedOrders[index]._id}/payment-method`,
            { paymentMethod: newMethod }, {
            headers: {
                Authorization: `Bearer ${localStorage.getItem('token')}`
            }
        }).then((response) => {
            console.log('Payment method updated successfully:', response.data);
            updatedOrders[index].paymentMethod = newMethod;
            setOrders(updatedOrders);
            alert('Payment method has been updated successfully.');
        }).catch((error) => {
            console.error('Error updating payment method:', error);
            alert(error.response?.data?.message || 'Failed to update payment method. Please try again later.');
        }
        );
        return;
    };
    return (
        <div className="overflow-x-auto">
                    <table className="min-w-full bg-white rounded shadow">
                        <thead className="bg-gray-200">
                            <tr>
                                <th className="text-left py-3 px-4">S.No</th>
                                <th className="text-left py-3 px-4">Items</th>
                                <th className="text-left py-3 px-4">Total Price</th>
                                <th className="text-left py-3 px-4">Status</th>
                                <th className="text-left py-3 px-4">Actions</th>
                                <th className="text-left py-3 px-4">Payment Method</th>
                            </tr>
                        </thead>
                        <tbody>
                            {orders.map((order, index) => (
                                <tr key={order._id} className="border-t">
                                    <td className="py-2 px-4">{index + 1}</td>
                                    <td className="py-2 px-4">{[order.items.map((item) => item.menuItemName)].join(",")}</td>
                                    <td className="py-2 px-4">₹{order.totalAmount}</td>
                                    <td className="py-2 px-4">
                                        {order.status === 'Created' ? (
                                            <span className="px-2 py-1 bg-yellow-100 text-yellow-800 rounded">
                                                Order Pending
                                            </span>
                                        ) : (
                                            <span className={`px-2 py-1 rounded ${order.status === 'Confirmed' ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}`}>
                                                {order.status}
                                            </span>
                                        )}
                                    </td>
                                    <td className="py-2 px-4">
                                        <button
                                            onClick={() => handleStatusChange(index, order.status === 'Created' ? 'Confirmed' : 'Cancelled')}
                                            className={`px-3 py-1 rounded ${order.status === 'Created' ? 'bg-blue-500 text-white' : 'bg-gray-500 text-white'}`}
                                        >
                                            {order.status === 'Created' ? 'Confirm Order' : 'Cancel Order'}
                                        </button>
                                    </td>
                                    <td className="py-2 px-4">
                                        <select
                                            value={order.paymentMethod}
                                            onChange={(e) =>
                                                handlePaymentMethod(index, e.target.value as Order['paymentMethod'])
                                            }
                                            className="border rounded px-2 py-1"
                                        >
                                            <option defaultChecked value="Cash on Delivery">Cash on Delivery</option>
                                            <option value="Credit Card">Credit Card</option>
                                            <option value="Debit Card">Debit Card</option>
                                            <option value="PayPal">PayPal</option>
                                            <option value="UPI">UPI</option>
                                        </select>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
    )
}