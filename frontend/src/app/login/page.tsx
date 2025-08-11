'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import axios from 'axios';


export default function LoginPage() {
    const router = useRouter();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('')
    const [loading, setLoading] = useState(false);


    const handleLogin = () => {

        const data = {
            email,
            password
        };

        setLoading(true);

        // Simulate a delay for the spinner
        setTimeout(() => {
            setLoading(false);
        }, 5000);
        
        axios
            .post(`${process.env.NEXT_PUBLIC_API_URL}/auth/login`, data)
            .then((response) => {
                localStorage.setItem('token', response.data.token);
                localStorage.setItem('userId', response.data.user.id);
                localStorage.setItem('userName',response.data.user.name);
                setLoading(false);
                router.push('/restaurants');
                alert('Login successful!');
            })
            .catch((error) => {
                console.log('Login failed:', error);
                console.log(data)
                alert('Login failed. Please check your credentials and try again.');
            });
    }

    return (
        <div className="flex items-center justify-center min-h-screen bg-gray-100">
            <div className="bg-white p-8 rounded shadow-md w-96">
                <h2 className="text-2xl font-bold mb-6 text-center">Login</h2>
                <div className="mb-4">
                    <label className="block text-sm font-medium text-gray-700 mb-2">Email</label>
                    <input
                        type="email"    
                        value={email}   
                        onChange={(e) => setEmail(e.target.value)}
                        className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                        placeholder="Enter your email"
                    />
                </div>
                <div className="mb-6">
                    <label className="block text-sm font-medium text-gray-700 mb-2">Password</label>    
                    <input
                        type="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                        placeholder="Enter your password"
                    />
                </div>
                <button
                    onClick={handleLogin}
                    className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700 transition duration-200"
                >
                    Login
                </button>
            </div>
        </div>
    );
};