import express from "express";
import dotenv from "dotenv";
import connectDB from "./utils/db";
import userroute from './Routes/user.route';


const app = express();
dotenv.config({});
app.use(express.json())

const PORT = process.env.PORT || 3000;
app.use("/api/v1/user/", userroute)


app.listen(PORT, ()=> {
connectDB();
console.log(`Server is running on port ${PORT}`);
})
