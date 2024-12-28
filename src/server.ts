import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import connectDB from "./utils/db";
import userroute from './Routes/user.route';
import noteroute from './Routes/note.route';
import cookieParser from "cookie-parser";



const app = express();
dotenv.config({});
app.use(express.json())
app.use(cookieParser());
const corsOptions = {
    origin: "https://hd-note-app.vercel.app",
    credentials: true,
    methods: ['GET', 'POST', 'PUT', 'DELETE' ],
    allowedHeaders: ['Content-Type', 'Authorization'],
};
app.use(cors(corsOptions))


const PORT = process.env.PORT || 3000;
app.use("/api/v1/user", userroute)
app.use("/api/v1/note", noteroute)


app.listen(PORT, ()=> {
connectDB();

})
