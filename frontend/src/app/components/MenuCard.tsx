
'use client'
import axios from "axios";

import  { useEffect, useState } from "react";
import { useCart } from "@/app/context/CartContext";
import Spinner from "@/app/components/spinner";

type MenuItem = {
    id: string;
    name: string;
    description: string;
    price: number;
}


export default function MenuCard({ id }: { id: string }) {
    const { addToCart } = useCart()

    const [menuItems, setMenuItems] = useState<MenuItem[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        setLoading(true)

        axios
            .get(`${process.env.NEXT_PUBLIC_API_URL}/menu/restaurant/${id}`)
            .then((response) => {
                setMenuItems(response.data.menus)
                setLoading(false)
            })
            .catch((error) => {
                console.log(error)
                alert(error)
            })
    }, [id]);
    
    if (loading) {
        return <Spinner />;
    }

    return (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
            {loading ? (
                <Spinner />
            ) : menuItems.length === 0 ? (  
                <p className="text-center text-gray-600">No menu items found.</p>
            ) : (
                menuItems.map((MenuItem) => (
                <div
                    key={MenuItem.id}
                    className="bg-white shadow-md rounded-lg overflow-hidden border border-gray-200"
                >
                    <div className="p-4">
                        <h2 className="text-xl font-semibold mb-2">{MenuItem.name}</h2>
                        <p className="text-gray-600 text-sm mb-3">{MenuItem.description}</p>
                        <p className="text-lg font-bold mb-4">${MenuItem.price}</p>
                        <button
                            className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700 transition"
                            onClick={() => addToCart({ ...MenuItem, quantity: 1 })}
                        >
                            Add to cart
                        </button>
                    </div>
                </div>
            ))
            )}
        </div>
    )
}
