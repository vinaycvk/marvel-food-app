import mongoose from "mongoose";
import dotenv from 'dotenv';

dotenv.config();
const mongoDBURL = process.env.MONGO_URI;

const dbconnect = () => {
   mongoose
       .connect(mongoDBURL)
       .then(() => {
           console.log(`Connected to the database`);
       })
       .catch((error) => {
           console.error(`Error connecting to the database: ${error.message}`);
       });
}

export default dbconnect;