import express from 'express'
import connect from './connnection.js';
import dotenv from 'dotenv';
dotenv.config()
import urlroute from "./routes/url.js";
import cors from 'cors'
import userRouter from './routes/user.js';
import imageRouter from './routes/image.js';
const app=express();
app.use(express.json());

app.use(cors({
    origin:process.env.FRONTEND_URL
}));

app.use('/url/image',imageRouter);
app.use('/url',urlroute)
app.use('/user',userRouter)

connect(process.env.DB_URL,app);


