# Marvel's Food Ordering App 🍽️

A **MERN stack** food ordering application where users can browse restaurants, view menus, place orders, and manage order statuses.  
The backend is built with **Node.js + Express + MongoDB**, and the frontend is built with **Next.js** using Tailwind CSS.

---

## 🚀 Features

### **Frontend (Next.js)**
- Built using **Next.js App Router** for modern routing
- Responsive UI with **Tailwind CSS**
- **JWT authentication** for protected routes
- Axios API integration
- Dynamic restaurant listing and order management
- Client-side route protection

### **Backend (Node.js + Express)**
- RESTful APIs for:
  - **Auth** (Register, Login)
  - **Restaurants**
  - **Menus**
  - **Orders**
- JWT-based authentication middleware
- Role-based access control (Admin, Manager, Member)
- MongoDB (Mongoose ODM) for database operations
- Seed script to populate sample data

---

## 🛠️ Tech Stack

| Layer      | Technology |
|------------|------------|
| **Frontend** | Next.js 14, TypeScript, Tailwind CSS, Axios |
| **Backend**  | Node.js, Express.js, Mongoose, JWT, Bcrypt |
| **Database** | MongoDB |
| **Auth**     | JSON Web Tokens (JWT) |

---

## 📂 Project Structure

### **Backend**
backend/
├── models/ # Mongoose models (User, Restaurant, Menu, Order)
├── routes/ # Express routes (auth, restaurants, menus, orders)
├── controllers/ # Controller logic
├── middlewares/ # Auth & role-based middlewares
├── seed/ # Database seed script
├── server.js # App entry point
└── .env # Environment variables


### **Frontend**

frontend/
├── app/ # Next.js App Router pages
├── components/ # UI components
├── login/ #Login components
├── orders/ # Order components
├── menus/ #Menu Components
├──restaurants/ #Restaurant components
├── styles/ # Tailwind styles
├── public/ # Static assets
└── .env.local # Frontend environment variables


---

## ⚙️ Installation & Setup

### **1️⃣ Clone the repository**
```bash
git clone https://github.com/vinaycvk/marvel-food-app.git
cd slooze-app

cd backend
npm install


### Start backend

npm run dev

### Start frontend

cd frontend
npm install

npm run dev

## .env 

NEXT_PUBLIC_API_URL=http://localhost:5555/api/v1

backend runs in port 5555 in local
frontend runs in port 3000 in local


🔐 Authentication & Roles
Admin → Manage restaurants, menus, orders

Manager → Manage menus for their restaurant

Member → Browse menus, place orders

Token stored in localStorage and sent via Authorization: Bearer <token>

📌 API Endpoints

Auth
POST /api/v1/auth/login

Restaurants
GET /api/v1/restaurant — Get all restaurants (filtered by country for members)

POST /api/v1/restaurant — Create restaurant (Admin only)

Menus
GET /api/v1/menu/restaurant/:restaurantId

GET /api/v1/menu — Get all menus

Orders
POST /api/v1/orders — Create order

PATCH /api/v1/orders/:id/cancel — Cancel order

PATCH /api/v1/orders/:id/checkout — checkout

PATCH /api/v1/orders/:id/payment-method — Update payment method


🎯 Future Improvements
Add image upload for menus
Implement search & filters
Payment gateway integration
Deploy to Vercel (frontend) & Render (backend)
Storing in cookies instead of localstorages


### 🔑 Login Credentials (Seed Data)

You can use these seeded accounts to log in and test the application:

| Username         | Email                  | Password              | Role     |
|------------------|------------------------|-----------------------|----------|
| Nick Fury        | nick@example.com       | nickfury123           | Admin    |
| Captain America  | americak@example.com   | captainamerica123     | Manager  |
| Captain Marvel   | marvel@example.com     | captainmarvel123      | Manager  |
| Thor             | thor@example.com       | thor123               | Member   |
| Thanos           | thanos@example.com     | thanos123             | Member   |
