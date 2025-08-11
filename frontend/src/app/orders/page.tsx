'use client'

import { useState, useEffect } from 'react';
import axios from 'axios';
import Link from 'next/link';
import HeaderBar from '../components/HeaderBar';
import OrdersCard from '../components/OrdersCard';

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

export default function OrdersPage() {
    const [orders, setOrders] = useState<Order[]>([]);
    const [userName, setUserName] = useState<string>('User');


    useEffect(() => {

        const userId = localStorage.getItem('userId');
        const userName = localStorage.getItem('userName');
        setUserName(userName || 'User');

        if (!userId) {
            alert('User ID not found. Please log in again.');
            return;
        }

        axios.get(`${process.env.NEXT_PUBLIC_API_URL}/order/${userId}`, {
            headers: {
                Authorization: `Bearer ${localStorage.getItem('token')}`
            }
        })
            .then((response) => {
                setOrders(response.data);
                console.log('Orders fetched successfully:', response.data);
            })
            .catch((error) => {
                console.error('Error fetching orders:', error);
                alert('Failed to load orders. Please try again later.');
            });
    }, []);

    if (orders.length === 0) {
        return (
            <div className="min-h-screen bg-gray-100 p-6">
                <h1 className="text-2xl font-bold mb-6 text-center">No Orders Found</h1>
            </div>
        );
    }
    return (
        <div>
            <HeaderBar />
            <div className="min-h-screen bg-gray-100 p-6">
                <div className="mb-6 flex justify-center" >
                    <h1 className="text-2xl font-bold mb-6"> {userName}'s Orders List</h1>
                </div>
                <Link href="/restaurants" className="text-blue-600 underline mb-4 block">Go Back</Link>
                <OrdersCard propOrders={orders} />
            </div>
        </div>
    );
}
