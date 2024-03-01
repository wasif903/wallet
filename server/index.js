import express from "express";
import dotenv from "dotenv";
import ErrorHandler from "./middleware/ErrorHandler.js";
import cors from 'cors'
import { v2 as cloudinary } from "cloudinary";
import fileUpload from "express-fileupload";

// @DATABASE
import databases from './db.js'

// @ROUTES
import User from "./routes/User.js";
import PaymentCardRoutes from "./routes/PaymentCardRoutes.js";


dotenv.config();
databases();
const app = express();
app.use(express.json());
app.use(cors({
    origin: 'http://localhost:3000',
    methods: ['GET', "POST", "PUT", "DELETE", "PATCH"],
    credentials: true
}));


cloudinary.config({
    cloud_name: process.env.CLOUDINARY_Cloud,
    api_secret: process.env.CLOUDINARY_API_SECRET,
    api_key: process.env.CLOUDINARY_API_KEY
})

app.use(fileUpload({
    useTempFiles: true,
    tempFileDir: '/tmp/'
}));


const Port = process.env.PORT;

app.use("/auth", User)
app.use('/api', PaymentCardRoutes)

app.use(ErrorHandler)

app.listen(Port, () => {
    console.log(`APP Listening To ${Port}`);
})