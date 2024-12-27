import express from "express";
import dotenv from "dotenv";
import connectDB from "./utils/db";
import userroute from './Routes/user.route';
import noteroute from './Routes/note.route';
import cookieParser from "cookie-parser";


const app = express();
dotenv.config({});
app.use(express.json())
app.use(cookieParser());

const PORT = process.env.PORT || 3000;
app.use("/api/v1/user/", userroute)
app.use("/api/v1/note/", noteroute)


app.listen(PORT, ()=> {
connectDB();
console.log(`Server is running on port ${PORT}`);
})
