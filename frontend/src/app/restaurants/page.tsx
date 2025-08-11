'use client';
import React, { useState, useEffect, use } from 'react';
import { useRouter } from 'next/navigation';
import Spinner from '../components/spinner';
import axios from 'axios';
import RestaurantCard from '@/app/components/RestaurantCard';
import HeaderBar from '../components/HeaderBar';

type Restaurant = {
    _id: string;
    name: string;
    country: string;
    image: string
};


export default function RestaurantsPage() {
    const router = useRouter();
    const [loading, setLoading] = useState(true);
    const [restaurants, setRestaurants] = useState<Restaurant[]>([]);


    useEffect(() => {
        setLoading(true);
        const token = localStorage.getItem('token');
        if (!token) {
            router.push('/login');
            return;
        }
        axios.get(`${process.env.NEXT_PUBLIC_API_URL}/restaurant`, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        })
            .then((response) => {
                setRestaurants(response.data);
                setLoading(false);
            })
            .catch((error) => {
                console.error('Error fetching restaurants:', error);
                setLoading(false);
                alert('Failed to load restaurants. Please try again later.');
            });
    }, []);


    return (
        <div>
            <HeaderBar />
            <div className="min-h-screen bg-gray-100 p-8">
                <h1 className="text-3xl font-bold mb-6 text-center">Restaurants</h1>

                {loading ? (
                    <Spinner />
                ) : restaurants.length === 0 ? (
                    <p className="text-center text-gray-600">No restaurants found.</p>
                ) : (
                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
                        {restaurants.map((restaurant) => (
                            <RestaurantCard key={restaurant._id} restaurant={restaurant} />
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
}
