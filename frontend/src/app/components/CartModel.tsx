'use client';
import { useCart } from '../context/CartContext';
import axios from 'axios';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';


export default function CartModal() {
  const { cartItems, increment, decrement, removeFromCart } = useCart();

  const [userId, setUserId] = useState<string | null>(null);
  const [token, setToken] = useState<string | null>(null);
  const [userName, setUserName] = useState<string | null>(null);
  const router = useRouter();

  useEffect(() => {
    const storedUserId = localStorage.getItem("userId");
    const storedToken = localStorage.getItem("token");
    const storedUserName = localStorage.getItem("userName");

    setUserId(storedUserId);
    setToken(storedToken);
    setUserName(storedUserName);
  }, []);

  const handleCheckOut = () => {
    const checkOutPayload = {
      userId: userId,
      userName: userName,
      items: cartItems.map((cartItem) => ({
        menuItemId: cartItem.id,
        menuItemName: cartItem.name,
        quantity: cartItem.quantity
      }))
    }


    axios
      .post("http://localhost:5555/api/v1/order", checkOutPayload, {
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json'
        }
      })
      .then((response) => {
        console.log(response);
        alert("Order has been placed")
        localStorage.removeItem("cartItems");
        cartItems.length = 0; // Clear the cart items
        // Redirect to orders page after successful checkout
        setTimeout(() => {
          router.push("/orders");
        }, 1000);
      })
      .catch((error) => {
        console.log(error)
      })
  }

  return (
    <div className="fixed right-5 bottom-5 bg-white shadow-xl rounded-2xl p-4 w-80 z-50 border">
      <h2 className="text-lg font-bold mb-3">🛒 Your Cart</h2>
      {cartItems.length === 0 ? (
        <p className="text-gray-500">Your cart is empty</p>
      ) : (
        <div className="space-y-3">
          {cartItems.map(item => (
            <div key={item.id} className="flex justify-between items-center">
              <div>
                <p className="font-medium">{item.name}</p>
                <p className="text-sm text-gray-500">₹{item.price} x {item.quantity}</p>
              </div>
              <div className="flex items-center space-x-2">
                <button
                  className="px-2 py-1 bg-gray-200 rounded"
                  onClick={() => decrement(item.id)}
                >−</button>
                <span>{item.quantity}</span>
                <button
                  className="px-2 py-1 bg-gray-200 rounded"
                  onClick={() => increment(item.id)}
                >+</button>
                <button
                  className="ml-2 text-red-500"
                  onClick={() => removeFromCart(item.id)}
                >✕</button>
              </div>

            </div>
          ))}
          <div>
            <button
              className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700 transition duration-200"
              onClick={() => handleCheckOut()}
            >
              Checkout
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
