// components/HeaderBar.tsx
'use client';
import React, {useState, useEffect} from "react";


export default function HeaderBar() {
  const [userName, setUserName] = useState<string>('User');
  
  useEffect(() => {
    const storedUserName = localStorage.getItem('userName');  
    if (storedUserName) {
      setUserName(storedUserName);
    }
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('userId');
    localStorage.removeItem('userName');
    window.location.href = '/login'; // Redirect to login page
  };

  return (
    <header className="bg-gray-800 text-white px-6 py-3 flex justify-between items-center shadow-md">
      {/* Left side - Brand or Title */}
      <h1 className="text-lg font-semibold">My App</h1>

      {/* Right side - Username + Logout */}
      <div className="flex items-center gap-4">
        <span className="text-sm">Welcome, {userName}</span>
        <button 
          onClick={handleLogout}
          type="button"
          aria-label="Logout"
          className="bg-red-500 hover:bg-red-600 text-white px-3 py-1 rounded-lg text-sm font-medium transition"
        >
          Logout
        </button>
      </div>
    </header>
  );
}
