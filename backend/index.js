import express from "express"
import dotenv from 'dotenv'
import dbconnect from "./config/db.js"
import menuRoutes from "./routes/menu.routes.js"
import restaurantRoutes from "./routes/restaurant.routes.js"
import orderRoutes from "./routes/order.routes.js";
import authRoutes from "./routes/auth.routes.js";

dotenv.config()

import cors from 'cors'

const app = express()
app.use(express.json())
app.use(cors({  
  origin: 'http://localhost:3000', // Adjust this to your frontend URL
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH'],
  credentials: true // Allow credentials if needed
}))

const PORT = process.env.PORT || 5555

app.get("/", (req, res) => {
  res.send("Welcome to the Slooze App API")
})

app.use('/api/v1/menu', menuRoutes)
app.use('/api/v1/restaurant', restaurantRoutes)
app.use('/api/v1/order', orderRoutes)
app.use('/api/v1/auth', authRoutes)

app.listen(PORT, () => {
  console.log(`App listening on port ${PORT}`)
})


dbconnect()